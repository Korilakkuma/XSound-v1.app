(()=>{"use strict";var t="xsound.app-cache-v".concat("1.1.0"),e="/",n=[e,"".concat(e,"index.html"),"".concat(e,"manifest.json"),"".concat(e,"register.js"),"".concat(e,"assets/app.css"),"".concat(e,"assets/app.css.map"),"".concat(e,"assets/app.js"),"".concat(e,"assets/app.js.map"),"".concat(e,"assets/vendor.js"),"".concat(e,"assets/vendor.js.map")];self.addEventListener("install",(function(t){t.waitUntil(self.skipWaiting())}),!1),self.addEventListener("fetch",(function(e){if((n.some((function(t){return e.request.url.includes(t)}))||e.request.url.startsWith("http")||e.request.url.endsWith(".wav")||e.request.url.endsWith(".mp3")||e.request.url.endsWith(".png")||e.request.url.endsWith(".txt"))&&!e.request.url.includes("chrome-extension")){var s=caches.match(e.request).then((function(n){if(n)return n;var s=e.request.clone();return fetch(s).then((function(n){var s=n.clone();return caches.open(t).then((function(t){t.put(e.request,s)})).catch((function(t){})),n})).catch((function(t){}))})).catch((function(t){}));e.respondWith(s)}}),!1),self.addEventListener("activate",(function(e){var n=caches.keys().then((function(e){return Promise.all(e.filter((function(e){return e!==t})).map((function(t){return caches.delete(t)})))})).catch((function(t){}));e.waitUntil(n)}),!1)})();