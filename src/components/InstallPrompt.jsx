import { useState, useEffect } from 'react'
import { isInstalled } from '../utils/pwa.js'

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Detectar si ya está instalada
    if (isInstalled()) {
      setIsStandalone(true)
      return
    }

    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    setIsIOS(iOS)

    // Para iOS: mostrar siempre el prompt si no está instalada
    if (iOS) {
      setShowPrompt(true)
      return
    }

    // Para Android/Desktop: mostrar solo si hay deferredPrompt
    if (window.deferredPrompt) {
      setShowPrompt(true)
    }

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      window.deferredPrompt = e
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt()
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario instaló la app')
          setShowPrompt(false)
        }
        window.deferredPrompt = null
      })
    }
  }

  const handleClose = () => {
    setShowPrompt(false)
    // Guardar en localStorage para no mostrar de nuevo por un tiempo
    localStorage.setItem('installPromptDismissed', Date.now().toString())
  }

  // No mostrar si ya está instalada o si el usuario cerró el prompt recientemente
  if (isStandalone || !showPrompt) {
    return null
  }

  // Verificar si el usuario cerró el prompt en las últimas 24 horas
  const dismissedTime = localStorage.getItem('installPromptDismissed')
  if (dismissedTime && Date.now() - parseInt(dismissedTime) < 24 * 60 * 60 * 1000) {
    return null
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 px-4 md:max-w-md md:mx-auto md:left-1/2 md:transform md:-translate-x-1/2">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl">download</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            Instalar App
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {isIOS 
              ? 'Toca el botón compartir y selecciona "Agregar a pantalla de inicio"'
              : 'Instala la app para acceso rápido desde tu pantalla de inicio'
            }
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-2">
          {!isIOS && (
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
            >
              Instalar
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt

