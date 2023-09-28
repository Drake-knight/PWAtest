const CACHE_NAME = "build0";
const urlsToCache = ['index.html', 'offline.html'];
const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});


//listen forrequest  // doesnt cache anything other than offline.html // to display offline page when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
                .catch(() => caches.match('offline.html'));
        })
    );
});



// //listen forrequest   network first 
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         fetch(event.request)
//             .then((response) => {
//                 if (response && response.status === 200) {
//                     const responseClone = response.clone();
//                     caches.open(CACHE_NAME).then((cache) => {
//                         cache.put(event.request, responseClone);
//                     });
//                 }
//                 return response;
//             })
//             .catch(async () => {
//                 const cachedResponse = await caches.match(event.request);
//                 return cachedResponse || caches.match('offline.html');
//             })
//     );
// });


self.addEventListener("push", (event) => {
    const options = {
        body: event.data.text(),
        icon: "/path/to/icon.png",
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification Title", options)
    );
});

//activate sw  //  to remove the prev version of cache
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                // eslint-disable-next-line array-callback-return
                cacheNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
