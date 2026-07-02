# QA Candidate-Playing Guide

For a Claude Code session on another machine that already has this repo running
and needs to **act as the candidate** in coaching sessions — the same role
Claude played during this app's QA pass. This is a testing methodology guide,
not a product doc.

Assumes: repo cloned/synced, `npm install` done, `.env.local` has a working
`OPENAI_API_KEY`, dev server runs (`npm run dev`).

## Two ways to run a session

### A. Through the actual browser UI
Normal path — go to `/`, click "Connect with Coach", pick a profile from the
database dropdown or paste a CV, fill in the target role, click "Start
coaching session", then answer in the chat panel as the candidate.

### B. Direct-HTTP harness (much faster for high-volume testing)
Bypasses the browser entirely — calls `/api/analyze` and `/api/chat` directly
from Node scripts, but exercises the exact same production code path. This is
what was actually used to run every QA session referenced below. Put these in
a scratch folder (not the repo):

**`start-session.mjs`** — starts a session from a profile in `sample-cvs.ts`:
```js
// Usage: node start-session.mjs <profileId> <sessionFilePath>
import fs from "fs";

const [, , profileId, sessionFilePath] = process.argv;
const src = fs.readFileSync("../src/lib/sample-cvs.ts", "utf8"); // adjust path
const arrayStart = src.indexOf("export const SAMPLE_PROFILES");
const arrayBody = src.slice(src.indexOf("[", arrayStart));
// eslint-disable-next-line no-eval
const SAMPLE_PROFILES = eval(arrayBody);

const profile = SAMPLE_PROFILES.find((p) => p.id === profileId);
if (!profile) {
  console.error("Not found:", profileId, "available:", SAMPLE_PROFILES.map((p) => p.id));
  process.exit(1);
}

const res = await fetch("http://localhost:3000/api/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: profile.cvText, targetRole: profile.targetRole, provider: "openai", model: "gpt-4o-mini" }),
});
const data = await res.json();
const session = { profileId, label: profile.label, cvText: data.cvText, targetRole: profile.targetRole, analysis: data.analysis, messages: [] };
fs.writeFileSync(sessionFilePath, JSON.stringify(session, null, 2));
console.log(JSON.stringify({ detectedRole: data.analysis.detectedRole, themes: data.analysis.coachingPriorities?.map((p) => p.area) }, null, 2));
```

