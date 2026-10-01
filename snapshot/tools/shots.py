import csv, os, json
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
S='out/snapshot'; HOST='visas.com.py'
urls=[r['url'] for r in csv.DictReader(open(S+'/urls.csv',encoding='utf-8'))]
shotpages={'/':'home','/visa-americana/':'visa-americana','/guias/como-llenar-el-ds-160/':'guia-ds160','/en/':'en-home'}
rows=[]; missing=set(); thirdparty=set()
with sync_playwright() as p:
    b=p.chromium.launch()
    for u in urls:
        path=urlparse(u).path
        for kind,vp,mobile in (('desktop',{'width':1366,'height':900},False),('mobile',{'width':390,'height':844},True)):
            if kind=='mobile' and path not in shotpages: continue
            ctx=b.new_context(viewport=vp,is_mobile=mobile,has_touch=mobile,device_scale_factor=1)
            def route(r):
                if urlparse(r.request.url).hostname==HOST: r.continue_()
                else: thirdparty.add(urlparse(r.request.url).hostname); r.abort()
            ctx.route('**/*',route)
            pg=ctx.new_page(); reqs=[]
            pg.on('requestfinished',lambda rq: reqs.append(rq))
            pg.goto(u,wait_until='networkidle')
            if path in shotpages:
                h=pg.evaluate('document.documentElement.scrollHeight')
                for y in range(0,h,600): pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(120)
                pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(500)
                pg.screenshot(path=f'{S}/shots/{shotpages[path]}-{kind}.png',full_page=True)
            if kind=='desktop':
                tot=0; types={}
                for q in reqs:
                    try: s=q.sizes(); n=s['responseBodySize']+s['responseHeadersSize']
                    except Exception: n=0
                    tot+=n; types[q.resource_type]=types.get(q.resource_type,0)+1
                    qp=urlparse(q.url).path
                    if urlparse(q.url).hostname==HOST and q.resource_type!='document':
                        f=os.path.join(S,'site',qp.lstrip('/'))
                        if not os.path.isfile(f): missing.add(qp)
                rows.append({'url':path,'requests':len(reqs),'transfer_kb':round(tot/1024,1),'by_type':json.dumps(types)})
            ctx.close()
    b.close()
with open(S+'/pageweight.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=['url','requests','transfer_kb','by_type']); w.writeheader(); w.writerows(rows)
print('missing from mirror:',missing,'blocked hosts:',thirdparty)
r=sorted(rows,key=lambda x:-x['transfer_kb']); print('max',r[0],'min',r[-1]); print('avg req',sum(x['requests'] for x in rows)/len(rows),'avg kb',sum(x['transfer_kb'] for x in rows)/len(rows))
