# visas.com.py – snapshot notes

Snapshot taken 2026-10-01 (UTC) with curl + Playwright (Chromium). Nothing was rewritten. No Google/Bing service was contacted (Playwright aborted every non-visas.com.py request; none were attempted).

## 1. Discovery

| Item | Finding |
|---|---|
| Host / CDN | Hostinger (`platform: hostinger`, `panel: hpanel`, `Server: hcdn`), HTTP/3 advertised |
| robots.txt | 200. `User-agent: *`, `Allow: /`, `Sitemap: https://visas.com.py/sitemap.xml` |
| sitemap.xml | 200, plain `<urlset>` with 37 `<loc>`, no `<lastmod>`, no sitemap index (`/sitemap_index.xml` is 404) |
| .htaccess | 403 (exists/blocked, not readable) |
| Redirects | `http://visas.com.py/` -> 301 `https://visas.com.py/`; `https://www.visas.com.py/` -> 301 `https://visas.com.py/`; `http://www.visas.com.py/` -> 301 `https://www.visas.com.py/` (then a second 301 to apex, two hops) |
| Trailing slash | `/contacto` -> 301 `/contacto/`; `/contacto/index.html` -> 301 `/contacto/`; `/index.html` -> 301 `/` |
| Case | `/Contacto/` -> 404 (case-sensitive) |
| URL style | Clean directory URLs with trailing slash (`/visa-americana/turista/`). No `.php`/`.html` in any public URL |
| Home headers | 200, `Content-Type: text/html`, `Cache-Control: no-cache`, ETag/Last-Modified present (static-file behaviour). Assets: `Cache-Control: public, max-age=31536000, immutable` with `?v=<hash>` cache-busters |
| Security headers (all responses) | CSP (`script-src 'self' https://www.googletagmanager.com`, `connect-src` google-analytics, `form-action 'self'`, ...), HSTS 1y, nosniff, Referrer-Policy strict-origin-when-cross-origin, X-Frame-Options SAMEORIGIN, Permissions-Policy. Not part of the mirror: they are set by server/.htaccess and must be re-created on deploy |
| `x-powered-by` | Not sent on pages. **`X-Powered-By: PHP/8.3.33` appears on `/lead-forward.php`** |
| 404 | `/nonexistent-url-123` -> **HTTP 404** serving the custom page (title "Página no encontrada \| visas.com.py", `noindex, follow`, canonical `/404.html`). `/404.html` itself returns **200**. Saved as `site/404.html` |
| Other probes | `/index.php`, `/wp-login.php`, `/contacto.php`, `/favicon.ico`, `/llms.txt` -> 404. `/assets/` -> 403 (no directory listing) |

**Stack guess:** pre-built static HTML (generated pages, hashed assets, no WordPress, no CMS markers) served from Hostinger, **plus at least one PHP script** (`/lead-forward.php`, PHP 8.3). So: static site + small PHP backend for the contact form, not a pure static site.

## 2. Crawl
`urls.csv`: 37 URLs crawled (all 200, no redirects, 1 JSON-LD block each, exactly one H1 each, canonical = self on every page, hreflang present on 12 pages (`/`, `/contacto/`, `/privacidad/`, `/visa-canada/`, `/residencia-en-paraguay/`, `/visa-americana/turista/`, `/en/`, `/en/contact/`, `/en/privacy/`, `/en/us-visa-from-paraguay/`, `/en/canada-visa-from-paraguay/`, `/en/residency-in-paraguay/`), none on the rest, as served). Every internal link target returned 200 (0 broken internal links).

## 3. Mirror (`site/`)
Raw bytes via curl (no decompression, no rewriting): 38 HTML pages (37 + `404.html`) as `<path>/index.html`, `robots.txt`, `sitemap.xml`, and 91 assets: `assets/css/site.css`, `assets/js/site.js`, 2 woff2 fonts (Manrope, Fraunces – self-hosted), `assets/img/favicon.svg`, 2 OG jpgs, AVIF+WebP photo variants at 640/1280/1920. No PDFs on the site. HTML references assets with `?v=hash` queries; the files are stored without the query (a static host ignores it). A Playwright pass over all 37 pages found **0 same-host requests missing from the mirror**.

**Third-party hosts:**
- Loaded by pages: **none**. All CSS, JS, fonts and images are same-origin.
- Conditional: `site.js` can inject `https://www.googletagmanager.com/gtag/js?id=...` only after the visitor accepts the consent banner AND a `<meta name="analytics-id">` with a `G-...` id exists. **No page currently has that meta, so Google Tag Manager/Analytics never loads today.** The CSP still whitelists googletagmanager.com / google-analytics.com.
- Outbound links only (not loaded): wa.me (WhatsApp, +595 995 628 862), travel.state.gov, ceac.state.gov, j1visa.state.gov, py.usembassy.gov, canada.ca, exteriores.gob.es, travel-europe.europa.eu, immi.homeaffairs.gov.au, migraciones.gov.py, paraguayresidencyguide.com.
- WhatsApp links: 4–13 per page (home 13).

## 4. Forms and server logic
- `<form>` in any served static page: **0** (contacto pages are WhatsApp-only in the static HTML).
- **`/lead-forward.php`** (live, PHP 8.3, sets `visas_session` cookie HttpOnly/Secure/SameSite=Lax):
  - `GET /lead-forward.php?action=token` -> JSON `{csrf, submission_id}`.
  - `GET /lead-forward.php?action=form&lang=es|en` -> full HTML page containing `<form method="post" action="/lead-forward.php" id="contact-form">` with fields `nombre, telefono (required), email, tipo_visa, mensaje, website (honeypot), lang, page_url, csrf, submission_id`. Saved with tokens redacted in `dynamic/`.
  - `POST /lead-forward.php` (FormData + `attribution` JSON of UTM/gclid/fbclid) -> JSON `status: error|pending|delivered`, `message`, `reference`, `duplicate`; "delivered" = forwarded to a CRM (`delivery:'crm'` in the JS). One unauthenticated empty POST probe returned 403 (CSRF rejection).
  - Nothing in the static HTML links to it; `site.js` only wires up `#contact-form` if present, which only exists in the PHP-rendered form page (and the `<noscript>` fallback there).
- Inline/external JS network calls: `site.js` fetches `/lead-forward.php` (above); optional gtag (above). No other fetch/XHR/beacon.
- **Not recoverable by crawling:** the PHP source of `lead-forward.php` (validation, CSRF/session logic, rate limiting, CRM endpoint + credentials, fallback storage), any DB, `.htaccess`/server config, the CSP/security-header configuration, the generator/templates that produced the HTML. Other undiscovered `.php` endpoints cannot be excluded.

## 5. Evidence
`shots/`: full-page desktop (1366px) and mobile (390px) of `/`, `/visa-americana/`, `/guias/como-llenar-el-ds-160/`, `/en/`.
`pageweight.csv` (cold cache, per page): 5–12 requests (avg 6.2), 196–330 KB transferred (avg 222 KB). Heaviest: `/visa-americana/` (12 requests, 330 KB); lightest: `/en/contact/` (5, 196 KB).

`tools/`: the scripts used (`crawl.py`, `mirror.py`, `shots.py`) and raw JSON outputs.
