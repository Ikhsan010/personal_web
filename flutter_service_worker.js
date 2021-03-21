'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/ai.png": "3466650b7a59f30a99df8856fde603b7",
"assets/android_gif.gif": "1b1fad0835c8e2feb63417ad393c4485",
"assets/android_head.png": "9f5fff712e10b1cae4bb55d24b810fed",
"assets/AssetManifest.json": "956a8e71feffdf8b8d621642c8b8c826",
"assets/assets/ai.png": "3466650b7a59f30a99df8856fde603b7",
"assets/assets/android_gif.gif": "1b1fad0835c8e2feb63417ad393c4485",
"assets/assets/android_head.png": "9f5fff712e10b1cae4bb55d24b810fed",
"assets/assets/back_cover.png": "e9faee0aefb30515c6f558de7679a10b",
"assets/assets/big_data.png": "c528678ae22447001b10bd7b18f6b448",
"assets/assets/button_scroll_down.png": "15818c5ed191a9c46719f2438cfe4261",
"assets/assets/database.png": "ede23198f8df781761b0f9c5cef07812",
"assets/assets/deep-learning.png": "fdecbc81736e7823ae040fc94e03fb76",
"assets/assets/email.png": "ab78a86c6000d5ad93b2356dea68bfbc",
"assets/assets/flutter.png": "bc20ac3c833cdfbb9230c8a0dc483d46",
"assets/assets/github.png": "6037b878ded23640e739c7b85cfeae4e",
"assets/assets/hmif.png": "bd23d853dbcf0db47ff9018b3f1d6141",
"assets/assets/instagram.png": "8112c308078d8d165d4098279c62dac2",
"assets/assets/itb.png": "2faebc6bcf03dfc3e6f6d163bcd69535",
"assets/assets/itb_kampus.jpg": "f6339c816e3f78afb1624045099c690c",
"assets/assets/karisma.png": "1f75dc1ad3ca9751a1bb1262108ae6c4",
"assets/assets/linkedin.png": "dcde5770b663f86e4490baaf30af57e1",
"assets/assets/ml.png": "9c820b933ab9f6d8733e688139c83878",
"assets/assets/my_photo.png": "a537b908db8a5fb4a9a4ff355b1764e0",
"assets/assets/phone.png": "c88b585859c5bfa73a3568090eef5ce2",
"assets/assets/smansa.png": "c64272220832037c47fd844ca6dbbac2",
"assets/assets/smartphone.png": "2855b52ab9cb2bf25933b0e3c4a50b5d",
"assets/back_cover.png": "e9faee0aefb30515c6f558de7679a10b",
"assets/big_data.png": "c528678ae22447001b10bd7b18f6b448",
"assets/button_scroll_down.png": "15818c5ed191a9c46719f2438cfe4261",
"assets/database.png": "ede23198f8df781761b0f9c5cef07812",
"assets/deep-learning.png": "fdecbc81736e7823ae040fc94e03fb76",
"assets/email.png": "ab78a86c6000d5ad93b2356dea68bfbc",
"assets/flutter.png": "bc20ac3c833cdfbb9230c8a0dc483d46",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/github.png": "6037b878ded23640e739c7b85cfeae4e",
"assets/hmif.png": "bd23d853dbcf0db47ff9018b3f1d6141",
"assets/instagram.png": "8112c308078d8d165d4098279c62dac2",
"assets/itb.png": "2faebc6bcf03dfc3e6f6d163bcd69535",
"assets/itb_kampus.jpg": "f6339c816e3f78afb1624045099c690c",
"assets/karisma.png": "1f75dc1ad3ca9751a1bb1262108ae6c4",
"assets/linkedin.png": "dcde5770b663f86e4490baaf30af57e1",
"assets/ml.png": "9c820b933ab9f6d8733e688139c83878",
"assets/my_photo.png": "a537b908db8a5fb4a9a4ff355b1764e0",
"assets/NOTICES": "d2e337d79f25b7a36075d894631f6345",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/phone.png": "c88b585859c5bfa73a3568090eef5ce2",
"assets/smansa.png": "c64272220832037c47fd844ca6dbbac2",
"assets/smartphone.png": "2855b52ab9cb2bf25933b0e3c4a50b5d",
"favicon.png": "77df3f1dd61603b9fd64370036fe8be5",
"icons/favicon.png": "77df3f1dd61603b9fd64370036fe8be5",
"index.html": "7dd03d7406313b753ba825d77943e5d5",
"/": "7dd03d7406313b753ba825d77943e5d5",
"main.dart.js": "da1c43bd0322041f33c38fe26a2d815f",
"manifest.json": "ddd9ab700a9dbed342b3ab394065b233",
"version.json": "f6414abc2f041cb1110b8ac776e9df2b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
