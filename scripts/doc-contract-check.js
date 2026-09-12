#!/usr/bin/env node
// Verifies generated docs against the mechanically-checkable subset of the
// Documentation OS MUST-contain contracts. Semantic richness (evidence per
// item) is still agent-verified per Documentation OS §7 step 3.
// Usage: node scripts/doc-contract-check.js <project-dir>
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (!args[0] || args[0].startsWith("--")) {
  console.error("usage: node scripts/doc-contract-check.js <project-dir> [--convergence]");
  console.error("  --convergence  additionally require every prd.json story passes:true with no open depends_on to a failing story (phase-3 gate)");
  process.exit(2);
}
const CONVERGENCE = args.includes("--convergence");
const read = (f) => {
  try {
    return fs.readFileSync(path.join(args[0], f), "utf8");
  } catch {
    return null;
  }
};

const docsDir = path.join(args[0], "docs");
const readDoc = (f) => {
  try {
    return fs.readFileSync(path.join(docsDir, f), "utf8");
  } catch {
    return null;
  }
};

const FORBID = [
  [/\bTBD\b/i, "unresolved TBD"],
  [/\bTODO\b/i, "unresolved TODO"],
  [/\bFIXME\b/i, "unresolved FIXME"],
  [/\[NEEDS CLARIFICATION/i, "dangling [NEEDS CLARIFICATION] marker"],
  [/lorem ipsum/i, "lorem ipsum filler"],
];

// doc -> [required regex markers (all must match), human label]
const CONTRACTS = {
  "CONSTITUTION.md": [
    [/I\.\s*Code Quality/gi, "principle I. Code Quality"],
    [/II\.\s*Testing/gi, "principle II. Testing"],
    [/III\.\s*UX Consistency/gi, "principle III. UX Consistency"],
    [/IV\.\s*Performance/gi, "principle IV. Performance"],
    [/V\.\s*Security/gi, "principle V. Security"],
    [/VI\.\s*Data Integrity/gi, "principle VI. Data Integrity"],
  ],
  "SPEC.md": [
    [/##\s*Functional Requirements/gi, "Functional Requirements section"],
    [/##\s*Non-functional Requirements/gi, "Non-functional Requirements section"],
    [/##\s*API Contract/gi, "API Contracts section"],
    [/##\s*Data Model/gi, "Data Model section"],
    [/##\s*Traceability/gi, "Traceability Matrix section"],
    [/^\s*\|.*\|.*\|/m, "a table row (traceability matrix must be a real table)"],
  ],
  "PLAN.md": [
    [/##\s*Phase|###\s*Phase|phase breakdown/i, "phase breakdown"],
    [/done when|done-when|exit criterion/i, "phase exit criteria"],
    [/dependenc(?:y|ies)/i, "dependency graph"],
    [/blocked-by|blocked by|blocking/i, "blocked-by/parallel relations"],
    [/risk register|##?\s*Risk/i, "risk register"],
    [/mitigat|likelihood|probability|impact/i, "risk mitigation/severity"],
    [/docker|compose|healthcheck|health-check|5432|6379|volume/i, "infrastructure plan"],
    [/coverage|vitest|playwright|e2e|storybook|axe/i, "testing strategy"],
    [/csp|rate[\s-]limit|arcjet|rbac|secret|zod/i, "security plan"],
  ],
};

let failed = 0;
const check = (file, text) => {
  const probs = [];
  for (const [re, label] of CONTRACTS[file] || []) if (!re.test(text)) probs.push(`missing ${label}`);
  for (const [re, label] of FORBID) {
    const m = text.match(re);
    if (m) probs.push(`forbidden ${label} near "${m[0]}"`);
  }
  return probs;
};

for (const [file, _] of Object.entries(CONTRACTS)) {
  const text = readDoc(file);
  if (text === null) {
    console.error(`FAIL docs/${file}: missing`);
    failed++;
    continue;
  }
  const probs = check(file, text);
  if (probs.length) {
    console.error(`FAIL docs/${file}:`);
    for (const p of probs) console.error(`  - ${p}`);
    failed++;
  } else {
    console.log(`ok   docs/${file}`);
  }
}

const prd = JSON.parse(read("prd.json") || "null");
const stories = prd && Array.isArray(prd.stories) ? prd.stories : prd && Array.isArray(prd) ? prd : null;
if (!stories) {
  console.error("FAIL prd.json: no stories array");
  failed++;
} else {
  const byId = new Map(stories.map((s) => [s.id, s]));
  stories.forEach((s, i) => {
    const id = s.id || `story[${i}]`;
    const probs = [];
    if (!/^US-\d+$/i.test(String(s.id || ""))) probs.push("no US-### id");
    if (!s.title || !String(s.title).trim()) probs.push("missing title");
    if (!s.spec_requirement && !s.constitution_principle && !s.requirement)
      probs.push("no spec-kit traceability (spec_requirement / constitution_principle)");
    const ac = s.acceptance_criteria || s.ac
      ? (Array.isArray(s.acceptance_criteria) ? s.acceptance_criteria : s.ac)
      : null;
    if (!Array.isArray(ac) || ac.length < 3) probs.push("fewer than 3 acceptance criteria");
    if (CONVERGENCE) {
      if (s.passes !== true) probs.push(`not passes:true ("${s.passes}")`);
      const deps = Array.isArray(s.depends_on) ? s.depends_on : [];
      const openFailing = deps.filter((d) => {
        const t = byId.get(d);
        return !t || t.passes !== true;
      });
      if (openFailing.length) probs.push(`open depends_on to failing story: ${openFailing.join(", ")}`);
    }
    if (probs.length) {
      console.error(`FAIL prd.json ${id}: ${probs.join("; ")}`);
      failed++;
    } else {
      console.log(`ok   prd.json ${id}`);
    }
  });
}

process.exit(failed ? 1 : 0);