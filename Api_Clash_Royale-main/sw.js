//Permite que a aplicação abra mesmo se o usuário estiver sem internet

const CACHE_NAME = 'cr-sorteador-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Bangers&display=swap',
  'https://logodownload.org/wp-content/uploads/2017/04/clash-royale-logo.png'
];

// Instala o Service Worker e adiciona os arquivos ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para retornar o cache quando offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o arquivo em cache, se existir, senão faz a requisição na rede
        return response || fetch(event.request);
      })
  );
});