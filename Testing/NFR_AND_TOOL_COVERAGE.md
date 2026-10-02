# Non-Functional Testing and Tool Coverage

**Companion to:** [MASTER_TEST_PLAN.md](MASTER_TEST_PLAN.md) — that document is the strategy; this one
answers the module's two specific demands: *which non-functional requirements are tested*, and *which of
the named tools are actually used*. Where a tool is not used, this says so rather than claiming a
near-equivalent counts.

**Figures verified:** 2026-10-02, by re-running every suite. They supersede the 2026-09-27 figures in
MASTER_TEST_PLAN.md §4.1.

## Scope note — this is a web system, not a mobile one

The module's brief adds battery, resource and memory constraints *"if it is a mobile application."*
SmartJourney is a browser application: `frontend-mobile/` and `deployment/` exist as empty directories
in the workspace and contain no project. Battery and device-resource testing is therefore **not
applicable**, and is excluded deliberately rather than omitted by oversight. Browser-side memory is
still in scope and is listed as a gap below.

## Where the automated tests stand today

| Repo | Suite | Count | Needs a live stack? |
|---|---|---|---|
| `backend` | Vitest unit (18 files) | **146 passed** | no |
| `backend` | Vitest e2e — app, security `SEC-01…08`, access control `AC-01…09` | **24 passed** | no |
| `frontend-web` | Vitest + React Testing Library (5 files) | **18 passed** | no |
| `frontend-web` | Playwright journeys | **5 passed, 0 skipped** | yes |
| `frontend-web` | Playwright + axe-core accessibility | **5 passed**, 0 WCAG A/AA violations | yes |
| `ai-backend` | pytest (`-m "not external"`) | **826 collected** | no |
| | **Total automated** | **~1,024** | |

The three previously-skipped Playwright journeys now run for real: `e2e/auth.setup.ts` seeds a traveler
through Keycloak's admin API and signs in through the realm's own login form, so the authenticated
journeys exercise Keycloak, next-auth and NestJS together instead of being stubbed.

---

## Part 1 — Non-functional requirements

| Requirement | Status | What covers it | What is missing |
|---|---|---|---|
| **Usability (UX/GUI)** | partial | Playwright journeys assert what a user actually sees (chat panel, saved trip, refusal at `/admin`); React Testing Library queries by accessible role, which fails when a control has no accessible name | No usability session with real participants, no task-completion or time-on-task measurement, no heuristic evaluation |
| **Completeness** | partial | `ai-backend`'s 12 golden scenarios score end-to-end trip planning pass/fail; `output_validator.py` enforces plan schema on every path | Last live score was 10/12 (83.3%), below the target of 11/12 — two known failures (see MTP §3.1.7) |
| **Error handling** | good | `ai-backend.service.spec.ts` proves non-2xx, timeout and network failure from the AI backend all become a 502, never an unhandled exception; `test_fallback.py` and golden scenario 11 prove an unavailable LLM degrades to `plan_source: "fallback"` with HTTP 200; the 401/403/404 contracts are asserted in the 24 e2e cases | No chaos or fault-injection testing with Postgres or Keycloak deliberately taken down |
| **Performance — accuracy** | partial | Golden scenarios check plan validity, budget compliance and `plan_source` rather than exact text, which is the correct oracle for LLM output; Bayesian-shrunk ratings and evidence scoring replaced guessed values with sourced ones | No regression baseline for ranking quality — a scoring change can shift results with nothing failing |
| **Performance — latency and load** | thin | One manual `autocannon -c 20 -d 30` baseline on `/listings`: 394 req/s, p50 50 ms, p99 68 ms | Not automated, one endpoint only, no authenticated or write path, no agreed pass/fail threshold, and **no JMeter plan** |
| **Performance — load balancing** | none | — | One instance of each service, so there is nothing to balance and nothing to test. The honest answer is that it is not implemented, therefore not tested |
| **Performance — memory usage** | none | — | No heap profiling of NestJS or FastAPI, no `docker stats` baseline, no browser memory measurement |
| **Accessibility** | good | `frontend-web/e2e/accessibility.spec.ts` runs **axe-core** against five rendered pages for WCAG 2.0/2.1 A and AA — **5 passed**, 0 violations, 2026-10-02. Lighthouse scores the public landing page **100/100** for accessibility. `next lint` additionally runs 6 `jsx-a11y` rules statically | No keyboard-only or screen-reader (JAWS/NVDA) pass. Axe detects roughly a third to a half of WCAG issues, so a clean run is not conformance. `/admin`, `/settings` and the landing sub-pages are not yet scanned |
| **Security** | good | 8 security and 9 access-control e2e cases, [OWASP_SECURITY_MAPPING.md](OWASP_SECURITY_MAPPING.md), `npm audit` | No SAST scan, since Checkmarx is licensed — see that document. `ai-backend` has no auth of its own and relies on network isolation |
| **Mobile battery and device resources** | n/a | — | No mobile application exists |

---

## Part 2 — The module's tool list, honestly mapped

"Used" means the tool has actually been run against this project and produced the figures above.

