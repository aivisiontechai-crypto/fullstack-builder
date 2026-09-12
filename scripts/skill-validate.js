#!/usr/bin/env node
// skill-validate.js — real, local, dependency-free validator for SKILL.md.
// Replaces the phantom `npx skills validate` (skills CLI has no such command as
// of v1.5.18). Checks the integrity-significant properties that would catch a
// bad self-edit. Exit 0 = PASS, nonzero = FAIL with per-check messages.
//
// Usage:
//   node scripts/skill-validate.js [path/to/SKILL.md] [--require-additive-only]
//
// --require-additive-only: used by the self-mod dry-run; fails if the diff
// (stdin) contains any deleted (`-`) lines, per §I "additive-only enforced by
// code".
const fs = require('fs');
const path = require('path');

const target = process.argv[2] && !process.argv[2].startsWith('--')
  ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..', 'SKILL.md');
const requireAdditive = process.argv.includes('--require-additive-only');

if (!fs.existsSync(target)) {
  console.error(`FAIL: skill file not found: ${target}`);
  process.exit(1);
}

const raw = fs.readFileSync(target, 'utf8');
const errors = [];
const ok = (m) => console.log(`  ok: ${m}`);
const fail = (m) => errors.push(m);

// 1. Valid UTF-8 (no BOM oddities / replacement chars).
if (raw.includes('\uFFFD')) fail('file contains U+FFFD (invalid UTF-8)');

// 2. Frontmatter: must open with --- and declare name + description (the
//    Agent Skills convention reads these to discover the skill).
const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
if (!fm) fail('missing YAML frontmatter (must start with ---)');
else {
  const body = fm[1];
  for (const key of ['name:', 'description:']) {
    if (!new RegExp(`^${key}\\s`, 'm').test(body)) fail(`frontmatter missing '${key}'`);
  }
}

// 3. Balanced code fences — an unbalanced fence would truncate the rest of the
//    doc (the most common silent corruption from a partial write).
const fences = (raw.match(/```/g) || []).length;
if (fences % 2 !== 0) fail(`unbalanced code fences (${fences} backtick-triples)`);

// 4. Additive-only gate for self-modification.
if (requireAdditive) {
  const stdin = fs.readFileSync(0, 'utf8');
  const deletions = stdin.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('---'));
  if (deletions.length > 0) fail(`non-additive diff: ${deletions.length} deleted line(s) (self-edit must only ADD lines)`);
}

if (errors.length) {
  console.error('FAIL:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

ok(`frontmatter: name + description present`);
ok(`code fences balanced (${fences / 2} fenced blocks)`);
if (requireAdditive) ok('diff is additive-only');
console.log(`PASS: ${target}`);
