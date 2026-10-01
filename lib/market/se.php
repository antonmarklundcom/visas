<?php
/**
 * Market module: Sweden.
 *
 * Same function names as lib/market/py.php — see that file (and README.md,
 * "Market module contract") for the contract every module implements. Switching
 * 'market' in content/site.php from 'py' to 'se' swaps this file in and changes
 * nothing else on the site.
 *
 * The tables here are deliberately EMPTY: Swedish labour rules (semester,
 * uppsägningstid, ROT/RUT) and the Skatteverket deadline calendar are filled in
 * by the first site that needs them, the way lib/market/py.php's tables were.
 * Everything a brochure site needs on day one — money, org.nr, dates, moms — is
 * complete.
 */

declare(strict_types=1);

function market_id(): string
{
    return 'se';
}

function market_locale(): string
{
    return 'sv-SE';
}

function market_currency(): string
{
    return 'SEK';
}

function market_country(): string
{
    return 'Sverige';
}

/**
 * Whole kronor, sv-SE style: space for thousands, the amount before the unit —
 * "1 500 000 kr". Öre are not shown; prices on a brochure site are never
 * quoted to the öre.
 */
function fmt_money(int $amount): string
{
    return number_format($amount, 0, ',', ' ') . ' kr';
}

/**
 * Validate a Swedish organisationsnummer or personnummer.
 *
 * Accepts '556016-0680', '5560160680', '19670919-9530' and '196709199530':
 * the optional 19/20 century prefix is dropped, leaving ten digits whose last
 * one is the Luhn check digit over the first nine.
 */
function validate_tax_id(string $id): bool
{
    $clean = preg_replace('/[^0-9]/', '', $id) ?? '';

    if (strlen($clean) === 12) {
        $clean = substr($clean, 2);          // strip the 19/20 century prefix
    }
    if (strlen($clean) !== 10) {
        return false;
    }

    return tax_id_check_digit(substr($clean, 0, 9)) === (int) substr($clean, -1);
}

/**
 * The Luhn check digit for the first nine digits of an org.nr / personnummer.
 */
function tax_id_check_digit(string $base): int
{
    $total = 0;
    $double = true;                          // the leftmost of nine digits is doubled

    for ($i = 0; $i < strlen($base); $i++) {
        $digit = (int) $base[$i];
        if ($double) {
            $digit *= 2;
            if ($digit > 9) {
                $digit -= 9;
            }
        }
        $total += $digit;
        $double = !$double;
    }

    return (10 - ($total % 10)) % 10;
}

/**
 * '2026-09-04' → '4 september 2026'. Used by templates/article.php.
 */
function fmt_date_long(string $isoDate): string
{
    static $manader = [
        1 => 'januari', 2 => 'februari', 3 => 'mars', 4 => 'april', 5 => 'maj', 6 => 'juni',
        7 => 'juli', 8 => 'augusti', 9 => 'september', 10 => 'oktober', 11 => 'november', 12 => 'december',
    ];

    $ts = strtotime($isoDate);
    if ($ts === false) {
        return $isoDate;
    }

    return ((int) date('j', $ts)) . ' ' . $manader[(int) date('n', $ts)] . ' ' . date('Y', $ts);
}

/**
 * Moms: 25 % standard, 12 % (food, hotels, restaurants) and 6 % (books,
 * transport, culture) reduced.
 */
function market_vat_rates(): array
{
    return ['standard' => 25, 'reduced' => [12, 6]];
}

function market_last_reviewed(): string
{
    return '2026-09-04';
}

/**
 * Reference tables, same names as the Paraguayan module so a calculator written
 * against one market fails loudly (an empty table) rather than silently using
 * the wrong country's rules.
 *
 *   'laboral'       semester, uppsägningstid, arbetsgivaravgift — to be filled
 *                   in, with its source, by the first site that needs it
 *   'vencimientos'  Skatteverket's moms and arbetsgivardeklaration deadlines
 */
function market_table(string $name): array
{
    static $tables = [
        'laboral'      => [],
        'vencimientos' => [],
    ];

    return $tables[$name] ?? [];
}
