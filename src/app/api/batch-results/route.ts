import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const runtime = "nodejs";

interface DimResult { id: string; verdict: string; score: number }
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

// Try cwd() first (works when Next.js runs from the project root),
// then walk up from the compiled file location as a fallback.
const SCRIPTS_DIR = (() => {
  const fromCwd = path.join(process.cwd(), "scripts");
  if (fs.existsSync(fromCwd)) return fromCwd;
  // Compiled path is 4 levels deep relative to the project scripts/ dir
  const fromFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../scripts");
  return fromFile;
})();

function inferModel(filename: string): string {
  if (/gpt-?5\.4|gpt54/.test(filename)) return "gpt-5.4";
  if (/4o-mini/.test(filename)) return "gpt-4o-mini";
  if (/4o/.test(filename)) return "gpt-4o";
  if (/4\.1-mini/.test(filename)) return "gpt-4.1-mini";
  return "gpt-4o-mini";
}

function inferLabel(filename: string): string {
  if (filename === "batch-results.json") return "Full run (latest)";
  const m = filename.match(/batch-results-(.+)\.json$/);
  if (!m) return filename;
  return m[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// GET /api/batch-results — returns summary of all batch runs
// GET /api/batch-results?file=batch-results.json&profile=ravi-java-6yr — returns full session for one profile
export async function GET(req: Request) {
  const url = new URL(req.url);
  const file = url.searchParams.get("file");
  const profileId = url.searchParams.get("profile");

  // Single-profile full session fetch
  if (file && profileId) {
    const filePath = path.join(SCRIPTS_DIR, path.basename(file));
    try {
      const raw = JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>[];
      const entry = raw.find((r) => (r.profile as Record<string, string>)?.id === profileId);
      if (!entry) return new Response("Not found", { status: 404 });
      const session = entry.session as Record<string, unknown> | undefined;
      const evalResult = entry.evalResult as Record<string, unknown> | undefined;
      return Response.json({
        analysis: session?.analysis ?? null,
        messages: session?.messages ?? [],
        cvText: session?.cvText ?? "",
        targetRole: (entry.profile as Record<string, string>)?.targetRole ?? "",
        evalResult: evalResult ?? null,
        model: inferModel(file),
      });
    } catch {
      return new Response("Error reading file", { status: 500 });
    }
  }

  // Summary of all runs
  let files: string[];
  try {
    files = fs.readdirSync(SCRIPTS_DIR).filter(
      (f) => f.startsWith("batch-results") && f.endsWith(".json"),
    );
  } catch {
    return Response.json([]);
  }

  const runs: BatchRun[] = files
    .map((filename) => {
      const filePath = path.join(SCRIPTS_DIR, filename);
      const stat = fs.statSync(filePath);
      let raw: unknown[];
      try {
        raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch {
        return null;
      }
      if (!Array.isArray(raw)) return null;

      let pass = 0, marginal = 0, fail = 0;
      const profiles: ProfileResult[] = raw.map((r) => {
        const entry = r as Record<string, unknown>;
        const profile = entry.profile as Record<string, string> | undefined;
        const evalResult = entry.evalResult as Record<string, unknown> | undefined;
        const error = entry.error as string | undefined;

        if (error || !evalResult?.dimensions) {
          fail++;
          return {
            id: profile?.id ?? "unknown",
            label: profile?.label ?? "Unknown",
            targetRole: profile?.targetRole ?? "",
            pct: 0,
            verdict: "error",
            dimensions: [],
            error: error ?? "Eval missing",
          };
        }

        const overall = evalResult.overall as Record<string, unknown>;
        const verdict = (overall?.verdict as string) ?? "fail";
        if (verdict === "pass") pass++;
        else if (verdict === "marginal") marginal++;
        else fail++;

        const dims = (evalResult.dimensions as Record<string, unknown>[]).map((d) => ({
          id: d.id as string,
          verdict: d.verdict as string,
          score: (d.score as number) ?? 0,
        }));

        return {
          id: profile?.id ?? "unknown",
          label: profile?.label ?? "Unknown",
          targetRole: profile?.targetRole ?? "",
          pct: Math.round((overall?.pct as number) ?? 0),
          verdict,
          dimensions: dims,
        };
      });

      return {
        filename,
        label: inferLabel(filename),
        model: inferModel(filename),
        mtime: stat.mtimeMs,
        profiles,
        passCount: pass,
        marginalCount: marginal,
        failCount: fail,
      };
    })
    .filter((r): r is BatchRun => r !== null)
    .sort((a, b) => b.mtime - a.mtime);

  return Response.json(runs);
}
