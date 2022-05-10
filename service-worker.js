const CACHE_NAME = 'v1_cache_pwa_testing';
const urlsToCache = [
	"./",
	"./index.html",
	"./style.css",
	"./index.js",
	"./imgs/favicon.ico",
	"./imgs/apple-icon.png",
	"./imgs/apple-icon-57x57.png",
];

// Durante el proceso de instalación, generalmente se almacena en cache los archivos estáticos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache)
					.then(() => self.skipWaiting());
			})
			.catch(err => console.log('Fallo registro de cache: ', err))
  );
});

// Una vez que se instala el Service Worker (sw), se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener("activate", (e) => {
	const cacheWhitelist = [ CACHE_NAME ];

  e.waitUntil(
		caches.keys()
			.then(cachesNames => {
				cachesNames.map(cacheName => {
					// Eliminamos lo que ya no se necesite en cache
					if(cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			})
			// Le indica al Service Worker (sw) que active el cache actual
			.then(() => self.clients.claim())
  );
});

// Cuando exista conexión a internet, busca/recupera los archivos de internet y si estos difieren de los
// archivos almacenados en cache los actualiza
self.addEventListener("fetch", (e) => {
	// Responder ya se con el objeto en cache o continuar y buscar la url real
  e.respondWith(
		caches.match(e.request)
			.then(res => {
				if(res) return res; // recuperar del cache
				return fetch(e.request); // recuperar de la petición a la url
			})
	)
});