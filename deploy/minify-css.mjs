#!/usr/bin/env node
/**
 * Minifies assets/css/site.css. No external dependencies — this
 * repo has no build step, so the minifier is plain Node.
 *
 * Safe by construction: string literals (content: "...") and url(...) are
 * extracted to placeholders before whitespace is collapsed, then restored
 * verbatim, so nothing inside a quoted value or a path is ever touched.
 *
 *     node deploy/minify-css.mjs
 *     → assets/css/site.min.css
 *
 * deploy/make-zip.sh calls this and ships the minified file in place of the
 * source; the repo keeps the readable, commented site.css as the thing
 * developers actually edit.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const srcPath = resolve(here, "..", "assets/css/site.css");
const outPath = resolve(here, "..", "assets/css/site.min.css");

function minifyCss(css) {
  // 1. Strip comments (our file has no `/*` inside a string or url()).
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");

  // 2. Protect string literals and url(...) contents from whitespace
  //    collapsing. The \x01...\x01 sentinel is a control character that
  //    never appears in CSS source and is neither whitespace nor a
  //    punctuation character, so it survives steps 3 and 4 untouched — a
  //    plain space boundary would not: step 4 strips whitespace next to `:`
  //    and `;`, which would eat the boundary and corrupt the restore.
  const vault = [];
  const protect = (s) => {
    vault.push(s);
    return `\x01${vault.length - 1}\x01`;
  };
  css = css.replace(/url\((["']?)([^)]*?)\1\)/g, (_, q, inner) => `url(${protect(q + inner + q)})`);
  css = css.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, (m) => protect(m));

  // 3. Collapse whitespace/newlines.
  css = css.replace(/\s+/g, " ").trim();

  // 4. Remove whitespace around punctuation, and the last declaration's
  //    trailing semicolon before a closing brace.
  css = css.replace(/\s*([{}:;,>~])\s*/g, "$1");
  css = css.replace(/;}/g, "}");

  // 5. Restore protected literals.
  css = css.replace(/\x01(\d+)\x01/g, (_, i) => vault[Number(i)]);

  return css;
}

const src = readFileSync(srcPath, "utf8");
const min = minifyCss(src);
writeFileSync(outPath, min);

const before = Buffer.byteLength(src, "utf8");
const after = Buffer.byteLength(min, "utf8");
console.log(
  `site.css ${before}B -> site.min.css ${after}B (${Math.round((1 - after / before) * 100)}% smaller)`
);
