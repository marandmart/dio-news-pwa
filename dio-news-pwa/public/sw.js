// nome utilizado para identificar app no cache. É necessário ter cuidado com o gerenciamento dele,
// especialmente caso se estiver usando vários
var CACHE_NAME = "pwa-news";
var urlsToCache = ["/", "/index.html"];

// ao ser instalado a PWA (abertura do site)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// valida caso se queira deletar o cache ou não
self.addEventListener("active", (event) => {
  var cacheWhiteList = ["pwa-task-manager"];
  event.waitUntil(
    caches.keys().then((cacheName) => {
      return Promise.all(
        cacheName.map((cacheName) => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// toda vez que for feita uma chamada a um servidor externo, ele passa por aqui para verificar se existe no cache
// ou se faz uma requisição e depois clona ela e retorna a resposta
self.addEventListener("fetch", function (event) {
  console.log("fetch", event);
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return (
          response ||
          fetch(event.request).then(function (response) {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      });
    })
  );
});
