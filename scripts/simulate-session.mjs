/**
 * Simulates a complete multi-turn coaching session for a given CV profile.
 * Flow per session:
 *   1. Analyze CV via /api/analyze
 *   2. Coach opens (COACH_OPEN_TRIGGER via /api/chat)
 *   3. Candidate responds (simulated via OpenAI)
 *   4. Repeat coach→candidate for N turns, covering:
 *      - Opening statement critique + restatement
 *      - STAR practice on a key project (behavioral question)
 *      - A gap / challenging question
 *      - Language upgrade exercise
 * Returns: { profile, analysis, messages, evalScore }
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Load .env.local
const env = {};
const envPath = path.join(root, ".env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8").split("\n").forEach(line => {
    const [k, ...v] = line.split("=");
    if (k?.trim()) env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
  });
}
const OPENAI_KEY = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const BASE_URL = "http://localhost:3000";
const PROVIDER = "openai";
const MODEL = process.env.COACH_MODEL || "gpt-4o-mini";
const MAX_TURNS = 10; // coach + candidate turns after opening

// ─── USAGE LEDGER (direct calls only — coach/analyze usage is recorded ────────
// server-side in src/lib/usage.ts since those go through the real API routes) ──
const LEDGER_PATH = path.join(__dirname, "usage-ledger.json");
function recordUsageDirect(model, usage) {
  try {
    let ledger = { startedAt: new Date().toISOString(), totals: {} };
    if (fs.existsSync(LEDGER_PATH)) {
      try { ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8")); } catch { /* start fresh */ }
    }
    if (!ledger.totals) ledger.totals = {};
    const key = `openai:${model}`;
    const existing = ledger.totals[key] ?? { inputTokens: 0, outputTokens: 0, calls: 0 };
    ledger.totals[key] = {
      inputTokens: existing.inputTokens + (usage?.prompt_tokens ?? 0),
      outputTokens: existing.outputTokens + (usage?.completion_tokens ?? 0),
      calls: existing.calls + 1,
    };
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
  } catch (e) {
    console.error("usage ledger write failed:", e.message);
  }
}

// ─── OPENAI DIRECT CALL ──────────────────────────────────────────────────────
async function callOpenAI(messages, system, opts = {}) {
  const maxRetries = 4;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const model = opts.model ?? "gpt-4o-mini";
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: opts.max_tokens ?? 400,
        response_format: opts.json ? { type: "json_object" } : undefined,
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });
    if (resp.status === 429 && attempt < maxRetries) {
      const retryAfterMs = parseInt(resp.headers.get("retry-after-ms") ?? "0", 10)
        || (2 ** attempt) * 5000;
      await new Promise(r => setTimeout(r, retryAfterMs));
      continue;
    }
    if (!resp.ok) throw new Error(`OpenAI ${resp.status}: ${await resp.text()}`);
    const data = await resp.json();
    recordUsageDirect(model, data.usage);
    return data.choices[0].message.content;
  }
}

// ─── CANDIDATE SIMULATOR ─────────────────────────────────────────────────────
function buildCandidateSystem(profile, analysis) {
  return `You are simulating ${analysis?.detectedRole ?? "an IT professional"} in a 1-on-1 coaching session.

Your CV summary:
${profile.cvText.slice(0, 800)}

Target role: ${profile.targetRole}

Your coaching weaknesses (behave authentically — do NOT suddenly become perfect):
- Use "we" instead of "I" unless corrected. When corrected, try "I" but still partially slip.
- Give vague results first: "it went well", "the client was happy". Provide specifics ONLY after the coach probes.
- Oversell your Situation/context (2-3 sentences) and undersell your Action (1 sentence).
- When asked to say something out loud, attempt it — imperfectly. The coach must push you.
- When challenged about a gap or a career move, be slightly defensive at first, then honest.
- You are NOT terrible — you are a solid professional with real achievements but poor self-presentation.
- Keep responses to 80-180 words unless giving a full practice answer (up to 250 words).

IMPORTANT: respond as the candidate in first person. No meta-commentary. Just be the person.`;
}

