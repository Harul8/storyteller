import OpenAI from "openai";
import { streamChat, describeProviderError } from "@/lib/llm";
import { buildCoachSystem, buildGeneralCoachSystem } from "@/lib/prompts";
import { DEFAULT_PROVIDER, DEFAULT_MODEL, isValidSelection, type Provider } from "@/lib/models";
import type { Analysis, ChatMessage } from "@/lib/types";

// ─── ANSWER QUALITY GATE ─────────────────────────────────────────────────────
// An independent grader for the candidate's latest practice answer, run as its
// own tiny call before the coach responds. The coach model has a strong "always
// improve" pull and will polish answers that are already good, invent weaknesses
// that aren't there, and hand people back their own words to recite. Asking it to
// self-regulate that inside its main generation does not work. So a separate
// grader — with the single job of deciding "is this answer actually done?" — makes
// the call and hands the verdict back as ground truth. Best-effort: any failure
// returns null and the coach simply proceeds on its own judgment.
const QUALITY_GATE_SYSTEM = `You are a strict but fair grader of ONE practice interview answer. You are NOT the coach — you only grade, so the coach can decide whether to certify the answer as done, ask for one redo, or move on with a model answer.

The question being graded is either a GENERAL behavioural question or a BUSINESS-LEVEL TECHNICAL question (how they actually used a tool, technology, or method, and what it got the project or the business — never a theory or definition question). Judge accordingly, on THEIR ACTUAL WORDS, against four things:
1. Ownership — is the candidate clearly the one who did it ("I decided/built/led"), not hiding behind "we", "was involved in", "responsible for", "participated in"?
2. Specificity — concrete actions, decisions, and hands-on detail — not a vague summary of activity, and not a tool or technology just name-dropped with no real usage described.
3. Payoff — for a general question, a number or a concretely observable outcome, not "it went well" / "the client was happy"; for a business-technical question, a clear, plain-language statement of what the tool or decision actually got the project or the business, not just confirmation that it was used.
4. Followed the ask — if the coach's last message requested a specific change, did the answer actually make it?

Grade "strong" when the answer owns the work, is specific, and shows real payoff. DO NOT demand perfection — a strong answer with a small imperfection is still strong and you MUST let it pass. This is the point of your job: the coach over-polishes good answers, and you exist to certify when an answer is genuinely done so it can stop.

Grade "needs_work" ONLY when there is a real, nameable weakness on one of the four points. Then "biggestWeakness" is ONE short sentence naming the single most important gap, and it MUST quote the candidate's actual words — never invent a phrase they did not say.

If the message is not a practice answer at all (it's a question, or a brief acknowledgment), return verdict "not_an_answer".

Return ONLY JSON: {"verdict":"strong"|"needs_work"|"not_an_answer","biggestWeakness":"<one sentence quoting their words; empty string if strong or not_an_answer>"}`;

// "not_an_answer" is a real, meaningful verdict — not folded into null. It's
// how the server finds out, reliably, that the candidate's last message was a
// detour (a question, an aside) rather than an attempt — much more reliable
// than asking the coach model to notice this about its OWN upcoming turn and
// self-tag it (testing showed that self-tagging is missed for exactly the
// quick, conversational-feeling detours where it matters most). null now
// means only "the gate itself produced nothing usable this turn" — a genuine
// API failure, or too short to be worth grading.
interface QualityVerdict {
  verdict: "strong" | "needs_work" | "not_an_answer";
  weakness: string;
}

async function assessAnswerQuality(
  messages: { role: string; content: string }[],
): Promise<QualityVerdict | null> {
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return null;
  // A real practice answer has some substance; skip short questions/acknowledgments cheaply.
  if (last.content.trim().split(/\s+/).length < 15) return null;

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;
    const client = new OpenAI({ apiKey });
    const prevCoach = messages.slice(0, -1).reverse().find((m) => m.role === "assistant");
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 220,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: QUALITY_GATE_SYSTEM },
        {
          role: "user",
          content: `WHAT THE COACH LAST ASKED FOR:\n${prevCoach?.content ?? "(nothing specific — this may be their first answer)"}\n\nTHE CANDIDATE'S ANSWER TO GRADE:\n${last.content}`,
        },
      ],
    });
    const parsed = JSON.parse(res.choices[0]?.message?.content ?? "{}") as {
      verdict?: unknown;
      biggestWeakness?: unknown;
    };
    if (parsed.verdict !== "strong" && parsed.verdict !== "needs_work" && parsed.verdict !== "not_an_answer") {
      return null;
    }
    return {
      verdict: parsed.verdict,
      weakness: typeof parsed.biggestWeakness === "string" ? parsed.biggestWeakness : "",
    };
  } catch (err) {
    console.error("quality gate failed (non-fatal):", err);
    return null;
  }
}

