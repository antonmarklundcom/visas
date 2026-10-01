# Static foundation

## P6 content, related pages and accessibility — 2026-09-14

Added /guias/cuanto-cuesta-la-visa-americana/, /guias/requisitos-para-viajar-a-espana-desde-paraguay/ and /guias/checklist-visa-americana/ using the existing guide layout, Article schema, table of contents and matching inline service CTA. All nine guides appear in the index and Spanish navigation. The new guides use the requested existing photos and contain 850, 865 and 906 words respectively, excluding TOC/breadcrumb navigation and related cards. No image assets changed.

The cost guide publishes exact F3 and F4, with personal preparation expenses separated from the official arancel. F3 was checked against https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html during this pass. USD 185 remains the only published currency amount. The Spain guide uses the exact F11 tourism sentence; its 90-day tourism allowance is the sole new numeric-duration exception, limited by the verifier to that sentence on that route. Border preparation is framed as usual practice, without amounts or universal document requirements.

Every service and guide (plus the US hub) has three related tickets before its CTA band. Page-specific related route arrays and the fallback selector live in content.mjs; English defaults stay in English. Related navigation is excluded from editorial word counts, while existing service and guide count checks remain. LANGUAGE_PAIRS is the single content registry for the six reciprocal language pairs, including Spanish x-default. The verifier independently checks its required endpoints and rendered symmetry.

The first body element now skips to main with id="main" and tabindex="-1". The checklist has three groups of printable boxes and a native browser print button. P6 CSS hides header, footer, CTA bands and the mobile WhatsApp bar during printing, along with navigation and other non-checklist controls. The 404 keeps its hero and adds six helpful links and an address-check hint. Styles are appended under the P6 marker; the existing CSS, including tokens, is preserved.

Local validation: node build-site.mjs, node verify.mjs and node --check content.mjs exit zero. Verification covers 39 HTML routes and 36 sitemap entries, existing forbidden-copy/currency checks and all P6 assertions. An earlier verifier run reported "numeric duration or validity claim" on the Spain guide and "404 hint missing" because new check literals were encoded incorrectly; corrected literals and a rebuild resolved both. No deployment, commit, PR, credential changes or production writes were performed.

Run `node build-site.mjs` from the repository. Edit source data and assets, never generated HTML. The build writes each `PAGES` record to its `path` (directory routes receive `index.html`), plus robots and sitemap. CSS, JS and favicon URLs use hashes of their own contents. Only the five foundation pages are included; service and guide links intentionally await the next dispatch.

## Add a page

Add a record to `PAGES` in `content.mjs` with `type`, `path`, `label`, `waContext`, unique `title` (under 60 characters), `description` (under 155), `hero` and ordered `sections`. Types: `home`, `service`, `hub`, `guide`, `faq`, `simple`. A hero has `eyebrow`, `title`, `lead`, optional `primary` WhatsApp label, `secondary: {label, href}`, `chips`, and `ticket: true`. Section renderers: `services`, `route`, `checklist`, `cards`, `teaser`, `faq`, `cta`, `contact`, `prose`; use the home records as examples. Sections accept an optional `id` and `tone: 'paper-2'`. CTA uses ink automatically. Optional `breadcrumbs: [{label, href}]` supplies the hierarchy after Inicio. Services receive Service schema and an extra disclaimer; guides receive Article schema; FAQ sections automatically supply FAQPage schema. All records get metadata and breadcrumbs. Use `sitemap: false` for utility pages (gracias and 404); public pages remain crawlable.

## Tickets and stamps

`ticket(item, index)` renders service data (`eyebrow`, `title`, `body`, `href`, `tag`). `.ticket` divides `.ticket__main` and `.ticket__stub`; the stub's repeating gradient is the perforation and the parent pseudo-elements are notches. Set `--stub` for width and `--notch` to the surrounding background when reusing it. `boardingPass()` uses the same component in the hero and adds the gentle float. The contact form uses the same ticket shell.

