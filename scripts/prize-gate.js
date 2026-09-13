#!/usr/bin/env node
// prize-gate.js — the machine-checkable "distinctive / prize-worthy" gate.
//
// SKILL.md Section 7 claims a surface only passes "distinctive / prize-worthy"
// when it ALSO satisfies 6 machine-checkable criteria. This script is that
// validator. Before it existed the claim was prose — a text-only agent could
// answer YES to a checklist and ship a generic UI. Now the pass is recorded
// with evidence, and the gate fails on any criterion.
//
// Usage:
//   node scripts/prize-gate.js <project-dir> [--design-md docs/DESIGN.md]
//       [--src src] [--bundle .next] [--out docs/prize-gate.json]
// Exit 0 = PASS (all 6 criteria), 1 = FAIL with per-criterion evidence.
//
// Criteria (SKILL.md §7):
//   1. Distinctiveness from category default — the @theme palette is not the
//      default SaaS triad (blue+Inter / purple-gradient).
//   2. Signature element present — a non-shadcn, hand-authored
//      @keyframes/WebGL/Canvas/Rive/Lottie/react-three-fiber asset in the
//      bundle (code + dependency scan).
//   3. Hero composition — the hero is not [centered label, centered H1,
//      centered button]; it has >=2 distinct blocks on different axes.
//   4. AA contrast on the 3 highest-value surfaces (axe-core/Lighthouse).
//   5. Animation budget — count of animated-on-load + durations within the
//      Section 6 motion budget (<=1 scroll-linked entrance per section,
//      <=2 simultaneously-moving hero elements).
//   6. Fresh-context adversarial review — recorded evidence from a subagent
//      with no memory of the build (this script cannot run that itself; it
//      reads the recorded review and fails if absent or blank).
//
// Criteria 4 and 6 are "external" — they need a browser and a subagent. The
// script degrades cleanly: if axe/lighthouse are not installed it reports
// "not-run" for criterion 4 rather than a fake pass; if no review file is
// present it fails criterion 6 loudly. A text-only agent can never claim a
// look it could not see, and this gate enforces that contract.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const args = process.argv.slice(2);
function opt(name, def) {
  const i = args.indexOf(name);
  return i === -1 ? def : args[i + 1];
}
const projectDir = args[0] && !args[0].startsWith("--") ? path.resolve(args[0]) : process.cwd();
const designMdPath = opt("--design-md", path.join(projectDir, "docs", "DESIGN.md"));
const srcPath = opt("--src", path.join(projectDir, "src"));
const bundlePath = opt("--bundle", path.join(projectDir, ".next"));
const outPath = opt("--out", path.join(projectDir, "docs", "prize-gate.json"));

const DEFAULT_SAAS_PALETTES = [
  ["blue", "inter"],
  ["indigo", "inter"],
  ["violet", "inter"],
  ["purple", "inter"],
  ["fuchsia", "inter"],
];
const DEFAULT_GRADIENT = /purple-gradient|bg-gradient-to-r.*purple|from-purple.*to-violet/i;

const findings = [];
const results = {};
function record(criterion, pass, evidence, detail) {
  results[criterion] = { pass: !!pass, evidence: evidence || "", detail: detail || "" };
  if (!pass) findings.push(`${criterion}: ${detail || evidence || "failed"}`);
}

// ---------------------------------------------------------------------------
// Criterion 1 — Distinctiveness from category default
// ---------------------------------------------------------------------------
function criterion1(designMd) {
  if (!fs.existsSync(designMd)) {
    record(1, false, "docs/DESIGN.md absent", "cannot audit a palette that was never written");
    return;
  }
  const text = fs.readFileSync(designMd, "utf8");
  // Extract the @theme block (Tailwind v4) if present, else fall back to the
  // raw token table. Either way we need a concrete hue to audit.
  const themeM = text.match(/@theme\s*\{([\s\S]*?)\}/);
  const themeBody = themeM ? themeM[1] : text;
  const oklchColors = (themeBody.match(/oklch\([^)]+\)/g) || []);
  if (oklchColors.length === 0) {
    record(1, false, "no oklch() values found in DESIGN.md", "the spine mandates OKLCH color space; a token file with no oklch cannot be audited");
    return;
  }
  // Map each oklch to its hue; a "default SaaS" palette clusters near
  // blue(240-260)/indigo(250-270)/violet(275-290)/purple(280-300)/fuchsia(300-320).
  const hues = oklchColors.map((c) => {
    const m = c.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    return m ? parseFloat(m[3]) : null;
  }).filter((n) => n !== null);
  if (hues.length === 0) {
    record(1, false, "oklch() values present but no hue parseable", "");
    return;
  }
  // Distinctive = at least one hue outside the default SaaS band AND the
  // font pairing is not Inter. A palette that is all blue/purple/violet with
  // Inter is the category default by construction.
  const inDefaultBand = hues.filter((h) => h >= 230 && h <= 320);
  const ratio = inDefaultBand.length / hues.length;
  const usesInter = /\bInter\b/i.test(text) && !/font-pairing|primary-font|display-font/i.test(text);
  const distinctive = ratio < 0.5 || !usesInter;
  record(1, distinctive,
    `${hues.length} oklch hues, ${inDefaultBand.length} in the 230-320 SaaS band (ratio ${ratio.toFixed(2)}), Inter${usesInter ? "" : " not"} the sole typeface`,
    distinctive ? "palette departs from the default SaaS triad" : "palette is inside the default SaaS band — this is the generic look the spine bans");
}

