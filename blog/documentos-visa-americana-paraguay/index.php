<?php
require __DIR__ . '/../../lib/bootstrap.php';

$slug = 'documentos-visa-americana-paraguay';

$sections = [
    [
        'h2'   => 'Lo imprescindible',
        'body' => ['Estos documentos se presentan siempre. Confirme la lista vigente en el sitio de la embajada.'],
        'items' => [
            ['title' => 'Pasaporte', 'text' => 'Vigente, y los anteriores si los tiene.'],
            ['title' => 'Confirmación del DS-160', 'text' => 'La página con el código de barras.'],
            ['title' => 'Confirmación del turno', 'text' => 'La impresión de su cita.'],
        ],
    ],
    [
        'h2'   => 'Lo que respalda su historia',
        'body' => [
            'No se le exige llevar todo, pero puede ser útil tener a mano comprobantes de trabajo o negocio, ingresos, estudios y vínculos familiares. Entregue únicamente lo que le pidan.',
        ],
    ],
    [
        'h2'   => 'Lo que no hace falta',
        'body' => ['Carpetas enormes, cartas escritas por terceros o documentos falsos. Presentar información falsa puede traer consecuencias graves.'],
    ],
];

$faq = [
    ['q' => '¿Necesito una carta de mi empleador?', 'a' => 'No es obligatoria, pero un comprobante de trabajo puede ayudar a respaldar lo que declaró.'],
    ['q' => '¿Debo llevar mis estados de cuenta?', 'a' => 'Solo si respaldan lo que va a contar y se los piden.'],
];

require ROOT_DIR . '/templates/article.php';
