import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// process.cwd() can point at the wrong directory when the dev server is launched
// via the preview tool. Fall back to walking up from this compiled file's actual
// location until a "scripts" sibling turns up — more robust than assuming a fixed
// "../../.." depth, since the bundler doesn't always preserve source-tree depth.
function findScriptsDir(startDir: string): string {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    const candidate = path.join(dir, "scripts");
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return path.join(startDir, "scripts");
}

const SCRIPTS_DIR = (() => {
  const fromCwd = path.join(process.cwd(), "scripts");
  if (fs.existsSync(fromCwd)) return fromCwd;
  return findScriptsDir(path.dirname(fileURLToPath(import.meta.url)));
})();

const LEDGER_PATH = path.join(SCRIPTS_DIR, "usage-ledger.json");

// $ per 1M tokens. Approximate — verify against current provider pricing before
// treating these as authoritative. gpt-5.4 has no confirmed rate (released after
// this assistant's model knowledge cutoff) and is intentionally left unpriced
// rather than guessed.
export const PRICING: Record<string, { input: number; output: number }> = {
  "gpt-4o": { input: 2.5, output: 10 },
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4.1-mini": { input: 0.4, output: 1.6 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
};

interface ModelTotals {
  inputTokens: number;
  outputTokens: number;
  calls: number;
}
interface Ledger {
  startedAt: string;
  totals: Record<string, ModelTotals>;
}

function emptyLedger(): Ledger {
  return { startedAt: new Date().toISOString(), totals: {} };
}

function readLedgerFile(): Ledger {
  try {
    const parsed = JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8")) as Ledger;
    if (!parsed.totals) return emptyLedger();
    return parsed;
  } catch {
    return emptyLedger();
  }
}

/**
 * Increment the on-disk usage ledger for one API call. Best-effort — a failed
 * write just means one call goes uncounted, it never blocks the actual request.
 * Not safe against concurrent writes from multiple processes/requests racing
 * each other (no file lock); acceptable drift for a local cost tracker, not
 * something to rely on for exact billing reconciliation.
 */
export function recordUsage(opts: {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}): void {
  try {
    const ledger = readLedgerFile();
    const key = `${opts.provider}:${opts.model}`;
    const existing = ledger.totals[key] ?? { inputTokens: 0, outputTokens: 0, calls: 0 };
    ledger.totals[key] = {
      inputTokens: existing.inputTokens + (opts.inputTokens || 0),
      outputTokens: existing.outputTokens + (opts.outputTokens || 0),
      calls: existing.calls + 1,
    };
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
  } catch (err) {
    console.error("usage ledger write failed:", err);
  }
}

export interface UsageSummary {
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

export function readUsage(): UsageSummary {
  const ledger = readLedgerFile();
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalCost = 0;
  let fullyPriced = true;

  const models = Object.entries(ledger.totals).map(([key, t]) => {
    const colonIdx = key.indexOf(":");
    const provider = key.slice(0, colonIdx);
    const model = key.slice(colonIdx + 1);
    const price = PRICING[model];
    const cost = price ? (t.inputTokens * price.input + t.outputTokens * price.output) / 1_000_000 : null;

    totalInputTokens += t.inputTokens;
    totalOutputTokens += t.outputTokens;
    if (cost !== null) totalCost += cost;
    else fullyPriced = false;

    return { key, provider, model, inputTokens: t.inputTokens, outputTokens: t.outputTokens, calls: t.calls, cost };
  });

  return { startedAt: ledger.startedAt, models, totalInputTokens, totalOutputTokens, totalCost, fullyPriced };
}