`stamp(id)` draws concentric rings and circular SVG text. Pass a unique path ID for each stamp on a page. It is decorative, hidden from assistive technology, and never conveys a consular result. P2 adds editorial photos; they are illustrations, not testimonial or business proof.

`waHref(page)` is the only WhatsApp URL builder and uses `WA_NUMBER` from content. Header, hero, footer, contact alternative and mobile bar all use page-specific Spanish prefills. The mobile menu is a native modal dialog; the sticky bar hides when the contact form intersects the viewport. Reveals progressively enhance visible HTML and respect reduced motion.

Preview with the existing `node serve.mjs` at `http://localhost:4323`. It serves static files only; PHP submission and CRM delivery require separate hosting verification. The preview server's own missing-route response is outside this dispatch; inspect `/404.html` directly. No production deployment is performed.

## P1 pages and verification gate

The build now includes all 22 page records: the five foundation pages, the US hub and six services, Canada, residency in Spanish and English, the guide index and four articles, the general FAQ and the about page. Mexico is no longer a service, navigation route or contact option. The home has eight service tickets and the form has seven options. The sitemap contains the 20 public pages; the existing gracias and 404 utility pages retain `sitemap: false`.

Run `node build-site.mjs`, then `node verify.mjs`, then `node --check content.mjs`. The verification command exits with status 1 on any failure. Its explicit `ROUTES` list is independent of `PAGES`, so a deleted content record cannot silently remove a required route from validation.

The gate checks every generated route and recursively inspects HTML files (excluding dependency, hidden and symlink directories). Each HTML document must have exactly one h1, one nonempty title under 60 characters, one nonempty meta description under 155 characters, its expected canonical and language, parseable JSON-LD, a BreadcrumbList ending at its canonical, and the complete verbatim disclaimer. It rejects unexpected HTML routes, duplicate IDs, accent-insensitive forbidden wording, references to the removed Mexico route, numeric day/year durations and unsupported USD/Gs. figures. If USD 185 is published, the exact F3 sentence must accompany it. This release uses the permitted current-amount wording instead of publishing a fee.

Every href is checked against the route list, an external URL, a working fragment, or the permitted handler/utility URLs. Local stylesheet and favicon link targets are assets rather than page routes and must exist. Every WhatsApp URL must use HTTPS and contain nonempty, page-specific text; English-page prefills must start in English. The phrase about an interview waiver is allowed only inside the complete, conditional F7 sentence, including its JSON-LD occurrence.

Service checks include the full section structure, audience/checklist/process/problem counts, 4–6 visible questions matching FAQPage schema, Service schema with an Organization provider, F5 in the body, the aviso block and 500–900 words. The US hub also gets Service and FAQPage schema, six tickets and a comparison table. Guides must have Article schema, h2 sections linked by a table of contents, an inline CTA to a service and a final WhatsApp CTA band, with 700–1100 words. Counts include main-page headings and CTAs, excluding breadcrumb and TOC navigation. The general FAQ must have exactly 12 questions; the about page must include the disclaimer in its body.

The gate additionally checks reciprocal Spanish/English hreflang, all required service/guide/company links in each header and footer, eight home tickets, four guide-index cards, the exact seven contact options, the absence of Mexico in service/navigation data, sitemap completeness and the robots sitemap reference. English residency has English interface labels, copy, metadata and WhatsApp messages. The mandatory original Spanish legal sentences remain visibly identified as source text and marked `lang="es"`; US consular wording is distinguished from Paraguayan residency decisions.

New blocks are `bullets`, `comparison` and `article`. Guide articles contain explicit section IDs and paragraph arrays, with a native anchor-based table of contents that becomes sticky on desktop. No extra JavaScript is required. New component styles are appended under `/* == P1 == */`; the existing token block is unchanged. Metadata, navigation and legal text are localized through page language data without changing the header/footer structure. This gate validates local output, not production hosting, official fee availability or PHP/CRM submission.

## P2 editorial photos and icons

