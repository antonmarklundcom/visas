<?php
require __DIR__ . '/../../lib/bootstrap.php';

$slug = 'estafas-visa-americana-paraguay';

$sections = [
    [
        'h2'   => 'Las señales de alerta más comunes',
        'body' => ['Tramitar una visa genera mucha ansiedad, y eso es lo que aprovechan los estafadores. Estas son las señales a tener presentes.'],
        'items' => [
            ['title' => 'Turnos adelantados', 'text' => 'Nadie puede vender un turno de manera legítima. La embajada advierte que puede cancelar citas y visas por ello.'],
            ['title' => 'Páginas que parecen oficiales', 'text' => 'Con banderas, águilas o la palabra "oficial" para cobrar por trámites gratuitos.'],
            ['title' => 'Pedido de contraseña', 'text' => 'Nunca comparta su usuario ni su clave de la cuenta de turnos.'],
            ['title' => 'Garantía de aprobación', 'text' => 'Ninguna empresa puede garantizarla.'],
            ['title' => 'Pagos a cuentas personales', 'text' => 'Exija un comprobante a nombre de una empresa y un acuerdo por escrito.'],
        ],
    ],
    [
        'h2'   => 'Cómo trabajamos nosotros',
        'body' => [
            'Somos un servicio privado e independiente. Usted usa sus propias cuentas, paga las tasas oficiales directamente a la embajada y recibe el alcance y el precio por escrito antes de empezar. No compramos turnos ni prometemos resultados.',
        ],
    ],
];

$faq = [
    ['q' => '¿Cómo verifico que el sitio de la embajada es el verdadero?', 'a' => 'Entre desde el sitio del gobierno de Estados Unidos y desconfíe de enlaces recibidos por mensajes o anuncios.'],
    ['q' => '¿Qué hago si ya pagué a un estafador?', 'a' => 'Guarde las pruebas, cambie sus contraseñas y haga la denuncia ante la Policía Nacional.'],
];

require ROOT_DIR . '/templates/article.php';