// ─── ANALYZE CV ──────────────────────────────────────────────────────────────
async function analyzeCV(profile) {
  const form = new FormData();
  form.append("text", profile.cvText);
  form.append("targetRole", profile.targetRole);
  form.append("provider", PROVIDER);
  form.append("model", MODEL);

  const resp = await fetch(`${BASE_URL}/api/analyze`, {
    method: "POST",
    body: form,
  });
  if (!resp.ok) throw new Error(`Analyze failed ${resp.status}: ${await resp.text()}`);
  const data = await resp.json();
  return data;
}

// ─── STREAM COACH MESSAGE ────────────────────────────────────────────────────
async function getCoachResponse(messages, cvText, analysis, targetRole) {
  const maxRetries = 3;
  let resp;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    resp = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, cvText, analysis, targetRole, provider: PROVIDER, model: MODEL }),
    });
    if (resp.ok) break;
    const text = await resp.text();
    // Retry only on rate-limit-induced 500s; surface other errors immediately
    if (resp.status === 500 && /429|rate.limit|rate_limit/i.test(text) && attempt < maxRetries) {
      await new Promise(r => setTimeout(r, (2 ** attempt) * 8000));
      continue;
    }
    throw new Error(`Chat failed ${resp.status}`);
  }
  if (!resp.ok || !resp.body) throw new Error(`Chat failed ${resp.status}`);

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }
  return text.trim();
}

// ─── SESSION DRIVER ──────────────────────────────────────────────────────────
// Determines what the simulated candidate should say next
function buildCandidatePrompt(turn, coachMsg, analysis) {
  const hints = {
    0: "The coach just gave you their opening assessment. Respond to the question about your opening statement — say it out loud but it should sound stiff and slightly robotic. Then ask if the 'leading' part is too strong.",
    1: "The coach is pushing you on your opening statement. Try to improve it but still use some passive phrasing. Say something like 'I was involved in...' for one of your projects.",
    2: "The coach asked you to practice a behavioral question. Give a STAR answer about your strongest project from your CV. But: spend 60% on Situation/context, say 'we' throughout the Action, and end with 'the project was delivered successfully' — no specific metric.",
    3: "The coach is coaching your STAR answer. Acknowledge the feedback. Try to redo the answer with 'I' language but still give a vague result. Ask if the result you gave is enough.",
    4: "The coach probed for a specific number. Now give an actual metric (make one up that fits your domain — percentage, time saved, $ value, user count) but frame it passively: 'the result was...'",
    5: "The coach is now asking about a gap in your CV or a challenging aspect. Be slightly defensive first ('I don't think that's really a gap...') then honest about it.",
    6: "Accept the gap coaching. Ask the coach how you should frame this in an interview.",
    7: "The coach is working on your language. Try to restate one of your bullet points using active language but still need some correction.",
    8: "The coach is wrapping up one area. Show genuine improvement but ask about another concern you have — pick something from your actual background that worries you.",
    9: "Give a final improved practice answer incorporating everything the coach has worked on. Still not perfect but noticeably better than your first attempt.",
  };
  return hints[turn] ?? "Respond naturally to what the coach just said. Show incremental improvement.";
}

