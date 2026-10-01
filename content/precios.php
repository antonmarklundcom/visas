<?php
/**
 * Pricing plans, rendered by /precios/index.php. Prices are PER PERSON in
 * guaraníes (the page prints "por persona"). They cover OUR advisory service
 * only — never the official consular or government fees.
 *
 * PROPOSED PRICES: set in the Phase 1 business case and awaiting the owner's
 * approval. Change a figure here and nothing else; set it to null to show
 * "A cotizar" instead.
 */

declare(strict_types=1);

return [
    [
        'name'     => 'Revisión del DS-160',
        'audience' => 'Si ya completó el formulario y quiere una segunda lectura.',
        'price'    => 190000,
        'includes' => [
            'Revisión del borrador campo por campo',
            'Lista de correcciones explicadas',
            'Una segunda revisión rápida',
        ],
    ],
    [
        'name'     => 'Acompañamiento B1/B2',
        'audience' => 'Para quien pide la visa americana por primera vez o hace tiempo que no la renueva.',
        'price'    => 450000,
        'includes' => [
            'DS-160 completado con usted en videollamada',
            'Guía de pago de la tasa y de agenda del turno',
            'Lista personalizada de documentos',
            'Una práctica de entrevista',
            'Cada familiar adicional: ₲ 350.000',
        ],
        'featured' => true,
    ],
    [
        'name'     => 'Acompañamiento completo',
        'audience' => 'Para casos con más dudas: viajes anteriores, negativas o historia laboral compleja.',
        'price'    => 690000,
        'includes' => [
            'Todo lo del Acompañamiento B1/B2',
            'Dos prácticas de entrevista',
            'Foto digital para el formulario',
            'Seguimiento después de la entrevista',
        ],
    ],
    [
        'name'     => 'Práctica de entrevista',
        'audience' => 'Si ya tiene su formulario y su turno, y solo quiere ensayar.',
        'price'    => 250000,
        'includes' => [
            'Sesión de 45 minutos por videollamada',
            'Preguntas frecuentes y feedback',
            'Orden de documentos',
        ],
    ],
    [
        'name'     => 'Visa de Canadá',
        'audience' => 'Visa de visitante: los paraguayos no califican para la eTA.',
        'price'    => 1200000,
        'includes' => [
            'Plan de documentos y solicitud en línea',
            'Guía de biometría y seguimiento',
            'Orientación sobre traducciones',
        ],
    ],
    [
        'name'     => 'Foto para visa',
        'audience' => 'Digital en el formato que pide el formulario.',
        'price'    => 40000,
        'includes' => [
            'Foto digital con las medidas correctas',
            'Copia impresa opcional',
        ],
    ],
];
