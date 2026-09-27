# Testing

The full test strategy, technique-by-technique, is in [MASTER_TEST_PLAN.md](MASTER_TEST_PLAN.md).
This page is just the commands.

| Repo | Command | What it needs running | What it covers |
|---|---|---|---|
| `backend` | `npm test` | nothing | 69 unit tests across 8 modules (Prisma faked) |
| `backend` | `npm run test:e2e` | nothing | 6 tests through the real guard chain (JWT signed with a test secret, Prisma faked) |
| `backend` | `npm run test:cov` | nothing | coverage report (v8) |
| `backend` | `npm run lint` | nothing | oxlint |
| `frontend-web` | `npm test` | nothing | 18 unit tests: middleware auth logic, Keycloak token refresh, trip mappers/store, one component |
| `frontend-web` | `npm run test:cov` | nothing | coverage report (v8) |
| `frontend-web` | `npm run lint` | nothing | `next lint` |
| `frontend-web` | `npm run test:e2e` | full local stack — see [`RUNNING.md`](../../RUNNING.md) | Playwright journeys; 3 of 4 scenarios need a seeded, signed-in Keycloak session and are skipped until one exists |
| `ai-backend` | `python -m pytest -m "not external" -q` (venv active; plain `pytest` can't import `app`) | nothing | 544 tests across 42 files (pre-existing) |
| `ai-backend` | `python scripts/e2e_check.py` | full local stack | the 12 golden scenarios, scored pass/fail |
| `ai-backend` | `python scripts/e2e_check.py --determinism` | full local stack | repeats a scenario to check output stability |

All three repos also run lint + unit tests on every push via GitHub Actions
(`.github/workflows/ci.yml` in each repo). None of the three CI workflows need Docker services or real
secrets (ai-backend's workflow sets placeholder API keys, because key-gated code runs before the mocked
calls); Playwright and the golden-scenario harness are deliberately excluded from CI and run manually
against a live stack before a release.
