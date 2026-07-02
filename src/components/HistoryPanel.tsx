"use client";

import { useState, useEffect } from "react";
import {
  loadHistory,
  deleteEntry,
  clearHistory,
  formatDate,
  exchangeCount,
  type HistoryEntry,
} from "@/lib/history";
import { COACH_OPEN_TRIGGER, stripTopicTag } from "@/lib/coaching";
import { exportTranscriptPdf } from "@/lib/pdf-export";
import type { Analysis } from "@/lib/types";

interface DimResult { id: string; verdict: string; score: number; fix?: string }
interface ProfileResult {
  id: string;
  label: string;
  targetRole: string;
  pct: number;
  verdict: string;
  dimensions: DimResult[];
  error?: string;
}
interface BatchRun {
  filename: string;
  label: string;
  model: string;
  mtime: number;
  profiles: ProfileResult[];
  passCount: number;
  marginalCount: number;
  failCount: number;
}
interface BatchSession {
  analysis: Analysis;
  messages: { role: string; content: string }[];
  cvText: string;
  targetRole: string;
  evalResult: { dimensions: DimResult[]; overall: { pct: number; verdict: string } } | null;
  model: string;
}
interface UsageSummary {
  startedAt: string;
  models: {
    key: string;
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    calls: number;
    cost: number | null;
  }[];
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCost: number;
  fullyPriced: boolean;
}

const DIMS = ["D1","D2","D3","D4","D5","D6","D7","D8"];

function formatTokenCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

interface Props {
  onResume: (entry: HistoryEntry) => void;
}

