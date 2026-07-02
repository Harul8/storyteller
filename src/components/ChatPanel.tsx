"use client";

import { useEffect, useRef, useState } from "react";
import ModelSelector from "@/components/ModelSelector";
import { stripTopicTag } from "@/lib/coaching";
import type { Provider } from "@/lib/models";
import type { ChatMessage } from "@/lib/types";

export default function ChatPanel({
  messages,
  onSend,
  streaming,
  provider,
  model,
  onModelChange,
}: {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  streaming: boolean;
  provider: Provider;
  model: string;
  onModelChange: (provider: Provider, model: string) => void;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const t = text.trim();
    if (!t || streaming) return;
    onSend(t);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Your Coach</h2>
          <p className="text-xs text-slate-400">Respond, practice, ask anything.</p>
        </div>
        <ModelSelector
          provider={provider}
          model={model}
          onChange={onModelChange}
          compact
          disabled={streaming}
        />
      </div>

      <div ref={scrollRef} className="scroll-slim flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && !streaming && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400">Analysing your CV — your coach will open the session...</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {stripTopicTag(m.content) || (streaming && i === messages.length - 1 ? <TypingDots /> : "")}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t border-slate-200 p-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder="Respond to your coach, ask a question, or try answering a mock question…"
          className="scroll-slim max-h-32 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-slate-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
    </span>
  );
}