// ─── RUN ONE SESSION ─────────────────────────────────────────────────────────
export async function runSession(profile, verbose = false) {
  const log = verbose ? console.log : () => {};
  log(`\n${"═".repeat(60)}`);
  log(`SESSION: ${profile.label}`);
  log("═".repeat(60));

  // Step 1: Analyze
  log("  → Analyzing CV...");
  let analyzeResult;
  try {
    analyzeResult = await analyzeCV(profile);
  } catch (e) {
    return { profile, error: `Analyze failed: ${e.message}`, messages: [], evalScore: null };
  }
  const { cvText, analysis } = analyzeResult;
  log(`  ✓ Analysis: ${analysis.detectedRole} / ${analysis.seniority}`);

  const candidateSystem = buildCandidateSystem(profile, analysis);
  const messages = [];

  // Step 2: Coach opens
  log("  → Coach opening...");
  const trigger = "[COACHING_SESSION_START]";
  messages.push({ role: "user", content: trigger });
  let coachMsg;
  try {
    coachMsg = await getCoachResponse([...messages], cvText, analysis, profile.targetRole);
  } catch (e) {
    return { profile, analysis, error: `Coach open failed: ${e.message}`, messages, evalScore: null };
  }
  messages.push({ role: "assistant", content: coachMsg });
  log(`  ✓ Coach opened (${coachMsg.split(" ").length} words)`);

  // Steps 3-N: Alternating candidate → coach turns
  for (let turn = 0; turn < MAX_TURNS; turn++) {
    // Candidate responds
    const hint = buildCandidatePrompt(turn, coachMsg, analysis);
    const candidateHistory = messages
      .filter(m => m.content !== trigger)
      .map(m => ({ role: m.role, content: m.content }));

    let candidateReply;
    try {
      candidateReply = await callOpenAI(
        [...candidateHistory, { role: "user", content: `[Coaching hint for simulation: ${hint}]` }],
        candidateSystem,
        { max_tokens: 300 }
      );
    } catch (e) {
      log(`  ✗ Candidate sim failed at turn ${turn}: ${e.message}`);
      break;
    }
    messages.push({ role: "user", content: candidateReply });
    log(`  → Candidate turn ${turn + 1} (${candidateReply.split(" ").length}w)`);

    // Coach responds
    try {
      coachMsg = await getCoachResponse([...messages], cvText, analysis, profile.targetRole);
    } catch (e) {
      log(`  ✗ Coach failed at turn ${turn}: ${e.message}`);
      break;
    }
    messages.push({ role: "assistant", content: coachMsg });
    log(`  ✓ Coach turn ${turn + 1} (${coachMsg.split(" ").length}w)`);
  }

  log(`  ✓ Session complete — ${messages.length} messages`);
  return { profile, analysis, messages, cvText };
}

// ─── EVAL ────────────────────────────────────────────────────────────────────
const EVAL_SYSTEM = `You are a senior ICF-certified coaching quality assessor. Score this coaching session.

DIMENSIONS (score each 0-10; use null if genuinely not applicable for an opening-only transcript):
D1 Conversational register: No headers/bullets/markdown. Short paragraphs. Direct address by name.
D2 Focus discipline: One coaching point per turn. One question per turn.
D3 Awareness creation: After candidate speaks, coach asks what they noticed BEFORE giving feedback. (N/A only if no candidate speech in transcript)
D4 Question precision: Every question names a real phrase/project/company from this specific CV.
D5 Language vigilance: Coach catches passive phrases ("was involved in","we did") in candidate speech and asks for active restatement.
D6 Psychological safety: Coach normalises imperfect practice. Warm but direct. Pushes candidate to attempt.
D7 STAR enforcement: Coach probes for specific individual actions (not "we") and measurable results. Asks for redo after coaching.
D8 Coach drives agenda: Coach always states next focus. Never "what would you like to work on?"

Return JSON only:
{
  "dimensions": [
    {"id":"D1","score":0,"evidence":"direct quote or observation","verdict":"pass|marginal|fail|na","fix":"one concrete prompt change"}
  ],
  "overall": {"score":0,"max":80,"pct":0,"verdict":"pass|marginal|fail","topIssues":["..."]}
}`;

// ─── MECHANICAL CHECKS (hybrid eval) ────────────────────────────────────────
// The LLM judge is subjective and noisy run-to-run (observed 50%→73% swings on
// an identical profile/prompt). D2 and D8 have objective, regex-checkable
// signatures — count them directly instead of trusting the judge's read alone.
const DEFERRAL_PATTERNS = [
  /let me know your thoughts/i,
  /feel free to share/i,
  /share what you think/i,
  /does that make sense\??/i,
  /any questions\??/i,
  /where would you like to go from here/i,
  /is there anything else/i,
  /what would you like to (work on|explore|cover)/i,
  /anything else you.{0,20}(like to|want to|explore)/i,
];

