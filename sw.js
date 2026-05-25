self.addEventListener('push', function(e){
  const data = e.data ? e.data.json() : {};
  self.registration.showNotification(data.title||'LiquidChat', {
    body: data.body||'New message',
    icon: '/icon.png',
    badge: '/icon.png',
    tag: 'lc-msg',
    renotify: true,
    vibrate: [200,100,200]
  });
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});

// Keep service worker alive
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