/**
 * The coach ends every turn with a trailing [TOPIC: <theme>::<question>] tag
 * (see the TOPIC TAG instruction in COACHING_PERSONA) — two parts, joined by
 * "::". The theme part stays constant for as long as the coach is on that
 * theme; the question part is reused across an ask, its guidance, and any
 * redo of that one question, and changes the instant the coach moves to a
 * new question (whether inside the same theme or a new one). Both parts are
 * chosen by the model using its own semantic judgment — not matched against
 * a fixed phrase list, which could never generalize across arbitrary users,
 * CVs, and phrasing. Counting from there is pure string comparison, no LLM
 * call needed: how many CONSECUTIVE turns share the exact same tag tells us
 * which attempt of the practice loop the candidate is on; how many DISTINCT
 * question parts have appeared under the current theme tells us whether that
 * theme has had enough questions to move on.
 */
function extractTopicTag(content: string): string | null {
  const match = content.trim().match(/\[TOPIC:\s*([^\]]+)\]\s*$/i);
  return match ? match[1].trim().toLowerCase() : null;
}

// A trailing "::deviation" on the question part marks a turn where the coach
// handled an off-flow detour and re-asked the SAME pending question — see the
// deviation-handling instruction in COACHING_PERSONA. It doesn't consume an
// attempt: no answer was actually graded on that turn, only a tangent. Without
// stripping it out, that turn still counts toward the SAME theme::question run
// (so continuity tracking is unaffected), but is excluded from the attempt
// tally in countConsecutiveSameTopic below.
const DEVIATION_MARKER = "::deviation";

function parseTag(tag: string): { theme: string; question: string; isDeviationReask: boolean } {
  const idx = tag.indexOf("::");
  if (idx === -1) return { theme: tag, question: tag, isDeviationReask: false };
  const theme = tag.slice(0, idx).trim();
  let question = tag.slice(idx + 2).trim();
  let isDeviationReask = false;
  if (question.endsWith(DEVIATION_MARKER)) {
    question = question.slice(0, -DEVIATION_MARKER.length).trim();
    isDeviationReask = true;
  }
  return { theme, question, isDeviationReask };
}

/**
 * Counts real attempts at the CURRENT question — not raw consecutive same-tag
 * turns. A deviation-handling re-ask shares the theme+question with the turn
 * before it (by design, for continuity) but must not inflate the attempt
 * count, or a candidate's genuine first attempt right after a detour gets
 * mistaken for their second and skips straight past real feedback to a
 * fabricated model answer — an observed failure mode in testing.
 */
function countConsecutiveSameTopic(messages: { role: string; content: string }[]): number {
  const tags = messages.filter((m) => m.role === "assistant").map((m) => extractTopicTag(m.content));
  const lastTag = tags[tags.length - 1];
  if (!lastTag) return 0;
  const { theme: currentTheme, question: currentQuestion } = parseTag(lastTag);
  let count = 0;
  for (let i = tags.length - 1; i >= 0; i--) {
    const tag = tags[i];
    if (!tag) break;
    const parsed = parseTag(tag);
    if (parsed.theme !== currentTheme || parsed.question !== currentQuestion) break;
    if (!parsed.isDeviationReask) count++;
  }
  return count;
}

/** How many distinct questions the CURRENT theme has had so far, including the one just answered. */
function countDistinctQuestionsInCurrentTheme(messages: { role: string; content: string }[]): number {
  const tags = messages.filter((m) => m.role === "assistant").map((m) => extractTopicTag(m.content));
  const lastTag = tags[tags.length - 1];
  if (!lastTag) return 0;
  const currentTheme = parseTag(lastTag).theme;
  const seenQuestions = new Set<string>();
  for (let i = tags.length - 1; i >= 0; i--) {
    const tag = tags[i];
    if (!tag) continue;
    const { theme, question } = parseTag(tag);
    if (theme !== currentTheme) break;
    seenQuestions.add(question);
  }
  return seenQuestions.size;
}

