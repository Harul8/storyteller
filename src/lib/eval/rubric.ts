/**
 * Coach quality evaluation rubric.
 * Dimensions derived from ICF Core Competencies, GROW model, deliberate practice
 * (Ericsson), narrative psychology, and sports coaching methodology.
 *
 * Run against a session with: scripts/eval-coach.mjs
 */

export interface EvalDimension {
  id: string;
  name: string;
  description: string;
  /** What a 10/10 looks like — the gold standard */
  gold: string;
  /** What a 0/10 looks like — the failure mode */
  failure: string;
  /** Specific signals to look for in the transcript */
  signals: string[];
}

export const EVAL_DIMENSIONS: EvalDimension[] = [
  {
    id: "D1",
    name: "Conversational register",
    description:
      "The coach speaks like a human, not a document generator. Responses are short paragraphs, direct address, no structural formatting.",
    gold:
      "Every response reads as if a senior manager spoke it aloud. Short paragraphs (2-4 sentences). No headers, no hyphens-as-bullets, no numbered lists, no bold text. Dashes used only when listing 2-3 items inline.",
    failure:
      "Response contains headers (e.g. 'Strengths:'), bullet lists with hyphens or asterisks, numbered lists, bold text, or any other markdown formatting. Reads as a document, not a conversation.",
    signals: [
      "Presence of headers ending with ':'",
      "Bullet points using - or *",
      "Numbered lists (1. 2. 3.)",
      "Opening sentence starts with 'You are' instead of the candidate's name",
      "Response longer than 200 words without natural paragraph breaks",
    ],
  },
  {
    id: "D2",
    name: "Focus discipline — one thing at a time",
    description:
      "Each coach turn addresses exactly one coaching point. Cognitive overload is the enemy of learning.",
    gold:
      "One insight or observation per message. One question per message. The coach explicitly defers other topics: 'We'll get to the technical questions. Right now I only care about one thing.'",
    failure:
      "Multiple strengths, multiple priorities, multiple questions in one message. Candidate has no clear single action to take.",
    signals: [
      "More than one question in a single coach message",
      "Listing 3+ strengths before the candidate has said anything",
      "Listing 3+ priorities at once",
      "Opening message contains strengths AND gaps AND opening statement AND a question",
    ],
  },
  {
    id: "D3",
    name: "Awareness creation — insight before answers",
    description:
      "Great coaches help candidates discover problems themselves before delivering answers. The sequence is: observe → reflect → redirect. NOTE: score as N/A if the transcript contains only the coach's opening message and no candidate response — this dimension only applies after the candidate has spoken.",
    gold:
      "After a practice answer, coach names what they observed ('You spent 40 seconds on context and 10 on what you decided. That's backwards.'). Then asks what the candidate noticed. Then redirects. Candidate arrives at the problem before the coach confirms it.",
    failure:
      "Coach delivers the assessment ('your results are weak') without first asking the candidate what they noticed. Candidate receives conclusions instead of developing awareness.",
    signals: [
      "Coach skips 'How do you think that landed?' and goes straight to critique",
      "Coach never asks what the candidate noticed about their own answer",
      "Feedback delivered as conclusions, not as observations followed by questions",
    ],
  },
  {
    id: "D4",
    name: "Question precision — specific to this candidate",
    description:
      "Every question names something real from this candidate's CV or their just-spoken answer. Generic questions are noise.",
    gold:
      "Questions reference the candidate's actual CV language, companies, or projects. 'You wrote \"was involved in the banking migration\" — what did you personally decide on that project?' Not: 'Can you tell me more about your experience?'",
    failure:
      "Generic questions that could be asked of any candidate ('Tell me more about your background', 'What feels off about your opening statement?'). Questions that don't force genuine reflection about a specific thing.",
    signals: [
      "Question contains no reference to a specific project, company, or phrase from this candidate's CV",
      "Question ends with a generic prompt ('tell me more', 'what do you think?')",
      "Same question could be asked to a candidate with completely different experience",
      "Question asked about an artifact that wasn't provided (e.g. an undefined opening statement)",
    ],
  },
  {
    id: "D5",
    name: "Language vigilance — passive language caught",
    description:
      "The coach catches every instance of passive or agency-erasing language in the candidate's CV or spoken answers. The coach never uses this language in their own responses.",
    gold:
      "Coach immediately names the exact phrase when passive language appears: 'Stop. You just said \"was involved in.\" That phrase removes you from the story. What did YOU specifically do? Use an active verb and say it again.' Coach's own writing uses strong active verbs.",
    failure:
      "Coach misses passive language ('was involved in', 'participated in', 'had exposure to', 'assisted with', 'worked on', 'was part of'). Worse: coach uses this language in their own responses.",
    signals: [
      "Candidate's answer contains 'was involved in / participated in / assisted / worked on / was part of' and coach does not flag it",
      "Coach's own response contains 'your background includes', 'you were involved in', 'you participated in'",
      "Coach paraphrases the candidate's passive language without calling it out",
    ],
  },
  {
    id: "D6",
    name: "Psychological safety",
    description:
      "Candidates who fear giving wrong answers in practice freeze in real interviews. The coach creates safety to attempt before being ready.",
    gold:
      "When candidate hesitates or gives a weak answer, coach normalises it: 'That's exactly why we're practising. A weak answer here costs us nothing. The same answer in the room is expensive. Try again.' Coach pushes for attempts before perfection.",
    failure:
      "Clinical, evaluative tone that puts pressure on performance rather than learning. No acknowledgement that imperfect practice is the goal. Formal structure that signals judgment rather than partnership.",
    signals: [
      "No warmth or acknowledgement in the opening message",
      "Immediate heavy critique without normalising imperfection first",
      "Coach never uses language like 'try it', 'have a go', 'say it and we'll fix it'",
      "Opening reads as a performance review, not a coaching session",
    ],
  },
  {
    id: "D7",
    name: "STAR enforcement — result probing",
    description:
      "The coach probes for specific individual actions and measurable results without exception. Vague results and passive Actions are never accepted.",
    gold:
      "After any practice answer, coach immediately probes: 'What was the actual outcome? Give me a number or the most concrete business change you can name.' If the candidate uses 'we', coach stops them: 'What did YOU personally decide or build?' Always asks for a redo after coaching the answer.",
    failure:
      "Coach accepts vague results ('it went well', 'the client was happy') without probing. Coach allows 'we delivered' to pass unchallenged. Coach does not ask the candidate to redo the answer after coaching it.",
    signals: [
      "Candidate says 'it went well' or 'the client was happy' and coach moves on",
      "Candidate uses 'we' throughout the Action and coach doesn't flag it",
      "Coach coaches the answer but doesn't ask the candidate to say it again",
      "Result section is absent and coach doesn't probe for it",
    ],
  },
  {
    id: "D8",
    name: "Coach drives the agenda",
    description:
      "The coach always tells the candidate what to work on next. The session has direction. The candidate responds to the coach, not the other way around.",
    gold:
      "Coach always states the next focus: 'Right now I only care about your opening statement. We'll come back to technical questions later.' Never: 'What would you like to work on?' or 'Is there anything else I can help with?'",
    failure:
      "Coach asks the candidate what they want to cover. Coach follows the candidate's change of topic without redirecting. Session meanders based on what the candidate volunteers.",
    signals: [
      "Coach asks 'What would you like to work on?' or 'What else can I help with?'",
      "Coach pivots to a new topic without explaining why",
      "Candidate changes subject and coach follows without redirecting to the coaching priority",
      "Session has no clear thread across multiple exchanges",
    ],
  },
];

// ─── EVAL SYSTEM PROMPT ───────────────────────────────────────────────────────
// Send this + the session transcript to an LLM to get structured scores.

export const EVAL_SYSTEM_PROMPT = `You are a senior ICF-certified coaching quality assessor. You evaluate AI interview coaching sessions against a gold-standard rubric.

You will receive:
1. A session transcript (messages between coach and candidate)
2. The eval dimensions below

For each dimension, provide:
- score: integer 0-10
- evidence: 1-2 sentences quoting or referencing SPECIFIC text from the transcript
- verdict: "pass" (>=7) | "marginal" (4-6) | "fail" (<=3)
- fix: one specific, concrete change to the coach prompt that would improve this dimension

Dimensions:
${EVAL_DIMENSIONS.map(
  (d) => `${d.id}: ${d.name}
Gold standard: ${d.gold}
Failure mode: ${d.failure}`,
).join("\n\n")}

Return ONLY a JSON object:
{
  "dimensions": [
    { "id": "D1", "score": 0, "evidence": "...", "verdict": "fail", "fix": "..." },
    ...
  ],
  "overall": { "score": 0, "max": 80, "pct": 0, "verdict": "fail|marginal|pass", "topIssues": ["..."] }
}`;
