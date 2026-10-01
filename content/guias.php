<?php
/**
 * The how-to guides under /guias/, keyed by slug. Shape contract: see the
 * template README. Every guide is independent and NOT official: facts that
 * change (fees, dates, addresses) point the reader to the official site rather
 * than stating a figure we cannot keep current.
 */

declare(strict_types=1);

$reviewed = '2026-10-01';

return [

    'ds160-paso-a-paso' => [
        'path'            => '/guias/ds160-paso-a-paso/',
        'title'           => 'Cómo completar el formulario DS-160',
        'navLabel'        => 'Formulario DS-160',
        'seoTitle'        => 'Cómo completar el DS-160 paso a paso',
        'metaDescription' => 'Guía en español para completar el formulario DS-160 de la visa americana: qué preparar, cómo responder y los errores que más demoran el trámite.',
        'lastReviewed'    => $reviewed,
        'hero' => [
            'eyebrow' => 'Guías',
            'h1'      => 'Cómo completar el formulario DS-160, paso a paso',
            'lead'    => 'Qué tener a mano, cómo avanzar sin perder lo escrito y qué errores evitar. El formulario es gratuito: se completa en el sitio oficial.',
        ],
        'intro' => [
            'El DS-160 es el formulario en línea que casi todas las personas completan para pedir una visa de no inmigrante a Estados Unidos, incluida la B1/B2 de turismo y negocios. Está en inglés, aunque puede responder con apoyo de explicaciones en español.',
            'No se paga por completarlo: el sitio oficial no cobra por el formulario. La tasa consular de la visa es un pago aparte, que se hace a la embajada.',
        ],
        'steps' => [
            ['title' => 'Reúna sus datos antes de empezar', 'body' => ['Pasaporte vigente, datos de empleo o estudios, direcciones de los últimos años, datos de familiares directos y un resumen de sus viajes de los últimos cinco años.']],
            ['title' => 'Entre al sitio oficial del Departamento de Estado', 'body' => ['Busque el formulario DS-160 en el sitio oficial de visas de Estados Unidos. Desconfíe de páginas que cobran por abrirlo.']],
            ['title' => 'Elija Asunción como lugar de entrevista', 'body' => ['Seleccione la embajada donde hará la entrevista. Anote el código de confirmación que aparece: lo necesitará para retomar el formulario.']],
            ['title' => 'Complete cada sección con datos idénticos a su pasaporte', 'body' => ['Nombres, fechas y números deben coincidir letra por letra. Una diferencia pequeña puede causar demoras.']],
            ['title' => 'Responda las preguntas de seguridad con cuidado', 'body' => ['Lea cada pregunta completa. Responda con la verdad: una respuesta incorrecta en el DS-160 puede traer consecuencias de largo plazo.']],
            ['title' => 'Suba la foto y revise todo antes de firmar', 'body' => ['Si la foto no cumple las medidas, el sistema puede rechazarla. Revise todas las páginas antes de enviar: después no se puede corregir como un borrador.']],
            ['title' => 'Imprima o guarde la página de confirmación', 'body' => ['Guarde el PDF con el código de barras. Lo necesitará para crear su cuenta de turnos y llevará una copia a la entrevista.']],
        ],
        'faq' => [
            ['q' => '¿Cuánto tarda el formulario?', 'a' => 'Entre una y dos horas la primera vez. El sistema se cierra por inactividad, por eso conviene guardar el código de confirmación.'],
            ['q' => '¿Puedo corregirlo después de enviarlo?', 'a' => 'No directamente. Si hay un error importante, puede ser necesario completar un formulario nuevo; consulte las instrucciones oficiales.'],
            ['q' => '¿Alguien puede completarlo por mí?', 'a' => 'Un asesor puede ayudarlo, pero la responsabilidad por las respuestas es suya. Nunca comparta su contraseña ni sus datos de pago.'],
        ],
        'relatedService' => 'revision-ds160',
        'toolLink'       => ['path' => '/herramientas/costo-visa-eeuu/', 'label' => 'Calcule el costo', 'text' => 'Estime en guaraníes la tasa consular y nuestro servicio.'],
        'related'        => ['pagar-tasa-y-agendar-visa-eeuu', 'entrevista-visa-americana'],
    ],

    'pagar-tasa-y-agendar-visa-eeuu' => [
        'path'            => '/guias/pagar-tasa-y-agendar-visa-eeuu/',
        'title'           => 'Cómo pagar la tasa y agendar el turno de la visa americana',
        'navLabel'        => 'Pagar la tasa y agendar',
        'seoTitle'        => 'Pagar la tasa y agendar turno visa EE. UU.',
        'metaDescription' => 'Cómo crear su cuenta, pagar la tasa consular y agendar la cita para la visa americana desde Paraguay, sin pagarle a intermediarios por turnos.',
        'lastReviewed'    => $reviewed,
        'hero' => [
            'eyebrow' => 'Guías',
            'h1'      => 'Cómo pagar la tasa y agendar el turno de la visa americana',
            'lead'    => 'Después del DS-160 sigue el pago y la cita. Estos son los pasos y las trampas a evitar.',
        ],
        'intro' => [
            'El turno se agenda a través del sistema oficial de citas de visas, con su propia cuenta. Nadie puede venderle un turno de manera legítima: la embajada advierte que quien lo intenta puede provocar la cancelación de la cita y hasta de la visa.',
        ],
        'steps' => [
            ['title' => 'Cree su cuenta en el sistema oficial de turnos', 'body' => ['Use el sitio indicado por la embajada y registre su cuenta con su propio correo. No comparta su contraseña con nadie.']],
            ['title' => 'Cargue los datos de su DS-160', 'body' => ['Necesitará el número de confirmación del formulario y los datos de su pasaporte.']],
            ['title' => 'Pague la tasa consular por los medios habilitados', 'body' => ['El monto y los medios de pago los define la embajada. Confírmelos en su sitio oficial antes de pagar; la tasa no se reembolsa si la visa se niega.']],
            ['title' => 'Elija fecha y hora disponibles', 'body' => ['Elija la fecha que pueda cumplir. Evite pagar a terceros que prometen fechas adelantadas.']],
            ['title' => 'Guarde su confirmación y prepárese', 'body' => ['Imprima la confirmación del turno y reúna los documentos que llevará.']],
        ],
        'faq' => [
            ['q' => '¿Puedo reprogramar mi turno?', 'a' => 'El sistema permite reprogramar un número limitado de veces. Verifique las reglas vigentes en su cuenta.'],
            ['q' => '¿Me pueden conseguir un turno más cercano?', 'a' => 'No de forma legítima. Desconfíe de quien lo ofrezca.'],
        ],
        'relatedService' => 'visa-americana',
        'toolLink'       => ['path' => '/herramientas/costo-visa-eeuu/', 'label' => 'Calcule el costo', 'text' => 'Estime las tasas oficiales en guaraníes.'],
        'related'        => ['ds160-paso-a-paso', 'entrevista-visa-americana'],
    ],

    'entrevista-visa-americana' => [
        'path'            => '/guias/entrevista-visa-americana/',
        'title'           => 'Cómo prepararse para la entrevista de la visa americana',
        'navLabel'        => 'La entrevista consular',
        'seoTitle'        => 'Entrevista de la visa americana: preguntas',
        'metaDescription' => 'Qué esperar de la entrevista consular para la visa americana en Asunción: preguntas frecuentes, documentos útiles y cómo responder con claridad.',
        'lastReviewed'    => $reviewed,
        'hero' => [
            'eyebrow' => 'Guías',
            'h1'      => 'Cómo prepararse para la entrevista de la visa americana',
            'lead'    => 'Dura pocos minutos. Qué suelen preguntar y cómo responder con claridad y verdad.',
        ],
        'intro' => [
            'En la entrevista el funcionario evalúa el motivo de su viaje y sus vínculos con Paraguay. No hay una respuesta correcta mágica: lo que ayuda es la coherencia con lo que escribió en el DS-160 y la claridad al contarlo.',
        ],
        'steps' => [
            ['title' => 'Relea su DS-160', 'body' => ['Debe poder explicar cualquier dato que haya escrito. Lleve una copia de la confirmación.']],
            ['title' => 'Prepare una explicación breve de su viaje', 'body' => ['A dónde va, cuánto tiempo, con quién y quién paga. En dos o tres oraciones.']],
            ['title' => 'Piense en sus vínculos con Paraguay', 'body' => ['Trabajo, negocio, familia, estudios, propiedades. Responda con hechos, no con promesas.']],
            ['title' => 'Ordene los documentos de apoyo', 'body' => ['Lleve el pasaporte, la confirmación del DS-160 y de la cita, y los comprobantes que respalden lo que declaró. Entregue solo lo que le pidan.']],
            ['title' => 'Responda con calma y con la verdad', 'body' => ['Escuche la pregunta completa y responda lo que se le pregunta. No memorice textos ni lleve guiones de terceros.']],
        ],
        'faq' => [
            ['q' => '¿Qué pasa si me niegan la visa?', 'a' => 'Recibirá una explicación general. Puede volver a solicitar cuando algo relevante haya cambiado en su situación.'],
            ['q' => '¿Debo hablar inglés?', 'a' => 'No necesariamente. Puede pedir hacer la entrevista en español.'],
        ],
        'relatedService' => 'preparacion-entrevista',
        'toolLink'       => null,
        'related'        => ['ds160-paso-a-paso', 'pagar-tasa-y-agendar-visa-eeuu'],
    ],

    'visa-canada-paraguayos' => [
        'path'            => '/guias/visa-canada-paraguayos/',
        'title'           => 'Cómo pedir la visa de visitante a Canadá desde Paraguay',
        'navLabel'        => 'Visa de Canadá',
        'seoTitle'        => 'Visa de Canadá para paraguayos: pasos',
        'metaDescription' => 'Los paraguayos necesitan visa de visitante para Canadá y no pueden usar la eTA. Pasos de la solicitud en línea, documentos y biometría en Asunción.',
        'lastReviewed'    => $reviewed,
        'hero' => [
            'eyebrow' => 'Guías',
            'h1'      => 'Cómo pedir la visa de visitante a Canadá desde Paraguay',
            'lead'    => 'Paraguay no califica para la eTA. Estos son los pasos de la solicitud de visa.',
        ],
        'intro' => [
            'Para visitar Canadá como turista o por negocios, los ciudadanos paraguayos necesitan una visa de visitante. La eTA, que es una autorización electrónica más simple, es solo para países exentos de visa.',
        ],
        'steps' => [
            ['title' => 'Confirme que necesita visa', 'body' => ['Use la herramienta oficial del gobierno de Canadá para verificar los requisitos según su nacionalidad y el motivo de su viaje.']],
            ['title' => 'Cree su cuenta en línea y arme la lista de documentos', 'body' => ['La solicitud se presenta en línea. Prepare pasaporte, comprobantes de empleo e ingresos, itinerario y, si corresponde, una carta de invitación.']],
            ['title' => 'Traduzca lo necesario', 'body' => ['Los documentos que no estén en inglés o francés suelen necesitar traducción. Confirme los requisitos vigentes.']],
            ['title' => 'Complete el formulario y pague las tasas', 'body' => ['Las tasas las define el gobierno de Canadá; confírmelas en el sitio oficial antes de pagar.']],
            ['title' => 'Dé sus datos biométricos', 'body' => ['Se toman en el centro de solicitud de visas de Canadá en Asunción, con cita previa. La dirección puede cambiar: verifíquela en el sitio oficial.']],
            ['title' => 'Siga el estado de su solicitud', 'body' => ['Revise su cuenta en línea y responda rápido si piden información adicional.']],
        ],
        'faq' => [
            ['q' => '¿Cuánto demora?', 'a' => 'Los tiempos de procesamiento cambian. Consulte el estimado oficial en el sitio del gobierno de Canadá.'],
            ['q' => '¿La visa americana sirve para Canadá?', 'a' => 'Algunas personas con visa americana vigente pueden calificar para la eTA según su nacionalidad. Verifique en el sitio oficial si su caso entra.'],
        ],
        'relatedService' => 'visa-canada',
        'toolLink'       => null,
        'related'        => ['ds160-paso-a-paso'],
    ],

    'etias-europa-paraguayos' => [
        'path'            => '/guias/etias-europa-paraguayos/',
        'title'           => 'ETIAS y Schengen: qué necesitan los paraguayos para viajar a Europa',
        'navLabel'        => 'Europa: Schengen y ETIAS',
        'seoTitle'        => 'Schengen y ETIAS para paraguayos',
        'metaDescription' => 'Los paraguayos pueden viajar a Europa hasta 90 días sin visa. Qué es ETIAS, cuándo se pedirá y cómo evitar páginas que cobran de más.',
        'lastReviewed'    => $reviewed,
        'hero' => [
            'eyebrow' => 'Guías',
            'h1'      => 'Schengen y ETIAS: qué necesitan los paraguayos para viajar a Europa',
            'lead'    => 'Hoy no se necesita visa para una estadía corta. Qué cambia con ETIAS y cómo no caer en páginas engañosas.',
        ],
        'intro' => [
            'Los ciudadanos paraguayos pueden estar hasta 90 días dentro de un período de 180 en el espacio Schengen sin visa. ETIAS será una autorización electrónica previa, no una visa; todavía no está en funcionamiento y la Unión Europea anunciará la fecha de inicio con anticipación.',
            'Como ETIAS aún no se puede solicitar, cualquier sitio que cobre por tramitarlo hoy debe tratarse con desconfianza.',
        ],
        'steps' => [
            ['title' => 'Verifique su pasaporte', 'body' => ['Debe estar vigente con margen suficiente después de la salida. Revise las reglas del país de entrada.']],
            ['title' => 'Cuente sus días', 'body' => ['Llevar la cuenta de 90 días en 180 evita problemas migratorios.']],
            ['title' => 'Reúna lo que pueden pedirle en frontera', 'body' => ['Pasaje de regreso, reserva de alojamiento, medios económicos y seguro de viaje.']],
            ['title' => 'Siga el anuncio oficial de ETIAS', 'body' => ['Cuando el sistema abra, la solicitud se hará únicamente en el sitio oficial de la Unión Europea.']],
        ],
        'faq' => [
            ['q' => '¿Ya puedo pedir ETIAS?', 'a' => 'No: al momento de revisar esta guía el sistema todavía no estaba en funcionamiento. Verifíquelo en el sitio oficial de la UE.'],
            ['q' => '¿Necesito visa Schengen?', 'a' => 'No para estadías cortas de turismo o negocios. Sí para estudiar o trabajar, según el país.'],
        ],
        'relatedService' => null,
        'toolLink'       => null,
        'related'        => ['viajar-brasil-argentina-desde-paraguay'],
    ],

    'viajar-brasil-argentina-desde-paraguay' => [
        'path'            => '/guias/viajar-brasil-argentina-desde-paraguay/',
        'title'           => 'Requisitos para viajar a Brasil y Argentina desde Paraguay',
        'navLabel'        => 'Brasil y Argentina',
        'seoTitle'        => 'Viajar a Brasil y Argentina desde Paraguay',
        'metaDescription' => 'Qué documento llevar para entrar a Brasil y Argentina siendo paraguayo, qué pasa con los menores y cuándo hace falta una autorización notarial.',
        'lastReviewed'    => $reviewed,
        'hero' => [
            'eyebrow' => 'Guías',
            'h1'      => 'Requisitos para viajar a Brasil y Argentina desde Paraguay',
            'lead'    => 'No se necesita visa. Qué documento llevar y qué cuidar si viajan menores.',
        ],
        'intro' => [
            'Los paraguayos no necesitan visa para entrar a Brasil ni a Argentina por turismo. Alcanza con un documento de identidad vigente. Las reglas de los menores son donde más inconvenientes aparecen.',
        ],
        'steps' => [
            ['title' => 'Revise su documento', 'body' => ['Cédula de identidad vigente o pasaporte. Una constancia de trámite no suele ser suficiente.']],
            ['title' => 'Si viaja un menor, revise quién lo acompaña', 'body' => ['Si el menor viaja con un solo progenitor, con un tercero o solo, se pide una autorización de viaje notariada. Confirme los requisitos de salida de Paraguay con Migraciones.']],
            ['title' => 'Verifique seguro y vacunas', 'body' => ['Argentina puede exigir seguro médico de viaje y Brasil certificado de fiebre amarilla en ciertos casos. Confirme los requisitos vigentes antes de salir.']],
            ['title' => 'Lleve comprobantes del viaje', 'body' => ['Reserva de alojamiento y pasaje de regreso, por si se los piden en frontera.']],
        ],
        'faq' => [
            ['q' => '¿Cuántos días puedo quedarme?', 'a' => 'Como turista, hasta 90 días en Brasil; consulte el plazo vigente en Argentina.'],
            ['q' => '¿Ustedes tramitan autorizaciones de menores?', 'a' => 'No: las firma un escribano. Podemos orientarlo sobre qué llevar.'],
        ],
        'relatedService' => null,
        'toolLink'       => null,
        'related'        => ['etias-europa-paraguayos'],
    ],
];
