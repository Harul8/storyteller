import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { Provider } from "./models";
import type { ChatMessage } from "./types";
import { recordUsage } from "./usage";

const ANALYSIS_MAX_TOKENS = 8000;
const CHAT_MAX_TOKENS = 4000;

function getAnthropic(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("MISSING_ANTHROPIC_KEY");
  return new Anthropic({ apiKey });
}

function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("MISSING_OPENAI_KEY");
  return new OpenAI({ apiKey });
}

/** Turn a provider/SDK error into a user-facing, actionable message. */
export function describeProviderError(err: unknown): string {
  if (err instanceof Error && err.message === "MISSING_ANTHROPIC_KEY") {
    return "Server is missing ANTHROPIC_API_KEY. Add it to .env.local and restart the dev server.";
  }
  if (err instanceof Error && err.message === "MISSING_OPENAI_KEY") {
    return "Server is missing OPENAI_API_KEY. Add it to .env.local and restart the dev server.";
  }
  const cause = (err as { cause?: { code?: string } } | null)?.cause;
  const msg = err instanceof Error ? err.message : "Unknown error";
  if (
    cause?.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" ||
    cause?.code === "SELF_SIGNED_CERT_IN_CHAIN" ||
    /certificate|self[- ]signed|leaf signature|unable to verify/i.test(msg)
  ) {
    return "TLS certificate error reaching the AI provider (corporate proxy). Stop the dev server (Ctrl+C) and run `npm run dev` again so the CA bundle in certs/ loads.";
  }
  return `Couldn't reach the AI provider: ${msg}`;
}

/** Run the one-shot CV analysis and return the raw model text (expected to be JSON). */
export async function runAnalysis(
  provider: Provider,
  model: string,
  system: string,
  cvText: string,
  targetRole = "",
): Promise<string> {
  const userContent = targetRole
    ? `=== TARGET ROLE / JOB DESCRIPTION ===\n${targetRole}\n\n=== CANDIDATE CV ===\n${cvText}`
    : cvText;

  if (provider === "anthropic") {
    const client = getAnthropic();
    const msg = await client.messages.create({
      model,
      max_tokens: ANALYSIS_MAX_TOKENS,
      system,
      messages: [{ role: "user", content: userContent }],
    });
    recordUsage({
      provider: "anthropic",
      model,
      inputTokens: msg.usage?.input_tokens ?? 0,
      outputTokens: msg.usage?.output_tokens ?? 0,
    });
    const block = msg.content.find((b) => b.type === "text");
    return block && block.type === "text" ? block.text : "";
  }

  const client = getOpenAI();
  const res = await client.chat.completions.create({
    model,
    max_completion_tokens: ANALYSIS_MAX_TOKENS,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: userContent },
    ],
  });
  recordUsage({
    provider: "openai",
    model,
    inputTokens: res.usage?.prompt_tokens ?? 0,
    outputTokens: res.usage?.completion_tokens ?? 0,
  });
  return res.choices[0]?.message?.content ?? "";
}

/** Stream a coaching reply as plain-text deltas, regardless of provider. */
export async function streamChat(
  provider: Provider,
  model: string,
  system: string,
  messages: ChatMessage[],
): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();

  if (provider === "anthropic") {
    const client = getAnthropic();
    const stream = client.messages.stream({
      model,
      max_tokens: CHAT_MAX_TOKENS,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages,
    });
    return new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          const final = await stream.finalMessage();
          recordUsage({
            provider: "anthropic",
            model,
            inputTokens: final.usage?.input_tokens ?? 0,
            outputTokens: final.usage?.output_tokens ?? 0,
          });
        } catch (err) {
          console.error("anthropic stream error:", err);
          controller.enqueue(encoder.encode("\n\n[The coach hit an error. Please try again.]"));
        } finally {
          controller.close();
        }
      },
    });
  }

  const client = getOpenAI();
  const stream = await client.chat.completions.create({
    model,
    max_completion_tokens: CHAT_MAX_TOKENS,
    temperature: 0.4,
    stream: true,
    stream_options: { include_usage: true },
    messages: [
      { role: "system", content: system },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
  });
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let usage: { prompt_tokens?: number; completion_tokens?: number } | undefined;
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
          if (chunk.usage) usage = chunk.usage;
        }
        recordUsage({
          provider: "openai",
          model,
          inputTokens: usage?.prompt_tokens ?? 0,
          outputTokens: usage?.completion_tokens ?? 0,
        });
      } catch (err) {
        console.error("openai stream error:", err);
        controller.enqueue(encoder.encode("\n\n[The coach hit an error. Please try again.]"));
      } finally {
        controller.close();
      }
    },
  });
}
