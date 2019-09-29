var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = '/extra-files/offline.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          offlineUrl
      ]);
    })
  );
});

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request).catch(error => {
        // Return the offline page
        return caches.match(offlineUrl);
      })
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(error => {
        return caches.match(event.request)
      })
    );
  }
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['offline-cache' + cacheVersion];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});