'use strict';

const CACHE_VERSION = '1.0.0';
const CACHE_NAME    = `xsound.app-cache-v${CACHE_VERSION}`;

const BASE_URL = '/';
const CACHE_FILES = [
  BASE_URL,
  `${BASE_URL}index.html`,
  `${BASE_URL}manifest.json`,
  `${BASE_URL}register.js`,
  `${BASE_URL}assets/app.css`,
  `${BASE_URL}assets/app.css.map`,
  `${BASE_URL}assets/app.js`,
  `${BASE_URL}assets/app.js.map`,
  `${BASE_URL}assets/vendor.js`,
  `${BASE_URL}assets/vendor.js.map`
];

self.addEventListener('install', (event: InstallEvent) => {
  event.waitUntil(self.skipWaiting());

  // const promise = caches.open(CACHE_NAME)
  //   .then((cache: Cache) => {
  //     return cache.addAll(cacheFiles);
  //   })
  //   .catch((error: Error) => {
  //     console.error(error);
  //   });
  // event.waitUntil(promise);
}, false);

self.addEventListener('fetch', (event: FetchEvent) => {
  if (!CACHE_FILES.some((file: string) => event.request.url.includes(file)) &&
    !event.request.url.startsWith('http') &&
    !event.request.url.endsWith('.wav') &&
    !event.request.url.endsWith('.mp3') &&
    !event.request.url.endsWith('.png') &&
    !event.request.url.endsWith('.txt')
  ) {
    // Not cache ...
    return;
  }

  if (event.request.url.includes('chrome-extension')) {
    // Not cache ...
    return;
  }

  const promise = caches.match(event.request)
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
            .catch((error: Error) => {
              // eslint-disable-next-line no-console
              console.error(error);
            });

          return response;
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    })
    .catch((error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

  event.respondWith(promise);
}, false);

self.addEventListener('activate', (event: ExtendableEvent) => {
  const promise = caches.keys()
    .then((cacheNames: string[]) => {
      return Promise.all(
        cacheNames
          .filter((cacheName: string) => cacheName !== CACHE_NAME)
          .map((cacheName: string) => caches.delete(cacheName))
      );
    })
    .catch((error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

  event.waitUntil(promise);
}, false);
