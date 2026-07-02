"use client";

import type { Analysis } from "@/lib/types";

export default function AnalysisReport({
  analysis,
  targetRole,
  onReset,
}: {
  analysis: Analysis;
  targetRole?: string;
  onReset: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 p-5">
        <div>
          {analysis.candidateName && (
            <h2 className="text-lg font-bold text-slate-900">{analysis.candidateName}</h2>
          )}
          <div className="mt-0.5 flex flex-wrap items-center gap-2">
            <span className={analysis.candidateName ? "text-sm font-medium text-slate-700" : "text-lg font-semibold text-slate-900"}>
              {analysis.detectedRole}
            </span>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              {analysis.seniority}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{analysis.headline}</p>
          {targetRole && (
            <div className="mt-2 flex items-start gap-1.5">
              <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Target:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{targetRole}</p>
            </div>
          )}
        </div>
        <button
          onClick={onReset}
          className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50"
        >
          New CV
        </button>
      </div>

      <div className="scroll-slim flex-1 space-y-6 overflow-y-auto p-5">
        {analysis.strengths && analysis.strengths.length > 0 && (
          <Section title="Strengths">
            <ul className="space-y-2">
              {analysis.strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <Dot className="bg-emerald-400" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {analysis.gaps && analysis.gaps.length > 0 && (
          <Section title="Gaps & undersold areas">
            <ul className="space-y-2">
              {analysis.gaps.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <Dot className="bg-amber-400" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {analysis.storyAngles && analysis.storyAngles.length > 0 && (
          <Section title="Story angles for interviews">
            <div className="space-y-3">
              {analysis.storyAngles.map((a, i) => (
                <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{a.guidance}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {analysis.projectTips && analysis.projectTips.length > 0 && (
          <Section title="Sharpen these projects">
            <div className="space-y-3">
              {analysis.projectTips.map((p, i) => (
                <div key={i} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                  <p className="text-sm font-semibold text-slate-800">{p.project}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Reads now: <span className="text-slate-600">{p.currentImpression}</span>
                  </p>
                  <p className="mt-1.5 text-sm text-slate-700">
                    <span className="font-medium text-indigo-600">Tell it as:</span>{" "}
                    {p.betterNarrative}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {analysis.likelyQuestions && analysis.likelyQuestions.length > 0 && (
          <Section title="Prepare for these questions">
            <ul className="space-y-2">
              {analysis.likelyQuestions.map((q, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-slate-300">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {analysis.vocabularyFlags && analysis.vocabularyFlags.length > 0 && (
          <Section title="Language to upgrade">
            <div className="space-y-2">
              {analysis.vocabularyFlags.map((f, i) => (
                <div key={i} className="rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm">
                  <p className="text-xs text-slate-400">
                    Found:{" "}
                    <span className="font-mono text-rose-600 line-through">{f.found}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-700">
                    Use instead:{" "}
                    <span className="font-medium text-emerald-700">{f.replacement}</span>
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Dot({ className }: { className: string }) {
  return <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${className}`} />;
}
