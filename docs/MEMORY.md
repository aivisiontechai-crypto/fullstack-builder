# Project Memory — [PROJECT NAME]

> **Purpose**: Maintain context across sessions for the fullstack-builder pipeline.
> **Location**: `docs/MEMORY.md` (project root, git-tracked)
> **Updated**: Every phase completion, major decision, or session handoff.

---

## Project Identity

| Field | Value |
|-------|-------|
| **Product Name** | [from BRIEF.md] |
| **One-liner** | [from BRIEF.md objective] |
| **Target Audience** | [from BRIEF.md] |
| **Core Value Prop** | [from BRIEF.md] |
| **Success Metrics** | [from PRD.md] |

---

## Pipeline State

| Phase | Status | Started | Completed | Notes |
|-------|--------|---------|-----------|-------|
| Phase 0: Prep | ☐ Pending | | | |
| Phase 1: Brief + UI + Constitution + Specify + Docs | ☐ Pending | | | |
| Phase 1b: Plan + Tasks → Stories | ☐ Pending | | | |
| Phase 2: Ralph Loop (Build) | ☐ Pending | | | |
| Phase 3: Final Gates | ☐ Pending | | | |
| Phase 4: IMPROVISE | ☐ Pending | | | |

---

## Design System (Locked in Phase U)

| Token Category | Values | Source |
|----------------|--------|--------|
| **Color Palette** | Primary, Success, Danger, Muted (light/dark) | DESIGN.md / ui-ux-pro-max search |
| **Typography** | Font pairs, scale, weights | DESIGN.md / ui-ux-pro-max search |
| **Spacing** | Scale, radius, shadows | DESIGN.md |
| **Motion** | Easing, durations, reduced-motion | DESIGN.md |
| **Brand Voice** | Tone, naming, copy style | CONSTITUTION.md / brand skill |

**Anti-slop bans enforced**: No centered 3-emoji hero, no default purple gradient, no Acme/lorem, no bare spinners, no `space-x-*` hacks, no `@ts-ignore`/`eslint-disable` to get green.

---

## Spec-Kit Traceability (When Available)

| Artifact | Path | Status |
|----------|------|--------|
| Constitution | `docs/CONSTITUTION.md` | ☐ Draft / ☐ Locked |
| Spec | `docs/SPEC.md` | ☐ Draft / ☐ Locked |
| Blueprint | `docs/BLUEPRINT.md` | ☐ Draft / ☐ Locked |
| Plan | `docs/PLAN.md` | ☐ Draft / ☐ Locked |
| Tasks → Stories | `prd.json` (spec_task_id, spec_requirement_id, constitution_principle) | ☐ Mapped |
| Converge Gate | Runs at US-002, every 5 stories, pre-Phase 3 | ☐ Active |

**Convergence**: All stories `passes: true` AND `/speckit.implement` + `/speckit.checklist` report no drift (v0.8.x has no `converge`).

---

## Key Decisions (Append-only)

| Date | Decision | Rationale | Recorded In |
|------|----------|-----------|-------------|
| | | | DECISIONS.md |

---

## Blockers / Concerns (Carried Forward)

| ID | Description | Severity | Owner | Resolution Target |
|----|-------------|----------|-------|-------------------|
| | | | | |

---

## Session Continuity

| Session | Date | Phase/Task | Stopped At | Next Action |
|---------|------|------------|------------|-------------|
| 1 | | | | |

---

## Credentials Required (User Must Supply)

| Service | Env Var | Purpose | Supplied? |
|---------|---------|---------|-----------|
| Postgres | `DATABASE_URL` | Primary DB | ☐ |
| Auth.js | `AUTH_SECRET`, `AUTH_*_ID/SECRET` | Authentication | ☐ |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Payments (SaaS) | ☐ |
| Email | `RESEND_API_KEY` / `SMTP_*` | Transactional email | ☐ |
| AI | `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` | AI features | ☐ |
| [Other] | | | ☐ |

**Never committed** — all in gitignored `.env` / `.env.local`

---

## Commands to Run the App

```bash
# Development (canonical package manager = pnpm 12.x)
pnpm run dev

# Production build + start
pnpm run build && pnpm start

# Database (project-side scripts; Prisma via pnpm)
pnpm dlx prisma migrate deploy
pnpm dlx prisma db seed

# Tests
pnpm run test        # unit/integration
pnpm run test:e2e    # Playwright
pnpm run test:a11y   # accessibility regression
pnpm run storybook   # component stories

# Lint/Typecheck
pnpm run lint
pnpm run typecheck
```

---

## Evidence Gallery (Phase 4)

| Surface | Mode | Before | After | CWV | A11y |
|---------|------|--------|-------|-----|------|
| | Persuade/Operate/Activation/Read | `docs/ui-gallery/` | `docs/ui-gallery/` | Lighthouse | axe-core |

---

## Legal/Compliance Pages

| Page | Route | Status | Auto-Generated? |
|------|-------|--------|-----------------|
| Terms of Service | `/legal/terms` | ☐ | ✅ From data model |
| Privacy Policy | `/legal/privacy` | ☐ | ✅ From data model + gdpr config |
| Cookie Policy | `/legal/cookies` | ☐ | ✅ From cookie audit |
| Data Processing Agreement | `/legal/dpa` | ☐ | ✅ From subprocessors |
| Security Policy | `/legal/security` | ☐ | ✅ From security audit |
| Accessibility Statement | `/legal/accessibility` | ☐ | ✅ From axe/Lighthouse |
| Subprocessor List | `/legal/subprocessors` | ☐ | ✅ From deps + services |

**Cookie Consent Banner (CMP)**: shadcn Dialog + `useCookieConsent` hook; categories (necessary/analytics/marketing); geo-aware GDPR/CCPA

## Capability Level Achieved

| Capability | Tool Used | Fell Back? | Notes |
|------------|-----------|------------|-------|
| Design System Search | `ui-ux-pro-max` search.py | ☐ | python3 present? |
| Brand System | `design-md` reference | ☐ | Matching brand found? |
| Browser Iteration | `agent-browser` / Playwright MCP | ☐ | Real browser? |
| Lighthouse/CWV | Browser tool / `npx lighthouse` | ☐ | Headless fallback? |
| Strix Pentest | `owasp-top-10-testing` | ☐ | Cloud/CLI? |
| Spec-kit | `specify-cli` | ☐ | uv + Python 3.11+? |

---

## Update Protocol

**When to update this file:**
- ✅ Phase completion (mark status, add notes)
- ✅ Major decision made (append to Key Decisions)
- ✅ Blocker identified/resolved (update Blockers)
- ✅ Session end (fill Session Continuity)
- ✅ Credentials added (update Credentials Required)
- ✅ Phase 4 evidence captured (update Evidence Gallery)

**Do not**: Delete history, overwrite decisions, remove context future sessions need.