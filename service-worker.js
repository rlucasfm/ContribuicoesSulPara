const CACHE_NAME = "v1";

const FILES_TO_CACHE = [
  'offline.html',
];

self.addEventListener('install', (event)=>{
    event.waitUtil(
    
        caches.open(CACHE_NAME)
        .then (cache =>{
            console.log('[ServiceWorker] salvou offline.html em cache');
            return cache.addAll(FILES_TO_CACHE);
        }),
            
    );
});

self.addEventListener('activate', (event)=>{

    // CODELAB: Remove previous cached data from disk.
    event.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );    
    
});

self.addEventListener('fetch', (event)=>{
    
    // CODELAB: Add fetch event handler here.
    if (event.request.mode !== 'navigate') {
      // Not a page navigation, bail.
      return;
    }
    event.respondWith(
        fetch(event.request)
            .catch(() => {
              return caches.open(CACHE_NAME)
                  .then((cache) => {
                    return cache.match('offline.html');
                  });
            })
    );    
    
    /*
    event.respondWith(
        caches.match(event.request)
        .then(cacheResponse => (cacheResponse || fetch(event.request))),
    );*/    
    
});