export default function HistoryPanel({ onResume }: Props) {
  // HistoryPanel only ever mounts client-side (it's conditionally rendered
  // once the user navigates to the history view, never on the initial SSR
  // pass), so reading localStorage directly in the lazy initializer is safe
  // and avoids the extra render + effect that a post-mount setState would add.
  const [entries, setEntries] = useState<HistoryEntry[]>(() => loadHistory());
  const [selected, setSelected] = useState<HistoryEntry | null>(null);
  const [batchRuns, setBatchRuns] = useState<BatchRun[]>([]);
  const [expandedRun, setExpandedRun] = useState<string | null>(null);
  const [batchSession, setBatchSession] = useState<{ filename: string; profileId: string; data: BatchSession } | null>(null);
  const [loadingSession, setLoadingSession] = useState<string | null>(null);
  const [usage, setUsage] = useState<UsageSummary | null>(null);

  useEffect(() => {
    fetch("/api/batch-results")
      .then((r) => r.json())
      .then(setBatchRuns)
      .catch(() => {});
    fetch("/api/usage")
      .then((r) => r.json())
      .then(setUsage)
      .catch(() => {});
  }, []);

  async function openBatchSession(filename: string, profileId: string) {
    const key = `${filename}:${profileId}`;
    setLoadingSession(key);
    try {
      const r = await fetch(`/api/batch-results?file=${encodeURIComponent(filename)}&profile=${encodeURIComponent(profileId)}`);
      const data: BatchSession = await r.json();
      setBatchSession({ filename, profileId, data });
    } finally {
      setLoadingSession(null);
    }
  }

  function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function handleClearAll() {
    clearHistory();
    setEntries([]);
    setSelected(null);
  }

  if (batchSession) {
    return (
      <BatchSessionViewer
        filename={batchSession.filename}
        profileId={batchSession.profileId}
        data={batchSession.data}
        onBack={() => setBatchSession(null)}
      />
    );
  }

  if (selected) {
    return (
      <SessionViewer
        entry={selected}
        onBack={() => setSelected(null)}
        onResume={onResume}
        onDelete={(id) => {
          deleteEntry(id);
          setEntries((prev) => prev.filter((e) => e.id !== id));
          setSelected(null);
        }}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-8 space-y-10">

      {/* ── API usage (persistent ledger, tracked from when this feature shipped) ── */}
      {usage && usage.models.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              API usage — since {formatDate(new Date(usage.startedAt).getTime())}
            </p>
            <p className="text-sm font-semibold text-slate-800">
              ~${usage.totalCost.toFixed(3)}{!usage.fullyPriced && "+"}
            </p>
          </div>
          <div className="space-y-1.5">
            {usage.models.map((m) => (
              <div key={m.key} className="flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  {m.model} <span className="text-slate-400">({m.calls} call{m.calls !== 1 ? "s" : ""})</span>
                </span>
                <span className="text-slate-500">
                  {formatTokenCount(m.inputTokens)} in / {formatTokenCount(m.outputTokens)} out
                  {m.cost !== null ? ` · ~$${m.cost.toFixed(3)}` : " · rate not set"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-slate-400 leading-snug">
            Real usage captured from each API response, not estimated. Excludes runs before this
            was added. Approximate — concurrent requests can slightly undercount, and models with
            no rate on file are counted in tokens only.
          </p>
        </section>
      )}

      {/* ── Browser sessions ── */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Session history</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {entries.length === 0
                ? "No sessions yet."
                : `${entries.length} session${entries.length === 1 ? "" : "s"} saved locally in this browser.`}
            </p>
          </div>
          {entries.length > 0 && (
            <button onClick={handleClearAll} className="text-xs text-slate-400 hover:text-red-500">
              Clear all
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 px-8 py-16 text-center">
            <ClockIcon className="mx-auto mb-3 h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-400">
              Your coaching sessions will appear here once you start one.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelected(entry)}
                onKeyDown={(e) => e.key === "Enter" && setSelected(entry)}
                tabIndex={0}
                role="button"
                className="group w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {entry.analysis.detectedRole}
                      </span>
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                        {entry.analysis.seniority}
                      </span>
                    </div>
                    {entry.targetRole && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        Targeting: {entry.targetRole}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                      <span>{formatDate(entry.savedAt)}</span>
                      <span>{exchangeCount(entry.messages)} exchange{exchangeCount(entry.messages) !== 1 ? "s" : ""}</span>
                      <span className="opacity-60">{entry.provider} / {entry.model}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(entry.id, e)}
                      className="hidden rounded p-1 text-slate-300 hover:text-red-400 group-hover:block"
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                    <ChevronIcon className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Batch test runs ── */}
      {batchRuns.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Batch test runs</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Automated quality tests — click any profile to view the full session transcript.
            </p>
          </div>

          <div className="space-y-3">
            {batchRuns.map((run) => {
              const isOpen = expandedRun === run.filename;
              return (
                <div key={run.filename} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {/* Run header */}
                  <button
                    onClick={() => setExpandedRun(isOpen ? null : run.filename)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{run.label}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{run.model}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                          {run.profiles.length} profile{run.profiles.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-xs">
                        <span className="font-medium text-emerald-600">✓ {run.passCount} pass</span>
                        <span className="font-medium text-amber-500">~ {run.marginalCount} marginal</span>
                        {run.failCount > 0 && <span className="font-medium text-red-500">✗ {run.failCount} fail</span>}
                        <span className="text-slate-400">{formatDate(run.mtime)}</span>
                      </div>
                    </div>
                    <ChevronIcon className={`h-4 w-4 shrink-0 text-slate-300 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </button>

                  {/* Expanded profile table */}
                  {isOpen && (
                    <div className="border-t border-slate-100 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400">
                            <th className="px-4 py-2 text-left font-medium">Profile</th>
                            {DIMS.map((d) => (
                              <th key={d} className="px-1.5 py-2 text-center font-medium w-7">{d}</th>
                            ))}
                            <th className="px-3 py-2 text-right font-medium">Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {run.profiles.map((p) => {
                            const dimMap = Object.fromEntries(p.dimensions.map((d) => [d.id, d]));
                            const loadKey = `${run.filename}:${p.id}`;
                            const isLoading = loadingSession === loadKey;
                            return (
                              <tr
                                key={p.id}
                                onClick={() => !p.error && openBatchSession(run.filename, p.id)}
                                className={`transition-colors ${p.error ? "opacity-50" : "cursor-pointer hover:bg-indigo-50"}`}
                              >
                                <td className="px-4 py-2 text-slate-700 max-w-[180px]">
                                  <span className="truncate block" title={p.label}>
                                    {isLoading ? <span className="text-indigo-400">Loading…</span> : p.label.slice(0, 32)}
                                  </span>
                                </td>
                                {DIMS.map((d) => {
                                  const dim = dimMap[d];
                                  const v = dim?.verdict ?? (p.error ? "error" : "na");
                                  return (
                                    <td key={d} className="px-1.5 py-2 text-center">
                                      {v === "pass" ? <span className="text-emerald-500">✓</span>
                                        : v === "marginal" ? <span className="text-amber-400">~</span>
                                        : v === "fail" ? <span className="text-red-400">✗</span>
                                        : v === "error" ? <span className="text-slate-300">!</span>
                                        : <span className="text-slate-200">–</span>}
                                    </td>
                                  );
                                })}
                                <td className="px-3 py-2 text-right">
                                  {p.error ? (
                                    <span className="text-red-400">err</span>
                                  ) : (
                                    <span className={
                                      p.verdict === "pass" ? "font-semibold text-emerald-600"
                                      : p.verdict === "marginal" ? "font-semibold text-amber-500"
                                      : "font-semibold text-red-500"
                                    }>
                                      {p.pct}%
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// ── PDF transcript download ──────────────────────────────────────────────────

function PdfDownloadButton({
  analysis, targetRole, messages, savedAt, className,
}: {
  analysis: Analysis;
  targetRole?: string;
  messages: { role: string; content: string }[];
  savedAt?: number;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    setBusy(true);
    try {
      await exportTranscriptPdf({ analysis, targetRole, messages, savedAt });
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Couldn't generate the PDF. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={busy}
      className={className ?? "text-xs text-indigo-500 hover:text-indigo-700 font-medium disabled:opacity-50"}
    >
      {busy ? "Preparing…" : "Download PDF"}
    </button>
  );
}

// ── Batch session viewer ─────────────────────────────────────────────────────

function BatchSessionViewer({
  filename, profileId, data, onBack,
}: {
  filename: string;
  profileId: string;
  data: BatchSession;
  onBack: () => void;
}) {
  const [showCv, setShowCv] = useState(false);
  const dims = data.evalResult?.dimensions ?? [];
  const overall = data.evalResult?.overall;

  return (
    <div className="flex h-[calc(100vh-73px)] w-full overflow-hidden">
      {/* LEFT PANE — brief + eval scores */}
      <div className="w-80 shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-5 py-6">
        <button onClick={onBack} className="mb-3 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
          <ChevronLeftIcon className="h-3 w-3" /> Back to history
        </button>

        {overall && (
          <div className={`mb-4 inline-block rounded-xl px-4 py-2 text-center ${
            overall.verdict === "pass" ? "bg-emerald-50" : overall.verdict === "marginal" ? "bg-amber-50" : "bg-red-50"
          }`}>
            <p className={`text-2xl font-bold ${
              overall.verdict === "pass" ? "text-emerald-600" : overall.verdict === "marginal" ? "text-amber-500" : "text-red-500"
            }`}>{Math.round(overall.pct)}%</p>
            <p className="text-xs text-slate-500">{overall.verdict}</p>
          </div>
        )}

        {data.analysis?.candidateName && (
          <h2 className="text-base font-bold text-slate-900">{data.analysis.candidateName}</h2>
        )}
        <p className={data.analysis?.candidateName ? "text-sm text-slate-500" : "text-base font-semibold text-slate-900"}>
          {data.analysis?.detectedRole ?? profileId}
        </p>
        <p className="text-sm text-slate-500">{data.analysis?.seniority}</p>
        {data.targetRole && <p className="mt-1 text-xs text-slate-400">Target: {data.targetRole}</p>}
        <p className="mt-1 text-xs text-slate-400">{filename}</p>

        {/* Eval scores */}
        {dims.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Eval scores</p>
            <div className="grid grid-cols-2 gap-2">
              {dims.map((d) => (
                <div key={d.id} className="rounded-lg bg-slate-50 px-3 py-2 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">{d.id}</span>
                    <span className={`text-xs font-bold ${
                      d.verdict === "pass" ? "text-emerald-500" : d.verdict === "marginal" ? "text-amber-400" : "text-red-400"
                    }`}>{d.score}/10</span>
                  </div>
                  {d.fix && <p className="mt-1 text-xs text-slate-400 leading-tight">{d.fix}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANE — full-height transcript */}
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="shrink-0 border-b border-slate-100 px-5 py-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Coaching transcript — {data.messages.filter(m => m.content.trim() && m.content !== COACH_OPEN_TRIGGER).length} messages · {data.model}
          </p>
          <div className="flex items-center gap-3">
            {data.cvText && (
              <button
                onClick={() => setShowCv((v) => !v)}
                className="text-xs text-indigo-500 hover:text-indigo-700 font-medium"
              >
                {showCv ? "Hide CV" : "View CV"}
              </button>
            )}
            <PdfDownloadButton
              analysis={data.analysis}
              targetRole={data.targetRole}
              messages={data.messages}
            />
          </div>
        </div>
        {showCv && data.cvText && (
          <div className="shrink-0 border-b border-slate-100 px-5 py-4 bg-slate-50 max-h-64 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-xs text-slate-600 leading-relaxed font-mono">
              {data.cvText}
            </pre>
          </div>
        )}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
          {data.messages
            .filter((m) => m.content.trim() && m.content !== COACH_OPEN_TRIGGER)
            .map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "border border-slate-200 bg-slate-100 text-slate-800"
                    : "border border-slate-200 bg-white text-slate-700"
                }`}>
                  {stripTopicTag(m.content)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ── Browser session viewer ────────────────────────────────────────────────────

function SessionViewer({
  entry, onBack, onResume, onDelete,
}: {
  entry: HistoryEntry;
  onBack: () => void;
  onResume: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <button onClick={onBack} className="mb-2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
            <ChevronLeftIcon className="h-3 w-3" /> Back to history
          </button>
          {entry.analysis.candidateName && (
            <h2 className="text-base font-bold text-slate-900">{entry.analysis.candidateName}</h2>
          )}
          <p className={entry.analysis.candidateName ? "text-sm text-slate-500" : "text-base font-semibold text-slate-900"}>
            {entry.analysis.detectedRole}
          </p>
          <p className="text-sm text-slate-500">{entry.analysis.seniority}</p>
          {entry.targetRole && <p className="mt-1 text-xs text-slate-400">Target: {entry.targetRole}</p>}
          <p className="mt-1 text-xs text-slate-400">{formatDate(entry.savedAt)}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <PdfDownloadButton
            analysis={entry.analysis}
            targetRole={entry.targetRole}
            messages={entry.messages}
            savedAt={entry.savedAt}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 hover:border-indigo-200 hover:text-indigo-600 disabled:opacity-50"
          />
          <button onClick={() => onDelete(entry.id)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 hover:border-red-200 hover:text-red-500">
            Delete
          </button>
          <button onClick={() => onResume(entry)} className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500">
            Resume session
          </button>
        </div>
      </div>

      <details className="mb-5 rounded-xl border border-slate-100 bg-slate-50">
        <summary className="cursor-pointer select-none px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Resume Analysis Snapshot
        </summary>
        <AnalysisSummary analysis={entry.analysis} />
      </details>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Coaching transcript — {exchangeCount(entry.messages)} exchange{exchangeCount(entry.messages) !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="max-h-[60vh] space-y-4 overflow-y-auto p-5">
          {entry.messages
            .filter((m) => m.content.trim() && m.content !== COACH_OPEN_TRIGGER)
            .map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white text-slate-700"
                }`}>
                  {stripTopicTag(m.content)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function AnalysisSummary({ analysis }: { analysis: Analysis }) {
  return (
    <div className="space-y-3 px-4 pb-4 pt-2 text-sm text-slate-700">
      <p className="italic text-slate-600">{analysis.headline}</p>
      {analysis.strengths && analysis.strengths.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-medium uppercase text-slate-400">Strengths</p>
          <ul className="space-y-1">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-xs">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
      {analysis.gaps && analysis.gaps.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-medium uppercase text-slate-400">Gaps</p>
          <ul className="space-y-1">
            {analysis.gaps.map((g, i) => (
              <li key={i} className="flex gap-2 text-xs">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
