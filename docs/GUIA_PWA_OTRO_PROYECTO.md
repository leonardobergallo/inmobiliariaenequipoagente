# 📱 Guía: Convertir Cualquier Proyecto React en PWA Instalable

Esta guía te muestra cómo convertir cualquier proyecto React en una Progressive Web App (PWA) que se puede instalar en iPhone, Android y Desktop.

---

## 📋 Requisitos Previos

- ✅ Proyecto React (con Vite, Create React App, o Next.js)
- ✅ Node.js instalado
- ✅ Git configurado

---

## 🚀 Paso 1: Configurar el Manifest

### 1.1 Crear `public/manifest.json`

Crea el archivo `public/manifest.json` con este contenido:

```json
{
  "name": "Nombre de Tu App",
  "short_name": "Tu App",
  "description": "Descripción de tu aplicación",
  "start_url": "/",
  "display": "standalone",
  "prefer_related_applications": false,
  "background_color": "#ffffff",
  "theme_color": "#137fec",
  "orientation": "portrait-primary",
  "scope": "/",
  "icons": [
    {
      "src": "/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**⚠️ IMPORTANTE:** Cambia `"name"`, `"short_name"` y `"description"` por los valores de tu app.

---

## 🎨 Paso 2: Generar Iconos

### Opción A: Usar un Generador Online

1. Ve a [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
2. Sube tu logo (debe ser cuadrado, mínimo 512x512px)
3. Descarga los iconos generados
4. Colócalos en `public/` con los nombres: `icon-72x72.png`, `icon-96x96.png`, etc.

### Opción B: Crear Manualmente

Necesitas crear iconos en estos tamaños:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512 píxeles

Colócalos en `public/` con los nombres correspondientes.

---

## ⚙️ Paso 3: Configurar HTML

### 3.1 Actualizar `index.html` (o `index.html` en public/)

Agrega estos meta tags en el `<head>`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  
  <!-- PWA Meta Tags -->
  <meta name="theme-color" content="#137fec" />
  <link rel="manifest" href="/manifest.json" />
  
  <!-- iOS Meta Tags -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="Tu App" />
  <link rel="apple-touch-icon" href="/icon-192x192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="/icon-144x144.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/icon-128x128.png" />
  <link rel="apple-touch-icon" sizes="76x76" href="/icon-96x96.png" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/icon-192x192.png" />
  
  <title>Tu App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

**⚠️ IMPORTANTE:** Cambia `"Tu App"` por el nombre de tu aplicación.

---

## 🔧 Paso 4: Crear Service Worker

### 4.1 Crear `public/sw.js`

Crea el archivo `public/sw.js`:

```javascript
// Service Worker para PWA
const CACHE_NAME = 'tu-app-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
]

// Estrategia: Network First, luego Cache
const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request, { 
      cache: 'no-cache'
    })
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Error cacheando recursos:', err)
        })
      })
  )
})

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName)
            }
          })
        )
      }),
      self.clients.claim()
    ])
  )
})

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  const url = new URL(event.request.url)
  
  // Para navegación (HTML), siempre intentar red primero
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      networkFirst(event.request).catch(() => {
        return caches.match('/index.html').then(cached => {
          if (cached) return cached
          return new Response('Offline', { status: 503 })
        })
      })
    )
    return
  }

  // Para assets, network first con fallback a cache
  event.respondWith(
    networkFirst(event.request).catch(() => {
      return caches.match(event.request).then(cached => {
        if (cached) return cached
        return fetch(event.request)
      })
    })
  )
})
```

**⚠️ IMPORTANTE:** Cambia `'tu-app-v1'` por un nombre único para tu app.

---

## 📝 Paso 5: Registrar Service Worker

### 5.1 Crear `src/utils/pwa.js`

Crea el archivo `src/utils/pwa.js`:

```javascript
// Utilidades para PWA
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registrado:', registration)
        registration.update()
      })
      .catch((error) => {
        console.log('Error al registrar SW:', error)
      })
  }
}

// Detectar si la app está instalada
export const isInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone ||
         document.referrer.includes('android-app://')
}
```

### 5.2 Registrar en `src/main.jsx` (o `src/index.js`)

Agrega al inicio del archivo:

```javascript
import { registerServiceWorker } from './utils/pwa.js'

// Registrar Service Worker para PWA
try {
  registerServiceWorker()
} catch (error) {
  console.error('Error al registrar Service Worker:', error)
}
```

---

## 🎯 Paso 6: Configurar Vite (si usas Vite)

### 6.1 Actualizar `vite.config.js`

Si usas Vite, asegúrate de que `vite.config.js` tenga:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Usa esbuild en lugar de terser
  },
  base: '/',
})
```

---

