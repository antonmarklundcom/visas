import { PAGES } from '../content.mjs';
import { readdirSync,writeFileSync,mkdirSync,readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const files=PAGES.map(p=>p.path.endsWith('/')?p.path.slice(1)+'index.html':p.path.slice(1));
function walk(dir){for(const e of readdirSync(dir,{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory())walk(p);else if(/\.(?:css|js|svg|avif|webp|jpg|png|woff2)$/.test(p))files.push(p);}}
walk('assets');files.push('.htaccess','robots.txt','sitemap.xml','lead-forward.php','lib/leads.php','lib/forms/es.html','lib/forms/en.html','scripts/queue.php','assets/fonts/fraunces-OFL.txt','assets/fonts/manrope-OFL.txt');
files.sort();mkdirSync('dist',{recursive:true});
const hashes=Object.fromEntries(files.map(f=>[f,createHash('sha256').update(readFileSync(f)).digest('hex')]));
const manifest={builtAt:new Date().toISOString(),releaseDate:process.env.RELEASE_DATE||new Date().toISOString().slice(0,10),baseCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),uncommittedChanges:execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim().length>0,files:hashes};
writeFileSync('dist/release-manifest.json',JSON.stringify(manifest,null,2));
writeFileSync('dist/package-files.json',JSON.stringify(files));
execFileSync('python',['deploy/package.py'],{stdio:'inherit'});

execFileSync(process.execPath,['scripts/smoke-package.mjs'],{stdio:'inherit'});
