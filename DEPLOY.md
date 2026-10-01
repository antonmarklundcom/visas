# Deploying visas.com.py

Hostinger shared hosting, PHP 8.2, no database. The site is built and gated by `./verify.sh`.

## 1. Staging first (safe, any time)
Use a Hostinger temporary domain or a subdomain such as `staging.visas.com.py`.
The site detects any host other than `visas.com.py` / `www.visas.com.py` and serves
`noindex` plus `Disallow: /`, so a staging copy never competes with the live site.

**Option A, zip:** `./deploy/make-zip.sh` -> upload `dist/visas-<date>.zip` in hPanel File Manager,
extract inside the staging `public_html/`.
**Option B, Git:** hPanel -> Websites -> Git -> repo `antonmarklundcom/visas`, branch `main`, then enable auto-deploy.
(Git deploys the whole repo; `.htaccess` already returns 404 for `content/`, `lib/`, `docs/`, etc. and denies `*.md`.)

Then on the server: `cp config.example.php config.php`, fill what you have, PHP 8.2 with `curl`.
Check: `./deploy/verify-live.sh https://<staging-host>`.

## 2. Before the live cutover (do NOT skip)
- [ ] Old URLs mapped: every URL of the current live site either exists here or has a 301
      in `.htaccess` + `router.php` + `deploy/routes.php` (needs the Hostinger source or a crawl).
- [ ] `content/site.php`: WhatsApp, email, razon social, RUC, address filled in.
- [ ] Prices in `content/precios.php` approved.
- [ ] Back up the current `public_html` (File Manager -> Compress) before replacing anything.
- [ ] Legal pages reviewed by a lawyer.
- [ ] After cutover: `./deploy/verify-live.sh https://visas.com.py`, submit Search Console sitemap.
