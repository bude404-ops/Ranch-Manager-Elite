const CACHE_NAME = 'ranch-elite-v2';
const STATIC_ASSETS = [
    './', './index.html', './css/styles.css',
    './js/core.js', './js/ui.js', './js/app.js', './js/storage.js',
    './js/gps.js', './js/charts.js', './js/subscriptions.js',
    './manifest.json'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .catch(err => console.error('[SW] Cache failed:', err))
            .then(() => self.skipWaiting())
    );
});
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
            ))
            .then(() => self.clients.claim())
    );
});
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request)
            .then(cached => {
                const fetchPromise = fetch(event.request)
                    .then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200) {
                            const clone = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                        }
                        return networkResponse;
                    })
                    .catch(() => cached);
                return cached || fetchPromise;
            })
    );
});
