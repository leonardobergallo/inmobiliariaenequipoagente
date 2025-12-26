import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { registerServiceWorker } from './utils/pwa.js'

// Manejo de errores global
window.addEventListener('error', (event) => {
  console.error('Error global:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Error no manejado:', event.reason)
})

// Registrar Service Worker para PWA
try {
  registerServiceWorker()
} catch (error) {
  console.error('Error al registrar Service Worker:', error)
}

// Detectar evento de instalación (para Android/Desktop)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  window.deferredPrompt = e
  console.log('App lista para instalar')
})

// Detectar si estamos en modo standalone
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                     window.navigator.standalone === true

if (isStandalone) {
  console.log('[App] Modo standalone detectado')
}

// Renderizar la app con timeout de seguridad
const renderApp = () => {
  try {
    const rootElement = document.getElementById('root')
    if (!rootElement) {
      throw new Error('No se encontró el elemento #root')
    }

    // Limpiar cualquier contenido previo
    rootElement.innerHTML = ''

    console.log('[App] Renderizando aplicación...')
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    
    console.log('[App] Aplicación renderizada correctamente')
  } catch (error) {
    console.error('[App] Error al renderizar la app:', error)
    // Mostrar mensaje de error en la pantalla
    const rootElement = document.getElementById('root') || document.body
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; padding: 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif; background: white;">
        <h1 style="font-size: 24px; margin-bottom: 16px; color: #111;">Error al cargar la app</h1>
        <p style="color: #666; margin-bottom: 16px;">Por favor, recarga la página.</p>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background: #137fec; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
          Recargar
        </button>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">Error: ${error.message}</p>
      </div>
    `
  }
}

// Intentar renderizar inmediatamente
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp)
} else {
  renderApp()
}

// Timeout de seguridad: si después de 10 segundos no se renderizó, mostrar error
setTimeout(() => {
  const root = document.getElementById('root')
  if (root && (!root.hasChildNodes() || root.children.length === 0)) {
    console.warn('[App] No se renderizó después de 10 segundos, mostrando mensaje')
    root.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; padding: 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif; background: white;">
        <div style="margin-bottom: 16px;">
          <div style="width: 40px; height: 40px; border: 4px solid #137fec; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
        <h2 style="color: #111; margin-bottom: 8px; font-size: 20px;">Cargando aplicación...</h2>
        <p style="color: #666; margin-bottom: 16px; font-size: 14px;">Si esto tarda mucho, toca el botón de abajo</p>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background: #137fec; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; margin-top: 8px;">
          Recargar
        </button>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `
  }
}, 10000)

