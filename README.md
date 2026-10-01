# php-site-template

A GitHub template for local-business sites — brochure pages, calculators, guides and a
blog — in static HTML + PHP on shared hosting (Hostinger, PHP 8.2, no database, no build
step for the site itself).

It is the foundation of [contador.com.py](https://contador.com.py) with every client fact
removed: the same `lib/`, `partials/`, `templates/`, design system, lead handler, router,
route contract, verify script, deploy scripts and CI — plus example content so the site
renders and `verify.sh` is green the moment you clone it.

What is here:

- **Content is data.** One `content/*.php` array per page type; each file's header comment
  documents its key shape, and that shape is the contract every page builds against. A route
  file is three lines.
- **Two markets, one codebase.** `lib/market/py.php` (Paraguay: RUC, guaraníes, the labour and
  DNIT tables) and `lib/market/se.php` (Sweden: org.nr/personnummer, kronor, moms). One key in
  `content/site.php` picks one; templates never change.
- **Leads have values.** Every service, tool and form chip has a tier, a WhatsApp prefill and a
  thank-you in `content/lead-values.php`; `enviar.php` resolves them server-side and posts to
  VenderCRM, with an email fallback and a log fallback.
- **A build gate.** `./verify.sh` lints, boots the site, asserts the status of every URL the
  content declares, fails on any PHP notice, checks titles and descriptions, exercises the lead
  form, and checks the content arrays for dangling slugs. CI runs it on every PR and again on
  the unzipped deploy zip.
- **No invented facts.** Anything the business has not confirmed is `null` in
  `content/site.php`, and the partial that would show it hides instead.

---

## Start a new site (T0)

Twenty steps, each a command or a file edit. At the end `./verify.sh` is green and the first PR
is open. Budget: about 30 minutes.

1. **Create the repo.** GitHub → *Use this template* → *Create a new repository*. Then
   `git clone <your-new-repo> && cd <repo>`.
2. **Baseline.** `./verify.sh` — it must print `PASS` before you change anything. If it does
   not, fix that first; every later step trusts this gate.
3. **Branch.** `git checkout -b t0-adopt`.
4. **Identity.** Edit `content/site.php`: `name`, `domain`, `slug` (lower-case, names the deploy
   zip), `market` (`py` or `se`), `servicesHub` (`/servicios/` by default; a store can use
   `/productos/` — then move `servicios/index.php` and its `content/pages.php` key to match), `schemaType` (the schema.org type of the business, e.g.
   `['LegalService']`), `description`. Leave every contact and address value `null` until the
   owner confirms it — the site degrades on purpose.
5. **Language and labels.** Edit `content/ui.php`: every visible word on the site is here. For a
   Swedish site, translate the whole file. Set the `clusters` you actually have, and the `needs`
   chips the lead form should offer (3–6 is plenty).
6. **Static pages.** Edit `content/pages.php`: title, description, `h1` and `lead` for `/`,
   `/servicios/`, `/precios/`, `/herramientas/`, `/guias/`, `/blog/`, `/contacto/`,
   `/privacidad/`, `/terminos/` and `/404`. Write the real legal text into the `sections` of the
   two legal pages. Delete the entry — and its route directory — of any section this site will
   not have.
7. **Services.** Write your services into `content/services.php`, keyed by slug, following the
   header comment. Give each one a `path` under `/servicios/<slug>/`.
8. **Lead values.** Add a matching record for every service (and later every tool) in
   `content/lead-values.php`: `menuLabel`, `need`, `tier`, `whatsappText`, `nextStep`, `crmTag`.
   Then point `whatsappMenu` and each `needs` chip's `service` at your own slugs, and re-scale
   `tierValues` to this market's currency. `verify.sh` fails on any slug that does not exist.
9. **Route files.** For each service: `mkdir -p servicios/<slug>` and copy
   `servicios/servicio-ejemplo/index.php` into it, changing the `$slug` line. Same pattern for
   tools (`templates/tool.php`), guides (`templates/guide.php`), segment pages
   (`templates/segment.php`) and articles (`templates/article.php`).
10. **Delete the example content.** `grep -rn "'example' => true" content/` lists every seed
    record — delete them all, then delete their route directories and the example calculator:
    `rm -rf servicios/servicio-ejemplo herramientas/herramienta-ejemplo guias/guia-ejemplo
    blog/articulo-ejemplo segmentos/rubro-ejemplo assets/js/tools/herramienta-ejemplo.js`.
    Also empty `ui.industries.items`. Re-run `./verify.sh`: it will name anything still pointing
    at a deleted slug — typically `whatsappMenu` and the `needs` chips from step 8.
11. **Pricing.** Edit `content/precios.php`, or delete the `/precios/` page (its entry in
    `content/pages.php`, the `precios/` directory and its two nav lines in `content/nav.php`).
12. **Navigation.** Edit `content/nav.php` so the header and footer name only the sections that
    exist. Service, tool and guide links are derived — you do not list them by hand.
13. **Theme.** Replace the values in the `:root { … }` tokens block at the top of
    `assets/css/site.css` — palette, type scale, radii, spacing — with the ones from this site's
    design canvas. Change nothing below that block; every component reads tokens only. Keep
    `--accent-text` readable on both `--bg` and `--surface` (AA, 4.5:1) rather than reusing
    `--accent`.
14. **Fonts.** Replace the two families in `assets/fonts/`, update the `@font-face` rules and the
    `--font-display` / `--font-body` tokens in `assets/css/site.css`, and the two `<link
    rel="preload">` lines in `partials/head.php`. Then `./deploy/subset-fonts.sh` (needs
    `pyftsubset`), editing its `LATIN_EXT` list for this market's currency symbol.
15. **Brand images.** Replace `assets/img/favicon.svg` and `assets/img/og-default.png` (1200×630).
    Both ship as neutral placeholders.
16. **Regenerate the minified CSS.** `node deploy/minify-css.mjs` — the deploy zip ships
    `site.min.css` in place of the source.
17. **Look at it.** `php -S localhost:8080 router.php` and click through `/`, one service, one
    article, one tool, one guide, one segment page, `/contacto/` and a URL that does not exist.
18. **Gate.** `./verify.sh` — green.
19. **Deploy artifact.** `./deploy/make-zip.sh` then
    `./verify.sh --root dist/<slug>-<date>` — green on the artifact too.
20. **Ship it.** `git add -A && git commit && git push -u origin t0-adopt`, open the PR, merge it
    when CI is green.

Everything after T0 — the homepage from the design canvas, the service copy, the blog, the
tools — is phase work. See the `phased-autonomous-build` skill; `prompts/_lane2-phase.template.md`
is the phase-prompt skeleton and `prompts/_watcher.md` is the supervision Routine.

---

## Content model

Every file in `content/` returns one array and documents its own key shape in its header
comment. Those shapes are the contract: fill in the values, add optional keys, never rename or
remove one.

| File | What it holds | Rendered by |
|---|---|---|
| `site.php` | the business itself: name, domain, slug, market, contact, address, socials, testimonials | everything |
| `ui.php` | every visible string on the site | everything, through `ui('group.key')` |
| `nav.php` | the header and footer link trees (services, tools and guides derived) | `partials/header.php`, `partials/footer.php` |
| `pages.php` | the static pages, keyed by path | `templates/page.php`, `templates/page-stub.php`, the hub route files |
| `services.php` | the service pages, keyed by slug | `templates/service.php` |
| `tools.php` | the calculators, keyed by slug | `templates/tool.php` |
| `guias.php` | the how-to guides, keyed by slug | `templates/guide.php` |
| `segmentos.php` | segment / rubro landing pages, keyed by slug | `templates/segment.php` |
| `blog.php` | the article index (bodies live in each article's route file) | `templates/article.php` |
| `precios.php` | pricing plans | `precios/index.php` |
| `lead-values.php` | the tier, WhatsApp prefill, thank-you and CRM tag of every lead source | `partials/lead-form.php`, `enviar.php` |

The shapes that matter most:

**A service** (`content/services.php`, keyed by slug): `path`, `title`, `navLabel`, `cluster`,
`parent`, `seoTitle` (≤ 42 chars), `metaDescription` (120–155, unique site-wide),
`hero{eyebrow,h1,h2,lead}`, `includes[]`, `excludes[]`, `weNeed[]`,
`sections[{h2,body[],items[{title,text}]}]`, `benefits[{title,text}]`, `faq[{q,a}]`,
`cta{label}`, `related[]`, `guides[]`, `articles[]`, `toolLinks[{path,label,text}]`.

**A lead source** (`content/lead-values.php`, keyed by the same slug): `menuLabel`, `need`
(a key in `ui('needs')`), `tier` (`A`/`B`/`C`), `whatsappText` (names the service — never a
generic "consulta gratis"), `nextStep[]` (what to have ready; this is the second touch),
`crmTag`, optional `nextLink{path,label}`. Tier values in the site's currency live in
`tierValues` at the top of the file — re-scale them when the market changes.

**An article**: the index record in `content/blog.php` (`slug`, `title`, `seoTitle`,
`description`, `date`, `updated`, `tags[]`, `service`) plus `/blog/<slug>/index.php`, which sets
`$sections` (and optionally `$faq`, `$toolLink`) and requires `templates/article.php`.

**A page** (`content/pages.php`, keyed by path): `title`, `description`, `h1`, `lead`, optional
`sections[{h2,body[]}]`, `stub`, `noindex`, `changefreq`, `priority`. A page with `stub => true`
renders through `templates/page-stub.php`, is `noindex` and stays out of the sitemap.

Adding anything is: a record in its content file, a three-line route directory, and — for a
service or a tool — a `lead-values.php` record. `deploy/routes.php`, `sitemap.php`,
`content/nav.php` and the hub pages all read the content arrays, so the new page joins the route
contract, the sitemap, the navigation and the smoke test by existing.

Two things to know before editing a partial: an `include` shares the caller's scope (every
partial prefixes its locals and `unset()`s them on the way out — keep doing that), and every
value that reaches the page goes through `e()`.

---

## Market module contract

`content/site.php`'s `market` key names one file in `lib/market/`; `lib/bootstrap.php` loads it.
Every module defines the same functions, so no template, partial or helper is written twice:

| Function | Returns |
|---|---|
| `market_id()` | `'py'`, `'se'`, … |
| `market_locale()` | BCP-47 tag for `<html lang>` (`es-PY`, `sv-SE`) |
| `market_currency()` | ISO 4217 code, used for the Ads conversion value |
| `market_country()` | country name, for the JSON-LD `areaServed` |
| `fmt_money(int $amount)` | whole units in local formatting (`₲ 1.500.000`, `1 500 000 kr`) |
| `validate_tax_id(string $id)` | the market's business tax id (RUC modulo-11, org.nr Luhn) |
| `tax_id_check_digit(string $base)` | the check digit for a base number |
| `fmt_date_long(string $iso)` | `4 de septiembre de 2026`, `4 september 2026` |
| `market_vat_rates()` | `['standard' => int, 'reduced' => int[]]` |
| `market_table(string $name)` | reference tables (`laboral`, `vencimientos`), `[]` when the market has none yet |
| `market_last_reviewed()` | ISO date shown next to every calculator's disclaimer |

`assets/js/market/<id>.js` mirrors it as `window.Market` (`id`, `currency`, `locale`, `vat`,
`fmtMoney`, `validateTaxId`, `taxIdCheckDigit`, `table`), so a calculator written once works in
both markets. `templates/tool.php` loads the module for the site's market automatically.

`verify.sh` checks that every module in `lib/market/` implements the whole contract and has a JS
counterpart — adding a third market means adding both files and nothing else.

The `se` module's `laboral` and `vencimientos` tables are deliberately empty: the first Swedish
site that needs semester, uppsägningstid or the Skatteverket calendar fills them in there, with
its sources, the way the `py` tables document theirs.

---

## Preview locally

```sh
php -S localhost:8080 router.php
```

`router.php` exists only for the built-in server — Apache never sees it. It mirrors every routing
rule in `.htaccess` (redirects and 410s, `sitemap.xml`, `robots.txt`, trailing-slash enforcement,
the denied directories, the 404 document), so what you see locally is what production does.
Change one, change the other, and give the URL its expected status in `deploy/routes.php`.

Nothing needs configuring: with no `config.php` the site renders and the lead form still accepts
submissions in degraded mode.

## Verify

```sh
./verify.sh                       # the repository
./verify.sh --root dist/<name>    # an unzipped deploy artifact
```

It runs `php -l` over every PHP file, checks the market modules, boots `php -S`, asserts the
status of every URL in the route contract, fails on any PHP warning or notice, checks that every
page has a unique non-empty title and description with the title under 60 characters, exercises
`enviar.php` (degraded mode, the no-JS redirect, the honeypot, the resolved tier and Ads value,
the per-service thank-you, no generic wa.me message), and checks the content arrays for dangling
slugs and missing route files. GitHub Actions runs the same script on every PR, then rebuilds the
deploy zip and runs it again against the unzipped artifact.

Screenshots for a PR body:

```sh
cd tests && npm ci
node screenshots.mjs --phase t0 --base http://127.0.0.1:8080 / /servicios/ /contacto/
```

It also fails if any page scrolls horizontally. Screenshots are CI artifacts, never committed —
`docs/screenshots/` is git-ignored.

## Deploy to Hostinger

Shared hosting, PHP 8.2, no Node, no database.

```sh
./deploy/make-zip.sh       # → dist/<slug>-YYYY-MM-DD.zip
```

The zip holds exactly what belongs in `public_html/` — no `docs/`, `prompts/`, `tests/`,
`deploy/`, git metadata, `config.php` or logs — and ships `assets/css/site.css` minified in
place, so the repository keeps the readable source.

1. hPanel → **File Manager** → open `public_html/`, upload the zip, then *Extract* into
   `public_html/` itself. The archive is flat: `index.php`, `.htaccess` and the page directories
   land directly there, with no wrapper folder.
2. Copy `config.example.php` to `config.php` **on the server** and fill it in. `config.php` is
   git-ignored and must never be committed.
3. Make sure `logs/` exists and is writable — the zip creates it with its own `.htaccess` denying
   web access. The lead handler writes there.
4. hPanel → **PHP Configuration** → PHP **8.2**, with `curl` enabled.
5. Check `https://<domain>/`, `/sitemap.xml` and `/robots.txt`, then submit a test lead and
   confirm it reaches VenderCRM → **Contactos**.

`config.php` values, all optional:

| Key | Effect when empty |
|---|---|
| `SITE_URL` | canonical/OG URLs fall back to the request host |
| `VENDERCRM_URL`, `VENDERCRM_API_KEY` | the lead form runs in degraded mode: submissions are appended to `logs/leads.log` and the visitor still gets a success state |
| `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_FROM` | no lead notification email |
| `GA4_ID`, `ADS_ID` | `assets/js/analytics.js` is a silent no-op |

Fill `content/site.php` (WhatsApp, phone, email, address, hours) **before** building the zip:
those values ship inside it, not in `config.php`, so a site published with them empty has no
WhatsApp button and no NAP line until the next upload.

After every upload, and again after the DNS cutover:

```sh
./deploy/verify-live.sh https://staging.example.com
```

It curls every URL in the route contract against the live site, asserts the same statuses
`verify.sh` does locally, and checks that `config.php`, `lib/` and `logs/` are not publicly
readable.

### Replacing an existing site on the same domain

The zip does not remove what is already in `public_html/`. For a WordPress replacement: take a
hPanel backup (files + database), delete everything in `public_html/` including `.htaccess` and
`wp-config.php`, then extract the zip into the empty directory and continue from step 2 above.
List the old URLs that must 410 or 301 in `.htaccess`, `router.php` and `deploy/routes.php` — all
three, so `verify.sh` proves they agree.

---

## Layout of the repository

```
index.php              homepage
404.php  robots.php  sitemap.php  enviar.php   endpoints
router.php  .htaccess                          routing (mirror each other)
config.example.php                             copied to config.php on the server
verify.sh                                      the build gate
lib/          bootstrap, helpers, SEO/JSON-LD
lib/market/   one file per market: py, se
partials/     header, footer, head, forms, bands — shared chrome, parameterised
templates/    service, article, tool, guide, segment, page, page-stub
content/      the content arrays: the contract every page builds against
assets/       css (tokens + components), fonts, img, js (market modules, tools)
deploy/       make-zip, minify-css, subset-fonts, optimize-images, verify-live,
              leads-to-csv, routes (the route contract)
tests/        Playwright screenshots for PR bodies
prompts/      _handoff, _watcher, _lane2-phase.template — the autonomous build wiring
.github/      CI: verify + deploy-zip check + screenshots artifact
```

Route directories (`servicios/`, `blog/`, `herramientas/`, `guias/`, `segmentos/`, `contacto/`,
`precios/`, `privacidad/`, `terminos/`) hold three-line `index.php` files that name a slug and
require a template.

---

Extracted from `antonmarklundcom/conthtml` (contador.com.py), which remains the reference
implementation of every pattern here.
