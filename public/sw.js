const CACHE_NAME = 'tokopedia-edge-v2.0';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/pdp.html',
  '/search.html',
  '/cart.html',
  '/offline.html',
  '/manifest.json',
  '/icons/tokopedia-logo.svg'
];

// Install: Pre-cache core app shell & offline page
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Tokopedia Service Worker] Pre-caching static assets & offline shell');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[Tokopedia SW] Pre-cache partial notice:', err);
      });
    })
  );
});

// Activate: Clean all outdated caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[Tokopedia SW] Removing outdated cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy depending on request type
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 1. Only handle HTTP/HTTPS GET requests
  if (!req.url.startsWith('http') || req.method !== 'GET') {
    return;
  }

  const url = new URL(req.url);

  // 2. Never intercept external requests (Criteo, GTM, GA4, Branch, CDNs, extensions)
  if (url.origin !== self.location.origin) {
    return;
  }

  // 3. Never intercept Vite development internals, HMR, or dynamic source modules
  // Caching these breaks hot reloading and poisons browser cache with stale React dispatchers
  if (
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/node_modules/') ||
    url.searchParams.has('v') ||
    url.searchParams.has('t') ||
    url.searchParams.has('token')
  ) {
    return;
  }

  // 4. HTML Navigation requests: Network-First with Offline Fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => {
          return caches.match(req).then((cached) => {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // 5. Static production assets (assets, icons, etc.): Stale-While-Revalidate with guaranteed Response
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone)).catch(() => {});
          }
          return networkResponse;
        })
        .catch(() => {
          return cachedResponse || new Response('', { status: 408, statusText: 'Request Timeout' });
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Push notification event for Tokopedia promos
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {
    title: 'Tokopedia Promo Asyik!',
    body: 'Kupon diskon hingga 90% siap digunakan. Cek sekarang!',
    icon: '/icons/tokopedia-logo.svg',
    url: '/'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: '/icons/tokopedia-logo.svg',
      data: { url: data.url }
    })
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
