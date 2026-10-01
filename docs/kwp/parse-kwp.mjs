// parse-kwp.mjs — turns messy Google Keyword Planner pastes into a clean CSV.
// Usage: node docs/kwp/parse-kwp.mjs docs/kwp/raw-*.txt > docs/kwp/keywords.csv
// Each KWP row in a paste is a block of lines: keyword, volume, yoy, yoy, competition,
// ad share, low cpc, high cpc (cpc lines may be "—"). Header lines and "I konto" are noise.
import { readFileSync } from 'node:fs';

const NOISE = /^(Sökord som du har angett|Sökordsförslag|I konto|Visa rader:|\d+–\d+ av .*|\d{2,3})$/;
const isVolume = (s) => /^\d{1,3}( \d{3})*$/.test(s);
const isPct = (s) => /^[+−-]?(\d+|∞) ?%$/.test(s) || s === '+∞' || s === '−∞';
const cpc = (s) => { const m = s.match(/^([\d,]+) kr$/); return m ? m[1].replace(',', '.') : ''; };

const rows = new Map();
for (const file of process.argv.slice(2)) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/).map((l) => l.trim().replace(/Hö(Sökordsförslag)$/, '$1')).filter(Boolean);
  for (let i = 0; i < lines.length - 3; i++) {
    const kw = lines[i];
    if (NOISE.test(kw) || isVolume(kw) || isPct(kw)) continue;
    if (!isVolume(lines[i + 1]) || !isPct(lines[i + 2]) || !isPct(lines[i + 3])) continue;
    const volume = Number(lines[i + 1].replace(/ /g, ''));
    // competition at i+4, ad share at i+5, then low/high cpc if present
    let low = '', high = '';
    const a = lines[i + 6] ?? '', b = lines[i + 7] ?? '';
    if (cpc(a) && cpc(b)) { low = cpc(a); high = cpc(b); }
    const key = kw.toLowerCase();
    const prev = rows.get(key);
    if (!prev || prev.volume < volume) rows.set(key, { keyword: key, volume, low, high });
  }
}
const out = [...rows.values()].sort((x, y) => y.volume - x.volume || x.keyword.localeCompare(y.keyword));
console.log('keyword,volume,low_cpc,high_cpc');
for (const r of out) console.log(`"${r.keyword.replace(/"/g, '""')}",${r.volume},${r.low},${r.high}`);
console.error(`${out.length} unique keywords from ${process.argv.length - 2} file(s)`);
