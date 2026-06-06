const CACHE="ranch-os";

self.addEventListener("install",e=>{
e.waitUntil(
caches.open(CACHE).then(c=>
c.addAll(["/","/index.html","/dashboard.html"])
));
});

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(r=>r||fetch(e.request))
);
});
