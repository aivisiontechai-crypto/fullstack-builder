#!/usr/bin/env node
// design-gate.js — token-aware UI slop gate for fullstack-builder.
// Validates src/ component/style usage stays inside the DESIGN.md token system.
// Usage: node scripts/design-gate.js [--design-md docs/DESIGN.md] [--src src]
// Exit 1 on any finding (CI fail), 0 when clean.

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const root = process.cwd();
const designMdPath = opt("--design-md", path.join(root, "docs", "DESIGN.md"));
const srcPath = opt("--src", path.join(root, "src"));

function opt(name, def) {
  const i = args.indexOf(name);
  return i === -1 ? def : args[i + 1];
}

const ALWAYS_ILLEGAL = [
  { name: "raw-hex", re: /#[0-9a-fA-F]{3,8}\b/ },
  { name: "raw-color-fn", re: /\b(?:rgb|rgba|hsl|hsla)\(/ },
  { name: "raw-tailwind-shade", re: /(?:bg|text|border|shadow|from|via|to|ring|divide|fill|stroke)-(?:blue|indigo|violet|purple|fuchsia|pink|red|rose|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|slate|gray|zinc|neutral|stone)-(?:50|[1-9]00)\b/ },
  { name: "arbitrary-hex-util", re: /(?:bg|text|border|shadow|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/ },
  { name: "ts-suppression", re: /@ts-ignore|@ts-expect-error|eslint-disable|stylelint-disable/ },
  { name: "lorem-ipsum", re: /lorem\s*ipsum/i },
  { name: "acme-brand", re: /\bAcme\b|\byour_app\b|\binsert_secret\b/i },
  { name: "placeholder-svc", re: /jsonplaceholder|api\.github\.com\/users/i },
  { name: "todo", re: /\b(?:TODO|FIXME|XXX)\b/ },
];

const SPACING_OUT_OF_SCALE =
  /\b(?:px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y)-(?:20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)\b/;
const SECTION_VERTICAL_PADDING = /(?:py|pt|pb)-(?:16|18|20|24|28|32|36|40)\b/;
const SPACE_HACK = /\bspace-[xy]-\d+\b/;
const TYPO_OUT_OF_SCALE = /\btext-(?:5xl|6xl|7xl|8xl|9xl)\b/;
const MOTION_STATIC = /\banimate-(?:pulse|bounce|spin|ping)\b/;
const TRANSITION_ALL = /\btransition-all\b/;
const FOCUS_KILLED = /\b(?:outline-none|focus:outline-none)\b/;

const SPEC_ONLY = [
  { name: "backdrop-blur", re: /backdrop-blur/ },
  { name: "gradient", re: /bg-gradient|from-|via-|to-/ },
];

function specAllows(designMd, feat) {
  if (!designMd) return false;
  const spec = fs.readFileSync(designMd, "utf8").toLowerCase();
  return spec.includes(feat);
}

function collect(dir, files) {
  files = files || [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(full, files);
    else if (/\.(tsx?|jsx?|css|html)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function main() {
  const files = collect(srcPath);
  if (!files.length) {
    console.log("design-gate: no source files found under " + srcPath);
    process.exit(0);
  }
  const findings = [];
  const designMd = fs.existsSync(designMdPath) ? designMdPath : null;

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const r of ALWAYS_ILLEGAL) {
      const m = text.match(r.re);
      if (m) findings.push({ file, rule: r.name, match: m[0] });
    }
    const classRules = [
      [SPACING_OUT_OF_SCALE, "spacing-out-of-scale"],
      [SECTION_VERTICAL_PADDING, "section-vertical-padding"],
      [SPACE_HACK, "space-hack"],
      [TYPO_OUT_OF_SCALE, "typo-out-of-scale"],
      [MOTION_STATIC, "motion-static"],
      [TRANSITION_ALL, "transition-all"],
      [FOCUS_KILLED, "focus-killed"],
    ];
    for (const [re, name] of classRules) {
      const m = text.match(re);
      if (m) findings.push({ file, rule: name, match: m[0] });
    }
    for (const r of SPEC_ONLY) {
      const m = text.match(r.re);
      if (m && !specAllows(designMd, r.name)) {
        findings.push({ file, rule: r.name + "-not-specified", match: m[0] });
      }
    }
  }

  if (findings.length) {
    console.error("design-gate: FAILED — " + findings.length + " finding(s)");
    for (const f of findings) console.error(`  ${f.file}: [${f.rule}] ${f.match}`);
    process.exit(1);
  }
  console.log("design-gate: PASS — no token violations");
  process.exit(0);
}

main();
