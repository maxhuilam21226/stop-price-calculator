// Minimal service worker — satisfies PWA install requirement.
// Passes all requests through to the network without caching.
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', function (e) { e.respondWith(fetch(e.request)); });
