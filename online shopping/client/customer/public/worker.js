const HOST_DOMAIN = 'http://localhost:8080';
const DOMAIN = 'http://localhost:3001'

console.log("Service Worker Loaded...");
self.addEventListener("push", e => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }
  const data = e.data.json();
  const { title, message, tag, productId } = data;
  e.waitUntil(
    self.registration.showNotification(title, {
      body: message + '\n Thông báo từ NVD Shop.',
      icon: `${DOMAIN}/images/favicon.png`,
      tag: tag,
      data: productId
    })
  );
});
self.addEventListener('notificationclick', (event) => {
  const { tag, data } = event.notification;
  if (tag === 'voucher') {
    clients.openWindow(DOMAIN);
  } else if (tag === 'sale') {
    clients.openWindow(`${DOMAIN}/product/${data}`);
  }
});