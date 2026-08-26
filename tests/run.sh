#!/bin/sh
# Every runnable check in the project. No network, no phone, no browser.
#
#   sh tests/run.sh
#
# If this passes, the arithmetic that every decision downstream depends on is
# intact: package normalisation, the migration rule, the page collector's
# parsing, and the payment gate.

set -eu

cd "$(CDPATH='' cd -- "$(dirname -- "$0")/.." && pwd)"

fail=0
run() {
  printf '\n== %s\n' "$1"
  shift
  if "$@"; then :; else fail=1; fi
}

run "feira — units, numbers, migration rule" python3 bin/feira selftest
run "feira-fone — payment gate, element matching" python3 tests/test_fone.py
run "feira-mcp — protocol, failures, and no payment capability" python3 tests/test_mcp.py

if command -v node >/dev/null 2>&1; then
  run "extension — page collector parsing" node tests/coletor.test.mjs
else
  printf '\n== extension — page collector parsing\nSKIPPED (node not installed)\n'
fi

# The shipped template must be valid on its own terms, or a first-time user's
# very first command fails.
# shellcheck disable=SC2329  # invoked via `run` below
check_template() {
  # Absolute path captured BEFORE any cd — inside the subshells below, $PWD is
  # the temporary household directory, not this repository.
  bin="$(pwd)/bin/feira"
  tmp=$(mktemp -d)
  # shellcheck disable=SC2064  # expand $tmp now, not at trap time
  trap "rm -rf '$tmp'" EXIT
  python3 "$bin" init "$tmp" >/dev/null || return 1
  for cmd in check advise; do
    ( cd "$tmp" && python3 "$bin" "$cmd" >/dev/null ) || {
      printf 'feira %s failed on a fresh repository\n' "$cmd"; return 1; }
  done
  ( cd "$tmp" && python3 "$bin" compare oleo-de-soja >/dev/null ) || {
    printf 'feira compare failed on a fresh repository\n'; return 1; }
  printf 'ok — init, check, advise and compare all succeed on a fresh repository\n'
}
run "template — a fresh household repository validates" check_template

printf '\n'
if [ "$fail" -eq 0 ]; then
  printf 'ALL CHECKS PASSED\n'
else
  printf 'SOME CHECKS FAILED\n'
fi
exit "$fail"
