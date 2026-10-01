<?php
/**
 * Loaded first by every page: `require __DIR__.'/../lib/bootstrap.php';`
 *
 * Defines ROOT_DIR, loads configuration (config.php if present, otherwise the
 * committed defaults), pulls in the helper and SEO layers and loads the one
 * market module named by content/site.php. Content arrays are loaded lazily by
 * content() the first time a page asks for them.
 */

declare(strict_types=1);

if (defined('ROOT_DIR')) {
    return;
}

define('ROOT_DIR', dirname(__DIR__));

/**
 * A configuration value, or $default when unset or blank.
 */
function cfg(string $key, ?string $default = null): ?string
{
    static $config = null;

    if ($config === null) {
        $defaults = require ROOT_DIR . '/config.example.php';
        $local    = is_file(ROOT_DIR . '/config.php') ? require ROOT_DIR . '/config.php' : [];
        $config   = array_merge($defaults, is_array($local) ? $local : []);
    }

    $value = $config[$key] ?? '';

    return $value === '' ? $default : (string) $value;
}

/**
 * A content array from content/<name>.php, loaded once per request.
 *
 * The shape of each file is the contract every page builds against, and is
 * documented in README.md ("Content model"). A site fills in the values; it
 * does not rename or remove a key.
 */
function content(string $name): array
{
    static $cache = [];

    if (!isset($cache[$name])) {
        $path = ROOT_DIR . '/content/' . $name . '.php';
        if (!is_file($path)) {
            throw new RuntimeException("Unknown content file: {$name}");
        }
        $cache[$name] = require $path;
    }

    return $cache[$name];
}

require_once ROOT_DIR . '/lib/helpers.php';
require_once ROOT_DIR . '/lib/seo.php';

/**
 * The market module: exactly one of lib/market/*.php, named by 'market' in
 * content/site.php. Every module defines the same function names (fmt_money,
 * validate_tax_id, fmt_date_long, market_table, …) so no template, partial or
 * helper is written twice — see README.md, "Market module contract".
 */
$market     = (string) (content('site')['market'] ?? 'py');
$marketFile = ROOT_DIR . '/lib/market/' . preg_replace('/[^a-z0-9_-]/', '', $market) . '.php';

if (!is_file($marketFile)) {
    throw new RuntimeException("Unknown market '{$market}': no lib/market/{$market}.php");
}

require_once $marketFile;
unset($market, $marketFile);
