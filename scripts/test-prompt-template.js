#!/usr/bin/env node
// test-prompt-template.js — validate a prompt-architect template for promotion.
// Usage: node scripts/test-prompt-template.js <template.md> [ideas...]
// Reports a completeness score; exit 1 if below 0.9 or a required field is missing.
const fs = require("fs");

const [tplFile, ...ideas] = process.argv.slice(2);
if (!tplFile) { console.error("usage: test-prompt-template.js <template.md> [idea...]"); process.exit(2); }
const tpl = fs.readFileSync(tplFile, "utf8");

const REQUIRED = ["audience", "context", "objective", "success measure"];
let score = 0;
const missing = [];
for (const field of REQUIRED) {
  const re = new RegExp("(?:" + field + ")", "i");
  if (re.test(tpl)) score++; else missing.push(field);
}
const total = REQUIRED.length;
const ratio = score / total;
console.log(`template completeness: ${score}/${total} = ${ratio.toFixed(2)}`);
if (missing.length) console.log("missing fields:", missing.join(", "));
if (ratio < 0.9 || missing.length) process.exit(1);
console.log("test-prompt-template: PASS");
process.exit(0);
