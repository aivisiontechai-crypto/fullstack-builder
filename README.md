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
       ├─ Phase 2      vibe-docs → 14 docs + prd.json with 89 stories
       │               + ~50 governed docs (DOC_GOVERNANCE, USER_FLOWS,
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
│   ├── DOC_TEMPLATES.md         # Documentation OS template bank (11 phases, ~50 doc contracts)
│   └── adr/TEMPLATE.md          # ADR template (copied on first run)
```

The ~dozen other `scripts/*` names referenced (e.g. `db-backup.sh`,
`pitr-test.sh`, `strix-wait.sh`, `ralph/*`) are **project-side**: the agent
authors them into `<project-root>/scripts/` during the relevant story — they
do not ship in the skill repo.

---

## Non-negotiables

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
