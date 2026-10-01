# visas.com.py: Business case (Phase 1)

*30 Sep 2026 · draft for Anton · nothing built, deployed or pushed*

## 0. What this draft does and does not cover

| Task | Status |
|---|---|
| 1. Crawl the live site and sitemap | **Blocked.** This cloud session's network policy denies `visas.com.py` and `web.archive.org`. Its web search returns no pages from `visas.com.py` (that search is not Google, so this is only a weak signal). |
| 2. Recover the source | Recommendation below. I can't confirm the stack until I can crawl the site. |
| 3. Keyword demand | **Blocked.** No keyword-library connector is attached to this session. I have **not** estimated volumes. |
| 4. Model, competitors, pricing | Done from web search results (sources at the end). |
| 5. Scores | Provisional only, based on your description. See §5. |

## 1. Business model: an independent guide, not a gestor that "gets the visa"

**Position:** *"Te acompañamos a hacer tu trámite tú mismo, sin errores."* The applicant keeps their own accounts, signs their own DS-160 and pays government fees directly to the government. We sell time, review and preparation, never the visa, an appointment or a result.

**What we can sell legally:**
- DS-160 help: fill it in together on a call, or review a draft. We are listed truthfully as *preparer*.
- Guidance on paying the consular fee and booking the appointment **in the applicant's own account**.
- A document checklist and case review. Anything like inadmissibility, past denials involving overstays or criminal records goes to a partner lawyer.
- Interview coaching (the "coach"): mock interviews, answer framing, no scripts to lie with.
- Photos in the digital 600×600 spec, through a partner studio or in-house.
- Translations: B1/B2 rarely needs them, but **Canada TRV does** (English/French). Refer to a sworn translator (*traductor matriculado*) for a commission.
- Canada TRV application help: IRCC online form plus VAC biometrics booking. The VAC in Asunción is operated by IOM/VFS and moved offices in Sept 2026.

**What we must never sell:** "citas adelantadas", bots or appointment slots (the US Embassy cancels appointments *and visas* over this); approval guarantees; ESTA (Paraguayans are not in the Visa Waiver Program); fee "processing" that marks up government fees; anything using US seals, eagles, flags as branding, or the word "oficial".

**Scope by product line:**

| Line | Paid? | Why |
|---|---|---|
| USA B1/B2 (first time, renewal, family) | **Core** | Largest demand, highest pain (DS-160 is in English and unforgiving) |
| Canada visitor visa (TRV) | **Yes** | Paraguayans need a visa, not an eTA; forms are English-only and document-heavy |
| Schengen / ETIAS | Content only | Visa-free for 90 days; ETIAS is not live yet (expected Q4 2026) and is cheap. Selling help here looks like the known ETIAS scam sites. |
| ESTA | Content only ("no aplica a paraguayos") | Captures confused searches and redirects them to B1/B2 |
| Brasil / Argentina | Content, plus insurance affiliate and notary referral | Cédula is enough. The money is in travel insurance (mandatory for Argentina) and minors' notarial permits. |

## 2. Competitors (5 real, prices as published)

| Competitor | Market | Offer | Price | ≈ Gs.* |
|---|---|---|---|---|
| **ListoUSA** (listousa.app) | Targets Paraguay | Free DS-160 guide; AI tutor; tutor + interview prep | $0 / $39 / $69 (intro prices) | 0 / 230k / 405k |
| **Visa-Ya** | LatAm | Case review + DS-160 | from $39 per person | 230k |
| **Babel Travel** | LatAm | DS-160 + booking + interview prep | $75 | 440k |
| **VisasUSA.org** (ex-consul Brent Hanson) | Central America | Express 15 min / standard 30 min / full service | $45–85 / $85–150 / $195–250 | 265k–1.47M |
| **USAvisa Travel** | Argentina, sells into Paraguay | "Servicio Completo" for up to 5 people | $399 (self-serve plan ARS 62,990) | 2.35M |

\*At about 5,850–5,900 Gs./USD (late Sept 2026; recheck before publishing prices). Reference point: TuVisaAmericana (Colombia) charges COP 250k (≈ $60) and **collects nothing until the appointment is confirmed**, which is a trust tactic worth copying.

**What we can win on:** ListoUSA owns "cheap and self-serve". Nobody local owns "a real Paraguayan person on WhatsApp, prices in guaraníes, pay in Gs. by bank transfer, office in Asunción".

## 3. Pricing in Gs. (proposal)

| Plan | Includes | Price |
|---|---|---|
| **Guía gratis** | Checklist PDF + DS-160 walkthrough (lead magnet, collects WhatsApp) | 0 |
| **Revisión DS-160** | You fill it in, we review before you submit, 1 round of fixes | Gs. 190.000 |
| **Acompañamiento B1/B2** ★ | Fill in the DS-160 together, fee and booking guidance, checklist, 1 mock interview | **Gs. 450.000** per person · each extra family member Gs. 350.000 |
| **Premium B1/B2** | Acompañamiento + 2 mock interviews + photo + follow-up after the interview | Gs. 690.000 |
| **Coach only** | 45-minute mock interview (also for renewals or past denials) | Gs. 250.000 |
| **Canadá TRV** | IRCC application, document plan, biometrics booking, translation referral | Gs. 1.200.000 |
| Photo 600×600 | Digital + printed | Gs. 40.000 |

Government fees are **not included** and are always shown separately: US MRV $185, plus the $250 Visa Integrity Fee once the State Department starts charging it at issuance (not collected as of March 2026; timing still unconfirmed). Canada's fees are also listed separately.

**Payment:** 50% upfront, 50% when the DS-160 or application is ready to submit. Full refund if we haven't started work. Never tied to visa approval.

