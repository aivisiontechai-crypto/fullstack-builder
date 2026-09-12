#!/usr/bin/env node
// resume.js — reactivate the dashboard for a stopped/paused fullstack-builder
// run, then hand off to the engine's resume driver.
// Usage: node scripts/resume.js <project-dir> [driver args...]
//
// Why this exists: the dashboard is a background process tied to the shell, so
// when you come back to a stopped run it is gone. Running the dashboard
// command directly works, but resuming also means restarting the build — this
// wraps both in one step so you don't have to remember two commands.
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const project = process.argv[2];
if (!project) {
  console.error("usage: node scripts/resume.js <project-dir> [driver args...]");
  process.exit(2);
}
const driverArgs = process.argv.slice(3);
const skillDir = path.join(__dirname, "..");

// 1. Reactivate the dashboard (auto-detects an already-running one; no dup)
let url = "";
try {
  const out = execFileSync("node", [path.join(skillDir, "scripts", "dashboard.js"), project], {
    encoding: "utf8",
    timeout: 15000,
  });
  const m = out.match(/http:\/\/127\.0\.0\.1:\d+/);
  if (m) url = m[0];
} catch (e) {
  // dashboard failure must never block the resume
}

// 2. Tell the user where to look
if (url) console.log("monitor: " + url);

// 3. Hand off to the engine's resume driver (engine-owned; args pass through)
const driver = path.join(process.env.HOME || "", ".agents", "ralph", "scripts", "ralph", "ralph-driver.sh");
if (!fs.existsSync(driver)) {
  console.error("resume.js: engine driver not found at " + driver + " — dashboard is up; run your resume command manually.");
  process.exit(0);
}
const child = require("child_process").spawnSync("sh", [driver, project, ...driverArgs], { stdio: "inherit" });
process.exit(child.status || 0);