# Fable audit follow-up

Local worktree: C:/Claude 1/visas-audit-fixes. No deployment, commit, push, partner contact or live enquiry submission.
The supplied audit was treated as evidence and proposed changes, not authorization to deploy.

## Changes and dispositions

| Finding | Disposition |
|---|---|
| D1 / B1 / B3 / B8 | Replaced service-delivery claims in home, hub, landing, Spanish/English topic pages and FAQ content. Topic pages now provide reader instructions. FAQ schema comes from the same visible answers; Service/provider assertions removed. |
| D2 | Advisor/office image descriptions now describe illustrations. Other generated-image descriptions explicitly identify illustrations. |
| D3 / D4 | Topic checklists rewritten to match their reader-facing headings. Removed irrelevant interview-timing residue. |
| D5 / B4 | One fee policy: consult the official current amount; no hardcoded USD 185 in public copy. A dated price and an instruction to recheck it are not inherently contradictory, but one policy is clearer. Added official ETIAS reference/applicability caveat without claiming a launch date; 214(b) no-appeal wording and source recorded. |
| D6 | Full-viewport sizes reserved for home backdrop. Split heroes declare actual layout slots. Browser selected 640px tourist AVIF at 1440px for a 475.7px slot. |
| D7 | Header and desktop navigation wrap. All 38 directory routes fit at 1440px with root text set to 200%. |
| D8 | Mobile body has bottom clearance for fixed actions. At scroll end, contact footer base bottom 692px, action bar top 739px. |
| D9 / B5 | Utility messages are generic; topic messages use a readable topic; home chooser asks a natural question. All links retain the specified WhatsApp number. |
| D10 | Package name derives from UTC build date or RELEASE_DATE. Manifest checks git status instead of hardcoding dirty state. |
| D11 / B12 | Removed route-map function and unused cards/teaser renderers after checking effective content. Retained legacy thank-you URLs as noindex informational pages, with no receipt or conversion claim. Broad dead CSS/data cleanup remains deferred. |
| D12 | Decorative boarding pass hidden from assistive technology; private-advisory wording removed. |
| D13 | Breadcrumb/privacy targets enlarged and form helper minimum set to 12px. Inline text links can have WCAG target-size exceptions; this is not a full WCAG certification. |
| D14 | Retained handler now gives a specific phone-format error in both languages. Public form is deferred while CRM waits. |
| B13 | Self-hosted subset variable Fraunces/Manrope WOFF2 with preloads and content versions; licenses included. No Google Fonts stylesheet or font request. No invented metric overrides or promise of zero CLS. |
| B14 | No page mergers or canonical consolidation without a search-intent decision. Existing 41 routes retained. |
| B15 | Node engine documented; no GitHub commit/push or other-PC work was authorized/performed. |

## Current contact mode

WhatsApp +595 995 628862 is the primary path. Mobile secondary action goes to guides/explore. Contact pages and the advertising page render direct WhatsApp contact rather than an unconnected CRM form. No false response-time promise added.
The PHP pipeline is retained and tested, including secure no-JavaScript templates under the protected lib/forms directory. Public form exposure can be re-enabled with VISAS_CONTACT_FORM=1 at build time after CRM delivery and monitoring are verified. The PHP endpoint remains available; hiding a public form is not an access-control mechanism.
Privacy request instructions now use WhatsApp and do not tell users to select an unavailable form option.

## Verification

- Static preflight: 41 HTML routes, 37 sitemap entries, 89 referenced assets; PHP syntax, metadata, internal links and language checks passed.
- Added regressions reject the flagged agency phrases, Service schema and false advisor/office alt text.
- 164 browser observations: 41 routes at 320/375/768/1440px, zero document overflow or flagged delivery phrases; no public CRM form rendered.
- 38 directory routes tested at 200% root text on 1440px, zero document overflow. This is enlarged-text testing, not an assistive-technology certification.
- 17 localhost mock-CRM scenarios passed, including no-JS escaping, timeout, malformed receipt, duplicate handling and storage failure. No real lead sent.
- Release allowlist includes protected form templates and local-font licenses. Archive CRC/names/every file compared with source and extracted copy; extracted routes and PHP token endpoint smoke-tested.

## Still open

Owner/partner facts and legal privacy review; live hosting redirects/headers; live CRM and notification verification, queue scheduling; analytics ID and lead qualification reporting; Search Console/field performance; real-device/browser and full accessibility coverage. Deferred repo work: consolidate the legacy content phases into one source, broadly prune unused CSS/data, add dedicated queue-worker/concurrency tests and reconsider per-record locks before CRM launch. Sharp correctly remains a development dependency because this is a static build; install development dependencies on the build machine.

Official factual references:
- https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/visa-denials.html
- https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html
- https://travel-europe.europa.eu/en/etias
