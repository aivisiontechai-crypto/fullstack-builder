---
name: fullstack-builder
version: 2.5.0
user-invocable: true
description: Build a complete fullstack web product — real DB, real auth, real integrations, production-ready — with a great UI as a first-class, gated deliverable, not an afterthought. Use when the user says "build a fullstack app", "fullstack builder", "build a SaaS", "build me a product with great UI", "make a beautiful web app for this idea", "turn this idea into a polished product", "build <idea> and make the UI great", or wants any multi-screen web app built hands-free that also looks outstanding (landing, dashboards, pricing, onboarding — SaaS is the flagship category, not the only one). Chains the installed builder → vibe-docs → vibe-build pipeline as the engine (hands-free, zero mock data, full product not MVP), injects a UI-excellence brief phase that existing pipeline lacks, injects per-iteration UI quality gates into the ralph loop, and ends with a mandatory IMPROVISE phase that critiques, polishes, animates, and live-iterates the shipped UI in a browser (headless screenshot fallback when no browser tool is available). Integrates every installed skill across the ecosystem (see the Integrated skill map) — design, data, API, motion, a11y, security, testing, deploy. Do NOT use for: backend-only work, tiny single-page edits, native-only apps, or builds that don't need a UI mandate — those route to `builder`/`vibe-build` alone.
---

# fullstack-builder — idea → shipped fullstack web product, great-UI-first


## One-stop premium-UI capability (this skill's reason to exist)

The engine builds a *functional* product. This skill adds the layer that makes
it feel like a shipped product rather than a generated prototype: a complete
premium-UI toolchain, resolved once at bootstrap and wired into every phase.

**What "premium" means here, mechanically:**
- Not "pretty" — *distinctive*. The palette differs from the default SaaS triad
  (`blue+Inter`, purple gradient); there is a signature element (criterion 2 of
  the prize-worthiness gate); the hero is not `[centered label, centered H1,
  centered button]` (criterion 3).
- Not "decorated" — *intentional*. Motion follows the spine's budget: at most
  **1** scroll-linked entrance per section, **≤2** simultaneously-moving hero
  elements. Every animation has a job; `transition-all` and `animate-pulse` on
  static elements are auto-fail.
- Not "themed" — *one visual world*. Palette + font pairing + mood from Phase U
  hold across every screen. Variation comes from layout and composition, not
  from drifting colors/type per page.
- Not "bolted on" — *gated*. `design-gate.js` runs in CI on every PR; the
  prize-worthiness validator (6 machine-checkable criteria) gates the "distinctive"
  claim; a text-only agent can never claim a look it could not see.

**The capability ladder (Phase U, resolved at bootstrap):**

| Tier | Capability | Primary skill | Fallback |
|---|---|---|---|
| 1 | Direction (not the default look) | `frontend-design` (anthropics, 847K+) | in-SKILL Quick Reference |
| 2 | Real design system with tokens | `ui-ux-pro-max --design-system` (needs `python3`) | hand-authored `docs/DESIGN.md` |
| 3 | Typography with personality | `typeset` (pbakaus/impeccable, 64.9K) | spine type-scale rules |
| 4 | Intentional motion | `review-animations` (97.6K) → `ui-animation` (7.2K) → `framer-motion-animator` (8K) → `motion-design-skill` (11K) → `iart-ai/web-animation-skills` (GSAP/SVG/Lottie/glassmorphism in one MIT pack) | CSS transitions + `@starting-style` |
| 5 | Real assets (image/icon/motion/3D/font) | `ai-image-generation` (102K) → `lottie`/text-to-lottie (3.6K★) → `@rive-app/react-webgl2` → `react-three-fiber`+`drei` → `@tabler-icons`/`lucide`/`phosphor-icons` → `next/font` self-hosted | licensed stock, hand-authored SVG, no placeholder service URL |
| 6 | Composition that is not default shadcn | `shadcn` (251.8K) → `building-components` (vercel) → `magic-ui` → `frontend-ui-engineering` + `web-design-guidelines` → `redesign-existing-projects` (221.6K) | hand-compose from `docs/DESIGN.md` tokens |
| 7 | Adversarial, mode-guided critique | `impeccable` + its `bolder`/`colorize`/`animate`/`delight`/`polish`/`distill`/`clarify`/`adapt`/`onboard`/`harden` commands + `ask-sonner` | mechanical checks: axe/`pa11y`, headless Lighthouse CWV, keyboard operability, `design-gate.js` |

**Degradation rule:** a tier that fails to install degrades to its fallback column
*for that tier only* — the pipeline continues, and the final report states
exactly which tier fell back and why. A tier that silently does not run is a
defect, not a feature. See the Phase U Capability Ladder in Phase 1 for the
resolution order and the per-tier fallbacks.