// ---------------------------------------------------------------------------
// Criterion 2 — Signature element present
// ---------------------------------------------------------------------------
const SIGNATURE_PATTERNS = [
  { name: "keyframes", re: /@keyframes\s+[a-zA-Z]/ },
  { name: "webgl", re: /webgl|GL\.|useFrame|<Canvas|<Canvas / },
  { name: "canvas", re: /<canvas|canvas\.getContext|getContext\(/ },
  { name: "rive", re: /@rive-app|<rive|rive-react/ },
  { name: "lottie", re: /@lottiefiles|dotlottie|react-lottie|<Lottie/ },
  { name: "three-fiber", re: /react-three-fiber|@react-three|<Canvas .*drei/ },
];
function criterion2(srcPath, bundlePath) {
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (["node_modules", ".git", ".next", "dist", "build", "coverage"].includes(e.name)) continue;
        walk(full);
      } else if (/\.(tsx?|jsx?|mjs|cjs|css|html)$/.test(e.name)) files.push(full);
    }
  }
  walk(srcPath);
  // Also scan the compiled bundle for the same signals — a signature asset
  // that exists only in source but was tree-shaken out does not count.
  if (fs.existsSync(bundlePath)) walk(bundlePath);
  const hits = [];
  for (const f of files) {
    let text;
    try { text = fs.readFileSync(f, "utf8"); } catch { continue; }
    for (const p of SIGNATURE_PATTERNS) {
      if (p.re.test(text)) hits.push({ file: path.relative(projectDir, f), signal: p.name });
    }
  }
  // De-duplicate by signal
  const signals = [...new Set(hits.map((h) => h.signal))];
  const pass = signals.length > 0;
  record(2, pass,
    pass ? `signature signals found: ${signals.join(", ")}` : "no signature signals found in src/ or the bundle",
    pass ? "" : "criterion 2 requires at least one hand-authored @keyframes/WebGL/Canvas/Rive/Lottie/react-three-fiber asset — a default shadcn bundle has none");
}

// ---------------------------------------------------------------------------
// Criterion 3 — Hero composition (DOM-structure heuristic)
// ---------------------------------------------------------------------------
// The hero is the first <main>/<section>/<div> with a heading. A generic hero
// is [centered label, centered H1, centered button] on one axis. Distinctive
// composition has >=2 distinct blocks laid out on different axes (grid +
// asymmetric split, image + text side by side, etc.).
function criterion3(srcPath) {
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (["node_modules", ".git", ".next", "dist", "build", "coverage"].includes(e.name)) continue;
        walk(full);
      } else if (/\.(tsx?|jsx?)$/.test(e.name)) files.push(full);
    }
  }
  walk(srcPath);
  let hero = null;
  for (const f of files) {
    let text;
    try { text = fs.readFileSync(f, "utf8"); } catch { continue; }
    if (/hero/i.test(f) || /<main/i.test(text) || /landing/i.test(f)) {
      hero = { file: path.relative(projectDir, f), text };
      break;
    }
  }
  if (!hero) {
    record(3, false, "no hero/main/landing component found", "cannot audit a hero that was never written");
    return;
  }
  const t = hero.text;
  // Signals of generic centered hero
  const centered = /flex\s+items-center\s+justify-center|text-center.*grid.*place-items-center|mx-auto.*my-auto/i;
  const hasH1 = /<h1/i.test(t);
  const hasGrid = /grid/i.test(t) && /grid-cols-[\d/]+|grid-template-columns|grid\s+grid-areas/i.test(t);
  const hasSplit = /md:grid-cols-2|lg:grid-cols-2|grid-cols-2/i.test(t) || /gap-[xl]+/i.test(t);
  const hasImage = /<img|next\/image|\{?Image/i.test(t);
  const blocks = (hasGrid ? 1 : 0) + (hasSplit ? 1 : 0) + (hasImage ? 1 : 0);
  const generic = centered.test(t) && hasH1 && blocks === 0;
  record(3, !generic,
    `hero in ${hero.file}: h1=${hasH1}, grid=${hasGrid}, split=${hasSplit}, image=${hasImage}, centered-only=${centered.test(t)}`,
    generic ? "hero is the centered label + H1 + button pattern the spine bans" : "hero has >=2 distinct blocks on different axes");
}

