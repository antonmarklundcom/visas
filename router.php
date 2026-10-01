<?php
/**
 * Router for the PHP built-in server ONLY:
 *
 *     php -S localhost:8080 router.php
 *
 * Apache never sees this file. It exists so that local preview and verify.sh
 * behave exactly like production, by mirroring every routing rule in .htaccess:
 * the site's own redirects and 410s, sitemap.xml, robots.txt, trailing-slash
 * enforcement, the denied directories, and the 404 document.
 *
 * Directory resolution is generic — any <dir>/index.php is served — so nested routes such as
 * /blog/<slug>/ and /herramientas/<slug>/ work here with no change.
 *
 * If you change a rule in .htaccess, change it here too.
 */

declare(strict_types=1);

$root  = __DIR__;
$uri   = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$query = (string) ($_SERVER['QUERY_STRING'] ?? '');
$path  = '/' . ltrim(rawurldecode($uri), '/');

/** Send a status and a tiny body, mirroring what Apache would produce. */
$halt = static function (int $status, string $body = ''): void {
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    echo $body;
};

// --- legacy URLs ------------------------------------------------------------
// A rebuild of an existing site lists its 410s here and in .htaccess; both must
// agree, or local preview and production disagree about a URL Google already
// has. Same for redirects: every RewriteRule there gets a branch here.
$gone = [];
if ($gone !== [] && in_array(rtrim($path, '/') . '/', $gone, true)) {
    $halt(410, '<h1>410 Gone</h1>');
    return true;
}

// --- generated text endpoints -----------------------------------------------
if ($path === '/sitemap.xml') {
    require $root . '/sitemap.php';
    return true;
}

if ($path === '/robots.txt') {
    require $root . '/robots.php';
    return true;
}

// --- denied directories and files ------------------------------------------
if (preg_match('#^/(content|lib|partials|templates|docs|prompts|tests|deploy|logs)(/|$)#', $path)
    || preg_match('#^/\.#', $path)
    || preg_match('#^/config(\.example)?\.php$#', $path)
    || preg_match('#\.(md|sh|json|lock|ya?ml|log)$#', $path)
) {
    $halt(404, '<h1>404 Not Found</h1>');
    return true;
}

$file = $root . $path;

// --- existing file: let the built-in server serve it ------------------------
if ($path !== '/' && is_file($file)) {
    return false;
}

// --- directory: enforce the trailing slash, then serve its index.php --------
if (is_dir(rtrim($file, '/')) && $path !== '/') {
    if (!str_ends_with($path, '/')) {
        http_response_code(301);
        header('Location: ' . $path . '/' . ($query !== '' ? '?' . $query : ''));
        return true;
    }

    $index = rtrim($file, '/') . '/index.php';
    if (is_file($index)) {
        require $index;
        return true;
    }
}

if ($path === '/' && is_file($root . '/index.php')) {
    require $root . '/index.php';
    return true;
}

// --- ErrorDocument 404 /404.php ---------------------------------------------
http_response_code(404);
require $root . '/404.php';
return true;