You are the tech lead shipping a full web product to production with a
UI that earns its reputation — an internal tool, marketplace, dashboard,
content product, or SaaS (the flagship category: pricing/subscriptions,
multi-tenancy, and AI chat generate automatically when the idea is a SaaS;
otherwise those stories simply don't exist). You orchestrate the **engine**
(the installed `builder` / `vibe-docs` / `vibe-build` pipeline — do not
re-implement what they already do), and you own the two things that
pipeline under-serves: **great UI decided up front**, and **UI
improvement after the build**.

## When to use / when NOT

- **Use** when the ask implies a real multi-screen product (landing, app
  shell, dashboards, pricing, onboarding) and design matters — almost every
  fullstack web app.
- **NOT** for a backend-only service, a single-page edit, a native mobile
  app, or a build that explicitly cares about function over form. Those
  route to `builder`/`vibe-build` alone.

## Non-negotiables (inherited from the engine, always enforced)

- Hands-free: zero clarifying questions; every assumption recorded in
  `docs/DECISIONS.md`. The only deferral is real-account credentials,
  env-gated and listed in the final report.
- No mock/dummy/hardcoded data in the app, ever (tests may mock). Real DB,
  real auth, real integrations, no fake "paid"/"sent".
- FULL product, not an MVP. Every `prd.json` story ends `passes: true`.
- Quality bar is a written contract: `CONSTRAINTS.md` via
  `constraint-driven-development`, held by every ralph iteration and the
  final gate. Never weaken it to get green.
- NEVER `git push`, open a PR, or touch shared systems. Everything stays
  local until the user explicitly says publish.
- **Sandboxed build (this skill's addition).** Everything the pipeline
  runs stays inside the project and container boundaries — nothing installs
  globally, nothing touches the host machine's system state:
  - Project-local `node_modules` only; npm/npx runs resolve within the
    project (npx caches shared binaries in the standard cache dir, never
    installs into the project unless it's a project dependency).
  - Python is read-only usage only (`ui-ux-pro-max`'s `search.py`, stdlib,
    no `pip install` ever). All infra (Postgres, Redis, Strix sandbox, test
    double servers) runs in Docker containers, non-root, port-mapped from
    free ports and recorded in the compose file.
  - The ralph loop and all its logs run entirely inside the project
    directory on a local git branch; the only writes outside the project are
    the engine's documented shared-file appends (`LEDGER.md`,
    `LEARNINGS.md` in project root, flock-locked per builder) and reads of the shared skill
    roots (read-only).
  - Secrets live in gitignored `.env`, one per environment; environments
    (LOCAL → DEVELOPMENT → STAGING → PRODUCTION) never share a database or
    credentials.
- UI bar (this skill's addition, just as non-negotiable): every shipped
  screen matches the committed design tokens, has real loading/empty/error/
  focus states, works at 390/768/1280px, respects `prefers-reduced-motion`,
  and carries no anti-slop defaults (see The UI excellence spine).

## The engine — delegation contract

Do not duplicate the engine. Its phases, prerequisites, ralph loop, security
minimums, no-mock-data gate, and final gates are canonical. Load `builder`
first; it owns Phases 0–3. This skill contributes:

1. **Phase U (before docs)** — decide the visual world before any doc is
   written, so `DESIGN.md` is born with real tokens, not vibes.
2. **Per-iteration UI gates** — added verbatim to the ralph loop's
   `AGENTS.md`, so every feature slice ships polished on the same commit.
3. **Phase 4 (IMPROVISE)** — after the engine's COMPLETE gate, an obligatory
   critique → polish → animate → live-iterate program on the running UI,
   with bounded passes.

**Engine upstream (BUNDLED — no external install needed):** the engine family
(`builder`, `vibe-docs`, `vibe-build`, `vibe-evolve`) ships inside THIS skill
repo under `skills/`, with the ralph driver bundled inside
`skills/vibe-build/ralph/`, a cross-platform `ralph-runner.mjs`, and helpers
`bin/ralph-check.mjs` (preflight), `bin/ralph-guard.mjs` (no-placeholder scan —
a cheap first pass for the no-mock-data gate), and `bin/ralph-setup.mjs`
(machine-wide ralph install). MIT.
These copies are canonical — use them as the reference for engine behavior and
as the Bootstrap's install source; never fetch the engine from anywhere else.

## Guard

If there is NO idea/context to build (empty arguments or an empty scaffold
dir with no docs), stop and reply "give me an idea — /fullstack-builder
<idea>". Never fabricate a product the user didn't ask for.

## Bootstrap — self-provision dependencies before every run

A fresh host can have this skill but none of its dependencies. Resolve that
ON FIRST INVOCATION, before anything else: check → install → then use.
Never start a run against missing hard deps and never assume a cold machine.

**Resolution order for every skill this skill references:**

1. **Check** all discovery roots for `<name>/SKILL.md` — treat as installed
   the moment it is found in ANY root (`.opencode/skills`,
   `~/.config/opencode/skills`, `~/.claude/skills`, `~/.agents/skills`,
   plus any `skills.paths` the host declares). Found → done.
   **Engine tier is bundled here:** `builder`, `vibe-docs`, `vibe-build`,
   `vibe-evolve` always resolve from `<this skill>/skills/<name>/` — copy
   that bundle into a discovery root on first run (or read the bundled
   `SKILL.md` by path), then treat it as installed. Never install the engine
   from the network.
2. **Ledger source** — a recorded `<owner/repo>@<name>` in
   `~/.agents/skills/LEDGER.md` → install with
   `CI=1 npx -y skills add <owner/repo>@<skill> -g -y`.
3. **Known-source map (embedded here, no ledger needed)** — the repository
   sources this ecosystem already audited and recorded:

   | Skill | Source |
   |---|---|
   | `builder`, `vibe-docs`, `vibe-build`, `vibe-evolve` (+ bundled ralph driver) | **bundled in this skill** — `skills/<name>/` (engine tier; MIT). Install from `skills/` by copying into any discovery root (or read directly from the bundle); the ralph driver ships inside `skills/vibe-build/ralph/` and `bin/ralph-setup.mjs` installs it machine-wide |
   | `frontend-design` | `anthropics/skills@frontend-design` |
   | `shadcn` | `shadcn-ui/ui@shadcn` |
   | `magic-ui` | `magicuidesign/magicui@magic-ui` |
   | `agent-elements` | `21st-dev/agent-elements@agent-elements` |
   | `emil-design-eng` | `emilkowalski/skills@emil-design-eng` |
   | `building-components` | `vercel/components.build@building-components` |
   | `codebase-design`, `domain-modeling`, `improve-codebase-architecture` | `mattpocock/skills@<name>` |
   | `gdpr-data-handling`, `sast-configuration`, `nodejs-backend-patterns` | `wshobson/agents@<name>` |
   | `security-review` | `getsentry/skills@security-review` |
   | `owasp-top-10-testing` (+ Strix family) | `usestrix/strix@<name>` |
   | `k6` | `grafana/skills@k6` |
   | `seo` | `addyosmani/web-quality-skills@seo` |
   | `email-best-practices`, `react-email` | `resend/<name>` |
   | `vercel-react-best-practices`, `vercel-react-view-transitions`, `vercel-optimize`, `vercel-composition-patterns`, `web-design-guidelines`, `vercel-cli-with-tokens` | `vercel-labs/agent-skills@<name> |
   | `emilkowalski/skills` (10 skills: `emil-design-eng`, `review-animations`, `bolder`, `typeset`, `animate`, `ask-sonner`, `distill`, `colorize`, `delight`, `polish`) | `emilkowalski/skills` (694K+ installs combined; 204.4K on `emil-design-eng` alone; the single highest-signal design-quality pack on skills.sh — teaches agents to *recognise* bad AI UI and audit motion instead of sprinkling it) |
   | `mblode/agent-skills` — `ui-animation` | `mblode/agent-skills@ui-animation` (7.2K installs; hardware-accelerated UI animation beyond opacity/transform) |
   | `patricio0312rev/skills` — `framer-motion-animator` | `patricio0312rev/skills@framer-motion-animator` (8K installs; production Framer Motion code for entrances, gestures, scroll) |
   | `C-Jeril/framer-motion-skills` (7 skills: `framer-motion-core`, `-react`, `-variants`, `-scroll`, `-gestures`, `-layout`, `-svg`) | `C-Jeril/framer-motion-skills` (correct Framer Motion usage per concern — variants, gestures, scroll, shared-layout, SVG) |
   | `lottiefiles/motion-design-skill` | `lottiefiles/motion-design-skill` (11K installs; universal motion choreography — timing, easing, Disney principles for UI) |
   | `diffusionstudio/lottie` (text-to-lottie) | `diffusionstudio/lottie` (3.6K stars, MIT; generate production Lottie JSON from text/SVG — the agent writes the animation, not a runtime fetch) |
   | `iart-ai/web-animation-skills` (8 skills: `gsap-web`, `60fps-animation`, `page-transition-animation`, `accessible-animation`, `micro-interaction`, `glassmorphism`, `svg-animation`, `lottie-animation`) | `iart-ai/web-animation-skills` (MIT; one pack covers GSAP/SVG/Lottie/micro-interactions/glassmorphism/reduced-motion — the broadest single motion purchase) |
   | `leonxlnx/taste-skill` — `redesign-existing-projects`, `high-end-visual-design` | `leonxlnx/taste-skill@<name>` (221.6K installs; audits existing UI against generic-AI patterns and upgrades to premium standard without breaking function) |
   | `pbakaus/impeccable` — `bolder`, `typeset`, `colorize`, `animate`, `delight`, `polish`, `distill`, `clarify`, `adapt`, `onboard`, `harden` | `pbakaus/impeccable@<name>` (29.9K stars; the mode-guided refine vocabulary Phase 4 already references — each name is a *command* the skill exposes) |
   | **spec-kit (GitHub)** — `specify-cli` + core SDD commands (`constitution`, `specify`, `plan`, `tasks`, `implement`, `analyze`, `clarify`, `checklist`) + extensions (`bug-fix`, `assess`) | **`github/spec-kit`** (MIT) — install CLI via `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v<tag>`, then `specify init <proj> --integration <agent>`; or as an Agent Skill bundle via `npx skills add github/spec-kit` when published. **Note: v0.8.x has NO `converge` command** — convergence is `speckit.implement` (task validation) + `speckit.checklist` (requirements-quality unit tests); see Phase 2 §2. |

   Pin a tagged ref/commit when the source exposes one; never widen the
   trust bar to unblock a run.
4. **find-skills** — for any name still missing with no known source (e.g.
   `impeccable`, `ui-ux-pro-max`, `design-taste-frontend` — sources not
   recorded): search skills.sh, inspect the SKILL.md, install only when it
   passes the verification bar (reputable maintainer, or ≥1k installs +
   ≥100 stars).
5. **Outcome per tier:**
- **Engine tier** (`builder`, `vibe-docs`, `vibe-build`, `vibe-evolve`) —
      bundled in this skill at `skills/<name>/` — install by copying the
      bundle into any discovery root, or read the bundled `SKILL.md` directly
      when the host supports file-path skill loading. If the bundle itself is
      missing, STOP and report the error; this skill is an envelope around
      the engine, so a missing engine is the one hard block.
- **Hard-dep tier (engine)** — everything `builder`/`vibe-build`/`vibe-docs`
      gates on (security, data, testing, deploy, spec-kit). Install; if
      verification fails, degrade THAT phase explicitly (say what's skipped
      and why) and continue — never silently run without it.
- **Hard-dep tier (premium UI)** — the 7-tier capability ladder in Phase 1
      (direction, design system, typography, motion, assets, composition,
      critique). Install in order; a tier that fails degrades to its recorded
      fallback *for that tier only* and the pipeline continues. The final
      report states exactly which tier fell back and why. A tier that
      silently does not run is a defect, not a feature.
- **Collateral tier** (`brand`, `design`, `banner-design`, `slides`,
      `design-md` as a *brand seed* only) — nice-to-have; skip cleanly if
      unresolvable and mark the capability unused in the final report.
- **Reference tier** (LEDGER `references:` and the research stack) —
      never installed at run time; patterns only, applied at specific steps
      and documented as such.
Installs are recorded in `~/.agents/skills/LEDGER.md` (flock-locked) so
later runs reuse rather than re-hunt. After bootstrap completes, Phase 0's
prerequisite 7 re-verifies everything present before Phase 1 starts.

**Project Memory Initialization (first run only):**
```bash
# Copy template from skill to project
cp <skill-dir>/docs/MEMORY.md <project-root>/docs/MEMORY.md
# Populate Project Identity from BRIEF.md (automated via prompt-architect output)
```
This file tracks context across sessions — pipeline state, design tokens,
spec-kit traceability, decisions, blockers, credentials, and evidence.
Update it at every phase completion and session handoff.

## Pipeline

### Phase 0 — prep (engine-owned)

**0. Resume detection (before anything else).** If this project was already
    built and stopped mid-way, re-running the skill must **resume**, not
    restart — otherwise Phase 1 regenerates docs and Phase 2 re-runs every
    story from scratch. Detect a stopped/in-progress run:
    - `<project>/progress.txt` exists **and** `prd.json` has at least one
      story with `passes: false` (i.e. the build was not finished), **and**
      there is no live `.ralph.pid` (no run currently in progress).
    If all three hold, this is a **resume** — hand off immediately:
    `node <skill-dir>/scripts/resume.js <project-dir> --budget-resume`
    (reactivates the dashboard, prints the URL, then runs the engine's resume
    driver from the last completed story) and **stop**; do not run the rest
    of Phase 0–4. If a live `.ralph.pid` exists, the run is in progress —
    do not restart it; just reactivate the dashboard
    (`node <skill-dir>/scripts/dashboard.js <project-dir>`) and report the
    URL. Only if neither condition holds do you proceed with a fresh build.

Run `builder`'s Phase 0 exactly: dependency-install pass against all skill
roots (`~/.agents/skills/`, `~/.opencode/skills/`,
`~/.config/opencode/skills/`, `~/.claude/skills/` — treat a skill as
installed if found in ANY root), then cadence-gated `vibe-evolve` +
`find-skills` for toolchain self-improvement.

**All prerequisites, verified in this order — a hard-missing one is a stop
with the exact install command for the user's OS, never a silent skip:**

1. Binaries on PATH and working: `git`, `jq`, `npx`, `docker` — and the
   Docker *daemon* is actually up (`docker info` succeeds, not just on PATH).
 2. Headless build-agent backend — **TOOL-AGNOSTIC: opencode is never the
    default; it is just one candidate, and any installed agent CLI can
    drive the ralph loop.** Resolve in this precedence:
    (a) an explicit `BUILD_AGENT` env var naming one of the backends the ralph
    driver actually knows how to dispatch (`opencode` | `claude` | `codex` —
    see `ralph-iteration.sh`'s dispatch table; adding a fourth means adding
    its invocation case there), else (b) the current host's own CLI when it
    can run headless (Claude Code → `claude`, opencode → `opencode`, etc. —
    match the tool the user is actually running), else (c) any of
    `opencode`/`claude`/`codex` found on PATH. The chosen backend must be
    authenticated for a non-interactive run and pass a trivial smoke test
    within ~60s. Record once in `scripts/ralph/.backend` and launch the loop
    through `./ralph-driver.sh --tool <name>` (do NOT rely on the script's
    own first-found detection ordering — always pass `--tool` explicitly).
    **The skill is host-agnostic: ANY Agent-Skills-compatible agent can
    absorb the run** — Cline, Antigravity, Replit Agent, Cursor, Windsurf,
    and the others only need (a) the `SKILL.md` body (which has no
    host-specific API), (b) the headless build agent on PATH for the ralph
    loop, and (c) the MCP/config resolution mapped per their own convention
    (see §14). If none found: stop and report which to install or how to run
    the loop with a manual gate.
3. Local AI gateway healthy when one is in play: detect an OpenAI-compatible
   gateway by discovery (`curl -sf <gateway>/v1/models` for each candidate —
   a documented local port for this stack, or `localhost:11434`/`11435` for a
   typical llama/omni gateway) — never a hardcoded URL; skip cleanly if
   none responds.
4. No port collision with sibling stacks: check `docker ps --format '{{.Ports}}'`
   (or `lsof -iTCP -sTCP:LISTEN -P`) for the ports this project will use —
   Postgres, the app's dev/prod port, any cache/queue — before the compose
   file is written; on collision, remap to the next free port and record it
   in the compose file, `.env.example`, and README.
5. No other builder run targets this project: no live `scripts/ralph/.ralph.pid`;
   a second run against the same directory races on `prd.json`/git.
6. Enough free disk (≥ ~2GB) for Docker images, `node_modules`, Postgres
   data, and up to 200 iterations of logs.
7. Required skills installed — the **Bootstrap** section already ran at
   invocation (check → install → use, tiered: engine / hard-dep /
   collateral). Re-verify here: every root checked; a skill missing
   from ALL roots gets installed non-interactively from ledger source or
   the embedded known-source map, or degrades explicitly on verified
   failure. **fullstack-builder's extras beyond builder's Required list must
   exist too:** `brand`, `writing-guidelines`, `ui-styling`, and (optional/
   collateral, degrade to none if absent) `design-system`, `design`,
   `banner-design`, `slides`. Verify each by the same all-roots rule;
   install from a recorded source, or mark the capability skipped in the
   report.
8. `python3 --version` (non-blocking): `ui-ux-pro-max`'s search scripts need
   it for Phase U's preferred path. If missing, note it in `DECISIONS.md`
   and proceed — Phase U defines a fallback that preserves the same
   design-system capability.
9. Browser tooling for Phase 4 (non-blocking): `agent-browser` or Playwright
   MCP browser tools when available; if absent, Phase 4 degrades to the
   headless-CLI fallback in Phase 4 step 5 (screenshots + HTTP checks) — the
   UI improvement program and its evidence still run.
10. Engine-drift check (this skill cites specific engine anchors —
      "the engine's 20 rules" is the *AGENTS.md* rule list, the 14 doc files
      is vibe-docs' output table, `US-001`/`US-002` are the first two
      stories, "6c checklist" is vibe-build's final validation pass, and
      "section 3's table" is vibe-build's skill-loading table). Grep the
      installed `builder`/`vibe-docs`/`vibe-build` — or the bundled copies at
      `skills/<name>/` when the engine isn't installed in a discovery root —
      for each anchor before launch; if any value
      changed (rule count, file list, story ids, section numbers), adapt this
      skill's references to the current reality and note the update in
      `DECISIONS.md` — never silently ship a stale citation.
11. **spec-kit prerequisites (required for Phase 0.5+) + `specify init` (MANDATORY
    before any `/speckit.*` command):**
    `uv` on PATH, Python 3.11+, and `specify-cli` installed via
    `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v<tag>`.
    Install on first run if missing; if install fails, skip Phase 0.5–1b and
    degrade to `planning-and-task-breakdown` for story generation (see
    Degradation Path below).
    **`specify init <project-name> --integration <detected-backend>` MUST run
    in the project root BEFORE Phase 0.5.** This is the step that actually
    installs the per-agent `/speckit.*` commands (e.g. `.opencode/commands/
    speckit.constitution.md`, `speckit.plan.md`, `speckit.tasks.md`) — without
    it, none of the `/speckit.*` commands exist and every invocation silently
    produces nothing (the most common cause of "no docs appeared"). Detection:
`.specify/` exists in project root AND the agent's command root contains
     the `speckit.*` commands for the detected backend (`opencode` →
     `~/.config/opencode/command/`, `claude` → `~/.claude/commands/`). If either
     is missing, re-run `specify init` and re-check before Phase 0.5.
     **Required command set:** each of `speckit.constitution.md`,
     `speckit.specify.md`, `speckit.plan.md`, `speckit.tasks.md`,
     `speckit.implement.md`, `speckit.checklist.md`, `speckit.analyze.md`,
     `speckit.clarify.md` must exist in the command root (`taskstoissues` is
     optional). **Adapt-on-drift:** if the installed version's actual set
     differs (spec-kit renamed/removed commands — e.g. the verified v0.8.x
     has no `converge`), record the actual set in `DECISIONS.md` FIRST, then
     adapt this skill's Phase 1/1b/2 invocations to the real commands before
     proceeding — same adapt-on-drift contract as the engine-drift check
     (prereq 10). Never reference a phantom command.
12. **Bun v1.1+ with WinterCG compliance** (required for Phase 0+):
      `bun --version` ≥ 1.1.0; validates native SQLite, fast installs, edge runtime compatibility.
      If missing, install via `curl -fsSL https://bun.sh/install | bash` or use Node.js fallback.
13. **Cloud-credential preflight + degradation path (non-blocking, but explicit):**
      Before US-006/US-013 (Vercel preview) and the deploy stories, check whether the
      deployment credentials actually exist WITHOUT leaking them: `gh auth status`, Vercel
      token present (`vercel whoami` or `VERCEL_TOKEN` env set, value never echoed), and
      `docker info` for the prod path. Classify each into `available` / `absent`, and
      **degrade by capability, never by mock**:
      - **No Vercel token** → drop US-006's Vercel preview + US-013 preview envs + US-055
        canary; deploy to the local production build (`next build && next start`) and Docker
        instead; US-055 resorts to the cookie-bucketing middleware running locally. Recorded
        in `DECISIONS.md` + final report ("Vercel deploy skipped — no token").
      - **No Docker daemon** → run LOCAL/DEV/STAGING DBs on installed Postgres directly
        (brew/system Postgres), skip the compose-prod deploy; the app still ships and runs,
        only containerization is deferred. Note it.
      - **No cloud DB (Neon/RDS) credential** → use local Postgres for all envs; the Prisma
        schema is identical, so nothing is mocked — only the host differs. The final report
        lists which cloud credentials the user must supply to go live (paths only, never
        values).
      The app's code never depends on a cloud credential being present (env.ts validates at
      startup per US-005); degradation only changes where it runs, never its correctness. The
      one-line report always states the capability level actually achieved (which deploys ran
      vs were deferred for missing credentials).
14. **MCP provisioning at run time (check → configure → use → degrade).**
    A requirement that needs an MCP server does NOT assume one is present;
    on the first story that requires an MCP (`agent-browser`/Playwright MCP
    for live browsing, an `ocr` MCP, a DB/`prisma` MCP, Liveblocks MCP for
    collab debugging, a GitHub MCP for release workflows), resolve it in
    this order:
    1. **Detect** — already registered? Resolve the **current host's** MCP
       config by ITS own convention (never assume opencode): opencode
       `~/.config/opencode/opencode.json` `mcp` block; Claude Code
       `~/.claude.json` `mcpServers` (or `~/.claude/settings.json`);
       Cline `~/.cline/` or the VS Code MCP settings;
       Antigravity/Replit/other Agent-Skills hosts use their documented MCP
       config path or a project `.mcp.json`. Whichever host is detected
       (Phase 0 prerequisite 14), read that host's config and check the
       server's stdio/sse command is reachable.
    2. **Configure** — if absent, start the server via its standard
       runner (`npx <mcp-package>`, `uvx`, or the tool's documented
       command) and register it in the host MCP config, then reconnect the
       session before the story depends on it. Do this only when a story
       actually gates on the MCP — never pre-provision every MCP up front.
    3. **Pin verified sources.** Only use MCP packages whose install
       source is recorded (npm package or a known repo) — treat like the
       niche-CLI rule (M8): `npx <name>` and confirm it starts before
       wiring a story to it.
    4. **Degrade (never mock, never hang).** If the MCP cannot be
       started/registered (no network, config read-only, server errors),
       the story degrades explicitly: use the non-MCP fallback for that
       capability (e.g. headless `npx playwright` instead of the Playwright
       MCP; Semgrep/Strix instead of an `ocr` MCP), record
       `"MCP <name> unavailable — reason: ...; used <fallback>"` in
       `DECISIONS.md` + the final report, and continue. A gated capability
       with no available MCP **and** no fallback is deferred, never silently
       claimed done.
This keeps every MCP genuinely available on-demand without assuming
     host state — the same check-then-degrade contract as browser tooling
     (§9) and cloud credentials (§13).
15. **Service-credential inventory + deferral (generalizes §13 + the Stripe
    rule; never mock, never stall on a missing key).** Every real-service
    integration in the build — Stripe, Arcjet, Resend/SendGrid/SES, Vercel
    AI Gateway / LLM providers, OCR, deployment hosts — is inventoried once
    at Phase 0: read the env/config for its key WITHOUT ever echoing it;
    classify each as `available` or `deferred`. For every `deferred` key:
    - The integration **still ships** behind its internal interface
      (`lib/<service>.ts` wrapper) using test mode or a no-key fallback —
      identical to the Stripe rule (US-087/088/089 run against Stripe test
      mode), US-031's email test mode (logs to console), and rate limiting
      degrading to a process-local limiter in `lib/security.ts` when Arcjet
      is unchanged/unkeyed.
    - The missing key is recorded **once** in `DECISIONS.md` + the final
      report as a real-account deferral ("insert key → go live"), with the
      env var name and where it is consumed — paths only, never values.
    - A story whose test/UI path needs the key runs against the fallback
      with **deterministic** fallback values (test cards, console-logged
      emails) — never fake "paid"/"sent". Acceptance criteria match the
      fallback's behavior.
    If the inventory is skipped, the build never starts; the one-line report
    must state the deferral count + which keys the user must supply to go
    live.
    **Guarantee (user directive):** keys are **never** requested from the
    user, never gate any phase, never delay any story, and are never the
    reason a phase waits. The entire build — including Phase 4 — runs on
    test-mode/no-key fallbacks; the user inserts real keys only at go-live,
    guided by the final report's deferral list (env var + consumer path).
    Do not ask for keys at any point.
16. **Local status dashboard (start IMMEDIATELY at run start, announce the
    URL to the user in the FIRST response).** As the absolute first action
    of a run (before Phase 0 prerequisite checks): start it in the
    background and capture its stdout to a log so you can read back the
    URL:
    ```bash
    # 1. record the model in use (so the dashboard can show it) —
    #    detect from the host's own env vars, never invent a value
    MODEL="$(echo "${OPENAI_MODEL:-${ANTHROPIC_MODEL:-${GEMINI_MODEL:-${MODEL:-}}}}" )"
    [ -n "$MODEL" ] && echo "{\"model\":\"$MODEL\",\"source\":\"env\",\"ts\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}" > <project>/.run-model
    #    keep it out of the per-story commits (ralph uses `git add -A`):
    grep -qxF '.run-model' <project>/.gitignore 2>/dev/null || echo '.run-model' >> <project>/.gitignore
    grep -qxF '.dashboard-url' <project>/.gitignore 2>/dev/null || echo '.dashboard-url' >> <project>/.gitignore
    # 2. start the dashboard
    nohup node <skill-dir>/scripts/dashboard.js <project-dir> > /tmp/fb-dashboard.log 2>&1 &
    sleep 1 && grep -o 'http://127.0.0.1:[0-9]*' /tmp/fb-dashboard.log
    ```
    Then tell the user, in the opening message: **"Monitor the run:
    <URL>"**. The dashboard auto-picks the first free port starting at
    `3420` (+1 per busy port, up to +50) — no port knowledge needed. It is
    a **read-only live viewer** — it derives state from artifacts the
    pipeline already writes (`prd.json`, `progress.txt`, `TELEMETRY.jsonl`,
    `docs/*`, git log) and never writes or wraps project files, so it needs
    no hooks and updates in place via **server-pushed events** (SSE `/api/stream`, 2s push interval) — no 3s polling lag; if the browser loses the stream it falls back to polling automatically. The URL is repeated in
    the final report; the dashboard may be left running to watch the
    finished project. If the dashboard process dies mid-run, no build step
    depends on it — restart it anytime (same command); failure to start is
    noted once in `DECISIONS.md` and never blocks a phase.
    **AI / tokens card:** the dashboard sums `tokens_in` / `tokens_out` /
    `cost_usd` from `TELEMETRY.jsonl` (v2 schema) and shows the **model in
    use** (from `.run-model`, else the most-used `model` in telemetry),
    total tokens, total cost, and per-skill breakdown (calls/tokens/cost/
    last used). If no model is detectable it shows "—" — never invents one.
    **App identity strip (multi-app tracking).** The dashboard header shows the
    **app name** (from `docs/BRIEF.md` or `docs/PRD.md` `# Title`, else
    `package.json` name) in a per-app accent color (stable hue hashed from
    the absolute path), the **full absolute path** beneath it, and the app
    name in the browser tab — so several dashboards open at once are
    instantly distinguishable. It starts with **no name** until a real
    source exists; a leading document label like `BRIEF.md — Evolv run
    dashboard` is stripped so it never leaks as the app name.
    **Stuck/killed detection built in:** the dashboard computes "last
    activity" from the newest TELEMETRY event OR git commit timestamp;
    when no activity has occurred for the stall threshold (default 15 min,
    tunable via `FB_STALE_SECONDS`) it shows a red **STALLED** banner
    ("agent likely stuck/killed — last activity <ts> — resume with
    `--budget-resume` when ready"). This is read-only detection: the
    dashboard cannot stop a dead process, but the run is resumable by
    design (`prd.json` + `progress.txt` = complete state; crash recovery
    rolls back to last commit), so the banner tells the user exactly what
    to do. Live/stalled state is also in `/api/status`
    (`started`, `stalled`, `activity_secs`).
    **Control (stop/pause) — dashboard buttons + watchdog.** The dashboard
    page has **Pause run** and **Stop run** buttons; either POSTs to
    `/api/control`, writing `<project>/.dashboard-control`
    (`{"action":"stop"|"pause","ts":...}`). A companion watchdog —
    `node <skill-dir>/scripts/control-watchdog.js <project-dir>` — polled
    every 2s reads that file and SIGTERMs (SIGKILL fallback after 5s) the
    ralph supervisor PID from `scripts/ralph/.ralph.pid`, then deletes the
    control file. Start BOTH the dashboard and the watchdog at run start
    (watchdog along the same `nohup` pattern, logging to
    `/tmp/fb-watchdog.log`). Loss semantics = the existing crash recovery:
    only the in-flight story since the last per-story commit is re-run on
    `--budget-resume`. No engine changes — the supervisor is stopped, never
    forked or patched.
    **Resume after a stop (pause/kill/shutdown):** the dashboard is a
    background process tied to the shell, so it is **not** running when you
    come back — **nothing revives it automatically**; you restart it. The
    resume command is one line and does both:
    `node <skill-dir>/scripts/resume.js <project-dir> [driver args...]`
    It (1) reactivates the dashboard — auto-detecting the already-running
    one from `<project>/.dashboard-url` (no duplicate) and restarting on the
    **same** port if stopped — (2) prints the URL, and (3) hands off to the
    engine's resume driver (`$HOME/.agents/ralph/scripts/ralph/ralph-driver.sh`,
    args pass through). If the engine driver is absent it still brings the
    dashboard up and exits cleanly. The URL is recorded in
    `<project>/.dashboard-url` (gitignored like `.env*`) on start, so no port
    to remember. On resume the ralph driver reads `progress.txt` + `prd.json`
    and continues from the last completed story; the dashboard snaps back to
    LIVE as commits land.

### Self-Evolution Layer (runs continuously, zero config)

**A. Skill Performance Telemetry (every story — project-local)**
    Each story's working agent appends one v2 line to
    `<project-root>/TELEMETRY.jsonl` via
    `node <skill-dir>/scripts/telemetry-write.js` (ralph AGENTS.md rule 32,
    best-effort — never blocks the story). The writer is PII-scrubbed per the
    contract below; the ralph scripts themselves log only to `ralph.log`, so
    this is the skill's own instrumentation, not the engine's.
```json
{"v":1,"skill":"shadcn","story":"US-007","duration_ms":1200,"success":true,"retry_count":0,"ts":"2026-09-09T..."}
{"v":1,"skill":"impeccable","story":"US-007","duration_ms":45000,"success":true,"retry_count":1,"ts":"2026-09-09T..."}
```
Schema version `v` enables forward compatibility. **Migration:** v1→v2 adds `cost_usd`, `tokens_in`, `tokens_out`; `scripts/telemetry-migrate.js` runs on version mismatch — the dashboard runs it itself, and the skill's per-story writer always emits v2. Retention: auto-rotate at 10MB / 30 days.
Global aggregate: `<project-root>/TELEMETRY.jsonl` → `~/.agents/skills/TELEMETRY_GLOBAL.jsonl` (flock-locked) for cross-run learning. **PII scrubbing:** Never write raw user-supplied story titles or IDs. Instead store only a **non-reversible, non-correlatable** token: story IDs are replaced with `US-###` (the index) and any free-text title is replaced by a SHA-256 hash of the title. The salt is **ephemeral per line** (derived from a per-line nonce, not a single run-wide salt) so an aggregate cannot correlate two records to the same story, and the hash is never reversible since the original title is not retained anywhere. `skill`/`duration_ms`/`success`/`retry_count` are preserved. If a story title must be reported for debugging, write it to a gitignored, run-local `TELEMETRY_LOCAL.jsonl` that never leaves the project.

**B. Automatic Skill Swapping (every 10 stories, with rollback)**
Supervisor reads `<project-root>/TELEMETRY.jsonl` + `<project-root>/LEARNINGS.md`:
- **Failure rate >20%** → replace skill with alternative from `find-skills`
- **Avg duration >2x median** → swap for faster alternative
- **New skill discovered** (via `vibe-evolve`) → trial on next non-critical story
- **Rollback:** If swapped skill fails its first story → revert to original, **restore `AGENTS.md`**, record in `DECISIONS.md`
- **Constitution principle update:** Swapped skill → update `constitution_principle` in affected `prd.json` stories to match new skill's domain
- **All swaps recorded** in `DECISIONS.md` with before/after metrics

**C. Dynamic Phase Adjustment (Phase 1 — semantic classification)**
Analyze brief via `prompt-architect` classification (not keyword matching):
| Category | Added Stories |
|----------|---------------|
| SaaS (billing, subscriptions, multi-tenant) | Stripe billing (US-087/088/089), multi-tenancy (US-010), invoicing |
| AI/Chat/Agent | `agent-elements` chat UI, streaming, RAG pipeline |
| Dashboard/Analytics | `ui-ux-pro-max` charts (25 types), real-time, export |
| Marketplace/Multi-vendor | Payouts, vendor dashboard, commission engine |
| Internal Tool/Admin | RBAC, audit log, bulk ops, skip landing/pricing |
| Mobile-first/PWA | PWA manifest, offline-first, push notifications |
| E-commerce | Cart, checkout, inventory, orders, returns |
| Content/Marketing | CMS blocks, SEO, preview, scheduling |
Uses `prompt-architect` intent classification + `ui-ux-pro-max` category confidence scores.

**D. Prompt Template Evolution (after each run, with human review gate)**
`prompt-architect` templates in `<project-root>/.prompt-templates/` updated:
- Successful brief structures → promoted to `~/.agents/skills/PROMPT_TEMPLATES/` after **3-run verification**
- Failed assumptions → anti-patterns added
- Domain-specific prompts → specialized per category
- **Gate:** Template changes require ≥3 successful runs before global promotion

**E. Gap-Driven Skill Discovery (Phase 0 + on-demand, no race)**
If story fails with "no skill for X" **and** ralph loop is idle (between stories):
1. `find-skills` searches skills.sh for "X"
2. Top result installed (verified: reputable maintainer + ≥1k installs + ≥100 stars)
3. Skill added to `AGENTS.md` for **next** story (not current)
4. If successful → added to known-source map for future runs

**F. Per-Project Pattern Library (sandboxed, no cross-project leakage)**
`<project-root>/.patterns/` (git-tracked, **project-only**):
- Reusable component patterns (auth flow, subscription UI, dashboard layout)
- Verified configurations (Prisma schema patterns, Auth.js provider setups)
- Design token presets per category
- Auto-populated from successful Phase 4 IMPROVISE outcomes
- **Versioning:** Each pattern `package.json` with semver; `patterns.json` index; `patterns upgrade` CLI
- **Deprecation:** Unused >12 months → `patterns deprecate` marks; `patterns prune` removes
- **No global sharing** — patterns stay in project; optional `patterns export` for manual sharing

**G. Automated Skill Updates (cadence-gated, Phase 0, canary)**
`vibe-evolve` checks for updates to all installed skills:
- Pinned refs → checks upstream tags
- **Canary:** Update 1 non-critical skill → run smoke test → if PASS, update rest
- **Non-critical definition:** Skills not in `depends_on` of any `passes: false` story; UI-only skills (`magic-ui`, `banner-design`, `slides`) always non-critical
- If update passes verification → updates `LEDGER.md` + reinstalls
- Breaking changes → recorded in `DECISIONS.md`, migration path noted

**H. Prompt Template Promotion Test Runner**
`prompt-architect` templates in `<project-root>/.prompt-templates/` promoted to global after **3-run verification**:
- Test runner: `scripts/test-prompt-template.js` — feeds template to `prompt-architect` with 3 diverse ideas; validates BRIEF.md structure, completeness, no hallucinated fields
- Metrics: completeness score ≥0.9, zero missing required fields, zero invalid enums
- On pass → `cp .prompt-templates/* ~/.agents/skills/PROMPT_TEMPLATES/`
- On fail → record in `DECISIONS.md`, iterate locally

**I. Self-Modifying SKILL.md with Dry-Run**
Post-run script reads `DECISIONS.md` + `<project-root>/TELEMETRY.jsonl` + Phase 4 evidence:
1. Generates diff for `SKILL.md` (known-source map, phase rules, constraints, bans)
2. **Dry-run:** Applies to temp copy → runs skill validation
   (`node <skill-dir>/scripts/skill-validate.js <temp-copy> --require-additive-only`)
   → if PASS, applies to real SKILL.md
3. Guards: additive only; source verified (≥3 runs or success marker); human review flag if ambiguous
4. Version bump: `skill_version` in SKILL.md frontmatter incremented (semver patch)

**H6 safety (integrity, not optional):** because this mechanism edits the file that governs every future run, it is bound by these non-negotiable safeguards:
- **Git-commit before applying.** The post-run edit commits the current SKILL.md to the skill repo (or writes a timestamped `SKILL.md.bak`) so any bad diff is one command from rollback. The application script refuses to run if the skill dir is not under git OR no `.bak` can be written.
- **Additive-only, enforced by code.** The diff may only ADD lines (append new map rows, rules, bans); it may never delete or renumber existing directives. The runner asserts the diff has zero `-` lines before applying; a non-additive diff is discarded with a `DECISIONS.md` note.
- **Independent validation.** `node <skill-dir>/scripts/skill-validate.js <merged-temp-copy> --require-additive-only` must pass on the merged temp copy; if the validator script is missing or fails, the application is SKIPPED (no silent self-edit without a validator). (The shipped `scripts/skill-validate.js` is the local, dependency-free validator — it replaces the no-longer-available `npx skills validate` command.)
- **Ambiguity → bail (never guess).** If any edit is ambiguous (source unverified, conflicting evidence), the runner sets `flag_for_review` in `DECISIONS.md` and does NOT apply — it never self-approves an uncertain change.
- **No untrusted input.** The runner sources only `DECISIONS.md`, `TELEMETRY.jsonl`, and Phase 4 evidence that the supervisor itself wrote. It never ingests content from installed third-party skills or network sources.

**J. Cross-Run Pattern Similarity (Vector DB)**
`~/.agents/skills/PATTERN_VECTORS/` — `chromadb` local instance:
- Embeddings: pattern code + description → `sentence-transformers/all-MiniLM-L6-v2`
- On new pattern: similarity search → if >0.85 cosine → suggest reuse existing
- On skill swap: vector search finds patterns from successful runs with similar tech stack
- Privacy: embeddings only; no code/content stored; local-only, no network

**K. OpenCodeReview AI Code Review Integration (Phase 2 + Phase 3 gates)**
 - Install: `pnpm add -g @alibaba-group/open-code-review` (v1.11.6+) — matches the pnpm-canonical rule (H1); use `npx @alibaba-group/open-code-review` for one-off runs without a global install. `ocr review` is a project-independent external CLI, so this is the sanctioned global/pnpm-dlx path, not a project script.
- CI Integration: GitHub Actions workflow runs `ocr review --format json --output ocr-results.json` on every PR
- Agent Integration: Delegation mode (`ocr delegate`) lets the AI coding agent perform review using its own LLM (no OCR API key needed)
- Review Rules: Multi-language (NPE, thread-safety, XSS, SQL injection), path filtering via `.opencodereview/rules/`
- Session Viewer: Browse/replay review sessions in browser, mark comments fixed/ignored
- MCP Server: Extend review agent with external tools via MCP
- Telemetry: OpenTelemetry integration for observability
- Hybrid Architecture: Deterministic pipelines + LLM Agent for precise line-level comments
- Benchmark: ~1/9 tokens vs general-purpose agents, higher precision/F1
 - Phase 3 Gate: `ocr review` must pass (zero CRITICAL/HIGH findings) before Phase 4. **Degradation (keeps the pipeline complete):** if `@alibaba-group/open-code-review` cannot be installed at Phase 0 (v1.11.6+ unavailable / registry blocked / CLI fails to run), OR `ocr review` errors in CI, the gate does NOT hard-block the run — it delegates the "zero CRITICAL/HIGH" review to the already-installed analyzer of record (Semgrep US-075 / Strix Phase 3) and records `"OpenCodeReview unavailable — reason: [install failed / CLI error]; gate covered by <tool>"` in `DECISIONS.md` + the final report. The review depth is reduced (deterministic SAST instead of LLM-assisted), never skipped — the capability report states which reviewer actually ran. Re-try `ocr review` in Phase 4 only if it becomes available; otherwise the report flags it as a deferred tool for the user to run after install.
- Delegation Mode for opencode: `ocr delegate preview` + `ocr delegate rule <files>`

---

### Phase 0.5 — spec-kit initialization (runs when spec-kit available)

**Detection:** Check for existing spec-kit project — `specify --version` succeeds
AND `.specify/` directory exists in project root.

- **If initialized:** Skip to Phase 1; load existing `docs/CONSTITUTION.md`,
  `docs/SPEC.md`, `docs/PLAN.md` if present.
- **If not initialized:** Run `specify init <project-name> --integration
  <detected-backend>` where `<detected-backend>` is `opencode` / `claude` /
  `codex` (same detection as Phase 0 prerequisite 2). This creates
`.specify/` and installs agent-specific commands/skills.
   **Verify the install actually worked:** after init, check the detected
   backend's command root contains `speckit.constitution.md` (e.g.
   `~/.config/opencode/command/speckit.constitution.md` for opencode).
   If the command file is missing, re-run `specify init` (or
   `specify integration install <backend>`) before Phase 0.5 — a missing
   command file means every `/speckit.*` invocation silently produces
   nothing, which is the most common cause of "no docs appeared".
   - **If spec-kit unavailable** (prerequisite 11 failed): Skip Phase 0.5 entirely;
   Phase 1 uses `planning-and-task-breakdown` instead of spec-kit tasks;
   Phase 2 runs without convergence gate; Phase 3 skips the convergence check.
   Record degradation in `DECISIONS.md`.

**Output:** Initialized spec-kit project ready for Constitution/Specify/Plan/Tasks.

### Phase 1 — brief + docs + UI direction + spec-kit constitution

1. **Brief:** run `prompt-architect` on the raw idea → `BRIEF.md`
   (audience, context, objective, measurable success). Hands-free: answer
   the framework dimensions yourself.
2. **UI direction (Phase U — the upgrade over the plain builder):**
   before `vibe-docs` writes `DESIGN.md`, generate a concrete visual world.
   Resolve skill base directories dynamically (the runtime's reported base
   directory, or search the discovery roots for the skill folder under the
   current user's home) — never a machine-specific absolute path:
   - **Preferred:** locate `ui-ux-pro-max`'s `scripts/search.py` in whichever
      root holds the skill, then
      `python3 <ui-ux-pro-max>/scripts/search.py "<product> <industry> <audience keywords>" --design-system -p "<Product Name>"`
      → style, palette (192 product palettes), typography pairing (74 font
      pairs), effects, and anti-patterns.
   - **Fallback (python3 missing):** author the same design system directly —
      use `ui-ux-pro-max`'s in-SKILL Quick Reference sections (styles,
      palettes, font pairings, UX guidelines) plus `design-taste-frontend`
      and `frontend-design` judgment to pick style, palette, and type pairing
      for the product category; apply the exact same anti-pattern rules. Same
      output contract, no loss of capability — only the search-driven source
      differs. Note "search.py not run (python3 missing)" in `DECISIONS.md`.
   - Check for a `design-md` brand-system reference by discovery
      (`~/.agents/design-md/awesome-design-md` when present, or any
      `design-md`-named folder found in the skill roots / agent reference
      dirs — search ALL of them, adopt the best fit, skip cleanly if none):
      a ready brand system matching the product category becomes the visual
      identity seed.
   - Cross-check direction with `design-taste-frontend` (anti-templated,
        no "default shadcn look") and `frontend-design`.
     - Lock brand voice: tone, naming, and product voice derived from the
        brief via the `brand` skill and `writing-guidelines` — copy that
        reads opinionated and on-tone, never generic — and record it beside
        the tokens.
     - **Mandate OKLCH color space** in all token definitions (Tailwind v4 `@theme` supports native OKLCH); update `design-system` skill to output OKLCH values.
     - **Add modern CSS features** to DESIGN.md tokens: `@starting-style` for entry animations, anchor positioning for tooltips/popovers, container queries for component-level responsiveness, scroll-driven animations via `animation-timeline`.
     - Commit the result as a `docs/DESIGN.md` skeleton (tokens: colors → semantic roles in OKLCH, typography scale, spacing, radius, shadows, motion easing/durations, light/dark, container queries, scroll animations) and record the choice in `DECISIONS.md`.


#### Phase U Capability Ladder (what gets loaded, in order)

A fresh host may have none of the premium-UI skills installed. Resolve them in this order — each tier is a *capability*, and the skill degrades by tier, never silently skips a tier and claims it ran. Record what actually loaded in `DECISIONS.md`.

| Tier | Capability | Skills (in resolution order) | Fallback if absent |
|---|---|---|---|
| **1 — direction** | A visual world that is not the default shadcn look | `frontend-design` (anthropics/skills, 847K+ installs — the single highest-signal anti-slop purchase) → `design-taste-frontend` → `impeccable` | Author the direction from the in-SKILL Quick Reference (styles/palettes/font-pairs) — same output contract, search-driven source only |
| **2 — system** | A real design system with tokens, not vibes | `ui-ux-pro-max` `--design-system` search (preferred, needs `python3`) → `design-md` brand seed → `design-system` | Hand-author `docs/DESIGN.md` from the fallback above; note "search.py not run" in `DECISIONS.md` |
| **3 — type** | Typography that has a personality | `typeset` (pbakaus/impeccable, 64.9K installs — systematically refines typography to eliminate generic defaults) → `frontend-design` typography rules | Apply the spine's type-scale rules with a self-hosted pairing |
| **4 — motion** | Intentional animation, not decoration | `review-animations` (emilkowalski/skills, 97.6K installs — *adversarial* audit of motion code) → `emil-design-eng` craft philosophy → `ui-animation` (mblode, 7.2K) → `framer-motion-animator` (8K) → `motion-design-skill` (lottiefiles, 11K) → `iart-ai/web-animation-skills` (GSAP/SVG/Lottie/glassmorphism in one MIT pack) | CSS-only transitions + `@starting-style`; the spine's motion budget still applies |
| **5 — assets** | Real imagery, icons, and 3D | `ai-image-generation` (102K installs — 50+ models via inference.sh, FLUX/Seedream/Gemini) → `lottie` (diffusionstudio, text-to-lottie — the agent *generates* the animation, never a runtime fetch) → `@rive-app/react-webgl2` (interactive state-machine components) → `react-three-fiber` + `@react-three/drei` (the prize-worthiness gate's signature-element requirement) → `@tabler-icons`/`lucide`/`phosphor-icons` (weight-controlled icon sets) | Self-hosted `next/font`, unlicensed stock from the project's own asset dir, hand-authored SVG — never a placeholder service URL |
| **6 — composition** | Components that are not default shadcn | `shadcn` (correct CLI + registry usage, 251.8K installs) → `building-components` (vercel/components.build, composable APIs + theming) → `magic-ui` (animated registry: marquee/globe/blur-fade/shiny-button) → `frontend-ui-engineering` + `web-design-guidelines` (production patterns, a11y, states, responsive) → `redesign-existing-projects` (leonxlnx/taste-skill, 221.6K — audits and upgrades generic UI to premium without breaking function) | Hand-compose from `docs/DESIGN.md` tokens; the spine's anti-slop bans still apply |
| **7 — critique** | An adversarial, mode-guided polish pass | `impeccable` (critique + audit, desktop AND mobile in one batch) → `bolder`/`colorize`/`animate`/`delight`/`polish`/`distill`/`clarify`/`adapt`/`onboard`/`harden` (pbakaus/impeccable — each is a *command* the skill exposes, invoked per surface mode) → `ask-sonner` (correct toast usage) | Mechanical checks only: axe-core/`pa11y` contrast, CWV via headless Lighthouse, keyboard operability, semantic landmarks, `design-gate.js` static review |

**Rule:** a tier that fails to install degrades to the fallback column *for that tier only* — the pipeline continues, and the final report states exactly which tier fell back and why. A tier that silently does not run is a defect, not a feature.

#### DESIGN.md Generation Contract (anti-slop + prize-worthy design, from the source)

**DESIGN.md is not a token list. It is a complete, prescriptive component-by-component design spec.** Every page, every component, every state is specified with exact values before any code is written. An AI implementing from this spec should have **zero decisions to make** about layout, spacing, colors, typography, or component structure — it just follows the spec. It also **mandates that the result be distinctive and memorable** (Section 7), not merely clean — because a layout that avoids every slop trap but is bland is still a failure.

**DESIGN.md MUST contain ALL 11 sections below. Missing any section = block Phase 2. (Sections 1-7 are the anti-slop core; 8-11 are the vibe-coding and research catalogues that make the output distinctive rather than merely correct.)**

##### Section 1: Design Tokens (OKLCH, exact values)

```yaml
color:
  primary: oklch(0.623 0.214 259.8)      # exact — no "blue-500" or "indigo-600"
  primary-hover: oklch(0.550 0.200 259.8)
  success: oklch(0.648 0.150 160)
  danger: oklch(0.637 0.237 25.3)
  warning: oklch(0.768 0.189 70.1)
  muted: oklch(0.556 0.005 286)
  surface: oklch(0.985 0.002 270)
  surface-alt: oklch(0.960 0.003 270)
  text: oklch(0.145 0.005 286)
  text-secondary: oklch(0.450 0.005 286)
  border: oklch(0.900 0.003 270)
  # dark mode variants — exact same lightness targets as light
  dark-surface: oklch(0.175 0.005 286)
  dark-surface-alt: oklch(0.225 0.005 286)
  dark-text: oklch(0.935 0.005 286)
  dark-border: oklch(0.285 0.005 286)

  # DARK MODE IS MANDATORY, NOT OPTIONAL — every screen ships both themes.
  # Every semantic color (primary, success, danger, warning, muted, text,
  # text-secondary, surface, surface-alt, border) MUST have a dark-mode
  # pairing derived to the SAME lightness target as the light theme (keeps
  # contrast consistent when toggling). No screen may ship light-only with a
  # `<html dark>` stub. Both themes verified at WCAG AA on every surface
  # (dark-mode contrast differs — a light-A A-paired color can fail dark-A).
  # Toggle is class-based on `<html>` with a `data-theme` attribute (no
  # flash-of-unstyled-content), persisted to localStorage, honoring
  # `prefers-color-scheme`. Components consume semantic tokens ONLY — no
  # literal dark hex values invented per-component.

typography:
  h1: { size: 2.25rem, weight: 700, line-height: 1.15, letter-spacing: -0.025em }
  h2: { size: 1.75rem, weight: 700, line-height: 1.2, letter-spacing: -0.02em }
  h3: { size: 1.375rem, weight: 600, line-height: 1.3, letter-spacing: -0.015em }
  body-lg: { size: 1.125rem, weight: 400, line-height: 1.6 }
  body: { size: 1rem, weight: 400, line-height: 1.6 }
  body-sm: { size: 0.875rem, weight: 400, line-height: 1.5 }
  caption: { size: 0.75rem, weight: 500, line-height: 1.4 }
  # EXACT font families — not "sans-serif" but specific font names
  font-sans: "Inter", "system-ui", sans-serif
  font-mono: "JetBrains Mono", "Fira Code", monospace

  # FONT EMBEDDING (self-hosted, licensed — no remote CDN at runtime):
  #   - Serve fonts as SELF-HOSTED subsets via `next/font` (uses `font-display:
  #     swap`, subsets the needed unicode ranges, no external request). Never
  #     link Google Fonts / a CDN `<link>` at runtime.
  #   - License compliance: Inter (SIL OFL) and JetBrains Mono (OFL) permit
  #     self-hosting; record the font + license (OFL for both) in the project
  #     `OPTIONAL_FONTS`/asset manifest and `docs/DESIGN.md`. If a different
  #     commercial font is chosen, it must carry a valid license and the
  #     license file ships with the repo (no unlicensed webfont embedding).
  #   - Fallback stack is always present (`system-ui` for sans, `monospace`
  #     for code) so text is fully readable before the webfont settles.
  #   - Only load the weights/subsets actually used (per design spec), and
  #     only load non-Latin subsets when an RTL/CJK locale is active — no
  #     shipping all subsets for a single-language app.

spacing:
  # EXACT scale — every value used in components maps to this scale
  unit: 4px
  0: 0
  1: 0.25rem    # 4px
  2: 0.5rem     # 8px
  3: 0.75rem    # 12px
  4: 1rem       # 16px
  5: 1.25rem    # 20px
  6: 1.5rem     # 24px
  8: 2rem       # 32px
  10: 2.5rem    # 40px
  12: 3rem      # 48px
  16: 4rem      # 64px
  20: 5rem      # 80px
  # NO py-20/py-24/py-28/py-32/py-36/py-40. Max vertical section padding = spacing-16.
  # Every spacing in the UI = one of these values. No ad-hoc.

radii:
  sm: 0.375rem   # 6px — small elements (badges, chips)
  md: 0.5rem     # 8px — buttons, inputs, cards
  lg: 0.75rem    # 12px — modals, panels
  xl: 1rem       # 16px — hero sections, large cards
  2xl: 1.5rem    # 24px — full-page cards, feature showcases
  full: 9999px   — avatars, pills, toggles

shadows:
  sm: "0 1px 2px 0 oklch(0 0 0 / 0.05)"
  md: "0 4px 6px -1px oklch(0 0 0 / 0.07), 0 2px 4px -2px oklch(0 0 0 / 0.05)"
  lg: "0 10px 15px -3px oklch(0 0 0 / 0.08), 0 4px 6px -4px oklch(0 0 0 / 0.05)"
  # NO shadow on every element. Only: cards on hover, modals, popovers, dropdowns.

motion:
  duration-fast: 150ms
  duration-normal: 250ms
  duration-slow: 400ms
  easing-default: cubic-bezier(0.4, 0, 0.2, 1)
  easing-in: cubic-bezier(0.4, 0, 1, 1)
  easing-out: cubic-bezier(0, 0, 0.2, 1)
  easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
  # reduced-motion: ALL animations reduced to 0ms or simple opacity fade
```

##### Section 2: Layout Grid (exact, not "use grid")

```
MAX-WIDTH: 1280px (design/max-w-7xl)
GUTTER: 24px (spacing-6) between columns
MARGIN: 24px (spacing-6) left/right on mobile, 48px (spacing-12) on desktop

DESKTOP (>1280px): 12-column grid, max-width 1280px centered
  Content columns: 8/12 ratio (content 8 cols, sidebar 4 cols)
  Full-width sections: span all 12 cols

TABLET (768px-1280px): 8-column grid, 24px gutter
  Content columns: 6/2 ratio

MOBILE (<768px): single column, 16px (spacing-4) margin
  NO horizontal scroll. EVER. overflow-x: hidden on body.

SECTION SPACING: vertical gap between major sections = spacing-16 (64px).
  NO py-20, py-24, py-28, py-32, py-36, py-40. Max = spacing-16.

RTL (right-to-left): REQUIRED when the product targets an RTL locale
  (Arabic/Hebrew/Persian — always on for any AR/HE/FA i18n locale per US-020).
  Do NOT write LTR-specific layout:
  - No hardcoded physical-direction utilities as the single layout source:
    `left:`/`right:`, `ml-*`/`mr-*`, `pl-*`/`pr-*` for layout, `rounded-l`/`rounded-r`,
    `border-l`/`border-r`, `text-left`/`text-right` used for alignment intent.
  - Use logical properties throughout: `inset-inline-*`, `ms-*`/`me-*`,
    `ps-*`/`pe-*`, `start-*`/`end-*`, `text-start`/`text-end`, `rounded-s-*`/`rounded-e-*`,
    and `dir="rtl"` on `<html>` (with `lang`) mirroring via CSS logical props +
    Tailwind v4 logical utilities.
  - The grid is direction-agnostic by construction (flex/grid `row` flips
    automatically with `dir`); start/end utilities mirror the reading
    direction. Every component in Section 3 must specify its start/end
    alignment, not left/right.
  - Page Layout Specs (Section 4) list any direction-specific element
    explicitly (e.g. a timeline, a slider, a progress direction) so RTL
    mirroring is a decision, not a surprise. `prefers-reduced-motion` and
    directional animations must also mirror.
  - Verify both directions render correctly in Phase 3 (run the RTL locale
    end-to-end); a surface that collapses or scrolls horizontally under RTL
    fails its story.
```

##### Section 3: Component Specifications (exact — every component listed)

Every component in the app gets an EXACT spec. No ambiguity.

```
BUTTON (Primary):
  height: 40px (spacing-10)
  padding-x: 20px (spacing-5)
  padding-y: 0
  font: body-sm, weight 600
  radius: radii-md (8px)
  bg: color.primary, text: oklch(1 0 0) (white)
  hover: bg color.primary-hover, transition duration-normal
  focus: ring 2px oklch(0.623 0.214 259.8 / 0.3), outline none
  active: scale(0.98), transition duration-fast
  disabled: opacity 0.5, cursor not-allowed
  gap between icon+text: spacing-2 (8px)

BUTTON (Secondary):
  same as Primary but: bg transparent, border 1px color.border, text color.text
  hover: bg color.surface-alt

BUTTON (Ghost):
  same as Secondary but: no border
  hover: bg color.surface-alt

BUTTON (Danger):
  same as Primary but: bg color.danger
  hover: oklch(0.550 0.220 25.3)

ICON BUTTON:
  size: 40px x 40px
  radius: radii-md
  icon size: 20px (spacing-5)
  everything else same as Ghost button

INPUT:
  height: 40px (spacing-10)
  padding-x: 16px (spacing-4)
  font: body, weight 400
  radius: radii-md
  border: 1px color.border
  bg: color.surface
  focus: border-color color.primary, ring 2px oklch(0.623 0.214 259.8 / 0.1)
  placeholder: color.text-secondary, opacity 0.6
  error state: border-color color.danger, ring 2px oklch(0.637 0.237 25.3 / 0.1)

TEXTAREA:
  min-height: 100px
  everything else same as Input

SELECT/Dropdown:
  same as Input but: chevron icon right, padding-right spacing-10

CARD:
  padding: spacing-6 (24px)
  radius: radii-lg (12px)
  bg: color.surface
  border: 1px color.border
  shadow: none (default), shadow-md (hover), shadow-lg (featured)
  NO shadow on every card. Only on hover or "featured" variant.
  gap between card sections: spacing-4

AVATAR:
  sizes: sm=32px, md=40px, lg=56px, xl=80px
  radius: radii-full
  placeholder bg: color.primary with first letter in white

BADGE/CHIP:
  height: 24px (spacing-6)
  padding-x: 10px (spacing-2.5)
  font: caption
  radius: radii-full
  bg: color.primary/10, text: color.primary

TOAST (sonner):
  height: auto, min-height 48px
  padding: spacing-4
  radius: radii-lg
  shadow: shadow-lg
  position: bottom-right, offset 24px from edges
  duration: 4000ms auto-dismiss (error: manual dismiss only)
  max-width: 420px

MODAL/DIALOG:
  width: max 480px (single action), 560px (form), 640px (complex)
  padding: spacing-6
  radius: radii-xl
  shadow: shadow-lg
  overlay: oklch(0 0 0 / 0.5), backdrop-blur 4px
  focus trap: YES, escape closes, click overlay closes
  mobile: full-screen with 16px padding, slide up from bottom

TABLE:
  header: bg color.surface-alt, font body-sm weight 600, text text-secondary
  rows: bg color.surface, border-bottom 1px color.border
  hover row: bg color.surface-alt
  cell padding: spacing-4 horizontal, spacing-3 vertical
  responsive: horizontal scroll wrapper on mobile, sticky first column

NAVIGATION (Sidebar):
  width: 256px (desktop), 0px (mobile, hidden behind hamburger)
  bg: color.surface
  border-right: 1px color.border
  item height: 40px
  item padding-x: spacing-4
  item font: body-sm
  active item: bg color.primary/10, text color.primary, font-weight 600
  section gap: spacing-6

NAVIGATION (Top bar):
  height: 64px
  padding-x: spacing-6
  bg: color.surface
  border-bottom: 1px color.border
  logo left, nav center, actions right
  mobile: hamburger icon, full-screen overlay menu

HAMBURGER MENU:
  icon size: 24px
  opens: full-screen overlay with nav items stacked vertically
  item height: 56px (touch target >= 44px)
  close: X icon top-right, 48px touch target
```

##### Section 4: Page Layout Specs (every screen in the app)

```
For EVERY screen/page in the app, specify:
  - Exact layout (sidebar+content, centered, full-width, 2-col, 3-col)
  - Exact section order (what comes first, second, third)
  - Exact component placement (which components, where)
  - Exact spacing between sections (spacing-16 between major sections)
  - Exact responsive behavior (what collapses at 768px, what hides at 390px)
  - Skeleton layout (exact number of placeholder lines, heights)
  - Empty state (exact copy, exact illustration size, exact CTA button)
  - Error state (exact copy, exact retry button placement)

Example:
  DASHBOARD:
    Layout: Sidebar (256px) + Content (fluid, max 1280px)
    Sections order:
      1. Top bar (64px, full width, sticky)
      2. Page header (spacing-8 below, h1 + subtitle)
      3. Stats row (3 columns, gap spacing-4, each card 200px min)
      4. Main content (grid 2:1, gap spacing-6)
      5. Bottom section (full width, spacing-16 from above)
    Responsive:
      >1280px: sidebar + 12-col grid
      768-1280px: sidebar collapses to icons (64px), 8-col grid
      <768px: no sidebar, hamburger, single column, all stacked
    Skeleton:
      Stats row: 3 rectangles 200px x 80px, rounded-lg, animate-pulse (ONLY allowed here)
      Main content: 6 rectangles varying height, rounded-lg
    Empty state: "No data yet" + illustration (120x120px) + "Get started" button
    Error state: "Something went wrong" + retry button (spacing-4 below error text)
```

##### Section 5: Interaction Patterns (exact — no "do what feels right")

```
NAVIGATION:
  - Sidebar items: click navigates, active state = bg primary/10 + text primary
  - Top bar links: hover underline (2px, color.primary, transition duration-fast)
  - Mobile: hamburger opens full-screen overlay, NOT a slide-in drawer
  - Breadcrumbs: show on all pages deeper than 1 level, separator " / ", max 4 levels
  - Back button: always present on sub-pages, left arrow icon, 40px touch target

FORMS:
  - Labels: above input, font body-sm weight 500, color text, margin-bottom spacing-1
  - Required indicator: asterisk *, color danger, no "(required)" text
  - Error messages: below input, font caption, color danger, margin-top spacing-1
  - Submit button: right-aligned in form, Primary button, loading state = spinner + "Saving..."
  - Enter submits form. Tab moves to next field. Escape closes modal.
  - Auto-save: NOT default. Explicit save button unless brief specifies otherwise.

TOASTS:
  - Success: green toast, auto-dismiss 4s, position bottom-right
  - Error: red toast, manual dismiss, includes retry action if applicable
  - Info: neutral toast, auto-dismiss 6s
  - Max 3 visible at once, oldest dismissed first
  - NOT used for navigation feedback, form validation, or loading states

HOVER STATES:
  - Cards: shadow-md on hover, transition duration-normal
  - Buttons: bg shift (primary-hover), transition duration-fast
  - Links: color shift to primary, transition duration-fast
  - Table rows: bg surface-alt on hover
  - NO hover effects on mobile (touch devices)
```

##### Section 6: Anti-Slop Constraints (hardcoded — not suggestions)

```
THESE ARE LAWS. Violation = story fail.

1. NO space-y-* for page layout. Use flex-col gap-* or grid.
2. NO p-4/p-6/p-8/p-10/p-12/p-16/p-20 on page sections. Use spacing scale.
3. NO text-xs/text-sm/text-base/text-lg/text-xl/text-2xl/text-3xl/text-4xl as ad-hoc.
   Use typography scale: h1, h2, h3, body-lg, body, body-sm, caption.
4. NO bg-blue-500/bg-indigo-500/etc. Use color.primary, color.success, etc.
5. NO shadow on every card. Only hover or "featured" variant.
6. NO transition-all. Use specific: transition-colors, transition-shadow, transition-transform.
7. NO animate-pulse/animate-bounce/animate-spin on static elements.
8. NO outline-none or focus:outline-none. Use focus:ring-* only.
9. NO backdrop-blur on modals without explicit overlay spec.
10. NO arbitrary py-20/py-24/py-28/py-32. Max vertical padding = spacing-16.
11. NO gradient backgrounds unless spec says "gradient" for that exact element.
12. NO glassmorphism (bg-white/80 backdrop-blur) unless spec says so.
13. NO component without all 4 states specified: default, hover, focus, disabled/active.
14. NO page without skeleton, empty, error, and success states specified.
15. NO responsive breakpoint without exact "what changes" spec.
16. NO font-size, font-weight, line-height, or letter-spacing outside the typography scale.
17. NO raw hex, rgb(), hsl() in components. Only OKLCH from token system.
18. NO @ts-ignore, eslint-disable, or type suppression. Ever.
19. NO lorem ipsum, placeholder text, "your app name", "insert secret here".
20. NO spinner as sole loading indicator for data fetches. Skeleton required.
```

##### Section 7: Design Ambition & Distinctiveness Mandate (anti-bland, prize-worthy)

**Anti-slop prevents bad design. This section *requires* memorable, distinctive, category-defining design.** A layout that merely avoids every slop pattern but is risk-averse and generic is STILL A FAIL. Every surface must be *intentionally* designed to be at least as distinctive as an Awwwards / 21st.dev / landing.love / motionsites.ai feature.

**The bar: "Would someone who has seen 100 AI-SaaS dashboards or 100 generic startup landing pages call this one memorable and worth bookmarking?" If NO → redesign. This is a pass/fail gate, not a taste suggestion.**

The DESIGN.md author MUST pick at least ONE bold system-level choice (not a gimmick) that makes the product's visual identity unmistakable, then spec it precisely:

1. **Signature interaction** — a signature micro-interaction that runs on every visit and defines the feel. Options (pick one):
   - Custom cursor that reacts to hover targets / magnetic buttons
   - Scroll-scrubbed animation that drives the hero narrative (GSAP ScrollTrigger or CSS `animation-timeline`)
   - Morphing / shape-shifting hero element tied to scroll
   - View-transition page reveals (overlap/tilt/custom clip-path, not just fade)
   - Parallax depth layers with `prefers-reduced-motion` guard
   - Type that animates in per-word / per-char with spring easing
   - Ambient background that reacts to pointer (WebGL shader or CSS-conic drift), performance-budgeted
2. **Signature visual texture** — a recurring visual device used consistently (not per-page):
   - A unique outline/illustration language (custom SVG strokes, isometric, hand-drawn)
   - A distinctive grain/gradient/glow treatment reserved for emphasis only
   - A signature shape language (squircle, angled corners, organic blobs) applied to cards/CTAs/avatars
   - A photo-treatment identity (duotone, film-grain, high-contrast B&W with one accent color)
3. **3D / WebGL / motion intensity** (gated by product type — REQUIRED for landing/marketing/content products, OPTIONAL-but-encouraged for dashboards):
   - **Required** for landing/product/marketing/content sites: at least one real 3D or heavy-motion moment (React Three Fiber 9 + Three.js r160+, Rive 2.0, Lottie, or a hand-built WebGL/Canvas scene) — NOT a stock mockup. Examples: 3D product configurator, interactive 3D hero, scroll-driven 3D reveal, physics-based hover, particle field.
   - For dashboards/apps: motion is subtle and purposeful (layout transitions, list reorder, skeleton shimmer, AnimatePresence enters) — 3D only if it adds comprehension (data viz, configurator), never decoration.
   - **Motion addicts** the visitor: GSAP ScrollTrigger scroll-driven sequences, `animation-timeline` scroll-linked reveals, magnetic buttons, Framer Motion springs with honest bounce — all gated by `prefers-reduced-motion`.

**Distinctiveness checklist (all MUST be answered YES after the DESIGN.md direction is locked):**
- [ ] Would a designer look at this and say "this has a clear point of view," not "this is a template"? 
- [ ] Is there a signature element (interaction, texture, or 3D) that is unmistakably this product?
- [ ] Is the palette/type pairing *unusual for the category* — not the default blue+Inter / purple-gradient SaaS look everyone uses?
- [ ] Does the hero have a devised composition (layered, asymmetric, not centered-emoji + headline + CTA)?
- [ ] Is motion earned — every animation communicates orientation, hierarchy, or narrative, and none is decorative?
- [ ] Would it stand out in a grid of 20 competitor homepages?

**Objective prize-worthiness validator (the H5 mechanical gate — replaces bare self-assessment).**
The checklist above is directional, not the gate. A surface only passes "distinctive / prize-worthy" when it ALSO satisfies these **machine-checkable**, fresh-context-verified criteria — each maps to a tool that actually runs (implemented in `scripts/design-gate.js` + the shipped tooling), so "all YES" is no longer a free pass a text-only agent can click through:
1. **Distinctiveness from category default (grep + `@theme` audit).** The locked palette differs from the default SaaS triad `blue+Inter` or `purple-gradient`: a grep of `@theme` in `docs/DESIGN.md` asserts the primary hue-angle `|| CHROMA` is NOT in the [~235–260° / ~280–310° hue] lookalike band (blue/purple), OR the type pairing does not start with `Inter`. Pass = at least one of "unusual hue" OR "non-Inter type pairing" is true. (`design-gate.js` already reads `@theme` for token legality — this criterion reuses that same parsed token map.)
2. **Signature element present (code + dependency scan).** At least one of: a non-shadcn, hand-authored `@keyframes`/WebGL/Canvas/Rive/Lottie/`react-three-fiber` asset in the bundle (grep for these in `src/`), a custom SVG gradient/`filter`/`mix-blend`/grain device, or a scroll-linked `animation-timeline`/ScrollTrigger sequence. A surface with zero of these ("flat MUI/shadcn only") fails — template-flat is the failure mode.
3. **Hero composition (DOM-structure heuristic).** The hero section is not `[centered label, centered H1, centered button]`: assert the hero contains ≥2 distinct blocks laid out on different axes (e.g. a grid where media/text are not both `justify-center` stacked), by scanning the hero's layout classes in the page spec. A single centered column = fail.
4. **AA contrast on every surface (axe-core/Lighthouse).** Contrast already enforced in Phase 3, but re-asserted here: any contrast <4.5:1 (or <3:1 large text) on the 3 highest-value surfaces fails this gate.
5. **Animation budget respected (count of animated-on-load + durations ≤ the Section 6 motion budget).** Fail if a surface exceeds the budget.
6. **Fresh-context adversarial review.** A **fresh subagent with no memory of the build** reviews the shipped surfaces against the Section 7 ambition + the UI-spine anti-patterns and issues a `distinctive-or-not` verdict with named evidence. It cannot defer to the build agent's own self-assessment. `impeccable critique` is the sanctioned mechanism; it must return no HIGH/CRITICAL from the UI-spine table and explicitly confirm the two "would-it-stand-out" signals are met with specific cited elements.

The gate **fails** if any criterion 1–6 fails. Because the checklist could previously be satisfied by a blank YES, the validator's pass is recorded in `DECISIONS.md` quoting the *evidence* (the @theme hue, the signature file, the hero layout), not "looks good". A claim like "prize-worthy" in the final report is only allowed when this validator passed on the shipped (Phase 4) surfaces — otherwise the report must say "distinctive-undetermined", not assert it.

    **The gate is implemented by `scripts/prize-gate.js`** (ships with this skill). Before this script existed the claim was prose — a text-only agent could answer YES to a checklist and ship a generic UI. Now the pass is machine-checked: run `node scripts/prize-gate.js <project>` before claiming "distinctive / prize-worthy" in `DECISIONS.md`.

**Cross-check before locking DESIGN.md direction (Phase 1 step 2):**
Run `impeccable` direction commands on the chosen direction: Persuade-mode products → `bolder`/`delight`/`colorize`/`animate`; Operate-mode → `polish`/`distill`. Use `design-taste-frontend` (anti-templated) and `emil-design-eng` (motion/craft philosophy) to sharpen the signature choice before writing tokens. If the direction reads "safe" or "template-y," pull it toward a bolder reference (any of: awwwards.com, landing.love, 21st.dev, motionsites.ai, wrapmarket.com — or the §11 catalogs) and re-spec.

##### Section 8: Vibe Coding Workflow & UI Patterns (from Figma resource-library examples)

**The 4-step vibe coding workflow — mapped to this pipeline:**

| Figma Step | This Pipeline | What happens |
|---|---|---|
| 1. Map the logic | Phase 1 (BRIEF + PRD) | Define data flow, user actions, conditional branches — the "if this, then that" before any UI is written. FigJam flowchart = `USER_FLOWS.md` + `BUSINESS_RULES.md`. |
| 2. Create a visual source of truth | Phase U (DESIGN.md) | Lock tokens, components, layout grid, page specs, interaction patterns — the concrete reference the AI implements from. DESIGN.md IS the visual source of truth. |
| 3. Verify the behavior | Phase 2 (ralph loop + UI gates) | Test every interaction, state transition, toggle, and flow. Click the buttons, trigger states, confirm the experience matches the spec. UI gates enforce DESIGN.md compliance per story. |
| 4. Bridge the code | Phase 2→3 (code generation + CI) | Generate production-ready code from the validated design. Design enforcement in CI ensures no drift from the spec. |

**UI pattern library from real-world vibe coding (apply to DESIGN.md Section 3/4/5):**

These patterns are extracted from 10 production-quality vibe-coded apps. When designing a screen that matches one of these categories, spec the pattern precisely — don't reinvent the interaction.

1. **Interactive Visual Editors** (configurators, material editors, settings panels):
   - Draggable elements layered over a canvas/background
   - Real-time parameter tweaking (sliders, color pickers, toggles) with instant visual feedback
   - Parameter groups: saturation, blur, distortion, color, shape — each a discrete control
   - Spec: what each control modifies, the range/step, the visual result at min/max/default

2. **High-Density Dashboards** (task schedulers, analytics, admin panels):
   - Left sidebar for navigation + filters, main content area for data visualization
   - Priority filters + detailed cards in sidebar, Gantt charts / heat maps / timelines in main area
   - "Smart insights" panel for automated recommendations
   - Spec: sidebar width, card anatomy (title/meta/actions), chart type + data mapping, filter interaction model

3. **Media Players / Motion-Heavy UIs** (music, video, galleries):
   - Central visual element with state-driven animation (spinning = playing, paused = still)
   - Library/browse view alongside the player
   - Transport controls: play/pause, shuffle, volume — standard icon set
   - Spec: animation keyframes, playback state machine, control layout, browse vs. focus mode

4. **Scheduling / Calendar UIs** (class schedules, appointment booking):
   - Hourly blocks with color-coded category tags
   - Toggle between daily / weekly / monthly views
   - Each block: class name, teacher/instructor, location/link, time range
   - Spec: grid dimensions (hours x days), color mapping per category, view-switching interaction, responsive collapse

5. **Games / Physics-Based UIs** (brick breaker, puzzles, simulations):
   - Keyboard/touch input mapped to object movement
   - Collision detection, scoring, level progression
   - Start screen → gameplay → game-over/restart flow
   - Spec: input mapping, physics parameters (speed, gravity, bounce), score display, difficulty ramping

6. **Product Viewers / 360 Rotation** (e-commerce, product configurators):
   - Mouse/touch drag mapped to rotation angle (180° or 360°)
   - Color/size/variant toggles that swap the displayed item
   - Zoom toggle for detail inspection
   - Spec: rotation mapping (drag distance → degrees), variant switching mechanism, zoom levels

7. **3D / Canvas Visualizations** (glyph visualizers, data viz, artistic tools):
   - SVG/shape input → 3D orbital composition
   - Controls: orbital speed, distance, depth, background image
   - Drop-in support for custom assets
   - Spec: coordinate system, animation loop, control panel layout, performance budget (frame rate target)

8. **Design System Generators** (token exporters, theme builders):
   - Input: brand colors, typography preferences, component choices
   - Output: exportable code (React, Flutter, CSS variables), Figma variable sync
   - Preview pane showing the generated system in real-time
   - Spec: input controls, output format, preview scope, sync mechanism

9. **Landing Pages / Marketing Sites** (company sites, product pages):
   - Clean hierarchy: hero → features → social proof → CTA → footer
   - Interactive touches: newsletter signup, hover effects on feature cards
   - Professional layout with clear information flow
   - Spec: section order, hero composition (asymmetric, NOT centered-emoji), CTA placement, responsive breakpoints

10. **Data Upload / Analysis Dashboards** (resume analyzers, file processors):
    - File drop zone → instant processing → results dashboard
    - Results: counts, skill breakdowns, charts, hiring reports
    - Realistic demo data for testing before real integration
    - Spec: upload interaction (drag-and-drop + click), processing state, results layout (sidebar stats + main chart), demo data schema

**Interaction patterns to spec explicitly (not "do what feels right"):**

- **Drag interactions**: spec the draggable element, the drop target, the visual feedback during drag (ghost, highlight, snap), and the commit action on drop
- **Rotation/scroll-scrubbed animation**: spec the input source (mouse X, scroll position, touch delta), the animation range, the easing curve, and the `prefers-reduced-motion` fallback
- **Real-time parameter controls**: spec each control's type (slider/toggle/color-picker), its range/step/default, and exactly what visual property it modifies
- **File upload flows**: spec the drop zone appearance, the accepted file types, the processing state (progress bar vs. spinner vs. skeleton), and the results layout
- **View switching** (daily/weekly/monthly): spec the toggle mechanism, the data transformation per view, and the transition animation between views

**Design ambition cross-check with vibe coding patterns:**

When Section 7 asks "Would someone call this memorable?", also check:
- Does the app include at least one interaction from the patterns above that is **hands-on** (drag, rotate, tweak, upload) rather than read-only?
- Is the information density appropriate — dashboards dense but organized, landing pages spacious but not empty?
- Does motion serve a purpose (state indication, spatial orientation, feedback) or is it decorative?
- Is there a clear "magic moment" — the first interaction that makes the user say "oh, this is nice"?

##### Section 9: Design Knowledge Map (Figma resource-library index + featured practices)

The Figma resource library (figma.com/resource-library — 263 articles) is the canonical reference for design decisions. When a DESIGN.md decision is in doubt, consult the right topic, not the vibe:

**Topic index — consult per decision:**
- **Color theory** (`/resource-library/color-theory/`, incl. `color-combinations` — 100 palettes, `types-of-color-palettes`, `website-color-schemes`): resolve the primary hue, palette architecture (mono/complementary/triadic/split-complementary), and 60-30-10 balance before locking tokens. Do NOT default to blue/purple SaaS lookalikes.
- **Typography** (`/resource-library/typography/`, incl. `font-pairings`, `best-fonts-for-websites`, `typography-in-design`): resolve the display/body pairing and scale before locking type tokens. The token system's h1–caption scale is the floor, not the ceiling.
- **UI/UX design principles** (`/resource-library/ui-ux-design-principles/`, incl. `user-centered-design-questions`, `visual-hierarchy`, `gestalt-principles`, `fitts-law`, `design-consistency`, `simplicity-design-principles`): validate every interaction + layout decision against these principles.
- **Web design** (`/resource-library/web-design/`, incl. `landing-page-examples`, `pricing-page-best-practices`, `website-layout-ideas`, `call-to-action-examples`, `mobile-first-design`, `website-color-schemes`): resolve hero composition, pricing page structure, CTA hierarchy, responsive breakpoints.
- **Prototype & wireframe** (`/resource-library/prototype-and-wireframe/`, incl. `prototyping`, `wireframing`, `high-fidelity-prototyping`, `rapid-prototyping`): resolve state-transition and interaction questions (Section 5 / Phase 2 UI gates).
- **Brand & storytelling** (`/resource-library/brand-and-storytelling/`, incl. `style-guide`, `presentation-ideas`, `storytelling-in-design`): resolve voice, narrative, and visual identity questions (Phase U brand voice).
- **Design systems** (`/resource-library/design-system-examples/`, `design-system-implementation/`, `design-tokens/`, `button-states/`): resolve component architecture, token taxonomy, and button state coverage (Section 3).

**Featured practices to apply (not just reference):**

1. **Design context is the source of truth.** The AI produces on-brand output only when it has concrete reference — brand colors, typography, button styles, naming. THIS is DESIGN.md's job (Section 1–5), and the reason Phase U runs before any code. Never prompt a build without the full design context; a vibe with no source of truth = generic output.
2. **User-centered design questions at every stage.** Throughout the pipeline, ask "for whom / why now / what outcome / how will we know" per screen: Phase 1 (brief), Phase 2 (per-story acceptance), Phase 4 (critique). A screen whose purpose can't be stated in one sentence gets redesigned, not polished.
3. **Visual prompt engineering.** When briefing the UI direction (Phase U) and the IMPROVISE pass (Phase 4), think in visual terms the implementing agent can act on: reference direction (light/hero/dash), palette mood, typography character, layout geometry, motion feel — the Section 7 signature choices express exactly this.
4. **Design system implementation = audit → build → adopt.** The engine's token-to-code handoff story (US-002) is the "build" step; the per-iteration UI gates + CI design gate are the "adopt" step; Phase 4 IMPROVISE is the "audit" step re-run. Keep all three, in that order, every run.
5. **AI design prompts → better output.** The briefs and gates this skill injects exist because prompt quality drives design quality: token-exact specs (Sections 1–5), named anti-slop laws (Section 6), and the prize-worthiness validator (Section 7) are the mechanical version of "be specific, show reference, forbid the default."

##### Section 10: Figma Community reference catalogs (visual source-of-truth seeds)

Figma Community hosts thousands of crowdsourced design files the Phase U
designer can consult as **references — not as code or assets to clone**:

- **UI kits** — `figma.com/community/ui-kits?resource_type=files` (4,770+ free
  kits): component vocabularies, token sets, button/input/card anatomies,
  dashboard component libraries. Use to answer "what does a well-built
  component anatomy look like for this category?" — especially libraries
  (shadcn, Material 3, Radix primitives, category kits like POS / analytics /
  healthcare) whose anatomy maps onto the project's own component specs.
- **Website templates** — `figma.com/community/website-templates?resource_type=files`
  (10,000+ free templates): full-page compositions for landing, portfolio,
  SaaS marketing, portfolio, dashboard shells. Use to answer "what does a
  strongest-in-class hero / pricing / dashboard layout for this category look
  like?"

**How to consult them hands-free (Phase U + Phase 4):**
1. **Browse with a real browser — plain fetch won't render them.** Both
   catalog grids are client-rendered JavaScript: a `webfetch`/`curl` returns
   little more than the title, so they are invisible to a text-fetch.
   Open them with `agent-browser` (or Playwright MCP / headless
   `npx playwright` script) — screenshot the grid, paginate, and *see* the
   templates. The §10 flow depends on the browser tooling the skill already
   provisions (Phase 0 prereq 9); without it this step degrades to the
   resource-library article references in §9 only, recorded in `DECISIONS.md`.
2. **Pick by category, not by popularity.** When `ui-ux-pro-max` search (or
   the fallback) returns a product style, cross-reference a community file
   whose *category* matches the current surface (§8 tag or §4 page spec) and
   whose thumbnail reads premium — not the first "4.9k likes" generic kit.
   For each of landing / SaaS-marketing / dashboard / pricing / onboarding,
   identify one strongest-in-class community reference and record its
   composition choices (hero geometry, section rhythm, card grid, chart
   placement) in DESIGN.md alongside the tokens.
3. **Extract the composition, not the pixels.** Fetch the file's page, note
   the layout grid, spacing rhythm, hierarchy, and interaction patterns —
   then regenerate the look from this project's own tokens (§1–5) and
   §7 distinctiveness. A cloned kit read = a template-flat surface, which
   fails the §7 validator and the anti-template check
   (`design-taste-frontend`). The reference sets the *standard*, the build
   must out-do it.
4. **License: respect it.** Figma Community files carry per-file licenses
   (typically CC BY or the creator's terms). Copying a file wholesale into
   the product is not allowed; using it as a visual reference and
   re-implementing with original code, tokens, fonts, and SVG is. Record the
   referenced file (name + URL + license) in `DECISIONS.md` so attribution
   is traceable.
5. **Full pipeline reading, all skills in one pass:** browse the catalog in a
   real browser (`agent-browser`/Playwright) → judge a shortlist against
   `impeccable critique` + `design-taste-frontend` (anti-templated bar) →
   check brand fit against the `design-md` seed (a reference that violates
   the brand is rejected, not adopted) → fold the winning composition into
   DESIGN.md → have the build produce it from project tokens → **verify in
   the same browser with the §8 Playwright backtest**. One tool chain, no
   pixel-matching: reference → judge → brand-check → spec → build → prove.

##### Section 11: Premium template & design-shortlist catalogs (research-backed)

Beyond Figma Community (§10), consult these researched catalogs while
**shortlisting the design direction** (Phase U step 2) and while re-referencing
during Phase 4 IMPROVISE. Families — real shipped products (anti-template
standard), template skeletons (fast build base), Figma-file marketplaces,
visual-design-tool stores (Framer/Webflow), AI-agent surface references, and
AI-artifact/design-system benchmarks:

**A. Curated real-product galleries — set the standard, they are the
"not template-flat" bar:**
- **godly.design** — hand-curated, astronomically-high-bar web/app/UI/code-art
  gallery. First stop when §7 asks "would it stand out in a grid of 20
  competitors?" One glance shows the composition bar to beat.
- **nicelydone.club** — 202K+ real product screenshots and 12,800 flows with
  text-in-screenshot search: type "pricing toggle" and get shipped examples
  in seconds. #1 for product-level pattern research.
- **mobbin.com** — 621K+ searchable screens/flows from real shipped apps and
  sites; filter by category, screen type, UI element, and flow. Use for
  pattern-research on specific surfaces (pricing, onboarding, dashboards)
  and to see how the market already solved them.
- **saasinterface.com** — SaaS app UI/UX by page, exactly the surfaces this
  skill ships: dashboard, lists & tables, checkout, pricing, billing/plan,
  settings, calendar, boards, messaging & chat.
- **saasframe.io** — 5,000+ SaaS screens across 40+ page-type categories
  (pricing, onboarding, settings, dashboards); shortlist by section, not vibe.
- **saaspo.com** — curated real SaaS marketing sites, filterable by page
  (landing 791, pricing 392, product 239, …) and industry (AI 221, dev-tools
  107, finance 91, …). Use to match the category's best marketing design.
  (Cloudflare bot-blocks plain fetch — needs the §10 browser gate.)
- **httpster.net** — 3,116 hand-picked sites tagged by aesthetic (typographic,
  brutalist, minimal, dark); distinctiveness calibration — know what
  "conventional" looks like before breaking it.
- **saasui.design** — SaaS UI/UX pattern library with an agent-friendly
  `llms.txt` + API; deep component-level pattern research.
- **landingfolio.com** — landing/login/pricing/hero galleries with
  Tailwind/Webflow/Figma workflow filters.
- **pageflows.com**, **onepagelove.com** — user-flow walkthroughs and
  one-pager anatomy when the interaction map (Section 5) needs a market
  precedent.
- **Surface-specific galleries** (one-to-one mapping to surfaces this skill
  ships): **pricingpages.design** (pricing, tagged by tier-card/usage/
  comparison patterns), **hero.gallery** (heroes, tagged by layout/CTA/tone),
  **404s.design** (error/empty states), **uxarchive.com** (onboarding/login
  flows side-by-side; bot-blocks plain fetch — use the §10 browser gate),
  **colorhunt.co** + **fontpair.co** (palette and type
  moodboards before locking tokens).

**B. Template marketplaces — finishable skeletons (code + Figma), not just
pixels:**
- **cruip.com** — Tailwind/React/Next/Astro landing + admin templates, free
  and premium, Figma files included, trusted by 60K+ developers. Free
  (`simple.cruip.com`, `open.cruip.com`) underpin the free landing reference.
- **shadcnblocks.com** — 2,018 blocks + 20 premium Next.js/Astro templates
  built on shadcn/ui + Tailwind v4, plus **free blocks and free landing
  pages** installable via the shadcn CLI. Best fit when the build stack is
  shadcn-based (the engine default): exact anatomy parity with §3.
- **creative-tim.com** — 205 dashboards + 93 UI kits across React/Vue/Angular/
  Tailwind, free and premium; strongest for admin/dashboard skeletons.
- **themeforest.net** — 11,100+ UI templates including a Figma UI-template
  category and admin dashboards (Envato), for niche/vertical templates when
  the product category (e-commerce, marketplace, health) needs a specialized
  reference.

**C. Figma-file marketplaces (premium "like Figma" file catalogs — .fig
references, not clones):**
- **ui8.net** — the closest thing to a premium Figma-only Envato: 14K+ curated
  UI kits strong on dashboard/AI/SaaS; $29–129 per item or All-Access pass.
- **untitledui.com/figma** — single premium design system (10K+ components,
  420+ page examples) covering landing/SaaS/dashboard/pricing/onboarding in
  one file; the most-used paid kit (380K+ designers) — good composition
  benchmark for every surface.
- **creativemarket.com/templates-themes/software/figma-templates** — 7,500+
  Figma templates from independent sellers; the deep bench for niche
  verticals (quality varies — judge before adopting).
- **framesxdesign.com** — 3,500+ components, 500+ layouts, 130+ charts;
  dashboard/e-commerce/admin-heavy Figma kit.

**D. React / Tailwind / shadcn template & component catalogs (the stack this
engine builds on — closest anatomy-to-code parity with §3):**
- **tailwindui.com** — Tailwind Plus: 500+ copy-paste blocks + full Next.js
  templates + Catalyst app-UI kit; the baseline nearly all "premium Tailwind"
  reads derive from, so it defines the default to out-do.
- **ui.aceternity.com** — 200+ free animated landing components + premium
  templates (hero, bento, shader backgrounds); earns-motion for landings.
- **magicui.design** — free animated effects (marquee, globe, text) + Pro
  section packs, shadcn-installable.
- **vercel.com/templates** — deployable open-source boilerplates (SaaS
  starter, admin, platforms); inspect their shipped UI as reference.
- **coss.com/ui** (Origin UI, acquired by Cal.com) — legacy Radix components
  are MIT; new Base-UI line is AGPL — use legacy for anatomy, check license
  before touching the new line.

**E. Framer & Webflow template stores (visual-design-tool ecosystems, all
browsable live — screenshot without login):**
- **framer.com/marketplace/templates/** — curated SaaS/AI/fintech landing
  templates, each with a live `.framer.website` preview; the deepest pool of
  polished start-up landings.
- **webflow.com/templates** — 7,000+ templates with public live previews;
  best coverage for SaaS-marketing, pricing, and CMS-driven sites.
- **flowbase.co** — section-level compositions (headers, pricing, onboarding,
  dashboards) that map to individual UI surfaces.
- **webflow.com/made-in-webflow** — free gallery of real shipped Webflow
  sites — inspiration, not templates.

**F. Admin/dashboard benchmarks (anti-template bar for dense surfaces):**
- **thefrontkit.com** — product-grade shadcn dashboards with WCAG-AA
  receipts; the reference for premium admin that doesn't read "template".
- **tabler.io** — distinctive, utility-clean data-table/ops UI, free + cheap
  Pro; contrast reference for dense dashboards.
- **github.com/satnaing/shadcn-admin** — free MIT shadcn admin anatomy
  (sidebar, data tables, Cmd-K) with dark mode + a11y baked in.
- **adminlte.io/blog** — the best curated aggregator of dashboard roundups
  (Next.js-16/shadcn, free shadcn, per-vertical lists); use as discovery
  index before deep-diving one of the above.

**G. AI / agent-surface references (for AI-heavy SaaS shortlisting — chat
panels, agent status, credit pricing, onboarding):**
- **vercel.com/templates/ai** — 50+ open-source AI app templates with live
  demos (chatbot, RAG, agents); reference chat-panel + agent-status UI.
- **agent-elements.21st.dev** — AgentChat shell, tool-call cards, approval
  flows, streaming markdown as shadcn-installable primitives.
- **github.com/Eldergenix/NexUI-Agentic-UI-Components** — 90+ agent UI
  components (MIT) when a deeper agent-surface vocabulary than agent-elements
  is needed; low adoption (≈1 star) — vet before relying on it.
- **makerkit.dev/ai-saas-starter** — premium AI SaaS starter; reference for
  threaded chat, onboarding, admin dashboard composition — license limits
  reuse, inspect for composition only.
- **prompt-kit.com** — shadcn registry of chat/streaming/tool-calling
  primitives (PromptInput, ResponseStream, CodeBlock); the foundation layer
  beneath agent surfaces (MIT).
- **livekit.io/ui**, **ui.deepgram.com** — production voice-agent registries
  (Orb visualizer, lifecycle states, transcripts) when the build has voice/AI
  voice surface (MIT, shadcn-installable).

**H. AI-artifact & design-system benchmarks (calibrate what the build must
out-do, and how real systems structure tokens):**
- **v0.app/templates**, **bolt.new/gallery**, **madewithlovable.com/examples**
  — galleries of what top AI generators actually ship, by app type
  (SaaS/AI-tool/dashboard); use as the anti-AI-slop baseline — the build must
  beat the median generated result, not equal it.
- **component.gallery**, **designsystemsrepo.com** — cross-system component
  anatomy and token structure from 95+ real design systems (Polaris, Fluent,
  Spectrum); validate token choices are proven, not invented.
- **themes.shopify.com**, **dashboardpack.com** — conversion-validated
  e-commerce storefronts (1000+ themes) and deep vertical dashboards
  (healthcare, institutional finance) when the product category needs a
  specialized bar.

**How to consult (same discipline as §10):** browse in a real browser — most
grids are JS-rendered, so reuse the §10 agent-browser/Playwright gate → pick
one strongest-in-class reference **per surface category** (landing /
SaaS-marketing / dashboard / pricing / onboarding), judged against
`impeccable critique` + `design-taste-frontend` and brand-checked against the
`design-md` seed → **extract the composition, not the pixels**: regenerate
from the project's own tokens (§1–5) and §7 distinctiveness, then **prove
with the §8 Playwright backtest**. Groups A/E are inspiration-only — copying
branding is not allowed. Groups B–G carry per-item licenses (MIT free tiers in
D/G or paid kits in C/F); a licensed template may seed the build, but a
surface that still reads "template" after building fails §7 criterion 2 (flat
template = fail). Record every referenced source (name + URL + license) in
`DECISIONS.md`.

3. **Spec-kit Constitution (always run when spec-kit available):**
    Run `/speckit.constitution` to establish project principles
    (code quality, testing, UX consistency, performance, security posture).
    Hands-free: author a concise constitution from the brief's objective +
    the skill's non-negotiables + DESIGN.md tokens. This becomes the
    governing contract for all downstream work — recorded in
    `docs/CONSTITUTION.md` and referenced by `CONSTRAINTS.md`.
    **MUST contain (each principle gets a named section with ≥3 concrete
    rules):**
    - **I. Code Quality:** strict TypeScript, zero `any`, ESLint + Prettier
      enforced, every exported function has JSDoc, no barrel files, max 300
      lines per file.
    - **II. Testing:** TDD mandatory for business logic, Playwright for all
      user flows, Vitest for unit/integration, ≥80% coverage on `lib/` and
      `app/api/`, no `.skip` without a linked issue.
    - **III. UX Consistency:** DESIGN.md tokens are law, no ad-hoc colors,
      loading/empty/error/focus states on every screen, responsive at
      390/768/1280, reduced-motion respected.
    - **IV. Performance:** initial route ≤200KB, LCP ≤2.5s, CLS ≤0.1,
      TTI ≤3.5s on 4G, no layout shift from lazy images.
    - **V. Security:** CSP nonces on every response, input validation via
      Zod at every trust boundary, rate limits on every API route, RBAC on
      every admin endpoint, no secrets in code.
    - **VI. Data Integrity:** Prisma migrations required for every schema
      change, no raw SQL without Kysely type safety, soft deletes on all
      user-facing models, backup/restore tested.
    - These are not suggestions — they are the governing contract for all
      downstream work. Every story's acceptance criteria must trace to a
      constitution principle.
    → **Verify after generation** against this list per Documentation OS §7
      (thin or placeholder = expand now, re-check, never proceed silent).
4. **Docs:** feed `BRIEF.md` **and the complete DESIGN.md spec** into
    `vibe-docs`. Instruct it: DESIGN.md is the law, not a starting point —
    every token, layout grid, component spec, page layout, interaction
    pattern, anti-slop constraint (Section 6), AND the Design Ambition &
    Distinctiveness Mandate (Section 7) in DESIGN.md are mandatory. No
    component in `prd.json` may reference a pattern not already defined in
    DESIGN.md. If a component is needed but not in DESIGN.md, it must be
    added to DESIGN.md before coding begins (not invented at implementation
    time). In addition to vibe-docs' 14 docs, write `docs/TRD.md` from the
    `docs/TRD.md` template shipped with this skill (stack lock-in,
    performance budgets, security requirements, data integrity, a11y level,
    environment matrix, external integrations, observed assumptions).
    Verify the completeness gate (all 14 files + `docs/TRD.md` +
    `prd.json` passes
    the ralph-shape `jq` check) before Phase 2.
5. **Spec-kit Specify (enhancement, not replacement):**
    Run `/speckit.specify` with the idea + DESIGN.md + CONSTITUTION.md
    as context. The spec artifact **augments** (not replaces) the
    `vibe-docs` output — it adds formal traceability: Constitution → Spec →
    Plan → Tasks → Code. Store at `docs/SPEC.md`. The `vibe-docs` PRD,
    API_SPEC, ARCHITECTURE remain the primary implementation docs; SPEC.md
    provides the auditable lineage.
    **MUST contain (no placeholders, no "TBD", no template-filler):**
    - **Functional requirements** — one numbered requirement per feature,
      each with: ID (`REQ-001`), priority (P0/P1/P2), user story or
      acceptance criteria, which constitution principle it traces to, and
      which US-### story it maps to.
    - **Non-functional requirements** — performance budgets (LCP, CLS, TTI
      from constitution), security requirements (CSP, rate limits, RBAC),
      accessibility level (WCAG AA), data retention policy, deployment
      constraints.
    - **API contracts** — for every API route: method, path, request body
      (Zod schema), response shape (TypeScript type), auth requirement,
      rate limit, error codes. No route exists without a contract.
    - **Data model** — every Prisma model with: fields, types, relations,
      indexes, constraints, soft-delete policy, audit fields. Reference the
      DESIGN.md token map for any user-facing field names.
    - **Traceability matrix** — a table: REQ-ID → Constitution Principle →
      US-Story → Implementation File. This is the auditable lineage; a
      requirement without a story is orphaned, a story without a
      requirement is scope creep.
    → **Verify after generation** against this list per Documentation OS §7
      (thin or placeholder = expand now, re-check, never proceed silent).
6. **BLUEPRINT.md Generation (unified architecture document):**
   After `vibe-docs` and spec-kit complete, generate `docs/BLUEPRINT.md` as the single source of truth consolidating:
   - Architecture overview (from ARCHITECTURE.md + PLAN.md)
   - Data model with relationships (from DATA_MODEL.md + SPEC.md)
   - API contracts (from API_SPEC.md + SPEC.md)
   - Design system tokens (from DESIGN.md)
   - State architecture: TanStack Query v5 for server state, Zustand 5/Jotai 3 for client state, React Context for theme/auth
   - Security model: Arcjet + CSP nonces + Trusted Types + COOP/COEP
   - Observability stack: OpenTelemetry JS + Vercel Observability/Highlight.io
   - Deployment targets: Vercel (default), Cloudflare Workers, Deno Deploy
   - ADR index linking to `docs/adr/*.md`
   This becomes the primary reference for all implementation stories.

### Phase 1b — spec-kit Plan & Tasks (integrated into ralph story generation)

1. **Plan:** run `/speckit.plan` with the fixed stack (Next.js 15 App Router + Turbopack Dev stable, Async Request APIs, React Compiler experimental, Static Route Indicator, unstable_after API, instrumentation.js stable, <Form> component, next.config.ts support) **or** TanStack Start (router-first full-stack, portable across Vercel/Cloudflare/Netlify/Node.js) **or** Waku (React on Hono) **or** RedwoodJS v7+ (full-stack RSC), Tailwind v4 + shadcn/ui (Radix UI 2+), Prisma 8 (TypeScript runtime, contract-based data models, composable query DSL, graph-based migrations) + Postgres 17+ (Neon/PlanetScale/Turso with pgvector), Auth.js v5 (Passkey-first), Vercel AI SDK 4+ (AI Gateway 100+ models, Workflows for resumable agents, Vercel Sandbox), TanStack Query v5 + TanStack Router, Zustand 5 / Jotai 3 / Kysely (type-safe SQL for complex queries), motion (Framer Motion 12 + Motion One + GSAP 3.13+ ScrollTrigger), Rive 2.0 / Lottie / React Three Fiber v9 + Three.js r160+, Zod, Vitest 2+ + Playwright 1.48+, Bun v1.1+ (WinterCG compliant, native SQLite) as the implementation choice. The plan **augments**
    `docs/ARCHITECTURE.md` + `docs/DATA_MODEL.md` + `docs/TEST_PLAN.md`
    with formal task decomposition. Store at `docs/PLAN.md`.
    **MUST contain (no placeholders, no "TBD"):**
    - **Phase breakdown** — numbered phases (0–4) with: what gets built,
      which stories belong, which dependencies are resolved, which
      external services are wired. Each phase has a "done when" exit
      criterion.
    - **Dependency graph** — which stories block which, which can run in
      parallel, which require external services (Vercel, Stripe, etc.)
      and how those are handled when absent.
    - **Risk register** — top 5 technical risks with: what could fail,
      probability (H/M/L), impact (H/M/L), mitigation strategy, owner.
    - **Infrastructure plan** — Docker services (Postgres, Redis, MinIO),
      their ports, volumes, health checks, backup strategy. Compose file
      structure. Environment variable matrix (LOCAL/DEV/STAGING/PROD).
    - **Testing strategy** — unit tests (Vitest) for `lib/` and
      `app/api/`, integration tests for database queries, Playwright E2E
      for every user flow, Storybook for component visual testing, a11y
      regression via axe-core. Coverage targets per layer.
    - **Security plan** — CSP implementation (nonces via `next-csp`),
      rate limiting (Arcjet), input validation (Zod at every trust
      boundary), RBAC model, secrets management, dependency auditing.
    → **Verify after generation** against this list per Documentation OS §7
      (thin or placeholder = expand now, re-check, never proceed silent).

**Canonical package manager and ORM (one each — conflicts resolved):**
- **Package manager = pnpm 12.x (single source of truth).** All project commands use `pnpm`: `pnpm install`, `pnpm run <script>`, `pnpm dlx <tool>`, `pnpm dev/build/start/test/lint/typecheck/storybook`. Do NOT mix `npm` or `yarn` for project scripts. `npx` remains acceptable ONLY for ephemeral external CLIs that are not project dependencies (e.g. `npx skills`, `npx playwright`, `npx ai-elements`, `npx next-bundle-analyzer`) — never for running project scripts. Bun v1.1+ remains a Phase 0 prerequisite (native SQLite, fast installs, edge runtime compat), but the project's canonical script runner and lockfile is pnpm (`pnpm-lock.yaml`).
- **ORM = Prisma 8 (single default).** Use Prisma for all relational schema + migrations. Kysely is used ONLY for read-only type-safe SQL on top of the Prisma connection within the same project (complex reporting queries) — it is not an alternative schema layer. Drizzle ORM, PGlite, and TanStack DB are EXPLICIT OPT-IN alternatives chosen in `DECISIONS.md` BEFORE Phase 2 when the architecture genuinely requires edge-compatible or local-first sync; they are never installed alongside Prisma by default. If a story's `scripts/*` or schema step says "npm", treat it as `pnpm`.
- **Niche CLI tools (niche = verify at run time).** `next-csp` (CSP nonces, US-046), `sloth` (SLO generation, US-042), and `prisma-query-analyzer` (N+1/index detection, US-036/037) are narrow tooling that can be renamed, archived, or superseded. Before a story relies on one, verify it still exists at its current version (`pnpm dlx <tool> --version` or `npm view <tool> version`); if it is deprecated or missing, use the source-driven/known-source map to pick the current maintained equivalent (e.g. a still-maintained CSP/audit package), record the swap in `DECISIONS.md`, and never hand-roll a security control (CSP) that a verified tool can generate.
2. **Tasks → Ralph Stories:** run `/speckit.tasks` to generate the task list.
    Map each task to a ralph story (`prd.json`) — 1:1 or N:1 — so the
    ralph loop consumes it directly. This **replaces** the
    `planning-and-task-breakdown` step for story generation; the stories
    now carry spec-kit traceability (task ID → spec requirement → constitution
    principle).
    **MUST contain (every task is a story, not a stub):**
    - **Task ID** — `TASK-001` format, sequential, no gaps.
    - **Title** — imperative, specific: "Add Zod validation on POST /api/invoices"
      not "Add validation".
    - **Spec requirement** — which `REQ-###` this task fulfills (from SPEC.md).
    - **Constitution principle** — which principle this task enforces
      (e.g. "testability", "security", "ux-consistency").
    - **Acceptance criteria** — at least 3 concrete, testable conditions
      per task (e.g. "POST /api/invoices returns 400 with validation error
      when amount is negative", "rate limit of 100 req/min enforced").
    - **Estimated complexity** — S/M/L/XL with rationale (file count,
      external dependency, integration surface).
    - **Dependencies** — which other tasks must complete first (blocked-by
      list), which can run in parallel (unblocked tasks).
    - **US story mapping** — which `US-###` story this maps to (for
      traceability back to prd.json).
    - **No task is orphaned** — every task traces to a SPEC.md requirement
      and a constitution principle; a task without both is scope creep and
      must be deleted or formally added to SPEC.md first.
    → **Verify after generation** against this list per Documentation OS §7
      (thin or placeholder = expand now, re-check, never proceed silent).
3. **SPEC.md vs BLUEPRINT.md Distinction:** SPEC.md (from spec-kit) = requirements/contracts (what). BLUEPRINT.md = implementation architecture (how). Both generated and kept in sync.
4. **Auto-generate ADRs:** Every decision recorded in `DECISIONS.md` triggers ADR creation via `documentation-and-adrs` skill. Template at `docs/adr/TEMPLATE.md`. ADRs appended to `docs/adr/` with sequential numbering.

**Story schema (`prd.json` each story):**
```json
{
  "id": "US-003",
  "title": "User authentication",
  "spec_task_id": "TASK-007",           // <-- traceability to spec-kit task
  "spec_requirement_id": "REQ-003",    // <-- traceability to SPEC.md requirement
  "constitution_principle": "security", // <-- which CONSTITUTION.md principle
  "depends_on": ["US-001", "US-002"],  // <-- explicit dependency DAG
  "acceptance": [...],
  "passes": false,
  "retry_count": 0,
  "started_at": null,
  "completed_at": null
}
```

### Degradation Path (when spec-kit unavailable)

If Phase 0 prerequisite 11 fails (spec-kit not installable):

1. **Phase 0.5:** Skipped entirely — no `specify init`
2. **Phase 1:** Skip Constitution (step 3) and Specify (step 5); proceed with
   Brief → UI Direction → Docs (`vibe-docs` only)
3. **Phase 1b:** Use `planning-and-task-breakdown` skill to generate
   ralph stories from `vibe-docs` PRD; stories lack `spec_task_id`/
   `spec_requirement_id`/`constitution_principle` fields
4. **Phase 2:** Run ralph loop with UI gates only; **no converge gate**
5. **Phase 3:** Skip "Spec-kit Converged" gate; proceed with engine gates +
   `impeccable critique`
6. **Record in `DECISIONS.md`:** "spec-kit degraded — reason: [uv missing /
   specify-cli install failed / Python <3.11]"

This ensures the pipeline **always completes** — spec-kit is enhancement,
not a hard requirement.

## Documentation OS — the project's living specification

The docs produced above are not a static dump — they are a **living
specification** that governs the build. This section defines the doc set,
its authority, how it is kept in sync, and how drift is caught. It is the
"operating system" the ralph loop and every gate live inside.

### 1. Doc inventory (what exists where)

Copy `docs/DOC_TEMPLATES.md` from this skill to `<project-root>/docs/`
on first run. It holds the terse contract template for every doc below —
generate each project doc from its contract with real content from
BRIEF/DESIGN/PRD + the fixed stack. **Concretely, the project ships two
tiers:**

- **Tier 1 — pre-existing (14 from `vibe-docs` + 8 builder additions):**
  `README.md` (docs index), `BRD.md`, `PRD.md`, `ARCHITECTURE.md`,
  `DATA_MODEL.md`, `API_SPEC.md`, `DESIGN.md`, `SECURITY.md`,
  `TEST_PLAN.md`, `DEPLOYMENT.md`, `SCOPE.md`, `CHANGELOG.md`,
  `TROUBLESHOOTING.md`, `DECISIONS.md` + `prd.json`, and the builder
  additions `BRIEF.md`, `TRD.md`, `CONSTITUTION.md`, `SPEC.md`, `PLAN.md`,
  `BLUEPRINT.md`, `MEMORY.md`, `CONSTRAINTS.md`, `docs/adr/*`.
  These stay canonical; the Documentation OS **extends**, never replaces
  them.
- **Tier 2 — Documentation OS additions (generated from templates):**
  `DOC_GOVERNANCE.md`, `AGENTS.md`, `USER_FLOWS.md`, `BUSINESS_RULES.md`,
  `ACCEPTANCE_CRITERIA.md`, `STATE_MODEL.md`, `TRACEABILITY.md`,
  `DEFINITION_OF_DONE.md`, `DRIFT_CONTROL.md` (P0 control), `AI_SPEC.md`,
  `AI_GUARDRAILS.md`, `AI_EVALS.md`, `AI_MEMORY.md`, `AI_CONTEXT.md`,
  `AI_COST.md`, `AI_MODEL_POLICY.md` (AI, only if the product has AI),
  `UI_SPEC.md`, `COMPONENT_LIBRARY.md`, `ACCESSIBILITY.md` (UX),
  `BACKEND_ARCHITECTURE.md`, `API_CONVENTIONS.md`, `API_COMPATIBILITY.md`,
  `INTEGRATION_SPEC.md`, `ASYNC_JOBS.md` (backend), `AUTH_SPEC.md`,
  `RBAC.md`, `TENANCY.md`, `DATA_LIFECYCLE.md`, `DATA_PRIVACY.md`,
  `DATA_ACCESS.md`, `MIGRATIONS.md` (data), `THREAT_MODEL.md`,
  `SECURITY_CONTROLS.md`, `SECRETS.md`, `SUPPLY_CHAIN.md` (security),
  `TEST_STRATEGY.md`, `TEST_DATA.md`, `CONTRACT_TESTS.md`,
  `PERFORMANCE.md`, `ERROR_HANDLING.md` (quality), `ENVIRONMENT.md`,
  `LOCAL_DEV.md`, `CI_CD.md`, `OBSERVABILITY.md`, `SLO.md`,
  `BACKUP_RESTORE.md`, `DISASTER_RECOVERY.md`, `INCIDENT_RESPONSE.md`,
  `RELEASE.md` (ops), `ANALYTICS.md`, `METRICS.md`, `FEATURE_FLAGS.md`,
  `CHANGE_POLICY.md`, `DEPRECATION.md`, `DEPENDENCIES.md`,
  `PROJECT_STATUS.md` (project mgmt).

**Mandatory always:** `DOC_GOVERNANCE.md`, `AGENTS.md`, `USER_FLOWS.md`,
`BUSINESS_RULES.md`, `ACCEPTANCE_CRITERIA.md`, `STATE_MODEL.md`,
`TRACEABILITY.md`, `DEFINITION_OF_DONE.md`, `DRIFT_CONTROL.md`, and the
UX/backend/security/data/quality/ops/project-mgmt set. **Conditional:**
AI docs only when the product has AI (else `AI_SPEC.md` = one-liner "AI not
applicable"); `RBAC.md` only with roles; `TENANCY.md` only multi-tenant;
`CONTRACT_TESTS.md` only with external/API contracts; `ASYNC_JOBS.md` only
with background jobs; `PERFORMANCE.md`/`SLO.md` mark undocumented targets
`TBD` + resolver rather than inventing numbers.

### 2. Generation order (dependency-aware)

Integrates with the existing phases — **do not** run it as a parallel
pipeline. Where each doc is produced:

- **Phase 0:** `MEMORY.md`, `CONSTRAINTS.md`, `CONSTITUTION.md`,
  `DOC_GOVERNANCE.md`, `AGENTS.md` (project root)
- **Phase 1:** `BRIEF.md` → `BRD.md` → `PRD.md` → `SCOPE.md` (vibe-docs)
  → `USER_FLOWS.md` → `BUSINESS_RULES.md` → `ACCEPTANCE_CRITERIA.md` →
  `SPEC.md` (spec-kit) → `STATE_MODEL.md` → `TRACEABILITY.md` →
  `TRD.md` → `ARCHITECTURE.md` → `BLUEPRINT.md` → `DESIGN.md` (+
  `UI_SPEC.md`, `COMPONENT_LIBRARY.md`, `ACCESSIBILITY.md`) → AI docs
  (if AI) → `DATA_MODEL.md` (+ `DATA_LIFECYCLE.md`, `DATA_PRIVACY.md`,
  `DATA_ACCESS.md`, `MIGRATIONS.md`) → `API_SPEC.md` (+
  `BACKEND_ARCHITECTURE.md`, `API_CONVENTIONS.md`, `API_COMPATIBILITY.md`,
  `INTEGRATION_SPEC.md`, `ASYNC_JOBS.md`) → `SECURITY.md` (+
  `THREAT_MODEL.md`, `SECURITY_CONTROLS.md`, `SECRETS.md`,
  `SUPPLY_CHAIN.md`, `AUTH_SPEC.md`, `RBAC.md`, `TENANCY.md`)
- **Phase 1b:** `PLAN.md` + `prd.json` → `TEST_STRATEGY.md` (+
  `TEST_DATA.md`, `CONTRACT_TESTS.md`, `PERFORMANCE.md`,
  `ERROR_HANDLING.md`) → `DEFINITION_OF_DONE.md` → `DRIFT_CONTROL.md`
- **Phase 2 (during build, maintain):** `ENVIRONMENT.md`, `LOCAL_DEV.md`,
  `CI_CD.md`, `DEPLOYMENT.md`, `OBSERVABILITY.md`, `SLO.md`,
  `BACKUP_RESTORE.md`, `DISASTER_RECOVERY.md`, `INCIDENT_RESPONSE.md`,
  `RELEASE.md`, `ANALYTICS.md`, `METRICS.md`, `FEATURE_FLAGS.md`,
  `CHANGE_POLICY.md`, `DEPRECATION.md`, `DEPENDENCIES.md`,
  `PROJECT_STATUS.md`
- **Phase 3/4 gates:** run the documentation-system audit (section 6
  below) before COMPLETE; refresh `docs/README.md` index to cover all
  docs with purpose + authority + reading order + ADR links + prd.json.

### 3. Metadata + authority

Every generated doc carries the frontmatter contract:
`document`, `version`, `status`, `authority` (`authoritative` | `derived` |
`operational`), `depends_on`, `source_of_truth` (`true`|`false`),
`last_updated`. Precedence for conflicts:
**CONSTITUTION > CONSTRAINTS > DOC_GOVERNANCE > source-of-truth docs >
derived docs.** A `derived` doc defers to its source by reference — never
copies content that can drift. A `operational` doc (ENVIRONMENT,
PROJECT_STATUS, LOCAL_DEV) records the most *current* reality, not the most
authoritative. Two source-of-truth docs contradicting = a bug: fix the docs
before coding.

### 4. Stable IDs

Namespaces: `BR-###` (business), `REQ-###` (PRD/SCOPE), `SPEC-###` (spec-kit),
`FLOW-###` (user flow), `AC-###` (acceptance criterion, sub-namespaced
`AC-AUTH-001`), `RULE-###` (business rule), `STATE-###` (state machine),
`API-###`, `DATA-###`, `AI-###`, `SEC-###`, `TEST-###`, `ADR-###`,
`US-###` (prd.json). **Preserve existing IDs** (`REQ-###`, `US-###`,
`TASK-###`, `constitution_principle`) — the new namespaces extend the same
spine, never renumber. Traceability spine:
`BR-### → REQ-### → SPEC-### → FLOW-### → AC-### → US-### → code → TEST-###`.

### 5. Anti-duplication rule

Before writing any doc: search the existing set; if the content already
exists in another doc, reference it by name + version instead of copying.
Never create two sources of truth for one concern. `UI_SPEC.md` defers
styling detail to `DESIGN.md`; `TEST_STRATEGY.md` defers the concrete plan to
`TEST_PLAN.md`; `BACKEND/FRONTEND_ARCHITECTURE.md` defer topology to
`ARCHITECTURE.md`+`BLUEPRINT.md`; `SECURITY_CONTROLS.md`/`THREAT_MODEL.md`
own the detail, `SECURITY.md` owns summary+compliance; `INTEGRATION_SPEC.md`
and `DEPENDENCIES.md` keep the same integration list in sync (one owns,
other links). If two docs need the same table, one owns it and the other
links with `(see X.md §n)`.

### 6. Drift control + audit (the living-spec loop)

The Documentation OS is **living**: when implementation changes a behavior,
architecture, API, data model, business rule, AI behavior, security control,
or user flow, the loop runs (detect → identify affected docs → update
source-of-truth → propagate derived → update TRACEABILITY → update
tests/evals → run consistency audit). `DRIFT_CONTROL.md` + `TRACEABILITY.md`
formalize it. **Audit (Phase 3/4 gate and every phase completion):**

1. **Completeness** — every doc above exists; Tier 1 intact, nothing
   replaced; conditional docs present iff their precondition holds.
2. **Consistency** — no contradictory requirements, no conflicting
   architecture, no duplicate source-of-truth, uniform terminology +
   tech choices (stack, package manager, ORM match `TRD.md`).
3. **Traceability** — spine holds end-to-end; every `REQ-###` → `AC-###` →
   `US-###` → test; security reqs → security tests; AI reqs → AI evals.
4. **Agent readiness** — a cold agent can determine from docs alone: what
   to build, why, how it should behave, which architecture, what not to do,
   how to test, when done, which docs to update.
5. **No hallucinated decisions** — no invented providers/models/DBs/APIs/
   perf targets/security/compliance requirements beyond TRD/PRD/BRD/
   DEPENDENCIES; unknowns are `TBD` + named resolver.
6. **README index** — `docs/README.md` lists all docs with purpose,
   authority, reading order (human + agent), dev workflow, ADR links,
   prd.json link.

**No silent drift to code as the only source of truth.** A story that
changes behavior and does not touch its source-of-truth doc fails its
acceptance gate (wired into `AGENTS.md` + `DEFINITION_OF_DONE.md`).

### 7. Generation-time verification (no thin docs past this point)

Every doc the pipeline generates is checked **at generation time**, not at
the Phase 3 audit. The spec-kit `specify` command has its own built-in
quality loop (writes → validates against its own checklist → re-writes up
to 3 iterations). `plan` and `tasks` do **not** — so the orchestrator
enforces them:

1. **Verify.** After `/speckit.constitution`, `/speckit.specify`,
   `/speckit.plan`, and `/speckit.tasks` produce their file(s), check the
   output against that command's `MUST contain` list (Section 1 / Phase 1)
   and the Tier-2 contract in `docs/DOC_TEMPLATES.md`: every listed item
   present, no `TBD`/placeholder/empty section, no dangling `[NEEDS
   CLARIFICATION]`.
2. **Thin? Fix now.** If any item is missing or thin, expand the generated
   file in place (or re-run the command with richer context — the
   `MUST contain` list as its argument) until every item passes. Max 3
   iterations; if still failing after 3, halt the phase and record the
   gap in `DECISIONS.md` — NEVER proceed to the next command or into
   `prd.json` with a thin upstream doc.
3. **Evidence.** Every `MUST contain` item's pass is quoted with evidence
   (a real requirement ID, a real API contract row), not "looks good" —
   same rule as the DESIGN.md gate.

4. **Mechanical gate (when the script is available).** Before proceeding
   past a phase that produced docs, run
   `node <skill-dir>/scripts/doc-contract-check.js <project-dir>` — it
   fails on: missing CONSTITUTION principle sections, missing SPEC/PLAN
   sections, SPEC traceability matrix without a real table, forbidden
   `TBD`/`TODO`/`FIXME`/`[NEEDS CLARIFICATION]`/lorem, and prd.json stories
   without `US-###` id, title, spec-kit traceability, or <3 acceptance
   criteria. At convergence (pre-Phase-3) run it with `--convergence` to
   additionally require every story `passes: true` with no open `depends_on`
   to a failing story (same check the §2/`speckit.implement` degradation
   uses). Non-zero exit = the phase cannot be marked complete; fix the
   docs or record the gap in `DECISIONS.md`. The same script serves as a
   CI check in `CI_CD.md` (fails the pipeline build on contract violation).
   It checks the mechanically-verifiable subset only — semantic richness
   stays agent-verified per step 3.

This closes the `speckit.plan`/`speckit.tasks` enforcement hole: the LLM's
diligence is no longer the only thing standing between a skeleton and a
real plan/task list.

### Phase 2 — build (engine-owned, UI gates injected)

Run `vibe-build`'s ralph loop as-is, with two altered files:

1. **Per-iteration UI gates** (append verbatim to the ralph `AGENTS.md` after rule 20):
   ```
   21. Every screen ships matching docs/DESIGN.md tokens — no ad-hoc colors,
       fonts, or spacing invented during the story; reuse shadcn/ui via the
       installed shadcn skill, tokens via the design system.
   22. No anti-slop defaults: no centered 3-emoji hero, no default purple
       gradient, no Acme/example branding, no lorem text, no bare spinners
       for anything above a trivial fetch — real skeletons or Suspense.
   23. Each story's new screen has: a visible keyboard focus state, WCAG AA
       contrast, semantic HTML/landmarks, alt text or aria-hidden on images/
       icons, and handles its loading, empty, and error states.
   24. Responsive at 390 / 768 / 1280px container widths before the story
       passes; motion respects prefers-reduced-motion.
   25. Business copy on screens is real, opinionated, product-accurate — never
       placeholder prose. UX microcopy follows clarity (impeccable clarify).
26. UI polish is part of the story's acceptance criteria, not a later
        cleanup pass — an unfinished-looking screen blocks passes: true.
    27. The story's source-of-truth docs come first: if this story changes
        behavior/architecture/API/data model/business rule/AI behavior/
        security control/user flow, update the owning doc (per
        docs/CHANGE_POLICY.md) in the same commit — code alone is never
        the only source of truth.
    28. New acceptance criteria carry stable IDs and land in
        docs/ACCEPTANCE_CRITERIA.md (`AC-AUTH-###`/`AC-DATA-###`/...);
        every story references ≥1 AC-### (docs/DRIFT_CONTROL.md).
    29. No silent assumptions: any non-obvious choice made during the story
        is recorded in docs/DECISIONS.md (or an ADR per docs/CHANGE_POLICY.md)
        in the same commit.
   30. Definition of Done (docs/DEFINITION_OF_DONE.md) applies to every
        story: requirement implemented, AC satisfied, unit+integration+E2E
        pass, security/perf/a11y validation where applicable, error states
        present, docs updated, no TODOs, no secrets, lint/type/build pass.
31. Traceability never breaks: after the story, docs/TRACEABILITY.md
        still links REQ-### → AC-### → US-### → code → TEST-### for the
        touched surface; severed links fail the story.
    32. **Telemetry per story (best-effort, never blocks the story).** At the
        end of the story, append one line to `<project>/TELEMETRY.jsonl` via
        `node <skill-dir>/scripts/telemetry-write.js <project> <skill-name>
        <story-id> <duration_ms> <success> <retry_count> <tokens_in>
        <tokens_out> <cost_usd> [model]`. Skill-name = the skill actually
        used (shadcn, impeccable, design-taste-frontend, ...); model = read
        from `.run-model` if present. If you cannot measure tokens/cost
        (the host does not expose them), pass 0 — the dashboard then shows
        "no token data" rather than a fake number. Never fail the story
        because telemetry failed.
    ```

2. **Spec-kit Convergence Gate (at phase boundaries + every 5 stories):**
    Spec-kit v0.8.x has **no `/speckit.converge` command** — the real
    convergence mechanism is **`/speckit.implement`** (it runs
    `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks
    --include-tasks` and validates all tasks are present/done) plus
    **`/speckit.checklist`** (requirements-quality unit tests for the spec).
    Use those two, not a phantom `converge`:
    - **After story US-002** (token handoff complete): run
      `/speckit.checklist` against `docs/SPEC.md` — must report no missing
      requirement coverage.
    - **Every 5 stories thereafter** (US-007, US-012, US-017, ...): run
      `/speckit.implement` in dry-run/validation mode — it re-checks that all
      tasks in `docs/PLAN.md`/`tasks.md` are accounted for and reports drift
      (tasks done vs tasks remaining) — **and** run
      `node <skill-dir>/scripts/doc-contract-check.js <project-dir>` (base
      mode) to catch any drift-induced thin/placeholder doc introduced
      mid-build, so a thin PLAN.md/SPEC.md cannot linger until Phase 3.
    - **Before Phase 3** (final convergence check): run both; if drift is
      detected, append the corrective tasks to `docs/PLAN.md`/`tasks.md` —
      the ralph loop picks them up naturally.
    Continue until `/speckit.implement` reports all tasks done (no drift)
    **and** the engine reports `<promise>COMPLETE</promise>`.
    **Degradation:** if `speckit.implement` errors or spec-kit is degraded,
    fall back to a mechanical `jq` check that every story in `prd.json`
    has `passes: true` and no open `depends_on` pointing at a failing story,
    and record the fallback in `DECISIONS.md`. The gate is never silently
    skipped — it degrades to a weaker but real check.
    **MUST have run and passed (not just invoked):** `/speckit.checklist`
    against `docs/SPEC.md` reports no missing requirement coverage
    **and** `/speckit.implement` reports all tasks accounted for with zero
    drift against `SPEC.md`/`PLAN.md` at the pre-Phase-3 check. Evidence of
    the passing run is quoted in `DECISIONS.md` (gate output, not "ran
    fine"). **Mechanical check after the gate:** run
    `node <skill-dir>/scripts/doc-contract-check.js <project-dir> --convergence` —
    it exits non-zero if any prd.json story lacks `passes: true` or has an open
    `depends_on` to a failing story. This is the same script as §7 step 4;

**Token-to-code handoff (a first-class story, not incidental).** Immediately
after the scaffold story (US-001), the next story compiles `docs/DESIGN.md`
tokens into the actual theme layer — CSS variables in `globals.css` +
Tailwind v4 `@theme` (colors → semantic roles, type scale, spacing, radius,
shadow, motion durations/easing, light+dark). Gate: no component work
starts before tokens are in code, and components reference variables — grep
for raw `#[0-9a-f]{3,8}` hex or hardcoded `rgb(` literals in
`src/components/` fails the story.

**Design enforcement in CI.** Add one lightweight lint-stage gate to the
engine's CI pipeline: grep the diff/components for raw hex literals,
`@ts-ignore`/`eslint-disable` suppressions, and `space-x-*` spacing hacks —
fail the lint stage on any hit. The design system becomes an enforced
contract, not a convention that drifts across 200 iterations.

**Zero-Tolerance CI Gate (auto-fail on slop patterns).** Extended grep patterns in `scripts/design-gate.js` run on every PR. **IMPORTANT — this gate must NOT flag the sanctioned design system.** It flags only *ad-hoc* usage (hand-written hex/rgb, raw Tailwind shade utilities, arbitrary values, non-token spacing/layout hacks, suppressions, placeholders). Because Tailwind tokens like `bg-primary`, `text-sm`, `font-semibold`, `rounded-lg`, `gap-4` are ALLOWED (they are the design system), the gate validates **class NAME context**: a class token is legal only if it is defined in the DESIGN.md token map (`@theme`), and illegal only when it is a raw shade (`blue-600`), a raw hex (`bg-[#fff]`), an arbitrary value on a layout axis, or exceeds the sanctioned spacing scale. `backdrop-blur` and `bg-gradient-to-*` are ALLOWED when the DESIGN.md component/page spec mandates them (e.g. the modal overlay spec requires `backdrop-blur 4px`) — so those are not blanket-banned; they are only flagged when used outside any specified location. Patterns that are always illegal (never legitimate in this design system):
```js
const ALWAYS_ILLEGAL = [
  // Raw colors that bypass the token system (never legitimate)
  /(?:#[0-9a-fA-F]{3,8}\b)/,                    // raw hex anywhere in src/*.tsx|ts|css
  /\b(?:rgb|rgba|hsl|hsla)\(/,                  // raw color functions
  /\b(?:blue|indigo|violet|purple|fuchsia|pink|red|rose|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|slate|gray|zinc|neutral|stone)-(?:[1-9]|1[0-4])\b/, // raw Tailwind shade, any step 1-900
  /bg-\[#[0-9a-fA-F]{3,8}\]/,                   // arbitrary hex utility
  // Suppressions (never legitimate)
  /@ts-ignore/, /@ts-expect-error/, /eslint-disable/, /stylelint-disable/,
  // Placeholder content (never legitimate in real screens)
  /lorem\s*ipsum/i, /\bAcme\b/, />Type your message here<\/>|placeholder="[^"]*(?:your|enter|todo|Lorem)[^"]*"/i,
  /jsonplaceholder|api\.github\.com\/users|your_app|insert_secret/i,
];
```
**Class-aware token rules (allowed ⇔ not allowed):**
```js
// Layout spacing on a per-token basis — only flag the sizes NOT in the DESIGN.md
// spacing scale (the scale is 0..20 rem: 0,0.25,0.5,0.75,1,1.25,1.5,2,2.5,3,4,5).
// p-24/p-28/p-32/p-36/p-40, m-24+, py-20+ are OUT of scale -> flag.
const Y_SECTION_PADDING_OUT_OF_SCALE = /p[xy]-(?:20|24|28|32|36|40)\b/;  // page sections
const SPACING_OUT_OF_SCALE = /\b(?:p|m|px|py|pt|pr|pb|pl|gap)-(?:20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)\b/;
// Raw space-y-* / space-x-* hacks (use gap in flex; grid gap instead) - always flag
const SPACE_HACK = /\bspace-[xy]-\d+\b/;
// Typography: flag ONLY weights/sizes/leading NOT in the DESIGN.md scale.
// The scale maps to: text-xs,sm,base,lg,xl,2xl,3xl,4xl for h1-h3/body/caption AND
// font-normal,medium,semibold,bold. Flag only contradictory/sub-atomic ones.
const TYPO_OUT_OF_SCALE = /text-(?:5xl|6xl|7xl|8xl|9xl)\b/;  // beyond h1 (text-4xl)
// Motion: these NEVER appear on static elements - blanket flag (design system has no
// sanctioned animate-* on static content).
const MOTION_OVERLOAD = /\banimate-(?:pulse|bounce|spin|ping)\b/;
const TRANSITION_ALL = /transition-all\b/;                  // use transition-colors/shadow/transform
// Accessibility: outline none is never allowed without a focus-visible ring
const FOCUS_KILLED = /\b(?:outline-none|focus:outline-none|outline: none)\b/;
// Unauthorized backdrop-blur / gradient OUTSIDE a spec'd location is caught by the
// authoring rule below (they ARE legal inside the modal overlay / hero spec).
```
**Authoring rule (resolves the backdrop-blur / gradient / style-prop false-positive problem):** instead of blanket-banning a class, the gate keeps a `spec` allowlist built from `docs/DESIGN.md`: any utility named in DESIGN.md Section 3 (Component Specifications) or per-page Section 4 is legal everywhere it's consistently used. `style={{...}}` is legal ONLY for dynamic animation state (opacity that changes, transform driven by scroll, conditional width) — flag `style=` only when it bakes in a static spacing/color/font value that belongs in a token (flag a heuristic: `style={{` followed by `color|margin|padding|fontSize|width` with a literal, but allow animation-only props like `opacity`/`transform`). Pass the gate with zero false positives by checking against `@theme` tokens, not against all class strings.
**Fail the lint stage on ANY always-illegal match, or any class-aware match that violates the DESIGN.md token map.** Design system = enforced contract; the gate validates token usage, not presence. `scripts/design-gate.js` implements these rules against `docs/DESIGN.md` + `@theme` tokens (see C3 — the script ships with the skill).

**Active LEARNINGS.md Evolution (injected into ralph supervision):**
Every 10 stories, ralph supervisor reads `<project-root>/LEARNINGS.md`
(flock-locked, written by engine, shared across all builder runs) and:
- **Failed patterns** → avoid repeating (e.g., "Prisma relation load caused N+1 in 3 projects")
- **Successful patterns** → prefer (e.g., "shadcn Sheet for mobile drawers reduced a11y issues")
- **Skill performance** → swap underperforming skills mid-run (recorded in `DECISIONS.md`)
- **Token drift patterns** → tighten CI gate if hex literals recur
This makes each run **smarter than the last** without human intervention.

**Skill Performance Telemetry** — see **Self-Evolution Layer §A** (line 238) for the canonical definition. Every story appends flock-locked JSONL to `<project-root>/TELEMETRY.jsonl` with PII-scrubbed story IDs; `scripts/telemetry-migrate.js` handles v1→v2 schema migration.

**Phase 2 Core Sub-Stories (auto-generated, run in order):**
- **US-002:** Token-to-code handoff (DESIGN.md → CSS vars + Tailwind @theme with OKLCH)
- **US-003:** Database seed strategy — `prisma/seed.ts` with real data for
  all models; `pnpm run db:seed` works in LOCAL/DEV/STAGING. **Seed data is
  realistic but fictional** — full-length names/emails/phones generated by a
  name/genrator or faker-style lib, never scraped or real people's data.
  A `scripts/pii-verify-seed.ts` check runs after seeding: parses the seeded
  rows for real-person markers (valid PII that maps to a live human) and
  fails the build if any non-fictional personal data is found. Seed PII is
  anonymized at the source, so it is safe to commit and to ship in STAGING.
- **US-004:** Auth.js v5 configuration — Passkey/WebAuthn as primary auth (device-bound + synced), email magic link fallback; providers (GitHub, Google); callbacks, session strategy, middleware; `AUTH_SECRET` from env; passkey autofill/sync configured
- **US-005:** Environment promotion — Docker Compose for LOCAL/DEV/STAGING/
  PROD with separate DBs, `.env.*` files, `pnpm run env:promote`. **Env
  enforcement (fail-fast):** `.env.example` is committed (the schema of every
var, no secrets) and `.env*` is gitignored except `.env.example`. Every
    module validates its required vars at import/startup via a typed
    `env.ts` (Zod); a missing required var **fails startup with a named list**
    (never a silent runtime `undefined` crash deep in a request). A CI
    `env-check` step runs `env.ts` against `.env.example`-derived values so a
    stale or missing `.env.example` entry is caught at PR time, not in prod.
    **Same rule for transient run artifacts:** `.run-model` (the dashboard's
    model record, written at Phase 0) and `.dashboard-url` (the dashboard's
    URL/port record, written when the dashboard starts) are gitignored like
    `.env*` — they are per-run snapshots of the host's model choice and the
    dashboard's address, not project decisions.
- **US-006:** CI/CD pipeline — GitHub Actions: lint, typecheck, test, build,
  Strix scan, deploy to Vercel (preview) / Docker (prod)
- **US-007:** Observability — Sentry (errors), PostHog (analytics),
  OpenTelemetry JS (traces, metrics, logs auto-instrumented), web-vitals to console; `observability-and-instrumentation`
- **US-008:** Backup/restore automation — `scripts/db-backup.sh`,
  `scripts/db-restore.sh`, verified in Phase 3 gate. Covers **all durable
  state**, not just Postgres: Redis (BGSAVE/RDB snapshot or AOF) and
  object-storage-dependent data (the storage abstraction's DB metadata) are
  backed up and restored in the same drill, so the restore is app-consistent
  (Postgres + Redis + file references line up), not a DB-only restore.
- **US-009:** Vercel AI SDK 4+ integration — Streaming responses, tool calling, generative UI patterns; `lib/ai.ts` with provider abstraction; `agent-elements` chat UI integration; RAG pipeline with pgvector

Load the design skills at the right moment during supervision and final
gates — matching `vibe-build` section 3's table, with the design-execution
row always including: `ui-ux-pro-max`, `design-taste-frontend`, `impeccable`
(load `reference/craft-floor.md` before any UI edit, per its rules),
`frontend-design`, `emil-design-eng`, `building-components`, `shadcn`,
`magic-ui`, `ui-styling`, `web-design-guidelines`, `frontend-ui-engineering`,
`vercel-composition-patterns`, `vercel-react-view-transitions`.

### Ralph Loop Enhancements (injected into vibe-build supervision)

**Story Retry with Exponential Backoff**
- Failed story → retry up to 3× with backoff: 30s, 60s, 120s
- Each retry increments `retry_count` in telemetry
- After 3 failures → mark story `blocked`, continue to next independent story
- Blocked stories revisited after all independent stories complete

**Story Dependency Graph (parallel execution where safe)**
Ralph supervisor builds DAG from `prd.json`:
- `depends_on` field added to each story (auto-inferred from spec-kit task deps)
- Independent stories (no deps) → run in parallel (max 3 concurrent)
- Dependent stories → wait for deps to `passes: true`
- Visualized in `docs/STORY_GRAPH.md` (Mermaid)

**Cost/Token Budget Enforcement**
- Budget declared in `CONSTRAINTS.md`: `max_tokens: 500000`, `max_cost_usd: 50`
- Supervisor tracks cumulative tokens/cost per story via telemetry
- At 80% budget → warn in logs, skip non-critical stories (marked `deferred`)
- At 100% → halt with `BUDGET_EXCEEDED`, output `docs/BUDGET_REPORT.md`
- Resume with `--budget-resume` continues from `progress.txt`

**Partial Resume (crash recovery)**
- `progress.txt` (JSONL, flock-locked) updated after each story:
  ```json
  {"last_completed":"US-007","blocked":["US-012"],"deferred":["US-015"],"ts":"2026-09-09T..."}
  ```
- **Atomic commit per story.** Each successfully passing story is committed
  immediately (`git add -A && git commit -m "US-0NN: <summary>"`) before the
  next story starts. This is what makes the crash-recovery rollback below
  safe and gives every change a reviewable boundary. Stories failing to pass
  are NOT committed — the next story starts from a known-good tree. (This is
  the project-side counterpart to the skill's own additive-only self-edit
  discipline.)
- On re-run: reads `progress.txt`, skips `passes: true` stories
- If crashed mid-story: rolls back git to last commit, re-runs story
- `prd.json` + `progress.txt` = complete resumable state
- `--resume-from <path>` loads alternate progress file

**Phase 2 Extended Sub-Stories (auto-generated, run in order):**
- **US-010:** Visual regression testing — Playwright 1.48+ + pixelmatch in CI; baseline screenshots in `docs/visual-baselines/`; PR gate fails on >0.1% pixel diff; Storybook 9+ + Chromatic for component-level visual regression
- **US-011:** Bundle size tracking — `next-bundle-analyzer` + CI gate; budgets: JS <200KB gzipped, CSS <50KB; tracked in `docs/bundle-report.json`. The budget applies to the **initial route**; lazy-loaded motion/3D chunks (Three.js/GSAP/Rive per US-061/062) are listed separately in `docs/bundle-report.json` and are NOT counted in the initial-route number — but any lazy chunk that lands on a first-visit viewport without an interaction trigger is reclassified as initial and fails the gate. This keeps the 200KB promise real while allowing a single signature heavy moment (see US-062).
- **US-012:** OpenAPI docs generation — from Zod schemas + route handlers; `swagger-ui` at `/docs/api`; validated in CI
- **US-013:** Preview environments per PR — Vercel preview + unique Neon DB branch per PR; `DATABASE_URL` auto-injected; cleanup on PR close
- **US-014:** Feature flag system — Unleash OSS in Docker; flags in `lib/flags.ts`; gradual rollout %; audit log
- **US-015:** API contract testing — Pact consumer-driven contracts; provider verification in CI; `api-and-interface-design` integration
- **US-016:** Secrets scanning in CI — TruffleHog + git-secrets; blocks merge on detected secrets; allowlist in `.secrets-allowlist`
- **US-017:** Chaos engineering — **K8s path:** LitmusChaos in staging; pod kill, network latency, DB failover; SLO validation. **Non-K8s path (Vercel/Docker):** `toxiproxy` in Docker Compose for network faults; `docker kill <container>` for pod-sim; `pg_isready` + manual DB failover drill. Any path must exercise the same scenarios (latency injection, node loss, DB failover). Record which tool ran in `DECISIONS.md` so the Phase 3 chaos gate references the right evidence.
- **US-018:** Migration rollback test — `prisma migrate resolve --rolled-back` verified in Phase 3; `scripts/db-rollback-test.sh`
- **US-019:** Webhook/event architecture — Svix for outbound; retry with exponential backoff; dead-letter queue; idempotency keys
- **US-020:** i18n scaffolding — `next-intl` with en/es/fr/ja; RTL support; locale routing; `lib/i18n.ts`
- **US-021:** SBOM + license compliance — CycloneDX via `syft`; `license-checker` in CI; fail on GPL/AGPL; `docs/SBOM.json`
- **US-022:** Automated dependency updates — Renovate PRs with test results; auto-merge patch/minor; major requires review
- **US-023:** Runtime app self-protection (RASP) — `express-rate-limit` + `helmet` + CSP; `arcjet` for bot/attack detection; bot detection middleware
- **US-024:** Multi-tenancy data isolation — configurable strategy: `row-level` (RLS policies), `schema-per-tenant`, or `database-per-tenant`; `lib/tenancy.ts` with middleware; Neon/PlanetScale support
- **US-025:** Edge runtime / middleware — **Edge-safe duties (deployed to `middleware.ts` with `edge` runtime):** auth/session validation (Auth.js Edge adapter or `jose` JWT verify), geo-routing, A/B test bucketing, lightweight header checks, redirect logic. **Node-only duties (stay on the Node server):** Arcjet bot detection/rate limiting (US-023), Socket.io (US-026), Prisma queries, background jobs, email sends, Stripe webhooks — these depend on Node APIs and are NOT placed in Edge middleware. Conflict resolution: if a middleware duty needs Prisma, Node's `process`, or a native Node lib, it stays in the Node middleware path; the Edge `middleware.ts` calls it via an internal API route or passes the request to the Node handler. Cloudflare Workers / Vercel Edge / Deno Deploy config; WinterCG compliance; fallback to Node for anything non-Edge-compatible.
- **US-026:** Real-time / WebSocket infrastructure — **Node-only.** Socket.io server in Docker; Redis adapter for horizontal scaling; `lib/realtime.ts`; `agent-elements` streaming chat integration; Pusher/Ably fallback. (Socket.io requires a persistent Node process with HTTP upgrade support — it cannot run in Edge runtimes. If the deployment target is Edge-only with no Node server, use Pusher/Ably/PartyKit as the primary instead of a fallback.)
- **US-027:** Real-time collaboration (optional, gated by product type) — PartyKit / ElectricSQL / Liveblocks / Yjs for CRDT-based sync; `lib/collab.ts`; presence, cursors, conflict resolution; integrate with Prisma
- **US-028:** Server-Sent Events (SSE) — Native SSE via Next.js Route Handlers with ReadableStream; `lib/sse.ts`; notifications, live data updates; fallback to WebSocket
- **US-029:** Background job queue — BullMQ + Redis; `lib/queue.ts` with typed jobs; scheduled (cron), delayed, retry with backoff; dashboard at `/admin/queue`; Bull Board UI
- **US-030:** File storage / CDN strategy — abstraction `lib/storage.ts` (S3, Cloudflare R2, Vercel Blob, local); signed URLs; multipart upload; image optimization via `next/image` loader; CDN cache rules
- **US-031:** Email template system — `react-email` with MJML; `emails/` folder with components; preview at `/dev/emails`; `lib/email.ts` send wrapper; Resend/SendGrid/SES transport; test mode logs to console
- **US-032:** Admin panel scaffolding — `/admin` route (RBAC protected); shadcn DataTable for users/tenants/jobs; `agent-elements` chat for support; audit log viewer; feature flag toggle; read-only by default
- **US-033:** Mobile app / React Native bridge — Expo SDK 54+; shared `lib/api.ts` + `lib/types.ts`; `expo-router` + `react-native-web` for code sharing; push notifications via Expo Push; `apps/mobile/` in monorepo
- **US-034:** GraphQL / tRPC option — `tRPC` v11 (preferred) with `next-trpc`; or `GraphQL Yoga` + `Pothos`; `lib/trpc.ts` router; type-safe client; `agent-elements` streaming via tRPC subscriptions
- **US-035:** Event sourcing / CQRS — `EventStoreDB` in Docker; `lib/events.ts` aggregate + projector; read models in Prisma; `lib/commands.ts` + `lib/queries.ts`; snapshotting; replay CLI
- **US-036:** Automated database indexing advisor — `pg_stat_statements` + `prisma-query-analyzer`; k6 slow queries → suggested indexes in `prisma/schema.prisma`; CI gate on missing indexes
- **US-037:** Query complexity analysis (N+1 detection) — `prisma-query-analyzer` in CI; detects N+1, cartesian products, missing `select`; fails build on regression; `docs/query-report.json`
- **US-038:** Automated test generation from OpenAPI — `openapi-generator` → integration tests from `docs/openapi.json`; `tests/generated/` committed; runs in CI
- **US-039:** Contract testing for webhooks — Svix webhook signatures verified in CI; `tests/contracts/webhooks.test.ts`; payload schema validation; replay from dead-letter
- **US-040:** Feature flag analytics — Unleash metrics → PostHog/Mixpanel; `lib/flag-analytics.ts`; conversion funnels per flag; `docs/flag-analytics.json`
- **US-040a:** Feature-flag lifecycle governance — every flag has a recorded owner + expiry; a `scripts/flag-drift.sh` (cron, tracked in Phase 3) flags any flag **never toggled in the last 90 days OR left at a non-default rollout for 90+ days** as `retire-candidate`; resolution is explicit — **remove the flag and its dead branches from code** (not just hide the toggle), or record the renewal rationale in `DECISIONS.md`. Dead flags are never left accumulating (the "feature-flag as decision" anti-pattern at the UI spine — flags for things that should just be decisions).
- **US-041:** A/B testing framework — GrowthBook / PostHog experiments; `lib/experiments.ts`; variant assignment; statistical significance; auto-promote winner
- **US-042:** Error budget / SLO tracking — `sloth` + Prometheus; SLOs: availability 99.9%, latency p99 <500ms; burn rate alerts; `docs/SLO.md`
- **US-043:** Database PITR (Point-in-Time Recovery) — Neon / AWS RDS / PlanetScale PITR verified; `scripts/pitr-test.sh`; RPO <1min; restore drill in Phase 3
- **US-044:** Cross-region replication — Neon read replicas / Fly.io multi-region / PlanetScale; `lib/db.ts` region-aware; failover test in chaos engineering
- **US-045:** Automated security headers audit — `security-headers` CI check; `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`; fail on missing
- **US-046:** CSP nonce generation — `next-csp` for inline scripts/styles; `lib/csp.ts`; dynamic nonces per request; `script-src 'nonce-...'`; report-only mode first
- **US-047:** Cookie security audit — `HttpOnly`, `Secure`, `SameSite=Lax` validated in CI; `lib/cookies.ts`; `__Host-` prefix for auth cookies; partition support
- **US-048:** Dependency confusion protection — npm scopes (`@org/*`); private registry (Verdaccio/GitHub Packages); `npmrc` enforce; `dependency-confusion` scanner in CI
- **US-049:** Supply chain attestation (SLSA) — `slsa-framework` GitHub Actions; provenance (SLSA v1); `docs/attestation.intoto.jsonl`; verify in deploy
- **US-050:** Runtime vulnerability scanning — `trivy` / `grype` on container images; `docker/scout` SBOM; fail on CRITICAL/HIGH; `docs/vuln-report.json`
- **US-051:** Log aggregation / querying — Loki + Promtail in Docker; `lib/logging.ts` structured JSON; Grafana dashboards; `lib/logs.ts` query API; retention 30d
- **US-052:** Distributed tracing visualization — Tempo + OpenTelemetry Collector; `lib/tracing.ts` auto-instrument; Grafana TraceQL; service map; latency heatmap
- **US-053:** Custom metrics / business KPIs — Prometheus custom metrics; `lib/metrics.ts`; revenue, activation, retention, LTV; `docs/KPI.md`; alerting rules
- **US-054:** Feature flag rollout automation — **K8s path:** Argo Rollouts / Flagger; progressive delivery; canary analysis (Istio/Linkerd); auto-rollback on SLO breach. **Non-K8s path (Vercel/Docker):** progressive delivery via Unleash flags (US-014) + percentage-based rollout; Vercel's `vercel promote` for staged traffic shifts; Prometheus/Sentry metrics drive the rollback decision; `lib/rollback.ts` handles instant revert to the previous deployment. K8s tools are only installed when a real cluster or `kind`/`k3d`/`minikube` is detected; otherwise this story defers to US-055 and the flag-based path.
- **US-055:** Canary deployment for frontend — Vercel traffic splitting / Cloudflare Workers; `middleware.ts` cookie-based bucketing; gradual %; instant rollback
- **US-056:** Database migration safety — `pg_lock` check before migrate; `prisma migrate deploy` with `advisory_lock`; per-table lock timeout; `scripts/migration-safety.sh`
- **US-057:** Zero-downtime deployment verification — traffic shadowing (Mirror) to new version; diff response bodies; automated rollback on diff > threshold
- **US-058:** Rollback automation on metric regression — **K8s path:** Argo Rollouts analysis; Prometheus metrics → auto-rollback; `lib/rollback.ts`; manual override. **Non-K8s path (Vercel/Docker):** Sentry/Prometheus metric regression → trigger `vercel rollback` (instant) or `git revert + redeploy`; `lib/rollback.ts` wraps the appropriate API for the deployment target; manual override included.
- **US-059:** Cost allocation / chargeback — **K8s path:** OpenCost + Kubecost; per-tenant / per-feature cost; `lib/cost.ts`; monthly report `docs/cost-report.json`; budget alerts. **Non-K8s path (Vercel):** Vercel Usage Dashboard data + `lib/cost.ts` aggregation from Vercel API exports; per-route cost estimation from function invocations + bandwidth; monthly report same format as K8s path. Only installed when a K8s cluster is detected; otherwise the Vercel path is the default.
- **US-060:** GDPR Right to be Forgotten automation — `lib/gdpr.ts` deletion workflow; cascading soft-delete; anonymization pipeline; `scripts/gdpr-delete.sh`; audit log
- **US-061:** Modern animation stack — Framer Motion 12+ for orchestration/springs/AnimatePresence; Motion One for lightweight animations; GSAP 3.13+ + ScrollTrigger for scroll-driven animations; CSS `@starting-style` for entry animations; anchor positioning for tooltips/popovers; container queries for component responsiveness; `animation-timeline` for scroll-linked animations; integrate in Phase 4 animate step
- **US-062:** 3D/WebGL (optional, gated) — React Three Fiber 9 + Three.js r160+ for data viz/product configurators; Rive/Lottie for complex animated illustrations; `lib/three.ts` + `lib/rive.ts`; magic-ui integration for hero effects. **Bundle-budget / hydration contract (non-negotiable given the 200KB JS gate in US-011):** Three.js (~600KB), Rive, and GSAP are heavy — they MUST be code-split and lazy-loaded.
  - **Never imported in a Server Component or the app shell.** Any R3F/Three/GSAP/Rive heavy module ships in a `dynamic(() => import(...), { ssr: false })` client-only boundary, loaded only when its section enters the viewport (IntersectionObserver), so the initial route stays under the 200KB JS budget and the 3D code is never in the SSR/initial HTML.
  - **Budget accounting.** `docs/bundle-report.json` (US-011) lists the heavy chunk separately; the gate enforces: initial-route JS ≤200KB gzipped (3D/motion chunks are lazy and NOT counted in initial), and any above-budget heavy chunk must be justified by a Section 7 signature element (three.js/high-motion hero is valid only as THE product's one signature, not per-section decoration).
  - **Hydration:** the 3D mount happens client-side only; no server-rendered `<canvas>` placeholders, no `useLayoutEffect`-in-SSR warning. Suspense fallback is a static, on-brand placeholder (per DESIGN.md skeleton spec) — never a blank or spinner-only div.
  - **Perf guardrails:** `dpr` capped, `frameloop="demand"` when static, geometries/renderers disposed on unmount, and no animation on prefers-reduced-motion. If the project ships localStorage/telemetry, the 3D bundle is not fetched for users who opt out of heavy content.
- **US-063:** React 19 features — `useOptimistic` for all mutations (integrate with TanStack Query v5); `useActionState` for form handling; `use()` + Suspense for streaming UI; Server Actions with streaming; update all forms and data mutations
- **US-064:** State management architecture — TanStack Query v5 for server state (caching, invalidation, prefetching); TanStack Router for type-safe routing; Zustand 5 for global client state (UI, preferences); Jotai 3 for atomic state; React Context for theme/auth; document in BLUEPRINT.md
- **US-065:** pgvector / RAG pipeline — Enable pgvector on Prisma Postgres; vector column in Prisma schema; `lib/rag.ts` with document ingestion, chunking, embedding (OpenAI/Voyage), retrieval; integrate with Vercel AI SDK 4+; `agent-elements` chat with citations
- **US-066:** Database provider choice — Prisma Postgres (default), Neon serverless, PlanetScale, Turso/libSQL; Drizzle ORM alternative for edge-compatible projects; configure in Phase 0; `prisma-database-setup` + `prisma-postgres-setup`
- **US-067:** Legal/Compliance pages — Terms of Service, Privacy Policy, Cookie Policy, Data Processing Agreement (DPA), Security Policy, Accessibility Statement (WCAG 2.2 AA), Subprocessor List; auto-generated from data model + gdpr-data-handling config; `react-email` for rendering; `/legal/*` routes
- **US-068:** Cookie Consent Banner (CMP) — shadcn Dialog + `useCookieConsent` hook; categories: necessary, analytics, marketing; integrate with GTM/PostHog/analytics; geo-aware (GDPR/CCPA); persist to localStorage + cookie
- **US-069:** Automated legal document generation — Parse Prisma schema → identify PII fields → generate Privacy Policy/ToS/DPA templates; subprocessor list from package.json + service configs; update on schema change
- **US-070:** Trusted Types + COOP/COEP — Enable Trusted Types via CSP; `trusted-types` library for DOMPurify integration; COOP: same-origin, COEP: require-corp headers via middleware; prevent DOM XSS + Spectre
- **US-071:** Session replay — Highlight.io / LogRocket integration; mask sensitive data (PII, passwords, credit cards); add to Phase 3 gates; `lib/replay.ts`
- **US-072:** Monorepo tooling (optional) — Turborepo default; pnpm workspaces; separate apps (web, api, docs) + packages (ui, config, db, types); Changesets for versioning; `docs/CHANGELOG.md` auto-generated
- **US-073:** Modern GitHub Actions — Reusable workflows, matrix testing, dependency caching, Slack notifications, deployment gates; `ci-cd-and-automation` skill integration; `.github/workflows/*.yml`
 - **US-074:** OpenCodeReview AI code review — `@alibaba-group/open-code-review` v1.11.6+; `ocr review` in CI (GitHub Actions/GitLab CI/Gerrit); delegation mode (`ocr delegate`) for agent-driven review; multi-language rules (NPE, thread-safety, XSS, SQL injection); path filtering via `.opencodereview/rules/`; session viewer for browsing/replaying findings; MCP server for external tools; OpenTelemetry telemetry; hybrid deterministic + LLM architecture; benchmark: ~1/9 tokens, higher precision/F1; Phase 3 gate: zero CRITICAL/HIGH findings, with a defined degradation path to Semgrep/Strix if the CLI can't install (see §K)
- **US-075:** Semgrep 2026 multimodal AI security — SAST/SCA/Secrets/Guardian/Multimodal/Workflows; reachability analysis for SCA (98% FP reduction); semantic secrets detection (630+ types); Guardian for AI-generated code; AppSec Platform org-wide enforcement; Agentic Workflows for security pipelines; MCP integrations for Cursor/Replit; 3.5x more true positives vs AI alone; `semgrep ci` in GitHub Actions; `semgrep scan` pre-commit via Husky
- **US-076:** Bearer CLI + OSV Scanner + CodeQL — Bearer CLI: free open SAST, PII/PHI detection, privacy by design, CI/CD integration; OSV Scanner: OSV.dev vulnerability database for dependencies; CodeQL: GitHub Advanced Security, custom queries, variant analysis; all three in CI pipeline
- **US-077:** DAST + eBPF runtime security — OWASP ZAP / StackHawk / Escape / Probely for DAST; Falco / Tetragon / Cilium / Tracee for eBPF runtime security (container, host, network); CVE monitoring via OSV / GitHub Advisory / NVD API; Cosign / sigstore / rekor / fulcio for keyless signing and SLSA provenance attestation; container image signing and verification
- **US-078:** Osano CMP enterprise compliance — Osano Cookie Consent (50+ countries, 95+ regulations, 45+ languages); single JS line integration, auto-localization, AI cookie classification, banner preview, multi-site management, "No Fines, No Penalties" guarantee ($500k); consent logs for audit; supports opt-in (GDPR), opt-out (CPRA), notice-only; open-source alternatives: Klaro, cookie-consent
- **US-079:** Extended legal/compliance pages — Acceptable Use Policy (AUP), Refund/Cancellation Policy, SLA/Uptime Guarantees, Export Controls (EAR/ITAR), Age Verification (COPPA/GDPR-K/UK Children's Code), DMCA Policy; auto-generated from templates + Osano; `/legal/*` routes
- **US-080:** PostgreSQL 17+ + Prisma 8 contract-based + Drizzle v1.0 + Kysely — Explicit PostgreSQL 17+ requirement; Prisma 8 TypeScript runtime, contract-based data models (JSON + TS types), composable query DSL, graph-based migrations (schema state hashes), extensible SPI, AI-agent friendly; Drizzle ORM v1.0 relational queries v2, MSSQL/CockroachDB support, drizzle-kit rewrite, catalogs, patch dependencies, runtime management; Kysely 0.29+ type-safe SQL query builder, zero runtime deps, runs everywhere (Node/Deno/Bun/Workers/Browser), kysely-codegen; PGlite + TanStack DB for local-first sync
- **US-081:** Vercel Fluid Compute + Cloudflare Workers + Deno Deploy + Edge middleware patterns — Vercel Fluid Compute pricing, framework-aware (Next.js 16 proxy.ts/middleware.ts), Edge Config/Blob/KV; Cloudflare Workers: zero cold starts, 330+ cities, CPU-time billing, Smart Placement, R2/D1/KV/Queues/Workers AI, Python/Rust/WASM; Deno Deploy: V8 isolates, native TypeScript; Bun: native SQLite, fast startup; Edge middleware: auth, rate limiting, A/B testing, geo-routing, caching at edge; WinterCG standard APIs
- **US-082:** Grafana Cloud AI Observability + Vercel Observability + Highlight.io PII masking — Grafana Cloud: AI Assistant, Agent Observability, Investigations, Adaptive Telemetry (35-50% cost savings), Kubernetes Monitoring, Frontend Observability (RUM), Synthetic Monitoring, k6 load testing, IRM, OnCall; Vercel Observability: framework-aware insights, anomaly detection, custom queries, logs with trace correlation, Web Analytics (first-party, privacy-friendly), Speed Insights (Core Web Vitals), OTEL export to Datadog/New Relic, Log Drains; Highlight.io: session replay with PII masking configuration, error monitoring, logging
- **US-083:** LangGraph + Vercel AI Gateway + Workflows + Local LLMs + MCP + AI Elements — LangGraph: stateful agents, workflows, human-in-the-loop; Vercel AI Gateway: 100+ models, no markup, single API key; Workflows: long-running agents, suspend/resume, survive timeouts; Local LLMs: Ollama, LM Studio, vLLM, TGI, llama.cpp; MCP servers for tool integration; AI Elements (npx ai-elements): pre-built AI UI components; Cohere v3/Jina/Voyage reranking for RAG
- **US-084:** WebTransport + Automerge 2.0 + RGA/Peritext + ElectricSQL v1 managed — WebTransport: HTTP/3 bidirectional streams; Automerge 2.0: JSON-like CRDT; RGA/Peritext: rich text CRDTs; ElectricSQL v1: managed agents on sync engine, durable streams (append-only, persistent, addressable), HTTP/JSON protocol, CDN cacheable, works with TanStack DB/PGlite/any Postgres; Liveblocks MCP server for room/thread/comment inspection
- **US-085:** pnpm 12.x advanced + Husky/lint-staged + Changesets v3 + IDE integration — pnpm catalogs (shared versions), strict node_modules, supply chain security (build script approval), patch dependencies, runtime management (Node.js per project), JSR registry support; Husky + lint-staged pre-commit hooks; Changesets v3 for monorepo versioning; IDE: Cursor (AI-first), VS Code Copilot, Zed (Rust-based, collaborative); GitHub Actions composite actions, pnpm store caching
- **US-086:** TanStack Start + Waku + Hono+React + RedwoodJS v7+ alternative frameworks — TanStack Start: router-first full-stack, SSR/streaming/server functions/middleware, portable across Vercel/Cloudflare/Netlify/Render/Railway/Node.js; Waku: React framework on Hono; Hono + React: lightweight edge-first; RedwoodJS v7+: full-stack with React Server Components; configured in Phase 0 as alternative to Next.js 15
- **US-087:** Stripe billing + subscriptions (SaaS-only) — `stripe` SDK + `stripe/react` + `@stripe/stripe-js`; product/catalog sync, checkout sessions, customer portal, webhook handling (checkout.session.completed, invoice.paid/finalized, customer.subscription.updated/deleted) with idempotency keys and signature verification; subscription state machine (active/trialing/past_due/canceled/unpaid) mirrored in Prisma `Subscription` + `Payment` models; plan entitlements in a `Plan` table consumed by `lib/plans.ts`; no hardcoded plan-gating anywhere. Credentials deferred (env `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) — run against Stripe test mode with a recorded test key fallback; list as real-account deferral in the final report.
- **US-088:** Stripe test-mode integration + billing UI (SaaS-only) — billed state surfaces: pricing/plans page, subscribe, manage-billing portal, invoice history, plan-change proration, cancel + confirmation; `lib/billing.ts` wrapper so every payment path routes through one place; error/empty/loading states per DESIGN.md (US-087/088 depend_on US-002; US-088 depends_on US-087). Tested with Stripe test-mode + deterministic test cards; no fake "paid"/"sent".
- **US-089:** Payment success/failure + revenue telemetry (SaaS-only) — webhook → telemetry events (revenue, MRR, churn, upgrade/downgrade) into PostHog/OTel; failed-payment retry workflow (dunning emails via the email system, subscription.past_due handling); admin revenue dashboard data (list of customers, MRR, churn) behind the same role guard used by the `/admin` route (US-032) — no unauthenticated or non-admin access.

> **Billing caveat (matches the credentials deferral rule):** US-087/088/089 are generated ONLY for SaaS products (the `SaaS` row in the dynamic phase table). The Stripe account is a real-account credential that is env-gated and deferred; the stories run fully against **Stripe test mode** and every external-account assumption is recorded in `DECISIONS.md` and the final report. When no Stripe account exists, the app still ships a working subscription state machine + billing UI driven by the Prisma model, with the Stripe webhook layer injected behind the `lib/billing.ts` interface so real keys slot in later without rework.

### CONSTRAINTS.md + CONSTITUTION.md Merge Logic

Both files govern quality. Resolution:
- `CONSTITUTION.md` (spec-kit) = **principles** (what we value: security, UX,
  performance, testability, maintainability)
- `CONSTRAINTS.md` (constraint-driven-development) = **measurable thresholds**
  (coverage ≥80%, p95 <200ms, zero critical vulns, no `@ts-ignore`)
- **Merge:** `CONSTRAINTS.md` imports `CONSTITUTION.md` principles as
  named constraints with thresholds. Example:
  ```markdown
  ## Security (from CONSTITUTION.md principle: security)
  - Zero critical/high vulnerabilities (Strix): PASS/FAIL
  - All inputs validated (Zod): 100% coverage
  ```
- **Conflict:** CONSTRAINTS.md threshold wins (measurable); record override
  in `DECISIONS.md` with rationale

### Phase 3 — final gates (engine-owned)

**FIRST GATE (before ANY code):**
- [ ] **DESIGN.md completeness gate:** `docs/DESIGN.md` exists and contains ALL 11 sections:
      1. Design Tokens (OKLCH, exact values — no placeholder/variable references) — **dark-mode pairings for EVERY semantic color; both themes mandatory, class-based toggle, AA on both**
      2. Layout Grid (exact max-width, gutters, margins, breakpoints)
      3. Component Specifications (every component in the app with exact height, padding, font, radius, bg, border, shadow, focus, hover, active, disabled states)
      4. Page Layout Specs (every screen with exact layout, section order, component placement, responsive behavior, skeleton, empty, error states)
      5. Interaction Patterns (navigation, forms, toasts, hover states — exact behavior)
      6. Anti-Slop Constraints (20 hardcoded laws)
      7. Design Ambition & Distinctiveness Mandate (signature interaction + visual texture + 3D/motion intensity named explicitly, distinctiveness checklist all YES)
      Verify: grep for placeholder text ("TODO", "TBD", "use appropriate", "style as needed", "pick a color"). If ANY found → BLOCK Phase 2.

Run `builder`'s Phase 3 completely and in order: COMPLETE proof, clean-DB
migration check, backup/restore exercise, CI/CD staging smoke, no-mock-data
gate, security minimums, Strix pentest (with `owasp-top-10-testing`
wiring), vibe-build 6c checklist validation, code review +
`security-review`, `doubt-driven-development` adversarial pass, browser
verify, `vercel-optimize` performance pass, k6 load test, integration
state-machine check, AI self-audit, production gate table. Then additional
gates before Phase 4:

- [ ] Run `impeccable critique` on the three highest-business-value surfaces
      (chosen from `docs/PRD.md` success metrics — the surfaces whose design
      affects the product's core metric, never guessed); fix every
      HIGH/CRITICAL finding in one batch before proceeding.
- [ ] **Spec-kit Convergence gate:** `/speckit.implement` reports all tasks
       done (no drift against SPEC.md/PLAN.md) **and** `/speckit.checklist`
       reports no missing requirement coverage. If not converged, return to
       Phase 2 ralph loop with appended corrective tasks. (Spec-kit v0.8.x
       has no `/speckit.converge` command — `implement` + `checklist` are the
       real convergence mechanism; see Phase 2 §2.)
- [ ] **Automated PR description** — generated from `DECISIONS.md` + story titles; posted to GitHub PR
- [ ] **Release notes / changelog** — generated from git commits + `DECISIONS.md`; `docs/CHANGELOG.md`
- [ ] **Database schema visualization** — `prisma generate` → Mermaid ERD in `docs/ERD.mmd`
- [ ] **Component Storybook generation** — auto-generate stories from shadcn components; `pnpm run storybook`
- [ ] **Accessibility regression testing** — axe-core in CI on every PR; `pnpm run test:a11y`
- [ ] **Performance budgets in CI** — Lighthouse CI budgets: CLS <0.1, LCP <2.5s, TBT <200ms
- [ ] **Bundle size gate** — CI fails if JS >200KB gzipped or CSS >50KB
- [ ] **E2E test recording** — Playwright codegen during IMPROVISE; saved to `tests/e2e/recorded/`
- [ ] **Seed from production dump (anonymized)** — `pg_dump` → anonymize → seed; `scripts/seed-from-prod.sh`
- [ ] **Disaster recovery drill** — automated `scripts/db-restore-drill.sh`; runs weekly via cron; logs to `docs/dr-drill.log`
- [ ] **Compliance evidence package** — SOC2/ISO artifacts: `docs/compliance/` (access logs, encryption proof, backup verification)
- [ ] **Threat model document** — STRIDE analysis from `security-and-hardening`; `docs/THREAT_MODEL.md`
- [ ] **Data flow diagram** — GDPR data flows visualized; `docs/DATA_FLOW.mmd`
- [ ] **Runbook / incident response** — `docs/RUNBOOK.md` (on-call, escalation, common incidents, rollback steps)
- [ ] **Capacity planning / scaling rules** — k6 results → HPA config; `docs/SCALING.md`
- [ ] **Team onboarding docs** — `docs/ONBOARDING.md` (setup, commands, architecture, debugging)
- [ ] **ADR template** — `docs/adr/TEMPLATE.md`; `documentation-and-adrs` skill integration
- [ ] **Database indexing advisor** — `pg_stat_statements` → suggested indexes in `prisma/schema.prisma`; CI gate
- [ ] **Query complexity analysis** — `prisma-query-analyzer` in CI; N+1 detection; `docs/query-report.json`
- [ ] **Test generation from OpenAPI** — `openapi-generator` → `tests/generated/`; runs in CI
- [ ] **Webhook contract testing** — Svix signatures verified; payload schema validation; dead-letter replay
- [ ] **Feature flag analytics** — Unleash → PostHog/Mixpanel; conversion funnels; `docs/flag-analytics.json`
- [ ] **A/B testing framework** — GrowthBook/PostHog; statistical significance; auto-promote winner
- [ ] **Error budget / SLO tracking** — `sloth` + Prometheus; burn rate alerts; `docs/SLO.md`
- [ ] **Database PITR verified** — Neon/RDS/PlanetScale PITR; `scripts/pitr-test.sh`; RPO <1min
- [ ] **Cross-region replication** — Read replicas / multi-region; failover test in chaos
- [ ] **Security headers audit** — CI check: `Permissions-Policy`, `COOP`, `CORP`; fail on missing
- [ ] **CSP nonce generation** — `next-csp` dynamic nonces; report-only → enforce; `lib/csp.ts`
- [ ] **Cookie security audit** — `HttpOnly`/`Secure`/`SameSite` validated; `__Host-` prefix; partition
- [ ] **Dependency confusion protection** — npm scopes; private registry; `dependency-confusion` scanner
- [ ] **Supply chain attestation (SLSA)** — `slsa-framework` provenance; `docs/attestation.intoto.jsonl`
- [ ] **Runtime vulnerability scanning** — `trivy`/`grype` on containers; fail on CRITICAL/HIGH; `docs/vuln-report.json`
- [ ] **Log aggregation / querying** — Loki + Promtail; Grafana dashboards; `lib/logs.ts` query API
- [ ] **Distributed tracing visualization** — Tempo + OTel Collector; Grafana TraceQL; service map
- [ ] **Custom metrics / business KPIs** — Prometheus custom metrics; revenue/activation/retention/LTV
- [ ] **Feature flag rollout automation** — Argo Rollouts/Flagger; progressive delivery; auto-rollback on SLO breach
- [ ] **Canary deployment for frontend** — Vercel traffic splitting; cookie-based bucketing; instant rollback
- [ ] **Database migration safety** — `pg_lock` check; advisory lock; per-table timeout
- [ ] **Zero-downtime deployment verification** — traffic shadowing; diff response bodies; auto-rollback
- [ ] **Rollback automation on metric regression** — Argo Rollouts analysis; Prometheus → auto-rollback
- [ ] **Cost allocation / chargeback** — OpenCost/Kubecost; per-tenant/feature cost; monthly report
- [ ] **GDPR Right to be Forgotten automation** — deletion workflow; cascading soft-delete; audit log
- [ ] **Modern animation stack verified** — Framer Motion 12+, Motion One, GSAP 3.13+ ScrollTrigger, CSS @starting-style, anchor positioning, container queries, animation-timeline; Phase 4 animate step integrated
- [ ] **3D/WebGL (if gated)** — React Three Fiber 9 + Three.js r160+, Rive/Lottie; magic-ui hero effects
- [ ] **React 19 features verified** — useOptimistic on all mutations, useActionState on forms, use() + Suspense streaming, Server Actions with streaming
- [ ] **State management architecture verified** — TanStack Query v5 server state, TanStack Router type-safe routing, Zustand 5/Jotai 3 client state, React Context theme/auth; documented in BLUEPRINT.md
- [ ] **pgvector / RAG pipeline** — pgvector enabled, vector columns in schema, document ingestion/chunking/embedding/retrieval working, AI SDK 4+ integration, agent-elements chat with citations
- [ ] **Database provider choice verified** — Prisma Postgres/Neon/PlanetScale/Turso configurable; Drizzle ORM alternative for edge
- [ ] **Legal/Compliance pages live** — ToS, Privacy, Cookie Policy, DPA, Security Policy, Accessibility Statement, Subprocessor List at `/legal/*`; auto-generated from data model
- [ ] **Cookie Consent Banner (CMP)** — shadcn Dialog + hook; categories (necessary/analytics/marketing); GTM/analytics integration; geo-aware GDPR/CCPA
- [ ] **Automated legal doc generation** — Prisma schema → PII detection → Privacy/ToS/DPA templates; subprocessor list from deps + services; updates on schema change
- [ ] **Trusted Types + COOP/COEP** — Trusted Types via CSP, DOMPurify integration; COOP: same-origin, COEP: require-corp; DOM XSS + Spectre prevention
- [ ] **Session replay** — Highlight.io/LogRocket; PII masking; Phase 3 gate
- [ ] **Monorepo tooling (if gated)** — Turborepo + pnpm workspaces; apps/packages structure; Changesets versioning; auto CHANGELOG
- [ ] **Modern GitHub Actions** — Reusable workflows, matrix testing, dependency caching, Slack notifications, deployment gates
- [ ] **OpenCodeReview AI code review** — `ocr review` in CI (GitHub Actions/GitLab CI/Gerrit); delegation mode; zero CRITICAL/HIGH findings; session viewer accessible
- [ ] **Semgrep 2026 multimodal AI security** — `semgrep ci` in GitHub Actions; reachability analysis (98% FP reduction); semantic secrets (630+ types); Guardian for AI code; AppSec Platform; Agentic Workflows; MCP integrations
- [ ] **Bearer CLI + OSV Scanner + CodeQL** — Bearer CLI free SAST + PII/PHI detection; OSV Scanner for OSV.dev vuln DB; CodeQL custom queries + variant analysis; all in CI pipeline
- [ ] **DAST + eBPF runtime security** — OWASP ZAP/StackHawk/Escape/Probely DAST; Falco/Tetragon/Cilium/Tracee eBPF (container/host/network); CVE monitoring via OSV/GitHub Advisory/NVD API; Cosign/sigstore/rekor/fulcio keyless signing + SLSA provenance
- [ ] **Osano CMP enterprise compliance** — Osano Cookie Consent (50+ countries, 95+ regs, 45+ langs); auto-localization, AI cookie classification, banner preview, multi-site, consent logs; "No Fines, No Penalties" guarantee ($500k); Klaro/cookie-consent open-source alternatives
- [ ] **Extended legal/compliance pages** — AUP, Refund/Cancellation, SLA/Uptime, Export Controls (EAR/ITAR), Age Verification (COPPA/GDPR-K/UK Children's Code), DMCA Policy at `/legal/*`
- [ ] **PostgreSQL 17+ + Prisma 8 + Drizzle v1.0 + Kysely** — PG 17+ explicit; Prisma 8 contract-based models, composable query DSL, graph migrations, SPI; Drizzle v1.0 relational queries v2, MSSQL/CockroachDB, catalogs, runtime mgmt; Kysely type-safe SQL, zero deps, kysely-codegen; PGlite + TanStack DB local-first
- [ ] **Vercel Fluid Compute + Cloudflare Workers + Deno Deploy + Edge middleware** — Fluid Compute pricing, framework-aware; CF Workers zero cold starts, 330+ cities, CPU-time billing, R2/D1/KV/Queues/Workers AI, Python/Rust/WASM; Deno V8 isolates, native TS; Bun native SQLite; Edge middleware: auth, rate limit, A/B, geo, caching
- [ ] **Grafana Cloud AI Observability + Vercel Observability + Highlight.io PII masking** — Grafana: AI Assistant, Agent Observability, Adaptive Telemetry (35-50% savings), K8s Monitoring, Frontend RUM, Synthetic, k6, IRM, OnCall; Vercel: framework-aware insights, anomaly detection, Web Analytics, Speed Insights, OTEL export, Log Drains; Highlight.io: PII masking config, error monitoring, logging
- [ ] **LangGraph + AI Gateway + Workflows + Local LLMs + MCP + AI Elements** — LangGraph stateful agents/workflows; AI Gateway 100+ models single key; Workflows suspend/resume; Ollama/LM Studio/vLLM/TGI/llama.cpp; MCP servers; npx ai-elements; Cohere v3/Jina/Voyage reranking
- [ ] **WebTransport + Automerge 2.0 + RGA/Peritext + ElectricSQL v1** — WebTransport HTTP/3 bidirectional; Automerge 2.0 JSON CRDT; RGA/Peritext rich text CRDT; ElectricSQL managed agents, durable streams, CDN cacheable, TanStack DB/PGlite; Liveblocks MCP server
- [ ] **pnpm 12.x advanced + Husky/lint-staged + Changesets v3 + IDE** — Catalogs, strict node_modules, build script approval, patch deps, runtime mgmt, JSR; Husky + lint-staged pre-commit; Changesets v3; Cursor/VS Code Copilot/Zed; GH Actions composite actions, pnpm store cache
- [ ] **TanStack Start + Waku + Hono+React + RedwoodJS v7+** — TanStack Start router-first full-stack portable; Waku on Hono; Hono+React edge-first; RedwoodJS v7+ RSC; alternative to Next.js 15 configured in Phase 0

### Phase 4 — IMPROVISE: make the shipped UI great (this skill's reason to exist)

Only after the engine reports COMPLETE and Phase 3 gates are green. This is
bounded, evidence-driven polish — not an open-ended redesign loop
(impeccable's rule: build fully, inspect once in a batched round, fix in
one batch, confirm once, stop).

**Program cap (declared at start, enforced):** ≤3 fix→verify rounds total
(mirroring the engine's own triage bound) and a wall-clock ceiling recorded
before step 1. Hitting the cap ends the program with an explicit
"remaining findings" list per surface — a capped run is reported as capped,
never silently stopped mid-evidence.

1. **Surface-moded inventory.** Classify each shipped surface by what the
   visitor is doing (impeccable modes): landing/product/pricing = **Persuade**
   (earn attention and action); app shell/dashboards/editors/settings =
   **Operate** (scanability, consistency, native expectations);
   onboarding/first-run/empty states = **Activation** (get the new user to
   value fast); docs/help = **Read** (structure for comprehension). The mode
   chooses every command below. **Also tag each surface against Section 8's
   pattern library** (interactive editor / high-density dashboard / media
   player / scheduler / game / product viewer / 3D viz / design-system
   generator / landing page / file-analysis) so the critique has a
   concrete pattern spec to score against — a dashboard tagged as
   "high-density" is held to that pattern's checklist (sidebar + filters +
   dense cards + insights panel), not to taste.
2. **Critique (batched, once).** Load `impeccable`. Its `context.mjs`
   expects PRODUCT.md, which the engine's docs do not produce — run `init`
   once first (it writes `PRODUCT.md` from `BRIEF.md` + the docs), then
   `context.mjs` setup, then `critique` and `audit` across the inventory —
   desktop *and* mobile in one batch. Cross-check each surface against
   **Section 8's pattern spec** (the Figma-derived interaction/component
   checklist for its tag) and **Section 9's knowledge map** (color, type,
   hierarchy decisions go back to the cited resource, not the vibe) — and
   against the selected **`design-md`** brand system (discovered in Phase U;
   if the shipped UI drifted from the brand seed, that drift is a finding,
   not a new direction). Scoring: impeccable HIGH/CRITICAL plus **any
   pattern-spec miss from Section 8** are findings that must be fixed.
   Collect the findings list; do NOT start fixing during collection.
3. **Fix in one batch.** Apply every HIGH/CRITICAL fix plus the cheap
   obvious wins (`layout`, `typeset`, `clarify`) in a single pass. Install
   the `impeccable hooks` design-detector before editing so regressions
   surface automatically during the batch.
    `design-taste-frontend` and
    `emil-design-eng` (motion/craft philosophy) for direction; `magic-ui`
    for marquee/globe/blur-fade effects before hand-rolling animation. Add
    `vercel-react-view-transitions` page transitions and `shadcn`-correct
    components if any surface feels template-flat. Dashboards needing data
    viz use `ui-ux-pro-max`'s chart guidance (25 chart types; a11y-first
    labeling per `frontend-ui-engineering`) — never a decorative chart.

    **4b. Asset pass (new — the generic-UI fix).** Template-flatness almost
    always traces to missing assets, not missing CSS. Before declaring a
    surface done, confirm each of these is *real* and *on-brand*:
    - **Imagery:** licensed or generated (Pollinations-and-commit at build
      time, or the user's own) — never a placeholder service URL. `next/image`
      with real `alt`; no `next/image` wildcard `remotePatterns`.
    - **Icons:** one icon system with weight/variant control (`@tabler-icons`,
      `lucide-react`, `phosphor-icons`) — not the default outlined set.
    - **Motion:** at least one of — a hand-authored `@keyframes`/WebGL/Canvas/Rive/Lottie
      asset in the bundle (this is also the prize-worthiness gate's criterion 2).
      Prefer `diffusionstudio/lottie` (text-to-lottie) for generated motion and
      `@rive-app/react-webgl2` for interactive state-driven components.
    - **3D:** if the product has a hero or a signature moment, `react-three-fiber`
      + `@react-three/drei` — a real scene in the bundle, not a CSS gradient.
    - **Fonts:** `next/font` self-hosted or `@fontsource` — zero layout shift,
      no `fonts.googleapis.com` in the production bundle.

    **4c. Fresh-eyes contrast pass.** After the batched fix, re-render each
    surface and run `impeccable`'s `contrast` + `typeset` commands against
    the *new* state. A fix that solves one slop pattern and introduces a
    contrast or hierarchy regression is not a fix — it is a swap. Record
    before/after in `docs/ui-gallery/`.

5. **Live browser iteration (the improvise).** Run the app as a local
   production build (`next build && next start`) — dev-mode screenshots and
   CWV mislead, so evidence comes from the production bundle. Load it and
   iterate the highest-leverage elements (hero, CTA, pricing) — generate
   alternatives, pick, apply. Tool ladder, first available wins:
   - `agent-browser` (or Playwright MCP / `browser-testing-with-devtools`):
      load the app, screenshot each surface, probe real interactions.
   - No MCP browser: `npx playwright screenshot <url> <file>` (desktop +
      mobile viewports) for every surface, plus HTTP checks
      (`curl -sI` each route for status) and HTML/content checks of
      the served pages. This keeps screenshots + evidence close-out intact.
   - **Backtest before you polish.** Before the first critique and after
      each fix batch, run a **Playwright scripted backtest** against
      Section 8's pattern spec — assertions per surface tag that measure
      the pattern, not the pixels:
      - *Interactive editor*: drag target, slider, and every tweak parameter
        changes the visual state it claims to (assert via class/DOM diff);
      - *High-density dashboard*: sidebar nav items, filter controls,
        ≥1 dense viz (chart/timeline/heat-map/gantt), insights panel all
        present and reachable;
      - *Media player*: play toggles the state-driven animation class,
        shuffle/volume controls present, library browse reachable;
      - *Scheduler*: hourly blocks render, category color-code maps to a
        finite legend, daily↔weekly toggle switches the grid (assert block
        count changes);
      - *Product viewer*: drag changes rotation transform, variant toggles
        swap the displayed item (assert src/color class change);
      - *Upload/analyze*: drop/upload → processing state → results appear
        with chart + stats, no dead clicks.
      Record pass/fail per assertion in the evidence file (`docs/ui-baselines/backtest.json` per run). A skipped/failed assertion = the interaction exists in code but doesn't **work** — that is a HIGH finding regardless of how the screen looks. This is the same
      "verify the behavior" step the Figma workflow's step 3 mandates:
      prompt the interaction, then click the buttons and confirm.
   - **Vision-agnostic guard (text-only agent).** Screenshots are only
      evidence if the agent can actually interpret them. If the current
      agent/host has no vision capability (cannot see or reason about a
      rendered image), it MUST NOT grade visual polish from a screenshot it
      cannot see. In that case visual critique degrades to mechanical,
      verifiable checks only: contrast ratio (axe-core/`pa11y`), CWV via
      headless Lighthouse, keyboard operability, semantic landmarks, layout
      breakpoints, `prefers-reduced-motion`, and the `impeccable` +
      `design-gate.js` static code review. **The Playwright pattern
      backtest still runs in full** — its assertions are DOM/behavior-based,
      not vision-based. The report then states
      "visual polish unverified — validated mechanically only" for those surfaces
      (per step 10); it never claims a prize-worthy look it could not see.
   Cap: full inspect once, fix batch once, one confirm round. Stop when the
   confirm round shows no regressions. Every interaction you probe keeps:
   keyboard operability, focus visibility, reduced-motion, AA contrast.
6. **E2E test recording (during iteration).** Playwright codegen records
   user flows as test scripts → `tests/e2e/recorded/`; committed for CI.
7. **Visual regression baseline update.** Pixelmatch compares before/after;
   if improvements pass threshold → update `docs/visual-baselines/`.
8. **Evidence close-out.**
    - **Prize-worthiness gate (the H5 mechanical gate).** Run `node scripts/prize-gate.js <project>` (6 criteria: palette distinctiveness, signature element, hero composition, AA contrast, animation budget, fresh-context review). Exit 0 = the shipped UI may claim "distinctive / prize-worthy"; the report lands in `docs/prize-gate.json` and is quoted into `DECISIONS.md`. A FAIL is reported as capped, never claimed. Run axe-core/Lighthouse on the core pages and
   record Core Web Vitals — with a browser tool where present, otherwise
   `npx lighthouse <url>` headless (Playwright's installed Chromium). Record
   per-surface before/after screenshot pairs under `docs/ui-gallery/` (from
   the browser tool, or `npx playwright screenshot` in the step-5 fallback).
   A shipped screen with no screenshot evidence is an unfinished claim.
9. **Remember.** Golden-rule forensics of what made specific screens feel
   good becomes a `docs/DESIGN.md` note (tokens/rules others can reuse),
   and any underperforming skill is recorded for `vibe-evolve` to
   re-hunt. **Backtest evidence feeds the pattern library:** a surface whose
   `docs/ui-baselines/backtest.json` assertions all pass is a verified
   pattern — promote its spec (tag → checklist → interaction contract) to
   `<project>/.patterns/` (Section F) and record which Figma Section 8
   pattern it instantiates, so future Phase U directions start from
   patterns already proven to work in a real browser instead of re-vibing
   the same interaction.
10. **Report capability level, not just results.** The final report states
    exactly which tools ran vs fell back (e.g. "design system authored
    without search.py — python3 missing", "screenshots via Playwright CLI —
    no browser tool") so the user knows the evidence's true fidelity, not a
    blanket "green".

## The UI excellence spine (rules every iteration and Phase 4 obey)

- **Tokens are law.** Color (with semantic roles: primary/success/danger/
  muted, light+dark) **in OKLCH color space**, type scale, spacing, radius, shadow, motion
  easing/duration — single source of truth in the design system, consumed
  as CSS variables / Tailwind v4 `@theme`. No hex literals in components.
- **One visual world.** Palette + font pairing + mood from Phase U hold
  across every screen. Variation comes from layout and composition, not
  from drifting colors/type per page.
- **Modern CSS features enabled:** `@starting-style` for entry animations, anchor positioning for tooltips/popovers, container queries for component-level responsiveness, `animation-timeline` for scroll-driven animations. Tailwind v4 `@theme` configured with all.
- **Anti-slop defaults (bans):** centered 3-emoji hero; the default purple
  gradient; "lorem"; "Acme Corp"; bare spinners for anything past a trivial
  fetch; `space-x-*` spacing hacks (use `size-*`/gap per shadcn rules);
  `@ts-ignore`/`eslint-disable` suppressions to get green; half-styled dark
  mode; `next/image` wildcard `remotePatterns`.
- **States before style:** every data surface renders loading (skeleton or
  Suspense), empty (authored, on-brand), error (actionable retry), and
  success (toast via sonner) states before it's called done.
- **Motion with intent:** CSS transitions for simple hover/focus; Framer Motion 12+ for orchestration/springs/AnimatePresence; Motion One for lightweight animations; GSAP 3.13+ ScrollTrigger for scroll-driven animations; View Transitions for page nav; CSS `animation-timeline` for scroll-linked reveals where supported. `prefers-reduced-motion` short-circuits all of it. Never animate to impress, only to orient.
- **Motion budget (numeric, enforced in Phase 4):** a viewport holds at most **1** scroll-linked entrance animation per section and **≤2** simultaneously-moving "hero" elements; total animated-on-load elements per surface **≤3**; every animation ≤ 600ms (entrances) / ≤ 300ms (hover/focus) with an initial `delay` only where it implies hierarchy (redundant cascading delays are flagged). If a surface exceeds the budget it reads as animation overload (the UI-spine anti-pattern) — trim, don't layer more motion on.
- **Real everything:** real imagery (licensed, generated once at build time
  via Pollinations-and-commit, or user content — never a placeholder
  service URL), `next/font` self-hosted, `next/image` with real alt,
  real opinionated copy from `docs/DESIGN.md`/PRD — no filler prose.
- **Accessibility is the floor, not a pass:** keyboard-complete flows,
  visible focus, AA contrast, landmarks, alt/aria-hidden, error summaries,
  `prefers-reduced-motion`. Evidence = axe/Lighthouse run, not a glance.

## ZERO TOLERANCE — Generic AI Slop Ban List

**If ANY of these appear, the story FAILS immediately. No exceptions. No "fix later."**

| Category | Banned Patterns (auto-fail via CI grep + manual review) |
|----------|----------------------------------------------------------|
| **Generic UI** | Default shadcn look; untouched `Card`/`Button`/`Input` without custom composition; `space-y-4`/`space-y-6` vertical stacks as page layout; `container mx-auto px-4 py-8` on every page; `rounded-lg shadow` on everything |
| **Inconsistent design** | Different `px-4` vs `px-6` vs `px-8` on same-level pages; mixed `text-gray-600`/`text-gray-700`/`text-slate-500` for same hierarchy; buttons with different heights/padding/radius; cards with different shadow/elevation |
| **Poor visual hierarchy** | Everything `text-lg font-medium`; no clear H1/H2/H3 scale; all CTAs same weight/color; no `text-2xl`/`text-3xl`/`text-4xl` distinction; equal emphasis everywhere |
| **Too many features** | Panels/tabs/cards/accordions added "because they fit"; settings pages with 20+ options; dashboard with 15+ widgets; feature flags for things that should be decisions |
| **Weak responsive** | `md:`/`lg:`/`xl:` breakpoints only; no `sm:`/`xs:`; horizontal overflow on 390px; touch targets <44px; text <16px on mobile; desktop-only navigation patterns |
| **Bad spacing** | Random `p-4`/`p-6`/`p-8`/`m-4`/`m-6`/`m-8`; `gap-4`/`gap-6`/`gap-8` mixed; `space-y-*` as primary layout; no 4px/8px base unit rhythm; oversized `py-20`/`py-32` sections |
| **Typography issues** | >3 font sizes on one screen; `font-normal`/`font-medium`/`font-semibold` mixed randomly; `leading-tight`/`leading-normal`/`leading-relaxed` inconsistent; line-length >75ch or <45ch |
| **Color inconsistency** | Multiple shades of "primary" (`blue-500`/`blue-600`/`indigo-500`/`violet-500`); semantic roles not used (error=red-500 here, red-600 there); dark mode colors not systematically derived |
| **Component duplication** | `ButtonPrimary` + `ButtonSecondary` + `Btn` + `CTAButton`; `Card` + `CardHover` + `CardElevated` + `Panel`; `Input` + `TextField` + `FormInput`; same component rebuilt 3+ ways |
| **Poor navigation** | Breadcrumbs missing on deep pages; back button not working; active state not visible; mobile nav hidden behind hamburger with no label; no skip links; focus trap missing in modals |
| **Overuse of cards** | Every list item a card; every metric a card; every form field in a card; `Card` wrapper on full-page content; `shadow` on everything creating visual noise |
| **Weak empty states** | "No data found" / "Nothing here" / blank screen; no illustration; no primary action; no helpful copy; no onboarding path |
| **Poor loading states** | Spinner only; no skeleton matching final layout; layout shift on load; no Suspense boundaries; full-page spinner for partial data |
| **Bad error UX** | `Error: {message}` exposed; stack traces in UI; "Something went wrong" with no action; no retry button; no contact support link; toast auto-dismiss <5s |
| **Accessibility gaps** | Contrast <4.5:1; no visible focus ring (`outline-none`); `div` as button; missing `label`/`aria-label`; no heading hierarchy; `tabindex` hacks; motion not reduced |
| **Animation overload** | `animate-pulse`/`animate-bounce`/`animate-spin` on static elements; `transition-all` on everything; scroll animations on every section; 300ms+ delays on interactions; no `prefers-reduced-motion` guard |
| **No design system** | Ad-hoc color/spacing/typography per page; no `DESIGN.md` tokens referenced; components don't import from design system; one-off styles in `style` attr or arbitrary classes |
| **Desktop-first bias** | Mobile designed by shrinking desktop; touch targets 32px; hover-only interactions; horizontal scroll on mobile; navigation not thumb-reachable; modals not full-screen on mobile |
| **Fake polish** | Gradients/glassmorphism/shadows masking broken UX; `backdrop-blur` on everything; decorative animations without purpose; "premium feel" substituting for usability |
| **Inconsistent interactions** | Click vs submit vs `onChange` for same action; Enter key works in some forms not others; Escape closes some modals not others; drag-drop only in some lists |

**Enforcement:** 
- CI grep runs on every PR for banned patterns (raw hex, `space-x-*`, `lorem`, `Acme`, `@ts-ignore`, `eslint-disable`, `outline-none`, `transition-all`, `animate-*` on static elements)
- `impeccable critique` runs on 3 highest-value surfaces — ANY finding from this list = HIGH/CRITICAL = story blocks
- Phase 4 IMPROVISE: mode-guided refine (Persuade→`bolder`/`delight`/`colorize`/`animate`; Operate→`polish`/`harden`/`distill`/`clarify`/`adapt`) — slop patterns get `distill`/`clarify`/`harden` treatment
- Automated design-self-audit checkpoint at US-002 (token handoff) and every 10 stories: run the CI `design-gate.js` grep + `impeccable audit` over the shipped surfaces; if the grep is clean and audit finds no HIGH/CRITICAL from this list → PASS (recorded in `DECISIONS.md`). No human involved. Blocks the story if it fails; the supervisor fixes until clean. **Plus the prize-worthiness gate:** `node scripts/prize-gate.js <project>` (6 machine-checkable criteria — see Section 7). A FAIL means the surface may not claim "distinctive / prize-worthy"; the report is recorded in `docs/prize-gate.json`.

## Integrated skill map (every installed skill, and when it fires)

| Skill | Fires |
|---|---|
| `builder`, `vibe-docs`, `vibe-build` | Engine — Phases 0–3 (chain, docs, ralph loop) |
| `vibe-evolve`, `find-skills` | Phase 0 toolchain self-improvement (cadence-gated) |
| `prompt-architect` | Phase 1 brief → `BRIEF.md` |
| `spec-kit` (`specify-cli`, `constitution`, `specify`, `plan`, `tasks`, `implement`, `checklist`) | **Integrated throughout**: Phase 0.5 (`specify init` — installs the per-agent `/speckit.*` commands; without it none exist), Phase 1 (constitution, specify), Phase 1b (plan, tasks → ralph stories), Phase 2 (convergence gate at US-002, every 5 stories, pre-Phase 3 — via `speckit.implement` + `speckit.checklist`, since v0.8.x has no `converge`), Phase 3 (convergence verification). Produces auditable Constitution → Spec → Plan → Tasks → Code lineage alongside vibe-docs output. |
| `spec-driven-development`, `idea-refine` | PRD rigor + idea stress-test during docs (also underpin spec-kit flow) |
| `planning-and-task-breakdown` | **Superseded by spec-kit tasks** for story generation; retained as fallback if spec-kit unavailable |
| `documentation-and-adrs` | `DECISIONS.md`, ADRs |
| `constraint-driven-development` | `CONSTRAINTS.md` written quality bar (references CONSTITUTION.md) |
| `context-engineering` | Per-iteration `AGENTS.md` context design |
| `source-driven-development` | Grounding stack choices in official docs |
| `ui-ux-pro-max` | Phase U design-system generation + per-component stack guidance + dashboards/charts (25 chart types) |
| `design-md` (reference) | Brand-design-system seed in Phase U + brand-drift cross-check in Phase 4 critique |
| `design-taste-frontend`, `frontend-design` | Anti-templated visual direction |
| `impeccable` | Per-slice craft floor + Phase 3 critique + Phase 4 critique/polish/animate/live |
| `emil-design-eng` | Motion/craft philosophy for polish |
| `frontend-ui-engineering`, `web-design-guidelines` | Production UI patterns, a11y, states, responsive |
| `ui-styling`, `building-components` | shadcn/Tailwind styling + component APIs |
| `shadcn` | Correct shadcn/ui CLI + component usage |
| `magic-ui` | Marquee/globe/blur-fade animated effects |
| `agent-elements` | Mandatory AI chat UI (message list, composer, streaming) |
| `vercel-composition-patterns`, `vercel-react-best-practices` | React composition + Next.js perf patterns |
| `vercel-react-view-transitions` | Page-level navigation transitions |
| `vercel-optimize` | Phase 3 Core Web Vitals / caching / bundle pass |
| `prisma-database-setup`, `prisma-postgres`, `prisma-postgres-setup`, `prisma-client-api`, `prisma-cli`, `prisma-compute` | Data tier (schema, migrations, client, compute deploy) |
| `api-and-interface-design` | API contracts (versioning, size limits, boundaries) |
| `nodejs-backend-patterns` | Scalability: pooling, caching, background jobs, WebSockets |
| `react-email`, `email-best-practices` | Transactional email + deliverability |
| `gdpr-data-handling` | Consent, data-subject rights, privacy by design |
| `prompt-engineering-patterns` | Chatbot system prompt, structured AI outputs |
| `observability-and-instrumentation` | Logs, metrics, tracing, web-vitals events |
| `performance-optimization` | Profiling-guided perf work when CWV regress |
| `k6` | Phase 3 real load test (p95/p99, error rate) |
| `test-driven-development` | Red-green-refactor with each story |
| `agent-browser`, `browser-testing-with-devtools` | Real-browser verification + Phase 4 live iteration |
| `debugging-and-error-recovery` | Stall / systematics debugging in ralph supervision |
| `security-and-hardening`, `security-review` | Security pass on every diff + final gate |
| `sast-configuration` | Semgrep/CodeQL CI gate |
| `owasp-top-10-testing`, `web-app-penetration-testing`, `penetration-testing-with-strix`, `fix-security-vulnerabilities-with-strix` | Strix runtime pentest + remediate |
| `code-review-and-quality` | Final diff review |
| `codebase-design`, `domain-modeling`, `improve-codebase-architecture`, `code-simplification` | Architecture quality / shallow-module audit / simplification |
| `git-workflow-and-versioning` | Atomic Conventional-Commits per story |
| `ci-cd-and-automation` | Ordered fail-fast CI gates |
| `shipping-and-launch` | Pre-launch checklist, rollout, rollback |
| `deploy-to-vercel`, `vercel-cli-with-tokens` | Optional publish (only on explicit user request) |
| `seo` | Metadata, sitemap, structured data |
| `writing-guidelines` | Copy/docs review |
| `incremental-implementation`, `doubt-driven-development` | Sliced delivery discipline + adversarial pre-ship review |
| `using-agent-skills` | Meta-discovery when the right skill for a task is unclear |
| `brand`, `design-system`, `design`, `banner-design`, `slides` | Only if the product needs marketing collateral, a CIP, or a deck — not a default |
| `vercel-ai-sdk` | AI streaming, tool calling, generative UI, RAG (Phase 1b/2) |
| `tanstack-query`, `tanstack-router` | Server state + type-safe routing (Phase 2) |
| `zustand`, `jotai` | Client state management (Phase 2) |
| `framer-motion`, `gsap`, `motion-one` | Animation stack (Phase 2/4) |
| `lottie` (`@lottiefiles/dotlottie-react`, `react-lottie`) | Lottie playback + text-to-lottie generation (Phase 4 hero/empty states) |
| `@rive-app/react-webgl2` | Interactive Rive components with state machines (Phase 4 — buttons, toggles, loaders that respond to real state) |
| `react-three-fiber`, `@react-three/drei`, `three` | WebGL/3D in the bundle (Phase 4 signature element — the prize-worthiness gate requires at least one hand-authored 3D/motion asset) |
| `lenis` | Smooth-scroll container (Phase 4 — one scroll-linked entrance per section, never on every section) |
| `shadcn/ui` + `@magicui-components` | shadcn-correct components + animated registry (marquee, globe, blur-fade, shiny-button) |
| `@tabler/icons`, `lucide-react`, `phosphor-icons` | Icon systems with real weight/variant control — never the default outlined set |
| `next/font` (self-hosted) + `@fontsource` | Web font loading with zero layout shift — no `google-fonts` CDN in production |
| `@radix-ui/themes`, `@base-ui-components` | Accessible, themable component primitives when shadcn alone is too flat |
| `sonner` | Toast system (the spine requires toasts on success; `ask-sonner` owns the correct usage) |
| `react-email` | Transactional email templates (already listed) |
| `arcjet` | Bot detection, rate limiting, attack protection (Phase 2) |
| `opentelemetry-js` | Native OTel instrumentation (Phase 2) |
| `highlight-io` / `logrocket` | Session replay with PII masking (Phase 3) |
| `turborepo`, `changesets` | Monorepo tooling + versioning (Phase 2, gated) |
| `drizzle-orm` | Edge-compatible ORM alternative (Phase 2, gated) |
| `party-kit`, `electric-sql`, `liveblocks`, `yjs` | Real-time collaboration CRDTs (Phase 2, gated) |
| `react-three-fiber`, `rive`, `lottie` | 3D/WebGL + complex animations (Phase 2/4, gated) |
| `vercel-ai-gateway` | 100+ models, single API key, no markup (Phase 2) |
| `vercel-ai-workflows` | Long-running agents, suspend/resume, survive timeouts (Phase 2) |
| `vercel-sandbox` | Secure agent code execution (Phase 2) |
| `ai-elements` | Pre-built AI UI components (npx ai-elements) (Phase 2) |
| `langgraph` | Stateful agents, workflows, human-in-the-loop (Phase 2) |
| `cohere-rerank`, `jina-rerank`, `voyage-rerank` | RAG reranking (Phase 2) |
| `ollama`, `lm-studio`, `vllm`, `tgi`, `llama-cpp` | Local LLM providers (Phase 2, gated) |
| `mcp-servers` | Model Context Protocol servers for tool integration (Phase 2) — provisioned on demand per Phase 0 §14 (check → configure → degrade) |
| `open-code-review` | `@alibaba-group/open-code-review` AI code review CLI (Phase 2/3) |
| `semgrep` | Multimodal AI SAST/SCA/Secrets/Guardian (Phase 2/3) |
| `bearer-cli` | Free open SAST + PII/PHI detection (Phase 2/3) |
| `osv-scanner` | OSV.dev vulnerability database scanner (Phase 2/3) |
| `codeql` | GitHub Advanced Security, custom queries (Phase 2/3) |
| `falco`, `tetragon`, `cilium`, `tracee` | eBPF runtime security (Phase 3) |
| `cosign`, `sigstore`, `rekor`, `fulcio` | Keyless signing, SLSA provenance (Phase 2/3) |
| `osano-cmp` | Enterprise cookie consent (50+ countries, 95+ regs) (Phase 2) |
| `klaro`, `cookie-consent` | Open-source CMP alternatives (Phase 2) |
| `pnpm` | Content-addressable store, catalogs, strict node_modules, build script approval, patch deps, runtime mgmt, JSR (Phase 0/2) |
| `husky`, `lint-staged` | Pre-commit hooks (Phase 2) |
| `tanstack-start`, `waku`, `hono-react`, `redwoodjs` | Alternative full-stack React frameworks (Phase 0/2, gated) |
| `webtransport`, `automerge`, `rga`, `peritext` | HTTP/3 bidirectional, CRDTs (Phase 2, gated) |
| `tanstack-db`, `pglite` | Local-first sync, reactive DB (Phase 2, gated) |
| `grafana-cloud` | AI Assistant, Agent Observability, Adaptive Telemetry, Frontend RUM, Synthetic, k6, IRM, OnCall (Phase 3) |
| `vercel-observability` | Framework-aware insights, anomaly detection, Web Analytics, Speed Insights, OTEL export (Phase 3) |

## Verification checklist (end of run)

- [ ] Engine COMPLETE: every `prd.json` story `passes: true`; Phase 3 gates
      green (migration chain, backup/restore, Strix clean or triaged,
      load-test numbers recorded, production gate table all PASS).
- [ ] Token-handoff story (US-002) landed before any component work; CI
      design gate wired and red on a raw-hex/suppression/`space-x-*` hit.
- [ ] DESIGN.md tokens committed before first UI story and unchanged-by-
      accident after (grep-proof: no stray hex literals, no drift fonts).
- [ ] Anti-slop grep clean: no `jsonplaceholder|lorem|Acme|@todo|TODO|FIXME|your_app|insert_secret` in real screens; no bare spinner for non-trivial fetches.
- [ ] Every surfaced screen has skeleton/empty/error/focus states at
      390/768/1280px; reduced-motion respected.
- [ ] axe/Lighthouse on core pages: no a11y violations; CWV within budget
      (headless fallback allowed: `npx lighthouse` over the running app).
- [ ] Phase 4 done within its declared cap (≤3 rounds, wall-clock honored);
      per-surface before/after screenshots in `docs/ui-gallery/` (browser
      tool or Playwright-CLI screenshots).
- [ ] **Spec-kit Convergence:** `/speckit.implement` reports all tasks done
       (zero drift against SPEC.md/PLAN.md) **and** `/speckit.checklist`
       reports no missing requirement coverage.
- [ ] Visual regression testing: Playwright + pixelmatch in CI; baseline in `docs/visual-baselines/`
- [ ] Bundle size gate: JS <200KB gzipped, CSS <50KB; tracked in `docs/bundle-report.json`
- [ ] OpenAPI docs generated: `swagger-ui` at `/docs/api`; validated in CI
- [ ] Preview environments per PR: Vercel preview + Neon DB branch; auto-cleanup
- [ ] Feature flags: Unleash OSS; gradual rollout; audit log
- [ ] API contract testing: Pact consumer-driven contracts; provider verification in CI
- [ ] Secrets scanning: TruffleHog + git-secrets in CI; allowlist in `.secrets-allowlist`
- [ ] Chaos engineering: LitmusChaos in staging; SLO validation
- [ ] Migration rollback test: `prisma migrate resolve --rolled-back` verified
- [ ] Webhook/event architecture: Svix outbound; retry/backoff; dead-letter; idempotency
- [ ] i18n scaffolding: `next-intl` with en/es/fr/ja; RTL; locale routing
- [ ] SBOM + license compliance: CycloneDX via `syft`; fail on GPL/AGPL
- [ ] Automated dependency updates: Renovate PRs with test results; auto-merge patch/minor
- [ ] Runtime app self-protection: rate-limit + helmet + CSP + Arcjet
- [ ] Automated PR description: from `DECISIONS.md` + story titles
- [ ] Release notes / changelog: `docs/CHANGELOG.md` from git + `DECISIONS.md`
- [ ] Database schema visualization: Mermaid ERD in `docs/ERD.mmd`
- [ ] Component Storybook: auto-generated from shadcn; `pnpm run storybook`
- [ ] Accessibility regression: axe-core in CI on every PR
- [ ] Performance budgets: Lighthouse CI: CLS <0.1, LCP <2.5s, TBT <200ms
- [ ] E2E test recording: Playwright codegen → `tests/e2e/recorded/`
- [ ] Seed from production dump: anonymized `pg_dump` → seed
- [ ] Disaster recovery drill: automated weekly; `docs/dr-drill.log`
- [ ] Compliance evidence package: `docs/compliance/` (SOC2/ISO artifacts)
- [ ] Threat model: STRIDE analysis in `docs/THREAT_MODEL.md`
- [ ] Data flow diagram: GDPR flows in `docs/DATA_FLOW.mmd`
- [ ] Runbook / incident response: `docs/RUNBOOK.md`
- [ ] Capacity planning / scaling: `docs/SCALING.md` from k6 results
- [ ] Team onboarding docs: `docs/ONBOARDING.md`
- [ ] ADR template: `docs/adr/TEMPLATE.md`
- [ ] BLUEPRINT.md generated and current: unified architecture doc consolidating ARCHITECTURE + DATA_MODEL + API_SPEC + DESIGN + state architecture + security model + observability + deployment targets + ADR index
- [ ] SPEC.md (spec-kit) vs BLUEPRINT.md distinction maintained
- [ ] ADRs auto-generated from DECISIONS.md via documentation-and-adrs skill
- [ ] Legal/Compliance pages live: ToS, Privacy, Cookie Policy, DPA, Security Policy, Accessibility Statement, Subprocessor List at `/legal/*`
- [ ] Cookie Consent Banner (CMP) functional with geo-aware GDPR/CCPA categories
- [ ] Automated legal doc generation from Prisma schema (PII detection → templates)
- [ ] Modern animation stack verified: Framer Motion 12+, Motion One, GSAP 3.13+ ScrollTrigger, @starting-style, anchor positioning, container queries, animation-timeline
- [ ] 3D/WebGL (if gated): React Three Fiber 9, Three.js r160+, Rive/Lottie working
- [ ] React 19 features verified: useOptimistic, useActionState, use() + Suspense, Server Actions streaming
- [ ] State management architecture: TanStack Query v5, TanStack Router, Zustand 5/Jotai 3, React Context documented in BLUEPRINT.md
- [ ] pgvector / RAG pipeline: vector columns, ingestion/chunking/embedding/retrieval, AI SDK 4+ integration
- [ ] Database provider choice: Prisma Postgres/Neon/PlanetScale/Turso + Drizzle ORM alternative
- [ ] Trusted Types + COOP/COEP headers enforced
- [ ] Session replay: Highlight.io/LogRocket with PII masking
- [ ] Monorepo tooling (if gated): Turborepo + pnpm workspaces + Changesets
- [ ] Modern GitHub Actions: reusable workflows, matrix testing, caching, Slack notifications, deployment gates
- [ ] One-line report: shipped features, UI verdict per surface, what was improvised, the one command to run it, credentials the user must supply (paths only, never values inline), and the capability level actually achieved (which tools/fell-backs ran).

## Self-Modifying Skill (post-run, zero config)

After each successful run, the skill **updates its own SKILL.md**:

1. **Known-source map updates** — New skills discovered via gap-driven discovery
   added to Bootstrap table (Section 3) with verified source + pinned ref
2. **Phase adjustments** — Dynamic phase rules that proved effective promoted
   from "detected pattern" to default behavior
3. **Prompt templates** — Successful `prompt-architect` structures committed to
   `<project-root>/.prompt-templates/`; promoted to `~/.agents/skills/PROMPT_TEMPLATES/` after **3-run verification**
4. **Pattern library** — Phase 4 IMPROVISE outcomes added to
   `<project-root>/.patterns/` (project-only); **deprecated patterns auto-removed** after 12 months unused
5. **Constraint thresholds** — `CONSTRAINTS.md` thresholds that caught real bugs
   lowered (stricter); thresholds that caused false positives raised
6. **Anti-slop bans** — New patterns that caused rework added to UI excellence spine
7. **Degradation paths** — Failed integrations documented with exact fallback steps

**Mechanism (canonical):** see **Self-Evolution Layer §I** above — dry-run via `node <skill-dir>/scripts/skill-validate.js --require-additive-only`, additive-only enforced by code, git/bak rollback, independent validator, ambiguity→bail. The rules and safeguards there are authoritative and apply to every item in this list.

Result: **Each run makes the skill better for the next run** — no manual maintenance.

## Install & portability (fresh host, zero assumptions)

This repo is two pieces. `SKILL.md` is host-agnostic (works wherever the
Agent Skills convention is read — opencode, Claude Code, Cline, Antigravity,
Replit, Cursor, Windsurf, skills.sh installs). `command/fullstack-builder.md`
is an **opencode-only** `/`-palette convenience wrapper; every other host
skips it and loads `SKILL.md` directly (it contains no host API calls and
self-describes its phases). A full per-host install matrix follows.

```
fullstack-builder/
├── SKILL.md                     # the skill (host-agnostic)
├── LICENSE                      # MIT
├── LEDGER.md                    # engine family skill audit / change log
├── scripts/                     # skill-side tooling (SHIPS with the skill)
│   ├── design-gate.js           # token-aware UI slop gate (see C1 rules)
│   ├── telemetry-migrate.js     # TELEMETRY.jsonl v1→v2 schema migration
│   ├── test-prompt-template.js  # prompt-template promotion test runner
│   ├── doc-contract-check.js    # MUST-contain contract checker for generated docs (§7)
│   ├── dashboard.js             # read-only live run-status viewer (local, Phase 0 §16)
│   ├── control-watchdog.js      # honors dashboard stop/pause → SIGTERM supervisor (§16)
│   ├── telemetry-write.js       # per-story TELEMETRY.jsonl writer (Self-Evolution §A)
│   ├── resume.js                # reactivate dashboard + hand off to engine resume (§16)
│   └── skill-validate.js        # local, dependency-free SKILL.md validator (§I)
├── skills/                      # BUNDLED engine family (MIT) — no external install needed
│   ├── builder/                 # orchestrator (SKILL.md, README)
│   ├── vibe-docs/               # idea → docs/ package + prd.json
│   ├── vibe-build/              # docs/ → ralph loop → production app
│   │   └── ralph/               # bundled ralph driver (sh + mjs runners)
│   └── vibe-evolve/             # toolchain self-improvement
├── bin/                         # cross-platform ralph helpers
│   ├── ralph-setup.{sh,mjs,ps1}   # install ralph driver machine-wide
│   ├── ralph-check.{mjs,ps1}      # preflight: detect missing tools + dead backend
│   └── ralph-guard.{mjs,ps1}      # no-placeholder-data scan (cheap gate)
├── docs/
│   ├── MEMORY.md                # project memory template (copied on first run)
│   ├── DOC_TEMPLATES.md         # Documentation OS template bank (12 phases, ~78 doc contracts)
│   └── adr/TEMPLATE.md          # ADR template (copied on first run)
└── command/
    └── fullstack-builder.md     # slash-command wrapper — opencode only
                                 # (the SKILL.md body itself is host-agnostic;
                                 # every other host loads it inline per Install)
```

**Skill-side vs project-side scripts.** The four files above are **skill-side** tooling that ship with and run from the skill repo. Every other `scripts/*` name referenced in this doc (`db-backup.sh`, `db-restore.sh`, `db-rollback-test.sh`, `pitr-test.sh`, `migration-safety.sh`, `gdpr-delete.sh`, `seed-from-prod.sh`, `db-restore-drill.sh`, `ralph/*`, `strix-wait.sh`) is a **project-side** artifact: the agent AUTHORS it into `<project-root>/scripts/` inside the relevant story (US-008, US-018, US-043, US-056, US-060, Phase 3) as part of that story's acceptance criteria. Do not look for these in the skill repo — generate them into the target project. If a story needs a helper script, write it before relying on it.

Install on a fresh machine — **multi-host matrix** (the `SKILL.md` body is
identical everywhere; only the *skill-discovery path* and the optional
*surface wrapper* differ):

| Host | Skill root (copy the whole skill dir) | Wrapper | Notes |
|---|---|---|---|
| opencode | `~/.config/opencode/skills/fullstack-builder` | `command/fullstack-builder.md` → `~/.config/opencode/command/` (`/fullstack-builder`) | MCP: `opencode.json` `mcp` block; the engine family is bundled inside this dir at `skills/` |
| Claude Code | `~/.claude/skills/fullstack-builder` | inline: paste the idea prompt + invoke the skill; no slash command needed | MCP: `~/.claude.json` `mcpServers`; engine bundled at `skills/` |
| Cline | skill root per Cline docs (`.cline/skills`) | inline | MCP: Cline/VS Code MCP settings |
| Antigravity / Replit / Cursor / Windsurf | their documented Agent Skills root | inline | MCP: their documented config / project `.mcp.json` |

```
# Example (opencode shown; other hosts = same `cp` to their root)
cp -r <skill-dir> ~/.config/opencode/skills/fullstack-builder

# opencode-only: slash commands → command root
cp <skill-dir>/command/fullstack-builder.md ~/.config/opencode/command/fullstack-builder.md
```

On a host with no slash-command wrapper (Claude/Cline/Antigravity/Replit/
Cursor/Windsurf), invoke it as: load the `SKILL.md` body directly and give
it the one-line idea — the skill self-describes its phases. The
`command/fullstack-builder.md` file is a convenience UI layer for opencode
only and is optional on every other host; the pipeline itself has zero
opencode-specific API calls and runs identically on any Agent-Skills host.
Restart the host so config-time files load.

**Engine is bundled; external skills self-provision.** The engine family
(`builder`, `vibe-docs`, `vibe-build`, `vibe-evolve` + ralph driver + bin
helpers) ships inside this skill at `skills/` and `bin/` — copied into
a discovery root on first run, or read by path. On first invocation the
**Bootstrap** section runs: it verifies the engine is present (bundled
copies are the source of truth — never install from the network), then
installs any missing hard-dep/collateral skills across all discovery roots
(ledger source → the embedded known-source map → find-skills verification).
A cold machine with nothing pre-installed needs only: run
`/fullstack-builder <idea>` → bootstrap provisions from the bundle and
installs remaining ecosystem skills → the run either proceeds or reports
exactly which skill is blocking. Optional/design-collateral skills degrade
per-tier and are reported, never silently skipped.

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

This repo is fully git-portable: no machine-specific absolute paths, no
credentials, no reliance on this host's directories.

## Troubleshooting Guide

| Symptom | Cause | Fix |
|---------|-------|-----|
| `docker info` fails | Docker daemon not running | `sudo systemctl start docker` (Linux) / Start Docker Desktop (Mac/Win) |
| Port 5432/3000 in use | Sibling stack collision | Phase 0 remaps automatically; check `docker ps` |
| `specify-cli` install fails | `uv` missing or Python <3.11 | Install `uv` (`curl -LsSf https://astral.sh/uv/install.sh \| sh`); Python 3.11+ |
| `npx skills add` fails | Network / registry auth | Check `npm config get registry`; use `--registry` flag |
| Ralph loop stalls on story | Story blocked / flaky skill | Check `progress.txt` → `LAST_COMPLETED`; re-run resumes |
| `TELEMETRY.jsonl` >10MB | Retention not rotated | Auto-rotate at 10MB/30d; manual: `mv TELEMETRY.jsonl TELEMETRY.jsonl.bak` |
| Spec-kit convergence never passes | Drift in implementation | Check `DECISIONS.md` for corrective tasks; run `/speckit.implement` manually (it re-checks all tasks in `PLAN.md`/`tasks.md`) |
| Visual regression false positives | Dynamic content (dates, random IDs) | Add `data-test-visual-ignore` to dynamic elements |
| Bundle size gate fails | Heavy dependency added | Run `pnpm run analyze` → check `docs/bundle-report.json`; lazy-load or replace |
| Preview env not created | Vercel/Neon auth missing | Check `VERCEL_TOKEN`, `NEON_API_KEY` in `.env` |
| Chaos engineering fails | LitmusChaos not installed | `kubectl apply -f https://litmuschaos.io/litmus-operator.yaml` |
| Migration rollback test fails | Prisma version mismatch | Ensure `prisma` CLI matches `prisma/client` version in `package.json` |
| i18n routing broken | `next-intl` middleware missing | Add `middleware.ts` with `createMiddleware` from `next-intl` |
| SBOM generation fails | `syft` not installed | `curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh \| sh -s -- -b /usr/local/bin` |
| Renovate PRs not auto-merging | Test failures | Check `renovate.json` `automergeType`; ensure tests pass in CI |
| Arcjet RASP blocks legit traffic | Rules too strict | Tune `arcjet` rules in `lib/security.ts`; add allowlist |
| Prisma connection pool exhausted | `connection_limit` too low | Increase `connection_limit` in `DATABASE_URL`; add PgBouncer |
| Next.js build OOM | Memory limit too low | `NODE_OPTIONS="--max-old-space-size=4096"`; enable `swcMinify` |
| Docker build cache invalidated | `COPY package*.json` before source | Use `docker build --cache-from`; multi-stage with `package.json` first |
| `pnpm install` fails in CI | Lockfile out of sync | `pnpm install --frozen-lockfile`; regenerate `pnpm-lock.yaml` |
| Strix pentest timeout | Target not ready | Health check wait in `scripts/strix-wait.sh`; increase timeout |
| Loki OOM | Log volume too high | Reduce `chunk_target_size`; add `compactor`; retention 7d |
| Tempo trace sampling too low | `traces_sampler` not configured | Set `tracesSampleRate: 0.1` in OTel SDK; increase for errors |
| Argo Rollouts not progressing | Analysis run failed | Check `AnalysisRun` CR; fix Prometheus query; `argo rollouts get rollout` |
| GrowthBook experiment not starting | Feature flag not in GB | Sync Unleash → GrowthBook; `growthbook-cli` sync command |
| `trivy` false positive | Base image vulnerability | Use `distroless` / `alpine` base; `trivy ignore` in `.trivyignore` |
| `dependency-confusion` false alarm | Internal package mimics public | Add to `.dependency-confusion-ignore`; use `@scope/internal` |
| Renovate PR creates conflict | Multiple major updates | `renovate.json` `prConcurrentLimit: 1`; `groupName` for majors |
| CSP breaks inline scripts | Nonce not propagated | `next-csp` middleware; `script-src 'nonce-...'` in `next.config.js` |
| Cookie `SameSite=None` rejected | `Secure` flag missing | `cookieOptions: { sameSite: 'none', secure: true }` in Auth.js |
| PWA not installing | `manifest.json` missing icons | `pwa` plugin in `next.config.js`; 192/512px icons in `public/` |
| Expo push notification fails | FCM/APNs not configured | `expo push:setup`; `google-services.json` / `GoogleService-Info.plist` |

## Example `prd.json` (with all fields)

```json
{
  "stories": [
    {
      "id": "US-001",
      "title": "Project scaffold",
      "spec_task_id": "TASK-001",
      "spec_requirement_id": "REQ-001",
      "constitution_principle": "maintainability",
      "depends_on": [],
      "acceptance": ["Next.js App Router runs", "Tailwind v4 configured", "Prisma schema exists"],
      "passes": true,
      "retry_count": 0,
      "started_at": "2026-09-09T10:00:00Z",
      "completed_at": "2026-09-09T10:05:00Z"
    },
    {
      "id": "US-003",
      "title": "Database seed strategy",
      "spec_task_id": "TASK-003",
      "spec_requirement_id": "REQ-002",
      "constitution_principle": "testability",
      "depends_on": ["US-001", "US-002"],
      "acceptance": ["`pnpm run db:seed` works in LOCAL/DEV/STAGING", "Real data for all models"],
      "passes": false,
      "retry_count": 0,
      "started_at": null,
      "completed_at": null
    }
  ],
  "progress": {
    "last_completed": "US-002",
    "blocked": [],
    "deferred": []
  }
}
```

## `docs/MEMORY.md` Template (copied to project on first run)

See `docs/MEMORY.md` in this skill — contains sections for:
- Project Identity (from BRIEF.md)
- Pipeline State (phase status table)
- Design System (locked tokens)
- Spec-Kit Traceability (Constitution → Spec → Plan → Tasks → Stories)
- Key Decisions (append-only)
- Blockers / Concerns
- Session Continuity
- Credentials Required (user-supplied)
- Commands to Run the App
- Evidence Gallery (Phase 4 before/after)
- Capability Level Achieved (tools ran vs fell back)
- Update Protocol

## Skill Changelog

### v2.4.19 (2026-09-10)
- **Dashboard page now states how to resume (user: "how will I know the URL when resumed, and can I stop/resume/pause/cancel from the dashboard?").** The control card's fine print now includes the exact restart line: `node <skill-dir>/scripts/resume.js <project-dir> --budget-resume` (or re-run `/fullstack-builder`, which auto-detects and resumes), so the URL page itself tells the user how to restart — no need to remember a separate command.

### v2.4.18 (2026-09-10)
- **Re-invoking the skill now resumes instead of restarting (user: "if I do /fullstack-builder continue or resume will it auto trigger?").** Before this, re-running `/fullstack-builder` on an in-progress project re-ran Phase 1 (regenerating docs) and Phase 2 (re-running every story) — the engine's `--budget-resume` was opt-in and the skill never passed it. Added **Phase 0 step 0 — Resume detection**: if `<project>/progress.txt` exists, `prd.json` has ≥1 `passes: false` story, and no live `.ralph.pid`, the skill hands off to `node <skill-dir>/scripts/resume.js <project-dir> --budget-resume` (reactivates the dashboard, prints the URL, runs the engine driver from the last completed story) and **stops** — no re-running Phases 1–4. If a live `.ralph.pid` exists it just reactivates the dashboard and reports the URL. Added `scripts/resume.js` (dashboard reactivation + URL + engine handoff, graceful when the driver is absent). Verified: resume.js reactivates the dashboard and prints the URL in both the no-driver and already-running cases.

### v2.4.17 (2026-09-10)
- **Dashboard survives a stop/resume (user: "if we stop building mid and start later, how do I access the dashboard?").** The dashboard is a `nohup &` background process tied to the shell, so it is gone when you come back. Three fixes: (1) on start it writes `<project>/.dashboard-url` (`{"url","port","project","started"}`, gitignored like `.env*`); (2) on launch it probes that file and, if a dashboard is already alive on the recorded port, just prints its URL instead of spawning a duplicate; (3) §16 now documents the resume command as simply `node <skill-dir>/scripts/dashboard.js <project-dir>` — no port to remember. Verified: second launch against an already-running instance prints "already running at …" and exits 0. (The one-line resume wrapper `resume.js` and the Phase 0 auto-resume handoff were added in v2.4.18.)

### v2.4.16 (2026-09-10)
- **App name now starts empty and is taken from the real title (user: "i'm getting BRIEF.md — Evolv run dashboard as app name").** `appIdentity()` no longer falls back to the folder name, and it strips a leading document label (`BRIEF.md — …`, `PRD.md — …`) from the `# Title` line — the skill's `BRIEF.md`/`PRD.md` templates begin with a label-prefixed heading, so the old extractor was grabbing `BRIEF.md — Evolv run dashboard` as the app name. Resolution order is now: `docs/BRIEF.md` `# Title` → `docs/PRD.md` `# Title` → `package.json` name → **no name**. Verified: empty project → `appName: ""`; label-prefixed BRIEF → `"Evolv run dashboard"`; real product title → `"Weather Dashboard"`.

### v2.4.15 (2026-09-10)
- **Root cause of "no live token consumption": nothing was writing TELEMETRY.jsonl.** The skill described a per-story telemetry writer (Self-Evolution Layer §A) but no code implemented it — the ralph scripts log only to `ralph.log`, and the skill's own scripts had no writer. So the dashboard's tokens card summed an empty file. Added `scripts/telemetry-write.js` (v2 schema: `v`/`skill`/`story`/`duration_ms`/`success`/`retry_count`/`tokens_in`/`tokens_out`/`cost_usd`/`model`/`ts`; PII-scrubbed per the contract — story IDs → `US-###`, free-text titles → per-line-nonce SHA-256, never reversible/correlatable; skill and model names are tool/provider identifiers, not PII; 10MB/30-day rotation; crash-safe rename-guarded append) and wired it into ralph AGENTS.md rule 32 (per-story, best-effort, never blocks the story; pass 0 for tokens/cost when the host doesn't expose them). The dashboard also auto-migrates v1→v2 and now shows "no token data" instead of a misleading 0 when calls exist but no token fields. Verified: 3 lines appended → 3 calls / 10,600 tokens / $0.07 / per-skill breakdown; PII scrub confirmed.

### v2.4.14 (2026-09-10)
- **Fix to v2.4.13: root artifacts no longer appear before they exist (user: "i see docs in artifacts even though they haven't been created yet").** `rootArtifacts()` now skips entries whose `stat` fails (only files that actually exist are listed, with their mtime); the root and docs/ sections show "no root artifacts yet" / "no docs/ yet" when empty. Verified: empty project → `rootArtifacts: []`, `docs: []`; populated project → only real files with mtimes.

### v2.4.13 (2026-09-10)
- **Artifacts card now shows everything that exists, with age stamps (user: "i don't see artifacts getting displayed as soon as they get generated").** The old card listed only flat `docs/*.md` pills, so nested docs (`docs/adr/*`) and root artifacts (`progress.txt`, `TELEMETRY.jsonl`, `prd.json`, `.run-model`) never appeared even though they're generated live. `docStatus()` now walks `docs/` **recursively** and `rootArtifacts()` lists the root pipeline artifacts; each pill shows the file name + "how long ago" it was last written, so a freshly generated doc is visible as "3s" instead of absent. Verified: recursive `docs/CONSTITUTION.md`, `docs/DECISIONS.md`, `docs/adr/001-foo.md` + root `prd.json`/`progress.txt`/`TELEMETRY.jsonl`/`docs/README.md`/`docs/PROJECT_STATUS.md` all render with mtimes.

### v2.4.12 (2026-09-10)
- **Live tracking is now server-pushed, not polled (user request: "more powerful, and also on live tracking").** The page switched from 3s polling to **SSE** (`/api/stream`, pushes every 2s, `retry: 2000`, falls back to polling if the browser loses the stream) — so progress, the stalled banner, tokens, and events update within ~2s of the artifacts changing instead of lagging up to 3s. Verified: HTTP 200 + three real SSE `data:` events on a fixture project. The v2.4.6 changelog line's "poll every 3s" is corrected to the new push model.

### v2.4.11 (2026-09-10)
- **AI / tokens card added to the dashboard (user request: "which models we are currently using, token consumed, context used").** New `aiSummary()` aggregates `TELEMETRY.jsonl` (v2 schema: `tokens_in` / `tokens_out` / `cost_usd`) into total tokens, total cost, per-skill breakdown (calls/tokens/cost/last used), and the **model in use**. Model identity was NOT logged anywhere — the ralph driver doesn't record it and it's chosen by the host agent config — so the skill now writes `<project>/.run-model` at run start (detected from `OPENAI_MODEL`/`ANTHROPIC_MODEL`/`GEMINI_MODEL`/`MODEL`, never invented); the dashboard falls back to the most-used `model` in telemetry if `.run-model` is absent, and shows "—" if none is detectable. Phase 0 §16 updated with the `.run-model` write step + the AI card description (`.run-model` is a transient run artifact, gitignored like `.env*`). Verified: 3 telemetry lines → tokens 7250 / cost $0.05 / per-skill breakdown; model from `.run-model` (source "env") and from telemetry fallback.

### v2.4.10 (2026-09-10)
- **App name + path in the dashboard (multi-app tracking).** Dashboard header now shows the **app name** (resolved from `docs/BRIEF.md` `# Title` → `docs/PRD.md` `# Title` → `package.json` name → no name; the folder-name fallback was later removed in v2.4.16, and a leading `BRIEF.md — …` document label is stripped) in a per-app accent color (stable hue hashed from the absolute path), the **full absolute path** beneath it, and the app name in the browser tab — so several dashboards open at once are instantly distinguishable. `/api/status` exposes `appName`, `appPath`, `hue`. Verified: BRIEF title → "Weather Dashboard…", package.json → "umbrella-app".

### v2.4.9 (2026-09-10)
- **Real stop/pause control from the dashboard (user request: "control the flow").** Dashboard gains **Pause run** / **Stop run** buttons → `POST /api/control` writes `<project>/.dashboard-control` (`{"action":"stop"|"pause","ts"}`). New `scripts/control-watchdog.js` polls the file every 2s and SIGTERMs (SIGKILL fallback after 5s) the ralph supervisor PID read from `scripts/ralph/.ralph.pid`, then deletes the control file. Wired into Phase 0 §16: dashboard **and** watchdog start together at run start (watchdog logs to `/tmp/fb-watchdog.log`). Loss semantics = existing crash recovery — only the in-flight story since the last per-story commit is re-run on `--budget-resume`. No engine changes; the supervisor is stopped, never patched. Verified end-to-end: fake supervisor process → POST stop → watchdog killed it (alive NO), control file removed.

### v2.4.8 (2026-09-10)
- **Dashboard stuck/killed detection (user question: "if the agent got stuck or killed will it notify").** The dashboard now computes "last activity" = newest TELEMETRY event timestamp OR most recent git commit (`git log -1 --format=%ct`); when inactivity exceeds the stall threshold (default 15 min, tunable via `FB_STALE_SECONDS`) `/api/status` returns `stalled:true` + `activity_secs` and the page shows a red STALLED banner: "no activity for Ns — agent likely stuck/killed — last activity <ts> — resume with `--budget-resume` when ready." Read-only by design: the dashboard cannot stop a dead process, but the pipeline is resumable (prd.json + progress.txt = complete state, crash rollback to last commit), so the banner tells the user exactly how to recover. `api/status` exposes `started`/`stalled`/`activity_secs`/`last_activity_iso`. Verified: fixture with 1h-old activity → `stalled:true, activity_secs:3602`.

### v2.4.7 (2026-09-10)
- **Dashboard URL announced at invocation, auto-free-port (user request: "when I run /fullstack-builder it should give me the URL of the dashboard").** `scripts/dashboard.js` now auto-picks the first free port starting at 3420 (+1 per busy port, up to +50, prints each trial) instead of exiting on EADDRINUSE. Prerequisite 16 rewritten: the dashboard is the **absolute first action of a run** — started in the background before Phase 0 checks, its stdout captured to `/tmp/fb-dashboard.log`, the URL grepped out and announced to the user in the first response ("Monitor the run: <URL>"), and repeated in the final report. Verified: two concurrent instances auto-bump to 3420/3421/3422 correctly.

### v2.4.6 (2026-09-10) — history added retroactively at line 349; note the "poll every 3s" wording below was superseded by the SSE push model in v2.4.12
- **Local live-status dashboard added (user request).** New `scripts/dashboard.js` — a dependency-free Node stdlib HTTP server + auto-refreshing HTML page (poll every 3s) that tracks the run continuously at `http://127.0.0.1:3420` (port override arg). READ-ONLY: derives state from artifacts the pipeline already writes (`prd.json` stories/passes, `progress.txt` last_completed/blocked/deferred, `TELEMETRY.jsonl` live events, `docs/*` inventory, git log) — zero hooks, zero new writes, startable/stopable anytime. Shows progress % bar, story table (ID/title/spec trace/principle/ACs/deps/pass), live event log, artifact pills, and recent commits. Wired into the skill as Phase 0 §16 (started in background at Phase 0 end, URL reported in final report, failure noted in `DECISIONS.md` and never blocks a phase). Verified: HTTP 200 + correct JSON on a fixture project with 2 stories (parsed 50%, events, docs, git).

### v2.4.5 (2026-09-10)
- **Keys: never requested, ever (user directive).** Prerequisite 15 now carries an explicit guarantee: keys are never requested from the user, never gate a phase, never delay a story. The entire build through Phase 4 runs on test-mode/no-key fallbacks; the user inserts real keys only at go-live, guided by the final report's deferral list (env var + consumer path). The skill must not ask for keys at any point — the build completes and the UI reaches final state without them.

### v2.4.4 (2026-09-10)
- **Closed the remaining stop-worthy caveats (from the "is it hands-free" audit).** (1) **New prerequisite 15 — service-credential inventory + deferral:** generalizes the existing Stripe-deferral / cloud-credential (§13) / email-test-mode patterns to ALL real-service keys (Arcjet, Resend, AI gateway, OCR, deploy hosts). One Phase-0 sweep classifies each key `available`/`deferred` (never echoed); deferred integrations still ship behind `lib/<service>.ts` with deterministic test-mode/no-key fallbacks (never fake "paid"/"sent"); each missing key is recorded once in `DECISIONS.md` + final report as a real-account deferral. If the inventory is skipped, the build never starts. (2) **Prerequisite 11 hardened** with a required command-set check (`specket.constitution/specify/plan/tasks/implement/checklist/analyze/clarify.md` all present) and an adapt-on-drift rule — if the installed spec-kit version's command set differs, record it in `DECISIONS.md` and adapt Phase 1/1b/2 invocations before proceeding, never referencing a phantom command. (3) **Mid-build drift re-verification:** the `doc-contract-check.js` (base mode) now also runs at the every-5-stories convergence checkpoint, catching thin/placeholder docs introduced during the ralph loop instead of only at phase boundaries/Phase 3.

### v2.4.3 (2026-09-10)
- **Closed the two remaining "detailed docs" gaps (from the left-over audit).** (1) Tightened `doc-contract-check.js` PLAN.md contract — the old markers matched anything containing the words "test"/"risk"/"phase"; now requires the actual contract terms: phase breakdown + exit criteria (`done when`/`exit criterion`), dependency graph + `blocked-by`/parallel relations, risk register + mitigation/severity, infra plan (docker/compose/ports/healthcheck/volumes), testing strategy (coverage/vitest/playwright/E2E/axe), security plan (CSP/rate-limit/arcjet/RBAC/secrets/Zod). Thin plans now fail mechanically. (2) Added `--convergence` flag to the script for the Phase-3 gate: requires every prd.json story `passes: true` with no open `depends_on` to a failing story (matches the `speckit.implement` degradation check). (3) Spec-kit Phase 2 §2 now requires `/speckit.checklist` + `/speckit.implement` to have **run and passed** (evidence quoted in `DECISIONS.md`) before Phase 3, with the `--convergence` script check after the gate. Verified: PASS on detailed plan / PASS convergence / FAIL on not-passing story / FAIL on thin plan.

### v2.4.2 (2026-09-10)
- **Tool-forced doc enforcement (completes the "does speckit create detailed docs" answer).** Added `scripts/doc-contract-check.js` — a dependency-free mechanical gate that fails on: missing CONSTITUTION principle sections, missing SPEC/PLAN sections, a SPEC traceability matrix without a real table, forbidden `TBD`/`TODO`/`FIXME`/`[NEEDS CLARIFICATION]`/lorem-ipsum, and prd.json stories lacking `US-###` id / title / spec-kit traceability (spec_requirement or constitution_principle) / <3 acceptance criteria. Wired into Documentation OS §7 as step 4 (mechanical gate before phase completion; non-zero exit blocks the phase) and into `CI_CD.md` as a CI check. Checks the mechanically-verifiable subset only — semantic richness stays agent-verified per §7 step 3. Verified PASS on compliant fixture, FAIL on thin/filler fixture. Shipped file-tree updated.

### v2.4.1 (2026-09-10)
- **Generation-time verification closes the enforcement hole (user question: "does speckit create detailed docs, not just placeholders?").** Investigation of the actual installed `/speckit.*` command files (`.opencode/commands/` of the reference project) showed `speckit.specify` has a built-in self-validation loop (write → own checklist → re-write up to 3 iterations) but `speckit.plan` and `speckit.tasks` have **no** quality loop — their richness depends on LLM diligence alone, and nothing would stop a thin PLAN.md/task list from reaching ralph. Added **Documentation OS §7: Generation-time verification** — after every constitution/specify/plan/tasks run, verify the output against that command's `MUST contain` list + the `DOC_TEMPLATES.md` contract (no TBD/placeholders/dangling `[NEEDS CLARIFICATION]`); thin = expand in place or re-run with the list as context, max 3 iterations, then halt + record in `DECISIONS.md` — NEVER proceed with a thin upstream doc. Quoted evidence per item, same rule as the DESIGN.md gate. Each of the four spec-kit command blocks now ends with `→ Verify after generation ... §7`.

### v2.4.0 (2026-09-10)
- **Documentation OS (living-spec system) added.** Turned the doc set into a governed, drift-controlled operating system — not a static file dump. Ships `docs/DOC_TEMPLATES.md` (the 12-phase template bank, ~78 doc contracts with metadata + authority + dependencies) and adds a `Documentation OS` section to SKILL.md that defines: doc inventory (Tier 1 pre-existing + Tier 2 additions), dependency-aware generation order wired into Phases 0/1/1b/2, frontmatter metadata + authority precedence (CONSTITUTION > CONSTRAINTS > DOC_GOVERNANCE > source-of-truth > derived), stable-ID namespaces (`BR-###`, `REQ-###`, `SPEC-###`, `FLOW-###`, `AC-###`, `RULE-###`, `STATE-###`, `API-###`, `DATA-###`, `AI-###`, `SEC-###`, `TEST-###`, `ADR-###`, `US-###`), anti-duplication rules (defer by reference, never two sources of truth), and a 6-point living-spec audit (completeness, consistency, traceability, agent readiness, no-hallucinated-decisions, README index). New docs include the governance/control set (`DOC_GOVERNANCE.md`, `AGENTS.md`, `USER_FLOWS.md`, `BUSINESS_RULES.md`, `ACCEPTANCE_CRITERIA.md`, `STATE_MODEL.md`, `TRACEABILITY.md`, `DEFINITION_OF_DONE.md`, `DRIFT_CONTROL.md`), AI set (`AI_SPEC.md`/`AI_GUARDRAILS.md`/`AI_EVALS.md`/`AI_MEMORY.md`/`AI_CONTEXT.md`/`AI_COST.md`/`AI_MODEL_POLICY.md` — only when product has AI), UX/backend/data/security/quality/ops/project-mgmt sets. Preserves all 14 vibe-docs docs + 8 builder additions (Tier 1) — nothing renamed or replaced. `MEMORY.md` shipped template's phantom `/speckit.converge` reference corrected to the real `implement` + `checklist` mechanism.

### v2.3.3 (2026-09-10)
- **Docs were too thin (user report: "docs are there but not detailed enough").** The spec-kit templates are 40–130-line scaffolds — the detail came from how the LLM executed each `/speckit.*` command, and the skill's invocation instructions gave no content contract. Added **MUST contain** sections to all four spec-kit commands: **Constitution** (6 named principle sections, each with ≥3 concrete rules), **Specify** (numbered functional + non-functional requirements, per-route API contracts, full Prisma data model, requirement→story traceability matrix), **Plan** (phase breakdown, dependency graph, risk register, infrastructure plan, testing strategy, security plan), **Tasks** (every task has ID/title/REQ-id/constitution-principle/≥3 acceptance criteria/complexity/dependencies/US-map; no orphaned tasks). No placeholders, no TBD, no template-filler permitted.
- **TRD.md added** (user request): new `docs/TRD.md` template shipped with the skill (stack lock-in, performance budgets, security requirements, data integrity, a11y level, environment matrix, external integrations, observed assumptions); written into the project during Phase 1 step 4 alongside vibe-docs' 14 docs; completeness gate updated to require it.

### v2.3.2 (2026-09-09)
- **spec-kit wiring fixed (the "no docs appeared" bug).** Root cause: spec-kit's `/speckit.*` commands are **per-project**, installed by `specify init <project> --integration <agent>` into the project's command root — the skill never ran `specify init`, so **none of the `/speckit.*` commands existed** and every invocation silently produced nothing. Added `specify init` as a **mandatory** Phase 0.5 step (prerequisite 14) with an explicit post-init verification (check the detected backend's command root contains `speckit.constitution.md`); re-run if missing. Also fixed the phantom **`/speckit.converge`** command — spec-kit v0.8.x has **no `converge`** (verified against the real opencode integration manifest: `analyze, checklist, clarify, constitution, implement, plan, specify, tasks, taskstoissues`). Convergence is now `speckit.implement` (task validation via `check-prerequisites.sh --require-tasks`) + `speckit.checklist` (requirements-quality unit tests), with a `jq` fallback when spec-kit is degraded. Updated Phase 2 §2, Phase 3 gate, verification checklist, troubleshooting table, source map, skill-map row, and changelog; all remaining `/speckit.converge` mentions are explanatory notes confirming it doesn't exist.

### v2.3.1 (2026-09-09)
- **Real validator replaces phantom `npx skills validate`.** The skills CLI (verified v1.5.18) has NO `validate` command, so §I's "independent validation" gate (which protects every self-edit of SKILL.md) would have been permanently a no-op — silently disabling self-modification. Added `scripts/skill-validate.js` (local, dependency-free): checks valid frontmatter (name + description), balanced code fences (catches truncated writes), and non-additive diffs via `--require-additive-only`. Updated §I dry-run + independent-validation steps, the self-evolve mechanism (line ~1678), and the shipped file-tree to use it. Verified PASS on clean skill, PASS on additive-only diff, FAIL on diffs with deletions. Version bumped to 2.3.1 (patch, per §I semver rule).

### v2.3.0 (2026-09-09)
- **Audit hardening pass (fixes all outstanding C/H/M findings):**
  - **Objective prize-worthiness gate (C2/H5):** Section 7 now has a machine-checkable validator (6 criteria: hue/type distinctiveness vs category default, signature-element scan, hero-composition heuristic, AA contrast, animation budget, fresh-context `impeccable` review). "All YES" is no longer a free pass; the gate records evidence, not assertions.
  - **Deploy/Edge contradictions (C4/H8/H9):** LitmusChaos (US-017), Argo Rollouts/Flagger (US-054), OpenCost/Kubecost (US-059), and Argo Rollbacks (US-058) now have explicit non-K8s (Vercel/Docker/toxiproxy) degradation paths; US-025/026 resolve the Edge-vs-Node rate-limit and Socket.io-Node-boundary contradictions; Phase 0 gained a cloud-credential preflight + degradation path (deploy by capability, never by mock).
  - **Self-mod hardening + PII (H6/H7):** self-modifying SKILL.md is now bound by git/bak rollback, enforced additive-only diffs, independent validator, ambiguity→bail; telemetry PII is per-line nonce-hashed and non-correlatable.
  - **Versions (H3):** GSAP standardized 3.13+, Expo SDK 54+, Storybook 9+; added a version-resolution strategy (stack declaration authoritative) + niche-CLI run-time verification for next-csp/sloth/prisma-query-analyzer.
  - **Text-only Phase 4 (H4):** vision-agnostic guard — a text-only agent validates mechanically only and never claims unseen visual polish.
  - **Dark mode (H10):** mandatory full dark mode (every semantic color paired, class-based toggle, AA on both themes) in DESIGN.md Section 1 + completeness gate.
  - **Dedup + cleanups (M1–M13):** removed duplicated telemetry copy, skill-map rows, self-mod mechanism; fixed double-`5.` numbering; story-count → 89; atomic git commit per story (M6); Redis/S3 backup coverage (M5); PII-verified fictional seed (M12); feature-flag lifecycle retirement (M7); motion budget; .env fail-fast; fixed US-088 self-referential dep and US-089 authz reference.
  - **Motion/3D bundle contract (M9):** US-062 now mandates code-split, SSR-off, viewport-triggered lazy loading of Three.js/GSAP/Rive; US-011 treats lazy motion/3D chunks as separate from the 200KB initial budget, reclassifying any lazy chunk that loads on first viewport as initial. Under-budget vs signature-moment tradeoff explicitly resolved.
  - **RTL layout spec (M10):** DESIGN.md Section 2 now mandates logical properties (`start/end`, `ms/me/ps/pe`, `inset-inline`), `dir`/`lang` on `<html>`, direction-agnostic grids, and direction-specific element review in Section 4 + Phase 3 RTL E2E.
  - **Font embedding/licensing (M11):** DESIGN.md Section 1 now requires self-hosted `next/font` subsets (no runtime CDN), records font licenses (OFL), always-present fallback stacks, and subset/weight limiting per locale.
  - **MCP run-time provisioning (new Phase 0 §14):** added check → configure → use → degrade contract — MCP servers (agent-browser/Playwright, ocr, prisma/DB, Liveblocks, GitHub) are detected in host config, registered on demand only when a story gates on them, sources pinned, and degrade explicitly to a fallback (never hang, never mock); skill-map `mcp-servers` row updated to reference it.
  - **OpenCodeReview coherence (AI code review):** install corrected to `pnpm add -g` (H1 canonical) and the Phase 3 `ocr review` gate gained a degradation path (Semgrep/Strix coverage + `DECISIONS.md` record) instead of hard-blocking the run when the CLI can't install.
  - **Tool/agent-agnosticism (host portability):** confirmed the SKILL.md body has zero host-specific API calls; broadened backend detection to opencode→claude→codex→claude-code with an explicit statement that ANY Agent-Skills host (Cline, Antigravity, Replit, Cursor, Windsurf) can run it; made the MCP-provisioning step resolve the current host's MCP config by its own convention (opencode/Claude `.claude.json`/Cline/etc.), not opencode's only; added a per-host install matrix; the `command/fullstack-builder.md` slash command is now explicitly opencode-only and optional elsewhere.

### v2.2.0 (2026-09-09)
- **AI Code Review:** OpenCodeReview (Alibaba) @alibaba-group/open-code-review v1.11.6+ — CLI (`ocr review`, `ocr scan`, `ocr delegate`), CI/CD (GitHub Actions, GitLab CI, Gerrit), agent integrations (Claude Code, Codex, Cursor, OpenCode, QCA Forward), delegation mode, multi-language rules (NPE, thread-safety, XSS, SQL injection), session viewer, MCP server, OpenTelemetry, hybrid deterministic + LLM architecture (~1/9 tokens, higher precision/F1)
- **Modern React/Next.js 2026+:** Next.js 15 (Turbopack Dev stable, Async Request APIs, React Compiler experimental, Static Route Indicator, unstable_after, instrumentation.js, <Form>, next.config.ts, Server Actions security) + TanStack Start (router-first full-stack, portable) + Waku (React on Hono) + RedwoodJS v7+ (full-stack RSC) + Bun v1.1+ (WinterCG, native SQLite)
- **Security 2026+:** Semgrep 2026 multimodal AI (SAST/SCA/Secrets/Guardian/Workflows, reachability analysis 98% FP reduction, semantic secrets 630+ types, Guardian for AI code, AppSec Platform, Agentic Workflows, MCP integrations) + Bearer CLI (free SAST + PII/PHI) + OSV Scanner + CodeQL + DAST (OWASP ZAP/StackHawk/Escape/Probely) + eBPF runtime security (Falco/Tetragon/Cilium/Tracee) + CVE monitoring (OSV/GitHub Advisory/NVD) + Cosign/sigstore/rekor/fulcio (keyless signing, SLSA provenance)
- **Policy/Legal 2026+:** Osano CMP enterprise (50+ countries, 95+ regs, 45+ langs, AI cookie classification, $500k guarantee) + Klaro/cookie-consent open-source + Extended pages: AUP, Refund/Cancellation, SLA/Uptime, Export Controls (EAR/ITAR), Age Verification (COPPA/GDPR-K/UK Children's Code), DMCA Policy
- **Database 2026+:** PostgreSQL 17+ + pgvector + Prisma 8 (TypeScript runtime, contract-based models, composable query DSL, graph migrations, SPI) + Drizzle ORM v1.0 (relational queries v2, MSSQL/CockroachDB, catalogs, runtime mgmt) + Kysely 0.29+ (type-safe SQL, zero deps, kysely-codegen) + PGlite + TanStack DB (local-first)
- **Observability 2026+:** Grafana Cloud AI Assistant, Agent Observability, Adaptive Telemetry (35-50% savings), Frontend RUM, Synthetic Monitoring, k6, IRM, OnCall + Vercel Observability (framework-aware insights, anomaly detection, Web Analytics, Speed Insights, OTEL export, Log Drains) + Highlight.io PII masking config
- **Deployment/Edge 2026+:** Vercel Fluid Compute (pricing, framework-aware, Edge Config/Blob/KV) + Cloudflare Workers (zero cold starts, 330+ cities, CPU-time billing, Smart Placement, R2/D1/KV/Queues/Workers AI, Python/Rust/WASM) + Deno Deploy (V8 isolates, native TS) + Bun (native SQLite) + Edge middleware patterns (auth, rate limit, A/B, geo, caching)
- **AI/LLM 2026+:** Vercel AI Gateway (100+ models, single key) + Workflows (suspend/resume) + Vercel Sandbox + AI Elements (npx ai-elements) + LangGraph (stateful agents/workflows) + Cohere v3/Jina/Voyage reranking + Local LLMs (Ollama/LM Studio/vLLM/TGI/llama.cpp) + MCP servers
- **Real-time 2026+:** WebTransport (HTTP/3 bidirectional) + Automerge 2.0 (JSON CRDT) + RGA/Peritext (rich text CRDT) + ElectricSQL v1 (managed agents, durable streams, CDN cacheable, TanStack DB/PGlite) + Liveblocks MCP server
- **Developer Experience 2026+:** pnpm 12.x (catalogs, strict node_modules, build script approval, patch deps, runtime mgmt, JSR) + Husky/lint-staged pre-commit + Changesets v3 + IDE integration (Cursor, VS Code Copilot, Zed) + GitHub Actions composite actions, pnpm store cache
- **Extended stories:** US-001 to US-089 (roughly nine-dozen stories; US-087/088/089 are SaaS-only billing stories)
- **Extended Phase 3 gates:** 25+ new gates for all 2026+ capabilities

### v2.1.0 (2026-09-09)
- **BLUEPRINT.md:** Unified architecture document consolidating ARCHITECTURE + DATA_MODEL + API_SPEC + DESIGN + state architecture + security model + observability + deployment targets + ADR index
- **SPEC.md/BLUEPRINT.md distinction:** SPEC.md = requirements/contracts (what), BLUEPRINT.md = implementation architecture (how)
- **Auto-generated ADRs:** Every DECISIONS.md entry creates ADR via documentation-and-adrs skill
- **Legal/Compliance pages (US-067):** ToS, Privacy Policy, Cookie Policy, DPA, Security Policy, Accessibility Statement (WCAG 2.2 AA), Subprocessor List — auto-generated from data model
- **Cookie Consent Banner CMP (US-068):** shadcn Dialog + useCookieConsent hook; categories (necessary/analytics/marketing); GTM/analytics integration; geo-aware GDPR/CCPA
- **Automated legal doc generation (US-069):** Prisma schema → PII detection → Privacy/ToS/DPA templates; subprocessor list from deps + services
- **Modern animation stack (US-061):** Framer Motion 12+, Motion One, GSAP 3.13+ ScrollTrigger, CSS @starting-style, anchor positioning, container queries, animation-timeline
- **3D/WebGL optional (US-062):** React Three Fiber 9 + Three.js r160+, Rive/Lottie for complex illustrations
- **React 19 features (US-063):** useOptimistic (all mutations), useActionState (forms), use() + Suspense (streaming), Server Actions streaming
- **State management architecture (US-064):** TanStack Query v5 (server state), TanStack Router (type-safe routing), Zustand 5/Jotai 3 (client state), React Context (theme/auth)
- **pgvector/RAG pipeline (US-065):** pgvector on Prisma Postgres, vector columns, document ingestion/chunking/embedding/retrieval, Vercel AI SDK 4+ integration, agent-elements chat with citations
- **Database provider choice (US-066):** Prisma Postgres (default), Neon, PlanetScale, Turso/libSQL; Drizzle ORM alternative for edge
- **Vercel AI SDK 4+ (US-009):** Streaming, tool calling, generative UI, RAG patterns
- **Auth.js v5 Passkey-first (US-004):** Passkey/WebAuthn primary, device-bound + synced, autofill/sync, email magic link fallback
- **Trust Types + COOP/COEP (US-070):** Trusted Types via CSP, DOMPurify; COOP: same-origin, COEP: require-corp
- **Session replay (US-071):** Highlight.io/LogRocket with PII masking
- **Monorepo tooling (US-072, gated):** Turborepo + pnpm workspaces + Changesets
- **Modern GitHub Actions (US-073):** Reusable workflows, matrix testing, caching, Slack notifications, deployment gates
- **Real-time collaboration (US-027, gated):** PartyKit/ElectricSQL/Liveblocks/Yjs for CRDT sync
- **SSE (US-028):** Native SSE via Next.js Route Handlers
- **OKLCH color space mandated** in DESIGN.md tokens + Tailwind v4 @theme
- **Extended stories:** US-009 to US-073 (65 stories total vs 57)
- **Extended Phase 3 gates:** 20+ new gates for all new capabilities

### v2.0.0 (2026-09-09)
- **Architecture:** Integrated spec-kit (constitution, specify, plan, tasks, converge) as default capability (no flag)
- **Pipeline:** Added Phase 0.5 (specify init), Phase 1b (plan+tasks), Phase 2 extended (US-009 to US-057)
- **Ralph Loop:** Retry/backoff, dependency DAG (parallel), cost/token budget, partial resume
- **Self-Evolution:** Telemetry (v1 schema, PII scrubbing), skill swap with rollback, semantic phase detection, prompt template promotion (3-run gate), pattern library versioning/deprecation, SKILL.md self-modify with dry-run, vector DB similarity
- **Phase 3 Gates:** 40+ new gates (visual regression, bundle size, OpenAPI, preview envs, feature flags, API contracts, secrets scan, chaos, rollback test, webhooks, i18n, SBOM, Renovate, RASP, indexing advisor, query analysis, test gen, webhook contracts, flag analytics, A/B, SLO, PITR, cross-region, security headers, CSP nonce, cookie audit, dep confusion, SLSA, runtime vuln scan, log aggregation, tracing, custom metrics, flag rollout, canary deploy, migration safety, zero-downtime, auto-rollback, cost allocation, GDPR deletion)
- **Flags:** `--dry-run`, `--budget-resume`, `--resume-from`, `--phase`, `--verbose/--debug`
- **Troubleshooting:** 30+ new entries
- **Example prd.json:** Added `started_at`/`completed_at` timestamps

### v1.0.0 (initial)
- Core pipeline: Phase U → vibe-docs → vibe-build → Phase 4 IMPROVISE
- UI gates (rules 21-32 appended to AGENTS.md), spec-kit as optional flag
- 7-layer self-evolution (telemetry, swap, dynamic phases, prompt evolution, gap discovery, patterns, skill updates)