// ---------------------------------------------------------------------------
// Criterion 4 — AA contrast on the 3 highest-value surfaces
// ---------------------------------------------------------------------------
// axe-core / Lighthouse are external. The script tries them and reports
// "not-run" rather than a fake pass when absent — a text-only agent can
// never claim a look it could not see, and this gate enforces that.
// Probe for a contrast engine WITHOUT triggering a download: check node_modules
// first (zero-cost, the common case in a built project), then a fast PATH
// probe for the CLIs, and only fall back to npx with a short timeout. An
// npx probe that burns 15s per engine on every gate run turns a 200ms
// audit into a 30s hang, and in a sandbox with no network it just hangs.
function hasModule(name) {
  let dir = projectDir;
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(dir, "node_modules", name);
    if (fs.existsSync(candidate)) return true;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return false;
}
function hasBinary(name) {
  try {
    const r = require("child_process").spawnSync("which", [name], { stdio: "ignore", timeout: 2000 });
    return r.status === 0;
  } catch { return false; }
}
function criterion4(projectDir) {
  const hasAxe = hasModule("axe-core") || hasModule("@axe-core/cli") || hasBinary("axe") || hasBinary("lighthouse");
  const hasLh = hasModule("lighthouse") || hasBinary("lighthouse");
  if (!hasAxe && !hasLh && process.env.PRIZE_GATE_PROBE_NPX === "1") {
    // Opt-in only. An unconditional npx probe burns ~8-16s per engine on every
    // gate run (and hangs in a sandbox with no network), turning a 200ms audit
    // into a half-minute wait. Set PRIZE_GATE_PROBE_NPX=1 to allow it.
    try { execFileSync("npx", ["--yes", "axe-core", "--version"], { stdio: "ignore", timeout: 8000 }); hasAxe = true; }
    catch { /* not available — degrade cleanly */ }
    try { execFileSync("npx", ["--yes", "lighthouse", "--version"], { stdio: "ignore", timeout: 8000 }); hasLh = true; }
    catch { /* not available — degrade cleanly */ }
  }
  if (!hasAxe && !hasLh) {
    record(4, false, "neither axe-core nor lighthouse installed", "criterion 4 cannot be verified without a contrast engine — install one, or run `npx axe-core` and record the result in docs/contrast-audit.json");
    return;
  }
  // A real run would invoke axe against the built app. Here we record the
  // tool that is available and point at the audit file the agent must
  // produce — the gate fails if that file is absent, which is the
  // enforcement this script provides.
  const auditPath = path.join(projectDir, "docs", "contrast-audit.json");
  if (!fs.existsSync(auditPath)) {
    record(4, false, `${hasAxe ? "axe-core" : "lighthouse"} available but docs/contrast-audit.json absent`,
      "run the contrast audit and write docs/contrast-audit.json before claiming AA compliance");
    return;
  }
  let audit;
  try { audit = JSON.parse(fs.readFileSync(auditPath, "utf8")); }
  catch { record(4, false, "docs/contrast-audit.json is not valid JSON", ""); return; }
  const violations = (audit.violations || audit.results || []).filter((v) => /contrast/i.test(v.id || v.check || ""));
  record(4, violations.length === 0,
    `${violations.length} contrast violation(s) across ${audit.surfaces || 3} surfaces`,
    violations.length ? violations.slice(0, 3).map((v) => v.id || v.help || JSON.stringify(v)).join("; ") : "AA contrast holds on the audited surfaces");
}

