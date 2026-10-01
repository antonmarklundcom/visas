<?php
/**
 * robots.txt, served at /robots.txt by the rewrite in .htaccess (and by
 * router.php locally) — a PHP file rather than a static one so the Sitemap
 * line names this site's own domain, from content/site.php, instead of a
 * domain baked into the template.
 */

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

header('Content-Type: text/plain; charset=utf-8');
?>
# <?= site('domain') ?: parse_url(site_origin(), PHP_URL_HOST) ?>

User-agent: *
Allow: /

# Application internals — never useful to a crawler.
Disallow: /content/
Disallow: /lib/
Disallow: /partials/
Disallow: /templates/
Disallow: /logs/
Disallow: /enviar.php
Disallow: /*?enviado=
Disallow: /*?error=

Sitemap: <?= url('/sitemap.xml') ?>
