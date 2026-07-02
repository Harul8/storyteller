import type { Analysis, ChatMessage } from "./types";

export interface HistoryEntry {
  id: string;
  savedAt: number;
  targetRole: string;
  analysis: Analysis;
  cvText: string;
  messages: ChatMessage[];
  provider: string;
  model: string;
}

const STORAGE_KEY = "story-coach-history-v1";
const MAX_ENTRIES = 30;

function readStorage(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as HistoryEntry[];
  } catch {
    return [];
  }
}

function writeStorage(entries: HistoryEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
}

export function loadHistory(): HistoryEntry[] {
  return readStorage();
}

export function upsertSession(entry: HistoryEntry): void {
  const all = readStorage();
  const idx = all.findIndex((e) => e.id === entry.id);
  if (idx >= 0) {
    all[idx] = entry;
  } else {
    all.unshift(entry);
  }
  writeStorage(all);
}

export function deleteEntry(id: string): void {
  writeStorage(readStorage().filter((e) => e.id !== id));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function formatDate(ts: number): string {
  const d = new Date(ts);
  const today = new Date();
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  if (isToday) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
}

const TRIGGER = "[COACHING_SESSION_START]";

export function exchangeCount(messages: ChatMessage[]): number {
  return messages.filter((m) => m.role === "user" && m.content !== TRIGGER).length;
}
