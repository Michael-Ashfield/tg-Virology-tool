var cacheName = "v2:static";

//function register() {
console.log("Registering service worker v2");
// during the install phase you usually want to cache static assets
self.addEventListener("install", function(e) {
	// once the SW is installed, go ahead and fetch the resources to make this work offline
	try {
		e.waitUntil(
			caches.open(cacheName).then(function(cache) {
				return cache
					.addAll([
                        "/build/bundle.css",
						"/build/bundle.js",
						"/icons/android-chrome-192x192.png",
						"/icons/android-chrome-256x256.png",
						"/icons/apple-touch-icon.png",
						"/icons/browserconfig.xml",
						"/icons/favicon-16x16.png",
						"/icons/favicon-32x32.png",
						"/icons/favicon.ico",
						"/icons/mstile-150x150.png",
						"/icons/safari-pinned-tab.svg",
                        "/vendor/jquery/jquery.min.js",
                        "/vendor/bootstrap/css/bootstrap.min.css",
                        "/vendor/bootstrap/js/bootstrap.min.js",
						"/data.json",
						"/global.css",
						"/index.html"
					])
					.then(function() {
						self.skipWaiting();
					});
			})
		);
	} catch (error) {
		console.log(error);
	}
});

// when the browser fetches a url
self.addEventListener("fetch", function(event) {
	// either respond with the cached object or go ahead and fetch the actual url
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				// retrieve from cache
				return response;
			}
			// fetch as normal
			return fetch(event.request);
		})
	);
});
//}
