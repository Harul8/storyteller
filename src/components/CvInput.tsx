"use client";

import { useRef, useState } from "react";
import ModelSelector from "@/components/ModelSelector";
import type { Provider } from "@/lib/models";
import { SAMPLE_PROFILES } from "@/lib/sample-cvs";

interface Props {
  onAnalyze: (payload: { file?: File; text?: string; targetRole: string }) => void;
  onStartWithoutCv: () => void;
  analyzing: boolean;
  error: string | null;
  provider: Provider;
  model: string;
  onModelChange: (provider: Provider, model: string) => void;
}

export default function CvInput({
  onAnalyze,
  onStartWithoutCv,
  analyzing,
  error,
  provider,
  model,
  onModelChange,
}: Props) {
  const [text, setText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasCV = file !== null || text.trim().length > 30;
  const hasRole = targetRole.trim().length > 5;
  const canSubmit = !analyzing && hasCV && hasRole;

  function submit() {
    if (!canSubmit) return;
    if (file) onAnalyze({ file, targetRole: targetRole.trim() });
    else onAnalyze({ text, targetRole: targetRole.trim() });
  }

  function selectProfile(id: string) {
    const profile = SAMPLE_PROFILES.find((p) => p.id === id);
    if (!profile) return;
    // A profile fills the CV field with pasted text — clear any uploaded
    // file first so submit() doesn't silently prefer a stale upload.
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    setText(profile.cvText);
    setTargetRole(profile.targetRole);
  }

  return (
    <div className="w-full max-w-7xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* ── CV input ─────────────────────────────────────────────── */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Step 1 — Your CV
            </p>

            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Choose a profile from the database
            </label>
            <select
              disabled={analyzing}
              defaultValue=""
              onChange={(e) => {
                selectProfile(e.target.value);
                e.target.value = "";
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 disabled:opacity-40"
            >
              <option value="" disabled>
                Choose a profile — fills in the fields below
              </option>
              {SAMPLE_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>

            <div className="my-2.5 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              <span className="h-px flex-1 bg-slate-200" /> or upload{" "}
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f) setFile(f);
              }}
              onClick={() => inputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-6 py-4 text-center transition-colors ${
                dragging
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-slate-300 hover:border-indigo-300 hover:bg-slate-50"
              }`}
            >
              <UploadIcon />
              {file ? (
                <p className="text-sm font-medium text-slate-700">{file.name}</p>
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-700">
                    Drop your CV here or click to upload
                  </p>
                  <p className="text-xs text-slate-400">PDF, DOCX or TXT</p>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {file && (
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="mt-1.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Remove file
              </button>
            )}

            <div className="my-2.5 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              <span className="h-px flex-1 bg-slate-200" /> or paste{" "}
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your CV text here…"
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* ── Target role ──────────────────────────────────────────── */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Step 2 — Target role or job description
            </p>
            <p className="mb-2 text-xs text-slate-500">
              Paste the full JD or describe the role in one line. Your coach will tailor
              everything — gaps, questions, and the session agenda — to this specific role.
            </p>
            <textarea
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder={
                "e.g. 'Senior Salesforce Technical Consultant at Accenture — 8+ yrs, Sales Cloud & Service Cloud, client-facing delivery experience required'\n\n— or paste the full job description here."
              }
              rows={6}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
            {!hasRole && targetRole.length > 0 && (
              <p className="mt-1 text-xs text-amber-600">
                Add a bit more — at least the role title and seniority level.
              </p>
            )}
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Model
          </span>
          <ModelSelector
            provider={provider}
            model={model}
            onChange={onModelChange}
            disabled={analyzing}
          />
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={submit}
            disabled={!canSubmit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {analyzing ? (
              <>
                <Spinner /> Analysing your CV…
              </>
            ) : (
              "Start coaching session"
            )}
          </button>
          <button
            type="button"
            onClick={onStartWithoutCv}
            disabled={analyzing}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start coaching session without CV
          </button>
        </div>

        {!canSubmit && !analyzing && (
          <p className="mt-1.5 text-center text-xs text-slate-400">
            {!hasCV ? "Add your CV above" : !hasRole ? "Add the target role above" : ""}
          </p>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-slate-400">
        Your CV and role details are sent to your chosen AI provider for analysis and are not stored.
      </p>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-indigo-500"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
    </svg>
  );
}
