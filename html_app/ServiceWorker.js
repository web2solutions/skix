/* global self caches fetch */

// self.importScripts('https://unpkg.com/idb/build/iife/index-min.js')

const CACHE_NAME = 'V1';
const STATIC_CACHE_URLS = ['/', 'build.js'];

self.addEventListener('install', (event) => {
  // console.log('Service Worker installing.')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_CACHE_URLS))
  );
});



self.addEventListener('fetch', (event) => {
  // console.log(`Request of ${event.request.url}`)

  // default behaviour: request the network
  // event.respondWith(fetch(event.request))
  // Cache-First Strategy
  event.respondWith(
    caches
      .match(event.request) // check if the request has already been cached
      .then((cached) => cached || fetch(event.request)) // otherwise request network
  );
});
