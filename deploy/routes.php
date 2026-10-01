<?php
/**
 * Prints the route contract as "<path><TAB><expected status>" lines, one per
 * URL. verify.sh consumes this, so a phase extends the smoke test simply by
 * adding content — a new service, article, tool, guide or segment page appears
 * here automatically.
 *
 *     php deploy/routes.php [site-root]
 *
 * The site root defaults to the repository root; verify.sh passes the unzipped
 * dist/ directory when checking the deploy artifact.
 */

declare(strict_types=1);

$root = $argv[1] ?? dirname(__DIR__);
require rtrim($root, '/') . '/lib/bootstrap.php';

$routes = [];

/* Static pages, including the ones still marked as stubs — they must respond
   200 even while their content belongs to a later phase. '/404' is excluded:
   it is rendered by 404.php, not by a route of its own. */
foreach (content('pages') as $path => $meta) {
    if (!empty($meta['noindex'])) {
        continue;
    }
    $routes[$path] = 200;
}

/* Every collection with a page of its own. */
foreach (services() as $service) {
    $routes[$service['path']] = 200;
}
foreach (nav('tools') as $tool) {
    $routes[$tool['path']] = 200;
}
foreach (nav('guias') as $guide) {
    $routes[$guide['path']] = 200;
}
foreach (content('blog') as $article) {
    $routes['/blog/' . $article['slug'] . '/'] = 200;
}
foreach (content('segmentos') as $segmento) {
    $routes[$segmento['path']] = 200;
}

/* Non-page endpoints. */
$routes['/robots.txt']  = 200;
$routes['/sitemap.xml'] = 200;

/* Legacy URLs a rebuild froze: the redirects and 410s in .htaccess and
   router.php get their expected status here, so verify.sh proves all three
   agree. Example (uncomment together with the rules in those two files):
   //   $routes['/hello-world/'] = 410;
   //   $routes['/wp-sitemap.xml'] = 301;
   //   $routes['/?page_id=3'] = 301;                                        */

/* A path that does not exist must be a 404, not a soft 200. */
$routes['/esta-pagina-no-existe/'] = 404;

/* Internals must never be readable over HTTP. */
foreach ([
    '/lib/helpers.php',
    '/lib/market/py.php',
    '/content/site.php',
    '/partials/header.php',
    '/templates/service.php',
    '/config.example.php',
    '/logs/leads.log',
] as $path) {
    $routes[$path] = 404;
}

foreach ($routes as $path => $status) {
    echo $path, "\t", $status, "\n";
}
