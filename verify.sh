#!/usr/bin/env bash
#
# The build gate. Runs on every PR (.github/workflows/verify.yml) and should be
# run locally before pushing:
#
#     ./verify.sh                 # check the repository
#     ./verify.sh --root dist/x   # check an unzipped deploy artifact
#
# It checks, in order:
#   1. php -l on every PHP file
#   2. the market modules: every one implements the same contract, and the one
#      this site selected formats money, validates a tax id and renders a date
#   3. every URL in the route contract answers with the status deploy/routes.php
#      says — that list is derived from the content arrays, so later phases
#      extend the smoke test by adding content
#   4. no page renders a PHP warning
#   5. every page has a title and a description, both unique site-wide, with the
#      title under 60 characters
#   6. enviar.php answers ok + degraded with no CRM key
#   7. the lead value model: every service and tool has a record, every service
#      page's form names its own service, a posted service reaches
#      logs/leads.log as servicio + valor, the per-service thank-you renders on
#      /contacto/?enviado=1&s=<slug>, and no wa.me link carries a generic message
#   8. referential integrity across the content arrays: every slug a record
#      points at exists
#
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$ROOT"
PORT="${VERIFY_PORT:-8730}"

while [ $# -gt 0 ]; do
  case "$1" in
    --root) SITE_ROOT="$(cd "$2" && pwd)"; shift 2 ;;
    --port) PORT="$2"; shift 2 ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done

BASE="http://127.0.0.1:${PORT}"
LOG="$(mktemp)"
FAILURES=0

red()   { printf '\033[31m%s\033[0m\n' "$*"; }
green() { printf '\033[32m%s\033[0m\n' "$*"; }
step()  { printf '\n\033[1m== %s\033[0m\n' "$*"; }
fail()  { red "  FAIL  $*"; FAILURES=$((FAILURES + 1)); }
ok()    { printf '  ok    %s\n' "$*"; }

cleanup() {
  [ -n "${SERVER_PID:-}" ] && kill "$SERVER_PID" 2>/dev/null
  rm -f "$LOG"
}
trap cleanup EXIT

# ---------------------------------------------------------------- 1. php -l --
step "php -l"
LINT_FAILED=0
while IFS= read -r file; do
  if ! out=$(php -l "$file" 2>&1); then
    fail "$file"; echo "$out" | sed 's/^/        /'
    LINT_FAILED=1
  fi
done < <(find "$SITE_ROOT" -name '*.php' -not -path '*/tests/node_modules/*' -not -path '*/dist/*' | sort)
[ "$LINT_FAILED" -eq 0 ] && ok "all PHP files parse"

