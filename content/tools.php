<?php
/**
 * The tool pages under /herramientas/, keyed by slug. Shape contract: see the
 * template README ("Content model"). Every tool slug also needs a record in
 * content/lead-values.php.
 */

declare(strict_types=1);

return [

    'costo-visa-eeuu' => [
        'path'            => '/herramientas/costo-visa-eeuu/',
        'title'           => 'Calculadora del costo de la visa americana',
        'navLabel'        => 'Costo de la visa americana',
        'seoTitle'        => 'Costo de la visa americana en guaraníes',
        'metaDescription' => 'Calcule en guaraníes cuánto cuesta la visa americana B1/B2 para una o varias personas: tasa consular, tasa adicional si corresponde y nuestro servicio.',
        'hero' => [
            'eyebrow' => 'Herramientas',
            'h1'      => 'Cuánto cuesta la visa americana, en guaraníes',
            'lead'    => 'Sume la tasa consular, la tasa de integridad de visa si ya se cobra, y el servicio de asesoría que elija.',
        ],
        'intro' => [
            'La visa de turista o negocios B1/B2 tiene una tasa consular oficial que se paga por persona, aunque la visa sea negada. Esa tasa se paga directamente a la embajada y no forma parte de nuestro servicio.',
            'Una ley de 2025 creó además una tasa de integridad de visa de 250 dólares por persona. Hasta donde sabemos, su cobro depende de que el Departamento de Estado lo ponga en marcha, y se cobraría al emitirse la visa. Por eso la calculadora la deja como opción: actívela solo si ya figura como obligatoria en el sitio oficial.',
            'Los montos vienen precargados pero puede cambiarlos: el tipo de cambio varía todos los días y las tasas oficiales pueden ajustarse. Confirme siempre el valor vigente en el sitio oficial antes de pagar.',
        ],
        'faq' => [
            ['q' => '¿Se devuelve la tasa si me niegan la visa?', 'a' => 'No. La tasa consular no es reembolsable ni transferible, se apruebe o no la visa.'],
            ['q' => '¿En qué moneda se paga la tasa?', 'a' => 'Puede pagarse en dólares o en guaraníes según los medios habilitados. Verifíquelo en el sitio de la embajada.'],
            ['q' => '¿Nuestro servicio está incluido en la tasa?', 'a' => 'No. La tasa se paga al gobierno; nuestro servicio de asesoría es aparte y opcional.'],
        ],
        'related'       => ['visa-americana', 'revision-ds160'],
        'ctaWhatsapp'   => '',
        'formNeed'      => 'eeuu',
        'analyticsTool' => 'costo_visa_eeuu',
    ],
];
