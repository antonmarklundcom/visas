# Audit fixes — 19 September 2026

Original audit: C:/Users/anton/Documents/visas-audit-2026-09-19/AUDIT.md.
Implementation: C:/Claude 1/visas-audit-fixes. Production unchanged.

| Audit item | Result |
|---|---|
| 1 Broken WhatsApp text | Fixed Spanish accents, heading and close control; regression assertion. |
| 2 Operator identity | Clarified private information/contracting boundary and removed unverified office implication; actual operator and service model still require owner facts. |
| 3 Lead delivery | Replaced log-only success with CRM receipt validation, durable private queue, explicit pending state and CLI retry/monitoring. Live key, schedule and production receipt still to verify. |
| 4 320px clipping | Fixed landing header and footer stamps. 41 pages tested at 320px without document overflow. |
| 5 Official links | Added per-topic sources and inline links in rewritten guides. Named expert reviewer still unprovided. |
| 6 Visa wording | Expanded 214(b) explanation, removed absolute interview timing and unrelated US-interview service notices. |
| 7 WhatsApp ownership | Number preserved; actual owner/coverage unconfirmed. No message sent. |
| 8 Hero placement | Split desktop hero and text-first mobile hero with visible CTA. |
| 9 Long homepage | Three primary service paths; removed map and repeated sections; compact destinations/footer. Measured about 6,358px at 375px versus approximately 14,900px in original audit. |
| 10 Late form | Removed contact office image and shortened intro so form appears earlier. |
| 11 Paid scope | Added pre-contract scope/fee guidance; actual deliverables, exclusions and price process need operator confirmation. |
| 12 Repetition | Removed repetitive service card blocks, reduced checklist/process repetition, rewrote nine guides. Replaced word-count quotas with factual/structural checks. |
| 13 Guide usefulness | Added practical DS-160 steps, required versus conditional evidence, cost comparison table, concise print checklist and official embassy links. |
| 14 Refusal headline | Removed homepage problem section and corrected old source headline. |
| 15 Illustrative photos | Labelled hero/service imagery and explained illustrations; removed contact office scene. Real team/client evidence remains unavailable. |
| 16 WhatsApp friction | Contextual direct service links; homepage chooser only; actual wa.me fallback href when JS fails. |
| 17 Intent | Natural chooser messages, neutral contact choice and supported topic query. |
| 18 Navigation | Direct Contact link, sticky desktop header/action; retained single mobile action bar. |
| 19 Residency | Spanish journey now explains separate guide handoff; useful Spanish subpages retained. |
| 20 Map semantics | Removed decorative route map. |
| 21 Measurement | Consent-gated hooks for outbound clicks, menu opens, accepted leads and pending delivery; thank-you visit not a conversion. Real GA4 ID and CRM qualification reporting still external. |
| 22 Privacy | Expanded Spanish notice and added English privacy route with inline link. Legal operator and full retention/processor review remain owner tasks. |
| 23 Validation | Normalized phone, validated email/types/length, bounded request, same-origin/CSRF checks. |
| 24 Abuse/storage | Honeypot, 8 attempts/10-minute IP window, redacted logs, private queue outside public root, CLI retention and monitoring. Hosting schedule required. |
| 25 Deduplication | Hashed submission token plus normalized payload; same retry reused, different enquiries separated. |
| 26 Errors | AJAX retains fields/focus; secure no-JS form escapes retained values; errors distinguish pending and unavailable. Tested rejected/malformed CRM receipt, timeout and storage failure. |
| 27 Performance/crawler | No invented score; hosting field metrics and bot-challenge review remain external. |
| 28 Hero priority | Eager, high-priority primary hero; responsive AVIF/WebP variants preserved. |
| 29 Fonts/accessibility | Removed third font, improved label sizes/focus/reduced motion and responsive wrapping. Browser keyboard/form checks passed; full assistive-tech/contrast certification not claimed. |
| 30 Clean URLs | Explicit index.html redirect added; PHP local router verified. Hostinger rule verification pending upload. |
| 31 Headers | Restrictive CSP, frame restriction, referrer, MIME, permission and HTTPS HSTS rules added. Hostinger enforcement not yet tested. |
| 32 Cache | Content hashes on image and social image URLs as well as CSS/JS. |
| 33 Provenance | Visible editorial update date and Article dateModified on rewritten guides; source links. No fictional expert author. |
| 34 Portability | Sharp pinned with lockfile; build/test/serve/package commands portable; refreshed docs and release manifest. |
| 35 Shared source | Isolated worktree protects original clean master; no commit/push because not requested. GitHub synchronization and other PC comparison remain open. |
| 36 Secrets/package | Ignore rules/private config plus explicit ZIP allowlist; every entry compared to source and extracted copy. |

## Verification

- 41 HTML routes; 37 sitemap entries; 87 referenced assets passed static verification.
- 164 browser layout observations: all 41 routes at 320/375/768/1440px; no document-level overflow. Sampled desktop/mobile visuals confirmed.
- WhatsApp chooser text/focus and contact required-phone behavior verified in browser. Server validation displays an inline error and returns focus to phone without submitting to CRM.
- 17 integration scenarios passed against localhost mock CRM, including eight-second timeout, storage failure, no-JS escaping, accepted receipt, deduplication, rate limit and protected paths.
- Four PHP files linted. ZIP root, names, CRC and every file's bytes checked; extracted copy also compared byte-for-byte. No private data or secrets packaged.
- Not tested: live CRM state/notifications, Hostinger Apache configuration, other browsers/devices/assistive technology, field metrics, legal compliance, other PC files. No production changes, commit or PR.
