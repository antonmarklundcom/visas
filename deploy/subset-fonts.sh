#!/usr/bin/env bash
#
# Re-subsets the self-hosted webfonts to the Unicode codepoints the site
# actually renders. Google Fonts' own "latin"
# and "latin-ext" variable-font files carry every glyph either subset can ever
# need (Vietnamese, IPA, historic Latin letters, ...); a Spanish- or Swedish-language site
# renders Latin text, its currency symbol and a handful of typographic marks,
# so most of that is dead weight.
#
# Requires: pip install fonttools brotli zopfli   (pyftsubset)
#
#     ./deploy/subset-fonts.sh
#
# Re-run this whenever new copy might introduce a character outside the sets
# below, and edit LATIN_EXT below when the market changes (the guaraní sign is
# not needed on a Swedish site, and vice versa) — it prints a comma-free failure if
# pyftsubset can't find a requested codepoint in the source font, which is the
# signal to add it to LATIN/LATIN_EXT here and to the matching unicode-range
# in assets/css/site.css.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FONTS="$ROOT/assets/fonts"

command -v pyftsubset >/dev/null || { echo "pyftsubset not found — pip install fonttools brotli zopfli" >&2; exit 2; }

# ASCII + the Latin-1 letters/punctuation Spanish needs + the typographic
# marks (en/em dash, curly quotes, ellipsis) already used in copy.
LATIN="U+0020-007E,U+00A1,U+00B0,U+00B7,U+00BF,U+00C0-00D6,U+00D8-00F6,U+00F8-00FF,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2026"

# Guaraní sign (₲, every price on the site) and the right-arrow used in "Ver
# todos →" style links. Everything else in Google's "latin-ext" subset
# (Vietnamese, IPA, historic Latin) is genuinely unused here.
LATIN_EXT="U+20B2,U+2192"

for family in bricolage-grotesque onest; do
  pyftsubset "$FONTS/${family}-latin.woff2" \
    --output-file="$FONTS/${family}-latin.woff2" \
    --flavor=woff2 --unicodes="$LATIN" \
    --layout-features='*' --name-IDs='*' --name-legacy \
    --recommended-glyphs --notdef-outline

  pyftsubset "$FONTS/${family}-latin-ext.woff2" \
    --output-file="$FONTS/${family}-latin-ext.woff2" \
    --flavor=woff2 --unicodes="$LATIN_EXT" \
    --layout-features='*' --name-IDs='*' --name-legacy \
    --recommended-glyphs --notdef-outline
done

du -h "$FONTS"/*.woff2
echo "Re-run ./verify.sh and re-check every page still renders before committing."
