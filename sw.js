(()=>{"use strict";var t=globalThis.self,e="xsound.app-cache-v".concat("1.10.52"),n="/",s=[n,"".concat(n,"index.html"),"".concat(n,"manifest.json"),"".concat(n,"register.js"),"".concat(n,"assets/app.css"),"".concat(n,"assets/app.css.map"),"".concat(n,"assets/app.js"),"".concat(n,"assets/app.js.map"),"".concat(n,"assets/vendor.js"),"".concat(n,"assets/vendor.js.map")];t.addEventListener("install",(function(e){e.waitUntil(t.skipWaiting())}),!1),t.addEventListener("fetch",(function(t){if((s.some((function(e){return t.request.url.includes(e)}))||t.request.url.startsWith("http")||t.request.url.endsWith(".wav")||t.request.url.endsWith(".mp3")||t.request.url.endsWith(".png")||t.request.url.endsWith(".txt"))&&!t.request.url.includes("chrome-extension")){var n=caches.match(t.request).then((function(n){if(n)return n;var s=t.request.clone();return fetch(s).then((function(n){var s=n.clone();return caches.open(e).then((function(e){e.put(t.request,s)})).catch((function(t){})),n})).catch((function(t){return new Response}))})).catch((function(t){return new Response}));t.respondWith(n)}}),!1),t.addEventListener("activate",(function(t){var n=caches.keys().then((function(t){return Promise.all(t.filter((function(t){return t!==e})).map((function(t){return caches.delete(t)})))})).catch((function(t){}));t.waitUntil(n)}),!1)})();