#!/usr/bin/env node
// telemetry-migrate.js — migrate <project-root>/TELEMETRY.jsonl between schema versions.
// Usage: node scripts/telemetry-migrate.js <path> <fromVersion> <toVersion>
// v1 -> adds cost_usd, tokens_in, tokens_out (default 0).
const fs = require("fs");
const path = require("path");

const [file, fromV, toV] = process.argv.slice(2);
if (!file || !fromV || !toV) { console.error("usage: telemetry-migrate.js <file> <from> <to>"); process.exit(2); }

let out = [];
const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
for (const line of lines) {
  let r;
  try { r = JSON.parse(line); } catch { continue; }
  if (fromV === "1" && toV === "2") {
    if (r.v === 1) {
      r.v = 2;
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
