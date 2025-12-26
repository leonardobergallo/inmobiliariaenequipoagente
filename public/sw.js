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
  // Activar inmediatamente sin esperar
  self.skipWaiting()
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache abierto:', CACHE_NAME)
        // Intentar cachear pero no bloquear si falla
        return cache.addAll(urlsToCache).catch(err => {
          console.log('[SW] Error cacheando recursos iniciales:', err)
          // No bloquear la instalación si falla
        })
      })
      .then(() => {
        console.log('[SW] Instalación completada')
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

// Interceptar peticiones - Estrategia más permisiva
self.addEventListener('fetch', (event) => {
  // Solo cachear peticiones GET
  if (event.request.method !== 'GET') {
    return
  }

  const url = new URL(event.request.url)
  
  // NO interceptar peticiones de navegación - dejar que el navegador las maneje directamente
  // Esto evita problemas de pantalla en blanco en modo standalone
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    // No interceptar, dejar que el navegador maneje la navegación
    return
  }

  // Para assets estáticos (JS, CSS, imágenes), usar network first con fallback
  // Pero solo si es necesario, de lo contrario dejar pasar
  if (url.pathname.startsWith('/assets/') || 
      url.pathname.endsWith('.js') || 
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.svg')) {
    
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Si la red funciona, cachear y devolver
          if (response && response.ok) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Si falla la red, intentar desde cache
          return caches.match(event.request).then(cached => {
            if (cached) return cached
            // Si no hay cache, intentar fetch de nuevo (último intento)
            return fetch(event.request)
          })
        })
    )
  }
  // Para otros recursos, no interceptar
})

