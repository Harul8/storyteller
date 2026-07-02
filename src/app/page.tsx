"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import CvInput from "@/components/CvInput";
import AnalysisReport from "@/components/AnalysisReport";
import ChatPanel from "@/components/ChatPanel";
import HistoryPanel from "@/components/HistoryPanel";
import { DEFAULT_MODEL, DEFAULT_PROVIDER, type Provider } from "@/lib/models";
import { COACH_OPEN_TRIGGER } from "@/lib/coaching";
import {
  upsertSession,
  generateSessionId,
  type HistoryEntry,
} from "@/lib/history";
import { SAMPLE_PROFILES } from "@/lib/sample-cvs";
import type { Analysis, ChatMessage } from "@/lib/types";

type View = "input" | "coaching" | "chat" | "history";

export default function Home() {
  const [view, setView] = useState<View>("input");
  const [showIntake, setShowIntake] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [cvText, setCvText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<Provider>(DEFAULT_PROVIDER);
  const [model, setModel] = useState<string>(DEFAULT_MODEL);

  const sessionIdRef = useRef<string>("");

  function onModelChange(p: Provider, m: string) {
    setProvider(p);
    setModel(m);
  }

  // Persist session to localStorage after every assistant message completes
  useEffect(() => {
    if (!analysis || !sessionIdRef.current || streaming) return;
    const entry: HistoryEntry = {
      id: sessionIdRef.current,
      savedAt: Date.now(),
      targetRole,
      analysis,
      cvText,
      messages,
      provider,
      model,
    };
    upsertSession(entry);
  }, [streaming, messages, analysis, cvText, targetRole, provider, model]);

  const streamCoachMessage = useCallback(
    async (
      trigger: string,
      currentCvText: string,
      currentAnalysis: Analysis | null,
      currentTargetRole: string,
      currentProvider: Provider,
      currentModel: string,
      priorMessages: ChatMessage[],
    ) => {
      const next: ChatMessage[] = [
        ...priorMessages,
        { role: "user", content: trigger },
      ];
      setMessages([...next, { role: "assistant", content: "" }]);
      setStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next,
            cvText: currentCvText,
            analysis: currentAnalysis,
            targetRole: currentTargetRole,
            provider: currentProvider,
            model: currentModel,
          }),
        });

        if (!res.ok || !res.body) {
          const msg = await res.text();
          setMessages([
            { role: "assistant", content: msg || "Something went wrong." },
          ]);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages([...next, { role: "assistant", content: acc }]);
        }
      } catch {
        setMessages([...next, { role: "assistant", content: "Network error — please try again." }]);
      } finally {
        setStreaming(false);
      }
    },
    [],
  );

  async function analyze(payload: { file?: File; text?: string; targetRole: string }) {
    setAnalyzing(true);
    setError(null);
    try {
      const form = new FormData();
      if (payload.file) form.append("file", payload.file);
      if (payload.text) form.append("text", payload.text);
      form.append("targetRole", payload.targetRole);
      form.append("provider", provider);
      form.append("model", model);

      const res = await fetch("/api/analyze", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to analyze CV.");
        return;
      }

      const newId = generateSessionId();
      sessionIdRef.current = newId;

      setCvText(data.cvText);
      setAnalysis(data.analysis);
      setTargetRole(payload.targetRole);
      setMessages([]);
      setView("coaching");

      await streamCoachMessage(
        COACH_OPEN_TRIGGER,
        data.cvText,
        data.analysis,
        payload.targetRole,
        provider,
        model,
        [],
      );
    } catch {
      setError("Network error — please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  async function startGeneralChat() {
    setError(null);
    const newId = generateSessionId();
    sessionIdRef.current = newId;
    setCvText("");
    setAnalysis(null);
    setTargetRole("");
    setMessages([]);
    setView("chat");

    await streamCoachMessage(COACH_OPEN_TRIGGER, "", null, "", provider, model, []);
  }

  async function sendMessage(text: string) {
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          cvText,
          analysis,
          targetRole,
          provider,
          model,
        }),
      });

      if (!res.ok || !res.body) {
        const msg = await res.text();
        setMessages([...next, { role: "assistant", content: msg || "Something went wrong." }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "Network error — please try again." }]);
    } finally {
      setStreaming(false);
    }
  }

  function resumeSession(entry: HistoryEntry) {
    sessionIdRef.current = entry.id;
    setCvText(entry.cvText);
    setAnalysis(entry.analysis);
    setTargetRole(entry.targetRole);
    setMessages(entry.messages);
    setProvider(entry.provider as Provider);
    setModel(entry.model);
    setView("coaching");
  }

  function reset() {
    setAnalysis(null);
    setCvText("");
    setTargetRole("");
    setMessages([]);
    setError(null);
    sessionIdRef.current = "";
    setView("input");
    setShowIntake(false);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4">
          <Logo />
          <div className="flex-1">
            <h1 className="text-base font-semibold tracking-tight text-slate-900">Story Coach</h1>
            <p className="text-xs text-slate-400">Your personal IT interview coach.</p>
          </div>
          <nav className="flex items-center gap-1">
            <NavBtn
              active={view !== "history"}
              onClick={() => {
                if (view === "coaching" || view === "chat") return;
                setView("input");
                setShowIntake(false);
              }}
            >
              {view === "coaching" || view === "chat" ? (
                <span onClick={reset} className="cursor-pointer">New session</span>
              ) : (
                "Home"
              )}
            </NavBtn>
            <NavBtn active={view === "history"} onClick={() => setView("history")}>
              <span className="flex items-center gap-1.5">
                <HistoryIcon className="h-3.5 w-3.5" />
                History
              </span>
            </NavBtn>
          </nav>
        </div>
      </header>

      {view === "history" && (
        <main className="flex-1 bg-slate-50">
          <HistoryPanel onResume={resumeSession} />
        </main>
      )}

      {view === "input" && !showIntake && (
        <main className="flex flex-1 flex-col items-center justify-center px-5 py-12 bg-slate-50">
          <div className="max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Your personal interview coach for IT professionals
            </h2>
            <p className="mt-3 text-slate-500">
              Upload your CV, tell us the role you are targeting, and your coach will immediately
              assess your profile and run you through a live practice session on every question
              an interviewer will ask.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowIntake(true)}
            className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Connect with Coach
          </button>
        </main>
      )}

      {view === "input" && showIntake && (
        <main className="flex flex-1 flex-col items-center justify-center px-5 py-12 bg-slate-50">
          <div className="mb-8 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Your personal interview coach for IT professionals
            </h2>
            <p className="mt-3 text-slate-500">
              Upload your CV, tell us the role you are targeting, and your coach will immediately
              assess your profile and run you through a live practice session on every question
              an interviewer will ask.
            </p>
          </div>

          {/* CV database dropdown */}
          <div className="mb-5 w-full max-w-2xl">
            <label className="mb-2 block text-center text-xs text-slate-400 font-medium uppercase tracking-wide">
              Or select a CV from the database
            </label>
            <select
              disabled={analyzing}
              defaultValue=""
              onChange={(e) => {
                const profile = SAMPLE_PROFILES.find((p) => p.id === e.target.value);
                if (profile) analyze({ text: profile.cvText, targetRole: profile.targetRole });
                e.target.value = "";
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 disabled:opacity-40"
            >
              <option value="" disabled>
                Choose a profile — coaching starts immediately…
              </option>
              {SAMPLE_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <CvInput
            onAnalyze={analyze}
            analyzing={analyzing}
            error={error}
            provider={provider}
            model={model}
            onModelChange={onModelChange}
          />

          <button
            type="button"
            onClick={startGeneralChat}
            disabled={analyzing}
            className="mt-6 text-xs text-slate-400 underline decoration-dotted underline-offset-2 hover:text-indigo-600 disabled:opacity-40"
          >
            Don&apos;t have a CV ready? Skip and just ask your coach something
          </button>
        </main>
      )}

      {view === "coaching" && analysis && (
        <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-5 p-5 lg:grid-cols-2">
          <section className="min-h-[60vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:h-[calc(100vh-7.5rem)]">
            <AnalysisReport analysis={analysis} targetRole={targetRole} onReset={reset} />
          </section>
          <section className="min-h-[60vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:h-[calc(100vh-7.5rem)]">
            <ChatPanel
              messages={messages.filter((m) => m.content !== COACH_OPEN_TRIGGER)}
              onSend={sendMessage}
              streaming={streaming}
              provider={provider}
              model={model}
              onModelChange={onModelChange}
            />
          </section>
        </main>
      )}

      {view === "chat" && (
        <main className="mx-auto w-full max-w-3xl flex-1 p-5">
          <section className="h-[calc(100vh-7.5rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ChatPanel
              messages={messages.filter((m) => m.content !== COACH_OPEN_TRIGGER)}
              onSend={sendMessage}
              streaming={streaming}
              provider={provider}
              model={model}
              onModelChange={onModelChange}
            />
          </section>
        </main>
      )}
    </div>
  );
}

function NavBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

function Logo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </div>
  );
}

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
