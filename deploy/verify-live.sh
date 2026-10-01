#!/usr/bin/env bash
#
# Post-deploy check against a LIVE or STAGING base URL. Reads the local
# sitemap.xml for the URL list and curls each one, then checks redirects,
# the 404 page, blocked internals and the staging noindex guard.
#
#     ./deploy/verify-live.sh https://staging.visas.com.py
#     ./deploy/verify-live.sh https://visas.com.py
#
# It only reads: no POST, no form submission, no lead is ever created.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE="${1:-}"
[ -z "$BASE" ] && { echo "usage: $0 <base-url>" >&2; exit 2; }
BASE="${BASE%/}"
FAILURES=0
fail() { printf '  FAIL  %s\n' "$*"; FAILURES=$((FAILURES + 1)); }
ok()   { printf '  ok    %s\n' "$*"; }
code() { curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$@"; }

echo "== reachability"
c=$(code "$BASE/"); [ "$c" = "200" ] && ok "$BASE/ answers 200" || { fail "$BASE/ answered $c"; exit 2; }

echo "== sitemap URLs (from local sitemap.xml)"
n=0
while read -r url; do
  path="/${url#https://visas.com.py/}"; [ "$url" = "https://visas.com.py/" ] && path="/"
  n=$((n + 1)); c=$(code "$BASE$path")
  [ "$c" = "200" ] || fail "$path answered $c"
done < <(grep -o '<loc>[^<]*' "$ROOT/sitemap.xml" | sed 's/<loc>//')
ok "$n sitemap URLs checked"

echo "== redirects"
c=$(code "$BASE/visa-americana"); [ "$c" = "301" ] && ok "missing trailing slash -> 301" || fail "/visa-americana answered $c, expected 301"
c=$(code "$BASE/index.html");    [ "$c" = "301" ] && ok "/index.html -> 301" || fail "/index.html answered $c, expected 301"

echo "== 404 page"
c=$(code "$BASE/esta-pagina-no-existe-123/"); [ "$c" = "404" ] && ok "missing page answers 404" || fail "missing page answered $c, expected 404"

echo "== internals stay private"
for p in /lib/leads.php /scripts/queue.php /deploy/verify-live.sh /docs/ /build-site.mjs /content.mjs /package.json /AGENTS.md /PLAN.md; do
  c=$(code "$BASE$p"); [ "$c" = "200" ] && fail "$p is publicly readable (200)" || :
done
ok "internal paths not served as 200"

echo "== indexing guard"
host=$(echo "$BASE" | sed -E 's#https?://##; s#/.*##')
hdr=$(curl -sI --max-time 15 "$BASE/" | tr -d '\r' | grep -i '^x-robots-tag' || true)
rob=$(curl -s --max-time 15 "$BASE/robots.txt")
if [[ "$host" =~ ^(www\.)?visas\.com\.py$ ]]; then
  [ -z "$hdr" ] && ok "production: no noindex header" || fail "production sends: $hdr"
  echo "$rob" | grep -qi '^Disallow: /$' && fail "production robots.txt blocks everything" || ok "production robots.txt allows crawling"
else
  echo "$hdr" | grep -qi noindex && ok "staging: noindex header present" || fail "staging is missing the noindex header"
  echo "$rob" | grep -qi '^Disallow: /$' && ok "staging robots.txt blocks crawling" || fail "staging robots.txt does not block crawling"
fi

echo
[ "$FAILURES" -eq 0 ] && { echo "ALL CHECKS PASSED"; exit 0; } || { echo "$FAILURES FAILED"; exit 1; }
