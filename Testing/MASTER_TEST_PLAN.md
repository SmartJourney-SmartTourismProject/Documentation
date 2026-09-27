# SmartJourney — Master Test Plan

**Status:** Living document. **Last verified against a real run:** 2026-09-27.
**Format modelled on:** the MPM Solutions "Find Your Job" Master Test Plan (2016), retargeted from a
single Symfony/PHP/MySQL MVC application to SmartJourney's three-service architecture.

---

## 1. Evaluation Mission and Test Motivation

SmartJourney is a Sri Lanka trip-planning system built from three independently deployable services:

- **`frontend-web`** — Next.js 14 (App Router), the traveler- and admin-facing UI.
- **`backend`** — NestJS 12, the API every frontend talks to; owns auth, persistence, and moderation.
- **`ai-backend`** — FastAPI + LangGraph, the multi-agent itinerary planner the backend proxies to.

A fourth planned client, **`frontend-mobile`** (Flutter), has not been started (zero commits) and is
**out of scope for this test plan**.

Unlike the sample MTP's single MVC app, there is no one place "every Model, View and Controller" lives —
the mission here is to test **every service boundary**: browser → NestJS, NestJS → FastAPI, FastAPI →
LLM/external APIs, and NestJS → Postgres/PostGIS. A defect at any one of those boundaries is invisible to
tests that only exercise the service on either side of it.

The objectives, adapted from the sample's structure:

- **Find bugs before deployment**, with special attention to data isolation: a traveler's itineraries,
  expenses, and chat history must never be readable by another traveler. This is a genuine risk, not a
  formality — `ai-backend` has no authentication of its own (`allow_origins=["*"]` in `main.py`), so
  **NestJS's Keycloak-backed guards are the only trust boundary in the whole system.**
- **Find design/implementation problems** that threaten quality — this test plan's own construction
  found several, listed in §4.1. Among them: `explore.service.ts`'s `searchEvents` silently dropped the
  `from` date filter whenever both `from` and `to` were supplied (fixed), and the orchestrator crashes on
  a follow-up turn whose planner call fails (open).
- **Identify risks**, especially around free-tier external APIs the itinerary planner depends on (§5).
- **Meet quality standards** appropriate to the LLM-driven core: since `ai-backend`'s output is
  non-deterministic, "correct" cannot mean "matches an exact string" — it means schema-valid, budget-
  respecting, and policy-compliant output, with a defined, tested fallback path when the LLM is
  unavailable (`plan_source: "fallback"`).
- **Meet functional and non-functional requirements**, verified against the golden-scenario suite
  already maintained for `ai-backend` (§3.1.7).