## 🚀 Paso 7: Configurar Vercel (si usas Vercel)

### 7.1 Crear `vercel.json`

Crea el archivo `vercel.json` en la raíz:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Esto es necesario para que React Router funcione correctamente en Vercel.

---

## ✅ Paso 8: Verificar

### 8.1 Build y Preview

```bash
npm run build
npm run preview
```

### 8.2 Verificar en DevTools

1. Abre la app en el navegador
2. Abre DevTools (F12)
3. Ve a **Application** → **Manifest**
4. Debe mostrar "Manifest válido"
5. Ve a **Application** → **Service Workers**
6. Debe mostrar el Service Worker como "activated"

---

## 📱 Paso 9: Probar Instalación

### En iPhone (Safari):

1. Abre la app en Safari
2. Toca el botón **Compartir** 📤
3. Selecciona **"Agregar a pantalla de inicio"**
4. Toca **"Agregar"**
5. Abre desde el icono en la pantalla de inicio

### En Android (Chrome):

1. Abre la app en Chrome
2. Aparecerá un banner "Agregar a pantalla de inicio"
3. Toca **"Agregar"**
4. O ve a Menú → **"Agregar a pantalla de inicio"**

### En Desktop (Chrome/Edge):

1. Aparecerá un icono de instalación en la barra de direcciones
2. Haz clic en el icono
3. Confirma la instalación

---

## 🎨 Paso 10: (Opcional) Agregar Banner de Instalación

Si quieres agregar un banner que invite a instalar la app, puedes usar este componente:

### Crear `src/components/InstallPrompt.jsx`

```javascript
import { useState, useEffect } from 'react'
import { isInstalled } from '../utils/pwa.js'

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (isInstalled()) {
      return
    }

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    if (iOS) {
      const dismissedTime = localStorage.getItem('installPromptDismissed')
      const oneHourAgo = Date.now() - (60 * 60 * 1000)
      
      if (!dismissedTime || parseInt(dismissedTime) < oneHourAgo) {
        setShowPrompt(true)
      }
    }

    if (window.deferredPrompt) {
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      window.deferredPrompt = e
      setShowPrompt(true)
    })
  }, [])

  const handleInstall = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt()
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setShowPrompt(false)
        }
        window.deferredPrompt = null
      })
    }
  }

  const handleClose = () => {
    setShowPrompt(false)
    localStorage.setItem('installPromptDismissed', Date.now().toString())
  }

  if (isInstalled() || !showPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 max-w-md mx-auto">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            Instalar App
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {isIOS 
              ? 'Toca el botón compartir 📤 y selecciona "Agregar a pantalla de inicio"'
              : 'Instala la app para acceso rápido desde tu pantalla de inicio'
            }
          </p>
        </div>
        <div className="flex gap-2">
          {!isIOS && (
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg"
            >
              Instalar
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt
```

Luego agrégalo a tu `App.jsx`:

```javascript
import InstallPrompt from './components/InstallPrompt'

function App() {
  return (
    <>
      <InstallPrompt />
      {/* Tu contenido aquí */}
    </>
  )
}
```

---

## 📋 Checklist Final

- [ ] `public/manifest.json` creado y configurado
- [ ] Iconos generados y colocados en `public/`
- [ ] Meta tags agregados en `index.html`
- [ ] `public/sw.js` creado
- [ ] `src/utils/pwa.js` creado
- [ ] Service Worker registrado en `main.jsx`
- [ ] `vercel.json` creado (si usas Vercel)
- [ ] Build funciona correctamente
- [ ] Manifest válido en DevTools
- [ ] Service Worker activado
- [ ] Prueba de instalación exitosa

---

## 🐛 Solución de Problemas

### "Manifest no válido"
- Verifica que todos los iconos existan
- Verifica que `manifest.json` tenga sintaxis correcta

### "Service Worker no se registra"
- Verifica que `sw.js` esté en `public/`
- Verifica que la ruta sea `/sw.js` (no `/public/sw.js`)

### "No aparece opción de instalar"
- Debe ser HTTPS (Vercel lo tiene automáticamente)
- En iOS, debe ser Safari (no Chrome)
- Verifica que el manifest esté correcto

### "Pantalla en blanco al abrir instalada"
- Limpia el cache del Service Worker
- Verifica que el Service Worker no esté bloqueando recursos
- Reinstala la app

---

## 📚 Recursos Adicionales

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)
- [PWA Checklist](https://web.dev/pwa-checklist/)

---

## ✅ ¡Listo!

Tu app ahora es una PWA instalable. Los usuarios pueden instalarla en sus dispositivos sin necesidad de app stores.

**¿Preguntas?** Revisa la documentación o los archivos de ejemplo en este proyecto.

