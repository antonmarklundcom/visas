<?php
require __DIR__ . '/../../lib/bootstrap.php';

$slug = 'esta-paraguayos-no-aplica';

$sections = [
    [
        'h2'   => 'Por qué los paraguayos no pueden usar ESTA',
        'body' => [
            'ESTA es una autorización electrónica para viajeros de países que participan en el Programa de Exención de Visa de Estados Unidos. Paraguay no forma parte de ese programa, por lo que un ciudadano paraguayo que quiere viajar a Estados Unidos por turismo o negocios necesita una visa, normalmente la B1/B2.',
            'Si una página le ofrece "tramitar su ESTA" desde Paraguay, desconfíe: o no aplica a su caso o le están cobrando por algo que no existe para usted.',
        ],
    ],
    [
        'h2'   => 'Entonces, ¿qué corresponde?',
        'body' => ['El camino es el formulario DS-160, el pago de la tasa consular, el turno y la entrevista en la embajada en Asunción.'],
        'items' => [
            ['title' => 'DS-160', 'text' => 'Formulario en línea, gratuito en el sitio oficial.'],
            ['title' => 'Tasa consular', 'text' => 'Se paga a la embajada, no a terceros.'],
            ['title' => 'Entrevista', 'text' => 'Presencial, en Asunción.'],
        ],
    ],
    [
        'h2'   => 'Cómo comprobarlo usted mismo',
        'body' => ['La lista de países con exención de visa está en el sitio oficial del Departamento de Estado. Verifíquela allí: es la única fuente que importa.'],
    ],
];

$faq = [
    ['q' => '¿Puede cambiar esto en el futuro?', 'a' => 'La lista de países la define el gobierno de Estados Unidos. Revise siempre el sitio oficial antes de planificar.'],
    ['q' => '¿Y si tengo otra nacionalidad?', 'a' => 'Si su pasaporte es de un país del programa, ESTA podría aplicar. Se evalúa según el pasaporte con el que viaja.'],
];

$toolLink = [
    'path'  => '/herramientas/costo-visa-eeuu/',
    'label' => 'Calcule el costo de la visa',
    'text'  => 'Estime en guaraníes la tasa consular y el servicio de asesoría.',
];

require ROOT_DIR . '/templates/article.php';