# ---------------------------------------------------------- 2. market module --
step "market module"
market_out=$(php -r '
require "'"$SITE_ROOT"'/lib/bootstrap.php";
$fail = 0;
$say  = function (string $m) use (&$fail) { echo $m, "\n"; $fail = 1; };

/* Every module implements the same contract, or a template written against one
   market breaks the day a site picks the other. */
$contract = [
    "market_id", "market_locale", "market_currency", "market_country",
    "fmt_money", "validate_tax_id", "tax_id_check_digit", "fmt_date_long",
    "market_vat_rates", "market_table", "market_last_reviewed",
];
foreach ($contract as $fn) {
    function_exists($fn) || $say("the market module does not define {$fn}()");
}

foreach (glob(ROOT_DIR . "/lib/market/*.php") as $file) {
    $src = (string) file_get_contents($file);
    foreach ($contract as $fn) {
        str_contains($src, "function {$fn}(")
            || $say(basename($file) . " does not define {$fn}()");
    }
    is_file(ROOT_DIR . "/assets/js/market/" . basename($file, ".php") . ".js")
        || $say(basename($file) . " has no assets/js/market counterpart");
}

/* The selected market actually works. */
fmt_money(1500000) !== "" || $say("fmt_money() returned an empty string");
str_contains(fmt_date_long("2026-09-04"), "2026") || $say("fmt_date_long() lost the year");
market_currency() !== "" || $say("market_currency() is empty");

/* Tax-id validation is not a no-op in either direction. */
$valid = ["py" => "44444401-7", "se" => "556016-0680"];
$id = $valid[market_id()] ?? null;
if ($id !== null) {
    validate_tax_id($id) || $say("validate_tax_id() rejected the known-good id {$id}");
    validate_tax_id(substr($id, 0, -1) . (((int) substr($id, -1) + 1) % 10))
        && $say("validate_tax_id() accepted a bad check digit");
}
exit($fail);
' 2>&1)
if [ -z "$market_out" ]; then
  ok "every lib/market/*.php implements the contract; the selected one works"
else
  fail "market module"; echo "$market_out" | sed 's/^/        /'
fi

# ------------------------------------------------------------- 3. boot server --
step "server"
if ! command -v php >/dev/null; then red "php not found"; exit 2; fi
php -S "127.0.0.1:${PORT}" -t "$SITE_ROOT" "$SITE_ROOT/router.php" >"$LOG" 2>&1 &
SERVER_PID=$!

for _ in $(seq 1 40); do
  curl -s -o /dev/null "$BASE/" && break
  sleep 0.25
done
if ! curl -s -o /dev/null "$BASE/"; then
  red "server failed to start"; cat "$LOG"; exit 2
fi
ok "php -S on port $PORT (root: $SITE_ROOT)"

# --------------------------------------------------------------- 4. routes ----
step "routes"
ROUTE_LIST=$(php "$ROOT/deploy/routes.php" "$SITE_ROOT")
ROUTE_COUNT=0

while IFS=$'\t' read -r path expected; do
  [ -z "$path" ] && continue
  actual=$(curl -s -o /dev/null -w '%{http_code}' "${BASE}${path}")
  ROUTE_COUNT=$((ROUTE_COUNT + 1))
  if [ "$actual" != "$expected" ]; then
    fail "$path — expected $expected, got $actual"
  fi
done <<< "$ROUTE_LIST"
ok "$ROUTE_COUNT URLs answered as specified"

# --------------------------------------------------- 5. no PHP warnings -------
step "php warnings"
if grep -qE 'PHP (Warning|Notice|Fatal error|Parse error|Deprecated)' "$LOG"; then
  fail "pages emitted PHP diagnostics"
  grep -E 'PHP (Warning|Notice|Fatal error|Parse error|Deprecated)' "$LOG" | sort -u | head -20 | sed 's/^/        /'
else
  ok "no warnings, notices or deprecations while rendering"
fi

# --------------------------------------------- 6. unique title + description --
step "metadata"
META=$(mktemp)
while IFS=$'\t' read -r path expected; do
  [ "$expected" = "200" ] || continue
  case "$path" in /robots.txt|/sitemap.xml) continue ;; esac

  html=$(curl -s "${BASE}${path}")
  title=$(printf '%s' "$html" | grep -oP '(?<=<title>).*?(?=</title>)' | head -1)
  desc=$(printf '%s' "$html" | grep -oP '<meta name="description" content="\K[^"]*' | head -1)

  [ -z "$title" ] && fail "$path — empty <title>"
  [ -z "$desc" ]  && fail "$path — empty meta description"

  len=${#title}
  if [ "$len" -gt 60 ]; then
    fail "$path — <title> is $len chars, over the 60-char budget: $title"
  fi

  printf 'T\t%s\t%s\n' "$title" "$path" >> "$META"
  printf 'D\t%s\t%s\n' "$desc" "$path" >> "$META"
done <<< "$ROUTE_LIST"

dupes=$(cut -f1,2 "$META" | sort | uniq -d)
if [ -n "$dupes" ]; then
  while IFS=$'\t' read -r kind value; do
    [ -z "$value" ] && continue
    where=$(awk -F'\t' -v k="$kind" -v v="$value" '$1==k && $2==v {printf "%s ", $3}' "$META")
    fail "duplicate $([ "$kind" = T ] && echo title || echo description): \"$value\" on: $where"
  done <<< "$dupes"
else
  ok "$(grep -c '^T' "$META") pages, every title and description unique and non-empty"
fi
rm -f "$META"

# ------------------------------------------------------------ 7. lead form ----
step "enviar.php"

# Fixtures come from the content arrays, never from a slug typed in here: this
# script has to keep working on a site that shares none of this template's
# example content. FIXTURE_* is the first service in content/services.php.
eval "$(php -r '
require "'"$SITE_ROOT"'/lib/bootstrap.php";
$slug = (string) array_key_first(services());
$lead = lead_value($slug);
printf("FIXTURE_SLUG=%s\nFIXTURE_PATH=%s\nFIXTURE_TIER=%s\nFIXTURE_VALUE=%d\nFIXTURE_CURRENCY=%s\nFIXTURE_NEED=%s\n",
    escapeshellarg($slug), escapeshellarg(services($slug)["path"]), escapeshellarg((string) $lead["tier"]),
    lead_tier_value((string) $lead["tier"]), escapeshellarg(market_currency()),
    escapeshellarg((string) array_key_first(content("ui")["needs"])));
')"

# The JSON response carries the resolved lead value, so these
# assert on the fields rather than on the whole body.
json_says() {   # json_says <json> <key=value> ...
  php -r '
    $data = json_decode($argv[1], true);
    if (!is_array($data)) { echo "not JSON"; exit(1); }
    for ($i = 2; $i < $argc; $i++) {
      [$key, $want] = explode("=", $argv[$i], 2);
      $got = $data[$key] ?? null;
      $got = is_bool($got) ? ($got ? "true" : "false") : (string) $got;
      if ($got !== $want) { echo "$key was \"$got\", expected \"$want\""; exit(1); }
    }
    exit(0);
  ' "$@"
}

response=$(curl -s -X POST "$BASE/enviar.php" \
  -H 'Accept: application/json' -H "Origin: $BASE" \
  -d "name=Verify&phone=0981000999&need=${FIXTURE_NEED}&source_page=/contacto/&idempotency_key=verify-sh-fixture")

if why=$(json_says "$response" ok=true degraded=true); then
  ok 'degraded mode returns ok + degraded with no CRM key'
else
  fail "degraded mode: $why — $response"
fi

nojs=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' -X POST "$BASE/enviar.php" \
  -H "Origin: $BASE" -d "name=Verify&phone=0981000998&service=${FIXTURE_SLUG}")
case "$nojs" in
  "303 ${BASE}/contacto/?enviado=1&s=${FIXTURE_SLUG}") ok "no-JS POST redirects to /contacto/?enviado=1&s=<slug>" ;;
  *) fail "no-JS POST returned: $nojs" ;;
