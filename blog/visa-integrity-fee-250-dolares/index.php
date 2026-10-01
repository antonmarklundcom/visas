<?php
require __DIR__ . '/../../lib/bootstrap.php';

$slug = 'visa-integrity-fee-250-dolares';

$sections = [
    [
        'h2'   => 'Qué es esta tasa',
        'body' => [
            'En 2025, una ley de Estados Unidos creó una tasa de integridad de visa de 250 dólares que se sumaría a la tasa consular de la mayoría de las visas de no inmigrante. Para la B1/B2, la tasa consular actual es de 185 dólares, por lo que el total sería de 435 dólares por persona.',
        ],
    ],
    [
        'h2'   => 'Qué se sabe de su aplicación',
        'body' => [
            'Según lo informado, la tasa se cobraría al emitirse la visa y no al solicitarla, de modo que quien recibe una negativa no la pagaría. Sin embargo, su puesta en marcha depende de las instrucciones del Departamento de Estado, y las fechas pueden cambiar.',
            'Por eso no la damos por cobrada: verifique en el sitio oficial de la embajada si ya es obligatoria antes de calcular su presupuesto.',
        ],
    ],
    [
        'h2'   => 'Cómo calcular el total',
        'body' => ['Sume la tasa consular, la tasa de integridad si ya aplica, y su servicio de asesoría si lo contrata. Nuestra calculadora lo hace en guaraníes y le permite cambiar cada monto.'],
    ],
];

$faq = [
    ['q' => '¿Se paga aunque me nieguen la visa?', 'a' => 'Según lo informado, se cobraría solo cuando se emite la visa. Confírmelo en el sitio oficial.'],
    ['q' => '¿Esta tasa la cobran ustedes?', 'a' => 'No. Es una tasa del gobierno y se paga por los medios que indique la embajada.'],
];

$toolLink = [
    'path'  => '/herramientas/costo-visa-eeuu/',
    'label' => 'Calcule el costo total',
    'text'  => 'Incluya o no la tasa de integridad y cambie el tipo de cambio.',
];

require ROOT_DIR . '/templates/article.php';
