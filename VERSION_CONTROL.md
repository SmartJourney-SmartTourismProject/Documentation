# Version Control — GitLab, Git Bash and Sourcetree

**Required tooling:** GitLab for version control, operated through Git Bash (command line) and
Sourcetree (GUI). Security testing is covered separately in
[Testing/OWASP_SECURITY_MAPPING.md](Testing/OWASP_SECURITY_MAPPING.md).

## Current state

The project is six Git repositories, developed independently rather than as one monorepo:

| Repository | Contents | State |
|---|---|---|
| `backend` | NestJS API, Prisma, raw-SQL migrations, Keycloak realm export | active |
| `frontend-web` | Next.js web client | active |
| `ai-backend` | FastAPI multi-agent service | active |
| `Documentation` | SRS, design document, test plan, this file | active |
| `frontend-mobile` | mobile client | **initialised, no commits yet** |
| `deployment` | deployment assets | **initialised, no commits yet** |

All six currently have a single remote, `origin`, pointing at
`github.com/SmartJourney-SmartTourismProject/<repo>`. **The module requires GitLab, so this needs to
change before submission** — a marker looking for GitLab history will not find one today.

## Moving to GitLab

The chosen approach is to **mirror to GitLab and keep GitHub**, rather than migrate and abandon
GitHub. Reasons: the existing CI workflows are GitHub Actions and would need rewriting as
`.gitlab-ci.yml`; the full commit history is preserved either way; and nothing is lost if the GitLab
instance is unavailable during marking.

### Step 1 — create the projects (a person must do this, not a script)

On GitLab, create a group (e.g. `smartjourney-group08`) and inside it one **blank** project per
repository, named exactly as the table above:

- Uncheck *Initialize repository with a README*
- Add no `.gitignore` and no licence

This matters: an initialised GitLab project already has a commit with no shared ancestor, and the
first push is then rejected as a non-fast-forward. If it happens, delete the project and recreate it
empty.

Add the other group members as **Developer** (or **Maintainer** for whoever administers it).

### Step 2 — push everything (Git Bash)

From the project root:

```bash
# Look first — this changes nothing.
bash Documentation/scripts/mirror-to-gitlab.sh smartjourney-group08 --remote-branches

# Then do it.
bash Documentation/scripts/mirror-to-gitlab.sh smartjourney-group08 --push --remote-branches
```

The script ([`scripts/mirror-to-gitlab.sh`](scripts/mirror-to-gitlab.sh)) adds a second remote called
`gitlab`, leaves `origin` untouched, and pushes every local branch, every tag, and — with
`--remote-branches` — branches that exist only on GitHub. The two empty repositories are skipped with
a message rather than an error.

For a self-hosted instance:

```bash
GITLAB_HOST=gitlab.example.ac.lk bash Documentation/scripts/mirror-to-gitlab.sh <group> --push
```

Authentication: GitLab over HTTPS wants a **personal access token** with the `write_repository` scope,
not an account password. Use the token as the password when Git prompts. To avoid retyping it:

```bash
git config --global credential.helper manager
```

### Step 3 — keep both in step

Once `gitlab` exists, a normal push only updates one remote. Either push twice:

```bash
git push origin new-main
git push gitlab new-main
```

…or configure `origin` to push to both, so a single `git push` reaches each:

```bash
git remote set-url --add --push origin https://github.com/SmartJourney-SmartTourismProject/backend.git
git remote set-url --add --push origin https://gitlab.com/smartjourney-group08/backend.git
```

The two-remote form is clearer to demonstrate and explain; the dual-push form is easier to live with.
Pick one per repository and note which — mixing them is how a branch quietly stops being mirrored.

## Git Bash — the commands actually used on this project

These came up in real work here rather than from a generic tutorial.