esac

spam=$(curl -s -X POST "$BASE/enviar.php" -H 'Accept: application/json' -H "Origin: $BASE" \
  -d 'phone=0981000997&website=bot')
if why=$(json_says "$spam" ok=true degraded=true); then
  ok "honeypot accepted silently"
else
  fail "honeypot: $why — $spam"
fi

# ------------------------------------------------- 8. lead value routing -----
# Every check here is about a lead arriving with the service it
# came from and that service's tier — the whole point of the lead value model.
step "lead value routing"

# The model itself, before anything renders: a later phase adding a service, a
# tool, a guide or a segment page adds a slug here too, and the failure mode
# without this check is silent — the page just quietly becomes a tier-C
# "neutral default" lead.
model_out=$(php -r '
require "'"$SITE_ROOT"'/lib/bootstrap.php";
$model = content("lead-values");
$fail  = 0;
$say   = function (string $m) use (&$fail) { echo $m, "\n"; $fail = 1; };

foreach (array_keys(services()) as $slug) {
    isset($model["services"][$slug]) || $say("no lead-values record for service {$slug}");
}
foreach (array_keys(content("tools")) as $slug) {
    isset($model["tools"][$slug]) || $say("no lead-values record for tool {$slug}");
}
$collisions = array_intersect(array_keys($model["services"]), array_keys($model["tools"]));
$collisions === [] || $say("slug used as both a service and a tool: " . implode(", ", $collisions));

foreach (["services", "tools"] as $group) {
    foreach ($model[$group] as $slug => $record) {
        foreach (["menuLabel", "need", "tier", "whatsappText", "nextStep", "crmTag"] as $key) {
            empty($record[$key]) && $say("{$group}/{$slug}: {$key} is empty");
        }
        isset($model["tierValues"][$record["tier"]])
            || $say("{$group}/{$slug}: unknown tier {$record["tier"]}");
        (isset(content("ui")["needs"][$record["need"]]) || isset($model["needLabels"][$record["need"]]))
            || $say("{$group}/{$slug}: unknown need {$record["need"]}");
        if (isset($record["nextLink"]["path"])) {
            is_file(ROOT_DIR . rtrim($record["nextLink"]["path"], "/") . "/index.php")
                || $say("{$group}/{$slug}: nextLink points at nothing ({$record["nextLink"]["path"]})");
        }
    }
}
foreach ($model["needs"] as $need => $chip) {
    ($chip["service"] === null || lead_value($chip["service"])["slug"] !== null)
        || $say("chip {$need}: borrows an unknown service");
    isset($model["tierValues"][$chip["tier"]]) || $say("chip {$need}: unknown tier");
}
foreach ($model["whatsappMenu"] as $slug) {
    lead_value($slug)["slug"] !== null || $say("whatsappMenu: unknown slug {$slug}");
}
foreach (array_keys(content("ui")["needs"]) as $need) {
    isset($model["needs"][$need]) || $say("form chip {$need} has no tier in lead-values");
}
exit($fail);
' 2>&1)
if [ -z "$model_out" ]; then
  ok "content/lead-values.php covers every service, tool and chip"
else
  fail "content/lead-values.php is incomplete"
  echo "$model_out" | sed 's/^/        /'
fi

rm -f "$SITE_ROOT/logs/leads.log"
tiera=$(curl -s -X POST "$BASE/enviar.php" \
  -H 'Accept: application/json' -H "Origin: $BASE" \
  -d "name=Verify&phone=0981000996&service=${FIXTURE_SLUG}&source_page=${FIXTURE_PATH}&idempotency_key=verify-sh-service&tool_result=fixture")

if why=$(json_says "$tiera" ok=true "service=${FIXTURE_SLUG}" "value_tier=${FIXTURE_TIER}" \
                   "value=${FIXTURE_VALUE}" "currency=${FIXTURE_CURRENCY}"); then
  ok "a POST with service=${FIXTURE_SLUG} answers with its tier and Ads value"
else
  fail "service=${FIXTURE_SLUG}: $why"
fi

logline=$(tail -1 "$SITE_ROOT/logs/leads.log" 2>/dev/null)
if [ -z "$logline" ]; then
  fail "nothing was written to logs/leads.log"
else
  for want in servicio valor resultado_herramienta etiqueta; do
    php -r '
      $line = json_decode($argv[1], true);
      exit(isset($line["fields"][$argv[2]]) && $line["fields"][$argv[2]] !== "" ? 0 : 1);
    ' "$logline" "$want" \
      && ok "leads.log line carries fields.$want" \
      || fail "leads.log line has no fields.$want: $logline"
  done
fi
rm -f "$SITE_ROOT/logs/leads.log"

# Every service page's own form must name that service, or the lead arrives
# untagged and nothing downstream can route it.
missing_service_field=0
while IFS=$'\t' read -r slug path; do
  [ -z "$path" ] && continue
  # Buffer the body first: under `set -o pipefail`, `curl | grep -q` reports a
  # failed pipeline because grep closes the pipe on its first match and curl
  # dies of SIGPIPE — which would fail every page that actually passes.
  html=$(curl -s "${BASE}${path}")
  if ! printf '%s' "$html" | grep -q "name=\"service\" value=\"${slug}\""; then
    fail "$path — form has no name=\"service\" value=\"$slug\""
    missing_service_field=1
  fi
done < <(php -r '
  require "'"$SITE_ROOT"'/lib/bootstrap.php";
  foreach (services() as $slug => $service) { echo $slug, "\t", $service["path"], "\n"; }
')
[ "$missing_service_field" -eq 0 ] && ok "every service page posts its own slug"

# The per-service thank-you the no-JS redirect lands on.
thanks=$(curl -s "${BASE}/contacto/?enviado=1&s=${FIXTURE_SLUG}")
expected_step=$(php -r '
  require "'"$SITE_ROOT"'/lib/bootstrap.php";
  echo htmlspecialchars(lead_value($argv[1])["nextStep"][0], ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
' "$FIXTURE_SLUG")
if printf '%s' "$thanks" | grep -qF "$expected_step"; then
  ok "/contacto/?enviado=1&s=${FIXTURE_SLUG} renders that service's next step"
else
  fail "/contacto/?enviado=1&s=${FIXTURE_SLUG} did not render that service's next step"
fi

# No wa.me link anywhere may carry a generic message: every prefill names the
# service the visitor was reading about.
generic=0
while IFS=$'\t' read -r path expected; do
  [ "$expected" = "200" ] || continue
  case "$path" in /robots.txt|/sitemap.xml) continue ;; esac

  html=$(curl -s "${BASE}${path}")
  bad=$(printf '%s' "$html" \
    | grep -o 'https://wa\.me/[^"]*' \
    | grep -iE 'consulta%20gratis|text=$|^https://wa\.me/[0-9]+$' \
    | sort -u)
  if [ -n "$bad" ]; then
    fail "$path — wa.me link with a generic or empty message: $(printf '%s' "$bad" | tr '\n' ' ')"
    generic=1
  fi
done <<< "$ROUTE_LIST"
[ "$generic" -eq 0 ] && ok "no wa.me link on the site carries a generic message"

rm -rf "$SITE_ROOT/logs/rate" "$SITE_ROOT/logs/leads.log"

# ------------------------------------------ 9. content referential integrity --
# Every slug one content array points at must exist in the array that owns it.
# A dangling slug is silent at runtime — the related card, the guide box or the
# segment bundle simply does not render — so it is checked here instead.
#
# A site that wants the stricter internal-link rule ("every service links to at
# least one article and one guide") adds the two count() assertions below; the
# template ships without them so an early phase with no blog yet still passes.
step "content integrity"
links_out=$(php -r '
require "'"$SITE_ROOT"'/lib/bootstrap.php";
$fail = 0;
$say  = function (string $m) use (&$fail) { echo $m, "\n"; $fail = 1; };

$articleSlugs = array_column(content("blog"), "slug");

foreach (services() as $slug => $service) {
    foreach ($service["articles"] ?? [] as $a) {
        in_array($a, $articleSlugs, true) || $say("service {$slug}: articles[] names unknown slug {$a}");
    }
    foreach ($service["guides"] ?? [] as $g) {
        isset(content("guias")[$g]) || $say("service {$slug}: guides[] names unknown slug {$g}");
    }
    foreach ($service["related"] ?? [] as $r) {
        isset(services()[$r]) || $say("service {$slug}: related[] names unknown service {$r}");
    }
    if (!empty($service["parent"])) {
        isset(services()[$service["parent"]]) || $say("service {$slug}: unknown parent {$service["parent"]}");
    }
    isset(content("ui")["clusters"][$service["cluster"]])
        || $say("service {$slug}: unknown cluster {$service["cluster"]}");
}

foreach (content("blog") as $article) {
    $svc = $article["service"] ?? null;
    ($svc === null || isset(services()[$svc]))
        || $say("article {$article["slug"]}: unknown service {$svc}");
}

foreach (content("guias") as $slug => $guide) {
    $svc = $guide["relatedService"] ?? null;
    ($svc === null || isset(services()[$svc]))
        || $say("guide {$slug}: unknown relatedService {$svc}");
    foreach ($guide["related"] ?? [] as $g) {
        isset(content("guias")[$g]) || $say("guide {$slug}: related[] names unknown guide {$g}");
    }
}

foreach (content("segmentos") as $slug => $segment) {
    isset(services()[$segment["leadSlug"]])
        || $say("segment {$slug}: leadSlug names unknown service {$segment["leadSlug"]}");
    foreach ($segment["bundle"] ?? [] as $b) {
        isset(services()[$b]) || $say("segment {$slug}: bundle names unknown service {$b}");
    }
}

/* Every route the content arrays declare has a file behind it. */
foreach (array_keys(content("pages")) as $path) {
    if ($path === "/404") { continue; }
    is_file(ROOT_DIR . rtrim($path, "/") . "/index.php")
        || $say("page {$path}: no route file at " . rtrim($path, "/") . "/index.php");
}
exit($fail);
' 2>&1)
if [ -z "$links_out" ]; then
  ok "every slug the content arrays point at exists, and every page has a route file"
else
  fail "content integrity"
  echo "$links_out" | sed 's/^/        /'
fi

# ------------------------------------------------------------------ result ----
echo
if [ "$FAILURES" -eq 0 ]; then
  green "verify.sh: PASS"
  exit 0
fi
red "verify.sh: $FAILURES failure(s)"
exit 1
