---
description: Build a complete fullstack web product with great UI (SaaS, tools, marketplaces, dashboards) — real DB/auth/integrations, all skills integrated, hands-free, + IMPROVISE polish pass. Spec-kit capabilities (constitution, specify, plan, tasks, converge) integrated by default. Usage: /fullstack-builder <app idea> [--dry-run]
---

The user gave an idea for a fullstack web product where the UI must be great,
not an afterthought — an internal tool, marketplace, dashboard, content
product, or SaaS. Run the **fullstack-builder** skill end-to-end, hands-free:

> Idea: $ARGUMENTS

**Flags (parse from $ARGUMENTS):**
- `--dry-run` / `--plan-only` — Run Phase 0–1b only; output `docs/PLAN.md` +
  `prd.json` + `docs/STORY_GRAPH.md` without building; exits before Phase 2.
  Use for review/approval before full run.
- `--budget-resume` — Resume after `BUDGET_EXCEEDED` halt; continues from
  `progress.txt` with updated budget (requires `max_tokens`/`max_cost_usd`
  increase in `CONSTRAINTS.md`).
- `--resume-from <path>` — Resume from specific `progress.txt` / `prd.json`
  in another directory (for forked/continued runs).
- `--phase <N>` — Run only Phase N (0–4) for debugging; requires completed
  prior phases.
- `--verbose` / `--debug` — Full ralph loop logs + telemetry to console.

**Spec-kit capabilities run by default when available:**
- Constitution → establishes governing principles (code quality, testing, UX, performance, security)
- Specify → adds formal traceability layer (Constitution → Spec → Plan → Tasks → Code)
- Plan + Tasks → feeds ralph stories with spec-kit traceability
- Convergence → `/speckit.implement` (task validation) + `/speckit.checklist` (requirements-quality unit tests) at US-002, every 5 stories, and pre-Phase 3; appends corrective tasks on drift (spec-kit v0.8.x has no `converge` command)

## Fully hands-free mode (walk away and it finishes)

Run once, detached, from the project directory you want the app in
(replace the idea in quotes). MUST use `--command` — a bare
`/fullstack-builder` in the message is just text the model replies to;
`--command fullstack-builder` is what actually executes the pipeline:

```bash
# Detached launch on the opencode host. The ralph loop's per-iteration
# backend is TOOL-AGNOSTIC and separate from this host — it resolves as
# BUILD_AGENT env var → host's own CLI → any agent on PATH (no preference),
# so it will happily run iterations through claude/codex/etc. even though the
# top-level process is opencode. Pin it explicitly if you want a specific one:
#   BUILD_AGENT=claude nohup opencode run --command fullstack-builder --auto "an AI billing copilot for agencies" > build.log 2>&1 &
nohup opencode run --command fullstack-builder --auto "an AI billing copilot for agencies" > build.log 2>&1 &
tail -f build.log   # optional; the pipeline finishes on its own
```

On Claude Code the same detached form uses that host's CLI:

```bash
BUILD_AGENT=codex nohup claude -p "build an AI billing copilot for agencies" --dangerously-skip-permissions > build.log 2>&1 &
```

Resume: if the driver process dies, re-run the same command — the pipeline
picks up existing `prd.json`/`progress.txt` and continues; green stories
skip.

## How to run (in-session)

1. **Invoke the `fullstack-builder` skill** and follow its pipeline. Create
   a todo list covering all phases and keep it updated as work lands.
2. **Phase U + Constitution** — before any docs, lock the visual world:
   resolve the 7-tier premium-UI capability ladder (direction → design
   system → typography → motion → assets → composition → critique), each
   tier with a recorded fallback; then **run `/speckit.constitution`** to
   establish governing principles, and commit a `docs/DESIGN.md` token
   skeleton (colors→semantic roles, type, spacing, radius, shadows, motion).
3. **Unified pipeline (spec-kit enhances, not replaces):**
   - Feed brief + DESIGN.md + CONSTITUTION.md into **vibe-docs** → 14 docs + `prd.json`
   - Run `/speckit.specify` → `docs/SPEC.md` (auditable lineage, augments vibe-docs output)
   - Run `/speckit.plan` → `docs/PLAN.md` (augments ARCHITECTURE/DATA_MODEL/TEST_PLAN)
   - Run `/speckit.tasks` → map to ralph stories in `prd.json` (replaces planning-and-task-breakdown)
   - Run **vibe-build ralph loop** with **injected gates**:
     - Per-iteration UI gates (the 20 rules in AGENTS.md + the injected UI gates)
     - `/speckit.implement` + `/speckit.checklist` at US-002, every 5 stories, pre-Phase 3 (validates, appends corrective tasks)
     - Story retry/backoff (3×), dependency graph (parallel where safe), cost/token budget
   - Loop continues until **both** `<promise>COMPLETE</promise>` **and** `/speckit.implement` + `/speckit.checklist` report no drift
4. **Final gates** — builder's Phase 3 + automated PR description, release notes,
   ERD, Storybook, a11y regression, performance budgets, bundle gate, E2E recording,
   seed from prod, DR drill, compliance, threat model, data flow, runbook,
   scaling rules, onboarding, ADR template.
5. **IMPROVISE** — surface-moded critique (Persuade/Operate/Activation/Read),
   cross-checked against the Figma-derived pattern library (SKILL.md §8) and
   the chosen `design-md` brand seed; one batched fix, mode-guided refine
   (`bolder`/`polish`/`animate`/`onboard`/`typeset`), Playwright scripted
   backtest per surface tag (drag/slider/toggle/upload behave before&after),
   live browser iteration against `next build && next start`, axe/Lighthouse
   evidence, screenshots in `docs/ui-gallery/`, backtest results in
   `docs/ui-baselines/backtest.json`, capped at ≤3 rounds + wall-clock ceiling.
   E2E test recording + visual regression baseline update during iteration.

## Non-negotiables (violate none)

- **Hands-free.** Ask NO clarifying questions; choose stack/design yourself;
  record every choice in `docs/DECISIONS.md`. Only a real external
  credential is ever deferred (env-gated, listed in the final report).
- **No mock, dummy, or hardcoded data anywhere in the app.** Real DB, real
  auth, real migrations, real flows from the first slice. Tests MAY mock;
  e2e hits a real DB + the real running app.
- **No hardcoded config.** Secrets/URLs/flags from gitignored `.env`; `.env.example`
  ships with placeholders only.
- **Great UI or it isn't done.** Design tokens are law and enforced in CI;
  every screen has real loading/empty/error/focus states; responsive at
  390/768/1280; reduced-motion respected; no anti-slop defaults (no
  centered-3-emoji hero, no default purple gradient, no Acme/lorem).
- **Sandboxed build.** Project-local `node_modules`, read-only Python, infra
  in non-root Docker containers, ralph loop confined to the project branch.
- **Production-ready.** Strict TS, lint+typecheck+build green, unit/
  integration + Playwright e2e green, security headers/CSP, input
  validation, rate limits, RBAC, hardened Docker, CI workflow, README.
- **Blunt but robust.** Real integrations wired with provider SDKs and
  env-gated; never stub success. Missing non-blocking tooling (python3,
  browser) degrades via the skill's fallbacks and is reported, not skipped.

## Final report (keep it short)

Shipped features, UI verdict per surface, what IMPROVISE improved, the one
command to run it, credentials the user must supply (paths only, never
values inline), and the capability level actually achieved.