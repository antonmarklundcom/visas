import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { CONTACT_FORM_ENABLED, WA_MENU, relatedPaths, ANALYTICS_ID, EN_VISA_OPTIONS, SITE, WA_NUMBER, DISCLAIMER, DISCLAIMER_EN, FACTS, F5_EN, EN_NAV, EN_LABELS, PAGES, NAV, FOOTER, VISA_OPTIONS } from './content.mjs';

const ROOT = import.meta.dirname;
async function buildOgImages() {
  let sharp;
  try {
    const require = createRequire(import.meta.url);
    sharp = (await import(pathToFileURL(require.resolve('sharp')).href)).default;
  } catch { throw new Error('Run npm ci before building (sharp is a local dev dependency).'); }
  for (const [source, output] of [
    ['pareja-paraguaya-aeropuerto-asuncion-pasaportes-1920.webp', 'og-visas-com-py.jpg'],
    ['expat-us-visa-application-office-asuncion-1920.webp', 'og-visas-en.jpg'],
  ]) {
    const input = join(ROOT, 'assets/img', source), target = join(ROOT, 'assets/img', output);
    if (!existsSync(target) || statSync(target).mtimeMs < statSync(input).mtimeMs)
      await sharp(input).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toFile(target);
  }
}
await buildOgImages();
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const asset = file => `/${file}?v=${createHash('sha256').update(readFileSync(join(ROOT, file))).digest('hex').slice(0, 10)}`;
const assets = { css: asset('assets/css/site.css'), js: asset('assets/js/site.js'), icon: asset('assets/img/favicon.svg') };
export const waHref = page => {
 const topic=page.type==='service'||page.type==='guide';
 const text=page.lang==='en'?(topic?`Hi! I found visas.com.py and have a question about ${page.label}:`:'Hi! I have a question about visas:'):(topic?`Hola! Vengo de visas.com.py por ${page.label}. Mi consulta:`:'Hola! Tengo una consulta sobre visas:');
 return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
};
const tr = (page, value) => page.lang === 'en' ? (EN_LABELS[value] || value) : value;
const ui = (page, es, en) => page.lang === 'en' ? en : es;
const ICONS = {
  "passport": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 2h14v20H5Z M9 18h6 M8 10a4 4 0 1 0 8 0 4 4 0 1 0-8 0 M8 10h8 M12 6v8\"/></svg>",
  "refresh": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 3v6h-6 M4 21v-6h6 M5 8a8 8 0 0 1 14-2l1 3 M4 15l1 3a8 8 0 0 0 14-2\"/></svg>",
  "graduation-cap": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m2 9 10-5 10 5-10 5L2 9Z M6 11v6c4 3 8 3 12 0v-6 M22 9v8\"/></svg>",
  "briefcase": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 7h20v14H2Z M8 7V3h8v4 M2 12c6 4 14 4 20 0 M12 12v5\"/></svg>",
  "chat-bubbles": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 13H7l-4 3V4h14v6 M10 16v3h7l4 3V10h-4\"/></svg>",
  "document-alert": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H5v20h14V7l-5-5v5h5 M12 11v4 M12 18h.01\"/></svg>",
  "maple-leaf": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m12 2-3 6-3-2 1 5-5-1 2 4-1 2 8 2-1 4h4l-1-4 8-2-1-2 2-4-5 1 1-5-3 2-3-6Z\"/></svg>",
  "house": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m2 11 10-9 10 9 M5 9v13h14V9 M9 22v-8h6v8\"/></svg>",
  "plane": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m22 2-7 20-4-9-9-4L22 2Z M11 13 22 2\"/></svg>",
  "calendar": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 5h18v17H3Z M7 2v6 M17 2v6 M3 11h18 M7 15h3 M14 15h3 M7 18h3\"/></svg>",
  "shield-check": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z M8 12l3 3 5-6\"/></svg>",
  "check-circle": "<svg class=\"line-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 12a10 10 0 1 0-20 0 10 10 0 1 0 20 0 M7 12l3 3 7-7\"/></svg>"
};
const plane = ICONS.plane;
const check = '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none"><path d="m3 8 3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const waIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.5-4.6A9 9 0 1 1 21 11.5Z"/><path d="M8 6.8c-.9 0-1.5 1.2-1.1 2.5 1 3.4 3.3 5.7 6.7 6.6 1.3.4 2.6-.2 2.6-1.2l-2.5-1.5-1.1 1c-1.9-.8-3.2-2.1-4-3.9l1-1.1L8 6.8Z"/></svg>';
const waButton = (page, label = 'WhatsApp', cls = '') => {
  const chooser = page.lang !== 'en' && page.type === 'home';
  return `<a class="button button--wa ${cls}" href="${esc(waHref(page))}"${chooser ? ' data-wa-trigger aria-expanded="false" aria-controls="wa-menu" aria-haspopup="dialog"' : ''}>${waIcon}<span>${esc(label)}</span></a>`;
};
const link = item => `<a href="${esc(item.href)}"${item.rel ? ` rel="${esc(item.rel)}"` : ''}${item.lang ? ` lang="${esc(item.lang)}"` : ''}>${esc(item.label)}</a>`;

