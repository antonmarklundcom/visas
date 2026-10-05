import { request } from 'node:http';

// Buffer PHP's connection-close responses before creating a standard Response.
// This avoids a Node 24.19 built-in fetch parser assertion on Windows. Test-only;
// the allowlist prevents this helper from sending synthetic enquiries off-device.
export function fetchLocal(input, options = {}, redirects = 0) {
 const url = new URL(input);
 if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1')
  return Promise.reject(new Error('Test requests must stay on 127.0.0.1'));
 return new Promise((resolve, reject) => {
  const req = request(url, { method: options.method || 'GET', headers: options.headers }, res => {
   const chunks = [];
   res.on('data', chunk => chunks.push(chunk));
   res.on('error', reject);
   res.on('end', () => {
    const status = res.statusCode;
    if ([301,302,303,307,308].includes(status) && res.headers.location && options.redirect !== 'manual') {
     if (redirects >= 10) return reject(new Error('Too many test redirects'));
     const next = new URL(res.headers.location, url);
     const nextOptions = status === 303 ? { ...options, method:'GET', body:undefined } : options;
     return fetchLocal(next, nextOptions, redirects + 1).then(resolve, reject);
    }
    const headers = Object.fromEntries(Object.entries(res.headers).filter(([,v]) => v !== undefined).map(([k,v]) => [k, Array.isArray(v) ? v.join(', ') : v]));
    resolve(new Response([204,304].includes(status) ? null : Buffer.concat(chunks), { status, headers }));
   });
  });
  req.on('error', reject);
  req.setTimeout(20000, () => req.destroy(new Error('Local test request timed out')));
  req.end(options.body === undefined ? undefined : String(options.body));
 });
}
