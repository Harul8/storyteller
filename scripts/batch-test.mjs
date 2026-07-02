/**
 * Runs all 20 profiles through the session simulator + evaluator.
 * Runs 4 profiles in parallel to keep total time under 30 minutes.
 * Saves full results to scripts/batch-results.json.
 * Prints a summary table at the end with pass/fail per profile per dimension.
 *
 * Usage:
 *   $env:NODE_EXTRA_CA_CERTS = "certs/system-ca.pem"
 *   node scripts/batch-test.mjs
 *
 * To run a single profile for debugging:
 *   node scripts/batch-test.mjs ravi-java-6yr
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PROFILES } from "./profiles.mjs";
import { runSession, evalSession } from "./simulate-session.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFileName = process.env.BATCH_OUTPUT ?? process.argv[3] ?? "batch-results.json";
const RESULTS_FILE = path.join(__dirname, outFileName);

const CONCURRENCY = parseInt(process.env.BATCH_CONCURRENCY ?? "3", 10);
const PASS_THRESHOLD = 7;
const TARGET_PCT = 75;

// Filter: single ID, comma-separated IDs, or all profiles
const filterArg = process.argv[2];
const filterIds = filterArg ? filterArg.split(",").map(s => s.trim()) : null;
const profiles = filterIds
  ? PROFILES.filter(p => filterIds.includes(p.id))
  : PROFILES;

if (profiles.length === 0) {
  console.error(`No profile found with id: ${filterArg}`);
  process.exit(1);
}

console.log(`\n${"═".repeat(70)}`);
console.log(`  STORY COACH — BATCH QUALITY TEST`);
console.log(`  Running ${profiles.length} profiles (concurrency: ${CONCURRENCY})`);
console.log("═".repeat(70));

// ─── RUN IN BATCHES ──────────────────────────────────────────────────────────
async function runBatch(profileList) {
  const results = [];
  for (let i = 0; i < profileList.length; i += CONCURRENCY) {
    const chunk = profileList.slice(i, i + CONCURRENCY);
    console.log(`\n  Batch ${Math.floor(i / CONCURRENCY) + 1}: ${chunk.map(p => p.id).join(", ")}`);
    const chunkResults = await Promise.all(
      chunk.map(async (profile) => {
        try {
          const session = await runSession(profile, false);
          if (session.error) {
            console.log(`  ✗ ${profile.id}: ${session.error}`);
            return { profile, error: session.error, evalResult: null };
          }
          const evalResult = await evalSession(profile, session.analysis, session.messages);
          const pct = evalResult?.overall?.pct ?? 0;
          const verdict = evalResult?.overall?.verdict ?? "error";
          const V = verdict === "pass" ? "✓" : verdict === "marginal" ? "~" : "✗";
          console.log(`  ${V} ${profile.id}: ${Math.round(pct)}% (${verdict})`);
          return { profile, session, evalResult };
        } catch (e) {
          console.log(`  ✗ ${profile.id}: ${e.message}`);
          return { profile, error: e.message, evalResult: null };
        }
      })
    );
    results.push(...chunkResults);
  }
  return results;
}

const allResults = await runBatch(profiles);

// ─── SAVE FULL RESULTS ────────────────────────────────────────────────────────
fs.writeFileSync(RESULTS_FILE, JSON.stringify(allResults, null, 2));
console.log(`\n  Results saved to ${RESULTS_FILE}`);

// ─── SUMMARY TABLE ───────────────────────────────────────────────────────────
const DIMS = ["D1","D2","D3","D4","D5","D6","D7","D8"];
const C = { pass:"\x1b[32m✓\x1b[0m", marginal:"\x1b[33m~\x1b[0m", fail:"\x1b[31m✗\x1b[0m", na:"\x1b[90m-\x1b[0m", err:"\x1b[35m?\x1b[0m" };

console.log(`\n${"═".repeat(70)}`);
console.log("  RESULTS SUMMARY");
console.log(`${"═".repeat(70)}`);
console.log(`  ${"Profile".padEnd(28)} ${DIMS.join("  ")}  Overall`);
console.log("  " + "─".repeat(68));

const dimFailCounts = Object.fromEntries(DIMS.map(d => [d, 0]));
const dimScores = Object.fromEntries(DIMS.map(d => [d, []]));
let passCount = 0, margCount = 0, failCount = 0;

for (const r of allResults) {
  if (r.error || !r.evalResult?.dimensions) {
    console.log(`  ${r.profile.id.slice(0, 28).padEnd(28)} ERROR`);
    failCount++;
    continue;
  }
  const ev = r.evalResult;
  const dimMap = Object.fromEntries(ev.dimensions.map(d => [d.id, d]));
  const dimStr = DIMS.map(d => {
    const dim = dimMap[d];
    if (!dim) return C.err;
    dimScores[d].push(dim.score ?? 0);
    if (dim.verdict === "pass") return C.pass;
    if (dim.verdict === "marginal") { dimFailCounts[d]++; return C.marginal; }
    if (dim.verdict === "na") return C.na;
    dimFailCounts[d]++;
    return C.fail;
  }).join("   ");

  const pct = Math.round(ev.overall?.pct ?? 0);
  const ov = ev.overall?.verdict ?? "fail";
  if (ov === "pass") passCount++;
  else if (ov === "marginal") margCount++;
  else failCount++;

  const label = r.profile.label.slice(0, 28).padEnd(28);
  console.log(`  ${label} ${dimStr}  ${pct}% ${C[ov] ?? C.err}`);
}

console.log("\n  " + "─".repeat(68));
console.log(`  PASS: ${passCount}  MARGINAL: ${margCount}  FAIL: ${failCount}  (target: all ≥75%)`);

// Dimension averages
console.log(`\n  DIMENSION AVERAGES (lower = needs work):`);
for (const d of DIMS) {
  const scores = dimScores[d].filter(s => s !== null && s !== undefined);
  if (scores.length === 0) continue;
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  const bar = "█".repeat(Math.round(avg));
  const verdict = avg >= 7 ? C.pass : avg >= 4 ? C.marginal : C.fail;
  console.log(`  ${d}: ${avg.padStart(4)}/10  ${bar.padEnd(10)} ${verdict}  (${dimFailCounts[d]} fails)`);
}

// Top failing dimensions
console.log(`\n  TOP ISSUES ACROSS ALL SESSIONS:`);
const allIssues = {};
for (const r of allResults) {
  if (!r.evalResult?.dimensions) continue;
  for (const d of r.evalResult.dimensions) {
    if (d.verdict === "fail" || d.verdict === "marginal") {
      if (d.fix) {
        allIssues[d.id] = allIssues[d.id] ?? [];
        allIssues[d.id].push(d.fix);
      }
    }
  }
}
// Show most common fix per failing dimension
const sorted = Object.entries(allIssues)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 5);
for (const [dimId, fixes] of sorted) {
  // Most common fix
  const freq = {};
  fixes.forEach(f => { freq[f] = (freq[f] ?? 0) + 1; });
  const topFix = Object.entries(freq).sort((a,b) => b[1]-a[1])[0]?.[0] ?? fixes[0];
  console.log(`  ${dimId} (${fixes.length} fails): ${topFix.slice(0, 90)}`);
}

console.log(`\n${"═".repeat(70)}\n`);
