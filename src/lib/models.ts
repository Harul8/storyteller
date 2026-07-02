export type Provider = "anthropic" | "openai";

export interface ModelOption {
  id: string;
  label: string;
}

export interface ProviderConfig {
  id: Provider;
  label: string;
  models: ModelOption[];
}

/** Single source of truth for providers + models, shared by the UI and the API routes. */
export const PROVIDERS: ProviderConfig[] = [
  {
    id: "anthropic",
    label: "Anthropic (Claude)",
    models: [{ id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6" }],
  },
  {
    id: "openai",
    label: "OpenAI",
    models: [
      { id: "gpt-4o", label: "GPT-4o" },
      { id: "gpt-4.1-mini", label: "GPT-4.1 mini" },
      { id: "gpt-4o-mini", label: "GPT-4o mini" },
      { id: "gpt-5.4", label: "GPT-5.4" },
    ],
  },
];

export const DEFAULT_PROVIDER: Provider = "openai";
export const DEFAULT_MODEL = "gpt-4o-mini";

export function modelsFor(provider: Provider): ModelOption[] {
  return PROVIDERS.find((p) => p.id === provider)?.models ?? [];
}

/** Validate a provider+model pair against the allowlist. */
export function isValidSelection(provider: string, model: string): provider is Provider {
  const p = PROVIDERS.find((x) => x.id === provider);
  return !!p && p.models.some((m) => m.id === model);
}
