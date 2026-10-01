import csv, json, re, sys, collections
from urllib.parse import urlparse, urljoin, urldefrag
from playwright.sync_api import sync_playwright
HOST='visas.com.py'; BASE='https://'+HOST
OUT='out/snapshot'
seeds=[l.strip() for l in open('work_sitemap.txt') if l.strip()]
SKIP=re.compile(r'\.(css|js|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|pdf|xml|txt|json|zip|mp4)$',re.I)
blocked=collections.Counter()
def norm(u):
    u,_=urldefrag(u); return u
queue=list(dict.fromkeys(norm(s) for s in seeds+[BASE+'/']))
seen=set(queue); rows=[]; stats=[]; nonhtml_links=set(); extlinks=collections.defaultdict(set)
JS='''()=>{
 const q=s=>[...document.querySelectorAll(s)];
 const m=n=>{const e=document.querySelector(`meta[name="${n}"]`);return e?e.content:''};
 const can=document.querySelector('link[rel=canonical]');
 return {title:document.title, desc:m('description'), canonical:can?can.href:'',
  hreflang:q('link[rel=alternate][hreflang]').map(e=>e.hreflang+'='+e.href),
  robots:m('robots'), h1:q('h1').map(e=>e.textContent.trim().replace(/\s+/g,' ')),
  jsonld:q('script[type="application/ld+json"]').map(e=>e.textContent.trim()),
  links:q('a[href]').map(e=>e.href),
  forms:q('form').length}
}'''
with sync_playwright() as p:
    b=p.chromium.launch()
    ctx=b.new_context(viewport={'width':1366,'height':900})
    def route(r):
        h=urlparse(r.request.url).hostname or ''
        if h==HOST or r.request.url.startswith('data:'): r.continue_()
        else: blocked[h]+=1; r.abort()
    ctx.route('**/*',route)
    i=0
    while i<len(queue):
        url=queue[i]; i+=1
        pg=ctx.new_page(); reqs=[]
        pg.on('requestfinished',lambda rq: reqs.append(rq))
        try:
            resp=pg.goto(url,wait_until='networkidle',timeout=45000)
        except Exception as e:
            rows.append({'url':url,'status':'ERR '+str(e)[:80]}); pg.close(); continue
        chain=[]; rq=resp.request.redirected_from
        hops=[]
        while rq: hops.append(rq); rq=rq.redirected_from
        for h in reversed(hops):
            r=h.response(); chain.append(f"{r.status if r else '?'} {h.url}")
        d=pg.evaluate(JS)
        ct=resp.headers.get('content-type','')
        internal=[]
        for l in d['links']:
            l=norm(l); pu=urlparse(l)
            if pu.scheme not in('http','https'): continue
            if pu.hostname in(HOST,'www.'+HOST):
                internal.append(l)
            else:
                extlinks[pu.hostname].add(l)
        uniq=list(dict.fromkeys(internal))
        wa=sum(1 for l in d['links'] if re.search(r'//(wa\.me|api\.whatsapp\.com)/',l))
        for l in uniq:
            pu=urlparse(l)
            if SKIP.search(pu.path): nonhtml_links.add(l); continue
            if pu.hostname==HOST and l not in seen:
                seen.add(l); queue.append(l)
        tot=0
        for q in reqs:
            try: s=q.sizes(); tot+=s['responseBodySize']+s['responseHeadersSize']
            except Exception: pass
        stats.append({'url':url,'requests':len(reqs),'transfer_kb':round(tot/1024,1),'rendered_dom_forms':d['forms']})
        rows.append({'url':url,'final_url':pg.url,'status':resp.status,'redirect_chain':' > '.join(chain),
          'title':d['title'],'meta_description':d['desc'],'canonical':d['canonical'],'hreflang':' | '.join(d['hreflang']),
          'robots_meta':d['robots'],'h1':' | '.join(d['h1']),'jsonld_blocks':len(d['jsonld']),
          'jsonld':json.dumps(d['jsonld'],ensure_ascii=False),'internal_links_count':len(uniq),
          'internal_links':' | '.join(uniq),'whatsapp_links':wa,'in_sitemap':url in seeds})
        pg.close()
    b.close()
cols=['url','final_url','status','redirect_chain','title','meta_description','canonical','hreflang','robots_meta','h1','jsonld_blocks','jsonld','internal_links_count','internal_links','whatsapp_links','in_sitemap']
with open(OUT+'/urls.csv','w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=cols,extrasaction='ignore'); w.writeheader(); [w.writerow(r) for r in rows]
json.dump({'blocked_third_party_requests':blocked,'external_link_hosts':{k:sorted(v) for k,v in extlinks.items()},'nonhtml_internal_links':sorted(nonhtml_links),'stats':stats},open('crawl_extra.json','w'),indent=1)
print(len(rows),'urls crawled; blocked:',dict(blocked))
print('not in sitemap:',[r['url'] for r in rows if not r.get('in_sitemap')])
