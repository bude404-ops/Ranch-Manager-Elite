/**
 * Ranch Manager Elite — Service Worker
 * Handles caching, offline support, and background sync
 */
const CACHE_NAME = 'ranch-elite-v1';
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './js/core.js',
    './js/ui.js',
    './js/app.js',
    './js/storage.js',
    './js/gps.js',
    './js/charts.js',
    './js/subscriptions.js',
    './manifest.json'
];

// Install: Cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(err => {
                console.error('[SW] Cache failed:', err);
                // Continue even if some assets fail
            })
            .then(() => self.skipWaiting())
    );
});

// Activate: Clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.map(key => {
                        if (key !== CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', key);
                            return caches.delete(key);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch: Cache-first with network fallback and update
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then(cached => {
                // Return cached immediately
                const fetchPromise = fetch(event.request)
                    .then(networkResponse => {
                        // Update cache with fresh response
                        if (networkResponse && networkResponse.status === 200) {
                            const clone = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, clone);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed, cached response already returned
                        console.log('[SW] Serving from cache:', event.request.url);
                    });

                // Return cached or wait for network
                return cached || fetchPromise;
            })
    );
});
