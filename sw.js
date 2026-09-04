// Retired. Loco used to be served from this root and registered a service
// worker here with scope "/". A browser that still has it checks this file for
// an update; the byte content changed, so this version installs, drops every
// cache the old shell left behind, and unregisters itself. Without it the old
// worker would keep answering for a site that is no longer an app.
//
// The app's own worker now lives at /loco-share/sw.js, scoped to /loco-share/.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((cs) => cs.forEach((c) => c.navigate(c.url))),
  );
});