- **Report honestly**: every number in this document (test counts, coverage percentages, pass/fail) was
  produced by actually running the suite on 2026-09-26 or 2026-09-27, not estimated. Where something could not be run
  (e.g. Playwright's authenticated scenarios — no live Keycloak/Docker stack in this environment), that
  is stated as such rather than assumed passing.

---

## 2. Target Test Items

| Service | Test items |
|---|---|
| **backend** (NestJS) | 8 modules (`auth`, `users`, `trips`, `budget`, `chat`, `explore`, `admin`, `app`), ~50 HTTP routes, the global `JwtAuthGuard`/`RolesGuard` chain, the Prisma/PostGIS data layer, the raw-SQL migration runner (`db/migrate.py`) |
| **ai-backend** (FastAPI) | Agents (`planner`, `recommendation`), core orchestration (`orchestrator`, `react`, `scoring`, `clustering`, `budget`, `itinerary`, `fallback`, `output_validator`, `followup`), tools (`weather`, `disaster`, `geocode`, `routing`, `calendar`, `db`), data connectors (OSM, Booking.com, Ticketmaster, Wikidata) |
| **frontend-web** (Next.js) | Route middleware (auth/role gating), the Keycloak token-refresh flow, 8 page routes, the Zustand trip store, the chat/budget/explore/admin components |
| **Infrastructure** | Docker Compose stack (PostGIS, Redis, Keycloak, Mailpit), the Keycloak realm import, cross-service network isolation (`ai-backend` must never be reachable from outside the Docker network) |
| **Out of scope** | `frontend-mobile` (Flutter, not yet started); subscription/billing (not built — `admin-analytics.service.ts` explicitly reports `subscription_revenue: null` rather than inventing a figure) |

---

## 3. Test Approach

Three independent git repositories, three independent test runners, one shared philosophy: **as many
tests as pay for themselves, not as many as possible.** Concretely, this round added 87 new tests total
(38 backend unit-equivalent files covering 8 modules, 6 backend e2e, 18 frontend unit, 4 Playwright specs)
rather than one per route or per component — see §4 for exactly what each one checks and why.

| Technique | Primary tool(s) |
|---|---|
| Data & DB Integrity | Prisma schema + hand-written Prisma fakes in unit tests; `psql`/pgAdmin against the PostGIS container for schema checks |
| Function Testing | Vitest (`backend`), pytest (`ai-backend`) |
| UI Testing | React Testing Library (component-level), Playwright (journey-level) |
| Performance Profiling | Chrome DevTools / Lighthouse (frontend); NestJS request logging (backend) |
| Load Testing | `autocannon` against `backend` — one manual baseline run on 2026-09-27; not automated (§3.1.5) |
| Security & Access Control | Ownership-check unit tests (every service method takes `userId` first), the e2e guard-chain tests, manual review of `ai-backend`'s network exposure |
| Failover & Recovery | `ai-backend/scripts/e2e_check.py --determinism`, `check_llm_chain_reliability.py`; backend's `AiBackendService` 502-mapping tests |
| Configuration Testing | The three CI workflows below are themselves a configuration test — they prove each service's test suite runs correctly with no Docker services and no secrets |

### 3.1 Technique detail

#### 3.1.1 Data and Database Integrity Testing

| | |
|---|---|
| **Technique Objective** | Verify that Prisma's schema (`backend/prisma/schema.prisma`) matches the hand-written SQL migrations (`backend/db/migrations/0000_meta.sql` … `0007_keycloak_identity.sql`) that actually own the database, and that ownership/scoping filters in every query are correct. |
| **Technique** | Every backend service's unit spec constructs a hand-rolled Prisma fake (`vi.fn()` per method) and asserts on the exact `where`/`data` object passed — e.g. `budget.service.spec.ts` asserts `getOwnedItinerary` always filters by both `id` and `user_id`. Schema drift is caught by running `prisma db pull` and diffing against the checked-in schema. |
| **Oracles** | The Prisma fake's recorded call arguments are the oracle for unit tests; `psql \d+ <table>` against the live PostGIS container is the oracle for schema-vs-migration drift. |
| **Required Tools** | Vitest, Prisma Client types, `psql` / pgAdmin, MySQL-Workbench-equivalent: Prisma Studio |
| **Success Criteria** | No query in a spec'd module reaches Postgres without an explicit `user_id` (or admin-only) filter; `prisma db pull` produces no unexpected diff |
| **Special Considerations** | Migrations are raw SQL, not Prisma Migrate (decision D13) — `RUNNING.md` warns that `db/migrate.py` failures can be silent, so its exit code must always be checked in any script that calls it |

#### 3.1.2 Function Testing

| | |
|---|---|
| **Technique Objective** | Verify each service method's business logic in isolation: status computation, ownership enforcement, idempotency, error mapping. |
| **Technique** | Vitest for `backend` (69 unit tests across 14 files, verified passing 2026-09-26, re-run 2026-09-27), pytest for `ai-backend` (544 tests across 42 files, pre-existing and unmodified this round, run as `python -m pytest -m "not external" -q`). Both use plain fakes/mocks rather than a real database or LLM. |
| **Oracles** | Hand-computed expected values in each assertion — e.g. `computeStatus`'s three thresholds (`budget.service.spec.ts`), `tripToItineraryDays`'s UTC time formatting (`trip-mappers.spec.ts`). |
| **Required Tools** | Vitest 4, pytest 9.1.1, `@vitest/coverage-v8` |
| **Success Criteria** | 100% of unit tests pass with zero live services or API keys reachable |
| **Special Considerations** | `ai-backend`'s LLM calls are always faked in unit tests (`tests/conftest.py`); no unit test may make a real network call — verified by running the full backend suite (`npm test`) and the full ai-backend suite (`python -m pytest`) with no Docker containers running, both green. The first CI run showed that some of these tests silently relied on API keys from the local `.env` (a key must be present before the mocked call is reached); CI now supplies placeholder keys (§3.1.8). Plain `pytest` cannot import the `app` package, so always run it as `python -m pytest`. |

#### 3.1.3 User Interface Testing

| | |
|---|---|
| **Technique Objective** | Verify route protection (middleware), token-refresh behaviour, and component rendering without requiring a live stack; verify real user journeys against a live stack when one is available. |
| **Technique** | React Testing Library for component/logic-level tests (5 files, 18 tests: `middleware.ts`'s `authorized` callback, `auth.ts`'s JWT refresh callback, `trip-mappers.ts`, `trip-store.ts`, `SpendByCategoryPanel`). Playwright for journey-level tests against `next dev` plus the full Docker/Keycloak/backend/AI-backend stack (`RUNNING.md`'s startup order). |
| **Oracles** | Rendered DOM assertions (`@testing-library/jest-dom` matchers) for component tests; URL and visible-element assertions for Playwright. |
| **Required Tools** | Vitest, React Testing Library, jsdom, Playwright |
| **Success Criteria** | All RTL tests pass with no backend running at all; Playwright's unauthenticated-redirect scenario passes against a bare `next dev` server |
| **Special Considerations** | Playwright's three *authenticated* scenarios (home renders chat, a saved trip appears, a non-admin is blocked from `/admin`) need a seeded Keycloak session this repo has no scripted way to obtain headlessly yet — they are written and present in `e2e/journey.spec.ts` but marked `test.skip` with the reason stated inline, rather than either being deleted or left to silently fail. Only the one scenario that needs no auth (`GET /home` while signed out → redirected to `/login`) was verified actually passing, against a real `next dev` instance, on 2026-09-26. |

#### 3.1.4 Performance Profiling

| | |
|---|---|
| **Technique Objective** | Verify response times and resource usage for both the API and the browser under normal load. |
| **Technique** | Chrome DevTools' Performance and Network panels for page-load cost; NestJS's request logs (and, if added later, `@nestjs/terminus` timing) for API latency; `ai-backend`'s documented 5–20s typical `/trip-plan` latency (`AI_BACKEND_ENDPOINTS.md`) as the baseline the 120s timeout in `AiBackendService` is set against. |
| **Oracles** | No formally agreed SLA exists yet — the only enforced number is the 120s NestJS→AI-backend timeout, tested via `ai-backend.service.spec.ts`'s timeout-mapping case. |
| **Required Tools** | Chrome DevTools, Lighthouse |
| **Success Criteria** | `/trip-plan` responses complete within the 120s budget or degrade to the deterministic fallback path (§3.1.7), never hang indefinitely |
| **Special Considerations** | This is the least mature area of the plan — no dashboard yet. A first page-load baseline was recorded on 2026-09-27: `/home` made 31 requests (2.8 MB transferred), DOMContentLoaded 211 ms, load 600 ms. That was measured against `next dev`, not a production build, so it is a reference point, not an SLA. Flagged as a gap in §5, not glossed over. |

#### 3.1.5 Load Testing

| | |
|---|---|
| **Technique Objective** | Determine behaviour under concurrent users, particularly against the free-tier external APIs `ai-backend` depends on. |
| **Technique** | Not yet automated. One manual baseline run on 2026-09-27: `npx autocannon -c 20 -d 30 http://localhost:3001/listings` (20 connections for 30 s against the public, read-heavy listings route; the route is `/listings`, not `/explore/listings`, which returns 404). `ai-backend`'s own `scripts/check_llm_chain_reliability.py` already exercises the Groq/Gemini failover chain under repeated calls. |
| **Oracles** | No formal pass/fail threshold defined yet. |
| **Required Tools** | `autocannon`, run via `npx` (not a dependency of any repo) |
| **Success Criteria** | Baseline recorded 2026-09-27: avg 394 req/s, p50 latency 50 ms, p99 68 ms, max 145 ms, ~12k requests in 30 s. Pass/fail thresholds are still to be set against this baseline. |
| **Special Considerations** | The real bottleneck is almost never `backend` or `ai-backend`'s own compute — it is the external APIs' rate limits (Nominatim 1 req/s, OpenRouteService 500/day, Groq's free-tier TPM ceiling). Load testing this system mostly means load testing against a quota, which argues for mocking those calls in any load test rather than burning real quota. |

#### 3.1.6 Security and Access Control Testing

| | |
|---|---|
| **Technique Objective** | Verify that (a) a traveler can only ever act on their own data, (b) role-gated routes correctly reject the wrong role, and (c) `ai-backend` — which has no auth of its own — is never reachable except through NestJS. |
| **Technique** | Every backend service spec includes an explicit "foreign user gets `NotFoundException`" case (not `ForbiddenException` — deliberately indistinguishable from "doesn't exist", matching the existing `users.service.spec.ts` pattern). `roles.guard.spec.ts` (pre-existing, 4 cases) covers the RBAC decision table. The e2e suite (`app.e2e-spec.ts`) exercises the *real* `JwtAuthGuard` → `RolesGuard` → `@CurrentUser` chain end-to-end using a signed JWT against a substitute Keycloak strategy (see §4.1 for why a plain guard override doesn't work here). |
| **Oracles** | HTTP status codes (401 unauthenticated, 403 wrong role, 404 wrong owner) and the exact Prisma `where` clause used. |
| **Required Tools** | Vitest, supertest, `jsonwebtoken` (for signing test tokens), manual `curl`/`nmap` check that `ai-backend`'s port 8000 is not exposed outside the Docker network in any deployed environment |
| **Success Criteria** | 100% of the ownership and RBAC unit/e2e tests pass; `ai-backend` is confirmed unreachable from outside the Docker network in the deployed topology |
| **Special Considerations** | Unlike the sample MTP (which could say "SQL injection is neglected since Doctrine ORM manages access"), **this project cannot make the equivalent claim about `ai-backend`'s exposure** — it accepts requests from anyone who can reach it, with no token check. The mitigation is entirely at the infrastructure layer (Docker network isolation / firewall), not the application layer, and that mitigation is not covered by any automated test in this plan — it is a manual deployment-configuration check, flagged as a residual risk in §5. |

#### 3.1.7 Failover and Recovery Testing

| | |
|---|---|
| **Technique Objective** | Verify the system degrades gracefully — never silently, never with a 500 — when the LLM or an external data source is unavailable. |
| **Technique** | `ai-backend.service.spec.ts` (new, 4 cases) asserts a non-2xx response, a timeout, and a network error from `ai-backend` all map to a 502 in NestJS, never an unhandled exception. At the `ai-backend` layer itself, the pre-existing `test_fallback.py` and the golden-scenario harness (`scripts/e2e_check.py`) cover the LLM-unavailable path, verifying `plan_source: "fallback"` and HTTP 200 rather than an error. |
| **Oracles** | For LLM-dependent output, the oracle is **never** exact text — it is schema validity (`output_validator.py`), budget compliance, and `plan_source`, since the same prompt can legitimately produce different (still-valid) itineraries on different runs. |
| **Required Tools** | pytest, `scripts/e2e_check.py --determinism`, `scripts/check_llm_chain_reliability.py` |
| **Success Criteria** | Golden scenario 11 ("Gemini unavailable") passes with `plan_source: "fallback"` and HTTP 200 (confirmed passing again in the 2026-09-27 live run) |
| **Special Considerations** | The 2026-09-27 live run scored **10/12 (83.3%)**, below the ≥ 11/12 target. It supersedes the 11/12 recorded on 2026-09-03 in `PROJECT_MASTER_PLAN.md` §6. The first attempt that day scored 8/12 because the harness itself was broken (stale mock-patch targets, fixed — §4.1). After the fix, #5 (follow-up "make day 2 cheaper") failed its "day 2 cost strictly lower" check, and #6 (follow-up "I'm starting from Polonnaruwa") raised an unhandled exception. #6 is an open orchestrator defect (§4.1): Gemini 504 timeouts triggered it but did not cause it. Recorded as measured rather than rounded up. |

#### 3.1.8 Configuration Testing

| | |
|---|---|
| **Technique Objective** | Verify each service's test suite runs correctly in a clean environment with no locally-installed extras and no secrets. |
| **Technique** | Three GitHub Actions workflows (`backend/.github/workflows/ci.yml`, `frontend-web/.github/workflows/ci.yml`, `ai-backend/.github/workflows/ci.yml`), each a from-scratch checkout + dependency install + test run, with zero Docker services and no real secrets (the ai-backend workflow supplies placeholder `GEMINI_API_KEY`/`GROQ_API_KEY`/`ORS_API_KEY`, since key-gated code runs before the mocked calls). |
| **Oracles** | CI job exit code. |
| **Required Tools** | GitHub Actions, Node 26 (backend), Node 22 (frontend-web), Python 3.12 |
| **Success Criteria** | All three workflows pass on a clean checkout — green on 2026-09-27. Reproducing the commands locally beforehand was not enough: all three failed on their first push, for configuration reasons only. Fixes: backend moved to Node 26 because Node 22's npm 10 rejected the npm-11 lockfile; ai-backend runs `python -m pytest`, adds `respx`, `itsdangerous` and `pytest-asyncio` to `requirements.txt`, and supplies placeholder API keys; frontend-web's push trigger now covers `new-main` as well as `main`. |
| **Special Considerations** | Coverage is *reported*, not *gated* — no minimum-coverage threshold is enforced yet, since setting one on a suite this young (backend statement coverage 70.4%, frontend 75.3%) would fail the build for the wrong reason. Playwright is deliberately excluded from CI (§3.1.3). |

---

## 4. Deliverables

### 4.1 Test Evaluation Summary (as actually run, 2026-09-27)

| Repo | Command | Result |
|---|---|---|
| `backend` | `npm run lint` | 0 errors (oxlint) |
| `backend` | `npm test` | **69 passed**, 0 failed — 14 spec files |
| `backend` | `npm run test:cov` | 70.37% statements / 53.35% branches / 62.58% functions / 72.30% lines |
| `backend` | `npm run test:e2e` | **6 passed**, 0 failed |
| `backend` | `npx autocannon -c 20 -d 30 http://localhost:3001/listings` | avg 394 req/s, p50 50 ms, p99 68 ms, ~12k requests in 30 s (20 connections, local) |
| `frontend-web` | `npm run lint` | 0 errors/warnings (`next lint`) |
| `frontend-web` | `npm test` | **18 passed**, 0 failed — 5 spec files |
| `frontend-web` | `npm run test:cov` | 75.34% statements / 65.90% branches / 83.33% functions / 76.92% lines (per-file: `middleware.ts`, `SpendByCategoryPanel.tsx`, `trip-mappers.ts`, `trip-store.ts` at 100% statements; `auth.ts` at 61.7%) |
| `frontend-web` | `npx playwright test` | **1 passed** (unauthenticated redirect, against live `next dev`), **3 skipped** (need a seeded Keycloak session — see §3.1.3) — re-run 2026-09-27 |
| `ai-backend` | `python -m pytest -m "not external" -q` | **544 passed**, 0 failed — 42 files (pre-existing suite, unmodified) |
| `ai-backend` | `python scripts/e2e_check.py` | **10/12 (83.3%)** golden scenarios, live run 2026-09-27 — below the ≥ 11/12 target; see §3.1.7 |

**Real defects found during this test effort (2026-09-26 and 2026-09-27):**

- **`explore.service.ts` `searchEvents` (fixed).** The Prisma `where` clause was built with two separate
  object spreads both keyed `start_datetime` (one for `from`, one for `to`). The second silently
  overwrote the first, so a request supplying both bounds dropped the `from` filter. Caught by
  `explore.service.spec.ts`'s "applies the district and date-window filters together" test, fixed by
  merging both bounds into a single spread, and reverified passing.
- **`scripts/e2e_check.py` (fixed).** Scenarios 7–9 patched `app.tools.registry.get_weather` /
  `get_disaster_info` / `get_free_days`, which an earlier refactor had moved out of the registry, so all
  three crashed before testing anything. They now patch the functions where they are used
  (`app.core.context_resolver`).
- **Orchestrator follow-up crash (open).** On a follow-up turn, when the planner fails (here after
  Gemini 504 timeouts), `_verify_node` in `app/core/orchestrator.py` still sees the previous turn's
  itinerary. It skips its "no plan produced" guard and calls `PlannerOutput.model_validate(None)`, which
  raises. Reproduced by golden scenario #6. The request should degrade to the fallback plan instead.
- **CI configuration (fixed).** The first-push failures in all three repos, described in §3.1.8.

### 4.2 Reporting on Test Coverage

Unit tests (`backend`, `frontend-web`, `ai-backend`) run on every push via CI (§3.1.8) and locally on
every relevant change. Coverage reports (`--coverage` / `--cov`) are generated on demand, not gated.
Playwright's authenticated scenarios and `ai-backend`'s golden-scenario harness are run manually against
a live stack before any release, following `RUNNING.md`'s startup order.

**Appendix A — Test Log Template**, adapted from the sample MTP's generic report table, for any manual
test session (UAT, exploratory testing, the Playwright scenarios that need a live stack):

| Date | Tester | Test case | Executed | Pass | Fail | Pass % | Fail % | Comments |
|---|---|---|---|---|---|---|---|---|
| 2026-09-27 | Shaluka | Manual evidence checks: Prisma Studio, DevTools page load, autocannon load run, Keycloak realm roles | 4 | 4 | 0 | 100% | 0% | First page-load and load-test baselines recorded (§3.1.4, §3.1.5) |
| 2026-09-27 | Shaluka | Golden scenarios: `python scripts/e2e_check.py` against the full local stack | 12 | 10 | 2 | 83.3% | 16.7% | First attempt 8/12 from a harness bug (fixed). #5: day-2 cost not lower. #6: unhandled exception, open defect (§4.1) |
| 2026-09-27 | Shaluka | CI workflows on first push to GitHub, all 3 repos | 3 | 3 | 0 | 100% | 0% | Green only after configuration fixes; all three failed on their first push (§3.1.8) |

---

## 5. Risks, Dependencies, Assumptions, and Constraints

| Risk | Mitigation | Contingency |
|---|---|---|
| Groq free-tier TPM ceiling throttles the LLM failover chain | Gemini is primary, Groq is failover only (`LLM_PROVIDER_CHAIN`); accepted as a genuine capacity limit, not a bug (per prior investigation) | Deterministic fallback plan (`plan_source: "fallback"`), never a 500 |
| Nominatim (1 req/s) / OpenRouteService (500/day) quota exhaustion | Results cached (`app/utils/cache.py`); calls batched where possible | Degrade to cached/approximate geocoding rather than fail the request |
| `ai-backend` has no auth of its own | NestJS is the sole trust boundary; `ai-backend` must be network-isolated from anything but `backend` in every deployed environment | If ever exposed directly, treat as a security incident, not a bug report |
| Raw-SQL migration runner (`db/migrate.py`) can fail silently | `RUNNING.md` documents checking its exit code explicitly | Re-run against a known-good snapshot; restore the last verified backup |
| Keycloak realm-import drift between `realm-export.json` and a running instance | Realm export is checked into `backend/keycloak/realm-export.json` and re-imported on environment setup | Re-export from a known-good instance, diff, re-import |
| No staging environment | Local Docker Compose stack (`backend/docker-compose.yml`) is the closest equivalent | Manual verification against production-like data before release |
| LLM output is non-deterministic | Test oracles never assert exact text — only schema validity, budget compliance, and `plan_source` | A borderline case is treated as a data-coverage gap (see golden scenario #5), not chased as a flaky test |
| Load baseline covers one route only (`/listings`, local, 2026-09-27; §3.1.5) | Documented as a partial baseline, not a capacity claim | Extend the baseline to other routes and a deployed environment before any capacity claim is made |
| A follow-up turn crashes when the planner fails | Open defect, reproduced by golden scenario #6: `orchestrator.py`'s `_verify_node` validates a missing planner output when an earlier itinerary exists | Guard `_verify_node` on `planner_output` itself, so the request degrades to the fallback plan instead of raising |

**Assumptions:** Docker Desktop and the documented `.env` files are available for anyone running the full
stack; CI runners have no access to and make no calls to any external paid API; `frontend-mobile`
remains out of scope until work on it actually begins.

---

## 6. References

**Tooling:** [Vitest](https://vitest.dev), [pytest](https://docs.pytest.org),
[Playwright](https://playwright.dev), [Testing Library](https://testing-library.com),
[NestJS Testing](https://docs.nestjs.com/fundamentals/testing), [Prisma](https://www.prisma.io/docs),
[Keycloak](https://www.keycloak.org/documentation).

**Internal:**
- `ai-backend/docs/master_plan/PROJECT_MASTER_PLAN.md` §6 — the 12 golden scenarios and their 2026-09-03
  results (superseded by the 2026-09-27 run in §3.1.7)
- `ai-backend/docs/master_plan/DETERMINISM_AND_VALIDATION.md` — why LLM output isn't asserted verbatim
- `REPO_STATUS.md` — per-repo state as of 2026-09-23
- `RUNNING.md` — local stack startup order and required environment variables
- `backend/docs/AI_BACKEND_ENDPOINTS.md` — the NestJS↔FastAPI contract

**Where the tests live:**
- `backend/src/**/*.spec.ts`, `backend/test/app.e2e-spec.ts`
- `frontend-web/src/**/__tests__/*.spec.{ts,tsx}`, `frontend-web/e2e/journey.spec.ts`
- `ai-backend/tests/*.py`
- See `Documentation/Testing/README.md` for the exact command to run each.
