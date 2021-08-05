// service worker file
const staticCacheName = 'site-static-v1.1.6';
const assets = [
    '/smart-calculator/',
    'index.html',
    'style/style.css',
    'script/script.js',
    'script/app.js',
    'img/favicon.png',
    'style/fonts/tahoma.ttf',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Charm&display=swap',
    'https://fonts.gstatic.com/s/charm/v5/7cHmv4oii5K0MdY8K-4E4Q.woff2',
    'https://fonts.gstatic.com/s/charm/v5/7cHmv4oii5K0MdYoK-4.woff2',
    'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2'
];

// install service worker
self.addEventListener('install', event => {
    // console.log('service worker has been installed');
    // pre-caching assets
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            // console.log('caching shell assets');
            cache.addAll(assets)
        })
    );
});

// activate event
self.addEventListener('activate', event => {
    // console.log('service worker has been activated');
    // delete previous caches
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', event => {
    // console.log('fetch event', event);
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
})