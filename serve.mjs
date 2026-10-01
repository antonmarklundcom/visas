import { spawn } from 'node:child_process';
const port=process.env.PORT||'8787';
if(!/^\d+$/.test(port))throw Error('Invalid PORT');
const child=spawn('php',['-S',`127.0.0.1:${port}`,'router.php'],{cwd:import.meta.dirname,stdio:'inherit'});
child.on('error',()=>{console.error('PHP 8.1+ is required for the local preview.');process.exitCode=1;});
child.on('exit',code=>process.exitCode=code||0);
process.on('SIGINT',()=>child.kill());
