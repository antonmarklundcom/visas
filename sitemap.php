<?php
/**
 * sitemap.xml, generated from the content arrays. Served at /sitemap.xml by the
 * rewrite in .htaccess (and by router.php locally).
 *
 * Pages still marked 'stub' in content/pages.php are excluded: they are noindex
 * until the phase that owns them writes the content, and a sitemap should not
 * advertise a placeholder. Blog articles, tools, guides and segment
 * pages appear automatically as they are added to their content arrays.
 */

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

$today = date('Y-m-d');
$urls  = [];

foreach (content('pages') as $path => $meta) {
    /* Stubs are noindex until the phase that owns them writes the content, and
       '/404' is not a URL of its own — neither belongs in a sitemap. */
    if (!empty($meta['stub']) || !empty($meta['noindex'])) {
        continue;
    }
    $urls[] = [
        'loc'        => url($path),
        'changefreq' => $meta['changefreq'] ?? 'monthly',
        'priority'   => $meta['priority'] ?? '0.5',
    ];
}

foreach (services() as $service) {
    $urls[] = [
        'loc'        => url($service['path']),
        'changefreq' => 'monthly',
        'priority'   => '0.8',
    ];
}

foreach (nav('tools') as $tool) {
    $urls[] = ['loc' => url($tool['path']), 'changefreq' => 'monthly', 'priority' => '0.7'];
}

foreach (nav('guias') as $guide) {
    $urls[] = ['loc' => url($guide['path']), 'changefreq' => 'monthly', 'priority' => '0.6'];
}

foreach (content('blog') as $article) {
    $urls[] = [
        'loc'        => url('/blog/' . $article['slug'] . '/'),
        'lastmod'    => $article['updated'] ?? $article['date'] ?? null,
        'changefreq' => 'yearly',
        'priority'   => '0.6',
    ];
}

foreach (content('segmentos') as $segmento) {
    $urls[] = ['loc' => url($segmento['path']), 'changefreq' => 'monthly', 'priority' => '0.7'];
}

header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>', "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($urls as $url): ?>
  <url>
    <loc><?= e($url['loc']) ?></loc>
    <lastmod><?= e($url['lastmod'] ?? $today) ?></lastmod>
    <changefreq><?= e($url['changefreq']) ?></changefreq>
    <priority><?= e($url['priority']) ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
