#!/usr/bin/env bash
#
# Builds the archive that goes to Hostinger's public_html/.
#
#     ./deploy/make-zip.sh
#     → dist/<slug>-YYYY-MM-DD.zip, where <slug> is 'slug' in content/site.php
#
# The zip contains exactly what the site needs to run and nothing else: no docs,
# no prompts, no tests, no deploy scripts, no git metadata, no config.php (that
# is created on the server from config.example.php) and no logs.
#
# Upload it in hPanel → File Manager, extract inside public_html/ (the archive is
# flat, so files land directly there), then create config.php. See README.md, "Deploy to Hostinger".
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAMP="$(date +%Y-%m-%d)"
# The archive is named after the site, never after a hardcoded brand: one
# template, many sites, and the zip that lands in someone's Downloads has to say
# which site it is.
SLUG="$(php -r 'require $argv[1] . "/lib/bootstrap.php"; echo preg_replace("/[^a-z0-9-]/", "", (string) site("slug"));' "$ROOT" 2>/dev/null || true)"
SLUG="${SLUG:-site}"
NAME="${SLUG}-${STAMP}"
DIST="$ROOT/dist"
STAGE="$DIST/$NAME"

command -v zip >/dev/null || { echo "zip is not installed" >&2; exit 2; }

rm -rf "$STAGE" "$DIST/$NAME.zip"
mkdir -p "$STAGE"

# Everything that ships. Add a new top-level directory here when a phase creates
# one, or it will silently be missing from the deploy.
SHIP=(
  index.php
  404.php
  enviar.php
  sitemap.php
  robots.php
  router.php
  .htaccess
  config.example.php
  assets
  content
  lib
  partials
  templates
)

for item in "${SHIP[@]}"; do
  [ -e "$ROOT/$item" ] || { echo "missing: $item" >&2; exit 1; }
  cp -R "$ROOT/$item" "$STAGE/"
done

# Ship the minified stylesheet in place of the source: the repo
# keeps the readable, commented assets/css/site.css for editing; production
# gets deploy/minify-css.mjs's committed output under the same filename, so
# head.php needs no change. Regenerate first if Node is on this machine, so a
# forgotten re-run after editing site.css never ships stale CSS; otherwise
# fall back to whatever assets/css/site.min.css is already committed.
if command -v node >/dev/null; then
  node "$ROOT/deploy/minify-css.mjs"
fi
if [ -f "$ROOT/assets/css/site.min.css" ]; then
  cp "$ROOT/assets/css/site.min.css" "$STAGE/assets/css/site.css"
  rm -f "$STAGE/assets/css/site.min.css"
else
  echo "warning: no assets/css/site.min.css (run deploy/minify-css.mjs), shipping unminified site.css" >&2
fi

# Page directories: every top-level directory that has an index.php anywhere
# under it, at any depth. A route can be one level deep (marangatu/index.php)
# or nested (blog/<slug>/index.php, herramientas/<slug>/index.php,
# segmentos/<slug>/index.php) — either way the top-level directory
# name is what matters, since cp -R below brings its whole subtree along.
while IFS= read -r name; do
  cp -R "$ROOT/$name" "$STAGE/$name"
done < <(find "$ROOT" -mindepth 2 -name index.php \
           -not -path "$ROOT/dist/*" -not -path "$ROOT/tests/*" \
           -printf '%P\n' | cut -d/ -f1 | sort -u)

# logs/ must exist and be writable for the lead handler's degraded mode, and it
# must never be readable over HTTP.
mkdir -p "$STAGE/logs"
cat > "$STAGE/logs/.htaccess" <<'HTACCESS'
Require all denied
HTACCESS
touch "$STAGE/logs/.gitkeep"

# Belt and braces: nothing that should have been excluded may be in the stage.
for forbidden in docs prompts tests deploy .git config.php dist plan.md README.md KNOWN-ISSUES.md; do
  if [ -e "$STAGE/$forbidden" ]; then
    echo "refusing to ship: $forbidden" >&2
    exit 1
  fi
done

# Flat archive: extracting it inside public_html/ puts index.php, .htaccess and
# every page directory directly in place — no wrapper folder to move out of.
( cd "$STAGE" && zip -qr "$DIST/$NAME.zip" . )

echo "dist/$NAME.zip  ($(du -h "$DIST/$NAME.zip" | cut -f1), $(find "$STAGE" -type f | wc -l) files)"
echo "staged at dist/$NAME/ — verify it with:  ./verify.sh --root dist/$NAME"
