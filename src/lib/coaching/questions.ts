import type { CoachingTrack } from "./taxonomy";

export interface InterviewQuestion {
  question: string;
  why: string;
  starHint: string;
  trap: string;
}

export const UNIVERSAL_QUESTIONS: InterviewQuestion[] = [
  {
    question: "Tell me about yourself.",
    why: "The opener. Interviewers calibrate your self-awareness, communication style, and whether your story supports the role — all in under 90 seconds.",
    starHint: "Use the Past-Present-Future arc: a brief positioning of who you are professionally (past), what you do now and why you are good at it (present), and why this role is the logical next move (future). Do NOT recite your CV chronologically.",
    trap: "Walking through every job since graduation. The interviewer already has your CV. This signals poor self-awareness and wastes the strongest 90 seconds of the interview.",
  },
  {
    question: "Why are you looking for a new role?",
    why: "Red-flag check. They want growth-seekers, not escape-artists. They are listening for bad-mouthing, desperation, or lack of direction.",
    starHint: "Frame as pull (toward something better), never push (away from something bad). 'I have delivered X and Y, and the next challenge I want to own is Z — which is what this role offers.' Keep it brief and forward-looking.",
    trap: "Any hint of: 'bad manager', 'toxic culture', 'no recognition', 'better money'. Even if true, it sounds like a flight risk. Also: 'just wanting a change' signals no direction.",
  },
  {
    question: "Tell me about a time you faced a significant challenge at work and how you handled it.",
    why: "Core behavioural question. Tests problem-solving, resilience, and decision quality under pressure. STAR structure is expected and rewarded.",
    starHint: "Pick one specific event, not a type of challenge. Make the Situation clear but brief. Make the Action detailed — what options you considered, why you chose your approach, who you involved. Quantify the Result. The challenge should be real and the outcome should show your judgment.",
    trap: "Generic challenge ('the team had communication issues'), passive framing ('we all worked together to fix it'), or no quantified result. If the interviewer cannot replay the story in their head, it did not land.",
  },
  {
    question: "What is your greatest weakness?",
    why: "Testing honesty, self-awareness, and growth mindset — not trying to catch you out with a real disqualifier.",
    starHint: "Name a genuine developmental area — not a humble brag. Show the specific action you took to address it and evidence of improvement. Then show how this self-awareness makes you stronger in your work overall.",
    trap: "'I work too hard' or 'I'm a perfectionist'. Interviewers have heard this thousands of times and it signals either dishonesty or lack of self-awareness. Also: naming a core requirement of the role as your weakness.",
  },
  {
    question: "Tell me about a time you failed. How did you handle it?",
    why: "Testing accountability, learning agility, and resilience. They want to know if you can own a mistake and recover, not whether you are perfect.",
    starHint: "Choose a real failure where YOU made the wrong call — not a 'failure' that was actually someone else's fault. Walk through what you did to recover. Make the learning specific and actionable, not vague ('I learnt to communicate better').",
    trap: "Blaming external factors (client changed scope, team let you down, technology failed). Also: choosing something so trivial it reads as evasion. No recovery or learning = no point in the story.",
  },
  {
    question: "Where do you see yourself in 3 to 5 years?",
    why: "Checks ambition, direction, and whether this role is a genuine fit for your trajectory — not just a placeholder.",
    starHint: "Be specific about the direction (skills, scope, impact level) rather than a job title. Show that this role is a clear step toward that direction. Connect your aspiration to something the company actually needs.",
    trap: "'I want your job' (threatening). 'I don't know yet' (no direction). Naming a destination totally unrelated to this role.",
  },
  {
    question: "Why do you want this role / this company specifically?",
    why: "Checks preparation and genuine motivation. A generic answer tells the interviewer you are spray-and-praying applications.",
    starHint: "Three-part answer: something specific about the ROLE (not just the title or salary), something real about the COMPANY (product, trajectory, culture — something you researched), and how both connect to your own professional direction.",
    trap: "'It's a great company' (everyone says this). 'Good salary and benefits' (transactional). 'A friend referred me' (no intrinsic motivation).",
  },
  {
    question: "How do you handle disagreement with a colleague or manager?",
    why: "Probing collaboration style, emotional maturity, and whether you are a pushover or a conflict generator.",
    starHint: "Use STAR with a real example. Show that you voiced your position clearly with evidence, listened to the other view, sought a path forward rather than 'winning', and maintained the relationship. If you changed your mind, say why. If you held your ground, show what the outcome justified.",
    trap: "'I always try to keep the peace' (conflict avoidance, not collaboration). 'I usually win these debates' (ego, not teamwork). A story where YOU were clearly right and they were wrong — even if true, frame it on the process, not the verdict.",
  },
];

