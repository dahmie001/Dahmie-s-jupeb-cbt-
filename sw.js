const V='dahmie-cbt-v2';
const SMALL=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SMALL).then(()=>c.add('./index.html')).catch(()=>{})).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(caches.match('./index.html').then(c=>c||fetch(r)));return;}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r)));
});
