/* eslint-disable no-restricted-globals */
const CACHE_NAME = "build0";
const urlsToCache = ["index.html", "offline.html"];

self.addEventListener("install", (event) => {
    console.log("install event received:", event);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => caches.match("offline.html"));
        })
    );
});

self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: 'icon.png',
        badge: 'badge.png',
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});


self.addEventListener("activate", (event) => {
    const cacheWhiteList = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
