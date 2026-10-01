<?php
/**
 * Every UI string on the site, in one file — the single-locale layer. Nothing
 * in partials/ or templates/ contains a visible word; they all read from here,
 * so translating the site is this one file plus content/*.
 *
 * The strings below are neutral Spanish (formal "usted"), matching the 'py'
 * market the example content uses. A Swedish site rewrites this file in
 * Swedish and sets 'market' => 'se' in content/site.php; no code changes.
 *
 * Nothing here may name a month, a year, a price or a client: strings must stay
 * true without anyone remembering to edit them.
 */

declare(strict_types=1);

return [

    // Cluster labels, in the order the mega-menu and the services hub use them.
    // A cluster key is referenced by every service record ('cluster' => ...).
    'clusters' => [
        'eeuu'         => 'Visa de Estados Unidos',
        'canada'       => 'Visa de Canadá',
        'complementos' => 'Complementos',
    ],

    // One line under each cluster heading on the services hub. Keyed by cluster id.
    'cluster_leads' => [
        'eeuu'         => 'Visa de turista o negocios B1/B2: formulario, pago, turno y entrevista.',
        'canada'       => 'Visa de visitante a Canadá: formulario en línea, documentos y biometría.',
        'complementos' => 'Lo que suele faltar: la foto con las medidas correctas y la traducción.',
    ],

    'nav' => [
        'home'         => 'Inicio',
        'services'     => 'Servicios',
        'pricing'      => 'Precios',
        'tools'        => 'Herramientas',
        'guides'       => 'Guías',
        'about'        => 'Nosotros',
        'blog'         => 'Blog',
        'contact'      => 'Contacto',
        'privacy'      => 'Privacidad',
        'terms'        => 'Términos',
        'menu'         => 'Menú',
        'close'        => 'Cerrar',
        'open_menu'    => 'Abrir el menú',
        'close_menu'   => 'Cerrar el menú',
        'skip'         => 'Ir al contenido principal',
        'firm'         => 'Información',
        'all_services' => 'Ver todos los servicios',
    ],

    'cta' => [
        'quote'         => 'Consultar precio',
        'whatsapp'      => 'WhatsApp',
        'whatsapp_long' => 'Escribir por WhatsApp',
        'consult'       => 'Quiero asesoría',
        'contact'       => 'Contactar',
        'see_included'  => 'Ver qué incluye',
        'talk'          => 'Hablar con nosotros',
    ],

    // The WhatsApp menu. These are BUTTON LABELS only — the message that
    // actually reaches WhatsApp always comes from content/lead-values.php and
    // names a service, never a generic "consulta gratis".
    'whatsapp' => [
        'menu_title' => '¿Sobre qué quiere escribirnos?',
        'menu_note'  => 'Abrimos WhatsApp con el mensaje ya escrito. Puede cambiarlo antes de enviarlo.',
        'other'      => 'Otra consulta',
        'this_page'  => 'Lo que está viendo',
        'open_menu'  => 'Abrir opciones de WhatsApp',
        'close_menu' => 'Cerrar',
    ],

    'home' => [
        'eyebrow'   => 'Asesoría privada e independiente',
        'h1_lead'   => 'Visa americana desde Paraguay: ',
        'h1_accent' => 'requisitos, DS-160 y entrevista sin errores.',
        'lead'      => 'Le explicamos cada paso y revisamos su formulario antes de que lo envíe. '
                     . 'Usted mantiene sus propias cuentas y paga las tasas directamente a la '
                     . 'embajada. No somos el Gobierno de EE. UU. ni garantizamos la aprobación.',

        'services_eyebrow' => 'Servicios',
        'services_title'   => 'Lo que hacemos',
        'services_lead'    => 'Elija solo lo que necesita: desde revisar su formulario hasta acompañarlo de principio a fin.',

        'unsure_title' => '¿No sabe por dónde empezar?',
        'unsure_text'  => 'Cuéntenos su caso y le decimos qué trámite corresponde y qué le conviene contratar, sin costo.',
    ],

    // The panel at the foot of the homepage hero. Labels only: no amounts, no
    // dates, no percentages, no client name — see partials/status-panel.php.
    'panel' => [
        'title' => 'Su trámite, paso a paso',
        'badge' => 'En orden',
        'tiles' => [
            ['label' => 'Formulario DS-160',  'value' => 'Revisado'],
            ['label' => 'Pago de la tasa',    'value' => 'Guía lista'],
            ['label' => 'Turno y entrevista', 'value' => 'Preparado'],
        ],
        'foot'  => 'Usted presenta y paga en sus propias cuentas',
        'note'  => 'Ilustración de cómo lo acompañamos',
    ],

    // The "quiénes somos" band on the homepage. Every line here is a commitment
    // about how the business works, never a claim about size or results — those
    // need the owner's confirmation and belong in content/site.php.
    'about' => [
        'eyebrow' => 'Quiénes somos',
        'title'   => 'Un servicio privado que le explica el trámite, no un trámite oficial.',
        'text'    => 'Completar el DS-160 y preparar la entrevista consular es más fácil con '
                   . 'alguien que ya vio los errores comunes. Le explicamos cada pregunta, '
                   . 'revisamos lo que escribió y le decimos qué documentos llevar. El formulario '
                   . 'y las cuentas son suyos, y las tasas oficiales se pagan directamente al '
                   . 'gobierno correspondiente.',
        // Shown while content/site.php has no credentials[] of its own.
        'credentials' => [
            'Usted usa sus propias cuentas: nunca compartimos su usuario ni compramos turnos',
            'Alcance y precio acordados por escrito antes de empezar',
            'Respuesta dentro del siguiente día hábil, por WhatsApp o formulario',
        ],
        'badge_note'     => 'de experiencia',
        'badge_fallback' => 'Asesoría personal',
    ],

    // The four-step "cómo trabajamos" block, reused on service pages.
    'process' => [
        'eyebrow' => 'Cómo trabajamos',
        'title'   => 'De la primera consulta a la entrevista, con cada paso explicado.',
        'steps'   => [
            [
                'title' => 'Consulta inicial',
                'text'  => 'Revisamos su situación: viajes anteriores, empleo, familia y qué visa corresponde.',
            ],
            [
                'title' => 'Plan y precio por escrito',
                'text'  => 'Qué incluye, qué no, y cuánto cuesta en guaraníes, antes de empezar.',
            ],
            [
                'title' => 'Formulario y documentos',
                'text'  => 'Completamos el DS-160 con usted, en su cuenta, y armamos la lista de documentos.',
            ],
            [
                'title' => 'Pago, turno y entrevista',
                'text'  => 'Lo guiamos para pagar la tasa y agendar, y practicamos la entrevista juntos.',
            ],
        ],
    ],

    // Rendered in place of the testimonials band while content/site.php has
    // none. Sectors, not clients: nothing to verify.
    'industries' => [
        'eyebrow' => 'Rubros',
        'title'   => 'Para quién es',
        'lead'    => 'Cada situación tiene sus propias preguntas. Estas son las que más vemos.',
        // Each item is either a plain string or ['label' => ..., 'path' => ...]
        // pointing at a segment page in content/segmentos.php.
        'items'   => [
            ['label' => 'Viajes en familia', 'path' => '/segmentos/familias/'],
            ['label' => 'Comerciantes y empresarios', 'path' => '/segmentos/comerciantes-empresarios/'],
            ['label' => 'Tratamiento médico', 'path' => '/segmentos/tratamiento-medico/'],
        ],
    ],

    // The band renders only when content/site.php has testimonials.
    'testimonials' => [
        'eyebrow' => 'Casos',
        'title'   => 'Lo que dicen nuestros clientes',
    ],

    'services_hub' => [
        'eyebrow'      => 'Servicios',
        'title'        => 'Todo lo que hacemos, en un solo lugar.',
        'lead'         => 'Contrate solo lo que necesita. Las tasas oficiales no están incluidas y se pagan a la embajada.',
        'unsure_title' => '¿No sabe qué necesita?',
        'unsure_text'  => 'Cuéntenos su caso y le decimos qué le corresponde.',
        'unsure_cta'   => 'Escribirnos',
    ],

    'cta_band' => [
        'eyebrow' => 'Solicitar consulta',
        'title'   => 'Empecemos con una consulta breve por WhatsApp.',
        'lead'    => 'Sin compromiso. Le decimos qué trámite corresponde y cuánto cuesta nuestro servicio.',
    ],

    'form' => [
        'legend'          => 'Quiero asesoría',
        'name'            => 'Nombre',
        'company'         => 'Ciudad',
        'phone'           => 'WhatsApp o teléfono',
        'phone_hint'      => 'Ej.: 0981 123 456',
        'email'           => 'Correo (opcional)',
        'need'            => '¿Qué necesita?',
        'message'         => 'Cuéntenos brevemente',
        'message_hint'    => 'Para qué visa consulta y cuántas personas viajan…',
        'submit'          => 'Enviar consulta',
        'sending'         => 'Enviando…',
        'privacy_note'    => 'Usamos sus datos solo para responderle. No pida ni comparta aquí su contraseña ni datos de pago de la embajada. Ver la política de privacidad.',
        'success_title'   => 'Recibimos su consulta.',
        'success_text'    => 'Le respondemos dentro del siguiente día hábil. Si prefiere, escríbanos ahora.',
        'error_title'     => 'No pudimos enviar el formulario.',
        'error_text'      => 'Vuelva a intentarlo en un momento o escríbanos directamente.',
        'error_phone'     => 'Necesitamos un teléfono o WhatsApp válido para responderle.',
        'required'        => 'obligatorio',
        'thanks_next'     => 'Qué sigue',
        'thanks_whatsapp' => 'Si prefiere no esperar, escríbanos ahora por WhatsApp.',
        'remind_title'    => 'Que le avisemos antes de cada vencimiento',
        'remind_text'     => 'Le anotamos su caso y le escribimos por WhatsApp unos días antes.',
        'remind_phone'    => 'Su WhatsApp',
        'remind_submit'   => 'Quiero que me recuerden',
        'remind_ok'       => 'Anotado. Le escribimos antes del próximo vencimiento.',
    ],

    // The chip selector in the lead form. Every key here needs a matching entry
    // in content/lead-values.php's 'needs' — verify.sh checks that.
    'needs' => [
        'eeuu'      => 'Visa de EE. UU.',
        'canada'    => 'Visa de Canadá',
        'entrevista' => 'Preparar la entrevista',
        'otro'      => 'Otra consulta',
    ],

    'contact' => [
        'eyebrow' => 'Contacto',
        'title'   => 'Cuéntenos su caso.',
        'lead'    => 'Escríbanos por WhatsApp o déjenos sus datos y le respondemos dentro '
                   . 'del siguiente día hábil.',
        'address' => 'Dirección',
        'hours'   => 'Horario',
        'phone'   => 'Teléfono',
        'email'   => 'Correo',
        'expect'  => 'Qué pasa después',
        'steps'   => [
            'Le respondemos dentro del siguiente día hábil.',
            'Le explicamos qué trámite corresponde y qué parte puede hacer por su cuenta.',
            'Si decide contratar, recibe el alcance y el precio en guaraníes por escrito.',
        ],
    ],

    'service' => [
        'includes'     => 'Qué incluye',
        'excludes'     => 'Qué no incluye',
        'we_need'      => 'Qué necesitamos de usted',
        'benefits'     => 'Beneficios',
        'faq'          => 'Preguntas frecuentes',
        'related'      => 'Servicios relacionados',
        'guides'       => 'Guía relacionada',
        'articles'     => 'Artículo relacionado',
        'form_eyebrow' => 'Consulta',
        'form_lead'    => 'Déjenos sus datos y le respondemos con el alcance y el precio, '
                        . 'sin compromiso.',
        'breadcrumb'   => 'Ruta de navegación',
    ],

    // Segment landing pages (content/segmentos.php).
    'segment' => [
        'traps_title'  => 'Los errores que más complican este caso',
        'bundle_title' => 'Lo que le recomendamos',
        'form_eyebrow' => 'Consulta para su caso',
        'form_lead'    => 'Cuéntenos su situación; le respondemos con lo que le corresponde y el precio.',
    ],

    // Shared microcopy across the tool pages. Calculator-specific labels live in
    // each tool's own PHP/JS; only the repeated strings are here.
    'tools' => [
        'reviewed_prefix' => 'Datos revisados el',
        'orientativo'     => 'Los resultados son orientativos. Las tasas oficiales pueden cambiar: confírmelas en el sitio del gobierno correspondiente.',
        'calculate'       => 'Calcular',
        'result_title'    => 'Resultado',
        'use_result'      => 'Usar este resultado en el formulario',
        'need_js'         => 'Esta calculadora necesita JavaScript activado en su navegador.',
        'restart'         => 'Volver a empezar',
    ],

    // Shared microcopy across the guide pages.
    'guide' => [
        'reviewed_prefix'       => 'Revisado el',
        'orientativo'           => 'Guía general e independiente, no oficial. Verifique los requisitos vigentes en el sitio del gobierno correspondiente.',
        'delegate_eyebrow'      => 'Delegarlo',
        'delegate_title'        => '¿Prefiere que lo acompañemos?',
        'delegate_lead'         => 'Lo guiamos paso a paso; usted completa y presenta todo en sus propias cuentas.',
        'delegate_form_heading' => 'Pedir acompañamiento',
        'related'               => 'Otras guías',
    ],

    // Article chrome (templates/article.php). The long date itself is formatted
    // by the market module's fmt_date_long().
    'article' => [
        'reading_time' => 'min de lectura',
        'updated'      => 'Actualizado el',
        'read_more'    => 'Leer el artículo',
    ],

    // Hub pages: the listings under /servicios/, /blog/, /herramientas/, /guias/.
    'hub' => [
        'empty' => 'Todavía no hay nada publicado en esta sección.',
    ],

    'pricing' => [
        'quote'    => 'A cotizar',
        'per_month' => 'por persona',
        'cta'      => 'Consultar',
        'note'     => 'Precios de nuestro servicio de asesoría, en guaraníes. No incluyen las tasas oficiales (por ejemplo la tasa consular de la visa), que se pagan directamente a la embajada.',
    ],

    'placeholder' => [
        // Shown on a stub page until the phase that owns it writes the content.
        'notice' => 'Estamos preparando esta página.',
        'action' => 'Mientras tanto, escríbanos y le respondemos por WhatsApp.',
    ],

    'error404' => [
        'title' => 'No encontramos esta página',
        'lead'  => 'Puede que el enlace haya cambiado. Estas son las secciones más buscadas.',
    ],

    'footer' => [
        'blurb'   => 'Asesoría privada e independiente para trámites de visa desde Paraguay.',
        'disclaimer' => 'visas.com.py es un servicio privado e independiente. No somos la Embajada de EE. UU., el Gobierno de EE. UU. ni ningún otro gobierno, y no garantizamos la aprobación de ninguna visa. La decisión es siempre de la autoridad consular. Los formularios oficiales y las tasas se tramitan directamente con el gobierno correspondiente.',
        'disclaimer_short' => 'Servicio privado e independiente. No somos la Embajada ni el Gobierno de EE. UU. No garantizamos la aprobación de ninguna visa.',
        'rights'  => 'Todos los derechos reservados.',
        'contact' => 'Contacto',
    ],
];
