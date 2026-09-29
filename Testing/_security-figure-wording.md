# Paste source — security & access control evidence for the Master Test Plan

Staging file for `SmartJourney_Master_Test_Plan.docx`. Delete once pasted.
Page references are to the 23-page PDF edition.

---

## WHERE IT GOES

**Page 19 — immediately after §4.2 "Reporting on Test Coverage" ends, and before the heading
"5. Risks, Dependencies, Assumptions, and Constraints".**

That position is below Figure 15, so the new screenshots become **Figure 16** and **Figure 17** and
**no existing figure needs renumbering.** Putting them in §3.1.6 instead would push Figures 10–15 down
by two and break every cross-reference to them.

Order on the page:

1. Heading `4.3 Security and Access Control Test Cases`
2. Intro + command/result table
3. Heading `4.3.1 Security testing — authentication`
4. Lead-in + case table
5. **[ screenshot of `npm run test:security` ]**
6. Caption *Figure 16: …*
7. Heading `4.3.2 Access control testing — authorization`
8. Lead-in + case table
9. **[ screenshot of `npm run test:access` ]**
10. Caption *Figure 17: …*

Afterwards, right-click the Contents on page 2 → **Update Field → Update entire table**.

---

## WORDING — copy from here

### 4.3 Security and Access Control Test Cases

Security and access control are evidenced as two separate concerns, because they answer two different
questions. Security testing asks whether an unauthenticated or forged identity can enter the system at
all; access control testing begins after authentication has succeeded and asks what a valid identity
is permitted to reach. Both suites were executed and all 17 cases passed. Neither requires Keycloak,
Postgres or any other service to be running — only the trust anchor is substituted, a test signing key
in place of Keycloak's published JWKS — so both runs reproduce on any machine with the repository
checked out.

| Command | Result |
| --- | --- |
| `npm run test:security` | 8 passed, 0 failed — SEC-01 to SEC-08 |
| `npm run test:access` | 9 passed, 0 failed — AC-01 to AC-09 |
| `npm run test:e2e` | 23 passed, 0 failed — all three e2e suites together |
| `npm test` | 103 passed, 0 failed — the backend unit suite |

---

### 4.3.1 Security testing — authentication

This suite attacks the front door. No case assumes a valid user: each presents a credential that
should be refused, and asserts that it is. The concern is not theoretical — the AI backend has no
authentication of its own (§3.1.6), so the NestJS guard chain exercised below is the only trust
boundary in the entire system, and a single gap in it exposes every traveller's data.

The suite runs the real `JwtAuthGuard`, the real Passport strategy and the real global validation
pipe; nothing in the request path is stubbed except the signing key.

| Case | What it proves | Expected | Result |
| --- | --- | --- | --- |
| SEC-01 | A protected route refuses an anonymous caller | 401 | Pass |
| SEC-02 | A token signed with a key that is not the realm's is refused | 401 | Pass |
| SEC-03 | A forged token claiming the admin role cannot reach an admin route | 401 | Pass |
| SEC-04 | An expired token is refused | 401 | Pass |
| SEC-05 | A malformed token returns 401, not a server error | 401 | Pass |
| SEC-06 | A token sent without the Bearer scheme is refused | 401 | Pass |
| SEC-07 | Control case — a validly signed token is still accepted | 200 | Pass |
| SEC-08 | A public route remains open without any identity | 200 | Pass |

**8 executed, 8 passed, 0 failed — 100%.**

SEC-02 is the case the whole security model rests on: possession of a well-formed token proves nothing
unless its signature is verified against the realm's key. SEC-03 aims that same forgery at the
highest-value target, because privilege is claimed inside the token body — if the signature were not
verified, an attacker could simply write `"admin"` into a token and take the administration API.
SEC-07 is included deliberately as a control: without it, a guard that rejected every request would
make the seven negative cases above pass while the application was completely broken.

The run below was captured by executing `npm run test:security` in the `backend` repository, with no
services running.

**[ INSERT SCREENSHOT HERE ]**

*Figure 16: Security test suite — all 8 authentication cases passing (SEC-01 to SEC-08), including a
forged admin token rejected with 401 and a malformed token returning 401 rather than a server error.*

---

### 4.3.2 Access control testing — authorization

