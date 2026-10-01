<?php
/**
 * Market module: Paraguay.
 *
 * lib/bootstrap.php loads exactly one module — the one named by 'market' in
 * content/site.php — and every module defines the SAME function names, so no
 * template, partial or helper ever asks which market it is running in.
 *
 * The contract (see README.md, "Market module contract"):
 *
 *   market_id()                  string   'py'
 *   market_locale()              string   BCP-47 tag for <html lang>
 *   market_currency()            string   ISO 4217 code, for the Ads value
 *   market_country()             string   country name, for JSON-LD areaServed
 *   fmt_money(int $amount)       string   whole units, local grouping
 *   validate_tax_id(string $id)  bool     the market's business tax id
 *   tax_id_check_digit(string)   int      the check digit for a base number
 *   fmt_date_long(string $iso)   string   '4 de septiembre de 2026'
 *   market_vat_rates()           array    ['standard' => int, 'reduced' => int[]]
 *   market_table(string $name)   array    reference tables, [] when unknown
 *   market_last_reviewed()       string   ISO date of the last legal review
 *
 * The Paraguayan formulas below (RUC dígito verificador, guaraní formatting,
 * the labour-law and DNIT tables) come from the verified build this template was
 * extracted from and must not be "tidied": verify.sh checks them against known
 * values.
 */

declare(strict_types=1);

function market_id(): string
{
    return 'py';
}

function market_locale(): string
{
    return 'es-PY';
}

function market_currency(): string
{
    return 'PYG';
}

function market_country(): string
{
    return 'Paraguay';
}

/**
 * Guaraníes, es-PY style: whole numbers, dots for thousands. Never floats —
 * the guaraní has no usable decimal subdivision.
 */
function fmt_money(int $amount): string
{
    return '₲ ' . number_format($amount, 0, ',', '.');
}

/**
 * Validate a Paraguayan RUC against its dígito verificador (DNIT modulo-11).
 *
 * Accepts "80012345-6" or "800123456". The check digit is the last character;
 * everything before it is the base number.
 */
function validate_tax_id(string $id): bool
{
    $clean = preg_replace('/[^0-9]/', '', $id) ?? '';
    if (strlen($clean) < 2) {
        return false;
    }

    return tax_id_check_digit(substr($clean, 0, -1)) === (int) substr($clean, -1);
}

/**
 * The dígito verificador for a RUC base number.
 */
function tax_id_check_digit(string $base): int
{
    $total = 0;
    $k     = 2;

    for ($i = strlen($base) - 1; $i >= 0; $i--) {
        $total += ((int) $base[$i]) * $k;
        $k++;
        if ($k > 11) {
            $k = 2;
        }
    }

    $remainder = $total % 11;

    return $remainder > 1 ? 11 - $remainder : 0;
}

/**
 * '2026-09-04' → '4 de septiembre de 2026'. Used by templates/article.php.
 */
function fmt_date_long(string $isoDate): string
{
    static $meses = [
        1 => 'enero', 2 => 'febrero', 3 => 'marzo', 4 => 'abril', 5 => 'mayo', 6 => 'junio',
        7 => 'julio', 8 => 'agosto', 9 => 'septiembre', 10 => 'octubre', 11 => 'noviembre', 12 => 'diciembre',
    ];

    $ts = strtotime($isoDate);
    if ($ts === false) {
        return $isoDate;
    }

    return ((int) date('j', $ts)) . ' de ' . $meses[(int) date('n', $ts)] . ' de ' . date('Y', $ts);
}

/**
 * IVA: 10 % general, 5 % reduced.
 */
function market_vat_rates(): array
{
    return ['standard' => 10, 'reduced' => [5]];
}

/**
 * The ISO date on which the tables below were last checked against the law.
 * Shown on every calculator and guide next to the "orientativo" disclaimer.
 */
function market_last_reviewed(): string
{
    return '2026-09-04';
}

