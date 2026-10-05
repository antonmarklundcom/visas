import {spawn} from 'node:child_process';
import {fetchLocal as fetch} from './local-test-http.mjs';
import {PAGES} from '../content.mjs';
import {resolve} from 'node:path';
const child=spawn('php',['-S','127.0.0.1:8879'],{cwd:resolve('dist/verified-extraction'),stdio:'ignore'});
try{
 for(let i=0;i<30;i++){try{await fetch('http://127.0.0.1:8879/');break;}catch{await new Promise(r=>setTimeout(r,100));}}
 for(const p of PAGES){const r=await fetch('http://127.0.0.1:8879'+p.path);if(r.status!==200)throw Error(`${p.path}: ${r.status}`);}
 const r=await fetch('http://127.0.0.1:8879/lead-forward.php?action=token');const t=await r.json();if(r.status!==200||!t.csrf||!t.submission_id)throw Error('Packaged PHP token endpoint failed');
 console.log(`PASS: extracted ZIP serves all ${PAGES.length} routes and initializes secure form tokens. No leads submitted. Apache rules still need hosting verification.`);
}finally{child.kill();}
