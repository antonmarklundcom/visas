<?php
/**
 * Business facts. Everything the site says about itself comes from here — the
 * title suffix, the wordmark, the footer NAP, the JSON-LD, the WhatsApp links,
 * the deploy zip's name. Nothing in lib/, partials/ or templates/ hardcodes a
 * business name, a domain or a country.
 *
 * RULE: no fabricated facts. A value nobody has confirmed stays null, and the
 * partial that would show it hides instead or falls back to neutral phrasing.
 * Never a placeholder number, never an invented address.
 *
 * THIS FILE IS EXAMPLE DATA. Step 2 of "Start a new site (T0)" in README.md
 * replaces every value below with the real business.
 */

declare(strict_types=1);

return [
    // --- identity -----------------------------------------------------------
    'name'   => 'visas.com.py',
    // Bare hostname, no scheme: the wordmark and robots.txt print it.
    'domain' => 'visas.com.py',
    // Lower-case, filename-safe: names the deploy zip (dist/<slug>-DATE.zip).
    'slug'   => 'visas',

    // Which lib/market/<market>.php + assets/js/market/<market>.js pair loads:
    // money formatting, tax-id validation, long dates, VAT rates and the legal
    // reference tables. 'py' (Paraguay) or 'se' (Sweden) ship with the template.
    'market' => 'py',

    // schema.org types for the organisation block, most specific first. See
    // https://schema.org/LocalBusiness for the list ('LegalService',
    // 'Plumber', 'Dentist', 'AccountingService', …).
    'schemaType' => ['ProfessionalService'],

    // Path of the services hub. '/servicios/' by default; a store can use
    // '/productos/'. Move the servicios/ route directory and its
    // content/pages.php key to match.
    'servicesHub' => '/servicios/',

    'legalName'   => null,                       // registered legal name
    'description' => 'Servicio privado e independiente de asesoría para trámites de visa desde '
                   . 'Paraguay: visa americana B1/B2, DS-160, visa de Canadá y entrevista.',

    // --- contact ------------------------------------------------------------
    // 'phone' and 'whatsapp' in international form, e.g. '+595 981 123 456'.
    // While both are null the header pill, the floating button and every
    // service CTA point at /contacto/ instead of wa.me — see
    // partials/whatsapp-fab.php.
    'phone'    => null,
    'whatsapp' => null,
    'email'    => null,

    // --- address ------------------------------------------------------------
    'street'  => null,
    'city'    => null,
    'country' => null,                           // defaults to the market's country
    'hours'   => null,                           // display string, e.g. 'Lun–Vie 8:00–17:30'

    // schema.org openingHoursSpecification entries, added when hours are confirmed
    'openingHours' => [],

    // --- credentials and scale ----------------------------------------------
    'registration' => null,                      // licence / registration number
    'foundedYear'  => null,                      // int
    'teamSize'     => null,                      // int

    // --- imagery ------------------------------------------------------------
    // While these are null the homepage "about" slots render as neutral
    // decorative panels — never a broken image, never a captioned identity claim.
    'photos' => [
        'portrait' => null,                      // ['src' => '/assets/img/...', 'alt' => '...']
        'team'     => null,
    ],

    // --- collections: every one of these renders only when non-empty ---------
    'socials'      => [],                        // ['https://www.facebook.com/...', ...]
    'stats'        => [],                        // [['value' => '100 %', 'label' => '...'], ...]
    'testimonials' => [],                        // [['quote','name','business','city','since'], ...]
    'team'         => [],                        // [['name','role','credentials','photo'], ...]
    'credentials'  => [],                        // ['Profesionales matriculados', ...]
];