// The literal reserved theme+question tag the coach is instructed (in the
// session agenda) to use for the whole closing phase, and specifically for
// the one consolidated-pitch exchange within it: [TOPIC: closing-pitch::closing-pitch].
// Two things must both be true before the session is allowed to end: the
// candidate has been asked for the pitch specifically (question part equals
// this same literal, not just any cross-cutting question in the phase), and
// that exchange has resolved (strong, or its one redo used up). Requiring the
// question part too — not just "2 exchanges in this theme" — was necessary
// after testing showed the model would happily end the session on two ordinary
// cross-cutting questions and never actually ask for the pitch at all.
const CLOSING_PITCH_THEME = "closing-pitch";

function isClosingPitchTurn(messages: { role: string; content: string }[]): boolean {
  const tags = messages.filter((m) => m.role === "assistant").map((m) => extractTopicTag(m.content));
  const lastTag = tags[tags.length - 1];
  if (!lastTag) return false;
  return parseTag(lastTag).theme === CLOSING_PITCH_THEME;
}

function closingPitchWasAsked(messages: { role: string; content: string }[]): boolean {
  const tags = messages.filter((m) => m.role === "assistant").map((m) => extractTopicTag(m.content));
  const lastTag = tags[tags.length - 1];
  if (!lastTag) return false;
  const { theme, question } = parseTag(lastTag);
  return theme === CLOSING_PITCH_THEME && question === CLOSING_PITCH_THEME;
}

/** Ordered, deduped theme names as first visited — last entry is the current theme. */
function getVisitedThemesInOrder(messages: { role: string; content: string }[]): string[] {
  const tags = messages.filter((m) => m.role === "assistant").map((m) => extractTopicTag(m.content));
  const seen: string[] = [];
  for (const tag of tags) {
    if (!tag) continue;
    const { theme } = parseTag(tag);
    if (!seen.includes(theme)) seen.push(theme);
  }
  return seen;
}

