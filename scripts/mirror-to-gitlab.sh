#!/usr/bin/env bash
#
# Mirror every SmartJourney repository to GitLab, keeping GitHub as `origin`.
#
# The GitLab projects must already exist and be EMPTY (no README, no .gitignore,
# no licence) — an initialised project has a commit unrelated to ours, and the
# first push is then rejected as a non-fast-forward.
#
# Usage, from Git Bash at the project root:
#
#   bash Documentation/scripts/mirror-to-gitlab.sh <gitlab-group>            # dry run
#   bash Documentation/scripts/mirror-to-gitlab.sh <gitlab-group> --push     # do it
#
# Add --remote-branches to also push branches that exist only on GitHub (not
# checked out locally). Without it, only local branches and tags are pushed.
#
# <gitlab-group> is the namespace path, e.g. `smartjourney-group08` for projects
# at https://gitlab.com/smartjourney-group08/<repo>. Set GITLAB_HOST for a
# self-hosted instance (e.g. GITLAB_HOST=gitlab.sliit.lk).
#
# `origin` is never touched. The new remote is called `gitlab`; re-running
# updates its URL rather than failing.

set -euo pipefail

GITLAB_HOST="${GITLAB_HOST:-gitlab.com}"
REPOS=(backend frontend-web frontend-mobile ai-backend deployment Documentation)

GROUP="${1:-}"
if [ -z "$GROUP" ] || [ "${GROUP:0:2}" = "--" ]; then
  echo "usage: bash $0 <gitlab-group> [--push] [--remote-branches]" >&2
  exit 64
fi
shift

DO_PUSH=0
DO_REMOTE_BRANCHES=0
for arg in "$@"; do
  case "$arg" in
    --push) DO_PUSH=1 ;;
    --remote-branches) DO_REMOTE_BRANCHES=1 ;;
    *) echo "unknown option: $arg" >&2; exit 64 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

if [ "$DO_PUSH" -eq 0 ]; then
  echo "DRY RUN — nothing will be pushed. Re-run with --push when the output looks right."
  echo
fi

for repo in "${REPOS[@]}"; do
  if [ ! -d "$repo/.git" ]; then
    echo "!! $repo — not a git repository here, skipped"
    continue
  fi

  url="https://${GITLAB_HOST}/${GROUP}/${repo}.git"
  echo "=== $repo -> $url"

  mapfile -t locals < <(git -C "$repo" for-each-ref --format='%(refname:short)' refs/heads)

  # An initialised repo with no commits has no branch refs at all. Nothing to
  # mirror, and pushing would only produce a confusing error.
  if [ ${#locals[@]} -eq 0 ] && [ -z "$(git -C "$repo" for-each-ref refs/remotes/origin)" ]; then
    echo "   empty repository (no commits yet) — nothing to mirror, skipped"
    echo
    continue
  fi

  echo "   local branches: ${locals[*]:-none}"

  # Branches on GitHub that are not checked out locally. The filter is on the
  # FULL refname: refs/remotes/origin/HEAD is a symbolic ref, not a branch, and
  # %(refname:short) renders it as plain "origin", which no HEAD-matching
  # pattern would catch.
  refspecs=()
  if [ "$DO_REMOTE_BRANCHES" -eq 1 ]; then
    while read -r ref; do
      [ -z "$ref" ] && continue
      name="${ref#refs/remotes/origin/}"
      for l in "${locals[@]}"; do [ "$l" = "$name" ] && continue 2; done
      refspecs+=("${ref}:refs/heads/${name}")
    done < <(git -C "$repo" for-each-ref --format='%(refname)' refs/remotes/origin |
      grep -v '^refs/remotes/origin/HEAD$')
    if [ ${#refspecs[@]} -gt 0 ]; then
      echo "   origin-only branches: ${refspecs[*]##*:refs/heads/}"
    else
      echo "   origin-only branches: none"
    fi
  fi

  if [ "$DO_PUSH" -eq 0 ]; then
    echo "   would: git remote add gitlab $url && git push gitlab --all --tags"
    if [ ${#refspecs[@]} -gt 0 ]; then
      echo "   would: git push gitlab ${refspecs[*]}"
    fi
    echo
    continue
  fi

  if git -C "$repo" remote | grep -qx gitlab; then
    git -C "$repo" remote set-url gitlab "$url"
  else
    git -C "$repo" remote add gitlab "$url"
  fi

  git -C "$repo" push gitlab --all
  git -C "$repo" push gitlab --tags || echo "   (no tags to push)"

  if [ ${#refspecs[@]} -gt 0 ]; then
    git -C "$repo" push gitlab "${refspecs[@]}"
  fi

  echo "   done"
  echo
done

echo "Finished. GitHub remains 'origin'; GitLab is 'gitlab'."
echo "To keep both in step:  git push origin <branch> && git push gitlab <branch>"
