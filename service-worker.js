const CACHE_NAME = 'ezabag';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// INSTALL
self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(urlsToCache);

      })

  );

});

// ACTIVATE
self.addEventListener('activate', event => {

  event.waitUntil(

    caches.keys().then(cacheNames => {

      return Promise.all(

        cacheNames.map(cache => {

          if(cache !== CACHE_NAME){

            return caches.delete(cache);

          }

        })

      );

    })

  );

  return self.clients.claim();

});

// FETCH
self.addEventListener('fetch', event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        return response || fetch(event.request);

      })

  );

});
