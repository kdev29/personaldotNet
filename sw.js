
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  './'
];

self.addEventListener('install', function(event){
    console.log('Installing sw...');
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    
});

self.addEventListener('fetch', function(event){
    console.log('Fetch event fired');
    console.log(event);

    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    
});

self.addEventListener('message',function(e){
    self.postMessage('Hello from worker<- ' + e.data);
});