function buildCvReminder(
  analysis: Analysis,
  questionAttemptCount: number,
  questionsInTheme: number,
  isClosingPitch: boolean,
  closingPitchAsked: boolean,
  visitedThemes: string[],
  quality: QualityVerdict | null,
): string {
  const projects = analysis.projectTips?.map((p) => p.project).filter(Boolean) ?? [];
  const flags = analysis.vocabularyFlags?.slice(0, 3).map((f) => `"${f.found}"`).filter(Boolean) ?? [];

  // A light private nudge, not a script. The system prompt carries the real
  // coaching craft; this only keeps a few things fresh in the near-attention
  // window that drift over a long conversation — CV anchors, awareness-first,
  // question discipline. Deliberately terse and non-prescriptive: handing the
  // model literal sentences every turn is what made past versions robotic.
  const lines = [
    `(Private note for this turn — the candidate never sees this. Do not quote or follow it as a script; keep sounding like a person.)`,
  ];
  if (projects.length > 0) {
    lines.push(`Stay anchored in their real material — e.g. ${projects.slice(0, 4).join(", ")}.`);
  }
  if (flags.length > 0) {
    lines.push(`Weak phrasings seen in their CV that may resurface in speech: ${flags.join(", ")}.`);
  }
  lines.push(
    `If they just gave an answer, draw out what THEY noticed before your own verdict — and word that fresh, not an opener you've already used this session. One genuine question at most; phrase redos as commands.`,
  );
  lines.push(`End with the hidden [TOPIC: <theme>::<question>] tag.`);

  // Structural fact, independent of the quality gate below: which themes are
  // already behind you. This must hold even on a turn where the quality gate
  // returns nothing usable (dropped call, ambiguous grade) — without it, a
  // turn with no quality verdict has no signal at all about where to go next,
  // and testing found the model wandering back into an already-finished
  // theme in exactly that gap.
  const currentTheme = visitedThemes[visitedThemes.length - 1];
  const priorThemes = visitedThemes.slice(0, -1);
  if (priorThemes.length > 0) {
    lines.push(
      `Themes already covered this session, in order — never return to any of these: ${priorThemes.join(", ")}. You are currently on "${currentTheme}".`,
    );
  }

  // The gate reliably recognizes a detour (a question, an aside, anything
  // that isn't an attempt at the pending question) — far more reliably than
  // asking the coach to notice this about its own upcoming turn and self-tag
  // it, which testing showed gets missed for exactly the quick,
  // conversational-feeling detours where it matters most. So the server
  // tells it directly, every time, rather than leaving it to be noticed.
  if (quality && quality.verdict === "not_an_answer") {
    lines.push(
      `QUALITY GATE — their last message was NOT an attempt at the pending question (it reads like a detour: a question, an aside, something off to the side). Handle it exactly per HOW YOU RUN THE SESSION in your persona: respond to it for real, then return to the still-pending question. Do not treat this as an attempt and do not advance — the question is still open. End your tag with "::deviation" appended on this one turn only, exactly [TOPIC: ${currentTheme}::<question>::deviation], keeping the theme and question parts exactly as they were.`,
    );
    return lines.join("\n");
  }

  // The closing phase (final cross-cutting round + the one consolidated pitch)
  // shares the reserved "closing-pitch" theme tag. The session may only end
  // once the pitch ITSELF has been asked (question part also "closing-pitch",
  // not just any cross-cutting question) and resolved. Testing surfaced two
  // distinct failure modes this guards against: (a) the model tagging the
  // very FIRST cross-cutting question as closing-pitch::closing-pitch and
  // ending the whole session the moment it graded strong, and (b), after
  // fixing (a) with a same-theme floor of two exchanges, the model spending
  // both of those on ordinary cross-cutting questions and ending the session
  // having never actually asked for the consolidated pitch at all. Checking
  // the question part specifically — not just a raw exchange count — closes
  // both: the phase cannot end until the exact pitch question has been asked.
  if (isClosingPitch) {
    let continueInstruction: string;
    if (closingPitchAsked) {
      continueInstruction = `The consolidated closing pitch has now been delivered — that was the last step. This is the end of the session now. Do NOT ask another question.`;
    } else if (questionsInTheme >= 2) {
      continueInstruction = `This closing phase has had enough cross-cutting questions now (${questionsInTheme}) — the consolidated closing pitch has NOT been asked for yet, and it must be. Your next move has to be exactly that: ask for the one pitch that pulls the whole session together, no more cross-cutting questions first. Tag it exactly [TOPIC: closing-pitch::closing-pitch].`;
    } else {
      continueInstruction = `This closing phase has only had ${questionsInTheme} question so far. Either ask one more cross-cutting question (why this role, how their strengths add up, what they'd bring early on) — keep the theme part "closing-pitch", vary the question part — or, if you're ready, go straight to asking for the one consolidated closing pitch now, tagged exactly [TOPIC: closing-pitch::closing-pitch].`;
    }
    const sessionCloseNote = closingPitchAsked
      ? ` Write the session close now — one encouraging, concrete note about what to keep drilling on their own.`
      : "";

    if (quality && quality.verdict === "strong") {
      lines.push(
        `QUALITY GATE — that answer is STRONG. Acknowledge what specifically made it land. ${continueInstruction}${sessionCloseNote}`,
      );
    } else if (quality && quality.verdict === "needs_work" && questionAttemptCount >= 2) {
      lines.push(
        `QUALITY GATE — second attempt at this exact question, still needs work — ${quality.weakness} Do NOT ask for a third attempt. Acknowledge the attempt honestly, name that one gap, then give them a real, complete model answer so they have something to practise on their own. ${continueInstruction}${sessionCloseNote}`,
      );
    } else if (quality && quality.verdict === "needs_work") {
      lines.push(
        `QUALITY GATE — it needs exactly one real fix — ${quality.weakness} Coach that one thing, quoting their own words, and end with a redo of just that — this is their one redo at this exact question, so keep your [TOPIC] tag completely unchanged.`,
      );
    } else {
      // No usable verdict this turn (dropped call, ambiguous grade) — the
      // phase must still progress correctly rather than stalling, or worse,
      // the session never actually closing.
      lines.push(
        `No independent quality read on their last answer this turn — use your own judgment on whether it needs a fix, the same way the persona describes (quote their real words if you name a weakness; never invent one if it looks solid). Regardless of that judgment, the phase must still move correctly: ${continueInstruction}${sessionCloseNote}`,
      );
    }
    return lines.join("\n");
  }

  // Priority order mirrors THE PRACTICE LOOP in COACHING_PERSONA: every question
  // gets at most two attempts. A certified-strong answer always resolves the
  // question, on attempt 1 or 2. A still-weak SECOND attempt has hit the cap —
  // give the ideal answer, no third try. A still-weak FIRST attempt gets exactly
  // one named fix and a redo (attempt 2, same [TOPIC] tag, unchanged).
  //
  // What happens AFTER a question resolves (strong, or attempt-cap reached) is
  // governed separately by questionsInTheme, with both a floor and a ceiling:
  // - under 2: a single strong answer must not fast-forward straight to a new
  //   theme — that was an observed failure mode once "advance" gave the model
  //   a free choice between "next question" and "next theme" and it reliably
  //   picked the bigger jump.
  // - 3 or more: the model was just as reliably observed doing the opposite
  //   once nothing said stop — treating "up to three" as no ceiling at all and
  //   generating a fourth, fifth, etc. question under the same theme tag for
  //   as long as answers kept passing. Three is the hard cap; only a code-
  //   enforced instruction (not prose alone) held it in testing.
  //
  // Whether "move on" means "next agenda theme" or "closing phase" is itself a
  // fact the model was left to track by eye against the agenda list it only
  // saw once, at the very top of a long system prompt — testing found it
  // invented an extra, off-agenda theme instead of transitioning to
  // closing-pitch once the real agenda was actually exhausted. visitedThemes
  // already counts distinct themes mechanically, so comparing that count
  // against the agenda length removes the guesswork the same way the
  // already-covered-themes list above does.
  const isLastAgendaTheme = visitedThemes.length >= (analysis.coachingPriorities?.length ?? 0);
  const moveOnInstruction = isLastAgendaTheme
    ? `Every theme on your agenda has now been covered — do NOT open another agenda theme. Move straight into the closing phase instead: your next [TOPIC] tag must use the reserved theme "closing-pitch" (e.g. [TOPIC: closing-pitch::<question-slug>]), asking either a cross-cutting question or, if you're ready, the consolidated closing pitch itself.`
    : `Move to the next theme on your agenda now, and start a genuinely new [TOPIC] tag with a new theme part.`;
  const advanceInstruction =
    questionsInTheme < 2
      ? `This theme has only had ${questionsInTheme} question so far, and it needs at least one more before you're allowed to move on — ask the OTHER kind now (a business-level technical question if you've asked general so far, a general question if you've asked technical). Keep the THEME part of your [TOPIC] tag identical, only change the question part after "::".`
      : questionsInTheme >= 3
        ? `This theme has now had ${questionsInTheme} questions — that is the ceiling. Do NOT ask another question in this theme under any circumstances. ${moveOnInstruction}`
        : `This theme has had its minimum two questions — you may add one more third question ONLY if there is real, undiscussed ground left, otherwise: ${moveOnInstruction}`;

  if (quality && quality.verdict === "strong") {
    lines.push(
      `QUALITY GATE — an independent check of their last answer, not your own judgment: that answer is STRONG. It owns the work and shows real payoff. Do NOT rewrite it, do NOT hand back a "cleaner version", do NOT ask for a redo, do NOT hunt for a small tweak. Say in a sentence or two what specifically made it land — that part is settled. ${advanceInstruction}`,
    );
  } else if (quality && quality.verdict === "needs_work" && questionAttemptCount >= 2) {
    lines.push(
      `QUALITY GATE — an independent check of their last answer: this was their SECOND attempt at this exact question and it still needs work — ${quality.weakness} Do NOT ask for a third attempt — that's the cap. Acknowledge the attempt honestly, name that one gap in their own words, then give them a real, complete model answer to this exact question so they have something concrete to practise on their own — that resolves this question. ${advanceInstruction}`,
    );
  } else if (quality && quality.verdict === "needs_work") {
    lines.push(
      `QUALITY GATE — an independent check of their last answer: it needs exactly one real fix — ${quality.weakness} Coach that one thing, quoting their own words, and end with a redo of just that — this is their one redo at this exact question, so keep your [TOPIC] tag completely unchanged. Don't pile on other points, and don't invent additional weaknesses beyond this one.`,
    );
  } else if (questionAttemptCount >= 2) {
    // No usable verdict this turn, but the attempt cap is tracked mechanically
    // and holds regardless — never let a missing grade turn into a third try.
    lines.push(
      `No independent quality read on their last answer this turn, but this is already their SECOND attempt at this exact question — that's the cap regardless of the missing verdict. Use your own judgment: if it's solid, say what specifically made it land; if it still has a real gap, name it honestly in their own words and give them a real, complete model answer. Either way this question is resolved now — do NOT ask for a third attempt. ${advanceInstruction}`,
    );
  } else {
    // No usable verdict this turn (dropped call, ambiguous grade) — this is
    // exactly the gap where testing found the model skipping a redo entirely
    // and wandering into an already-finished theme instead. The structural
    // guardrail above (themes already covered) prevents the second half of
    // that; this gives the model an honest, bounded choice for the first.
    lines.push(
      `No independent quality read on their last answer this turn — use your own judgment on whether it needs a fix, the same way the persona describes (quote their real words if you name a weakness; never invent one if it looks solid). If you judge it solid, treat this question as resolved: ${advanceInstruction} If it needs a real fix, name that one gap in their own words and ask for a redo of just that — their one redo at this exact question — keeping your [TOPIC] tag completely unchanged.`,
    );
  }

  return lines.join("\n");
}

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    messages?: ChatMessage[];
    cvText?: string;
    analysis?: Analysis;
    targetRole?: string;
    provider?: string;
    model?: string;
  } | null;

  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response("Bad request: messages are required.", { status: 400 });
  }

  let provider: Provider = DEFAULT_PROVIDER;
  let model: string = DEFAULT_MODEL;
  if (isValidSelection(body.provider ?? "", body.model ?? "")) {
    provider = body.provider as Provider;
    model = body.model as string;
  }

  // A CV-driven session runs the structured agenda/practice-loop machinery
  // below; a general chat (no CV uploaded) is a plain, open conversation —
  // cvText and analysis are both optional for exactly that reason.
  const hasCv = Boolean(body.cvText && body.analysis);
  const system = hasCv
    ? buildCoachSystem(body.cvText!, body.analysis!, body.targetRole ?? "")
    : buildGeneralCoachSystem();

  const messages = body.messages
    .filter((m) => m.content?.trim())
    .map((m) => ({ role: m.role, content: m.content }));

  while (messages.length && messages[0].role !== "user") {
    messages.shift();
  }

  if (messages.length === 0) {
    return new Response("Bad request: no user message to respond to.", { status: 400 });
  }

  // Prepend a compact turn checklist to the last user message so rule
  // adherence (CV citation, question cap, awareness-first ordering, agenda
  // close) stays in the model's near attention window instead of relying
  // solely on the system prompt, which drifts as the conversation grows.
  // None of this applies to a general (no-CV) chat — there is no agenda,
  // theme, or practice loop to track, so it's skipped entirely.
  const lastIdx = messages.length - 1;
  if (hasCv && messages[lastIdx].role === "user") {
    const questionAttemptCount = countConsecutiveSameTopic(messages);
    const questionsInTheme = countDistinctQuestionsInCurrentTheme(messages);
    const isClosingPitch = isClosingPitchTurn(messages);
    const closingPitchAsked = closingPitchWasAsked(messages);
    const visitedThemes = getVisitedThemesInOrder(messages);
    const quality = await assessAnswerQuality(messages);
    const reminder = buildCvReminder(
      body.analysis!,
      questionAttemptCount,
      questionsInTheme,
      isClosingPitch,
      closingPitchAsked,
      visitedThemes,
      quality,
    );
    messages[lastIdx] = {
      ...messages[lastIdx],
      content: `${reminder}\n\n${messages[lastIdx].content}`,
    };
  }

  let stream: ReadableStream<Uint8Array>;
  try {
    stream = await streamChat(provider, model, system, messages);
  } catch (err) {
    console.error("chat error:", err);
    return new Response(describeProviderError(err), { status: 500 });
  }

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
