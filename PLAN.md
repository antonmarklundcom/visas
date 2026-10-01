# visas.com.py — plan

Lead-gen site for visa help. Primary market: Paraguayans applying for a US visa
(turista B1/B2, renovación, estudiante F-1 / J-1, trabajo), secondary Canadá (México, Schengen and UK are visa-free for Paraguayans). Secondary audience: foreigners who want residency in Paraguay (one ES page,
one EN page). Spanish, "vos" register (Paraguayan), professional but warm.

Verdict source: docs/02-final.md of the domain-portfolio triage (2026-09-13) ranks
visas #1 short-term. USD 500/month pilot anchor for an agency buyer, or Anton sells
the service himself with a partner who does the paperwork.

## Stack (same as tasacion.com.py, proven on Hostinger)
- `content.mjs` holds every page as data. `build-site.mjs` renders static HTML
  into the repo root (one folder per route with index.html). `.html` is never
  hand-edited.
- `assets/css/site.css`, `assets/js/site.js`, cache-busted with a content hash.
- `lead-forward.php` posts the form server-side to VenderCRM (key never in the
  browser), logs every lead to `leads.log` as a fallback, honeypot, idempotency.
- `serve.mjs` local preview on http://localhost:4323 (static, PHP form will not
  submit locally; the WhatsApp path works).
- `verify.mjs` gate: routes exist, forbidden strings absent, canonical facts used
  verbatim, every page has title/description/canonical/JSON-LD.
- Deploy: flat zip to Hostinger public_html (hostinger-html-php-deploy skill).

## Phases
- P0 (tonight, Codex hard): foundation + design system + home + contacto +
  gracias + 404 + lead handler + preview server. Fable audits in browser.
- P1 (tonight, Codex normal/hard): all service pages, guides, FAQ, nosotros,
  residencia ES + EN, sitemap, robots, verify.mjs.
- P2 (tomorrow, with Anton): Google KWP data -> retitle pages, add/merge pages,
  real service list + prices, WhatsApp number, VenderCRM key, imagery
  (Higgsfield via webimg-pipeline), zip + deploy.
- P3: Google Ads landing variants, Search Console, GBP if there is an office.

## Page map (v1)
| Route | Purpose | Primary keyword (seed, verify with KWP) |
|---|---|---|
| / | Home: US visa help for Paraguayans, WhatsApp-first | visa americana paraguay |
| /visa-americana/ | Hub: all US visa services | visa americana |
| /visa-americana/turista/ | B1/B2 first-time | visa de turista estados unidos requisitos |
| /visa-americana/renovacion/ | Renewal, interview waiver | renovar visa americana paraguay |
| /visa-americana/estudiante/ | F-1, J-1 (work and travel) | visa de estudiante estados unidos |
| /visa-americana/trabajo/ | H-2B, H-1B orientation | visa de trabajo estados unidos |
| /visa-americana/entrevista/ | Interview prep / simulacro | entrevista visa americana preguntas |
| /visa-americana/denegada/ | 214(b), reapplying | visa americana denegada volver a aplicar |
| /visa-canada/ | Visitor / study visa Canada | visa canada paraguay |
| /residencia-en-paraguay/ | ES: foreigners relocating | residencia en paraguay extranjeros |
| /en/residency-in-paraguay/ | EN version | paraguay residency |
| /guias/ + 4 guides | SEO articles | see content brief |
| /preguntas-frecuentes/ | FAQ (FAQPage JSON-LD) | |
| /nosotros/ | Who we are, how we work, disclaimer | |
| /contacto/ | Form + WhatsApp | |
| /gracias.html, /404.html | | |

## Rules
- Never promise approval. Never say "garantizada", "aprobación segura", "100%".
- Not the embassy, not the US government, no lawyers claimed. Disclaimer in footer
  and on every service page.
- Facts only from docs/FACTS.md. Anything else: "consultá el monto vigente" or
  add to docs/FACTS.md with a source.
- Prices: none published until Anton confirms (docs/PREGUNTAS-PARA-ANTON.md).
- Phone/WhatsApp: placeholder number from tasacion's shared stage-1 line until
  Anton gives the visas number.
