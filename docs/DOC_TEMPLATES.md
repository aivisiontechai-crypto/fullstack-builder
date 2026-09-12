# DOC_TEMPLATES — the fullstack-builder Documentation OS template bank

The Documentation OS is a **living specification**, not a static file dump.
Every doc below is generated during Phase 1/1b from these contracts, garnished
with real content from BRIEF.md + DESIGN.md + PRD.md + the fixed stack. Never
invent technology, providers, models, targets, or compliance requirements —
mark unknowns `TBD` and name who resolves them.

Every doc carries the same header block (metadata + authority + dependency
edges). Fill it on generation; the header is the machine-checkable part.

```md
---
document: <NAME>
version: 1.0.0
status: draft
authority: <authoritative|derived|operational>
depends_on: [docs/BRIEF.md, ...]
source_of_truth: true|false
last_updated: <ISO date>
---
```

**Authority rules:** a doc that is `source_of_truth: true` for a concern wins
over any `derived` doc that repeats it; derived docs must defer to it by
reference, never copy-and-drift. A `operational` doc records runtime reality
(env, status, incidents) and is the most current, not the most authoritative.
Conflict resolution: CONSTITUTION > CONSTRAINTS > DOC_GOVERNANCE > source-of-truth
docs > derived docs. When two source-of-truth docs contradict, the conflict is a
bug — fix it before coding, record in DECISIONS.md.

**Traceability spine (every doc attaches to it):**
`BR-###` (business) → `REQ-###` (PRD/SCOPE requirement) → `SPEC-###` (SPEC.md,
spec-kit) → `FLOW-###` (user flow) → `AC-###` (acceptance criterion) →
`US-###` (prd.json story) → implementation file → `TEST-###` (test).

---

## PHASE 0 — CONTROL

### MEMORY.md (exists — keep)
Already shipped. Cross-session pipeline state; not a substitute for any doc below.

### CONSTRAINTS.md (exists — keep)
Quality bar contract: measurable thresholds, tests, lint/type/coverage gates.
Authority: authoritative for the quality bar.

### CONSTITUTION.md (exists — keep)
6 named project principles (quality/testing/UX/perf/security/data), each ≥3
concrete rules. Authority: highest; conflicts with any doc resolve here.
Source of truth: true.

### DOC_GOVERNANCE.md (new)
**Purpose**: how this doc set rules the build. **Authority**: operational
(the rules of the rules). **Depends on**: CONSTITUTION, CONSTRAINTS.
**Content**:
- Document hierarchy diagram (control → product → requirements → architecture →
  AI → UX → security → quality → implementation → operations → project mgmt)
- Source-of-truth table: doc → concern it owns → derived docs that read it
- Conflict-resolution precedence (see header)
- Update-propagation rules: when a source-of-truth doc changes, list every
  derived doc that must be revisited
- Versioning: any change to a source-of-truth doc bumps its version + touches
  `TRACEABILITY.md`; derived docs reference by version
- Anti-contradiction rule: never let two docs grow competing definitions of the
  same term/route/entity; the owned doc is the single definition

### AGENTS.md (new — written to project root, consumed by the ralph loop)
**Purpose**: the canonical instruction set for the coding agent. **Authority**:
operational for how code is produced. **Depends on**: CONSTITUTION, CONSTRAINTS,
DEFINITION_OF_DONE, DOC_GOVERNANCE, BLUEPRINT, TRACEABILITY. **Content**
(concise, agents read it every task):
- Project context: one-liner, domain, stack summary (from BRIEF/BLUEPRINT)
- Documentation hierarchy + which docs to read before touching each layer
- Repo structure map (where pages, components, API routes, tests, scripts live)
- How to inspect (pnpm scripts, prisma studio, storybook) + how to implement
  (branch → read docs → code → tests → lint/type → commit per DoD)
- Coding standards (from CONSTITUTION I), architecture rules (from
  BACKEND/FRONTEND_ARCHITECTURE), security rules (from SECURITY_CONTROLS)
- Testing requirements (from TEST_STRATEGY), documentation-update rules
  (from CHANGE_POLICY)
- Forbidden patterns: no mock data shipped, no `@ts-ignore` to go green, no
  new deps sans DEPENDENCIES update, no secrets, no silent assumptions
- Required patterns: Zod at boundaries, tokens-only styles, error states on
  every screen, acceptance criteria first
- **No-silent-assumption rule**: any assumption → record in DECISIONS.md or
  update the relevant spec; never decide silently