| Module tool | Used? | What this project uses, and why |
|---|---|---|
| Manual testing (web) | yes | Recorded in MTP Appendix A with date, tester and pass/fail |
| Unit: JUnit / NUnit / TestNG / Jasmine | n/a | No Java or .NET in this stack. **Vitest** (TypeScript) and **pytest** (Python) are the equivalents, and neither is an IDE default — both are configured, scripted and run in CI |
| Unit: **SonarQube** | no | Static analysis is **oxlint** (backend) and **next lint** (frontend). SonarQube would add the quality-gate dashboard that neither provides |
| API: **Postman** | no | **Gap.** API behaviour is covered by 24 supertest e2e cases, but there is no Postman collection, so there is no shareable, clickable API artifact and no Newman run |
| Test automation: Java / TestNG / **Selenium** | substituted | **Playwright** instead of Selenium — the same job of driving a real browser, but it ships its own browsers, waits automatically, and supports the saved-auth-state setup these journeys need. A deliberate substitution, not an absence |
| Browser automation, functional tests | yes, via Playwright | 5 journeys, all passing, against the full local stack |
| Integration: Selenium (UI) / **RestAssured** (API) | substituted | UI integration via Playwright; API integration via **supertest** through the real `JwtAuthGuard` → `RolesGuard` → `@CurrentUser` chain. RestAssured is Java-only, so it does not apply here |
| Performance: **JMeter** / LoadRunner | no | **Gap.** One `autocannon` baseline only. JMeter is the named tool and would give a reusable `.jmx` plan plus a report |
| Accessibility: **JAWS**, colour-contrast checker | partial | **axe-core** via `@axe-core/playwright` (`npm run test:a11y`) and **Lighthouse** (`npm run audit:a11y`) now cover the automatable part, including the colour-contrast check the module names. JAWS is a commercial screen reader and has not been used; a free NVDA pass would be the equivalent evidence |
| Atlassian — Jira / Confluence / ClickUp | unknown | Not visible in the repositories. If a board is in use, it should be cited in the MTP |
| Database — SQL | yes | PostgreSQL 16 with PostGIS 3.4.3 and pgvector 0.8.6; 18 hand-written SQL migrations with sha256 checksums; schema drift checked via `prisma db pull`. MongoDB is not used, because this data is relational and geospatial |
| Deployment: **Jenkins** | substituted | **GitHub Actions** (three workflows, one per repo), Vercel for the frontend, Docker Compose on EC2. The same CI/CD function; Jenkins itself is not used |
| Error logs: kubectl / **CloudWatch** | partial | `docker compose logs` on the EC2 host and the Vercel dashboard. There is no Kubernetes, so kubectl does not apply, and no CloudWatch log group |
| Version control: **GitLab** | partial | Git and GitHub across four repositories. The GitLab mirror is configured but not populated — the blank projects still need creating |
| Master automation control dashboard | no | No single place shows all five suites. The GitHub Actions tab in each repo is the nearest thing |
| Test management / ALM | partial | [MASTER_TEST_PLAN.md](MASTER_TEST_PLAN.md) and this document serve the purpose; no ALM tool is in use |
| Monitoring: NewRelic / PagerDuty | no | No APM and no alerting. Nothing pages anyone if production breaks |
| GUI: **Cypress** | substituted | Playwright, for the reasons above. Cypress would be a second tool doing the same job |
| Security: **Checkmarx** (OWASP) | partial | Checkmarx is commercial and unlicensed here, stated plainly in [OWASP_SECURITY_MAPPING.md](OWASP_SECURITY_MAPPING.md). `npm audit` covers the same OWASP A06 ground that a composition scan reports. A free SAST such as Semgrep or GitHub CodeQL would close the rest |

---

## Part 3 — The gaps, in the order worth closing them

1. ~~**Accessibility — nothing exists.**~~ **Closed 2026-10-02.** `e2e/accessibility.spec.ts` runs
   axe-core over five rendered pages (WCAG 2.0/2.1 A and AA) and `npm run audit:a11y` scores the landing
   page with Lighthouse. The first run found four real defects, since fixed — see MASTER_TEST_PLAN.md
   §3.1.9. What remains is a keyboard-only and screen-reader pass, which no scanner can do.
2. **Postman collection and Newman run.** The named API tool, currently absent. A collection covering
   auth, trips, explore and admin doubles as API documentation and can run headlessly in CI.
3. **JMeter load plan.** Replaces the single ad-hoc `autocannon` run with a reusable plan over several
   endpoints, and lets a pass/fail threshold finally be set against the existing baseline.
4. **Memory and resource baseline.** `docker stats` during a load run, plus a Node heap snapshot, turns
   "no data" into a recorded number.
5. **A free SAST scan.** Semgrep or CodeQL in CI, covering what an unlicensed Checkmarx cannot.
6. **Known open items carried from the MTP**, unchanged: golden scenarios at 10/12; the `_verify_node`
   follow-up crash in `app/core/orchestrator.py`; the Next.js advisories reported by `npm audit`; the
   GitLab mirror; and production Google sign-in on `auth.13-127-119-115.sslip.io`.
