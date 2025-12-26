// Service Worker para PWA
const CACHE_NAME = 'inmobiliaria-v4'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
]

// Estrategia: Network First, luego Cache (pero no bloquear si falla)
const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request, { 
      cache: 'no-cache' // Siempre intentar red primero
    })
    // Solo cachear si es exitosa
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log('Network failed, trying cache:', request.url)
    // Si falla la red, intentar desde cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    // Si no hay cache, devolver error pero no bloquear
    throw error
  }
}

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  // No esperar a que se complete el cache, activar inmediatamente
  self.skipWaiting()
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto')
        // Intentar cachear pero no bloquear si falla
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Error cacheando recursos iniciales:', err)
          // No bloquear la instalación si falla
        })
      })
  )
})

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  // Tomar control inmediatamente
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Eliminando cache antiguo:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // Tomar control de todos los clientes
      self.clients.claim()
    ])
  )
})

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  // Solo cachear peticiones GET
  if (event.request.method !== 'GET') {
    return
  }

  const url = new URL(event.request.url)
  
  // Para navegación (HTML), siempre intentar red primero
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      networkFirst(event.request).catch(() => {
        // Si falla, intentar desde cache
        return caches.match('/index.html').then(cached => {
          if (cached) return cached
          // Si no hay cache, devolver respuesta básica
          return new Response(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cargando...</title>
              </head>
              <body>
                <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
                  <p>Cargando aplicación...</p>
                </div>
                <script>window.location.reload()</script>
              </body>
            </html>
          `, {
            headers: { 'Content-Type': 'text/html' }
          })
        })
      })
    )
    return
  }

  // Para assets (JS, CSS, imágenes), network first pero con fallback a cache
  event.respondWith(
    networkFirst(event.request).catch(() => {
      return caches.match(event.request).then(cached => {
        if (cached) return cached
        // Si no hay cache, dejar que el navegador maneje
        return fetch(event.request)
      })
    })
  )
})

