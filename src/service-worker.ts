'use strict';

const CACHE_VERSION = '0.0.0';
const CACHE_NAME    = `xsound-cache-v${CACHE_VERSION}`;

const BASE_URL = '/';
const CACHE_FILES = [
  BASE_URL,
  `${BASE_URL}assets/app.css`,
  `${BASE_URL}assets/app.css.map`,
  `${BASE_URL}assets/app.js`,
  `${BASE_URL}assets/app.js.map`,
  `${BASE_URL}assets/vendor.js`,
  `${BASE_URL}assets/vendor.js.map`
];

self.addEventListener('install', (event: InstallEvent) => {
  event.waitUntil(self.skipWaiting());
  // event.waitUntil(
  //   caches.open(CACHE_NAME)
  //     .then((cache: Cache) => {
  //       return cache.addAll(cacheFiles);
  //     })
  //     .catch(console.error);
  // );
}, false);

self.addEventListener('fetch', (event: FetchEvent) => {
  if (!CACHE_FILES.some((file: string) => event.request.url.includes(file)) &&
    !event.request.url.endsWith('.wav') &&
    !event.request.url.endsWith('.mp3') &&
    !event.request.url.endsWith('.png') &&
    !event.request.url.endsWith('.txt')
  ) {
    // Not cache ...
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response: Response) => {
        if (response) {
          return response;
        }

        const request = event.request.clone();

        return fetch(request)
          .then((response: Response) => {
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache: Cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(console.error);

            return response;
          })
          .catch(console.error);
      })
      .catch(console.error)
  );
}, false);

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames: string[]) => {
        return Promise.all(
          cacheNames
            .filter((cacheName: string) => cacheName !== CACHE_NAME)
            .map((cacheName: string) => caches.delete(cacheName))
        );
      })
      .catch(console.error)
  );
}, false);