/**
 * Reference tables. Every figure is a rate or a legal tier — never a client
 * fact — so the JS calculators in assets/js/market/py.js mirror these exactly
 * and the two must be updated together.
 *
 *   'laboral'       Código del Trabajo figures for the aguinaldo and
 *                   liquidación calculators
 *   'vencimientos'  the DNIT perpetual calendar and the IPS monthly window
 */
function market_table(string $name): array
{
    static $tables = null;

    if ($tables === null) {
        $tables = [

            'laboral' => [

                // Ley Nº 417 / Art. 243 Código del Trabajo: el aguinaldo equivale a la
                // doceava parte de las remuneraciones devengadas durante el año civil,
                // y se abona antes del 31 de diciembre (o al terminar la relación
                // laboral, si eso ocurre antes).
                'aguinaldo' => [
                    'divisor'   => 12,
                    'deadline'  => 'antes del 31 de diciembre de cada año, o al finalizar la relación '
                                 . 'laboral si esto ocurre antes',
                    'source'    => 'Ley Nº 417/1973 y Art. 243 del Código del Trabajo (Ley Nº 213/1993)',
                    'ipsExempt' => true,
                ],

                // Aporte IPS al régimen general de trabajadores dependientes:
                // 9 % obrero, 16,5 % patronal.
                'ips' => [
                    'obrero'   => 0.09,
                    'patronal' => 0.165,
                ],

                // Art. 218 Código del Trabajo: días de vacaciones según antigüedad.
                'vacaciones' => [
                    ['hastaAnios' => 5,    'dias' => 12],
                    ['hastaAnios' => 10,   'dias' => 18],
                    ['hastaAnios' => null, 'dias' => 30],
                ],

                // Art. 87 Código del Trabajo: días de preaviso según antigüedad.
                'preaviso' => [
                    ['hastaAnios' => 1,    'dias' => 30],
                    ['hastaAnios' => 5,    'dias' => 45],
                    ['hastaAnios' => 10,   'dias' => 60],
                    ['hastaAnios' => null, 'dias' => 90],
                ],

                // Art. 91 Código del Trabajo: 15 salarios diarios por año de servicio
                // o fracción superior a seis meses.
                'indemnizacion' => [
                    'diasPorAnio'         => 15,
                    'fraccionMinimaMeses' => 6,
                ],

                // El mes se toma como 30 días para el salario diario y los
                // proporcionales, como en la práctica de nómina paraguaya.
                'diasPorMes' => 30,
            ],

            'vencimientos' => [

                // Calendario Perpetuo de Vencimientos (Resolución General Nº 38/2020):
                // cada dígito final del RUC, sin contar el dígito verificador, tiene un
                // día fijo de vencimiento entre el 7 y el 25 de cada mes.
                'calendarioPerpetuo' => [
                    0 => 7,  1 => 9,  2 => 11, 3 => 13, 4 => 15,
                    5 => 17, 6 => 19, 7 => 21, 8 => 23, 9 => 25,
                ],
                'calendarioSource' => 'Resolución General DNIT Nº 38/2020 (Calendario Perpetuo de Vencimientos)',

                // IRE anual: la DNIT fija el mes según el régimen; el día sigue el
                // Calendario Perpetuo.
                'ireAnual' => [
                    'meses' => [3, 4],
                    'nota'  => 'El mes exacto lo confirma la DNIT cada año según su régimen (IRE Simple/IRP '
                             . 'suelen vencer en marzo, IRE General en abril); el día del mes sigue el '
                             . 'Calendario Perpetuo.',
                ],

                // Aportes IPS: del día 1 al 10 del mes siguiente al periodo liquidado.
                'ipsMensual' => [
                    'diaDesde' => 1,
                    'diaHasta' => 10,
                    'nota'     => 'Del día 1 al 10 del mes siguiente al mes liquidado, para todos los '
                                . 'empleadores por igual (no depende de la terminación de su RUC).',
                ],
            ],
        ];
    }

    return $tables[$name] ?? [];
}
