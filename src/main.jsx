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

// Renderizar la app
try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('No se encontró el elemento #root')
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (error) {
  console.error('Error al renderizar la app:', error)
  // Mostrar mensaje de error en la pantalla
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; padding: 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif;">
      <h1 style="font-size: 24px; margin-bottom: 16px; color: #111;">Error al cargar la app</h1>
      <p style="color: #666; margin-bottom: 16px;">Por favor, recarga la página.</p>
      <button onclick="window.location.reload()" style="padding: 12px 24px; background: #137fec; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
        Recargar
      </button>
      <p style="color: #999; font-size: 12px; margin-top: 24px;">Error: ${error.message}</p>
    </div>
  `
}

