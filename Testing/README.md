# Testing

The full test strategy, technique-by-technique, is in [MASTER_TEST_PLAN.md](MASTER_TEST_PLAN.md).
Security testing is mapped to OWASP Top 10:2021 in
[OWASP_SECURITY_MAPPING.md](OWASP_SECURITY_MAPPING.md), and a review of the plan itself is in
[CORRECTIONS.md](CORRECTIONS.md). Non-functional coverage and the module's tool list are mapped in
[NFR_AND_TOOL_COVERAGE.md](NFR_AND_TOOL_COVERAGE.md). This page is just the commands.

Counts below verified 2026-10-02.

| Repo | Command | What it needs running | What it covers |
|---|---|---|---|
| `backend` | `npm test` | nothing | 146 unit tests across 18 files (Prisma faked) |
| `backend` | `npm run test:e2e` | nothing | 24 tests through the real guard chain (JWT signed with a test secret, Prisma faked): 6 app, 8 security (`SEC-01`…`SEC-08`), 9 access control (`AC-01`…`AC-09`) |
| `backend` | `npm run test:security` | nothing | the 8 security cases alone, each named — use this for the security screenshot |
| `backend` | `npm run test:access` | nothing | the 9 access-control cases alone, each named — use this for the access-control screenshot |
| `backend` / `frontend-web` | `npm audit` | nothing | dependency vulnerabilities (OWASP A06) — see [OWASP_SECURITY_MAPPING.md](OWASP_SECURITY_MAPPING.md) |
| `backend` | `npm run test:cov` | nothing | coverage report (v8) |
| `backend` | `npm run lint` | nothing | oxlint |
| `frontend-web` | `npm test` | nothing | 18 unit tests: middleware auth logic, Keycloak token refresh, trip mappers/store, one component |
| `frontend-web` | `npm run test:cov` | nothing | coverage report (v8) |
| `frontend-web` | `npm run lint` | nothing | `next lint` |
| `frontend-web` | `npm run test:e2e` | full local stack — see [`RUNNING.md`](../../RUNNING.md) | 5 Playwright journeys, none skipped: `e2e/auth.setup.ts` seeds a traveler through Keycloak's admin API and signs in through the realm's own login form, then the authenticated journeys reuse that session |
| `frontend-web` | `npm run test:a11y` | full local stack | 5 axe-core accessibility scans (WCAG 2.0/2.1 A + AA) over the landing, chat, explore, saved-itineraries and budget pages — use this for the accessibility screenshot |
| `frontend-web` | `npm run audit:a11y` | the frontend on :3001 | Lighthouse accessibility score for the landing page, opened in the browser |
| `ai-backend` | `python -m pytest -m "not external" -q` (venv active; plain `pytest` can't import `app`) | nothing | 826 tests |
| `ai-backend` | `python scripts/e2e_check.py` | full local stack | the 12 golden scenarios, scored pass/fail |
| `ai-backend` | `python scripts/e2e_check.py --determinism` | full local stack | repeats a scenario to check output stability |

**Run these from inside the repo, not the project root** (`cd backend` first), and prefer Git Bash
over PowerShell: PowerShell renders anything a tool writes to stderr as a red `NativeCommandError`
block, which looks like a failure in a screenshot even when every test passed.

All three repos also run lint + unit tests on every push via GitHub Actions
(`.github/workflows/ci.yml` in each repo). None of the three CI workflows need Docker services or real
secrets (ai-backend's workflow sets placeholder API keys, because key-gated code runs before the mocked
calls); Playwright and the golden-scenario harness are deliberately excluded from CI and run manually
against a live stack before a release.
