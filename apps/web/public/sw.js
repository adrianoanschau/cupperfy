const CACHE = 'cupperfy-pwa-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (
    request.mode === 'navigate' ||
    url.pathname.startsWith('/api/') ||
    request.headers.get('RSC') === '1'
  ) {
    return;
  }

  const staticAsset =
    url.pathname.startsWith('/brand/') ||
    url.pathname.startsWith('/_next/static/') ||
    /\.(?:png|jpg|jpeg|gif|webp|ico|svg|woff2)$/i.test(url.pathname);

  if (!staticAsset) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetched = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch((error) => {
          if (cached) {
            return cached;
          }
          throw error;
        });

      return cached || fetched;
    }),
  );
});
