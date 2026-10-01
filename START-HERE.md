# visas.com.py — revised local build, 19 September 2026

Source folder: C:/Claude 1/visas-audit-fixes (branch fix/visas-audit-20260919).
Original clean/live-matching build remains C:/Claude 1/visas-com-py on master.
Nothing has been uploaded, committed or pushed. The original live site remains unchanged.

## Local preview

Open http://127.0.0.1:8787/ on this PC. It is local-only.
If stopped: run `npm ci`, then `npm run serve` from this folder. Requires Node.js, PHP 8.1+ and Python 3 for packaging. The host needs PHP only, not Node.js.
`npm run build` regenerates HTML from content.mjs + editorial.mjs. Edit these sources, not generated pages.
`npm run preflight` checks PHP syntax and 41 public/utility routes, metadata, links, sources and assets.
`npm test` exercises actual PHP requests against a localhost CRM mock, including failure and timeout paths.
`npm run package` builds, verifies, tests and creates the allowlisted ZIP, manifest and checksum in dist/.

## Upload package

`dist/visas-com-py-hostinger-2026-09-20.zip` is root-correct: extract into the domain's public_html. Do not upload the whole source folder.
The archive excludes dependencies, tests, project notes, image-generation metadata, credentials and development servers. scripts/queue.php is the production CLI worker and is blocked over HTTP.
`dist/release-manifest.json` records all payload file hashes and the base commit; this release includes uncommitted changes. `dist/verified-extraction` is the byte-verified unpacked copy.

See HOSTINGER-RELEASE.md before publishing; AUDIT-FIXES.md maps all 36 audit findings to their disposition.


## Fable follow-up release

The current public build is WhatsApp-first. Contact pages and the landing page do not advertise or render the CRM form. The tested PHP handler and private form templates remain available for later integration. Before re-enabling the public form, configure and verify CRM receipt, private storage and queue monitoring; then build with VISAS_CONTACT_FORM=1. This is a build setting, not a hosting environment switch for already-generated HTML. Default builds keep it off.

Current information-only copy is applied in content-information.mjs through the existing editorial pass. Changes to legacy service copy in content.mjs may be superseded there. See FABLE-FOLLOWUP.md for the scope and remaining work.

ZIP filenames use the UTC build date (or explicit RELEASE_DATE). The release manifest records actual git status. npm run package now runs the extracted-package HTTP smoke test automatically. Local fonts and their OFL license files are included.
