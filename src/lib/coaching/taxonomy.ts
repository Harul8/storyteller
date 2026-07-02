export type CoachingTrack =
  | "technical-delivery"
  | "platform-specialist"
  | "management-delivery"
  | "business-analysis"
  | "infrastructure-ops";

export interface TrackProfile {
  id: CoachingTrack;
  label: string;
  matchKeywords: string[];
  interviewFocus: string[];
  cvSins: string[];
  powerVerbs: string[];
  avoidPhrases: string[];
  senioritySignals: { junior: string; senior: string };
}

export const TRACK_PROFILES: Record<CoachingTrack, TrackProfile> = {
  "technical-delivery": {
    id: "technical-delivery",
    label: "Technical Delivery (Software Engineer / Architect)",
    matchKeywords: [
      "java", "python", ".net", "node", "react", "angular", "backend", "frontend",
      "fullstack", "full stack", "full-stack", "data engineer", "architect",
      "developer", "software engineer", "microservices", "api", "spring",
    ],
    interviewFocus: [
      "Architecture decisions and trade-offs — why you chose design A over B, what you ruled out",
      "Scale and performance — real numbers (TPS, latency, data volume, team size, user base)",
      "Production incidents — how you led diagnosis, resolution, and post-mortem learning",
      "Technical leadership — how you brought the team up, not just what you personally coded",
      "Delivery under constraints — balancing quality, speed, and technical debt in practice",
      "System design thinking — how you decompose a problem before writing a line of code",
    ],
    cvSins: [
      "Using 'worked on' or 'involved in' instead of 'architected', 'built', 'led'",
      "Listing technologies without explaining what you built with them or at what scale",
      "No performance or impact metrics (latency, throughput, cost reduction, active users)",
      "Projects described as features or tasks rather than problems solved",
      "No team context — solo work, team contributor, and tech lead read very differently",
      "Certifications listed with no evidence of applied use in a real project",
    ],
    powerVerbs: [
      "Architected", "Engineered", "Optimised", "Designed", "Implemented",
      "Scaled", "Reduced", "Automated", "Refactored", "Led", "Mentored", "Delivered",
    ],
    avoidPhrases: [
      "was involved in", "worked on", "participated in", "good knowledge of",
      "exposure to", "familiar with", "assisted in", "had experience with",
    ],
    senioritySignals: {
      junior: "Answers 'what did you build or use' — names the tool, language, or method. Describes the HOW without the WHY or the outcome. The interviewer learns what the candidate did but not why it mattered or whether it worked.",
      senior: "Answers 'why did you choose this approach, what constraint were you navigating, and what changed as a result' — explains the reasoning, what alternatives were considered, what the trade-off was, and what the measurable or observable outcome was for the system, team, or business.",
    },
  },

  "platform-specialist": {
    id: "platform-specialist",
    label: "Platform Specialist (Pega / Salesforce / SAP / Oracle / ServiceNow)",
    matchKeywords: [
      "pega", "pegasystems", "prpc", "salesforce", "sap", "oracle", "servicenow",
      "service now", "dynamics", "crm", "erp", "bpm", "platform consultant",
      "functional consultant", "technical consultant", "implementation consultant",
    ],
    interviewFocus: [
      "Configuration vs. customisation trade-offs — when and why you chose each approach",
      "Translating ambiguous business requirements into platform capabilities without over-engineering",
      "Client and stakeholder management — handling demands that violate best practices or platform limits",
      "Implementation methodology — how you approach greenfield vs. upgrade vs. rollout projects differently",
      "Cross-functional collaboration — working alongside BAs, architects, change management, and end-users",
      "Business impact — what measurably improved after your implementation (adoption, productivity, cost)",
    ],
    cvSins: [
      "Listing certifications without project context — a cert is a credential, not an achievement",
      "Describing platform features instead of what business problem they solved",
      "No business outcome metrics (productivity uplift, cost saving, adoption rate, error reduction)",
      "Vague project scope: 'implemented Salesforce' without team size, timeline, or client context",
      "No mention of challenges or complications — clean projects are forgettable; recovery stories are not",
      "Treating a support or maintenance role identically to an implementation engagement",
    ],
    powerVerbs: [
      "Implemented", "Configured", "Designed", "Delivered", "Advised", "Governed",
      "Translated", "Architected", "Managed", "Optimised", "Led", "Steered",
    ],
    avoidPhrases: [
      "worked on implementation", "involved in configuration", "supported the project",
      "familiar with the platform", "did some customisation", "participated in rollout",
    ],
    senioritySignals: {
      junior: "Answers 'what did you configure or implement' — names modules, features, or objects used. Can describe what the platform does without explaining the business problem it solved or the governance decisions made.",
      senior: "Answers 'what was the business need, what approach did I recommend and why, what did I steer the client away from, and what did the business measure afterwards' — explains solution choices in terms of business risk, maintainability, and adoption, not just technical capability.",
    },
  },

  "management-delivery": {
    id: "management-delivery",
    label: "Management & Delivery (PM / Programme Manager / Delivery Lead / Scrum Master)",
    matchKeywords: [
      "project manager", "programme manager", "program manager", "delivery manager",
      "scrum master", "agile coach", "pmo", "delivery lead", "engagement manager",
      "account manager", "service delivery", "it manager",
    ],
    interviewFocus: [
      "Delivery under pressure — missed deadlines, resource shortfalls, scope explosions, and what YOU did",
      "Stakeholder management — difficult clients, conflicting executive priorities, escalation handling",
      "Risk and issue management — how you spotted and contained before they became crises",
      "Team leadership — how you built, motivated, and improved teams, not just tracked tasks",
      "Financial governance — budget management, cost control, margin (critical for senior roles)",
      "Governance and reporting — how you created visibility and kept leadership accurately informed",
    ],
    cvSins: [
      "Listing responsibilities ('managed a team') instead of outcomes ('delivered £2.4M programme 2 weeks early')",
      "No project financials, team size, or timeline context — scale is everything in PM interviews",
      "Methodology namedropping (Agile, Prince2, PMI) without showing how you applied it to a real constraint",
      "No examples of conflict, failure, or a project going sideways — only 'successful delivery' is not credible",
      "Client name-dropping without specifying the problem you solved for them and the outcome",
      "Scope-creep stories missing what YOU negotiated, changed, or decided",
    ],
    powerVerbs: [
      "Delivered", "Led", "Governed", "Managed", "Resolved", "Negotiated",
      "Restructured", "Recovered", "Accelerated", "Saved", "Achieved", "Steered",
    ],
    avoidPhrases: [
      "managed the project", "was responsible for delivery", "worked with stakeholders",
      "ran stand-ups", "tracked risks", "coordinated with teams", "facilitated meetings",
    ],
    senioritySignals: {
      junior: "Answers 'what processes did you run' — names meetings, artefacts, and tools. Describes the delivery mechanics without explaining the judgment calls, trade-offs, or decisions that kept things on track when they threatened to go sideways.",
      senior: "Answers 'what did you decide, what did you sacrifice, and what was the outcome' — describes the specific judgment calls made under pressure, what was negotiated or restructured, and how the decision played out in measurable delivery and relationship terms.",
    },
  },

  "business-analysis": {
    id: "business-analysis",
    label: "Business Analysis (BA / Functional Consultant / Product Owner)",
    matchKeywords: [
      "business analyst", " ba ", "functional consultant", "product owner",
      "requirements", "process improvement", "business process", "systems analyst",
      "solution analyst", "digital analyst", "product analyst",
    ],
    interviewFocus: [
      "Requirements elicitation — how you gather, validate, challenge, and manage requirements in practice",
      "Stakeholder management — handling conflicting priorities, vague briefs, and resistant stakeholders",
      "Bridging the gap — translating business need into technical spec and vice versa without owning code",
      "Process improvement — before and after metrics on a real process you redesigned",
      "Handling ambiguity and change — when requirements moved mid-project and how you managed it",
      "Sign-off and governance — how you got formal commitment on scope and change control",
    ],
    cvSins: [
      "Describing the documents you created instead of the decisions they drove",
      "No metrics on process improvements — time saved, error rate, volume handled, FTE freed",
      "Vague stakeholder influence: 'worked with stakeholders' — which ones, how senior, what was the conflict?",
      "No examples of pushing back on unclear, infeasible, or scope-creeping requirements",
      "Missing elicitation techniques — what workshops, tools, or methods you actually used",
      "Treating all projects equally with no sense of complexity or personal growth",
    ],
    powerVerbs: [
      "Elicited", "Facilitated", "Documented", "Translated", "Drove", "Identified",
      "Reduced", "Streamlined", "Owned", "Aligned", "Negotiated", "Designed",
    ],
    avoidPhrases: [
      "gathered requirements", "worked with the business", "created documentation",
      "attended workshops", "supported testing", "helped the team understand",
    ],
    senioritySignals: {
      junior: "Answers 'what artefacts did you produce and what activities did you run' — names documents, workshop types, and tools. Describes the process of analysis without explaining the business decisions those artefacts drove or the stakeholder conflicts they resolved.",
      senior: "Answers 'what did my analysis change, what decision got made because of it, and what was the outcome for the business' — describes the influence exerted on scope, priority, or direction, and the measurable or observable business result that followed.",
    },
  },

  "infrastructure-ops": {
    id: "infrastructure-ops",
    label: "Infrastructure & Operations (DevOps / Cloud / SRE / Managed Services)",
    matchKeywords: [
      "devops", "cloud", "aws", "azure", "gcp", "sre", "site reliability",
      "infrastructure", "platform engineering", "managed services", "operations",
      "network engineer", "security engineer", "cloud engineer", "devsecops",
    ],
    interviewFocus: [
      "Incident management — your most complex production outage, how you led diagnosis and resolution",
      "Automation mindset — what toil you eliminated, the before/after in numbers",
      "Reliability and SLA delivery — what uptime you maintained and how you improved it",
      "Cost optimisation — cloud spend reduction with real figures",
      "Security and governance — balancing engineering velocity with compliance",
      "Culture change — how you brought development teams into DevOps or SRE practices",
    ],
    cvSins: [
      "Listing tools (Terraform, Kubernetes, Jenkins) without explaining what you built at what scale",
      "No uptime, SLA, or MTTR metrics — operations is a numbers game",
      "No cost or efficiency figures from automation work",
      "Treating BAU run-the-engine work and transformation projects identically",
      "Missing business context — who depended on the systems you ran, and at what consequence of failure?",
      "No sense of scale: 1 server or 10,000? Supporting 1 team or 50 squads?",
    ],
    powerVerbs: [
      "Automated", "Reduced", "Maintained", "Architected", "Provisioned",
      "Optimised", "Resolved", "Migrated", "Secured", "Enabled", "Built", "Cut",
    ],
    avoidPhrases: [
      "worked on infrastructure", "managed servers", "involved in cloud migration",
      "supported operations", "familiar with DevOps", "had exposure to Kubernetes",
    ],
    senioritySignals: {
      junior: "Answers 'what tools did I use and what did I provision or configure' — names technologies and tasks. Describes the technical work without explaining the operational problem it solved, the scale it operated at, or the measurable improvement it delivered.",
      senior: "Answers 'what was the operational problem, what did I change, and what did the system or team look like before and after' — describes the diagnosis, the approach chosen and why, what was sacrificed or deprioritised, and the measurable improvement in reliability, cost, or delivery speed.",
    },
  },
};

export function detectTrack(detectedRole: string): CoachingTrack {
  const role = detectedRole.toLowerCase();
  for (const [trackId, profile] of Object.entries(TRACK_PROFILES)) {
    if (profile.matchKeywords.some((kw) => role.includes(kw))) {
      return trackId as CoachingTrack;
    }
  }
  return "technical-delivery";
}
