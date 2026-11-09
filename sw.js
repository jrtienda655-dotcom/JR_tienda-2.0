const C="jr-v5",A=["./","index.html","icon-192.png","icon-512.png","manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;if(new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(C).then(h=>h.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});
