# fullstack-builder

Turn a one-line idea into a shipped, production-ready fullstack web product
**with a great UI as a first-class, gated deliverable** — hands-free, zero
clarifying questions, real database, real auth, real integrations, zero mock
data.

This is an **Agent Skill** (Agent Skills convention): a prompt + tooling that
any compatible coding agent — opencode, Claude Code, Cline, Antigravity,
Replit, Cursor, Windsurf — reads to drive its own tools through the build.
It **bundles the entire engine** (`builder` → `vibe-docs` → `vibe-build`) inside this skill, and adds the two things that pipeline under-serves: **great UI
decided up front**, and **UI improvement after the build** (the IMPROVISE
phase). No external engine install needed.

- **Version:** 2.5.0
- **Host:** any Agent-Skills-compatible agent (opencode / Claude Code / etc.)
- **Repository:** [github.com/aivisiontechai-crypto/fullstack-builder](https://github.com/aivisiontechai-crypto/fullstack-builder)

---

## What it does

Single command, walk away, it finishes:

```
"build me an AI billing copilot for agencies"
  └─ fullstack-builder
       ├─ Phase 0–1b   prerequisites, stack lock (pnpm 12, Prisma 8, Next 15),
       │               DESIGN.md (7 sections, locked before code), CONSTITUTION,
       │               spec-kit (constitution/specify/plan/tasks), Documentation OS
       ├─ Phase 2      vibe-docs → 14 docs + prd.json with a large story graph
       │               + ~78 governed docs (DOC_GOVERNANCE, USER_FLOWS,
       │               ACCEPTANCE_CRITERIA, TRACEABILITY, AI_SPEC, THREAT_MODEL, ...)
       ├─ Phase 3      vibe-build ralph loop — ONE story per headless agent
       │               iteration, per-iteration UI gates, converge checkpoints,
       │               atomic git commit per passing story, budgets enforced
       ├─ Phase 4      final gates (security, a11y, perf budgets, CI, runbook)
       └─ IMPROVISE    surface-moded critique + polish in a live browser,
                       capped ≤3 rounds, screenshots in docs/ui-gallery/
```

**Always-completes invariant:** the pipeline finishes by *degrading by
capability*, never by inserting mock data — a missing tool/credential means
the feature is deferred or uses a real fallback and is reported, never faked.

**Prize-worthiness gate:** a surface only claims "distinctive / prize-worthy"
after a machine-checkable 6-criterion validator passes (hue/type
distinctiveness, signature element, hero composition, AA contrast, animation
budget, fresh-context `impeccable` review) — "all YES" by a text-only agent is
not a pass.

---

## Install

Clone the repo, then copy the whole skill directory into your host's skill
root. Only the *skill-discovery path* and the optional *surface wrapper*
differ per host — the `SKILL.md` body is identical everywhere.

```bash
# From wherever you keep downloaded skills
git clone https://github.com/aivisiontechai-crypto/fullstack-builder
```

| Host | Skill root | Wrapper | MCP config |
|---|---|---|---|
| opencode | `~/.config/opencode/skills/fullstack-builder` | `command/fullstack-builder.md` → `~/.config/opencode/command/` (`/fullstack-builder`) | `opencode.json` `mcp` block |
| Claude Code | `~/.claude/skills/fullstack-builder` | inline (load `SKILL.md`) | `~/.claude.json` `mcpServers` |
| Cline | `~/.cline/skills/fullstack-builder` | inline | Cline/VS Code MCP settings |
| Antigravity / Replit / Cursor / Windsurf | their documented skill root | inline | their documented MCP config / `.mcp.json` |

### opencode

```bash
# Copy the whole skill dir into the skill root
cp -r fullstack-builder ~/.config/opencode/skills/fullstack-builder

# opencode-only: slash-command wrapper (enables /fullstack-builder)
cp fullstack-builder/command/fullstack-builder.md ~/.config/opencode/command/fullstack-builder.md

# Restart opencode, then run it from the dir you want the app in
opencode run --command fullstack-builder --auto "your app idea here"
```

### Claude Code

No slash-command wrapper needed — the skill loads inline:

```bash
cp -r fullstack-builder ~/.claude/skills/fullstack-builder
# restart, then invoke the skill by name with your one-line idea
```

### Other hosts (Cline / Antigravity / Replit / Cursor / Windsurf)

Copy `SKILL.md` into the host's skill root and load it directly — no wrapper.
The skill self-describes its phases, so just give it the one-line idea.

The engine family (`builder`, `vibe-docs`, `vibe-build`, `vibe-evolve`) is
bundled inside this skill at `skills/` — it's provisioned into a discovery
root on first run, so no separate engine install is ever needed.

Restart the host so config-time files load. The skill **self-provisions** its
dependencies on first run (Bootstrap section), including on-demand MCP
provisioning (check → configure → degrade).

---

## Commands

### opencode

| Form | Usage |
|---|---|
| In-session slash command | `/fullstack-builder your app idea here` |
| Detached run (hands-free) | `nohup opencode run --command fullstack-builder --auto "your app idea here" > build.log 2>&1 &` |

The ralph loop's per-iteration backend is **tool-agnostic** and separate from
the host — pin it with `BUILD_AGENT=claude|codex`, else the host's own CLI,
else any of `opencode`/`claude`/`codex` on PATH (no preference).

### Claude Code / Cline / Antigravity / Replit / Cursor / Windsurf

Invoke the skill by name and give it the one-line idea; it self-describes its
phases:

```
build me an AI billing copilot for agencies
```

### Flags

| Flag | Effect |
|---|---|
| `--dry-run` / `--plan-only` | Phase 0–1b only: emits `docs/PLAN.md` + `prd.json` + `docs/STORY_GRAPH.md`, exits before building |
| `--budget-resume` | Resume after a `BUDGET_EXCEEDED` halt (requires budget bump in `CONSTRAINTS.md`) |
| `--resume-from <path>` | Resume from a `progress.txt`/`prd.json` in another directory |
| `--phase <N>` | Run only Phase N (0–4); requires completed prior phases |
| `--verbose` / `--debug` | Full ralph loop logs + telemetry to console |

Resume is resilient: re-running the same command picks up existing
`prd.json`/`progress.txt`; green stories are skipped.

---

## What ships in the skill

```
fullstack-builder/
├── SKILL.md                     # the skill (host-agnostic)
├── LICENSE                      # MIT
├── LEDGER.md                    # engine family skill audit / change log
├── scripts/                     # skill-side tooling (SHIPS with the skill)
│   ├── design-gate.js           # token-aware UI slop gate (C1 rules)
│   ├── telemetry-migrate.js     # TELEMETRY.jsonl v1→v2 schema migration
│   ├── test-prompt-template.js  # prompt-template promotion test runner
│   └── skill-validate.js        # dependency-free SKILL.md validator (§I)
├── skills/                      # BUNDLED engine family (MIT) — no external install needed
│   ├── builder/                 # orchestrator (SKILL.md, README)
│   ├── vibe-docs/               # idea → docs/ package + prd.json
│   ├── vibe-build/              # docs/ → ralph loop → production app
│   │   ├── ralph/               # bundled ralph driver (sh + mjs runners)
│   │   └── ...
│   └── vibe-evolve/             # toolchain self-improvement
├── bin/                         # cross-platform helpers
│   ├── ralph-setup.{sh,mjs,ps1}   # install ralph driver machine-wide
│   ├── ralph-check.{mjs,ps1}      # preflight: detect missing tools + dead backend
│   └── ralph-guard.{mjs,ps1}      # no-placeholder-data scan (cheap gate)
├── command/
│   └── fullstack-builder.md     # slash-command wrapper — opencode only
│                                 # (the SKILL.md body itself is host-agnostic;
│                                 # every other host loads it inline per Install)
├── docs/
│   ├── MEMORY.md                # project memory template (copied on first run)
│   ├── DOC_TEMPLATES.md         # Documentation OS template bank (12 phases, ~78 doc contracts)
│   └── adr/TEMPLATE.md          # ADR template (copied on first run)
```

The ~dozen other `scripts/*` names referenced (e.g. `db-backup.sh`,
`pitr-test.sh`, `strix-wait.sh`, `ralph/*`) are **project-side**: the agent
authors them into `<project-root>/scripts/` during the relevant story — they
do not ship in the skill repo.

---


## Premium-UI capability (this skill's reason to exist)

The engine builds a *functional* product. This skill adds the layer that makes it
feel like a shipped product rather than a generated prototype: a complete
premium-UI toolchain, resolved once at bootstrap (the Phase U Capability Ladder)
and wired into every phase. It is a first-class, gated deliverable — not an
afterthought.

**"Premium" means, mechanically:**
- **Distinctive, not pretty.** The palette differs from the default SaaS triad
  (`blue+Inter`, purple gradient); there is a signature element; the hero is
  not `[centered label, centered H1, centered button]`. A 6-criterion
  machine-checkable validator gates the "distinctive" claim — a text-only
  agent can never claim a look it could not see.
- **Intentional motion, not decoration.** At most 1 scroll-linked entrance per
  section, ≤2 simultaneously-moving hero elements. `transition-all` and
  `animate-pulse` on static elements are auto-fail.
- **One visual world.** Palette + font pairing + mood from Phase U hold across
  every screen; variation comes from layout and composition, not drifting
  colors/type per page.
- **Gated, not vibes.** `design-gate.js` runs in CI on every PR; the
  prize-worthiness validator gates the claim; the final report states exactly
  which capability tier ran vs fell back.

**The 7-tier capability ladder (resolved at bootstrap, degrades by tier):**

| Tier | Capability | Primary skill | Fallback |
|---|---|---|---|
| 1 | Direction (not the default look) | `frontend-design` (anthropics, 847K+ installs) | in-SKILL Quick Reference |
| 2 | Real design system with tokens | `ui-ux-pro-max --design-system` (needs `python3`) | hand-authored `docs/DESIGN.md` |
| 3 | Typography with personality | `typeset` (pbakaus/impeccable, 64.9K installs) | spine type-scale rules |
| 4 | Intentional motion | `review-animations` (97.6K) → `ui-animation` (7.2K) → `framer-motion-animator` (8K) → `motion-design-skill` (11K) → `iart-ai/web-animation-skills` (GSAP/SVG/Lottie/glassmorphism in one MIT pack) | CSS transitions + `@starting-style` |
| 5 | Real assets (image/icon/motion/3D/font) | `ai-image-generation` (102K) → `lottie`/text-to-lottie → `@rive-app/react-webgl2` → `react-three-fiber`+`drei` → `@tabler-icons`/`lucide`/`phosphor-icons` → `next/font` self-hosted | licensed stock, hand-authored SVG, no placeholder service URL |
| 6 | Composition that is not default shadcn | `shadcn` (251.8K) → `building-components` (vercel) → `magic-ui` → `frontend-ui-engineering` + `web-design-guidelines` → `redesign-existing-projects` (221.6K) | hand-compose from `docs/DESIGN.md` tokens |
| 7 | Adversarial, mode-guided critique | `impeccable` + its `bolder`/`colorize`/`animate`/`delight`/`polish`/`distill`/`clarify`/`adapt`/`onboard`/`harden` commands + `ask-sonner` | mechanical checks: axe/`pa11y`, headless Lighthouse CWV, keyboard operability, `design-gate.js` |

**Degradation rule:** a tier that fails to install degrades to its fallback column
*for that tier only* — the pipeline continues, and the final report states
which tier fell back and why. A tier that silently does not run is a defect,
not a feature.

**New in this version:** the known-source map and integrated skill map now cover
the full premium-UI stack (emilkowalski/skills 10-skill pack, mblode `ui-animation`,
patricio0312rev `framer-motion-animator`, C-Jeril/framer-motion-skills 7-skill pack,
lottiefiles `motion-design-skill`, diffusionstudio `lottie` text-to-lottie,
iart-ai/web-animation-skills 8-skill pack, leonxlnx/taste-skill, and the
pbakaus/impeccable command vocabulary). Phase 4 gained an **asset pass** (4b)
and a **fresh-eyes contrast pass** (4c) so template-flatness is fixed at the
source rather than patched after the fact.

## Non-negotiables

## Prize-worthiness gate (the H5 mechanical gate)

A surface only claims "distinctive / prize-worthy" when it passes the
machine-checkable validator shipped at `scripts/prize-gate.js` — 6 criteria,
each mapping to a tool that actually exists:

1. **Palette distinctiveness** — the `@theme` palette departs from the
   default SaaS triad (blue/purple + Inter).
2. **Signature element** — a hand-authored `@keyframes`/WebGL/Canvas/Rive/
   Lottie/`react-three-fiber` asset in the bundle.
3. **Hero composition** — not `[centered label, centered H1, centered button]`;
   >=2 distinct blocks on different axes.
4. **AA contrast** — axe-core/Lighthouse on the 3 highest-value surfaces.
5. **Animation budget** — <=1 scroll-linked entrance per section, <=2
   simultaneously-moving hero elements, no single animation over the cap.
6. **Fresh-context adversarial review** — a subagent with no memory of the
   build issues a verdict with cited evidence (`docs/prize-review.json`).

The gate **fails if any criterion fails.** A text-only agent can never claim
a look it could not see, and the gate enforces that: criterion 4 degrades to
"not-run" rather than a fake pass when no contrast engine is installed, and
criterion 6 fails loudly when no review is recorded. The pass is quoted into
`DECISIONS.md` with the evidence, and the report lands in `docs/prize-gate.json`.

Run it before claiming "distinctive": `node scripts/prize-gate.js <project>`.


- **Hands-free** — no clarifying questions; every choice recorded in `docs/DECISIONS.md`.
- **No mock/dummy/hardcoded data** — real DB, real auth, real migrations, real flows from the first slice. Tests may mock; e2e hits a real DB + running app.
- **No hardcoded config** — secrets/URLs/flags from gitignored `.env`; `.env.example` ships with placeholders.
- **Great UI or it isn't done** — design tokens are law, enforced in CI; every screen has real loading/empty/error/focus states; responsive at 390/768/1280; reduced-motion respected; no anti-slop defaults.
- **Sandboxed build** — project-local deps, non-root Docker infra, ralph loop confined to the project branch.
- **Production-ready** — strict TS, lint+typecheck+build green, unit/integration + Playwright e2e green, security headers/CSP, input validation, rate limits, RBAC, hardened Docker, CI workflow, README.
- **Living documentation OS** — docs are a governed, drift-controlled spec (not a static dump): source-of-truth per concern, stable IDs (`REQ-###`/`AC-###`/…), dependency-aware generation, and a traceability spine that a code change can never silently break.
- **Blunt but robust** — real integrations wired with provider SDKs, env-gated; missing non-blocking tooling degrades via fallbacks and is reported, not skipped.

---

## Final report

Each run ends with a short report: shipped features, UI verdict per surface,
what IMPROVISE improved, the one command to run it, credentials the user must
supply (paths only, never values inline), and the capability level actually
achieved — including any degraded tools and deferred credentials.

---

## Tooling & self-maintenance

- **Package manager:** pnpm 12.x canonical; `npx` only for ephemeral external CLIs; `npm` never for project scripts.
- **ORM:** Prisma 8 default; Kysely read-only; Drizzle/PGlite/TanStack DB are opt-in alternatives.
- **Self-evolution:** per-run telemetry → optional self-edits to `SKILL.md`, guarded by additive-only diffs, git/bak rollback, and an independent validator (`scripts/skill-validate.js`). It never corrupts the file that governs future runs.

## Notes / honest caveats

- AI integrations (Vercel AI SDK, LangGraph, RAG, AI Elements) build the full
  pipeline, but model/provider calls require **your** API keys at go-live —
  these are env-gated and deferred per the real-account rule.
- The engine (`builder`/`vibe-docs`/`vibe-build`) **ships bundled** inside
  this skill at `skills/` — the agent provisions it into a discovery root
  (or reads it directly) on first run; no external install required.

## License

MIT — this skill and the bundled engine family it ships with are both MIT.