const imageManifest = new Map(JSON.parse(readFileSync(join(ROOT, 'assets/img/manifest.json'), 'utf8')).images.map(i => [i.filename_base, i]));
function photo(base, eager = false, alt, fullWidth = false) {
 const entry = imageManifest.get(base);
 if (!entry) throw new Error('Unknown image: ' + base);
 const sizes = fullWidth ? '100vw' : '(min-width: 1200px) 476px, (min-width: 800px) 42vw, calc(100vw - 40px)';
 const fallback = entry.files.find(f => f.width === 1280 && f.format === 'webp');
 return '<div class="photo-frame"><picture>' + ['avif','webp'].map(format => '<source type="image/' + format + '" srcset="' + entry.files.filter(f => f.format === format).map(f => asset('assets/img/' + f.file) + ' ' + f.width + 'w').join(', ') + '" sizes="' + sizes + '">').join('') + '<img src="' + asset('assets/img/' + fallback.file) + '" alt="' + esc(alt || entry.alt_text) + '" width="' + fallback.width + '" height="' + fallback.height + '" sizes="' + sizes + '" loading="' + (eager ? 'eager' : 'lazy') + '"' + (eager ? ' fetchpriority="high"' : '') + ' decoding="async"></picture></div>';
}

function stamp(id, en = false) {
  return `<svg class="stamp" viewBox="0 0 240 240" aria-hidden="true"><defs><path id="${id}" d="M120 120m-87 0a87 87 0 1 1 174 0a87 87 0 1 1-174 0"/></defs><circle cx="120" cy="120" r="111" stroke-dasharray="2 1"/><circle cx="120" cy="120" r="71"/><text><textPath href="#${id}" startOffset="3%" textLength="510" lengthAdjust="spacing">${en ? 'VISA INFORMATION · PARAGUAY ·' : 'INFORMACIÓN DE VISAS · PARAGUAY ·'}</textPath></text><path d="m99 119 14 14 29-30"/></svg>`;
}
function ticket(item, index, page) {
 const target = PAGES.find(p => p.path === item.href);
 const image = (['home','hub'].includes(page.type) || page.path === '/residencia-en-paraguay/') && target?.hero.image;
  return `<article class="ticket service-ticket reveal" style="--i:${index % 3}"><div class="ticket__main">${image ? `<div class="ticket-thumbnail">${photo(image, false, target.hero.imageAlt)}</div>` : `<span class="ticket-icon">${ICONS[item.icon] || ICONS.passport}</span>`}<p class="eyebrow">${esc(item.eyebrow)}</p><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p><a class="detail-link" href="${esc(item.href)}" aria-label="${esc(`${ui(page, 'Ver detalle', 'View details')}: ${item.title}`)}">${ui(page, 'Ver detalle', 'View details')} <span aria-hidden="true">↗</span></a></div><div class="ticket__stub"><span>${esc(item.tag)}</span>${plane}</div></article>`;
}
function boardingPass(image) {
  return `<div class="hero__document" aria-hidden="true">${stamp('hero-stamp')}<div class="ticket boarding-pass"><div class="ticket__main"><p class="eyebrow">Tu próximo destino</p><div class="ticket__codes"><span>ASU</span>${plane}<span>USA</span></div><div class="ticket__meta"><span>Desde ASU</span><span>Hacia USA</span><span>Tipo B1/B2</span><span>Sitio informativo</span></div><p class="ticket__status"><span aria-hidden="true"></span>Estado: en preparación</p></div><div class="ticket__stub"><span>Tu viaje empieza acá</span><div class="barcode" aria-hidden="true"></div></div></div><p class="document-caption">El destino es tuyo.<br>La información, paso a paso.</p></div>`;
}
function navItems(page) {
  return (page.lang === 'en' ? EN_NAV : [...NAV, { label: 'EN', href: '/en/' }]).map(item => item.children
    ? `<li class="nav-group"><details><summary>${esc(tr(page, item.label))}</summary><div class="dropdown">${link({ label: tr(page, item.label), href: item.href })}${item.children.map(i => link({ ...i, label: tr(page, i.label) })).join('')}</div></details></li>`
    : `<li><a${['EN', 'ES'].includes(item.label) ? ' class="mono"' : ''} href="${item.href}"${item.href === page.path ? ' aria-current="page"' : ''}>${esc(tr(page, item.label))}</a></li>`).join('');
}
function header(page) {
  if (page.type === 'landing') return `<a class="skip-link" href="#main">Saltar al contenido</a><header class="header"><div class="container header__row"><a class="wordmark" href="/"><span aria-hidden="true"></span>visas.com.py</a>${waButton(page)}</div></header>`;
  return `<a class="skip-link" href="#main">${ui(page, 'Saltar al contenido', 'Skip to content')}</a><header class="header"><div class="container header__row"><a class="wordmark" href="${ui(page, '/', '/en/')}" aria-label="visas.com.py, ${ui(page, 'inicio', 'home')}"><span aria-hidden="true"></span>visas.com.py</a><nav class="desktop-nav" aria-label="${ui(page, 'Principal', 'Main navigation')}"><ul>${navItems(page)}</ul></nav>${waButton(page, 'WhatsApp', 'header__wa')}<button class="burger" type="button" aria-label="${ui(page, 'Abrir menú', 'Open menu')}" aria-controls="mobile-menu" aria-expanded="false"><span></span><span></span></button></div></header><dialog id="mobile-menu" class="mobile-menu" aria-label="${ui(page, 'Menú principal', 'Main menu')}"><div class="mobile-menu__top"><a class="wordmark" href="${ui(page, '/', '/en/')}"><span aria-hidden="true"></span>visas.com.py</a><button type="button" class="menu-close" aria-label="${ui(page, 'Cerrar menú', 'Close menu')}">×</button></div><nav aria-label="${ui(page, 'Principal móvil', 'Mobile navigation')}"><ul>${navItems(page)}</ul></nav>${waButton(page, ui(page, 'Escribinos por WhatsApp', 'Message us on WhatsApp'))}</dialog>`;
}
function footerStamps() {
 return '<div class="footer-stamps" aria-hidden="true">' + ['USA','CAN','ESP','AUS','PY'].map(code => '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36"/><circle cx="40" cy="40" r="29"/><text x="40" y="44" text-anchor="middle">' + code + '</text></svg>').join('') + '</div>';
}
function mobileBar(page) {
 return '<div class="mobile-wa">' + waButton(page, 'WhatsApp') + '<a class="button mobile-contact" href="' + ui(page, '/guias/', '/en/') + '">' + ui(page, 'Guías', 'Explore') + '</a></div>';
}
function footer(page) {
  if (page.type === 'landing') return `<footer class="footer section--ink"><div class="container">${footerStamps()}<p class="aviso">${esc(DISCLAIMER)}</p><a href="/privacidad/">Privacidad</a></div></footer>${mobileBar(page)}`;
  if (page.lang === 'en') return `<footer class="footer section--ink"><div class="container"><div class="footer__brand"><a class="wordmark" href="/en/">visas.com.py</a><p>Your next step, carefully prepared.</p></div>${footerStamps()}<div class="footer__grid"><div><h2 class="mono">Explore</h2><ul>${EN_NAV.map(i => `<li>${link(i)}</li>`).join('')}</ul></div><div><h2 class="mono">Contact</h2><p>Tell us your destination and the stage of your application.</p>${waButton(page, 'Message us on WhatsApp')}</div></div><p class="aviso">${esc(DISCLAIMER_EN)}</p><div class="footer__base"><span>\u00a9 ${new Date().getFullYear()} visas.com.py \u00b7 Paraguay</span><a href="/en/privacy/">Privacy</a></div></div></footer>${mobileBar(page)}`;

  return `<footer class="footer section--ink"><div class="container"><div class="footer__brand"><a class="wordmark" href="${ui(page, '/', '/en/')}"><span aria-hidden="true"></span>visas.com.py</a><p>${ui(page, 'Tu próximo paso, bien preparado.', 'Your next step, carefully prepared.')}</p></div>${footerStamps()}<div class="footer__grid">${FOOTER.map(col => `<div><h2 class="mono">${col.whatsapp ? ICONS["chat-bubbles"] : ""}${esc(tr(page, col.title))}</h2><ul>${col.links.map(i => `<li>${link({ ...i, label: tr(page, i.label) })}</li>`).join('')}</ul>${col.whatsapp ? waButton(page) : ''}${col.note ? `<p class="footer__note">${esc(tr(page, col.note))}</p>` : ''}</div>`).join('')}</div><p class="aviso">${esc(ui(page, DISCLAIMER, DISCLAIMER_EN))}</p><div class="footer__base"><span>© ${new Date().getFullYear()} visas.com.py · Paraguay</span><a href="/privacidad/">${tr(page, 'Privacidad')}</a></div></div></footer>${mobileBar(page)}`;
}
function hero(page) {
 const h=page.hero, home=page.type==='home', en=page.lang==='en';
 const trail=page.breadcrumbs || [{label:page.label,href:page.path}];
 const crumbs=home || page.type==='landing' ? '' : `<nav class="breadcrumbs" aria-label="${ui(page,'Ruta de navegación','Breadcrumbs')}"><a href="${ui(page,'/','/en/')}">${tr(page,'Inicio')}</a>${trail.map((b,i)=>`<span aria-hidden="true">/</span>${i===trail.length-1?`<span aria-current="page">${esc(b.label)}</span>`:link(b)}`).join('')}</nav>`;
 return `<section class="hero ${home?'hero--home':'hero--compact'}">${home?`<div class="hero-band-photo">${photo(h.image,true,h.imageAlt,true)}</div>`:''}<div class="container">${crumbs}<div class="hero__grid${h.image&&!home?' hero__grid--photo':''}"><div class="hero__copy"><p class="eyebrow">${esc(h.eyebrow)}</p><h1>${esc(h.title)}</h1><p class="lead">${esc(h.lead)}</p>${h.primary||h.secondary?`<div class="actions">${h.primary?waButton(page,home?h.primary:ui(page,'Consultar por WhatsApp','Ask on WhatsApp')):''}${h.secondary?`<a class="text-link" href="${esc(h.secondary.href)}">${esc(h.secondary.label)}</a>`:''}</div>`:''}${h.chips?`<ul class="proof-chips">${h.chips.map(c=>`<li>${check}${esc(c)}</li>`).join('')}</ul>`:''}${home?'<p class="illustration-note">Imagen ilustrativa. No representa clientes del sitio.</p>':''}</div>${home?boardingPass(h.image):h.image?`<figure class="hero__photo">${photo(h.image,true,h.imageAlt)}<figcaption>${ui(page,'Imagen ilustrativa; no representa clientes, equipo ni instalaciones del sitio.','Illustrative image; not evidence of clients, staff or premises.')}</figcaption></figure>`:''}</div></div></section>`;
}
const heading = s => `${s.eyebrow ? `<p class="eyebrow">${esc(s.eyebrow)}</p>` : ''}<h2>${esc(s.title)}</h2>${s.body ? `<p class="section-lead">${esc(s.body)}</p>` : ''}`;
function contact(s,page) {
 if(!CONTACT_FORM_ENABLED&&!page.forceForm)return `<div class="contact-layout"><div><h2>${ui(page,'Consultá por WhatsApp','Ask on WhatsApp')}</h2><p>${ui(page,'Contanos tu destino y en qué etapa estás. No envíes documentos sensibles.','Tell us your destination and the stage of your application. Do not send sensitive documents.')}</p>${waButton(page,ui(page,'Escribinos por WhatsApp','Message us on WhatsApp'))}<p class="form-note"><a href="${ui(page,'/privacidad/','/en/privacy/')}">${ui(page,'Privacidad','Privacy')}</a></p></div></div>`;
 return `<div class="contact-layout"><div class="contact-intro">${heading(s)}<p>${ui(page,'Podés usar un número paraguayo como 0981 123 456, o incluir el código internacional.','Use an international phone number, including the country code.')}</p><p>${ui(page,'Compartí una consulta general. No envíes pasaporte, contraseñas ni datos de pago.','Share a general enquiry. Do not send passports, passwords or payment details.')}</p></div><div><div class="ticket contact-ticket"><div class="ticket__main"><form method="post" action="/lead-forward.php" id="contact-form" data-lang="${page.lang==='en'?'en':'es'}"><p id="form-error" class="form-error" role="alert" tabindex="-1" hidden></p><div class="form-grid"><label>${ui(page,'Nombre (opcional)','Name (optional)')}<input name="nombre" maxlength="200" autocomplete="name"></label><label>${ui(page,'Teléfono (obligatorio)','Phone (required)')}<input name="telefono" type="tel" inputmode="tel" maxlength="30" autocomplete="tel" required aria-describedby="telefono-help"><small id="telefono-help">${ui(page,'Ej.: 0981 123 456 o +595 981 123456.','Example: +595 981 123456.')}</small></label><label>${ui(page,'Correo electrónico (opcional)','Email (optional)')}<input name="email" type="email" maxlength="254" autocomplete="email"></label><label>${ui(page,'Tipo de consulta','Enquiry type')}<select name="tipo_visa"><option value="">${ui(page,'Elegí una opción','Choose an option')}</option>${(page.lang==='en'?EN_VISA_OPTIONS:VISA_OPTIONS).map(o=>`<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select></label><label class="field-wide">${ui(page,'Mensaje (opcional)','Message (optional)')}<textarea name="mensaje" maxlength="5000" rows="4"></textarea></label></div><div class="honeypot" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><input type="hidden" name="lang" value="${page.lang==='en'?'en':'es'}"><input type="hidden" name="page_url" id="page_url"><input type="hidden" name="csrf"><input type="hidden" name="submission_id"><p class="form-note">${ui(page,'Usamos tus datos para atender esta consulta.','We use your details to handle this enquiry.')} <a href="${ui(page,'/privacidad/','/en/privacy/')}">${ui(page,'Privacidad','Privacy')}</a></p><button class="button button--ink" type="submit">${ui(page,'Enviar mi consulta','Send my enquiry')}</button><noscript><p>${ui(page,'Para abrir el formulario seguro sin JavaScript:','To open the secure form without JavaScript:')} <a href="/lead-forward.php?action=form&amp;lang=${page.lang==='en'?'en':'es'}">${ui(page,'Abrir formulario','Open form')}</a></p></noscript></form><div id="form-result" role="status" tabindex="-1" hidden></div></div><div class="ticket__stub"><span>${ui(page,'Tu consulta · Visas.com.py','Your enquiry · Visas.com.py')}</span>${plane}</div></div><div class="contact-alternative"><h3>${esc(s.alternative)}</h3><p>${esc(s.alternativeBody)}</p>${waButton(page,ui(page,'Escribinos por WhatsApp','Message us on WhatsApp'))}</div></div></div>`;
}
const BLOCKS = {
  destinations: s => `${heading(s)}<div class="destination-links">${s.items.map(i=>`<a href="${i.href}">${esc(i.title)} <span aria-hidden="true">↗</span></a>`).join('')}</div>`,
  bullets: s => `${heading(s)}<ul class="audience-list">${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`,
  comparison: s => `${heading(s)}<div class="comparison-wrap" role="region" aria-label="Comparación de servicios" tabindex="0"><table class="comparison"><caption>Preparación según tu situación</caption><thead><tr>${s.columns.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${s.rows.map(row => `<tr>${row.map((cell, n) => n === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
  article: s => `<div class="guide-layout"><aside class="guide-toc"><nav aria-label="Índice de la guía"><p class="mono">${esc(s.title)}</p><ol>${s.items.map(i => `<li><a href="#${esc(i.id)}">${esc(i.title)}</a></li>`).join('')}</ol></nav></aside><article class="guide-article">${s.printable ? '<button type="button" class="button print-button" data-print>Imprimir esta lista</button>' : ''}${s.items.map((i, n) => `<section id="${esc(i.id)}"><h2>${esc(i.title)}</h2>${i.checkboxes ? `<ul class="print-checklist">${i.checkboxes.map(item => `<li><span class="print-box" aria-hidden="true"></span><span>${esc(item)}</span></li>`).join('')}</ul>` : ''}${i.rows ? `<table class="cost-table"><caption>Conceptos separados en tu presupuesto</caption><thead><tr><th scope="col">Concepto</th><th scope="col">Importe o criterio</th></tr></thead><tbody>${i.rows.map(row=>`<tr><th scope="row">${esc(row[0])}</th><td>${esc(row[1])}</td></tr>`).join('')}</tbody></table>` : ''}${i.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}${(i.links || []).map(link).join('')}</section>${n === 2 ? `<aside class="guide-inline-cta"><p>${esc(s.inline.body)}</p>${link(s.inline)}</aside>` : ''}`).join('')}</article></div>`,
  services: (s, page) => `${heading(s)}${s.groups ? s.groups.map(g => `<div class="service-group"><h3 class="eyebrow">${esc(g.title)}</h3><p class="section-lead">${esc(g.body)}</p><div class="service-grid">${g.items.map((item, index) => ticket(item, index, page)).join('')}</div></div>`).join('') : `<div class="service-grid">${s.items.map((item, index) => ticket(item, index, page)).join('')}</div>`}`,
  route: s => `${heading(s)}<ol class="ruta">${s.items.map((i, n) => `<li class="reveal" style="--i:${n}"><span class="ruta__number">${String(n + 1).padStart(2, '0')}</span><div>${ICONS[i.icon] || ICONS[["chat-bubbles","passport","calendar","shield-check","check-circle"][n % 5]]}<h3>${esc(i.title)}</h3><p>${esc(i.body)}</p></div></li>`).join('')}</ol>`,
  checklist: s => `<div class="split"><div class="sticky-heading">${heading(s)}${s.image ? photo(s.image) : ""}</div><ul class="checklist">${s.items.map(i => `<li class="reveal"><span class="check-circle">${check}</span><div>${i.label ? `<p class="mono">${esc(i.label)}</p>` : ''}<h3>${esc(i.title)}</h3><p>${esc(i.body)}</p></div></li>`).join('')}</ul></div>`,
  faq: s => `<div class="split"><div>${heading(s)}</div><div class="faq">${s.items.map(i => `<details><summary>${esc(i.question)}<span class="faq__toggle" aria-hidden="true"></span></summary><p>${esc(i.answer)}</p></details>`).join('')}</div></div>`,
  cta: (s, page) => `<div class="cta-layout"><div><p class="mono">${ui(page, 'Tu próximo paso', 'Your next step')}</p>${heading(s)}</div><div class="actions">${waButton(page, s.label)}${page.lang === 'en' ? '<a href="/en/contact/">contact options <span aria-hidden="true">↗</span></a>' : '<a href="/contacto/">opciones de contacto <span aria-hidden="true">\u2197</span></a>'}</div></div>`,
  contact,
  prose: s => `<div class="prose">${s.title ? heading(s) : ''}${s.items.map(i => `<section><h2>${esc(i.title)}</h2><p>${esc(i.body)}</p>${(i.links || []).map(link).join('')}</section>`).join('')}</div>`,
};
function relatedBlock(page) {
  const cards = relatedPaths(page).map(path => {
    const target = PAGES.find(p => p.path === path);
    if (!target) throw new Error('Unknown related route: ' + path);
    return { href: path, title: target.label, body: '', eyebrow: '', tag: ui(page, 'Explorá', 'Explore') };
  });
  return '<section class="section related-pages" aria-labelledby="related-title"><div class="container"><h2 id="related-title">' + ui(page, 'También te puede interesar', 'You may also need') + '</h2><div class="service-grid">' + cards.map((card, index) => ticket(card, index, page).replace('ticket service-ticket', 'ticket related-ticket')).join('') + '</div></div></section>';
}
function sections(page) {
  const hasRelated = page.type === 'service' || page.type === 'guide' || page.path === '/visa-americana/';
  let relatedInserted = false;
  const result = page.sections.map(s => {
    if (!BLOCKS[s.type]) throw new Error(`Unknown section type: ${s.type}`);
    const related = hasRelated && s.type === 'cta' && !relatedInserted ? relatedBlock(page) : '';
    if (related) relatedInserted = true;
    const tone = s.type === 'cta' || (page.type === 'home' && s.type === 'cards') ? 'ink' : s.tone;
    return `${related}<section${s.id ? ` id="${esc(s.id)}"` : ''} class="section${tone ? ` section--${esc(tone)}` : ''}${s.type === 'contact' ? ' section--contact' : ''}${s.type === 'cta' ? ' cta-band' : ''}${page.type === 'home' && s.type === 'cards' ? ' problem-section' : ''}"><div class="container">${BLOCKS[s.type](s, page)}</div></section>`;
  }).join('\n');
  return result + (page.sources ? `<section class="section sources"><div class="container"><h2>${ui(page,'Fuentes oficiales','Official sources')}</h2>${page.updated?`<p>${ui(page,'Contenido actualizado','Content updated')}: <time datetime="${page.updated}">${page.updated}</time> · ${ui(page,'Edición de visas.com.py','visas.com.py editorial revision')}</p>`:''}<p>${ui(page,'Revisá las instrucciones vigentes de tu trámite antes de pagar o presentar documentos.','Check the current instructions for your application before paying or submitting documents.')}</p><ul>${page.sources.map(i=>`<li>${link(i)}</li>`).join('')}</ul></div></section>` : '') + (hasRelated && !relatedInserted ? relatedBlock(page) : '');
}
const isService = page => page.type === 'service' || page.path === '/visa-americana/';
function serviceDisclaimer(page) {
  if (!isService(page) && page.type !== 'landing') return '';
  if (page.lang === 'en') return `<div class="container service-aviso"><p class="aviso">${esc(DISCLAIMER_EN)}</p></div>`;
  return `<div class="container service-aviso"><p class="aviso" lang="es">${esc(DISCLAIMER)}</p></div>`;
}
const PAGE_TYPES = Object.fromEntries(['landing', 'en-index', 'home', 'service', 'hub', 'guide', 'faq', 'simple'].map(type => [type, page => hero(page) + sections(page) + serviceDisclaimer(page)]));
function schemas(page) {
  const url = SITE + page.path;
  const graph = [{ '@type': 'Organization', '@id': SITE + '/#organization', name: 'visas.com.py', url: SITE + '/', logo: SITE + assets.icon }];
  if (page.type === 'home') graph.push(
    { '@type': 'WebSite', '@id': SITE + '/#website', name: 'visas.com.py', url: SITE + '/', inLanguage: 'es', publisher: { '@id': SITE + '/#organization' } },
  );
  graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: tr(page, 'Inicio'), item: SITE + ui(page, '/', '/en/') }, ...(page.type === 'home' ? [] : (page.breadcrumbs || [{ label: page.label, href: page.path }]).map((b, i) => ({ '@type': 'ListItem', position: i + 2, name: b.label, item: SITE + b.href })))] });
  if (page.lang === 'en' && !isService(page)) graph.push({ '@type': 'WebPage', name: page.title, url, inLanguage: 'en' });
  const faq = page.sections.filter(s => s.type === 'faq').flatMap(s => s.items);
  if (faq.length) graph.push({ '@type': 'FAQPage', mainEntity: faq.map(i => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })) });
  if (isService(page)) graph.push({ '@type': 'WebPage', name: page.hero.title, description: page.description, url, inLanguage: page.lang || 'es' });
  if (page.type === 'guide') graph.push({ '@type': 'Article', headline: page.hero.title, description: page.description, mainEntityOfPage: url, inLanguage: page.lang || 'es', dateModified: page.updated, author: { '@type': 'Organization', '@id': SITE + '/#organization', name: 'visas.com.py' }, publisher: { '@id': SITE + '/#organization' } });
  return `<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}
function headExtras(page) {
 const og = page.lang === 'en' ? 'og-visas-en.jpg' : 'og-visas-com-py.jpg';
 let head = '<meta property="og:image" content="' + SITE + asset('assets/img/' + og) + '"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">';
 if (page.type === 'landing') head += '<meta name="robots" content="noindex, follow">';
 if (page.printable) head += '<style>@media print { .print-button { display: none !important; } }</style>';
 if (page.path === '/') {
  const source = photo(page.hero.image, true, undefined, true).match(/<source type="image\/avif" srcset="([^"]+)" sizes="([^"]+)"/);
  head += '<link rel="preload" as="image" type="image/avif" href="/assets/img/' + page.hero.image + '-1280.avif" imagesrcset="' + source[1] + '" imagesizes="' + source[2] + '">';
 }
 if (ANALYTICS_ID) head += '<meta name="analytics-id" content="' + esc(ANALYTICS_ID) + '">';
 if (page.sitemap === false && page.type !== 'landing') head += '<meta name="robots" content="noindex, follow">';
 return head;
}
function render(page) {
  if (!PAGE_TYPES[page.type]) throw new Error(`Unknown page type: ${page.type}`);
  return `<!doctype html>
<html lang="${esc(page.lang || 'es')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${SITE}${page.path}"><meta property="og:type" content="${page.type === 'guide' ? 'article' : 'website'}"><meta property="og:locale" content="${page.lang === 'en' ? 'en_US' : 'es_PY'}"><meta property="og:site_name" content="visas.com.py"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${SITE}${page.path}"><meta name="theme-color" content="#F6F1E7"><link rel="icon" type="image/svg+xml" href="${assets.icon}"><link rel="preload" href="/assets/fonts/manrope-latin.woff2?v=fc89b9bf3a" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/fraunces-latin.woff2?v=ba86cdf481" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${assets.css}">${(page.alternates || []).map(a => `<link rel="alternate" hreflang="${esc(a.lang)}" href="${SITE}${esc(a.path)}">`).join('')}${schemas(page)}${headExtras(page)}</head>
<body data-page-type="${page.type}">${header(page)}<main id="main" tabindex="-1">${PAGE_TYPES[page.type](page)}</main>${footer(page)}${waMenu(page)}<button class="privacy-settings" type="button" data-privacy-settings hidden>${ui(page,'Preferencias de privacidad','Privacy settings')}</button><div class="consent-panel" data-consent hidden role="region" aria-label="${ui(page,'Analítica opcional','Optional analytics')}"><p>${ui(page,'¿Permitir estadísticas de uso? Es opcional y no incluye tu consulta ni teléfono.','Allow usage statistics? Optional; your enquiry and phone are not included.')}</p><button type="button" data-consent-choice="yes">${ui(page,'Aceptar','Allow')}</button><button type="button" data-consent-choice="no">${ui(page,'Solo lo necesario','Necessary only')}</button></div><script src="${assets.js}" defer></script></body></html>\n`;
}
// Validate the whole batch before writing; only records determine output routes.
const seenPaths = new Set(), seenTitles = new Set();
const rendered = PAGES.map(page => {
  if (!/^\/(?:[a-z0-9-]+\/)*(?:[a-z0-9-]+\.html)?$/.test(page.path)) throw new Error(`Invalid path: ${page.path}`);
  if (seenPaths.has(page.path) || seenTitles.has(page.title)) throw new Error(`Duplicate page: ${page.path}`);
  if (!page.title || page.title.length >= 60 || !page.description || page.description.length >= 155) throw new Error(`Metadata length: ${page.path}`);
  seenPaths.add(page.path); seenTitles.add(page.title);
  const html = render(page);
  const forbidden = /garantizada|garantizamos|garantiza|100%|aprobacion\s+segura|somos la embajada|abogado/i;
  if (forbidden.test(html.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) throw new Error(`Forbidden wording: ${page.path}`);
  return { file: page.path === '/' ? 'index.html' : page.path.endsWith('.html') ? page.path.slice(1) : `${page.path.slice(1)}index.html`, html };
});
for (const { file, html } of rendered) {
  const target = join(ROOT, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, 'utf8');
  console.log(`wrote ${file}`);
}
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.filter(p => p.sitemap !== false).map(p => `  <url><loc>${esc(SITE + p.path)}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('wrote sitemap.xml and robots.txt');
mkdirSync(join(ROOT,'lib/forms'),{recursive:true});
for(const [lang,path]of [['es','/contacto/'],['en','/en/contact/']])writeFileSync(join(ROOT,'lib/forms',lang+'.html'),render({...PAGES.find(p=>p.path===path),forceForm:true}));

function waMenu(page) {
  if (page.lang === 'en' || page.type !== 'home') return '';
  const selected = page.waDefault || WA_MENU[0].id;
  const options = [...WA_MENU].sort((a, b) => Number(b.id === selected) - Number(a.id === selected));
  return `<dialog id="wa-menu" class="wa-menu" role="dialog" aria-modal="true" aria-labelledby="wa-menu-title"><div class="wa-menu__top"><div><p class="eyebrow">Tu próximo paso · WhatsApp</p><h2 id="wa-menu-title">¿Qué querés consultar?</h2></div><button type="button" class="wa-menu__close" aria-label="Cerrar consultas">×</button></div><div class="wa-menu__options">${options.map(o => `<a data-wa-option="${o.id}" class="wa-menu__option${o.id === selected ? ' is-default' : ''}${o.id === 'otra' ? ' wa-menu__plain' : ''}" href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(o.text(page.waContext || page.label))}" target="_blank" rel="noopener">${esc(o.label)}</a>`).join('')}</div></dialog>`;
}