function mechanicalChecks(messages) {
  const coachTurns = messages.filter(m => m.role === "assistant" && m.content?.trim());
  const perTurn = coachTurns.map((m) => {
    const questionMarks = (m.content.match(/\?/g) ?? []).length;
    const deferralHits = DEFERRAL_PATTERNS.filter(rx => rx.test(m.content)).map(rx => rx.source);
    return { questionMarks, deferralHits };
  });
  return {
    perTurn,
    maxQuestionMarksInTurn: perTurn.reduce((m, t) => Math.max(m, t.questionMarks), 0),
    turnsOverQuestionCap: perTurn.filter(t => t.questionMarks > 2).length,
    turnsWithDeferral: perTurn.filter(t => t.deferralHits.length > 0).length,
  };
}

// Recompute overall from the (possibly overridden) per-dimension scores,
// excluding "na" dimensions — mirrors the judge's own 0-10-per-dim, ≥75%
// pass / 60-74% marginal / <60% fail rubric.
function recomputeOverall(result) {
  const scored = result.dimensions.filter(d => d.verdict !== "na" && typeof d.score === "number");
  if (scored.length === 0) return;
  const score = scored.reduce((s, d) => s + d.score, 0);
  const max = scored.length * 10;
  const pct = Math.round((score / max) * 100);
  const verdict = pct >= 75 ? "pass" : pct >= 60 ? "marginal" : "fail";
  result.overall = { ...result.overall, score, max, pct, verdict };
}

function applyMechanicalOverrides(result, messages) {
  if (!result?.dimensions) return result;
  const mech = mechanicalChecks(messages);
  result.mechanicalChecks = mech;
  let overridden = false;

  const d2 = result.dimensions.find(d => d.id === "D2");
  if (d2 && mech.turnsOverQuestionCap > 0 && d2.score > 4) {
    d2.score = 4;
    d2.verdict = "fail";
    d2.evidence = `Mechanical override: ${mech.turnsOverQuestionCap} turn(s) exceed the 2-question-mark cap (max ${mech.maxQuestionMarksInTurn} in one turn). Judge said: ${d2.evidence ?? "n/a"}`;
    d2.fix = "Model is exceeding RULE D's hard question-mark cap in generation — needs turn-local reinforcement, not just a system-prompt rule.";
    overridden = true;
  }

  const d8 = result.dimensions.find(d => d.id === "D8");
  if (d8 && mech.turnsWithDeferral > 0 && d8.score > 4) {
    d8.score = 4;
    d8.verdict = "fail";
    d8.evidence = `Mechanical override: ${mech.turnsWithDeferral} turn(s) contain a banned deferral phrase. Judge said: ${d8.evidence ?? "n/a"}`;
    d8.fix = "Coach used a banned deferral phrase — reinforce the banned-phrase list turn-locally.";
    overridden = true;
  }

  if (overridden) recomputeOverall(result);
  return result;
}

export async function evalSession(profile, analysis, messages) {
  const transcript = messages
    .filter(m => m.content !== "[COACHING_SESSION_START]" && m.content.trim())
    .map(m => `[${m.role.toUpperCase()}]: ${m.content}`)
    .join("\n\n");

  const userMsg = `Candidate: ${profile.label}\nTarget role: ${profile.targetRole}\n\nTRANSCRIPT:\n${transcript}`;

  try {
    const raw = await callOpenAI(
      [{ role: "user", content: userMsg }],
      EVAL_SYSTEM,
      { model: "gpt-4o", max_tokens: 1500, json: true }
    );
    const result = JSON.parse(raw);
    return applyMechanicalOverrides(result, messages);
  } catch (e) {
    return { error: e.message };
  }
}