The IMAGE_SLOTS table in content.mjs assigns optional hero.image manifest base names. Service, hub and guide heroes show text left and a 3:2 photo frame right on desktop, stacked after text on mobile. The home airport photo is the only eager/high-priority image; its boarding pass overlaps at 60% width on desktop and stacks below on mobile. The stamp stays behind it.

Slots: airport couple on home; DS-160 desk on the US hub, guide index and DS-160 guide; Miami traveler on tourist service and requirements guide; passport stamps on renewal; campus on student; worker on work; interview practice on interview service, interview guide and home checklist; document review on denied service and denial guide; Toronto on Canada; Costanera on both residency languages and the home teaser. The office appears below the about introduction and the contact left-column introduction. The unused Europe asset has no page assignment.

photo() reads manifest alt_text and file dimensions, emits AVIF then WebP source sets at 640/1280/1920 with sizes, and an explicitly sized img. Paths are root-relative for nested routes. All photos except the home LCP lazy load. The CSS frame reserves 3:2 and crops with object-fit. No caption makes a new business claim.

ICONS in build-site.mjs defines passport, refresh, graduation-cap, briefcase, chat-bubbles, document-alert, maple-leaf, house, plane, calendar, shield-check and check-circle once. Each uses a decorative 24px viewBox, currentColor, 1.6 stroke and round caps/joins. SERVICES records have icon keys; service tickets use red circular holders. Route steps retain their numbers and add icons; problem cards and the footer contact heading use shared icons. Ticket icons are capped at 28px.

P2 styles are appended below the unchanged tokens and prior component rules. Verification now checks six responsive files for each referenced raster base, alt/dimensions for every img, loading priority, assigned slots and absence of the unused Europe asset from HTML.

## P3 keyword-planner expansion — 2026-09-14

Added routes:
- /guias/embajada-de-estados-unidos-en-paraguay/
- /guias/migraciones-paraguay/
- /residencia-en-paraguay/permanente/
- /residencia-en-paraguay/temporal/
- /residencia-en-paraguay/requisitos/
- /work-and-travel/
- /visa-espana/
- /visa-australia/

The existing service and article renderers cover all additions; no build renderer, stylesheet or image assets changed. Residency remains a service record with its complete section structure and now also acts as a hub with three ticket cards and the Migraciones guide link. The English page links the hub and the three Spanish topics. Breadcrumbs on residency subpages include the hub. Other destinations has its own dropdown; the US dropdown is unchanged. Footer navigation includes every new route.

The owner approved the shorter home title “Visa americana desde Paraguay: asesoría para Estados Unidos” and updating outdated verifier assertions. The gate now expects eleven home tickets, seventeen general FAQ questions and six guide cards. The Spain image is allowed only on /visa-espana/. All previous validation categories remain, with added checks for cluster links, dropdown membership, assigned photos, exact F14, F3 and keyword titles. Total: thirty routes and twenty-eight public sitemap entries.

New services use the full existing section structure, contextual F5 and aviso. The Spain, Work and Travel, residency and Migraciones photos use the requested assets. Australia and the embassy guide have no hero photo; Toronto was not repurposed as an Australian location. No numeric duration or visa-subclass number was added. The FAQ publishes only the exact F3 fee sentence. The current US Department of State fee page supports the amount: https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html (checked during this dispatch).

F12's Australian eligibility clause was not published: Paraguay was absent from the official country-cap list inspected during this dispatch, so that clause could not be verified. Australia copy directs the visitor to confirm passport eligibility with the Australian authority and makes no eligibility claim. Reference: https://immi.homeaffairs.gov.au/what-we-do/whm-program/status-of-country-caps . The J-1/sponsor portion of F12 is used. FACTS.md remains unchanged. New Spain copy uses the supported tourism/long-stay distinction without a numeric duration; nómada digital remains a consular consultation topic, with no invented category requirements.

Validation is local output validation only; no deployment or production writes were performed.

## P4 English section - 2026-09-14

