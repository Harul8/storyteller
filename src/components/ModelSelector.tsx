"use client";

import { PROVIDERS, modelsFor, type Provider } from "@/lib/models";

interface Props {
  provider: Provider;
  model: string;
  onChange: (provider: Provider, model: string) => void;
  compact?: boolean;
  disabled?: boolean;
}

export default function ModelSelector({ provider, model, onChange, compact = false, disabled = false }: Props) {
  const models = modelsFor(provider);

  const base = compact
    ? "rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600"
    : "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700";
  const cls = `${base} outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50`;

  return (
    <div className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <select
        aria-label="Provider"
        value={provider}
        disabled={disabled}
        onChange={(e) => {
          const p = e.target.value as Provider;
          onChange(p, modelsFor(p)[0]?.id ?? "");
        }}
        className={cls}
      >
        {PROVIDERS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Model"
        value={model}
        disabled={disabled}
        onChange={(e) => onChange(provider, e.target.value)}
        className={cls}
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
