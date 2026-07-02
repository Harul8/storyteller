import { NextResponse } from "next/server";
import { runAnalysis, describeProviderError } from "@/lib/llm";
import { ANALYSIS_SYSTEM } from "@/lib/prompts";
import { extractCvText } from "@/lib/extract";
import { DEFAULT_PROVIDER, DEFAULT_MODEL, isValidSelection, type Provider } from "@/lib/models";
import type { Analysis } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 120;

function parseAnalysis(raw: string): Analysis {
  let s = raw.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  }
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    s = s.slice(start, end + 1);
  }
  return JSON.parse(s) as Analysis;
}

export async function POST(req: Request) {
  try {
    let cvText = "";
    let targetRole = "";
    let reqProvider = "";
    let reqModel = "";

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      const pasted = form.get("text");
      targetRole = (form.get("targetRole") as string) || "";
      reqProvider = (form.get("provider") as string) || "";
      reqModel = (form.get("model") as string) || "";
      if (file instanceof File && file.size > 0) {
        cvText = await extractCvText(file);
      } else if (typeof pasted === "string") {
        cvText = pasted.trim();
      }
    } else {
      const body = await req.json().catch(() => ({}) as Record<string, unknown>);
      cvText = String(body.text || "").trim();
      targetRole = String(body.targetRole || "").trim();
      reqProvider = String(body.provider || "");
      reqModel = String(body.model || "");
    }

    if (!cvText || cvText.length < 50) {
      return NextResponse.json(
        { error: "Please provide a CV — upload a PDF/DOCX/TXT or paste at least a few lines of text." },
        { status: 400 },
      );
    }

    let provider: Provider = DEFAULT_PROVIDER;
    let model: string = DEFAULT_MODEL;
    if (isValidSelection(reqProvider, reqModel)) {
      provider = reqProvider;
      model = reqModel;
    }

    const raw = await runAnalysis(provider, model, ANALYSIS_SYSTEM, cvText, targetRole);

    let analysis: Analysis;
    try {
      analysis = parseAnalysis(raw);
    } catch {
      return NextResponse.json(
        { error: "The analysis came back in an unexpected format. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ cvText, targetRole, analysis });
  } catch (err) {
    if (err instanceof Error && err.message === "UNSUPPORTED_FILE") {
      return NextResponse.json(
        { error: "Unsupported file type. Upload a PDF, DOCX, or TXT — or paste the text instead." },
        { status: 415 },
      );
    }
    console.error("analyze error:", err);
    return NextResponse.json({ error: describeProviderError(err) }, { status: 500 });
  }
}
