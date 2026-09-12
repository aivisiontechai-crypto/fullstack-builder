# TRD Template — Technical Requirements Document

Copy this template to the generated project's `docs/TRD.md` during Phase 1.
It captures the technical constraints, budgets, and environment requirements
that PRD.md (what) and SPEC.md (requirements/contracts) do not — the
non-negotiable engineering parameters the implementation must not breach.

## 1. Stack Lock-in
| Layer | Choice | Version | Rationale |
|-------|--------|---------|-----------|
| Framework | | | |
| UI | | | |
| ORM | Prisma | 8 | canonical default |
| DB | Postgres | 17+ | |
| Package manager | pnpm | 12.x | canonical |
| Auth | | | |
| AI SDK | | | |
| Testing | Vitest / Playwright | | |

## 2. Performance Budgets
| Metric | Budget | Measured at |
|--------|--------|-------------|
| Initial route JS | ≤200KB | gzip |
| LCP | ≤2.5s | 4G throttled |
| CLS | ≤0.1 | Lighthouse |
| TTI | ≤3.5s | 4G throttled |
| API p95 latency | | |

## 3. Security Requirements
- CSP nonces on every response
- Input validation (Zod) at every trust boundary
- Rate limits on every API route
- RBAC on every admin endpoint
- No secrets in code; env-gated credentials only

## 4. Data Integrity
- Prisma migrations for every schema change
- No raw SQL without Kysely type safety
- Soft deletes on all user-facing models
- Backup/restore tested before ship

## 5. Accessibility (WCAG AA)
- Keyboard navigable everywhere, focus states visible
- Reduced-motion respected
- Contrast AA on both themes (dark + light)

## 6. Environment Matrix
| Env | DB | Services | Env vars | Purpose |
|-----|----|----------|----------|---------|
| LOCAL | Docker Postgres | | | dev |
| DEV | Neon/PlanetScale | | | staging-like |
| STAGING | | | | pre-prod |
| PROD | | | | live |

## 7. External Integrations
| Service | Purpose | Cost/limits | Degrades to |
|---------|---------|-------------|-------------|
| | | | |

## 8. Observed Constraints & Assumptions
Record every assumption made hands-free (from Phase 0), so a later reader
knows what was decided without asking.