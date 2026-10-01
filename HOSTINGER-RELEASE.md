# Hostinger release — 19 September 2026

## Delivered / not live

The public_html archive is built and verified locally. Uploading/extracting it changes production immediately. No upload or production test has been performed. Back up current public_html plus any private configuration before replacing public files. Retain .well-known, verification files and unrelated hosting files.

1. Extract dist/visas-com-py-hostinger-2026-09-20.zip directly into the domain's public_html. Root must contain index.html, lead-forward.php, .htaccess and assets/.
2. Set PHP 8.1+ (8.3/8.4 suitable), sessions enabled, HTTPS outbound streams/allow_url_fopen enabled with a working CA certificate store. No curl extension required. File permissions must allow PHP to write outside the document root. Do not disable TLS verification.
3. Create `visas-private/config.php` alongside public_html, NOT inside it, using deploy/config.example.php as the template. Put the existing site-specific VenderCRM key in `api_key` and the matching CRM origin in `crm_url`. Do not rotate a working key. No key is in this release. Environment alternatives: VENDERCRM_API_KEY, VENDERCRM_URL, VISAS_STORAGE_DIR, VISAS_CONFIG_FILE. Do not enable VISAS_TEST_MODE on hosting.
4. Default private queue path is ../visas-private/data. Restrict the private directory to the hosting account. It contains contact information while delivery is pending. A missing CRM key gives an honest pending-delivery response, never a false CRM success. If private storage is not writable, the form returns an error and retains entered text.
5. Inspect `php /absolute/path/public_html/scripts/queue.php --send --prune --dry-run`. It reports counts only. With explicit approval, use the same command without --dry-run to retry pending enquiries and prune expired records. Schedule it every five minutes after approval. The worker backs off retries up to one hour; pending records expire at 30 days, delivered receipts at one day. Retention requires that scheduled job. Ensure the hosting schedule reports failure to a real operator.
6. Monitoring: `php /absolute/path/public_html/scripts/queue.php --dry-run --check` exits 2 if enquiries remain pending, 1 on delivery failure (when sending), otherwise 0. Monitor pending counts and redacted PHP errors; investigate unconfigured/401/422/network conditions. Never publish the private queue or full upstream response bodies. Hosting backup retention is separate and must be agreed by the operator.
7. Clear host/CDN HTML cache after extraction. Public assets have hash-versioned URLs. Verify HTTPS/apex/index redirects, a real missing-page 404, security headers and blocked /lib/leads.php and /scripts/queue.php on Hostinger. PHP's local preview does not execute Apache/LiteSpeed .htaccess rules.
8. When authorized, submit one identified production test and verify the actual CRM contact/submission/deal plus notification and responsible recipient. HTTP 200 alone is insufficient. This release's tests send only to a local mock.

## Business / tracking gates still open

- Confirm legal/public operator, adviser identity and real service scope. The site now distinguishes information from contracting, but no operator, professional credentials, price, response time or real team photo has been invented. Existing advisory service claims need the operator's approval before publishing.
- Confirm who answers +595 995 628862 and how enquiries are handled. No WhatsApp message was sent.
- Approve Spanish/English privacy text against actual controller, processors, CRM/WhatsApp retention, international transfers and backup policy. The private queue policy does not define CRM retention.
- To enable GA4, supply the real measurement ID in ANALYTICS_ID in content.mjs and rebuild. Optional measurement loads only after consent. Events: whatsapp_menu_open, whatsapp_click, generate_lead (only accepted nonduplicate CRM response), lead_pending. Disable form-interaction collection in the GA4 property's enhanced measurement; never send form values. Qualified leads and customers need CRM reporting, not a thank-you-page event.
- Connect/share Git source only through an authorized commit/push/PR workflow. The existing GitHub repo was empty; this task made no commit or PR. The other PC has not been inspected.
- Run actual hosting Lighthouse/CrUX/Search Console checks and inspect bot-challenge/crawl behavior. No field performance score, search ranking or production CRM delivery is claimed here.

## Rollback

Restore the public_html backup and previous private configuration if required; preserve pending private records for operator review. Do not delete enquiry data or overwrite .well-known as part of a routine rollback.


## Fable follow-up release

The current public build is WhatsApp-first. Contact pages and the landing page do not advertise or render the CRM form. The tested PHP handler and private form templates remain available for later integration. Before re-enabling the public form, configure and verify CRM receipt, private storage and queue monitoring; then build with VISAS_CONTACT_FORM=1. This is a build setting, not a hosting environment switch for already-generated HTML. Default builds keep it off.

Current information-only copy is applied in content-information.mjs through the existing editorial pass. Changes to legacy service copy in content.mjs may be superseded there. See FABLE-FOLLOWUP.md for the scope and remaining work.

ZIP filenames use the UTC build date (or explicit RELEASE_DATE). The release manifest records actual git status. npm run package now runs the extracted-package HTTP smoke test automatically. Local fonts and their OFL license files are included.
