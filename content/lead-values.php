<?php
/**
 * The lead value model. ONE record per source — every service slug, every tool
 * slug, every "¿qué necesita?" chip — plus the neutral default for pages that
 * are none of those.
 *
 * Nothing else on the site decides a tier, a conversion value or a WhatsApp
 * prefill: pages read this through lib/helpers.php's lead_value() and
 * whatsapp_text_for_page(), so retuning the model after a few weeks of GA4 data
 * is one edit here and no page changes.
 *
 * Record shape (every key required unless noted):
 *
 *   menuLabel     string   the short human name this source goes by in the
 *                          WhatsApp menu and in the CRM's `servicio` field. Page
 *                          titles are often frozen for SEO and too terse to read
 *                          as a menu option, which is why this exists
 *   need          string   key into ui('needs') — the chip this source maps to,
 *                          or a key in 'needLabels' below for sources with no
 *                          chip of their own
 *   tier          string   'A' | 'B' | 'C' — how much this source is worth
 *   whatsappText  string   the wa.me prefill. Names the service the visitor was
 *                          reading about — never a generic "consulta gratis"
 *   nextStep      string[] 2–3 lines shown after submit: what to have ready.
 *                          This is the second touch; it is worth reading
 *   crmTag        string   lands on the VenderCRM timeline as fields.etiqueta —
 *                          see the note on tags in enviar.php
 *   nextLink      ?array   optional ['path' => ..., 'label' => ...] tool or guide
 *                          offered alongside the thank-you text. The path must
 *                          resolve to a real route file; verify.sh checks it
 *
 * Adding a source: add a record keyed by its slug. Pages resolve by slug, so a
 * new guide or segment page joins the model by adding a key here.
 */

declare(strict_types=1);

/* The Google Ads conversion value per tier, in whole units of the market's
   currency (content/site.php 'market'). These are OPTIMISATION PROXIES, not
   revenue estimates: they exist so smart bidding favours a retainer lead over a
   calculator lead by roughly 10:1. Retune the ratio here, and re-scale the
   numbers when the site's market — and therefore its currency — changes. */
$tierValues = [
    'A' => 450000,
    'B' => 190000,
    'C' => 40000,
];

$needLabels = [
    'recordatorio' => 'Recordatorio',
];

$next = [
    'Le respondemos dentro del siguiente día hábil.',
    'Tenga a mano su pasaporte y los datos de sus viajes anteriores.',
];

return [

    'tierValues' => $tierValues,
    'needLabels' => $needLabels,

    'whatsappMenu' => ['visa-americana', 'revision-ds160', 'preparacion-entrevista', 'visa-canada'],

    'default' => [
        'menuLabel'    => 'Consulta general',
        'need'         => 'otro',
        'tier'         => 'C',
        'whatsappText' => 'Hola, quisiera consultar por un trámite de visa.',
        'nextStep'     => [
            'Le respondemos dentro del siguiente día hábil.',
            'Cuéntenos a qué país viaja y cuántas personas son.',
        ],
        'crmTag'       => 'consulta-general',
        'nextLink'     => null,
    ],

    'services' => [
        'visa-americana' => [
            'menuLabel'    => 'Visa americana B1/B2',
            'need'         => 'eeuu',
            'tier'         => 'A',
            'whatsappText' => 'Hola, quisiera asesoría para la visa americana B1/B2.',
            'nextStep'     => $next,
            'crmTag'       => 'visa-americana',
            'nextLink'     => ['path' => '/herramientas/costo-visa-eeuu/', 'label' => 'Calcule el costo total en guaraníes'],
        ],
        'revision-ds160' => [
            'menuLabel'    => 'Revisión del DS-160',
            'need'         => 'eeuu',
            'tier'         => 'B',
            'whatsappText' => 'Hola, quisiera que me revisen el formulario DS-160 antes de enviarlo.',
            'nextStep'     => [
                'Le respondemos dentro del siguiente día hábil.',
                'Prepare el borrador del DS-160 en PDF, sin contraseña ni código de seguridad.',
            ],
            'crmTag'       => 'revision-ds160',
            'nextLink'     => ['path' => '/guias/ds160-paso-a-paso/', 'label' => 'Lea la guía del DS-160'],
        ],
        'preparacion-entrevista' => [
            'menuLabel'    => 'Preparar la entrevista',
            'need'         => 'entrevista',
            'tier'         => 'B',
            'whatsappText' => 'Hola, quisiera practicar la entrevista de la visa americana.',
            'nextStep'     => [
                'Le respondemos dentro del siguiente día hábil.',
                'Tenga a mano su DS-160 y la fecha de su turno, si ya la tiene.',
            ],
            'crmTag'       => 'entrevista-visa',
            'nextLink'     => ['path' => '/guias/entrevista-visa-americana/', 'label' => 'Lea la guía de la entrevista'],
        ],
        'visa-canada' => [
            'menuLabel'    => 'Visa de Canadá',
            'need'         => 'canada',
            'tier'         => 'A',
            'whatsappText' => 'Hola, quisiera asesoría para la visa de visitante a Canadá.',
            'nextStep'     => [
                'Le respondemos dentro del siguiente día hábil.',
                'Tenga a mano su pasaporte y los comprobantes de empleo e ingresos.',
            ],
            'crmTag'       => 'visa-canada',
            'nextLink'     => ['path' => '/guias/visa-canada-paraguayos/', 'label' => 'Lea la guía de la visa de Canadá'],
        ],
        'foto-visa' => [
            'menuLabel'    => 'Foto para visa',
            'need'         => 'otro',
            'tier'         => 'C',
            'whatsappText' => 'Hola, quisiera sacarme la foto para la visa.',
            'nextStep'     => [
                'Le respondemos dentro del siguiente día hábil.',
                'Venga con ropa de uso diario y sin accesorios que tapen el rostro.',
            ],
            'crmTag'       => 'foto-visa',
            'nextLink'     => null,
        ],
        'traduccion-documentos' => [
            'menuLabel'    => 'Traducciones',
            'need'         => 'otro',
            'tier'         => 'C',
            'whatsappText' => 'Hola, necesito traducir documentos para una solicitud de visa.',
            'nextStep'     => [
                'Le respondemos dentro del siguiente día hábil.',
                'Envíenos una copia clara de cada documento a traducir.',
            ],
            'crmTag'       => 'traduccion-documentos',
            'nextLink'     => null,
        ],
    ],

    'tools' => [
        'costo-visa-eeuu' => [
            'menuLabel'    => 'Costo total de la visa americana',
            'need'         => 'eeuu',
            'tier'         => 'C',
            'whatsappText' => 'Hola, calculé el costo de la visa americana y quisiera confirmar el total.',
            'nextStep'     => [
                'Le respondemos dentro del siguiente día hábil.',
                'Guarde el cálculo: le confirmamos las tasas vigentes con usted.',
            ],
            'crmTag'       => 'herramienta-costo-visa',
            'nextLink'     => null,
        ],
    ],

    'needs' => [
        'eeuu'       => ['tier' => 'A', 'crmTag' => 'visa-eeuu',        'service' => 'visa-americana'],
        'canada'     => ['tier' => 'A', 'crmTag' => 'visa-canada',      'service' => 'visa-canada'],
        'entrevista' => ['tier' => 'B', 'crmTag' => 'entrevista-visa',  'service' => 'preparacion-entrevista'],
        'otro'       => ['tier' => 'C', 'crmTag' => 'consulta-general', 'service' => null],
    ],
];
