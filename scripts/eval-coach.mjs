/**
 * Usage: node scripts/eval-coach.mjs [session-json-file]
 *
 * If no file is given, uses the hardcoded sample transcript below.
 * Reads OPENAI_API_KEY from .env.local.
 *
 * Output: prints the dimension scores + overall verdict to stdout.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Load env
const envPath = path.join(root, ".env.local");
const env = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const [k, ...v] = line.split("=");
      if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
    });
}
const OPENAI_KEY = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("ERROR: OPENAI_API_KEY not found in .env.local");
  process.exit(1);
}

// ─── RUBRIC (inline copy so script is self-contained) ────────────────────────
const DIMENSIONS = [
  {
    id: "D1", name: "Conversational register",
    gold: "Short paragraphs, direct address, zero markdown. Reads as spoken, not written.",
    failure: "Headers ('Strengths:'), bullet hyphens, numbered lists, bold text.",
  },
  {
    id: "D2", name: "Focus discipline — one thing at a time",
    gold: "One insight per message. One question per message.",
    failure: "Multiple strengths + priorities + draft + question all in one message.",
  },
  {
    id: "D3", name: "Awareness creation — insight before answers",
    gold: "Coach names observation, asks candidate what they noticed, then redirects.",
    failure: "Coach delivers conclusions without first asking candidate what they noticed.",
  },
  {
    id: "D4", name: "Question precision — specific to this candidate",
    gold: "Questions name real CV phrases, companies, or projects. Force genuine reflection.",
    failure: "Generic questions ('tell me more', 'what feels off?') not tied to this CV.",
  },
  {
    id: "D5", name: "Language vigilance — passive language caught",
    gold: "Coach catches 'was involved in / participated / assisted' and asks for restatement with active verb.",
    failure: "Coach misses passive language; or worse, uses it in own responses.",
  },
  {
    id: "D6", name: "Psychological safety",
    gold: "Coach normalises imperfect practice. Pushes candidate to attempt before ready.",
    failure: "Clinical, evaluative tone. No warmth. Feels like a performance review.",
  },
  {
    id: "D7", name: "STAR enforcement — result probing",
    gold: "Never accepts vague results. Always probes for number or concrete outcome. Always asks for a redo.",
    failure: "Accepts 'it went well' unchallenged. No redo requested after coaching.",
  },
  {
    id: "D8", name: "Coach drives the agenda",
    gold: "Coach always states next focus. Never 'What would you like to work on?'",
    failure: "Coach asks candidate what they want to cover. Session meanders.",
  },
];

const EVAL_SYSTEM = `You are a senior ICF-certified coaching quality assessor evaluating an AI interview coaching session.

For each dimension below, score the coach's behaviour 0-10 based on what appears in the transcript.
If there is not enough transcript to evaluate a dimension (e.g. no candidate answer yet for D7),
score it null and set verdict to "na".

Dimensions:
${DIMENSIONS.map(d => `${d.id}: ${d.name}
  Gold: ${d.gold}
  Failure: ${d.failure}`).join("\n\n")}

Return ONLY valid JSON:
{
  "dimensions": [
    { "id": "D1", "score": 0, "evidence": "quote or specific reference from transcript", "verdict": "fail|marginal|pass|na", "fix": "one concrete prompt change to fix this" }
  ],
  "overall": {
    "score": 0,
    "max": 80,
    "pct": 0,
    "verdict": "fail|marginal|pass",
    "topIssues": ["one-line description of top 3 issues"]
  }
}`;

// ─── LOAD SESSION ─────────────────────────────────────────────────────────────
let session;
if (process.argv[2]) {
  session = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
} else {
  // Default: the Ravi Kumar session captured from browser
  session = {
    role: "Senior Java Backend Engineer",
    seniority: "Mid-level (6 yrs)",
    targetRole: "Senior Java Backend Engineer at Infosys — 7+ years Java/Spring Boot, microservices, AWS, strong delivery track record required",
    messages: [
      { role: "user", content: "[COACHING_SESSION_START]" },
      {
        role: "assistant",
        content: `You are preparing for a Senior Java Backend Engineer role with a focus on microservices and AWS. Your background includes refining banking and e-commerce solutions, demonstrating significant technical skills with Java, Spring Boot, and AWS.\n\nStrengths:\n- Developed microservices and REST APIs at HCL Technologies, playing a key role in a banking application migration.\n- Consistent experience in Java 11 and Spring Boot in senior positions.\n- Active involvement in Agile methodologies, including sprint planning and code reviews.\n\nMost important things to work on:\n1. Your opening statement.\n2. Clear project narratives that highlight your contributions and impact.\n3. Preparation for likely technical and behavioral questions.\n\nYour draft opening statement is: "undefined." \n\nNow, please read your opening statement and tell me what feels off.`,
      },
    ],
  };
}

const transcript = session.messages
  .filter(m => m.content !== "[COACHING_SESSION_START]")
  .map(m => `[${m.role.toUpperCase()}]: ${m.content}`)
  .join("\n\n");

const userMessage = `Evaluate this coaching session transcript.

Candidate profile: ${session.role}, ${session.seniority}
Target role: ${session.targetRole}

TRANSCRIPT:
${transcript}`;

// ─── CALL OPENAI ──────────────────────────────────────────────────────────────
const resp = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: EVAL_SYSTEM },
      { role: "user", content: userMessage },
    ],
  }),
});

if (!resp.ok) {
  console.error("OpenAI error:", await resp.text());
  process.exit(1);
}

const data = await resp.json();
const result = JSON.parse(data.choices[0].message.content);

// ─── RENDER ───────────────────────────────────────────────────────────────────
const PASS  = "\x1b[32m✓ PASS\x1b[0m";
const MARG  = "\x1b[33m~ MARGINAL\x1b[0m";
const FAIL  = "\x1b[31m✗ FAIL\x1b[0m";
const NA    = "\x1b[90m– N/A\x1b[0m";

function verdict(v) {
  return v === "pass" ? PASS : v === "marginal" ? MARG : v === "na" ? NA : FAIL;
}

console.log("\n═══════════════════════════════════════════════════════════════");
console.log("  STORY COACH — SESSION QUALITY EVALUATION");
console.log(`  Session: ${session.role} / ${session.seniority}`);
console.log("═══════════════════════════════════════════════════════════════\n");

for (const d of result.dimensions) {
  const dim = DIMENSIONS.find(x => x.id === d.id);
  const scoreStr = d.score !== null ? `${d.score}/10` : " n/a";
  console.log(`${d.id}  ${dim?.name ?? d.id}`);
  console.log(`    Score:    ${scoreStr}  ${verdict(d.verdict)}`);
  console.log(`    Evidence: ${d.evidence}`);
  if (d.verdict !== "na") {
    console.log(`    Fix:      ${d.fix}`);
  }
  console.log();
}

const ov = result.overall;
const pct = Math.round(ov.pct);
console.log("───────────────────────────────────────────────────────────────");
console.log(`  OVERALL: ${ov.score}/${ov.max}  (${pct}%)  ${verdict(ov.verdict)}`);
console.log(`  Target:  ≥75% for professional coaching standard`);
console.log("───────────────────────────────────────────────────────────────");
console.log("\n  TOP ISSUES:");
(ov.topIssues ?? []).forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
console.log();