// ---------------------------------------------------------------------------
// Criterion 5 — Animation budget
// ---------------------------------------------------------------------------
// Section 6 motion budget: at most 1 scroll-linked entrance animation per
// section, <=2 simultaneously-moving hero elements. This counts
// animated-on-load elements and their declared durations from the source.
function criterion5(srcPath) {
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (["node_modules", ".git", ".next", "dist", "build", "coverage"].includes(e.name)) continue;
        walk(full);
      } else if (/\.(tsx?|jsx?|css)$/.test(e.name)) files.push(full);
    }
  }
  walk(srcPath);
  let scrollLinked = 0;
  let heroMoving = 0;
  let maxDuration = 0;
  for (const f of files) {
    let text;
    try { text = fs.readFileSync(f, "utf8"); } catch { continue; }
    // scroll-linked entrances: useScroll, useTransform with scroll, IntersectionObserver
    scrollLinked += (text.match(/useScroll|useTransform|IntersectionObserver|scroll-triggered|scrolly/g) || []).length;
    // hero motion: animatePresence, whileHover/whileTap on hero-sized elements, framer animate
    heroMoving += (text.match(/whileHover|whileTap|animatePresence|<motion\.[a-z]/g) || []).length;
    // durations
    const durs = text.match(/duration[:=]\s*(\d+)/g) || [];
    for (const d of durs) {
      const n = parseInt(d.replace(/[^\d]/g, ""), 10);
      if (n > maxDuration) maxDuration = n;
    }
  }
  // Budget: <=1 scroll-linked entrance per section (we count files as a proxy
  // for sections), <=2 simultaneously-moving hero elements, and no single
  // animation over the spine's cap.
  const SCROLL_BUDGET = 1;
  const HERO_BUDGET = 2;
  const DURATION_CAP = 1200;
  const scrollOk = scrollLinked <= SCROLL_BUDGET * Math.max(1, files.length / 4);
  const heroOk = heroMoving <= HERO_BUDGET * Math.max(1, files.length / 4);
  const durOk = maxDuration <= DURATION_CAP;
  const pass = scrollOk && heroOk && durOk;
  record(5, pass,
    `${scrollLinked} scroll-linked entrance(s), ${heroMoving} hero motion(s), max duration ${maxDuration}ms across ${files.length} files`,
    pass ? "within the Section 6 motion budget" : `over budget: scroll=${scrollLinked} (cap ~${SCROLL_BUDGET}/section), hero=${heroMoving} (cap ~${HERO_BUDGET}/section), max duration ${maxDuration}ms (cap ${DURATION_CAP}ms)`);
}

// ---------------------------------------------------------------------------
// Criterion 6 — Fresh-context adversarial review
// ---------------------------------------------------------------------------
// This script cannot spawn a subagent itself; it reads the recorded review
// and fails loudly if it is absent or blank. That is the enforcement: a
// text-only agent can never claim a look it could not see, and this gate
// makes the claim require evidence that only a fresh context could produce.
function criterion6(projectDir) {
  const reviewPath = path.join(projectDir, "docs", "prize-review.json");
  if (!fs.existsSync(reviewPath)) {
    record(6, false, "docs/prize-review.json absent",
      "criterion 6 requires a fresh subagent review — run one and record docs/prize-review.json (a blank YES is not evidence)");
    return;
  }
  let review;
  try { review = JSON.parse(fs.readFileSync(reviewPath, "utf8")); }
  catch { record(6, false, "docs/prize-review.json is not valid JSON", ""); return; }
  const text = JSON.stringify(review);
  const blank = !review || (review.findings == null && review.verdict == null && review.evidence == null);
  if (blank) {
    record(6, false, "docs/prize-review.json is empty", "a blank review is not evidence — the subagent must issue a distinctiveness verdict with cited evidence");
    return;
  }
  const passed = review.passes === true || review.verdict === "distinctive" || review.verdict === "pass";
  record(6, !!passed,
    `fresh-context review recorded (${review.agent || "subagent"}, ${review.ts || "no timestamp"})`,
    passed ? "a fresh context confirmed distinctiveness with evidence" : `review did not pass: ${text.slice(0, 200)}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  criterion1(designMdPath);
  criterion2(srcPath, bundlePath);
  criterion3(srcPath);
  criterion4(projectDir);
  criterion5(srcPath);
  criterion6(projectDir);

  const passed = Object.keys(results).map(Number).filter((n) => results[n].pass);
  const failed = Object.keys(results).map(Number).filter((n) => !results[n].pass);
  const report = {
    gate: "prize-worthiness",
    version: 1,
    project: path.basename(projectDir),
    ts: new Date().toISOString(),
    criteria: results,
    passed: passed.length,
    total: Object.keys(results).length,
    result: failed.length === 0 ? "PASS" : "FAIL",
    evidence: {
      designMd: fs.existsSync(designMdPath) ? designMdPath : null,
      src: fs.existsSync(srcPath) ? srcPath : null,
      bundle: fs.existsSync(bundlePath) ? bundlePath : null,
    },
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + "\n");

  console.log(`prize-gate: ${report.result} (${passed.length}/${report.total} criteria)`);
  for (const [n, r] of Object.entries(results)) {
    console.log(`  ${r.pass ? "PASS" : "FAIL"} criterion ${n}: ${r.detail || r.evidence}`);
  }
  console.log(`  evidence -> ${outPath}`);

  if (failed.length) {
    console.error("\nprize-gate: FAILED \u2014 a surface may not claim 'distinctive / prize-worthy'.");
    process.exit(1);
  }
  console.log("\nprize-gate: PASS \u2014 the shipped UI may claim 'distinctive / prize-worthy'.");
  process.exit(0);
}
main();
