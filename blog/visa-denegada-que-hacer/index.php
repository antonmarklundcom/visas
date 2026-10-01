<?php
require __DIR__ . '/../../lib/bootstrap.php';

$slug = 'visa-denegada-que-hacer';

$sections = [
    [
        'h2'   => 'Qué significa una negativa',
        'body' => [
            'En la mayoría de los casos de B1/B2, el funcionario consular concluye que no se demostró suficientemente que el solicitante regresará a su país. Una negativa no es una prohibición permanente: puede volver a solicitar.',
            'La tasa consular no se devuelve, y volver a solicitar implica pagar de nuevo.',
        ],
    ],
    [
        'h2'   => 'Qué hacer antes de volver a intentar',
        'body' => ['Solicitar de inmediato lo mismo, con la misma historia, suele dar el mismo resultado.'],
        'items' => [
            ['title' => 'Entienda el motivo', 'text' => 'Revise lo que le dijeron y compárelo con su formulario.'],
            ['title' => 'Espere un cambio real', 'text' => 'Trabajo estable, nuevos vínculos, un viaje con propósito más claro.'],
            ['title' => 'Practique la entrevista', 'text' => 'Muchas negativas se deben a respuestas poco claras.'],
        ],
    ],
    [
        'h2'   => 'Lo que no hacemos',
        'body' => ['No prometemos que una nueva solicitud será aprobada ni sugerimos respuestas distintas a la verdad. Podemos ayudarlo a ordenar su caso y a practicar.'],
    ],
];

$faq = [
    ['q' => '¿Cuánto debo esperar para volver a solicitar?', 'a' => 'No hay un plazo fijo: depende de si cambió algo relevante en su situación.'],
    ['q' => '¿Puedo apelar?', 'a' => 'En general no hay apelación para una visa B1/B2; la vía es una nueva solicitud.'],
];

require ROOT_DIR . '/templates/article.php';
