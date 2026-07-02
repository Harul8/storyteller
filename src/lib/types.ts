import type { CoachingTrack } from "./coaching";

export type { CoachingTrack };

export interface StoryAngle {
  title: string;
  guidance: string;
}

export interface ProjectTip {
  project: string;
  currentImpression: string;
  betterNarrative: string;
}

export interface VocabularyFlag {
  found: string;
  replacement: string;
}

export interface CoachingPriority {
  area: string;
  rationale: string;
}

export interface Analysis {
  candidateName: string;
  detectedRole: string;
  seniority: string;
  headline: string;
  strengths: string[];
  gaps: string[];
  storyAngles: StoryAngle[];
  projectTips: ProjectTip[];
  likelyQuestions: string[];

  coachingTrack: CoachingTrack;
  vocabularyFlags: VocabularyFlag[];
  coachingPriorities: CoachingPriority[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