**`turn.mjs`** — submits one candidate turn (or `__OPEN__` to trigger the
coach's opening message) and prints the coach's reply:
```js
// Usage: node turn.mjs <sessionFilePath> <userMessageFilePath|__OPEN__>
import fs from "fs";

const [, , sessionFilePath, userMessageArg] = process.argv;
const OPEN_TRIGGER = "[COACHING_SESSION_START]";
const session = JSON.parse(fs.readFileSync(sessionFilePath, "utf8"));
const userContent = userMessageArg === "__OPEN__" ? OPEN_TRIGGER : fs.readFileSync(userMessageArg, "utf8");
session.messages.push({ role: "user", content: userContent });

const res = await fetch("http://localhost:3000/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: session.messages, cvText: session.cvText, analysis: session.analysis, targetRole: session.targetRole, provider: "openai", model: "gpt-4o-mini" }),
});
const text = await res.text();
session.messages.push({ role: "assistant", content: text });
fs.writeFileSync(sessionFilePath, JSON.stringify(session, null, 2));
console.log(text);
```

Workflow: write the candidate's answer to a scratch text file, then
`node turn.mjs session.json msg.txt`. Repeat until the session closes (ends
on a `[TOPIC: closing-pitch::closing-pitch]` tag with no further question).

Note: `scripts/simulate-session.mjs` and `scripts/profiles.mjs` already in
this repo are a **different, older** auto-simulation system with its own
20-profile set — not what this guide describes. Don't use those; write the
candidate turns yourself as described below.

## Your job: play the candidate, not just fill a form

This is the actual point of the exercise: exercise the coaching loop and
quality gate the way a real, varied population of candidates would, not the
way a compliant test script would. For each session:

**Ground every answer in the specific CV.** Reference real companies,
projects, and technologies from `profile.cvText` / `data.analysis`. Invented-
sounding generic answers don't exercise anything real.

**Hold a deliberate quality mix across the session** (this is the important
part — don't let every answer be strong):
- **~25-30% weak** — vague, passive ("we", "was involved in"), no metrics,
  generic. These should trigger the quality gate's redo request. After the
  coach names the gap, answer again with real specifics and numbers.
- **~10-15% "good but needs slight improvement"** — solid and specific but
  missing one thing (a number, ownership language). This is a calibration
  check: does the gate correctly catch these, or rubber-stamp them? Don't
  over-polish these on the first pass — that defeats the point.
- **Remainder strong** — owns the work ("I decided/built/led"), concrete
  actions, a real quantified outcome. No redo should be triggered.
- **1-2 deviation turns per session** — instead of answering the pending
  question, ask something genuinely tangential (a real clarifying question,
  a scope check, an aside) that a real candidate might actually ask
  mid-interview. Not a refusal to answer — a believable detour. Confirm the
  coach answers it and returns to the original question without treating it
  as a graded attempt.

**Run the full session, not a sample.** Opening → each theme's practice loop
(the coach asks 2-3 questions per theme) → closing cross-cutting question(s)
→ closing pitch. Don't stop early; the interesting failure modes (agenda
exhaustion, theme-order drift) mostly show up late in a session.

### Example answer pairs (adapt style, don't copy verbatim)

**Weak → redo:**
> Weak: "We worked with L3 and SME teams pretty regularly whenever an issue
> was beyond what we could fix at our level."
>
> Redo: "When an issue went beyond bot-level fixes, I packaged it for L3 —
> logs, the exact failure point, what I'd already ruled out. For SLA-critical
> windows I set a personal rule of escalating at the 50% mark of the SLA
> clock rather than waiting for it to be at risk."

**Good-but-improvable → redo:**
> First pass: "I built a checklist covering every credential, file path, and
> environment config each bot depended on, then personally ran twelve
> critical bots end to end against the DR environment ahead of the actual
> exercise date."
>
> (Missing: what did the pre-validation actually catch, and what was the
> outcome on exercise day.)

**Deviation:**
> "Quick question before I answer that — when you say 'questionnaires,' are
> you asking about structured surveys specifically, or does that include
> semi-structured interview guides too?"

## Known, accepted quirks — don't re-report these as new bugs

These were investigated during this app's QA pass and characterized as
inherent LLM instruction-following variance, not code defects. Don't spend
time re-diagnosing them from scratch if you see them again:

- **Floor-of-2 occasionally skipped** (~20-30% of the time) — a theme
  sometimes gets only 1 question instead of the required minimum 2 before
  the coach moves on. Verified via debug logging that the reminder sent to
  the model is correctly formed; the model just doesn't always follow it.
- **`::deviation` tag marker occasionally missing** on a turn that was
  otherwise handled correctly (coach answered the tangent and returned to
  the pending question, no attempt-count corruption). Cosmetic only — checked
  and found no functional harm in every observed instance.
- **Occasional theme relabeling on a redo** — the `[TOPIC]` tag's theme part
  sometimes changes slightly across a redo of the same question. Harmless as
  long as continuity tracking (attempt count) still behaves correctly.

## What actually is worth fixing

Contrast with the above — these are the severity tier that got fixed during
this pass, and the same pattern to watch for going forward:

- **A flagged coaching priority never gets asked about at all** — check that
  the number of distinct themes covered in the transcript matches
  `analysis.coachingPriorities.length`. If it's short, a priority got
  silently dropped.
- **An invented, off-agenda theme appears** — a `[TOPIC]` theme that doesn't
  correspond to anything in `analysis.coachingPriorities`.
- **A weak/needs_work answer skips its redo entirely** *and* the coach also
  jumps to an unrelated theme in the same turn (compound failure, not just a
  pacing miss).
- **The `[TOPIC]` tag is missing for several consecutive turns** (not just
  one) — check whether it self-corrects within a turn or two; if not, the
  session's structural guardrails are silently off for its remainder.

If you find something in this tier, fix it the same way the existing fixes in
`src/app/api/chat/route.ts` are built: turn the fact into something computed
mechanically from the message history and handed to the model as an explicit
instruction, rather than asking the model to self-recognize its own state.
That pattern (see `getVisitedThemesInOrder`, `isLastAgendaTheme` in that file)
is what made every fix in this pass actually hold up under retesting.

## Available sample profiles (`src/lib/sample-cvs.ts`)

| id | profile |
|---|---|
| `janani-qa-7yr` | Janani Wanigasuriya — QA Lead / Senior Consultant · 7 yrs |
| `deepa-qa-6yr` | Deepa Kusugal — QA Analyst · 6.8 yrs · Banking/SWIFT |
| `hasitha-ux-8yr` | Hasitha Jayarathne — Senior UX Designer · 8+ yrs |
| `vanaja-rpa-6yr` | Vanaja Sidagam — RPA Support Engineer · 6+ yrs · Citi Bank |
| `indira-qa-7yr` | Indira K J — QA Engineer · 7.4 yrs · Mobile/Web |
| `shrayesh-ba-15yr` | Shrayesh Sourav — Lead BA · 15+ yrs · Banking/BFS |
| `tooshi-rpa-9yr` | Tooshi Khare — RPA Team Lead · ~9 yrs · Life Sciences |
| `bhonagiri-em-18yr` | Bhonagiri Naveen Kumar — Assoc. Engineering Manager · 18+ yrs |
| `chandima-qa-8yr` | Chandima Perera — Lead SE / QA · 8+ yrs · PEGA Insurance |
| `naveen-pm-20yr` | Naveen Jeevan Kelkar — Project Manager / Delivery · 20+ yrs |
| `anudeep-sdet-7yr` | Anudeep Anugonda — Lead SDET / QA Automation · 7+ yrs |
| `vaishnavi-analyst-3yr` | Malladi Vaishnavi — Associate Engineer / Data Analytics · ~3 yrs |

Each `/api/analyze` call re-derives the coaching priorities fresh (it's an
LLM call, not cached), so the exact theme list and count can vary slightly
run to run for the same profile — that's expected, not a bug.
