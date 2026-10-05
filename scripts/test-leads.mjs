import { createServer } from 'node:http';
import { fetchLocal as fetch } from './local-test-http.mjs';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
const storage=await mkdtemp(path.join(tmpdir(),'visas-tests-'));
let mode='ok',calls=0,last;
const mock=createServer(async(req,res)=>{let raw='';for await(const chunk of req)raw+=chunk;calls++;last=JSON.parse(raw);assert.equal(req.headers['x-api-key'],'local-test-only');res.setHeader('Content-Type','application/json');if(mode==='timeout'){setTimeout(()=>res.end('{}'),9500).unref();return;}if(mode==='bad'){res.end('{}');return;}if(mode==='fail'){res.statusCode=422;res.end('{"error":"test"}');return;}res.statusCode=201;res.end('{"contactId":"test-contact","submissionId":"test-submission","dealId":"test-deal"}');});
await new Promise(r=>mock.listen(0,'127.0.0.1',r));
const port=8878,base=`http://127.0.0.1:${port}`;
const php=spawn('php',['-S',`127.0.0.1:${port}`,'router.php'],{env:{...process.env,VISAS_STORAGE_DIR:storage,VISAS_CONFIG_FILE:path.join(storage,'none.php'),VENDERCRM_API_KEY:'local-test-only',VENDERCRM_URL:`http://127.0.0.1:${mock.address().port}`,VISAS_TEST_MODE:'1'},stdio:'ignore'});
let count=0;const check=(name,fn)=>fn().then(()=>{count++;console.log('PASS '+name);});
try{
 for(let i=0;i<40;i++){try{await fetch(base);break;}catch{await new Promise(r=>setTimeout(r,100));}}
 const tokenResponse=await fetch(base+'/lead-forward.php?action=token');const cookie=tokenResponse.headers.get('set-cookie').split(';')[0];const token=await tokenResponse.json();
 const data={...token,telefono:'0995 000 000',nombre:'Local test',email:'test@example.invalid',mensaje:'Synthetic integration test',tipo_visa:'Turista EE.UU.',lang:'es',page_url:'https://visas.com.py/contacto/?secret=removed'};
 async function post(changes={},json=true){const r=await fetch(base+'/lead-forward.php',{method:'POST',headers:{Cookie:cookie,Accept:json?'application/json':'text/html','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({...data,...changes})});return [r.status,json?await r.json():await r.text()];}
 const reset=()=>rm(path.join(storage,'rate.json'),{force:true});
 await check('CSRF rejected',async()=>assert.equal((await post({csrf:'bad'}))[0],403));
 await check('Phone rejected',async()=>assert.equal((await post({telefono:'123'}))[0],422));
 await check('Invalid email rejected',async()=>assert.equal((await post({email:'bad'}))[0],422));
 await check('Honeypot rejected',async()=>assert.equal((await post({website:'spam'}))[0],422));
 await check('CRM accepted, normalized, URL minimized',async()=>{const [status,b]=await post();assert.equal(status,200);assert.equal(b.status,'delivered');assert.equal(last.phone,'+595995000000');assert.equal(last.page_url,'https://visas.com.py/contacto/');const wa=new URL(b.whatsapp_url),text=wa.searchParams.get('text');assert.equal(wa.pathname,'/595992279599');assert(text.includes('visas.com.py')&&text.includes(last.page_url)&&text.includes(data.tipo_visa)&&text.includes(b.reference));assert(!text.includes('secret=removed'));});
 await check('Retry is duplicate with no extra CRM call',async()=>{const before=calls;assert.equal((await post())[1].duplicate,true);assert.equal(calls,before);});
 await check('Different enquiry gets separate id',async()=>{const old=last.idempotency_key;assert.equal((await post({mensaje:'Second enquiry'}))[1].status,'delivered');assert.notEqual(last.idempotency_key,old);});
 await reset();await check('No-JS receipt has contextual WhatsApp in Spanish and English',async()=>{for(const lang of ['es','en']){const [status,html]=await post({lang,page_url:lang==='en'?'':data.page_url,mensaje:'No-JS synthetic '+lang},false);assert.equal(status,200);const wa=new URL(html.match(/href="(https:\/\/wa.me\/[^\"]+)"/)[1].replaceAll('&amp;','&')),text=wa.searchParams.get('text');assert.equal(wa.pathname,'/595992279599');assert(text.includes(lang==='en'?'https://visas.com.py/en/contact/':'https://visas.com.py/contacto/')&&text.includes(data.tipo_visa));assert(text.includes(lang==='en'?'Hi! I found visas.com.py':'Hola! Vengo de visas.com.py'));assert(!text.includes('secret=removed'));}});
 await reset();mode='bad';
 await check('HTTP 201 without receipt stays pending',async()=>{const [s,b]=await post({mensaje:'Bad receipt'});assert.equal(s,202);assert.equal(b.status,'pending');});
 mode='fail';await check('CRM rejection stays pending',async()=>assert.equal((await post({mensaje:'Rejected at mock'}))[1].status,'pending'));
 mode='ok';await check('Pending enquiry retry succeeds',async()=>assert.equal((await post({mensaje:'Bad receipt'}))[1].status,'delivered'));
 mode='timeout';await check('CRM timeout stays pending',async()=>assert.equal((await post({mensaje:'Timeout at mock'}))[1].status,'pending'));mode='ok';
 await check('Delivered records contain no message',async()=>{for(const f of await readdir(storage)){if(!/^[a-f0-9]{64}\.json$/.test(f))continue;const row=JSON.parse(await readFile(path.join(storage,f),'utf8'));if(row.status==='delivered')assert.equal(row.payload,undefined);}});
 await check('No-JS form retains escaped input on error',async()=>{const [s,html]=await post({telefono:'x',nombre:'<script>alert(1)</script>'},false);assert.equal(s,422);assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));assert.ok(html.includes(`value="${token.csrf}"`));});
 await reset();await check('Rate limit enforces 8 attempts per 10 minutes',async()=>{for(let i=0;i<8;i++)assert.equal((await post({telefono:'x'}))[0],422);assert.equal((await post({telefono:'x'}))[0],429);});
 await reset();await mkdir(path.join(storage,'rate.json'));await check('Unavailable private storage fails clearly',async()=>assert.equal((await post())[0],503));await rm(path.join(storage,'rate.json'),{recursive:true});
 await check('Private/source paths inaccessible',async()=>{for(const p of ['/lib/leads.php','/scripts/queue.php','/content.mjs','/.env','/package.json'])assert.equal((await fetch(base+p)).status,404);});
 await check('Missing page 404 and index redirect',async()=>{assert.equal((await fetch(base+'/missing-audit-page/')).status,404);const r=await fetch(base+'/contacto/index.html',{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('location'),'/contacto/');});
 console.log(`${count} integration checks passed. All submissions used a localhost mock; no real leads sent.`);
}finally{php.kill();mock.closeAllConnections();mock.close();await new Promise(r=>php.once('exit',r));await rm(storage,{recursive:true,force:true});}
