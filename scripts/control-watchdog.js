#!/usr/bin/env node
// Dashboard control watchdog: watches <project>/.dashboard-control; on
// stop/pause it SIGTERMs the ralph supervisor (via scripts/ralph/.ralph.pid).
// Resumable by design — report to user: resume with --budget-resume.
// Usage: node scripts/control-watchdog.js <project-dir>
const fs = require("fs");
const path = require("path");

const projectDir = process.argv[2] || ".";
const ctl = path.join(projectDir, ".dashboard-control");
const pidFile = path.join(projectDir, "scripts", "ralph", ".ralph.pid");

const alive = (pid) => {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
};

setInterval(() => {
  let req = null;
  try {
    req = JSON.parse(fs.readFileSync(ctl, "utf8"));
  } catch {
    return;
  }
  if (!req.action || (req.action !== "stop" && req.action !== "pause")) return;

  let pid = null;
  try {
    pid = parseInt(fs.readFileSync(pidFile, "utf8").trim(), 10);
  } catch {}

  if (!pid || !alive(pid)) {
    try { fs.unlinkSync(ctl); } catch {}
    console.log(`control: ${req.action} requested (${req.ts}) — no live supervisor pid, nothing to stop`);
    process.exit(0);
  }

  console.log(`control: ${req.action} — SIGTERM to supervisor pid ${pid} (requested ${req.ts})`);
  try { process.kill(pid, "SIGTERM"); } catch {}

  let waited = 0;
  const t = setInterval(() => {
    if (!alive(pid) || waited >= 5000) {
      clearInterval(t);
      let final = "stopped";
      if (alive(pid)) {
        try { process.kill(pid, "SIGKILL"); } catch {}
        final = "SIGKILL sent";
      }
      try { fs.unlinkSync(ctl); } catch {}
      console.log(`control: supervisor pid ${pid} ${final}`);
      process.exit(0);
    }
    waited += 250;
  }, 250);
}, 2000);

console.log(`control-watchdog: watching ${ctl} every 2s for stop/pause — stops supervisor via ${pidFile}`);