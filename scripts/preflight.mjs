import { execFileSync } from 'node:child_process';
for(const file of ['lead-forward.php','lib/leads.php','scripts/queue.php','router.php'])execFileSync('php',['-l',file],{stdio:'inherit'});
execFileSync(process.execPath,['verify.mjs'],{stdio:'inherit'});
console.log('Local preflight passed. Production CRM credentials, Apache rules and scheduled queue monitoring require hosting verification.');
