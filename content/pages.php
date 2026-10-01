<?php
/**
 * The static (non-service) pages, keyed by path. Services live in
 * content/services.php, tools in content/tools.php, guides in content/guias.php,
 * segment pages in content/segmentos.php; this is everything else with a URL.
 *
 *   title        string  <title> without the ' | <site name>' suffix
 *   description  string  120–155 chars, unique across the whole site
 *   h1           string  visible heading
 *   lead         string  one-line intro under the H1
 *   sections     array   optional prose blocks for templates/page.php:
 *                        [['h2' => ..., 'body' => [paragraph, ...]], ...]
 *   stub         bool    true while the page is still a placeholder: it renders
 *                        through templates/page-stub.php, is marked noindex and
 *                        stays out of sitemap.php. The phase that writes the
 *                        page sets this to false.
 *   noindex      bool    the page exists but is not a URL of its own (/404).
 *                        Excluded from sitemap.php and from the route contract.
 *   changefreq   string  sitemap hint
 *   priority     string  sitemap hint
 *
 * Every entry here needs a route file (<path>/index.php) except '/404', which
 * is served by 404.php.
 */

declare(strict_types=1);

return [
    '/' => [
        'title'       => 'Visa americana desde Paraguay y DS-160',
        'description' => 'Asesoría privada para su visa americana B1/B2 desde Paraguay: DS-160, pago, '
                       . 'turno y entrevista. Usted usa sus cuentas; no somos la embajada.',
        'h1'          => '',
        'lead'        => '',
        'stub'        => false,
        'changefreq'  => 'weekly',
        'priority'    => '1.0',
    ],

    '/servicios/' => [
        'title'       => 'Servicios',
        'description' => 'Servicios de asesoría para su visa a Estados Unidos y Canadá: DS-160, entrevista, '
                       . 'foto y traducciones. Las tasas oficiales se pagan a la embajada.',
        'h1'          => '',
        'lead'        => '',
        'stub'        => false,
        'changefreq'  => 'monthly',
        'priority'    => '0.9',
    ],

    '/precios/' => [
        'title'       => 'Precios y planes',
        'description' => 'Precios en guaraníes de nuestra asesoría para la visa americana y de Canadá, '
                       . 'por persona. Las tasas oficiales no están incluidas.',
        'h1'          => 'Precios en guaraníes',
        'lead'        => 'Precio de nuestro servicio de asesoría, por persona. Las tasas oficiales se pagan aparte, a la embajada.',
        'stub'        => false,
        'changefreq'  => 'monthly',
        'priority'    => '0.7',
    ],

    '/herramientas/' => [
        'title'       => 'Herramientas',
        'description' => 'Calculadora gratuita para estimar en guaraníes el costo de la visa americana: '
                       . 'tasa consular, tasa de integridad y asesoría.',
        'h1'          => 'Herramientas',
        'lead'        => 'Calcule en guaraníes cuánto va a costar su trámite.',
        'stub'        => false,
        'changefreq'  => 'monthly',
        'priority'    => '0.7',
    ],

    '/guias/' => [
        'title'       => 'Guías',
        'description' => 'Guías en español para tramitar usted mismo la visa americana, la visa de Canadá '
                       . 'y entender qué piden Europa, Brasil y Argentina.',
        'h1'          => 'Guías',
        'lead'        => 'Cómo hacer cada trámite, paso a paso. Guías independientes, no oficiales.',
        'stub'        => false,
        'changefreq'  => 'monthly',
        'priority'    => '0.7',
    ],

    '/blog/' => [
        'title'       => 'Blog',
        'description' => 'Artículos sobre visas desde Paraguay: tasas, entrevista, estafas frecuentes y '
                       . 'qué hacer si le niegan la visa americana.',
        'h1'          => 'Blog',
        'lead'        => 'Respuestas claras sobre visas, tasas y entrevistas.',
        'stub'        => false,
        'changefreq'  => 'weekly',
        'priority'    => '0.6',
    ],

    '/contacto/' => [
        'title'       => 'Contacto',
        'description' => 'Escríbanos por WhatsApp o déjenos sus datos: le respondemos dentro del '
                       . 'siguiente día hábil con el alcance y el precio de la asesoría.',
        'h1'          => '',
        'lead'        => '',
        'stub'        => false,
        'changefreq'  => 'yearly',
        'priority'    => '0.8',
    ],

    '/privacidad/' => [
        'title'       => 'Política de privacidad',
        'description' => 'Cómo tratamos los datos personales que nos deja en el formulario y cómo '
                       . 'puede pedir su acceso, corrección o eliminación.',
        'h1'          => 'Política de privacidad',
        'lead'        => 'Cómo tratamos los datos personales que nos confía.',
        'sections'    => [
            [
                'h2'   => 'Qué datos recogemos',
                'body' => [
                    'Recogemos únicamente los datos que usted escribe en el formulario de contacto —nombre, '
                        . 'ciudad, teléfono, correo y el mensaje— más los parámetros de campaña que trae el '
                        . 'enlace por el que llegó. No le pedimos contraseñas de cuentas oficiales ni datos de pago de la embajada.',
                    'Si contrata la asesoría, podemos recibir copias de su pasaporte y de documentos de viaje, que usamos solo para ese trabajo y que eliminamos cuando termina, salvo que usted nos pida conservarlos.',
                ],
            ],
            [
                'h2'   => 'Para qué los usamos',
                'body' => [
                    'Usamos sus datos para responderle y para llevar el seguimiento de su consulta. No los '
                    . 'vendemos ni los cedemos a terceros ajenos a la prestación del servicio.',
                ],
            ],
            [
                'h2'   => 'Sus derechos',
                'body' => [
                    'Puede pedirnos el acceso, la corrección o la eliminación de sus datos escribiéndonos por '
                    . 'los medios de la página de contacto.',
                ],
            ],
        ],
        'stub'        => false,
        'changefreq'  => 'yearly',
        'priority'    => '0.3',
    ],

    '/terminos/' => [
        'title'       => 'Términos de servicio',
        'description' => 'Las condiciones bajo las que prestamos nuestros servicios: alcance, '
                       . 'plazos y responsabilidades de cada parte.',
        'h1'          => 'Términos de servicio',
        'lead'        => 'Condiciones bajo las que prestamos nuestros servicios.',
        'sections'    => [
            [
                'h2'   => 'Alcance',
                'body' => [
                    'visas.com.py es un servicio privado e independiente de asesoría. No somos la Embajada de '
                        . 'Estados Unidos, el Gobierno de Estados Unidos, el Gobierno de Canadá ni ningún otro '
                        . 'gobierno. No somos un estudio jurídico ni damos asesoramiento legal migratorio.',
                    'Nuestro servicio consiste en explicar, revisar y preparar. El usuario conserva sus cuentas, '
                        . 'completa y presenta sus propios formularios y paga las tasas oficiales directamente al '
                        . 'gobierno correspondiente. No vendemos turnos ni usamos programas para agendarlos.',
                    'No garantizamos la aprobación de ninguna visa: la decisión es siempre de la autoridad consular.',
                ],
            ],
            [
                'h2'   => 'Plazos y responsabilidades',
                'body' => [
                    'El alcance y el precio se acuerdan por escrito antes de empezar. El usuario es '
                        . 'responsable de que la información que entrega sea verdadera y completa. Si todavía no '
                        . 'empezamos a trabajar, se devuelve el pago íntegro. Las tasas oficiales no son reembolsables '
                        . 'por nosotros.',
                ],
            ],
        ],
        'stub'        => false,
        'changefreq'  => 'yearly',
        'priority'    => '0.3',
    ],

    // Served by 404.php, not by a route file: it has no URL of its own, so it
    // is excluded from the sitemap and from the route contract.
    '/404' => [
        'title'       => 'Página no encontrada',
        'description' => 'No encontramos la página que buscaba. Vea nuestros servicios o '
                       . 'escríbanos y le indicamos dónde está lo que necesita.',
        'h1'          => 'No encontramos esta página',
        'lead'        => '',
        'stub'        => false,
        'noindex'     => true,
        'changefreq'  => 'yearly',
        'priority'    => '0.1',
    ],
];
