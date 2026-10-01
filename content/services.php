<?php
/**
 * The service pages, keyed by slug. THIS SHAPE IS THE CONTRACT: fill the keys,
 * add optional ones, never rename or remove one. Every slug also needs a record
 * in content/lead-values.php (verify.sh fails the build otherwise).
 *
 * Positioning rule for every record: we are an independent private advisory
 * service. The applicant keeps their own accounts and pays official fees to the
 * government directly. We never promise approval, never sell appointments.
 */

declare(strict_types=1);

$notIncluded = [
    'La tasa consular y otras tasas oficiales: se pagan directamente a la embajada',
    'Garantía de aprobación: la decisión es siempre del funcionario consular',
];

return [

    'visa-americana' => [
        'path'            => '/servicios/visa-americana/',
        'title'           => 'Asesoría para la visa americana B1/B2',
        'navLabel'        => 'Visa americana B1/B2',
        'cluster'         => 'eeuu',
        'parent'          => null,
        'seoTitle'        => 'Asesoría visa americana desde Paraguay',
        'metaDescription' => 'Lo acompañamos en la visa americana B1/B2: DS-160 completado con usted, guía de pago y turno, documentos y una práctica de entrevista. Servicio privado.',
        'hero' => [
            'eyebrow' => 'Visa de Estados Unidos',
            'h1'      => 'Asesoría para la visa americana B1/B2',
            'h2'      => 'El formulario, el pago, el turno y la entrevista, explicados paso a paso.',
            'lead'    => 'Completamos el DS-160 junto a usted, en su propia cuenta, y lo preparamos para la entrevista en la Embajada de EE. UU. en Asunción. Es una asesoría privada: no somos la embajada.',
        ],
        'includes' => [
            'Llamada inicial para ver su caso: viajes, empleo, familia y vínculos con Paraguay',
            'DS-160 completado con usted en una videollamada, con las respuestas explicadas',
            'Guía para crear su cuenta, pagar la tasa consular y agendar turno por su cuenta',
            'Lista personalizada de documentos para llevar a la entrevista',
            'Una práctica de entrevista con las preguntas más frecuentes',
        ],
        'excludes' => $notIncluded,
        'weNeed' => [
            'Pasaporte vigente y, si tiene, visas anteriores',
            'Datos de empleo o negocio, y de los viajes de los últimos cinco años',
            'Datos de las personas con quienes va a viajar',
        ],
        'sections' => [
            [
                'h2'   => 'Cómo trabajamos, y por qué usted conserva el control',
                'body' => [
                    'La cuenta, el formulario y el pago son suyos. Nosotros le explicamos qué pregunta cada campo, revisamos que sus respuestas sean coherentes entre sí y con sus documentos, y le avisamos de los errores que más demoran o complican un trámite.',
                    'No pedimos su contraseña, no compramos turnos y no usamos programas que automatizan citas: la embajada advierte que puede cancelar turnos e incluso visas por ese tipo de prácticas.',
                ],
            ],
            [
                'h2'   => 'Qué cambia en esta visa y qué no',
                'body' => [
                    'La visa B1/B2 es de turista y de negocios de corta estadía. Tener un buen DS-160 no reemplaza la entrevista: el funcionario evalúa sus vínculos con Paraguay y el motivo del viaje. Por eso incluimos la práctica de preguntas.',
                ],
                'items' => [
                    ['title' => 'Coherencia', 'text' => 'Lo que dice el formulario debe coincidir con lo que dirá en la entrevista.'],
                    ['title' => 'Vínculos', 'text' => 'Empleo, familia, propiedades y razones para volver a Paraguay.'],
                    ['title' => 'Honestidad', 'text' => 'Una respuesta incorrecta en el DS-160 puede traer consecuencias de largo plazo.'],
                ],
            ],
        ],
        'benefits' => [
            ['title' => 'Menos errores', 'text' => 'Un segundo par de ojos antes de enviar un formulario que no se puede corregir tan fácil.'],
            ['title' => 'En español y en guaraníes', 'text' => 'Explicaciones claras y precio en moneda local.'],
            ['title' => 'Sin intermediarios opacos', 'text' => 'Usted ve cada paso en su propia cuenta oficial.'],
        ],
        'faq' => [
            ['q' => '¿Ustedes tramitan la visa por mí?', 'a' => 'No. La solicitud la presenta usted, en su propia cuenta. Nosotros lo asesoramos y revisamos lo que va a presentar.'],
            ['q' => '¿Garantizan que me den la visa?', 'a' => 'No, y desconfíe de quien lo haga. La decisión es del funcionario consular en la entrevista.'],
            ['q' => '¿Cuánto cuesta la visa en total?', 'a' => 'La tasa consular oficial para B1/B2 se paga a la embajada y se suma a nuestro servicio. Use la calculadora de esta página para estimar el total y confirme el monto vigente en el sitio oficial.'],
            ['q' => '¿Pueden conseguirme un turno más rápido?', 'a' => 'No. Ofrecer turnos adelantados es una práctica prohibida. Le explicamos cómo agendar y reprogramar dentro de las reglas.'],
            ['q' => '¿Sirve para toda la familia?', 'a' => 'Sí. Cada persona completa su propio DS-160. Hay un precio reducido por cada familiar adicional.'],
        ],
        'cta'        => ['label' => 'Consultar por la visa americana'],
        'related'    => ['revision-ds160', 'preparacion-entrevista', 'foto-visa'],
        'guides'     => ['ds160-paso-a-paso'],
        'articles'   => ['documentos-visa-americana-paraguay'],
        'toolLinks'  => [
            ['path' => '/herramientas/costo-visa-eeuu/', 'label' => 'Calcule el costo total', 'text' => 'Tasa oficial más nuestro servicio, en guaraníes.'],
        ],
    ],

    'revision-ds160' => [
        'path'            => '/servicios/revision-ds160/',
        'title'           => 'Revisión de su formulario DS-160',
        'navLabel'        => 'Revisión del DS-160',
        'cluster'         => 'eeuu',
        'parent'          => null,
        'seoTitle'        => 'Revisión del formulario DS-160',
        'metaDescription' => 'Si ya completó el DS-160 por su cuenta, se lo revisamos antes de enviarlo: respuestas inconsistentes, campos que confunden y errores frecuentes.',
        'hero' => [
            'eyebrow' => 'Visa de Estados Unidos',
            'h1'      => 'Revisión de su formulario DS-160',
            'h2'      => 'Antes de enviarlo, una segunda lectura.',
            'lead'    => 'Usted completa el formulario y nosotros lo revisamos: respuestas contradictorias, datos que no coinciden con su pasaporte y preguntas mal entendidas.',
        ],
        'includes' => [
            'Revisión de su borrador completo, campo por campo',
            'Lista de correcciones con la explicación de cada una',
            'Una segunda revisión rápida después de sus cambios',
        ],
        'excludes' => $notIncluded,
        'weNeed' => [
            'El borrador del DS-160 en PDF o capturas, sin su contraseña ni código de seguridad',
            'Una foto de la página de datos de su pasaporte',
        ],
        'sections' => [
            [
                'h2'   => 'Qué buscamos en la revisión',
                'body' => ['Un DS-160 se envía una sola vez. Revisamos que lo que escribió sea consistente y que no haya errores que luego cuesten una cita.'],
                'items' => [
                    ['title' => 'Datos del pasaporte', 'text' => 'Nombres, fechas y números idénticos al documento.'],
                    ['title' => 'Historial de viajes', 'text' => 'Que lo declarado coincida con sus sellos y visas anteriores.'],
                    ['title' => 'Empleo e ingresos', 'text' => 'Que cuente la misma historia que podrá demostrar.'],
                ],
            ],
        ],
        'benefits' => [
            ['title' => 'Rápido', 'text' => 'Sin llamadas largas: usted ya hizo el trabajo, nosotros lo verificamos.'],
            ['title' => 'Económico', 'text' => 'La opción más barata si se anima a completar el formulario solo.'],
        ],
        'faq' => [
            ['q' => '¿Necesito darles mi contraseña?', 'a' => 'Nunca. Nos basta un PDF o capturas del borrador, sin el código de confirmación.'],
            ['q' => '¿Y si ya envié el formulario?', 'a' => 'Cuéntenos igual: según el caso se puede aclarar en la entrevista o completar uno nuevo.'],
        ],
        'cta'        => ['label' => 'Pedir la revisión'],
        'related'    => ['visa-americana', 'preparacion-entrevista'],
        'guides'     => ['ds160-paso-a-paso'],
        'articles'   => ['visa-denegada-que-hacer'],
        'toolLinks'  => [],
    ],

    'preparacion-entrevista' => [
        'path'            => '/servicios/preparacion-entrevista/',
        'title'           => 'Preparación para la entrevista consular',
        'navLabel'        => 'Entrevista (coach)',
        'cluster'         => 'eeuu',
        'parent'          => null,
        'seoTitle'        => 'Preparación para la entrevista de visa',
        'metaDescription' => 'Practique la entrevista de la visa americana con un coach: preguntas frecuentes, cómo explicar su viaje y sus vínculos con Paraguay, sin guiones falsos.',
        'hero' => [
            'eyebrow' => 'Visa de Estados Unidos',
            'h1'      => 'Preparación para la entrevista consular',
            'h2'      => 'Práctica real, con feedback, antes del día que importa.',
            'lead'    => 'Una sesión de 45 minutos para ensayar la entrevista, ordenar su historia verdadera y llegar con calma. No le damos respuestas inventadas.',
        ],
        'includes' => [
            'Simulación de entrevista con las preguntas más frecuentes',
            'Feedback sobre claridad, brevedad y coherencia con su DS-160',
            'Lista de documentos que conviene llevar y cómo ordenarlos',
        ],
        'excludes' => $notIncluded,
        'weNeed' => [
            'Su DS-160 (copia de la confirmación, sin contraseña)',
            'Contarnos su viaje y su situación en Paraguay',
        ],
        'sections' => [
            [
                'h2'   => 'Qué hace distinta a una buena entrevista',
                'body' => [
                    'La entrevista dura pocos minutos. Quien responde con claridad y de forma coherente con su formulario suele salir mejor parado. Practicamos exactamente eso, siempre con la verdad.',
                ],
            ],
        ],
        'benefits' => [
            ['title' => 'Para renovaciones y casos difíciles', 'text' => 'También sirve si le negaron la visa antes y quiere entender qué pasó.'],
            ['title' => 'Sin guiones', 'text' => 'No memorizamos respuestas: ordenamos las suyas.'],
        ],
        'faq' => [
            ['q' => '¿Me dicen qué responder?', 'a' => 'No inventamos respuestas. Lo ayudamos a explicar su viaje de forma clara y verdadera.'],
            ['q' => '¿Es por videollamada?', 'a' => 'Sí, por videollamada o WhatsApp, en el horario que acordemos.'],
        ],
        'cta'        => ['label' => 'Reservar mi práctica'],
        'related'    => ['visa-americana', 'revision-ds160'],
        'guides'     => ['entrevista-visa-americana'],
        'articles'   => ['visa-denegada-que-hacer'],
        'toolLinks'  => [],
    ],

    'visa-canada' => [
        'path'            => '/servicios/visa-canada/',
        'title'           => 'Asesoría para la visa de visitante a Canadá',
        'navLabel'        => 'Visa de Canadá',
        'cluster'         => 'canada',
        'parent'          => null,
        'seoTitle'        => 'Asesoría visa Canadá para paraguayos',
        'metaDescription' => 'Los paraguayos necesitan visa para visitar Canadá. Lo guiamos con el formulario en línea, los documentos, la biometría y la carta de invitación.',
        'hero' => [
            'eyebrow' => 'Visa de Canadá',
            'h1'      => 'Asesoría para la visa de visitante a Canadá',
            'h2'      => 'Paraguay no califica para la eTA: se necesita visa.',
            'lead'    => 'Armamos con usted la solicitud en línea, la lista de documentos y los pasos de biometría. Es una asesoría privada: no somos el gobierno de Canadá.',
        ],
        'includes' => [
            'Revisión de su caso y de los documentos que lo respaldan',
            'Guía del formulario en línea y de la carta de invitación, si corresponde',
            'Guía para la biometría y el seguimiento de la solicitud',
            'Orientación sobre traducciones al inglés o francés',
        ],
        'excludes' => [
            'Tasas del gobierno de Canadá y de biometría: se pagan directamente',
            'Traducciones certificadas: se derivan a un traductor matriculado',
            'Garantía de aprobación',
        ],
        'weNeed' => [
            'Pasaporte vigente y datos de viajes anteriores',
            'Comprobantes de empleo, ingresos y vínculos con Paraguay',
            'Itinerario o carta de invitación del anfitrión en Canadá',
        ],
        'sections' => [
            [
                'h2'   => 'Qué es distinto respecto de la visa americana',
                'body' => ['La solicitud se hace en línea con documentos adjuntos, y el peso está en lo que usted demuestra por escrito. Un archivo incompleto o mal escaneado es la causa más común de demoras.'],
            ],
        ],
        'benefits' => [
            ['title' => 'Documentos en orden', 'text' => 'Una lista clara de qué subir y cómo.'],
            ['title' => 'Un solo lugar', 'text' => 'Asesoría de EE. UU. y Canadá en el mismo sitio.'],
        ],
        'faq' => [
            ['q' => '¿Los paraguayos necesitan visa para Canadá?', 'a' => 'Sí. Paraguay no está entre los países que califican para la eTA, por lo que hace falta una visa de visitante.'],
            ['q' => '¿Dónde se toma la biometría?', 'a' => 'En el centro de solicitud de visas de Canadá en Asunción, con cita previa. Confirme la dirección vigente en el sitio oficial.'],
        ],
        'cta'        => ['label' => 'Consultar por Canadá'],
        'related'    => ['foto-visa', 'traduccion-documentos'],
        'guides'     => ['visa-canada-paraguayos'],
        'articles'   => [],
        'toolLinks'  => [],
    ],

    'foto-visa' => [
        'path'            => '/servicios/foto-visa/',
        'title'           => 'Foto para visa con las medidas correctas',
        'navLabel'        => 'Foto para visa',
        'cluster'         => 'complementos',
        'parent'          => null,
        'seoTitle'        => 'Foto digital para visa americana',
        'metaDescription' => 'Foto digital para el DS-160 y otras visas, con las medidas, el fondo y la iluminación que se exigen, más una copia impresa si la necesita.',
        'hero' => [
            'eyebrow' => 'Complementos',
            'h1'      => 'Foto para visa con las medidas correctas',
            'h2'      => 'Una foto rechazada demora todo el trámite.',
            'lead'    => 'Tomamos la foto con el formato digital que pide el formulario y una copia impresa para llevar, si la necesita.',
        ],
        'includes' => [
            'Foto digital en el formato y tamaño exigidos',
            'Verificación de fondo, encuadre y expresión',
            'Copia impresa opcional',
        ],
        'excludes' => ['Ninguna tasa oficial está relacionada con este servicio'],
        'weNeed' => ['Presentarse con ropa de uso diario, sin accesorios que tapen el rostro'],
        'sections' => [],
        'benefits' => [],
        'faq' => [
            ['q' => '¿Puedo usar mi propia foto?', 'a' => 'Si cumple las especificaciones, sí. Si no está seguro, se la revisamos.'],
        ],
        'cta'        => ['label' => 'Consultar por la foto'],
        'related'    => ['visa-americana', 'visa-canada'],
        'guides'     => [],
        'articles'   => [],
        'toolLinks'  => [],
    ],

    'traduccion-documentos' => [
        'path'            => '/servicios/traduccion-documentos/',
        'title'           => 'Traducción de documentos para visa',
        'navLabel'        => 'Traducciones',
        'cluster'         => 'complementos',
        'parent'          => null,
        'seoTitle'        => 'Traducción de documentos para visa',
        'metaDescription' => 'Traducción al inglés o francés de certificados, constancias y cartas, a través de traductores matriculados, para su solicitud de visa.',
        'hero' => [
            'eyebrow' => 'Complementos',
            'h1'      => 'Traducción de documentos para visa',
            'h2'      => 'Cuando el documento está en español y la solicitud pide otro idioma.',
            'lead'    => 'Lo conectamos con traductores matriculados para que sus documentos lleguen listos.',
        ],
        'includes' => [
            'Indicación de qué documentos conviene traducir',
            'Derivación a un traductor matriculado',
            'Revisión de que la traducción coincida con el original',
        ],
        'excludes' => ['El costo del traductor, que se acuerda directamente con él'],
        'weNeed' => ['Copia clara de cada documento a traducir'],
        'sections' => [],
        'benefits' => [],
        'faq' => [
            ['q' => '¿La visa americana requiere traducciones?', 'a' => 'Normalmente se presentan documentos en español sin traducir; para Canadá suele pedirse inglés o francés. Confirme los requisitos vigentes en el sitio oficial.'],
        ],
        'cta'        => ['label' => 'Consultar por traducciones'],
        'related'    => ['visa-canada', 'visa-americana'],
        'guides'     => [],
        'articles'   => [],
        'toolLinks'  => [],
    ],
];