| Task | Command |
|---|---|
| Inspect state before doing anything | `git status`, `git log --oneline --graph --decorate -15` |
| See what a branch has that another does not | `git log --oneline main..new-main` |
| Stage and commit | `git add -p` (review each hunk), `git commit` |
| Update without merging | `git fetch origin` |
| Bring in remote work | `git pull --ff-only origin main`, else `git merge origin/main` |
| Resolve a conflict | edit, `git add <file>`, `git merge --continue` |
| Undo a commit, keep the changes | `git reset --soft HEAD~1` |
| Discard a local change to one file | `git restore <file>` |
| Check what a remote holds | `git ls-remote --heads gitlab` |

Three project-specific notes, each learned the hard way:

- **`core.autocrlf` changes file bytes on Windows.** This broke the raw-SQL migration runner, whose
  checksums are computed over file contents: the same migration hashed differently on different
  machines. Handled by `backend/.gitattributes` plus line-ending normalisation inside
  `backend/db/migrate.py`. Do not "fix" a checksum mismatch by editing the recorded hash.
- **Git Bash rewrites Unix-looking paths** when passing arguments to Windows programs, so `docker exec`
  commands with container paths need `MSYS_NO_PATHCONV=1` in front. This appears in the Keycloak helper
  scripts under `backend/keycloak/`.
- **Different branches need different dependencies.** Switching `frontend-web` between `keycloak-auth`
  and `new-main` without re-running `npm install` produced `Module not found: framer-motion` and a
  site-wide HTTP 500 that looked like an authentication failure. **Run `npm install` after every branch
  switch.**

## Sourcetree

Sourcetree is the GUI half of the requirement and is genuinely better than the command line for three
things here: reading the branch graph across the many `ai-backend` branches, staging individual hunks
when a change touched more than one concern, and resolving conflicts side by side.

Setup:

1. **File → Clone / New → Add Existing Local Repository**, and add each of the four non-empty
   repositories. They are separate repos, so each is a separate Sourcetree tab.
2. **Tools → Options → Authentication**: add the GitLab account with the personal access token from
   Step 2 as the password.
3. Once the `gitlab` remote exists it appears under **Remotes**. Push with **Push**, then tick *both*
   `origin` and `gitlab` in the dialog — the easiest way to keep the mirror current without
   remembering two commands.

For evidence of GUI use, the useful screenshots are the branch graph of `ai-backend` (it shows real
parallel development and merges) and a push dialog with both remotes selected.

## Branching as practised

A description of what happened, not an aspiration:

- `main` is the integration branch in each repository.
- Personal branches are named after the developer (`Thisuri`), feature branches after the work
  (`keycloak-auth`, `new-main`, `adjustments`, `merge-shaluka`).
- `ai-backend` also carries short-lived merge-staging branches (`main-temp`, `thisuri-merge-temp`,
  `temp-shaluka`, `main-fixes`) — scaffolding for reconciling parallel work.

Worth stating honestly in the submission: `ai-backend`'s branch list is untidy, and one branch
(`main-26/09/25`) is named after a date, which reads as a manual backup rather than a feature branch.
If history is being marked, deleting the merged staging branches after the GitLab mirror is complete
would present better — and is safe, because the mirror preserves them.

## Commit discipline

Uncommitted work in this project has been lost more than once to a branch switch or a discard-all.
Untracked files are the most fragile: `git status` looks clean afterwards and there is no trace of what
went. **Commit work as soon as it is verified**, especially anything that is a graded deliverable.

## What is not done

- The GitLab projects do not exist yet; Steps 1–3 are outstanding.
- No GitLab CI pipeline. CI runs on GitHub Actions (`.github/workflows/ci.yml` in three repos). If a
  GitLab pipeline is required for marks, it is a translation of those three files, not new work.
- `frontend-mobile` and `deployment` have no commits, so there is nothing to mirror from them.
- No tags in any repository, so no release history. Tagging the submitted state
  (`git tag -a v1.0-submission -m "Final submission"`) would be a cheap improvement, and the mirror
  script pushes tags already.
