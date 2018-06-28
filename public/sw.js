let staticCacheName = "cur-converter-v1";
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache){
    return cache.addAll([
      '/',
      '/about',
      '/img/logo.png',
      '/js/idb/index.js',
      '/js/idb/script.js',
      '/js/converter.js',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
      'https://code.jquery.com/jquery-3.3.1.slim.min.js'
    ])
    })
  );
});
self.addEventListener('fetch', function(event){
event.respondWith(
  caches.match(event.request).then(function(response){
    if(response) return response;
    return fetch(event.request);
  })
)
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('cur-') &&
          cacheName != staticCacheName;
        }).map(function(cacheName){
          return cache.delete(cacheName);
        })
      );
    })
  )
})
