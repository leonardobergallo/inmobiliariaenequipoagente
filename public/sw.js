// Service Worker para PWA
const CACHE_NAME = 'inmobiliaria-v3'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-72x72.png',
  '/icon-96x96.png',
  '/icon-128x128.png',
  '/icon-144x144.png',
  '/icon-152x152.png',
  '/icon-192x192.png',
  '/icon-384x384.png',
  '/icon-512x512.png'
]

// Estrategia: Network First, luego Cache
const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request)
    // Cachear respuesta exitosa
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Si falla la red, intentar desde cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    // Si no hay cache, devolver error
    throw error
  }
}

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto')
        return cache.addAll(urlsToCache)
      })
  )
})

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  // Solo cachear peticiones GET
  if (event.request.method !== 'GET') {
    return
  }

  // Para navegación, usar network first
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request))
    return
  }

  // Para otros recursos, intentar cache primero
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return networkFirst(event.request)
      })
      .catch(() => {
        // Si falla todo, devolver página offline si es navegación
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html')
        }
        return new Response('Offline', { status: 503 })
      })
  )
})