export const TRACK_QUESTIONS: Record<CoachingTrack, InterviewQuestion[]> = {
  "technical-delivery": [
    {
      question: "Walk me through the most technically complex system you have designed or built.",
      why: "This is the primary technical depth probe. They want to see if you understand trade-offs, not just features.",
      starHint: "Identify what made the system genuinely complex — the specific constraint, scale, consistency challenge, or coordination problem that simple approaches could not handle. Explain what you considered and ruled out, and why your chosen approach was the right trade-off for that situation. Give the outcome in measurable terms relevant to that system's purpose.",
      trap: "Describing what the system does rather than what made it hard to build. Naming a technology or architectural style without explaining what problem it solved that alternatives would not. Avoiding failures or redesigns — those are the most credible parts of any engineering story.",
    },
    {
      question: "Tell me about a time you had to make a significant technical trade-off and why.",
      why: "Every engineering decision involves trade-offs. This separates thinkers from ticket-closers.",
      starHint: "Name the options you evaluated. Explain the dimensions you weighed (performance vs. cost, speed vs. quality, flexibility vs. simplicity). Be clear about what you sacrificed and why. Show you monitored the trade-off after the decision.",
      trap: "Describing a decision where there was an obvious right answer. Not quantifying the trade-off. Retrospectively pretending you always knew the right answer — honesty about uncertainty is a strength here.",
    },
    {
      question: "Tell me about a production incident you handled. What happened, and what did you do?",
      why: "Production incidents reveal real engineering judgment, communication under pressure, and learning culture.",
      starHint: "Describe the blast radius (what broke, who was affected, the business impact). Walk through your diagnosis process — what signals you had, what you ruled out, how you communicated during the incident. Describe the resolution and the post-mortem. What changed as a result?",
      trap: "Describing an incident where you were a bystander. Having no post-mortem or learning. Focusing only on the technical fix without mentioning communication with stakeholders during the outage.",
    },
    {
      question: "How do you approach code or design reviews? What are you actually looking for?",
      why: "Tests engineering culture, mentoring mindset, and whether you think beyond your own code.",
      starHint: "Be specific: correctness, maintainability, security boundaries, performance hot-spots, test coverage, observable instrumentation. Give an example of a review that changed something meaningful. Mention what you do when you see junior code that needs significant work — feedback style matters.",
      trap: "Describing reviews as only a quality gate. 'I check if the tests pass' — mechanical, not insightful. No mention of the human side of giving and receiving feedback.",
    },
    {
      question: "How do you manage technical debt in your team?",
      why: "Tests whether you think in systems across time, not just sprint-to-sprint.",
      starHint: "Show you have a framework: identification (how you surface it), prioritisation (how you trade it against features), communication (how you explain it to non-technical stakeholders), and paydown (how you carve it into deliverable chunks). Give a real example of a debt item you resolved and what it unlocked.",
      trap: "'We don't really have technical debt' (not credible). 'We try to fix it when we have time' (no system = debt accumulates forever). Treating all debt as equal — not all debt is the same risk.",
    },
  ],

  "platform-specialist": [
    {
      question: "Describe a complex implementation you led end to end. What made it complex and how did you handle it?",
      why: "The primary depth probe. They want to see solution ownership, not just configuration work.",
      starHint: "Set the business context first (client, industry, what they were replacing and why). Describe the complexity — data migration, integration, change management, scope ambiguity, upgrade constraints. Explain the key decisions you made. Land on measurable outcomes: adoption rate, productivity, cost, quality.",
      trap: "Naming a module, feature, or platform capability without describing the business problem it solved — to an interviewer, this is meaningless. No outcomes or measurements means no evidence of value delivered.",
    },
    {
      question: "A client is insisting on a heavy customisation that goes against platform best practices. What do you do?",
      why: "Tests your ability to advise, not just comply. The best platform specialists are trusted advisors, not order-takers.",
      starHint: "Show a real example. Describe what the client wanted and why it was a problem (technical debt, upgrade risk, supportability). Walk through how you made the case for the alternative — data, precedent, demo, phased approach. Show the outcome: did they change course? Did you find a middle ground?",
      trap: "Saying 'I just do what the client asks' — you are the expert, they are not. Also: caving without making your case, or being so rigid you lose the client relationship.",
    },
    {
      question: "How do you approach a requirements workshop with a business stakeholder who does not know the platform?",
      why: "Tests facilitation skills and the ability to bridge technical and business worlds — the core value of a platform specialist.",
      starHint: "Describe your preparation (what you read about their business domain before entering the room). Explain your facilitation technique — how you surface the need behind the ask, how you test for completeness, how you handle 'I don't know yet'. Mention what artefacts you produce and how you validate them.",
      trap: "'I ask them what they want and write it down.' No facilitation, no value-add. The platform specialist role is to help stakeholders discover what they need — not transcribe what they say.",
    },
    {
      question: "How do you handle an upgrade or a new platform release in an active client environment?",
      why: "Upgrade management is a major risk for platform specialists and a frequent interview topic.",
      starHint: "Describe the end-to-end process: release notes review, sandbox testing, regression scope, stakeholder communication, rollback plan, production cutover. Give a real example — ideally one where something unexpected came up and how you managed it.",
      trap: "Describing a smooth upgrade with no complications (forgettable). No mention of rollback or risk management. No stakeholder communication plan.",
    },
    {
      question: "Tell me about a time the business outcome of your implementation fell short of what was expected. What happened?",
      why: "Tests honesty, accountability, and the ability to diagnose root cause beyond technology.",
      starHint: "Be honest. Low adoption is the most common failure. Describe what the metric was, what it came in at, what drove the gap (change management, training, scope mismatch), what you did to close the gap, and what you would do differently.",
      trap: "Claiming every implementation was a success. Blaming the client entirely. Not knowing the outcome — not tracking adoption is itself a red flag.",
    },
  ],

  "management-delivery": [
    {
      question: "Tell me about your most challenging delivery and how you got it across the line.",
      why: "The primary PM depth probe. They want to see real judgment under adversity, not a sanitised success story.",
      starHint: "Set the context (scope, budget, team size, client). Describe what went wrong — the more specific, the better. Walk through the decisions you made: what you escalated, what you absorbed, what you negotiated, what you sacrificed. Land on the outcome in delivery and relationship terms. What would you do differently?",
      trap: "Describing a complex project that went smoothly — not useful. Vague answers like 'we pulled together as a team'. No financial or timeline specifics. No mention of what YOU personally decided.",
    },
    {
      question: "How do you manage scope creep from a client who keeps adding requirements?",
      why: "Scope management is where PM judgment is most visible. Everyone faces it; how you handle it separates great PMs.",
      starHint: "Show a real example with a specific client. Describe the change control process you had in place, how you tracked and communicated scope, how you had the conversation with the client, and what the outcome was. If you had to push back hard, show how you did it without damaging the relationship.",
      trap: "'I just said no to everything' (not collaborative). 'The client was very reasonable' (not a challenge, not a story). No process — if you rely on personal authority rather than a governance structure, you will eventually fail.",
    },
    {
      question: "Tell me about a time you had a difficult stakeholder or client relationship. How did you handle it?",
      why: "Stakeholder management is the defining skill of senior delivery roles. They want to see if you can handle conflict without escalating or caving.",
      starHint: "Be specific about the stakeholder (their role, why they were difficult — unresponsive, aggressive, conflicted with another stakeholder, unclear expectations). Walk through your approach: early conversations, escalation path, recovery. Describe the relationship at the end — not always full resolution, but managed.",
      trap: "Describing a stakeholder who was simply demanding — that is not difficult, that is normal. Blaming the stakeholder entirely. 'I escalated it to my manager' — fine if true, but what did YOU do first?",
    },
    {
      question: "How do you report project status when things are going badly? How honest do you get?",
      why: "Tests communication integrity and leadership under pressure. Bad news management is a defining leadership skill.",
      starHint: "Show that you report accurately, early, and with options — not bad news alone. Describe a real example where you surfaced a problem to leadership or a client before it became a crisis. Walk through what information you gave them, what options you presented, and how they responded.",
      trap: "'I keep things positive and focus on solutions' — this is spin, not honesty, and experienced stakeholders can tell. 'I only escalate when I have a solution' — this delays decisions that leadership needs to make.",
    },
    {
      question: "How do you motivate a team that is under pressure and morale is low?",
      why: "Delivery pressure hits every project. They want to see if you lead people, not just manage tasks.",
      starHint: "Show a specific situation. Diagnose what was causing low morale (overload, unclear purpose, lack of recognition, toxic dynamic). Describe the actions you took as a leader — individual conversations, removing blockers, changing the team dynamic, recognising progress. Measure the change in output or mood.",
      trap: "'I just kept everyone focused on the goal' — not a leadership answer. No individual attention — treating the team as a unit misses that morale is personal. No recognition that you may have contributed to the pressure.",
    },
  ],

  "business-analysis": [
    {
      question: "Tell me about the most complex set of requirements you ever had to manage. How did you handle it?",
      why: "Primary depth probe. Tests your ability to operate in real-world ambiguity, not textbook process.",
      starHint: "Set the context — what made it complex (multiple conflicting stakeholders, technical unknowns, changing business direction, regulatory constraint). Walk through how you elicited, structured, validated, and got sign-off on the requirements. Quantify the outcome — what got built, and did it solve the problem?",
      trap: "Describing requirements from a stable, well-defined domain with cooperative stakeholders. 'I ran workshops and wrote user stories' — this is process, not complexity. What did YOU do when things got hard?",
    },
    {
      question: "You have two senior stakeholders with directly conflicting requirements. What do you do?",
      why: "Conflict resolution and political navigation are core BA skills that textbooks underplay and interviewers probe hard.",
      starHint: "Show a real example. Describe the conflict specifically (not vaguely). Walk through how you facilitated alignment — joint session, impact analysis, escalation to a decision-maker, phased approach. Show what you did to understand BOTH stakeholders' underlying needs rather than just their stated positions.",
      trap: "'I escalate it to the project manager' — if that is your only tool, you are not adding value. 'I find a compromise' without describing HOW is not an answer. No mention of what YOU personally did to move it forward.",
    },
    {
      question: "Tell me about a time a requirement was unclear or infeasible and you challenged it. What happened?",
      why: "Tests whether you add value by challenging, not just documenting. BAs who transcribe instead of think are a liability.",
      starHint: "Show that you spotted a gap, ambiguity, or technical impossibility early. Describe how you raised it — the evidence you brought, how you framed it for the stakeholder, and what happened as a result. Ideally the requirement was changed, refined, or deprioritised because of your intervention.",
      trap: "Describing a challenge you raised but then just accepted the same answer. No example at all — 'I always make sure requirements are clear before moving on' is a non-answer. Framing a minor clarification as a significant challenge.",
    },
    {
      question: "How do you measure whether a process improvement you delivered actually worked?",
      why: "Outcome-orientation separates great BAs from documentation specialists.",
      starHint: "Describe a real process you redesigned. Name the baseline metrics (time, volume, error rate, FTE cost). Describe what you changed and why. Give the after-metrics and the timeframe. Discuss what you did if the improvement did not materialise as expected.",
      trap: "No metrics — 'the business was happy with it'. Metrics that are outputs, not outcomes ('we delivered the documentation on time'). No follow-up — you designed it and left, never knowing if it worked.",
    },
    {
      question: "How do you handle it when business requirements keep changing mid-project?",
      why: "Requirement volatility is the norm in IT services. They want to see adaptability and governance, not rigidity or chaos.",
      starHint: "Show you have both a change management process (impact assessment, change log, sign-off) AND the interpersonal skill to have direct conversations with stakeholders about the cost of change. Give a real example — ideally one where you successfully absorbed some change and deferred other change.",
      trap: "'I document every change and update the BRD' — process without judgment. 'I push back on all changes' — inflexible. No example — pure process description is not evidence.",
    },
  ],

  "infrastructure-ops": [
    {
      question: "Tell me about the most serious production incident you have managed. Walk me through it from start to end.",
      why: "The primary ops depth probe. Incident handling reveals real-world judgment, communication under pressure, and engineering maturity.",
      starHint: "Set the blast radius — what broke, how many users affected, what the business impact was (revenue, SLA, reputation). Walk through your diagnostic approach: what signals you had, what you checked first, what you ruled out. Describe your communication cadence during the incident. End with root cause, resolution, and what changed in the system or process afterwards.",
      trap: "Describing a minor disruption as a major incident. Having no post-mortem or systemic change. Focusing only on the technical fix without describing how you communicated to stakeholders during the outage.",
    },
    {
      question: "What is the most significant automation you have built? What did it replace and what was the impact?",
      why: "Automation mindset and ROI thinking are the defining traits of a DevOps or SRE mindset, not just tool knowledge.",
      starHint: "Describe what the manual process was (time cost, error rate, team burden). Describe what you built and why you chose that approach. Quantify the outcome: time saved per week, error rate change, toil hours reclaimed, team feedback. Mention the maintenance cost of the automation itself.",
      trap: "'I automated a deployment pipeline' without any quantification — every engineer says this. No before-state description. Not knowing the ROI of your own automation.",
    },
    {
      question: "How have you improved reliability or availability for a system you owned? Walk me through the specific changes.",
      why: "SRE and infra roles are fundamentally about measurable reliability. They want evidence of systematic thinking, not heroics.",
      starHint: "Name the baseline (uptime percentage, MTTR, incident frequency). Describe your reliability strategy — what you measured, what you changed (monitoring, redundancy, chaos engineering, runbooks, on-call process). Give the after-metrics over a specific timeframe. Mention the trade-offs you made.",
      trap: "No baseline metrics — 'it was unreliable before and better after'. Describing heroic firefighting as a reliability improvement. No mention of proactive measures — only reactive fixes.",
    },
    {
      question: "How do you balance the need for development teams to move fast with the need for stability and governance?",
      why: "This is the central tension in DevOps culture. They want to see strategic thinking, not just a preference for one side.",
      starHint: "Show a real example where this tension surfaced and required a deliberate decision. Describe the principle behind your approach — how you designed for velocity without removing safety, how you measured whether it was working, and what changed in team behaviour or system outcomes as a result.",
      trap: "'I make sure devs follow the process' — governance-as-control. 'I give devs full autonomy' — ops abdication. No real example, just abstract principles. Not mentioning what changed in the team culture as a result.",
    },
    {
      question: "Tell me about a cost optimisation you delivered in cloud infrastructure. How did you find the opportunity and what did you do?",
      why: "Cloud cost is a major commercial lever. Engineers who can see and address it are valued far above those who only provision.",
      starHint: "Describe how you discovered the inefficiency (tagging reports, cost anomaly alerts, right-sizing analysis, reserved instance coverage). Walk through the changes you made. Quantify the saving — monthly or annual dollar figure, percentage of previous spend. Mention any performance or availability trade-offs you managed.",
      trap: "No specific number — 'we saved a significant amount'. Describing a one-time clean-up without a repeatable process. Not mentioning how you got stakeholder buy-in for changes to running systems.",
    },
  ],
};
