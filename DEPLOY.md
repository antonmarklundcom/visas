# Deploying visas.com.py (Hostinger Git)

The repo root is the web root. Pages are generated HTML that is **committed**, so Hostinger
only has to copy files (it cannot run Node). PHP is used only for `lead-forward.php`.

Edit the sources (`content.mjs`, `editorial.mjs`, `guides-extra/*.mjs`), then:

    npm ci            # first time only
    npm run package   # build + preflight + PHP tests + zip (or just `npm run build` and commit)
    git add -A && git commit && git push

Never edit the generated `*/index.html` by hand; the next build overwrites it.

## 1. Staging first

Use a Hostinger temporary domain or a subdomain such as `staging.visas.com.py`.
Any host other than `visas.com.py` / `www.visas.com.py` automatically gets
`X-Robots-Tag: noindex` and a `Disallow: /` robots.txt (`.htaccess` + `robots-staging.txt`),
so a staging copy never competes with the live site.

hPanel -> Websites -> (staging site) -> Git:

- Repository: `https://github.com/antonmarklundcom/visas` (public) or the SSH URL with a deploy key
- Branch: `main`
- Install path: empty (files go to `public_html`)
- Create, then Deploy. Enable auto-deploy and add the webhook URL in GitHub -> Settings -> Webhooks (push event).

Git copies the whole repo. That is safe: `.htaccess` denies `lib/`, `scripts/`, `docs/`, `deploy/`,
`tests/`, `.git`, and every `.mjs`, `.md`, `.json`, `.lock`, `.log` and `config*.php` file.

Then run, from any machine with the repo checked out:

    ./deploy/verify-live.sh https://<staging-host>

It checks every sitemap URL, the redirects, the 404 page, that internals are private, and that
the staging noindex guard works. It only reads; it never posts a form.

## 2. Lead form and CRM (private config)

The public site is WhatsApp-first; the contact form is off. To turn it on:

1. Create `visas-private/config.php` next to `public_html` (NOT inside it), from
   `deploy/config.example.php`. Put the VenderCRM key in `api_key` and the CRM origin in `crm_url`.
2. PHP 8.1+ (8.3 is fine), sessions on, `allow_url_fopen` on.
3. Build with `VISAS_CONTACT_FORM=1 npm run build`, commit, deploy to staging.
4. Send one test enquiry and confirm the lead appears in VenderCRM.
5. Schedule `php scripts/queue.php --send --prune` every 5 minutes (details: `HOSTINGER-RELEASE.md`).

The live site already has this wiring. A Git deploy must not touch `visas-private/`.
If leads are passed to a partner, the privacy page must say so and name who receives them.

## 3. Before the live cutover (do not skip)

- [ ] Back up the current `public_html` (File Manager -> Compress) and keep `.well-known/`
      and any verification files.
- [ ] `./deploy/verify-live.sh https://<staging-host>` passes with 0 failures.
- [ ] Every one of the 37 original URLs still answers 200 (they are all in `sitemap.xml`).
- [ ] CRM test lead received (if the form is enabled).
- [ ] Contact details, legal operator and privacy text approved by the owner.
- [ ] Switch the live site's Git to `main` (or extract `dist/*.zip`), clear any host/CDN cache.
- [ ] `./deploy/verify-live.sh https://visas.com.py` passes. Production must show NO noindex header.

## Rollback

Restore the `public_html` backup. Keep pending lead records in `visas-private/data`.
