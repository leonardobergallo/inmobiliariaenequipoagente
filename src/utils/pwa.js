// Utilidades para PWA
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    // Registrar inmediatamente, no esperar a 'load'
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registrado:', registration)
        // Verificar actualizaciones
        registration.update()
      })
      .catch((error) => {
        console.log('Error al registrar SW:', error)
        // No bloquear la app si el SW falla
      })
  }
}

// Detectar si la app está instalada
export const isInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone ||
         document.referrer.includes('android-app://')
}

// Mostrar prompt de instalación
export const showInstallPrompt = () => {
  // Para Chrome/Edge
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt()
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuario aceptó instalar')
      }
      window.deferredPrompt = null
    })
  }
}

// Detectar si es instalable
export const isInstallable = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window
}