Added /en/, /en/paraguay-visa/, /en/us-visa-from-paraguay/ and /en/canada-visa-from-paraguay/. The three services reuse the Spanish service section structure and design system. Entry advice stays within F15: nationality-dependent visa-free entry, eligible visa on arrival at Silvio Pettirossi airport, or a consular application before travel. Its ten FAQs cover the specified nationality and long-tail questions without lists of eligible nationalities, fees or validity periods. Document preparation is framed around confirming the applicable consular instructions rather than inventing a fixed checklist.

Replaced English residency with a short bridge to the Paraguay Residency Guide. RESIDENCY_GUIDE_URL in content.mjs is the single placeholder URL (https://paraguayresidency.com); the rendered link has rel="noopener". The bridge retains reciprocal hreflang with the Spanish residency hub, distinguishes temporary and permanent residency without numeric durations, and limits its WhatsApp invitation to entry, US or Canada visas.

English rendering now has its own four-service navigation plus ES, English footer, decorative stamp, ticket labels, image alternatives, breadcrumbs, metadata, disclaimer and contextual WhatsApp messages. The English index and residency bridge receive WebPage schema; English services receive Service schema and the English F5 sentence, explicitly scoped to US interviews on the other destinations. US appointment guidance uses only the official online system under F14. Spanish pages receive the small monospace EN switch; a generated-output comparison confirmed all 29 Spanish pages otherwise unchanged. No CSS or image changes were needed.

Verification retains the previous validation categories and adapts the former full English residency assertions to the specified bridge. Added independent routes, English visible/accessible/metadata/schema language checks, index ticket count, image assignments, bridge word count and noopener link, entry FAQ topics and language switches. Local validation passes for 34 HTML routes and 32 public sitemap entries. English service counts are 881 (Paraguay), 769 (US) and 789 (Canada), including their notices. Earlier verification failures exposed the untranslated decorative stamp and a language-check false positive; both were corrected before the final passing run. The only published currency figure remains USD 185 on the existing Spanish FAQ.

Commands: node build-site.mjs, node verify.mjs and node --check content.mjs pass. This is generated local output only; no deployment, commit or production changes were performed. The guide URL remains the owner-requested placeholder.


## P5 finishing pass
The Spanish home now groups its eleven tickets into Estados Unidos, Otros destinos and Paraguay, retaining the existing responsive grid columns. The Spanish contact select has ten choices.
English contact and thank-you routes reuse the existing form handler and client error display with English labels, messages and five options. The hidden lang=en selects the existing English redirects. The thank-you route is excluded from the sitemap. English navigation and CTA bands link to /en/contact/.
The build imports sharp through a file URL resolved from C:/Claude 1/webimg/node_modules/sharp. It creates the Spanish and English OG JPEGs at 1200x630, quality 82, only when missing or older than their source. An unavailable import warns and skips generation; verification still requires the output assets. Every page has localized OG image metadata and a large Twitter card.
ANALYTICS_ID in content.mjs defaults to an empty string, rendering no analytics snippet. Set it to the GA4 measurement ID and rebuild to include the standard asynchronous gtag loader and configuration in every page head.
Only the Spanish home preloads its AVIF hero, using the picture source set and sizes. Verification retains the existing checks and adds OG files/metadata, preload matching and English contact checks. These are local build changes; no deployment or live form delivery is performed.

## P7 conversion pass - 2026-09-14

WA_MENU defines seven Spanish intent options and a context-aware text function for each. Messages end with six underscores. Each Spanish page renders one initially closed native dialog; all shared WhatsApp triggers target it with aria-controls and aria-expanded. Options open wa.me in a new tab with noopener. The first intent is the default unless the page record sets waDefault; matching service pages have overrides. English direct links and their prefills are unchanged.

The dialog uses ticket colors, a perforated divider, highlighted default and plain Otra consulta. CSS appended under P7 supplies a desktop panel and mobile bottom sheet with bounded viewport height and internal scrolling. Native modal behavior supplies Escape and focus containment; script restores trigger focus, closes on outside/option/close-button clicks and handles triggers inside mobile navigation. Reduced motion disables the sheet animation. The tokens block is unchanged.

/lp/visa-americana/ is a landing record with noindex, nofollow and sitemap: false. Its header contains only the wordmark and WhatsApp action. The hero has three existing preparation chips; the unchanged Spanish contact form follows directly, retaining the tipo_visa select and hidden page_url. Then come the route stepper, review checklist, four FAQs, aviso and minimal disclaimer/privacy footer. The existing handler and /gracias.html success redirect are untouched.

Local commands: node build-site.mjs, node verify.mjs and node --check assets/js/site.js all exit zero. The verifier inspects 40 HTML routes and 36 sitemap entries, including seven intent links per Spanish page, default ordering, English menu exclusion, landing form parity and indexing rules. All prior checks remain for existing routes; only the new landing route is exempted from full navigation and public sitemap requirements. Forbidden wording checks pass; USD 185 remains the only published currency amount. sitemap.xml is regenerated with identical contents; robots.txt and image assets have no content changes.

Browser QA is NOT complete: two browser attempts failed with "Unable to load browser request-header policy." Consequently live clicking, Escape/focus restoration and the 375px visual/overflow checks remain unverified. No production submission, deployment, commit or PR was performed. No credentials were accessed or changed.

## P8 design upgrade - 2026-09-14

The home uses its existing eager/high-priority photo as a full-bleed ink-overlay band with 100vw responsive preload sizes, paper typography and stamp, and a bottom-right boarding pass that stacks below the photo on mobile. Service and hub photos use full-width bands and overlapping title cards; guides retain their two-column introduction with stamps and illustrative captions. Existing copy and content records are preserved, apart from the requested new route-map heading, mobile action labels and guide captions.

Home and hub tickets derive thumbnails from the target route's existing hero assignment; missing assignments remain icon-only. The home route-map SVG has five destination labels, dotted arcs and a plane, using the existing reveal observer for a two-second animation. Reduced motion disables it. The problem section uses ink and red numerals, FAQ retains paper-2, footers add decorative destination stamps, and the mobile bar has WhatsApp plus a localized contact-form link. P8 CSS is appended without modifying tokens, fonts or image assets.

Verification retains prior categories and adds map labels, explicit full-band preload matching, target-photo thumbnail validation and adjacent ink-section checks. The Spain-image restriction still applies outside validated ticket thumbnails. Initial verification failed with "Spain image outside Spain page" on home and the guide hub; the requested thumbnail exception resolved both failures.

Local validation: node build-site.mjs, node verify.mjs and node --check assets/js/site.js pass (40 HTML routes, 36 sitemap entries). Browser checks at a 375px viewport found no horizontal document overflow on all 40 routes; the home screenshot confirms readable hero text and the overlay. Desktop home was visually inspected at 1440px with an 820px hero in a 1000px-high viewport. External CSS/JS observed were Google Fonts and the CRM attribution script only. Forbidden-copy and currency checks pass; USD 185 remains the sole published currency amount. An initial browser attempt failed with "Unable to load browser request-header policy"; retry succeeded. No production writes, deployment, commits, PR or credential access.

## Current build workflow (Fable follow-up)

Read START-HERE.md and FABLE-FOLLOWUP.md for current behavior; older phase notes are historical. Human-edited sources: content.mjs, editorial.mjs, content-information.mjs and build-site.mjs. Do not edit generated HTML. The information-stage records override earlier service-delivery copy until verified operator/partner facts exist.

Node 22+, npm ci (with development dependencies), PHP 8.1+, Python 3 and git are required on the build PC. npm run package builds, checks, tests, archives, verifies extraction and smoke-tests the extracted HTTP pages. Hostinger requires PHP, not Node or Sharp.

Preserve both worktrees and uncommitted changes. Two-PC synchronization awaits an authorized commit/push. Compare source commits and release-manifest file hashes, not modification dates.
