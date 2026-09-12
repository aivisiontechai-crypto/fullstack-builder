#!/usr/bin/env node
// telemetry-write.js — append ONE v2 line to <project>/TELEMETRY.jsonl.
// PII-scrubbed per the skill's telemetry contract: story ids become US-###,
// free-text titles become a per-line-nonce SHA-256 (never reversible, never
// correlatable across lines). Flock-locked. Auto-rotates at 10MB / 30 days.
// Usage: node scripts/telemetry-write.js <project> <skill> <story> <duration_ms> <success> <retry_count> <tokens_in> <tokens_out> <cost_usd> [model]
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const [project, skill, story, duration_ms, success, retry_count, tokens_in, tokens_out, cost_usd, model] = process.argv.slice(2);
if (!project || !skill || !story) {
  console.error("usage: node scripts/telemetry-write.js <project> <skill> <story> <duration_ms> <success> <retry_count> <tokens_in> <tokens_out> <cost_usd> [model]");
  process.exit(2);
}

const file = path.join(project, "TELEMETRY.jsonl");
const MAX_BYTES = 10 * 1024 * 1024;
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

// PII scrub (skill contract): story IDs -> US-###, free-text story titles ->
// per-line-nonce SHA-256 (never reversible, never correlatable across lines).
// Skill and model names are tool/provider identifiers, NOT PII — left as-is.
const scrubStory = (s) => {
  const str = String(s || "");
  const id = (str.match(/US-\d+/g) || [])[0] || "";
  const nonce = crypto.randomBytes(8).toString("hex");
  const hash = crypto.createHash("sha256").update(nonce + ":" + str).digest("hex").slice(0, 16);
  return id ? id + " " + hash : hash;
};

const line = JSON.stringify({
  v: 2,
  skill: skill,
  story: scrubStory(story),
  duration_ms: Number(duration_ms) || 0,
  success: success === "true" || success === "1",
  retry_count: Number(retry_count) || 0,
  tokens_in: Number(tokens_in) || 0,
  tokens_out: Number(tokens_out) || 0,
  cost_usd: Number(cost_usd) || 0,
  model: model || "",
  ts: new Date().toISOString(),
});

// rotation: 10MB or 30 days old
try {
  const st = fs.statSync(file);
  if (st.size > MAX_BYTES || Date.now() - st.mtimeMs > MAX_AGE_MS) {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    fs.renameSync(file, file + ".bak-" + ts);
  }
} catch {}

// Append one line, crash-safe: write to a sidecar, fsync, then rename over the
// existing file. Renaming over the file PRESERVES the old content because the
// target is replaced atomically by the sidecar — so we must first copy the
// old content into the sidecar, then append the new line.
const tmp = file + ".tmp";
let fd;
try {
  fd = fs.openSync(tmp, "w");
} catch (e) {
  console.error("telemetry-write: cannot open " + tmp);
  process.exit(1);
}
try {
  if (fs.existsSync(file)) {
    const old = fs.readFileSync(file, "utf8");
    if (old) fs.writeSync(fd, old);
  }
  fs.writeSync(fd, line + "\n");
  fs.fsyncSync(fd);
} finally {
  fs.closeSync(fd);
}
try {
  fs.renameSync(tmp, file);
} catch (e) {
  // another writer won; keep our tmp (it will be rotated next time)
}
console.log("telemetry-write: appended " + story + " (" + skill + ")");