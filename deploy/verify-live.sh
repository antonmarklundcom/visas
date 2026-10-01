#!/usr/bin/env bash
#
# Post-cutover verification: curls every URL in the route
# contract (deploy/routes.php — every page the content arrays declare, plus the
# redirects and 410s the site froze) against a LIVE base URL and asserts the
# status each one must answer with. Run this after uploading to the Hostinger staging subdomain, and
# again after the DNS cutover to the production domain.
#
#     ./deploy/verify-live.sh https://staging.example.com
#     ./deploy/verify-live.sh https://example.com
#
# Unlike verify.sh (which boots its own php -S), this script only reads
# locally to build the expected route list — every request goes to the live
# URL you pass in. It never boots a server and never touches config.php.
#
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

BASE="${1:-}"
if [ -z "$BASE" ]; then
  echo "usage: $0 <base-url>   e.g. $0 https://staging.example.com" >&2
  exit 2
fi
BASE="${BASE%/}"

red()   { printf '\033[31m%s\033[0m\n' "$*"; }
green() { printf '\033[32m%s\033[0m\n' "$*"; }
step()  { printf '\n\033[1m== %s\033[0m\n' "$*"; }
fail()  { red "  FAIL  $*"; FAILURES=$((FAILURES + 1)); }
ok()    { printf '  ok    %s\n' "$*"; }

FAILURES=0

step "reachability"
if ! code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$BASE/"); then
  red "could not reach $BASE — check DNS/hosting before continuing"; exit 2
fi
if [ "$code" = "000" ]; then
  red "could not reach $BASE (connection failed) — check DNS/hosting before continuing"; exit 2
fi
ok "$BASE responds ($code)"

step "https"
case "$BASE" in
  https://*) ok "base URL is https" ;;
  *) fail "base URL is not https — Hostinger free SSL should be active before cutover" ;;
esac

step "routes"
ROUTE_LIST=$(php "$ROOT/deploy/routes.php" "$ROOT")
ROUTE_COUNT=0

while IFS=$'\t' read -r path expected; do
  [ -z "$path" ] && continue
  ROUTE_COUNT=$((ROUTE_COUNT + 1))
  actual=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "${BASE}${path}")
  if [ "$actual" != "$expected" ]; then
    fail "$path — expected $expected, got $actual"
    ROUTE_FAILED=1
  fi
done <<< "$ROUTE_LIST"
[ "${ROUTE_FAILED:-0}" -eq 0 ] && ok "$ROUTE_COUNT URLs answered as specified"

step "internals stay unreachable"
INTERNAL_FAILED=0
for path in /config.php /lib/helpers.php /content/site.php /logs/leads.log /.htaccess /deploy/make-zip.sh; do
  actual=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "${BASE}${path}")
  if [ "$actual" = "200" ]; then
    fail "$path is publicly readable (got 200) — check .htaccess made it to the server"
    INTERNAL_FAILED=1
  fi
done
[ "$INTERNAL_FAILED" -eq 0 ] && ok "internal paths are not served"

step "sitemap and robots"
sitemap=$(curl -s --max-time 10 "$BASE/sitemap.xml")
if echo "$sitemap" | grep -q "<urlset"; then
  ok "sitemap.xml renders"
else
  fail "sitemap.xml did not return a <urlset> — is sitemap.php reachable and is SITE_URL set in config.php?"
fi
robots=$(curl -s --max-time 10 "$BASE/robots.txt")
if echo "$robots" | grep -qi "sitemap"; then
  ok "robots.txt references the sitemap"
else
  fail "robots.txt does not mention the sitemap"
fi

step "wp-sitemap.xml redirect (WordPress cutover)"
wpcode=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$BASE/wp-sitemap.xml")
if [ "$wpcode" = "301" ]; then
  ok "/wp-sitemap.xml still redirects (301)"
else
  fail "/wp-sitemap.xml returned $wpcode, expected 301 — Search Console will flag this"
fi

echo
if [ "$FAILURES" -eq 0 ]; then
  green "verify-live.sh: PASS ($ROUTE_COUNT routes checked against $BASE)"
  exit 0
else
  red "verify-live.sh: FAIL ($FAILURES problem(s) against $BASE)"
  exit 1
fi
