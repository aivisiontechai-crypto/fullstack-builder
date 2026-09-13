#!/usr/bin/env node
// telemetry-migrate.js — migrate <project-root>/TELEMETRY.jsonl between schema versions.
// Usage: node scripts/telemetry-migrate.js <path> <fromVersion> <toVersion>
// v1 -> adds cost_usd, tokens_in, tokens_out (default 0).
const fs = require("fs");
const path = require("path");

const [file, fromV, toV] = process.argv.slice(2);
if (!file || !fromV || !toV) { console.error("usage: telemetry-migrate.js <file> <from> <to>"); process.exit(2); }

// Idempotency: if every record is already at the target version, rewrite the
// file byte-identically and exit 0. Without this the "always rewrite" path
// below rewrites trailing whitespace/newlines on every call, so a re-run by
// the dashboard (which runs the migration itself on every status poll) churns
// the file and trips the dashboard's own "file changed" detection.
let alreadyAtTarget = true;
const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
for (const line of lines) {
  let r;
  try { r = JSON.parse(line); } catch { continue; }
  if (String(r.v) !== String(toV)) { alreadyAtTarget = false; break; }
}
if (alreadyAtTarget && lines.length > 0) {
  console.log(`telemetry-migrate: already at v${toV} (${lines.length} records) — no rewrite`);
  process.exit(0);
}

let out = [];
for (const line of lines) {
  let r;
  try { r = JSON.parse(line); } catch { continue; }
  if (fromV === "1" && toV === "2") {
    if (String(r.v) === String(fromV)) {
      r.v = Number(toV);
      r.cost_usd = r.cost_usd ?? 0;
      r.tokens_in = r.tokens_in ?? 0;
      r.tokens_out = r.tokens_out ?? 0;
    }
  } else {
    console.error(`unknown migration ${fromV}->${toV}`);
    process.exit(1);
  }
  out.push(JSON.stringify(r));
}
fs.writeFileSync(file, out.join("\n") + (out.length ? "\n" : ""));
console.log(`telemetry-migrate: migrated ${lines.length} records v${fromV}->v${toV}`);