**Rough target:** 40 Acompañamiento-equivalents a month ≈ Gs. 18M revenue. This is not validated until we have demand data.

## 4. Risks: disclaimer and trust

1. **Looking official.** This is the highest risk: the domain "visas.com.py" plus a title like "requisitos y DS-160" reads as a government page. Fix: a disclaimer above the fold on every page, in the footer and before WhatsApp opens:
   > *"visas.com.py es un servicio privado e independiente de asesoría. No somos la Embajada de EE. UU., el Gobierno de EE. UU. ni ningún gobierno. Los formularios y aranceles oficiales son gratuitos o se pagan directamente al gobierno en travel.state.gov / ais.usvisa-info.com. No garantizamos la aprobación de ninguna visa."*
2. **Paraguayan law.** Consumer protection (Ley 1334/98) and e-commerce (Ley 4868/13) require the provider's identity on the site: razón social, RUC, address, prices and cancellation terms. Personal data (passports, travel history) needs a privacy policy and storage limits. **Have a lawyer check this before launch.**
3. **Unauthorized practice of law.** Coaching is not legal advice. Anything involving inadmissibility goes to a partner lawyer.
4. **Embassy crackdown on intermediaries.** Stay strictly on the applicant-controlled model: no shared accounts, no bots, no appointment buying.
5. **Ads.** Google Ads restricts third-party government-document services. Expect a verification step and required disclaimers, and budget time for it.
6. **Trust signals to add:** real names and photos of the team, an office address or WhatsApp Business verified badge, Google Business Profile reviews, a "cómo trabajamos" page, and a sample (redacted) checklist.

## 5. Scores

I could not load the site, so these are **provisional, based only on your description**. I'll replace them after a crawl.

| | Yours | Provisional | Reason |
|---|---|---|---|
| SEO | 9 | ~7 | The schema and hreflang foundation is good, but: FAQ rich results are now shown only for government and health sites; 37 URLs is thin for 6 product lines; indexing is unverified; hreflang on a Spanish-only PY site needs checking |
| Design | 6 | 6 | No new information |
| Copy | 8 | ~7 | The title reads informational or official; there's no evidence of an offer, prices or disclaimer |
| Conversion | 7 | ~5.5 | 13 WhatsApp links across 37 pages means most pages have no CTA; no prices, plans or lead magnet visible |
| Technical | 7.5 | 7.5 | Unknown until crawled (Core Web Vitals, canonicals, 404s) |

**Path to 9/10:** (a) recover the source and move it to php-site-template; (b) disclaimer, legal identity and trust block on every page; (c) a /precios page with the plans above and a WhatsApp CTA on 100% of pages, pre-filled per page; (d) about 25 new pages in clusters: DS-160 field-by-field, interview questions, renewals, family, Canada TRV, ETIAS, Brasil/Argentina, minors; (e) a free checklist lead magnet; (f) a GBP profile and reviews; (g) a design refresh using the template design system; (h) a CWV/technical pass with `verify.sh`.

## 6. Source recovery: recommendation

**Safest option: copy it from Hostinger first, rebuild second.** Download `public_html` read-only (File Manager zip, SFTP or SSH `tar`), plus any Hostinger backup, and commit it untouched as a `legacy-snapshot` branch. That keeps the PHP includes, `.htaccess` redirects and form handlers that a live-HTML scrape would lose. Then port it into php-site-template on a new branch, keeping every URL (redirect map for all 37) and all schema. Only if Hostinger has nothing do we rebuild from a `wget --mirror` of the live HTML. That works if the site is static, but loses server logic if it's PHP.

## 7. Decisions for you

1. **Unblock me.** Add `visas.com.py` to this environment's allowed domains (or choose broader network access), **and** attach the keyword-library connector. Otherwise I can run Phase 1 from your PC.
2. **Hostinger:** give file access (SFTP/SSH details, or drop a `public_html` zip in Google Drive) so I can take the snapshot.
3. **Model:** approve the "applicant-controlled acompañamiento" model (recommended) rather than full-service gestoría.
4. **Scope:** paid services for USA + Canada only, and Schengen/ESTA/Mercosur as content? (recommended)
5. **Prices:** approve Gs. 190k / 450k / 690k / 250k / 1.2M, or adjust them.
6. **Legal identity:** which razón social and RUC go on the site? Who is the coach, and who is the partner lawyer or translator?
7. **This file:** you said not to push. The container is temporary, so either copy this file now or allow one commit and push of `BUSINESS.md` only.

---
Sources: [US Embassy PY – visas](https://py.usembassy.gov/visas-para-no-inmigrantes/) · [Visa Integrity Fee status](https://migratemate.co/blog/b1-b2-visa-fees) · [ListoUSA](https://listousa.app/servicios) · [Visa-Ya](https://tu.visa-ya.com/sales-order-page1625417701019) · [Babel Travel](https://www.babeltravel.com/producto/servicio-de-asesoria-visa-americana/) · [VisasUSA.org](https://visasusa.org/tienda) · [USAvisa Travel](https://usavisa.travel/precios) · [TuVisaAmericana CO](https://tuvisaamericana.com.co/precios/) · [VFS Canada PY](https://visa.vfsglobal.com/pry/es/can/) · [Embassy warning on bots](https://www.diariolibre.com/usa/actualidad/2026/08/31/embajada-de-ee-uu-en-rd-alerta-uso-bots-para-manipular-cita/3644560) · [ETIAS PY](https://www.etiasvisa.com/es/requisitos-etias/paraguay) · [Argentina entry](https://www.assistcard.com/py/requisitos-para-viajar-a-argentina) · [Brasil entry](https://www.protegetuviaje.com/requisitos-para-viajar-a/brasil-desde-paraguay/) · [USD/PYG](https://es.investing.com/currencies/usd-pyg)
