import csv, re, os, subprocess, json
from urllib.parse import urlparse, urljoin, urldefrag
B='https://visas.com.py'; S='out/snapshot/site'
def curl(url, dest):
    os.makedirs(os.path.dirname(dest),exist_ok=True)
    r=subprocess.run(['curl','-sS','--max-time','60','-o',dest,'-w','%{http_code}',url],capture_output=True,text=True)
    return r.stdout.strip()
urls=[r['url'] for r in csv.DictReader(open('out/snapshot/urls.csv',encoding='utf-8'))]
log=[]; assets=set(); ext_res=set()
def dest_for(path):
    return os.path.join(S, path.lstrip('/'),'index.html') if path.endswith('/') else os.path.join(S,path.lstrip('/'))
def refs(text, base):
    out=set()
    for m in re.finditer(r'''(?:href|src|poster|data-src)\s*=\s*["']([^"']+)["']''',text): out.add(m.group(1))
    for m in re.finditer(r'''<meta[^>]+(?:og:image|twitter:image)[^>]*content\s*=\s*["']([^"']+)["']''',text): out.add(m.group(1))
    for m in re.finditer(r'''srcset\s*=\s*["']([^"']+)["']''',text):
        for part in m.group(1).split(','): out.add(part.strip().split(' ')[0])
    for m in re.finditer(r'url\(\s*["\']?([^"\')]+)',text): out.add(m.group(1))
    for m in re.finditer(r'@import\s+["\']([^"\']+)',text): out.add(m.group(1))
    for m in re.finditer(r'["\'](/(?:assets|img|images|fonts|css|js)[^"\'\s<>)]+)["\']',text): out.add(m.group(1))
    for m in re.finditer(r'https://visas\.com\.py(/[^"\'\s<>\)]*)',text): out.add(m.group(0))
    return out
pages=urls+[B+'/404.html']
for u in pages:
    p=urlparse(u).path; d=dest_for(p); code=curl(u,d); log.append((u,code))
for f in ['robots.txt','sitemap.xml']:
    log.append((B+'/'+f,curl(B+'/'+f,os.path.join(S,f))))
# gather asset refs
todo=[]
def scan(file,base):
    t=open(file,encoding='utf-8',errors='ignore').read()
    for r in refs(t,base):
        r=urldefrag(r)[0]
        if not r or r.startswith(('mailto:','tel:','data:','javascript:','#')): continue
        a=urljoin(base,r); pu=urlparse(a)
        if pu.hostname!='visas.com.py':
            continue
        if pu.path.endswith('/') or not re.search(r'\.(css|js|svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|pdf|webmanifest|json|mp4|webm|txt|xml)$',pu.path,re.I): continue
        if re.search(r'\.(html?)$',pu.path): continue
        if pu.path not in assets: assets.add(pu.path); todo.append(pu.path)
for u in pages: scan(dest_for(urlparse(u).path),u)
done=set()
while todo:
    p=todo.pop(); 
    if p in done: continue
    done.add(p); d=os.path.join(S,p.lstrip('/')); code=curl(B+p,d); log.append((B+p,code))
    if re.search(r'\.(css|js|svg|webmanifest|json)$',p): scan(d,B+p)
# external resource hosts referenced by loaded resources (script/link/img/iframe/css url)
hosts={}
for root,_,fs in os.walk(S):
    for f in fs:
        fp=os.path.join(root,f); 
        if not re.search(r'\.(html|css|js|svg)$',f): continue
        t=open(fp,encoding='utf-8',errors='ignore').read()
        for m in re.finditer(r'<(script|link|img|iframe|source|video|audio)\b[^>]*?(?:src|href)\s*=\s*["\'](https?://(?!visas\.com\.py)[^"\']+)',t):
            if m.group(1)=='link' and not re.search(r'rel=["\'](stylesheet|preload|preconnect|dns-prefetch|icon|prefetch)',m.group(0)): continue
            hosts.setdefault(urlparse(m.group(2)).hostname,set()).add(os.path.relpath(fp,S)+' <'+m.group(1)+'>')
        if f.endswith(('.css','.js')):
            for m in re.finditer(r'https?://(?!visas\.com\.py)([a-z0-9.-]+\.[a-z]{2,})[^"\'\s)]*',t):
                hosts.setdefault(m.group(1),set()).add(os.path.relpath(fp,S)+' (string in file)')
json.dump({'log':log,'assets':sorted(assets),'thirdparty':{k:sorted(v) for k,v in hosts.items()}},open('mirror_extra.json','w'),indent=1)
bad=[x for x in log if x[1]!='200']
print(len(log),'fetched; non-200:',bad); print('assets:',len(assets)); print({k:len(v) for k,v in hosts.items()})
