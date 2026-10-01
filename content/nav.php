<?php
/**
 * The header and footer link trees. Navigation is data, not markup:
 * partials/header.php and partials/footer.php render whatever this file returns,
 * and a content phase adds tools, guides or legal pages by extending the arrays
 * here rather than editing the partials. An empty list renders nothing at all.
 *
 * Service links are derived from content/services.php, so a service added there
 * appears in the mega-menu and the footer automatically.
 */

declare(strict_types=1);

$services = content('services');
$clusters = content('ui')['clusters'];

/** Services grouped by cluster, in the order content/ui.php lists the clusters. */
$byCluster = [];
foreach ($clusters as $key => $label) {
    $byCluster[$key] = ['label' => $label, 'items' => []];
}
foreach ($services as $slug => $service) {
    $cluster = $service['cluster'];
    if (!isset($byCluster[$cluster])) {
        continue;
    }
    $byCluster[$cluster]['items'][] = [
        'label'  => $service['navLabel'],
        'path'   => $service['path'],
        'slug'   => $slug,
        'parent' => $service['parent'] ?? null,
    ];
}

/** Flat list of all services, for the footer column. */
$allServices = [];
foreach ($byCluster as $cluster) {
    foreach ($cluster['items'] as $item) {
        $allServices[] = $item;
    }
}

return [
    // Header bar, left to right. 'mega' opens the services panel.
    'primary' => [
        ['label' => ui('nav.services'), 'path' => services_hub_path(), 'mega' => true],
        ['label' => ui('nav.pricing'),  'path' => '/precios/'],
        ['label' => ui('nav.tools'),    'path' => '/herramientas/'],
        ['label' => ui('nav.guides'),   'path' => '/guias/'],
        ['label' => ui('nav.blog'),     'path' => '/blog/'],
        ['label' => ui('nav.contact'),  'path' => '/contacto/'],
    ],

    // The clusters inside the services mega-menu.
    'mega' => $byCluster,

    // Footer column 2.
    'services' => $allServices,

    // Footer column 3. Tools are appended from the 'tools' key below.
    'firm' => [
        ['label' => ui('nav.pricing'), 'path' => '/precios/'],
        ['label' => ui('nav.guides'),  'path' => '/guias/'],
        ['label' => ui('nav.blog'),    'path' => '/blog/'],
        ['label' => ui('nav.contact'), 'path' => '/contacto/'],
    ],

    // One entry per content/tools.php record, in the same order.
    'tools' => array_map(
        static fn (array $tool): array => ['label' => $tool['navLabel'], 'path' => $tool['path']],
        content('tools')
    ),

    // One entry per content/guias.php record, in the same order.
    'guias' => array_map(
        static fn (array $guide): array => ['label' => $guide['navLabel'], 'path' => $guide['path']],
        content('guias')
    ),

    'legal' => [
        ['label' => ui('nav.privacy'), 'path' => '/privacidad/'],
        ['label' => ui('nav.terms'),   'path' => '/terminos/'],
    ],

    // Rendered only when content/site.php has social URLs.
    'socials' => array_values(array_filter((array) site('socials'))),
];
