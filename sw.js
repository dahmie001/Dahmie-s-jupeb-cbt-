const V='dahmie-cbt-v4';
const SMALL=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SMALL).then(()=>c.add('./index.html'))).catch(()=>{}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){
  /* open instantly from the saved copy, and quietly refresh it in the background so updates arrive on the next visit */
  e.respondWith(caches.open(V).then(c=>c.match('./index.html').then(hit=>{
   const net=fetch('./index.html',{cache:'no-cache'}).then(n=>{if(n&&n.ok)c.put('./index.html',n.clone());return n;}).catch(()=>null);
   if(hit){e.waitUntil(net);return hit;}
   return net.then(n=>n||fetch(r));
  })));return;
 }
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r)));
});
