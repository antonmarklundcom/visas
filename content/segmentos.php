<?php
/**
 * Segment landing pages: one per situation, rendered by templates/segment.php.
 * Shape contract: see the template README.
 */

declare(strict_types=1);

return [

    'familias' => [
        'path'            => '/segmentos/familias/',
        'navLabel'        => 'Viajes en familia',
        'seoTitle'        => 'Visa americana para toda la familia',
        'metaDescription' => 'Si viaja con su pareja e hijos a Estados Unidos, cada persona necesita su propio DS-160. Cómo organizarlo y evitar contradicciones entre formularios.',
        'hero' => [
            'eyebrow' => 'Para su situación',
            'h1'      => 'Visa americana para toda la familia',
            'lead'    => 'Cada integrante completa su propio formulario, y las respuestas deben ser coherentes entre sí.',
        ],
        'leadSlug' => 'visa-americana',
        'bundle'   => ['visa-americana', 'foto-visa', 'revision-ds160'],
        'traps'    => [
            ['title' => 'Datos distintos entre formularios', 'text' => 'El domicilio, el empleo o los gastos del viaje no coinciden entre padres e hijos.'],
            ['title' => 'Fotos de menores rechazadas', 'text' => 'Los niños se mueven y la foto no cumple las medidas.'],
            ['title' => 'Turnos que no coinciden', 'text' => 'Cada persona agenda por su cuenta y quedan en días distintos.'],
        ],
        'sections' => [],
        'weNeed'   => [
            'Pasaportes de todos los viajeros',
            'Acta de nacimiento de los menores',
            'Datos de empleo de los adultos',
        ],
        'faq' => [
            ['q' => '¿Los menores necesitan DS-160?', 'a' => 'Sí, cada persona que solicita una visa necesita su propio formulario, completado por sus padres o tutores.'],
            ['q' => '¿Hay precio para familias?', 'a' => 'Sí: cada familiar adicional tiene un precio reducido sobre el Acompañamiento B1/B2.'],
        ],
    ],

    'comerciantes-empresarios' => [
        'path'            => '/segmentos/comerciantes-empresarios/',
        'navLabel'        => 'Comerciantes y empresarios',
        'seoTitle'        => 'Visa americana para comerciantes',
        'metaDescription' => 'Viajes de compras, ferias o reuniones comerciales: cómo explicar su negocio y su motivo de viaje en el DS-160 y en la entrevista de la visa B1.',
        'hero' => [
            'eyebrow' => 'Para su situación',
            'h1'      => 'Visa americana para comerciantes y empresarios',
            'lead'    => 'Viajar por compras, ferias o reuniones se declara de forma distinta que un viaje de turismo.',
        ],
        'leadSlug' => 'visa-americana',
        'bundle'   => ['visa-americana', 'preparacion-entrevista'],
        'traps'    => [
            ['title' => 'Mezclar turismo y negocios sin explicarlo', 'text' => 'El motivo declarado debe ser claro y coherente con lo que dirá en la entrevista.'],
            ['title' => 'No poder explicar el negocio', 'text' => 'Qué vende, a quién y cuánto tiempo hace que lo hace.'],
            ['title' => 'Documentos sin orden', 'text' => 'Llevar todo desordenado en lugar de lo que respalda su historia.'],
        ],
        'sections' => [],
        'weNeed'   => [
            'Datos de su negocio o empresa',
            'Motivo y fechas del viaje',
        ],
        'faq' => [
            ['q' => '¿Es la misma visa que la de turismo?', 'a' => 'La B1/B2 cubre ambas, pero el motivo concreto de su viaje debe estar bien explicado.'],
            ['q' => '¿Puedo trabajar en Estados Unidos con esta visa?', 'a' => 'No. La B1 permite actividades de negocios como reuniones o ferias, no un empleo.'],
        ],
    ],

    'tratamiento-medico' => [
        'path'            => '/segmentos/tratamiento-medico/',
        'navLabel'        => 'Tratamiento médico',
        'seoTitle'        => 'Visa americana por tratamiento médico',
        'metaDescription' => 'Viajar a Estados Unidos por un tratamiento médico es un motivo válido para la visa B1/B2. Qué debe poder demostrar y cómo organizar su caso.',
        'hero' => [
            'eyebrow' => 'Para su situación',
            'h1'      => 'Visa americana por tratamiento médico',
            'lead'    => 'Un tratamiento puede justificar una visa B1/B2. La clave es demostrarlo con documentos y poder explicar cómo se cubrirá.',
        ],
        'leadSlug' => 'visa-americana',
        'bundle'   => ['visa-americana', 'preparacion-entrevista', 'traduccion-documentos'],
        'traps'    => [
            ['title' => 'Falta de respaldo médico', 'text' => 'No tener una carta del médico o del centro que recibirá al paciente.'],
            ['title' => 'No explicar cómo se pagará', 'text' => 'El funcionario puede preguntar por la forma de cubrir el tratamiento.'],
        ],
        'sections' => [],
        'weNeed'   => [
            'Documentación médica y datos del centro de salud',
            'Cómo se cubrirá el costo del tratamiento',
        ],
        'faq' => [
            ['q' => '¿Qué visa se usa para un tratamiento médico?', 'a' => 'Normalmente la B1/B2, con el motivo médico declarado.'],
            ['q' => '¿Es más rápido por urgencia?', 'a' => 'Algunos casos pueden pedir un turno prioritario según las reglas de la embajada. No podemos conseguirlo por usted.'],
        ],
    ],
];