Every caller in this suite is already authenticated, so the question shifts from "who are you?" to
"what are you allowed to reach?". It is tested along two axes: **role**, where a traveler must be
refused an admin route, and **ownership**, where a traveler must be refused another traveler's data
even on a route they are perfectly entitled to use. The fixture is a single trip titled "Kandy"
belonging to Traveler A; Traveler B and an Admin are the other two identities.

The database fake enforces scoping the way Postgres would — its queries honour the `user_id` filter —
so a service that forgot to scope a query would return the other traveler's row and fail the test
rather than quietly passing.

| Case | What it proves | Expected | Result |
| --- | --- | --- | --- |
| AC-01 | A traveler cannot reach an admin route | 403 | Pass |
| AC-02 | A traveler cannot reach admin user management | 403 | Pass |
| AC-03 | Control case — an admin can reach that same route | 200 | Pass |
| AC-04 | A list returns only the caller's own records | scoped | Pass |
| AC-05 | A foreign read leaks neither the record nor its existence | 404, title absent from body | Pass |
| AC-06 | Control case — the owner can read that same trip | 200 | Pass |
| AC-07 | A foreign update is refused | 404 | Pass |
| AC-08 | A foreign delete is refused | 404 | Pass |
| AC-09 | An admin is not exempt from ownership on traveler routes | 404 | Pass |

**9 executed, 9 passed, 0 failed — 100%.**

Ownership violations answer 404 and never 403. This is deliberate: a 403 would confirm the record
exists and therefore leak that another traveler owns it. AC-05 asserts the response body as well as
the status code, so the trip title cannot appear even inside an error payload, and the test will fail
if that behaviour is ever "corrected" into a leak. AC-09 covers the case most systems get wrong — the
admin role grants admin *routes*; it is not a master key to other travelers' data through the traveler
API.

The run below was captured by executing `npm run test:access` in the `backend` repository, with no
services running.

**[ INSERT SCREENSHOT HERE ]**

*Figure 17: Access control test suite — all 9 authorization cases passing (AC-01 to AC-09), covering
role gating, per-row ownership, and an admin correctly refused another traveler's trip.*

---

### 4.3.3 Relationship to OWASP Top 10:2021

Security testing is carried out with reference to OWASP. The full mapping is maintained in
`Documentation/Testing/OWASP_SECURITY_MAPPING.md`, which covers all ten categories and states where
coverage is absent as well as where it is strong. In summary: the SEC suite evidences **A07
Identification and Authentication Failures**; the AC suite evidences **A01 Broken Access Control**; and
`npm audit` evidences **A06 Vulnerable and Outdated Components**, where findings are currently open —
including a critical advisory against Next.js affecting the middleware that performs authentication
gating in frontend-web. Checkmarx was not run: it is a commercial product requiring a licence this
project does not hold, so no source-level taint analysis has been performed, and that gap is recorded
rather than glossed over.

---

## OTHER EDITS THE SAME CHANGE REQUIRES

| Page | Edit |
|---|---|
| 17 (§4.1) | The `npm run test:e2e` row says **6 passed** — it is now **23** (6 app, 8 security, 9 access control). Add rows for `npm run test:security` (8) and `npm run test:access` (9), and one for `npm audit`. The `npm test` row says 69 — it is now **103**. |
| 12 (§3.1.6) | Technique cell still describes only the original guard-chain suite; add the two dedicated suites. Success Criteria should read **17/17 (100%)**, pointing at §4.3. |
| 4 (§3) | "This round added 87 new tests in total" — now **104**, and "6 backend end-to-end tests" is now 23. |
| 22 (Appendix A) | Add a log row: 2026-09-27 · Thisuri · security and access control suites · 17 · 17 · 0 · 100% · 0%. |
| 23 (Appendix B) | Row 8 says "List of 6 passing test names" — now 23. Add rows 16 and 17 for the two new screenshots. |
| 13 (Figure 8) | Its caption says "All 6 end-to-end guard-chain tests passing" — **re-shoot it**; `npm run test:e2e` now reports 23. |

## Capture reminders

- Run in **Git Bash, not PowerShell** — PowerShell renders tool warnings as red `NativeCommandError`
  blocks, which reads as a failure on a test screenshot.
- `cd backend` first.
- Include the typed command **and** the `Tests  8 passed (8)` / `Tests  9 passed (9)` summary line in
  the frame. That summary line is the actual proof of 100%.
