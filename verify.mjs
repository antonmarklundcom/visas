import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {PAGES,SITE,WA_NUMBER,LANGUAGE_PAIRS} from './content.mjs';
const ROOT=import.meta.dirname;
const expected=PAGES.map(p=>p.path);
export const ROUTES=expected;
const fileFor=route=>route==='/'?'index.html':route.endsWith('/')?route.slice(1)+'index.html':route.slice(1);
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const failures=[];const check=(ok,message)=>{if(!ok)failures.push(message);};const titles=new Set();
check(JSON.stringify([...expected].sort())===JSON.stringify(PAGES.map(p=>p.path).sort()),'Route inventory changed unexpectedly');
check(new Set(expected).size===expected.length,'Unique routes');
for(const route of expected)check(/^\/[a-z0-9/.-]*$/.test(route),'Invalid route '+route);
const pages=new Map(expected.map(r=>[r,fs.readFileSync(path.join(ROOT,fileFor(r)),'utf8')]));let assets=new Set();
for(const p of PAGES){const h=pages.get(p.path);if(!h)continue;const prefix=p.path+': ';
 check((h.match(/<h1\b/g)||[]).length===1,prefix+'one H1');const title=h.match(/<title>(.*?)<\/title>/s)?.[1];check(title&&!titles.has(title),prefix+'unique title');titles.add(title);
 check(h.includes(`href="${SITE+p.path}"`),prefix+'canonical');check(h.includes('<meta name="description" content="'),prefix+'description');check(h.includes('id="main"'),prefix+'main target');
 check(!/pr\?ximo|\?Qu\? quer|\uFFFD/.test(h),prefix+'encoding corruption');
 check(!h.includes('"@type":"Service"'),prefix+'no unverified service schema');
 check(!/alt="(?:Asesor|Oficina de asesor)|with an advisor/.test(h),prefix+'illustrative image semantics');
 check(!/Revisamos|Ordenamos|Conversamos|Completamos|Practicamos|We help|We review|We check|La entrevista, cuando corresponda/.test(h),prefix+'information-only copy');
 check(!/durante la entrevista\.|during the interview\./.test(h),prefix+'overbroad decision timing');
 check(h.includes(`lang="${p.lang||'es'}"`),prefix+'language');
 if(p.sitemap!==false)check(!/<meta name="robots" content="noindex/.test(h),prefix+'public page indexable');
 for(const match of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){try{const obj=JSON.parse(match[1]);check(obj['@graph'].length>0,prefix+'schema graph');}catch{check(false,prefix+'invalid JSON-LD');}}
 for(const m of h.matchAll(/<a\b[^>]*href="([^"]+)"/g)){
  const href=decode(m[1]);if(href.startsWith('#')){check(h.includes('id="'+href.slice(1)+'"'),prefix+'missing anchor '+href);continue;}
  if(href.startsWith('https://wa.me/')){
   const target=new URL(href),message=target.searchParams.get('text')||'';
   check(target.pathname==='/'+WA_NUMBER,prefix+'WhatsApp recipient');
   check(message.includes('visas.com.py')&&message.includes(SITE+p.path),prefix+'WhatsApp website and source page');
   check(message.includes(p.waContext||p.label||p.hero.title),prefix+'WhatsApp page topic');
  }
  if(!href.startsWith('/'))continue;const target=href.split(/[?#]/)[0];check(target==='/lead-forward.php'||pages.has(target),prefix+'broken internal link '+target);
 }
 for(const m of h.matchAll(/(?:src|href)="(\/assets\/[^"?]+)(?:\?[^\"]*)?"/g))assets.add(m[1]);
 for(const m of h.matchAll(/srcset="([^"]+)"/g))for(const f of m[1].split(','))assets.add(f.trim().split(' ')[0].split('?')[0]);
 for(const m of h.matchAll(/<img\b[^>]*>/g)){check(/alt="[^"]+"/.test(m[0])&&/width="\d+"/.test(m[0])&&/height="\d+"/.test(m[0]),prefix+'image semantics');}
 if(p.hero.image)check(/<img[^>]*loading="eager"[^>]*fetchpriority="high"/.test(h),prefix+'hero priority');
 if(p.type==='guide'){const a=p.sections.find(s=>s.type==='article');check(a.items.length>=3,prefix+'guide sections');check(a.items.every(i=>i.paragraphs.length&&i.id),prefix+'guide coverage');check(h.includes('Fuentes oficiales')&&h.includes(`<time datetime="${p.updated}">`),prefix+'source and date');}
 if(p.type==='service')check(h.includes('Official sources')||h.includes('Fuentes oficiales'),prefix+'official sources');
 if(p.type==='home'){check(h.includes('¿Qué querés consultar?')&&h.includes('Cerrar consultas">×'),prefix+'dialog text');check((h.match(/class="ticket service-ticket/g)||[]).length===3,prefix+'three primary paths');}
 else check(!h.includes('data-wa-trigger'),prefix+'direct WhatsApp');
 if(h.includes('<form')){check(h.includes('name="csrf"')&&h.includes('name="submission_id"'),prefix+'secure form fields');check(h.includes('<option value="">'),prefix+'neutral topic');check(h.includes(p.lang==='en'?'href="/en/privacy/"':'href="/privacidad/"'),prefix+'privacy link');}
}
for(const a of assets)check(fs.existsSync(path.join(ROOT,a)), 'missing asset '+a);
for(const [es,en] of LANGUAGE_PAIRS)for(const route of [es,en]){const h=pages.get(route)||'';for(const [lang,r] of [['es',es],['en',en],['x-default',es]])check(h.includes(`hreflang="${lang}" href="${SITE+r}"`),route+' reciprocal hreflang');}
const sitemap=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.deepEqual(urls.sort(),PAGES.filter(p=>p.sitemap!==false).map(p=>SITE+p.path).sort());
check(!fs.readFileSync(path.join(ROOT,'robots.txt'),'utf8').includes('Disallow: /'),'robots allow crawling');
check(!fs.readFileSync(path.join(ROOT,'build-site.mjs'),'utf8').includes('C:/Claude 1/webimg'),'portable build');
check(!fs.readFileSync(path.join(ROOT,'lead-forward.php'),'utf8').includes('API_KEY_FALLBACK'),'no key in handler');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`PASS: ${pages.size} routes, ${urls.length} sitemap entries, ${assets.size} assets; metadata, links, sources, language, forms, hero loading and audit regressions.`);
