const CACHE_NAME = "ranchos-v1";

const FILES = [
"./",
"./index.html",
"./css/styles.css",
"./js/app.js"
];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)
  .then(cache => cache.addAll(FILES))

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
  .then(response => {

    return response || fetch(event.request);

  })

);

});
