<?php
/**
 * The offline lead ledger.
 *
 *     php deploy/leads-to-csv.php logs/leads.log > leads.csv
 *     php deploy/leads-to-csv.php logs/leads.log --tier=A > tier-a.csv
 *
 * Turns logs/leads.log — one JSON object per accepted lead, written by
 * enviar.php whether or not the CRM took it — into a CSV with one column per
 * field. That file is the thing you hand to an accountant, sort by tier, or
 * import somewhere else; the CRM is the system of record, this is the copy
 * nobody can lock you out of.
 *
 * CLI ONLY. The log holds names and phone numbers of everyone who ever filled
 * in the form, so this refuses to run over HTTP even if .htaccess were
 * misconfigured and deploy/ were reachable — two independent locks, because
 * one of them silently failing is exactly how leaks happen.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    exit("This script is CLI-only.\n");
}

$args   = array_slice($argv, 1);
$source = null;
$tier   = null;

foreach ($args as $arg) {
    if (str_starts_with($arg, '--tier=')) {
        $tier = strtoupper(substr($arg, 7));
    } elseif (str_starts_with($arg, '-')) {
        fwrite(STDERR, "Unknown option: {$arg}\n");
        exit(2);
    } else {
        $source = $arg;
    }
}

$source ??= dirname(__DIR__) . '/logs/leads.log';

if (!is_file($source) || !is_readable($source)) {
    fwrite(STDERR, "Cannot read {$source}\n");
    fwrite(STDERR, "Usage: php deploy/leads-to-csv.php [logs/leads.log] [--tier=A]\n");
    exit(1);
}

/* Fixed leading columns in the order a human reads them; anything else the
   handler ever adds (a new fields.* key, a new utm parameter) becomes its own
   column automatically, so this never needs editing when the payload grows. */
const LEAD_CSV_LEADING = [
    'at', 'outcome', 'fields.valor', 'fields.servicio', 'fields.etiqueta',
    'name', 'phone', 'email', 'fields.empresa', 'fields.necesita',
    'message', 'fields.resultado_herramienta', 'page_url', 'source',
];

/**
 * Flattens one lead to dotted keys: fields.servicio, utm_source, …
 */
function flatten(array $row, string $prefix = ''): array
{
    $flat = [];
    foreach ($row as $key => $value) {
        $name = $prefix === '' ? (string) $key : $prefix . '.' . $key;
        if (is_array($value)) {
            $flat += flatten($value, $name);
        } else {
            $flat[$name] = is_bool($value) ? ($value ? 'true' : 'false') : (string) $value;
        }
    }

    return $flat;
}

$rows     = [];
$columns  = array_fill_keys(LEAD_CSV_LEADING, true);
$skipped  = 0;
$lineNo   = 0;

$handle = fopen($source, 'rb');
if ($handle === false) {
    fwrite(STDERR, "Cannot open {$source}\n");
    exit(1);
}

while (($line = fgets($handle)) !== false) {
    $lineNo++;
    $line = trim($line);
    if ($line === '') {
        continue;
    }

    $decoded = json_decode($line, true);
    if (!is_array($decoded)) {
        /* A half-written line from a concurrent append is worth reporting but
           never worth losing the other 400 leads over. */
        fwrite(STDERR, "Skipping unparseable line {$lineNo}\n");
        $skipped++;
        continue;
    }

    $flat = flatten($decoded);

    if ($tier !== null && ($flat['fields.valor'] ?? '') !== $tier) {
        continue;
    }

    foreach ($flat as $key => $_) {
        $columns[$key] = true;
    }
    $rows[] = $flat;
}
fclose($handle);

$header = array_keys($columns);
$out    = fopen('php://output', 'wb');

/* Excel and LibreOffice both read a UTF-8 CSV correctly only with the BOM, and
   these rows are full of ñ, á and ₲. */
fwrite($out, "\xEF\xBB\xBF");
fputcsv($out, $header);

foreach ($rows as $row) {
    fputcsv($out, array_map(static fn (string $key) => $row[$key] ?? '', $header));
}
fclose($out);

fwrite(STDERR, sprintf(
    "%d lead(s) written%s%s\n",
    count($rows),
    $tier !== null ? " (tier {$tier} only)" : '',
    $skipped > 0 ? ", {$skipped} line(s) skipped" : ''
));