- When to create an ADR (see CHANGE_POLICY), when to update specs
- Definition of Done (mirror DEFINITION_OF_DONE.md)
- Git rules: conventional commits, US-### scope, no force push to base
- How to handle uncertainty (verify, don't guess; degrade over fabricate) and
  how to verify own work (run the gates the story names)

---

## PHASE 1 — PRODUCT

### BRIEF.md (exists — keep)
prompt-architect output. Source of truth for product intent.

### BRD.md (exists — keep)
Business problem/goals/metrics/market/personas/monetization/risks. Source of
truth for business requirements → emits `BR-###` and `REQ-###` for PRD.

### PRD.md (exists — keep)
Full feature set, user stories, functional + non-functional requirements,
edge cases, analytics. Source of truth for product behavior. Emits `REQ-###`.
Every `REQ-###` here traces down to `SPEC-###` and `FLOW-###`.

### SCOPE.md (exists — keep)
Delivery-order phases, full-product scope (no MVP cut). Source of truth for
what ships in what order. Emits `REQ-###` phasing.

### USER_FLOWS.md (new)
**Purpose**: end-to-end product behavior as journeys, not feature lists.
**Authority**: derived from PRD, source of truth for **behavior order**.
**Depends on**: PRD. **Emits**: `FLOW-###`.
**Content** (per flow): personas; entry points (route, trigger, prior state);
core journey step-by-step (each step names the component + state); happy path;
alternative paths; error paths (each error state + recovery); loading states;
empty states; auth journeys (signup/login/logout/reset/verify); onboarding;
core feature flows; permission boundaries (who may do each step); a state
transition table for multi-step journeys (link to STATE_MODEL).

### BUSINESS_RULES.md (new)
**Purpose**: extract business logic from PRD/specs into testable rules.
**Authority**: source of truth for business logic. **Depends on**: PRD, SCOPE.
**Emits**: `RULE-###`.
**Content** (per rule): ID; rule statement (one imperative sentence); conditions
(when the rule applies); expected behavior; exceptions; related requirement
(REQ-###); related acceptance criteria (AC-###); where enforced (models/
services/UI). Rules are the laws tests assert — no business behavior lives only
in code.

### ACCEPTANCE_CRITERIA.md (new)
**Purpose**: independently testable acceptance criteria with stable IDs.
**Authority**: derived from PRD + BUSINESS_RULES; source of truth for **"done
means this proves it"**. **Depends on**: PRD, BUSINESS_RULES, USER_FLOWS.
**Emits**: `AC-###` (namespaced: `AC-AUTH-001`, `AC-UI-001`, `AC-DATA-001`, ...).
**Content** (per criterion): ID; **Given** (precondition: user, state, data);
**When** (action, exact); **Then** (observable result); expected result; related
requirement (REQ-###); related rule (RULE-###); mapped story (US-###). Every
`US-###` acceptance array in prd.json must reference ≥1 `AC-###`.

### STATE_MODEL.md (new)
**Purpose**: application + domain state machines. **Authority**: source of
truth for state transitions. **Depends on**: PRD, USER_FLOWS. **Emits**:
`STATE-###`.
**Content** (per state machine): states (named list); initial state; valid
transitions (table: from → to → trigger); invalid transitions (explicitly
forbidden, with the guard that prevents them); transition triggers; side
effects per transition; failure states; recovery behavior; persistence
requirements (which states persist, in which store/column). Covers: auth
session, onboarding, multi-step wizards, payment/subscription lifecycle, any
AI conversation lifecycle, any async-job lifecycle (link ASYNC_JOBS).

---

## PHASE 2 — REQUIREMENTS

### SPEC.md (exists — keep)
spec-kit output. Source of truth for requirement contracts + traceability
lineage. Emits `SPEC-###`.

### TRACEABILITY.md (new)
**Purpose**: bidirectional requirement↔code↔test map. **Authority**: derived
(aggregates); the one doc that IS the drift detector. **Depends on**: all docs
that emit IDs. **Content**:
- The spine
  `BR-### → REQ-### → SPEC-### → FLOW-### → AC-### → US-### → file → TEST-###`
  as a matrix (row per requirement, cells = linked IDs)
- Orphan scan: requirements with no AC / no story; AC with no requirement;
  stories with no AC; tests with no requirement — a `MISSING` cell is a gap in
  the gate
- Test coverage map: which TEST-### covers which AC-###
- Update rule: recompute/extend on every phase completion; break if any link
  is severed

---

## PHASE 3 — ARCHITECTURE

### TRD.md (exists — keep)
Technical requirements: stack lock-in, budgets, security requirements, data
integrity, a11y level, environment matrix, external integrations, observed
assumptions. Source of truth for the engineering constraints.

### ARCHITECTURE.md (exists — keep)
Engine-owned components/data-flow/module-boundaries. Source of truth for
topology. **New requirement**: must name the layering contract and delegate
the detail to BACKEND_ARCHITECTURE.md / FRONTEND_ARCHITECTURE.md by reference
(no duplicated detail).

### BLUEPRINT.md (exists — keep)
Consolidated architecture -- the single implementation reference. Source of
truth for "how the pieces fit". **New requirement**: link TRACEABILITY.md so
every subsystem traces to a requirement.

### DATA_MODEL.md (exists — keep)
Entities/fields/relations/indexes/soft-delete/migrations plan. Source of truth
for data. Emits `DATA-###`.

### API_SPEC.md (exists — keep)
Endpoint contracts. Source of truth for API surface. Emits `API-###`.

### BACKEND_ARCHITECTURE.md (new)
**Purpose**: server-side design rules + forbidden shortcuts. **Authority**:
source of truth for backend structure. **Depends on**: ARCHITECTURE, TRD.
**Content**: layering (route handler → service → domain → repository → DB);
controller/service/repository responsibilities; domain logic placement;
database access rules; external integration isolation; background jobs (link
ASYNC_JOBS); transactions (when, which isolation level, how boundaries map to
Prisma interplay); validation (Zod at every boundary — never trust the router);
error handling (error envelope from ARCHITECTURE, mapping → HTTP statuses).
**Forbidden shortcuts** (name them): business logic in route handlers,
`fetch` in components bypassing services, raw SQL outside repository, global
`any`, sync blocking IO per-request without queue, swallowing errors.

### API_CONVENTIONS.md (new)
**Purpose**: one consistent HTTP/API grammar. **Authority**: source of truth
for API style. **Depends on**: API_SPEC. **Content**: naming (kebab-case
routes, camelCase JSON); HTTP methods semantics; status-code policy (what 2xx/
4xx/5xx mean here); request/response envelope; error format (`{ error: { code,
message, details? } }`); pagination (cursor vs page, default + max limit);
filtering/sorting syntax; versioning (URI vs header — pick one); idempotency
(which POSTs accept `Idempotency-Key`, how replays resolve); authentication
(which header, how auth required is marked); rate limiting (per-route limits
from INTEGRATION_SPEC/SECURITY_CONTROLS).

### API_COMPATIBILITY.md (new)
**Purpose**: how the API changes without breaking clients. **Authority**:
source of truth for evolution rules. **Depends on**: API_CONVENTIONS.
**Content**: backward-compat rules (additive changes only within a version);
what counts as breaking (removed field, changed type, new required field,
changed error code); versioning strategy + how versions are announced;
deprecation process (announce → `Deprecation` header → sunset date in
DEPRECATION.md); migration strategy per version pair; client compatibility
matrix (which client builds work against which API version).

### INTEGRATION_SPEC.md (new)
**Purpose**: every external service pinned down. **Authority**: source of
truth for integrations. **Depends on**: TRD (integration list), SECRETS.
**Content** (per service): purpose; auth (which secret, how presented);
API/SDK + version; inputs/outputs (schema-ref or inline); timeouts;
retries (count, backoff, jitter); rate limits (provider's AND ours);
circuit-breaker thresholds; fallback behavior (degrade path — product still
works how?); webhooks (signature verification, replay handling, idempotent
dispatch); failure behavior (what the user sees); required secrets (name, env
var — never value). Never list a service that is not in TRD/DEPENDENCIES.

### ASYNC_JOBS.md (new)
**Purpose**: background processing design. **Authority**: source of truth for
async behavior. **Depends on**: BACKEND_ARCHITECTURE, INTEGRATION_SPEC,
DATA_MODEL. **Emits**: `STATE-###` for job lifecycles.
**Content** (per job type, if async exists — else a one-liner "no async jobs"): 
queues (name, concurrency); workers; job payload schema + idempotency key;
scheduling (cron semantics); retries (max, backoff, which errors are
retryable); timeouts; dead-letter handling (what happens to poisoned jobs,
DLQ inspection path); failure recovery (what re-enqueues); observability
(metrics + logs per job (→ OBSERVABILITY)).

---

## PHASE 4 — AI

> If the product has no AI, write **one file** — `AI_SPEC.md` — stating
> "AI functionality is not currently applicable" plus the gate that tees this
> up if AI is added later. Do NOT invent AI requirements for a non-AI product.

### AI_SPEC.md (new)
**Purpose**: the AI capability contract. **Authority**: source of truth for AI
behavior. **Depends on**: PRD (AI stories), TRD, BACKEND_ARCHITECTURE,
INTEGRATION_SPEC. **Emits**: `AI-###`.
**Content**: capabilities (what the AI does, per feature); architecture (where
the AI runs: server route, edge fn, client — and why); providers + models
(from PRD/DEPENDENCIES, never invented); model routing (per capability: which
model, when); prompt architecture (system prompt design, where prompts live,
versioned?); context construction (link AI_CONTEXT); memory (link AI_MEMORY —
even if "none used"); retrieval/RAG (sources, chunking, embedding model,
re-ranking); tool calling (tool schema, authorization per tool);
structured outputs (schema per call); fallback behavior (model down →
what the user sees); token limits (in/out per call, per user); cost controls
(link AI_COST); rate limits (per user/IP, quota response); AI failure behavior
(partial content, refusal, degraded mode); personalization (what user state is
fed in); safety boundaries (link AI_GUARDRAILS); observability (traces, token
usage, latency — link OBSERVABILITY); data handling (what user data leaves the
origin, retention — link DATA_PRIVACY).

### AI_GUARDRAILS.md (new)
**Purpose**: hard limits on AI behavior. **Authority**: source of truth for AI
safety. **Depends on**: AI_SPEC, SECURITY_CONTROLS, THREAT_MODEL.
**Content**: allowed behavior list; disallowed behavior list (e.g. state
mutation without human confirm, rendering raw LLM HTML, following user
instructions to change its own system prompt); prompt-injection defenses
(delimit untrusted input, treat instructions-within-data as data, output
templating not LLM-authored markup); data-leakage prevention (what never goes
to the provider, no PII in prompt logs); cross-user isolation (no session A
context in session B — per-user key namespacing, cache keys); tool
authorization (which tools the model may call, argument allowlist);
sensitive-data handling; unsafe-output handling (reject categories, plain-text
rendering, no markdown-as-HTML); uncertainty handling (refusal template,
"no fabrication" grounding rule); escalation behavior (when a human review is
required); human-review requirements where applicable (e.g. mass email,
destructive ops).

### AI_EVALS.md (new)
**Purpose**: how AI quality is measured before ship. **Authority**: source of
truth for AI release gates. **Depends on**: AI_SPEC, TEST_STRATEGY.
**Content**: evaluation datasets (curated input sets + golden expected
outputs — where they live, how versioned); golden examples (per capability);
expected outputs/behaviors (acceptance-style per eval case); quality metrics
(accuracy, groundedness, refusal correctness, format compliance); safety
metrics (injection-block rate, leakage-block rate); regression testing (run
the suite on every AI change); adversarial testing (attack prompts: injection,
data-exfil attempts, jailbreak variants); prompt regression (prompt change does
not break other prompts); model comparison (matrix: capability × model ×
metric; used by AI_MODEL_POLICY); evaluation thresholds (pass/fail cutoffs);
release gates (which evals must pass before US ships — wired to prd.json
acceptance).

### AI_MEMORY.md (new)
**Purpose**: memory semantics. **Authority**: source of truth for what is
remembered. **Depends on**: AI_SPEC, DATA_PRIVACY.
**Content**: short-term (session context reten­tion), long-term (persisted
memory store); user preferences (which are stored, where — DB? vector store?);
conversation history (kept? TTL? per-user?); derived information (summaries/
profiles synthesized about the user); memory lifecycle (create → read → update
→ delete); what MAY be remembered; what MUST NOT be remembered (PII unless
scoped, secrets, off-scope data); retention (per category, from DATA_PRIVACY);
deletion (user-initiated + system, DSAR path); user control (settings UI,
export/erase). If no memory exists: document that explicitly.

### AI_CONTEXT.md (new)
**Purpose**: how the model's context window is assembled. **Authority**:
source of truth for prompt context. **Depends on**: AI_SPEC, AI_MEMORY.
**Content**: context sources (system instructions, developer rules, user
context, current goal, relevant memory, retrieved knowledge, conversation
history, tool results, current request); priority order (the canonical
assembly order); token budgeting (per-source budget + hard cap); truncation
(what drops first under pressure); retrieval (what gets fetched, reranked);
sensitive-data filtering (what is removed before sending); context isolation
(per-user/session namespacing). Renders to a concrete assembly recipe used by
the AI service code.

### AI_COST.md (new)
**Purpose**: cost control + budgeting. **Authority**: source of truth for AI
spend limits. **Depends on**: AI_SPEC, AI_MODEL_POLICY.
**Content**: token budgets (per call, per user/day, per model); model budgets
($ cap per period per environment); cost per operation (price per typical
request from model pricing — mark TBD until provider pricing confirmed);
max input/output per call; rate limits (provider contract vs our caps);
caching (prompt-cache, response cache — what is safe to cache, TTL); provider
fallback (when cost-based routing trips to cheaper model — link
AI_MODEL_POLICY); budget alerts (thresholds + who gets paged); abuse prevention
(per-user quotas, anomaly detection).

### AI_MODEL_POLICY.md (new)
**Purpose**: which model for which task, and when to switch. **Authority**:
source of truth for model selection. **Depends on**: AI_SPEC, AI_EVALS.
**Content**: per-task model matrix — task → preferred model → fallback model →
latency target → cost limit. Do NOT hard-code providers/models unless the
project requirements already fix them (they do only if PRD/TRD says so);
otherwise structure the table with TBD cells and a decision owner. Uses
AI_EVALS results to justify each mapping.

---

## PHASE 5 — UX

### DESIGN.md (exists — keep)
The design law (7 sections). Source of truth for tokens/layout/component
specs/interactions/anti-slop. Supersedes generic DESIGNS — UI_SPEC must defer.

### UI_SPEC.md (new)
**Purpose**: deterministic UI behavior. **Authority**: derived from DESIGN.md;
source of truth for **page-level behavior** that DESIGN.md does not fix.
**Depends on**: DESIGN.md, USER_FLOWS, PRD.
**Content**: page inventory (every route); routes table (path → page →
ownership/visitor → auth-required); page → component mapping; component
hierarchy (tree per page); responsive behavior (from DESIGN grid — exact
breakpoints); design tokens (defer to DESIGN.md by reference, no copy);
typography + spacing (defer); component states (idle/hover/focus/active/
disabled/loading/error/empty per component); loading states (what renders,
where skeletons live); empty states (message + CTA per surface); error states
(message + recovery per surface); accessibility requirements (AA, keyboard,
focus, screen reader, reduced motion); mobile behavior (touch targets, nav
collapse, bottom sheets). **Never contradict DESIGN.md** — if a conflict
appears, fix DESIGN.md and re-derive.

### COMPONENT_LIBRARY.md (new)
**Purpose**: reusable UI primitives + usage rules. **Authority**: source of
truth for the component library (mirrors shadcn/ui + app-specific comps).
**Depends on**: DESIGN.md, UI_SPEC.
**Content** (per important component): purpose (one line); props (interface —
atomic types, no `any`); states (from DESIGN/UI_SPEC); variants (visual
options + when to use each); accessibility (roles, aria, keyboard contract);
usage rules (what it may/must do); forbidden usage (what it must never do —
e.g. Button wrapped in `<a>` misuse, loading state on non-actions). New
components are added here before they are used in a story.

### ACCESSIBILITY.md (new)
**Purpose**: the a11y contract + how it's verified. **Authority**: source of
truth for accessibility. **Depends on**: DESIGN.md, UI_SPEC, TEST_STRATEGY.
**Content**: WCAG target (AA, which level where); keyboard navigation (tab
order, focus traps, skip-links); focus management (visible focus, modal
handling, route-change focus reset); screen-reader support (landmarks, alt
text, aria-live regions, labeled forms); contrast (AA min 4.5:1, large text
3:1 — both themes); forms (labels, errors announced, autocomplete); ARIA
usage rules (native over ARIA); reduced motion (design motion must have
reduced-motion variants); error announcements (aria-live on validation).
Wired to TEST_STRATEGY a11y gates + axe-core.

---

## PHASE 6 — SECURITY

### SECURITY.md (exists — keep)
Engine-owned threat model + authz + compliance + data classification. Source
of truth for security posture. New requirement: THREAT_MODEL.md /
SECURITY_CONTROLS.md / SECRETS.md / SUPPLY_CHAIN.md are the detail — SECURITY.md
owns the summary + compliance, defers detail by reference (no duplication).

### THREAT_MODEL.md (new)
**Purpose**: structured threat inventory. **Authority**: source of truth for
threats. **Depends on**: SECURITY, ARCHITECTURE, AI_SPEC.
**Content** (per threat): asset; threat; attack vector; likelihood (H/M/L);
impact (H/M/L); mitigation (control ID from SECURITY_CONTROLS); test (how the
mitigation is verified — TEST-### or Strix / security-scan gate). Must include
application-specific AI threats where AI exists: prompt injection reaching
tools, data exfil via AI, cross-user context bleed, AI tool misuse, model
provider compromise.

### SECURITY_CONTROLS.md (new)
**Purpose**: control-level detail. **Authority**: source of truth for controls.
**Depends on**: THREAT_MODEL, SECURITY.
**Content** (per control): threat it addresses (THREAT-###); control
(what it is — CSP nonce, rate limit, Zod validation, RBAC, encryption at rest,
etc.); implementation (where in code, which story US-### shipped it);
verification (how proven — unit test, scan, pentest, manual check). No generic
copy — only controls this app deploys.

### SECRETS.md (new)
**Purpose**: secret handling end-to-end. **Authority**: source of truth for
secrets. **Depends on**: SECURITY, DEPLOYMENT.
**Content**: secret categories (env-bound: DB URL, OAuth, Stripe, AI keys, webhook
secrets); storage (env files gitignored, runtime secret store per env);
access (who/what may read; least privilege); rotation (interval, process,
blast radius on leak); local dev (`.env`, `.env.local`, example file contract);
CI/CD (how CI injects, never in logs/artifacts); production handling (platform
secret store, not build args where avoidable); logging restrictions (never log
secrets or values, redaction rule). Cross-ref prd.json `envVars` as the single
var-name source.

### SUPPLY_CHAIN.md (new)
**Purpose**: dependency security. **Authority**: source of truth for supply
chain. **Depends on**: DEPENDENCIES, SECURITY.
**Content**: dependency security policy (lockfiles committed; pnpm-lock
canonical); package provenance (registry pinning, integrity hashes);
vulnerability scanning (which scanner, when — CI gate, cadence);
container scanning (images scanned, base-image policy); SBOM (generated where,
attached to release); dependency updates (cadence, who approves majors, how
breaking upgrades land). Wired to CI_CD security stage.

### AUTH_SPEC.md (new)
**Purpose**: authentication behavior. **Authority**: source of truth for authN.
**Depends on**: DATA_MODEL, SECURITY, USER_FLOWS. **Emits**: `AC-AUTH-###`.
**Content**: signup (flows, email vs OAuth, what's collected); login (methods,
throttling, lockout); logout (server + client, session invalidation); sessions
(storage, TTL, sliding expiry); refresh (mechanism, rotation, reuse
protection); password reset (flow, token TTL, notification); email
verification (when, resend, re-verify changes); MFA (if applicable — TOTP/
passkeys, enrollment, recovery codes, backup methods); account recovery
(what proves identity without a password); auth failure behavior (generic vs
specific errors — no user-enumeration).

### RBAC.md (new)
**Purpose**: role-based access control. **Authority**: source of truth for authZ.
**Depends on**: AUTH_SPEC, DATA_MODEL. **Emits**: `AC-RBAC-###` (or fold into
DATA_ACCESS).
**Content**: roles (list + when granted); permissions (capability-level);
resources (which data/models each permission gates); actions (read/write/delete/
admin per resource); permission inheritance (hierarchy, e.g. member < admin);
enforcement points (where checks run — server middleware, per-route, per-field;
never trust client). If no RBAC: one-liner "no role-based access — [what does
access control instead]".

### TENANCY.md (new) — only if multi-tenant
**Purpose**: tenant isolation model. **Authority**: source of truth for
tenancy. **Depends on**: DATA_MODEL, DATA_ACCESS, RBAC.
**Content**: tenant model (workspace/org/team — shape); tenant isolation
(row-level tenant_id? separate schema? per-tenant DB? — from DATA_MODEL);
membership (how users join/leave tenants, invitations); roles (per-tenant role
mapping to RBAC); resource ownership (which records belong to which tenant,
cross-tenant referential rules); cross-tenant access prevention (the specific
guard + the test that proves it). If single-tenant: one-liner stating so.

### DATA_LIFECYCLE.md (new)
**Purpose**: movement of data through its life. **Authority**: source of truth
for data life stages. **Depends on**: DATA_MODEL, DATA_PRIVACY.
**Content** (per important data category): Create (source, validation);
Process (how it's transformed, where); Store (which store, classification);
Use (which features read it); Archive (when, to where, format); Delete (when,
guarantee, DSAR path from DATA_PRIVACY). Categories: user accounts, PII,
messages/conversations, AI inputs/outputs, payment data, analytics events,
logs, backups.

### DATA_PRIVACY.md (new)
**Purpose**: privacy + PII handling. **Authority**: source of truth for
privacy. **Depends on**: SECURITY (compliance), DATA_LIFECYCLE, gdpr-data-handling
skill where EU personal data applies.
**Content**: PII inventory (fields + sensitivity); sensitive data (special
categories, no-collection rule unless required); collection (what, why —
purpose limitation); purpose (mapped per field); retention (periods from
DATA_LIFECYCLE + legal basis); deletion (DSAR, erasure, portability paths —
real workflows, not support-ticket promises); export (format, scope, SLA);
access (who may read what — link DATA_ACCESS); encryption (at rest, in
transit, key management); logging restrictions (no PII in logs);
third-party sharing (subprocessors, DPA, countries).

### DATA_ACCESS.md (new)
**Purpose**: who accesses what data, and how isolation holds. **Authority**:
source of truth for data access rules. **Depends on**: DATA_MODEL, RBAC,
AUTH_SPEC, TENANCY.
**Content**: user access (own-data-only default — the ownership rule + test);
service access (internal service-to-service, scoped tokens, least privilege);
administrative access (break-glass path, audit logging, no shared accounts);
least privilege (default-deny, per-scope grants); resource ownership
(owner_id semantics, soft-delete + ownership interplay); cross-user isolation
(the guard + adversarial test — no IDOR: every fetch is ownership-scoped).

### MIGRATIONS.md (new)
**Purpose**: database migration discipline. **Authority**: source of truth for
schema change process. **Depends on**: DATA_MODEL, DEPLOYMENT, BACKUP_RESTORE.
**Content**: migration conventions (Prisma migrate, naming, one-change-per-
migration); ordering (linear, no drift between envs); forward compatibility
(backward-compatible widens only — never delete-then-wrap); rollbacks (per
migration rollback strategy, `migration-safety.sh` gate); data migrations
(backfill scripts, idempotency); seed data (which envs, source, no production
data leakage); production migration rules (who may run, backup first, window);
zero-downtime requirements (expand/contract, deploy order — link
API_COMPATIBILITY).

---

## PHASE 7 — QUALITY

### TEST_STRATEGY.md (new)
**Purpose**: the quality pyramid + gates. **Authority**: source of truth for
test philosophy; TEST_PLAN.md (exists) owns the concrete plan. Relationship
must be explicit, not duplicated.
**Depends on**: PRD, TRACEABILITY, AI_EVALS. **Emits**: `TEST-###`.
**Content**: test levels — Unit (purpose, scope: lib/services/models, owner,
execution point `pnpm test`, release gate: must pass); Integration (DB/API
integration, execution, gate); Contract (frontend↔API, API↔DB, API↔AI provider,
service↔external — link CONTRACT_TESTS.md); E2E (Playwright user flows from
USER_FLOWS, gate); Regression (cadence, what re-runs); Security (Strix/scan,
gate); Performance (k6/Lighthouse, gate); AI Evaluation (from AI_EVALS, gate);
Smoke (post-deploy, gate). For each: purpose, scope, ownership, execution
point, release gate.

### TEST_PLAN.md (exists — keep)
Concrete plan per module + 10 e2e flows + coverage targets. Now derived from
TEST_STRATEGY; keep the relationship explicit and de-dup.

### TEST_DATA.md (new)
**Purpose**: deterministic test data. **Authority**: source of truth for test
fixtures. **Depends on**: DATA_MODEL, TEST_STRATEGY.
**Content**: fixtures (per module, seeded how); factories (which factory
(Prisma/elsewhere), shape); seed data (dev vs test seeds, idempotent);
edge cases (canonical edge inputs per boundary — empty, max-length, unicode,
nulls, duplicates); test users (roles-permission matrix, how provisioned);
isolation (between tests — DB reset, parallel safety); reset strategy;
determinism (no Date.now/random/math behavior breaks — freeze clock where
relevant). Ties to project-side `db-seed` scripts.

### CONTRACT_TESTS.md (new) — only if contracts exist
**Purpose**: prove the seams. **Authority**: source of truth for contract
testing. **Depends on**: API_SPEC, INTEGRATION_SPEC, TEST_STRATEGY.
**Content** (per contract seam): frontend↔API (request/response schema
compat test — generated from API_SPEC/Zod); API↔database (migration +
query contract); API↔AI provider (request/response shape against a mock
provider — the local AI test double from prd.json env contract); service↔
external (integration contract with recorded fixtures). Each names the tool
(e.g. Zod schema extraction, pact-style) + where it runs in CI. If no external
contracts: one-liner.

### PERFORMANCE.md (new)
**Purpose**: measurable performance targets. **Authority**: source of truth for
perf budgets. **Depends on**: TRD (budgets), ARCHITECTURE.
**Content**: page performance (LCP/CLS/TTI from TRD — explicit numbers where
TRD set them, else TBD + owner); API latency (p50/p95 per critical route);
database latency (query p95); AI latency (TTFT, stream token timing); 
throughput (requests/sec where meaningful); error rate (target %); bundle size
(route budget + analyzer gate); caching (static, data, AI response cache);
pagination (limit compliance); query optimization (index strategy, N+1 audit).
Explicit targets only where requirements permit; otherwise `TBD` + resolver —
**never invent numbers**.

### ERROR_HANDLING.md (new)
**Purpose**: consistent failure UX + forensics. **Authority**: source of truth
for error handling. **Depends on**: ARCHITECTURE (error envelope), UI_SPEC,
OBSERVABILITY.
**Content**: error taxonomy (validation, auth, not-found, rate-limited, 5xx,
provider, timeout — code per category); error envelope (shape, stable codes);
client handling (how UI maps codes → messages/states — never raw stack);
retry semantics (which errors auto-retry, backoff); idempotent handlers
(what happens if a retry re-hits a completed op); logging (what an error log
must contain — correlation ID, user-scoped-not-PII, stack); correlation (link
OBSERVABILITY correlation IDs); degraded UX (what the user sees when a
dependency fails).

### ACCESSIBILITY.md (listed under UX — same file, both phases reference it)

---

## PHASE 8 — IMPLEMENTATION

### PLAN.md (exists — keep)
spec-kit plan. Source of truth for task decomposition. Emits `US-###` mapping.

### prd.json (exists — keep)
ralph story list at project root. Source of truth for build execution; the
spine terminal. Every story references ≥1 `AC-###` and links `US-###`.

### AGENTS.md (written in Phase 0/1 — see Phase 0)

### DEFINITION_OF_DONE.md (new)
**Purpose**: the completion contract — one checklist for every task.
**Authority**: operational; the definition of done. **Depends on**:
CONSTITUTION, TEST_STRATEGY, SECURITY_CONTROLS, CHANGE_POLICY.
**Content** (single checklist applied to every story): requirement implemented
(REQ-###); acceptance criteria satisfied (its AC-###, tested); unit tests
pass; integration tests pass; E2E for the flow passes; security validation
(when the story touches security — scans/pentest gates applicable); performance
validation (budget hit where applicable); accessibility validation (axe/AA on
new surfaces); error states present (loading/empty/error per UI_SPEC);
documentation updated (the docs this story touches — CHANGE_POLICY); no
unresolved TODOs; no secrets committed; lint passes; type check passes; build
passes; relevant regression tests pass. Mirrors into AGENTS.md + ralph story
acceptance.

### DRIFT_CONTROL.md (new)
**Purpose**: how implementation/spec drift is detected + fixed. **Authority**:
source of truth for drift process. **Depends on**: TRACEABILITY,
CHANGE_POLICY.
**Content**: the traceability invariant (every significant implementation
traces: requirement → spec → AC → implementation → test — the 5-cell row from
TRACEABILITY); drift detection (when to run — phase gates, every 5 stories,
pre-Phase 3, on any `TUNABLE` change); pre-change checks (before touching code:
is there a REQ-###/SPEC-###/AC-###? if not — create or ADR the change);
post-change checks (after: TRACEABILITY still links, docs updated per
CHANGE_POLICY); documentation consistency checks (grep-able: no orphan ID,
no `TBD` sneaking into shipped docs); architecture violation checks (does the
diff cross BACKEND/FRONTEND_ARCHITECTURE boundaries? — flagged, not auto-fixed);
stale-document detection (last_updated older than last code change touching
that area → refresh); contradiction detection (two docs disagree → resolve via
DOC_GOVERNANCE precedence, record in DECISIONS.md). Wiring: Phase 2 gate +
Phase 3 audit run this.

---

## PHASE 9 — OPERATIONS

### ENVIRONMENT.md (new)
**Purpose**: per-environment reality. **Authority**: operational (most
current, not authoritative). **Depends on**: DEPLOYMENT, LOCAL_DEV.
**Content** (per env: LOCAL, DEV, TEST, STAGING, PROD): variables (mirror
prd.json envVars — name/from/description; values NEVER here), services
(running: DB, Redis, MinIO, queue), databases (URLs as hostnames not creds,
provider), URLs (app, API, health), feature flags (state per env — link
FEATURE_FLAGS), AI providers (which models reachable), external integrations
(enabled or stubbed here), seed data (what exists), debug configuration
(log levels, dev tools).

### LOCAL_DEV.md (new)
**Purpose**: deterministic local setup, byte-for-byte reproducible.
**Authority**: source of truth for "how to run it". **Depends on**: TRD,
ENVIRONMENT.
**Content**: step chain — clone → install (`pnpm install --frozen-lockfile`)
→ configure (`cp .env.example .env.local`, fill from credentials file) →
start dependencies (Docker compose up: pg/redis/minio — the compose spec from
TRD) → initialize database (`prisma migrate dev` + seed) → run app →
run tests. Pin versions (Node, pnpm) via `.nvmrc`/`engines`. Include the two
minute-verification (health endpoint green, seed visible, one e2e passes).

### CI_CD.md (new)
**Purpose**: the pipeline. **Authority**: source of truth for delivery
mechanics. **Depends on**: DEPLOYMENT, TEST_STRATEGY, SUPPLY_CHAIN,
SECURITY_CONTROLS.
**Content**: the stage chain — Commit → Lint → Type Check → Unit Tests →
Integration Tests → Security Scan → Build → E2E → Staging → Smoke Tests →
Production → Post-deployment Verification; each stage names: tool, command,
failure behavior (block vs warn), owner. Security scan wired to SUPPLY_CHAIN.
Staging smoke = the 10 e2e flows from TEST_PLAN. Production gated on staging
green + migration check (MIGRATIONS).

### DEPLOYMENT.md (exists — keep)
Environments/infra/env table/migrations-in-deploy/monitoring/backup/rollback.
Source of truth for deployment. New requirement: defer detail to
CI_CD/ENVIRONMENT/BACKUP_RESTORE by reference.

### OBSERVABILITY.md (new)
**Purpose**: production visibility. **Authority**: source of truth for
observability. **Depends on**: ARCHITECTURE, TRD, INTEGRATION_SPEC.
**Content**: structured logging (format, fields, levels, request-scoped
correlation ID); metrics (which counters/histograms — latency, errors,
throughput, queue depth, AI token spend); tracing (distributed traces across
service/AI/external calls, sampling); health checks (endpoints, what they
probe); readiness vs liveness (separate, used where); error tracking
(aggregation, alerting); correlation IDs (generation, propagation, in logs +
client headers); API latency (p50/p95 — link PERFORMANCE); database latency;
AI latency + AI cost (token usage per op/user); external-service failures
(integration status); alerts (which SLOs alert, threshold, channel, owner).
Wired to project-side instrumentation (OpenTelemetry stack from TRD).

### SLO.md (new)
**Purpose**: service-level objectives. **Authority**: source of truth for SLOs.
**Depends on**: PERFORMANCE, OBSERVABILITY, INTEGRATION_SPEC.
**Content**: availability targets; latency targets (route/service × percentile,
from PERFORMANCE — numbers only if PERFORMANCE set them, else configurable TBD
+ owner); error budgets (per SLO: 100 − target, budget burned how fast, what
happens at exhaustion — feature freeze or ship-pause); AI-specific reliability
metrics (AI availability, eval-pass rate on prod prompt mix, token-latency SLO)
. **Never invent production targets without evidence** — mark configurable/TBD
with the owner who must set them.

### BACKUP_RESTORE.md (new)
**Purpose**: actual, runnable backup + restore procedures. **Authority**:
source of truth for backup mechanics. **Depends on**: DATA_MODEL, DEPLOYMENT,
MIGRATIONS.
**Content**: backup types (pg_dump logical, PITR/WAL from TRD/pitr-test.sh);
frequency + retention; where stored (off-box, encrypted); restore procedure
step-by-step (restore → verify → re-point); restore drill cadence (project-side
`db-restore-drill.sh` + who runs it); RPO/RTO targets (from DISASTER_RECOVERY
— TBD + owner allowed); secrets to restore alongside; log/report of last
successful backup + drill.

### DISASTER_RECOVERY.md (new)
**Purpose**: recovery from real outages. **Authority**: source of truth for DR.
**Depends on**: BACKUP_RESTORE, DEPLOYMENT, SLO.
**Content**: backups (pointer to BACKUP_RESTORE); restore (who, how, when);
RPO/RTO (targets per tier — from SLO where set, else configurable TBD);
database recovery (procedure + drill); service recovery (app redeploy,
cache rebuild, queue drain); external dependency outage (per integration:
what breaks, what still works, fallback status → INTEGRATION_SPEC); AI provider
outage (degraded mode, queued vs synchronously-failed work, user messaging).
Run a DR exercise before phase 3 exit.

### INCIDENT_RESPONSE.md (new)
**Purpose**: from detection to postmortem. **Authority**: source of truth for
incident process. **Depends on**: OBSERVABILITY, SLO.
**Content**: the chain — Detect (alert source, who is on-call, severity
definition); Classify (severity P1-P3, blast radius, comms list); Contain
(feature flag off, rollback, scale down — by severity); Investigate
(correlation ID, timeline, blameless); Recover (restore via BACKUP_RESTORE or
redeploy; verify), Verify (health + SLO recovery), Postmortem (when required,
template, action items tracked). Severity table maps to SLO burn.

### RELEASE.md (new)
**Purpose**: what "shipping a release" means mechanically. **Authority**:
source of truth for release process. **Depends on**: CI_CD, DEPLOYMENT,
MIGRATIONS, FEATURE_FLAGS.
**Content**: release checklist (pre-release validation); pre-release
validation (staging green, e2e pass, security scan clean, evals pass for AI);
database migration checks (MIGRATIONS rules — backup first, forward-compat);
feature flags (which shipped disabled, who flips, watch window); smoke tests
(the post-deploy 10); rollback (what triggers it, how fast, reverse migration
if any); post-release verification (SLO/error-rate watch window, perf spot
check).

---

## PHASE 10 — PROJECT MANAGEMENT

### ANALYTICS.md (new)
**Purpose**: event taxonomy. **Authority**: source of truth for analytics
events. **Depends on**: PRD (analytics events), DATA_PRIVACY.
**Content**: product events (name, trigger, properties, PII restrictions);
technical events (errors, latency, feature usage — link OBSERVABILITY);
AI events (evals, token usage, refusal rate, injection attempts); naming
convention (verb_noun, past tense consistent); event schema (required
properties); PII restrictions (what must never be captured); retention (from
DATA_PRIVACY); destination (which provider/tool, but no provider invented
beyond DEPENDENCIES).

### METRICS.md (new)
**Purpose**: the metrics that matter. **Authority**: source of truth for
measures. **Depends on**: PRD (success metrics), PERFORMANCE, SLO, ANALYTICS,
AI_COST.
**Content**: separated — Product Metrics (activation, retention, funnel, from
BRD success metrics); Technical Metrics (perf, availability from
PERFORMANCE/SLO); AI Metrics (eval pass rate, latency, cost per op from
AI_COST); Business Metrics (MRR, churn, CAC — only where BRD defines them;
else TBD + owner, never invented).

### FEATURE_FLAGS.md (new)
**Purpose**: flag lifecycle. **Authority**: source of truth for flags.
**Depends on**: SCOPE, DEPLOYMENT.
**Content** (per flag): naming (kebab, feature-scoped); default state
(on/off, which envs); environment (where it exists); rollout (gradual? who
flips); ownership (a person/team — concretely named or TBD + resolver);
expiration (date or milestone); removal criteria (what proves the flag is
safe to delete — the code path tested without it). Flags are code we intend to
delete; unused flags are debt.

### DEPENDENCIES.md (new)
**Purpose**: every dependency, known and versioned. **Authority**: source of
truth for dependency inventory + upgrade policy. **Depends on**: TRD, package
files, TIME of generation.
**Content**: runtime deps (name, version, license, purpose); dev deps; external
services (from INTEGRATION_SPEC — same list, one source); AI providers/models
(from AI_SPEC — same list); versions (exact, pinned); licenses (compatibility
check note); upgrade policy (minor cadence, major review + ADR); security
advisories (who watches, gate on scan); fallback/replacement (per dependency:
the swap if it dies — mirrors the known-source map when relevant). Kept in
sync whenever a dependency is added/removed — a code change that adds a dep
without updating this file violates AGENTS.md.

### MIGRATIONS.md (covered in Phase 6/9 — one file, referenced from both)

### CHANGE_POLICY.md (new)
**Purpose**: when a change is code-only vs spec-touching. **Authority**: source
of truth for change discipline. **Depends on**: DOC_GOVERNANCE,
DEFINITION_OF_DONE.
**Content**: a change requires — Code modification only (internal refactor,
bugfix within a contract): update code + tests; Specification update (behavior
change): update PRD/SPEC/AC/FLOW first, then code; PRD update (product change):
BRD/PRD + derived docs; Architecture update (structure change):
ARCHITECTURE/BLUEPRINT + ADR; ADR (decision with lasting consequence:
dependency, stack, pattern): ADR + DECISIONS.md; Security review (auth/security
surface change): SECURITY_CONTROLS + THREAT_MODEL + test; AI evaluation (AI
behavior change): AI_EVALS + AI_SPEC; database migration (schema change):
MIGRATIONS + DATA_MODEL + BACKUP_RESTORE. The trigger table maps change type →
docs to touch → gate to run.

### DEPRECATION.md (new)
**Purpose**: sunset process. **Authority**: source of truth for removal.
**Depends on**: API_COMPATIBILITY, FEATURE_FLAGS, DEPENDENCIES.
**Content**: removal procedures for — features (announce → off-roadmap →
flag-off → delete → analytics remove); APIs (per API_COMPATIBILITY version/
deprecation headers, sunset dates); database fields (expand/contract:
write path first, read path, drop column after window — via MIGRATIONS);
models (data archive before drop); providers (per INTEGRATION_SPEC fallback
+ upgrade vendor before cutoff); dependencies (per DEPENDENCIES replacement);
feature flags (per FEATURE_FLAGS removal criteria). Every deprecation has:
announcement, effective date, migration path for affected users/clients.

### PROJECT_STATUS.md (new)
**Purpose**: current build state at a glance. **Authority**: operational.
**Depends on**: pipeline state. **NOT** a replacement for MEMORY.md (that owns
cross-session continuity + credentials); this owns point-in-time build status.
**Content**: phase; milestone; completed work (US-### list with dates);
active work (in-flight US-###); blockers (with owner + resolution target);
known bugs (ID, severity, link); technical debt (what we deferred + why);
next tasks (from prd.json remaining + backlog).

### CHANGELOG.md / TROUBLESHOOTING.md (exist — keep)
Engine-owned. CHANGELOG.captures releases; TROUBLESHOOTING captures failure
modes. PROJECT_STATUS.md points at both; do not duplicate.

---

## PHASE 11 — FINAL AUDIT (documentation system audit)

Run before Phase 3 exit and on every phase completion:

1. **Completeness** — every doc above exists; the 14 vibe-docs originals
   intact; nothing replaced.
2. **Consistency** — no contradictory requirements; no conflicting
   architecture; no duplicate source-of-truth (each concern owned once);
   terminology uniform (single glossary entries); tech choices uniform
   (package manager, ORM, stack — matches TRD).
3. **Traceability** — run the spine: BRD → PRD → SPEC → AC → prd.json →
   implementation → tests; every `REQ-###` has an `AC-###`; every `US-###`
   references an `AC-###`; every security requirement maps to a security test
   (THREAT_MODEL/test); every AI requirement maps to an AI eval (AI_EVALS).
4. **Agent readiness** — a cold agent can answer: what to build (PRD/SCOPE),
   why it exists (BRD), how it should behave (USER_FLOWS/BUSINESS_RULES/
   AI_SPEC), which architecture (BLUEPRINT/ARCHITECTURE), what it must not do
   (CONSTITUTION/LATTE list + forbidden patterns in AGENTS.md), how to test
   (TEST_STRATEGY/TEST_PLAN), when work is complete
   (DEFINITION_OF_DONE/ACCEPTANCE_CRITERIA), which docs to update
   (CHANGE_POLICY).
5. **No hallucinated decisions** — sweep for invented providers, models, DBs,
   APIs, perf targets, security or compliance requirements not present in
   TRD/PRD/BRD/DEPENDENCIES; anything unknown is `TBD` + named resolver, never
   fabricated.
6. **README index** — `docs/README.md` lists ALL docs with purpose, authority,
   reading order (human + AI-agent), dev workflow, ADR links, prd.json link.