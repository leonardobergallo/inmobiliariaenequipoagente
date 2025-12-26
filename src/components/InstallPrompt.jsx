import { useState, useEffect } from 'react'
import { isInstalled } from '../utils/pwa.js'

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Pequeño delay para asegurar que todo esté cargado
    const timer = setTimeout(() => {
      // Detectar si ya está instalada
      const installed = isInstalled()
      if (installed) {
        setIsStandalone(true)
        console.log('App ya está instalada, no mostrar prompt')
        return
      }

      // Detectar iOS - método más robusto
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                  window.navigator.standalone === true
      
      setIsIOS(iOS)
      console.log('iOS detectado:', iOS, 'User Agent:', navigator.userAgent)

      // Para iOS: mostrar siempre el prompt si no está instalada
      if (iOS) {
        // Verificar si fue cerrado recientemente (reducido a 1 hora para testing)
        const dismissedTime = localStorage.getItem('installPromptDismissed')
        const oneHourAgo = Date.now() - (60 * 60 * 1000) // 1 hora
        
        if (!dismissedTime || parseInt(dismissedTime) < oneHourAgo) {
          setShowPrompt(true)
          console.log('Mostrando prompt de instalación para iOS')
        } else {
          console.log('Prompt cerrado recientemente, no mostrar')
        }
        return
      }

      // Para Android/Desktop: mostrar solo si hay deferredPrompt
      if (window.deferredPrompt) {
        setShowPrompt(true)
        console.log('Mostrando prompt de instalación para Android/Desktop')
      }

      // Escuchar el evento beforeinstallprompt
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault()
        window.deferredPrompt = e
        setShowPrompt(true)
        console.log('beforeinstallprompt recibido')
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }, 1000) // 1 segundo de delay para asegurar renderizado

    return () => clearTimeout(timer)
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
    // Guardar en localStorage para no mostrar de nuevo por un tiempo (1 hora)
    localStorage.setItem('installPromptDismissed', Date.now().toString())
  }

  // Función para forzar mostrar el prompt (útil para debugging)
  const forceShow = () => {
    localStorage.removeItem('installPromptDismissed')
    setShowPrompt(true)
  }

  // Exponer función global para debugging
  useEffect(() => {
    window.showInstallPrompt = forceShow
    return () => {
      delete window.showInstallPrompt
    }
  }, [])

  // No mostrar si ya está instalada o si el usuario cerró el prompt recientemente
  if (isStandalone || !showPrompt) {
    return null
  }

  // Verificar si el usuario cerró el prompt en la última hora (reducido para testing)
  const dismissedTime = localStorage.getItem('installPromptDismissed')
  const oneHourAgo = Date.now() - (60 * 60 * 1000) // 1 hora
  
  if (dismissedTime && parseInt(dismissedTime) > oneHourAgo) {
    console.log('Prompt cerrado recientemente, no mostrar')
    return null
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 z-[9999] px-4 md:max-w-md md:mx-auto md:left-1/2 md:transform md:-translate-x-1/2 animate-slide-up" style={{ pointerEvents: 'auto' }}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-primary/20 dark:border-gray-700 p-4 flex items-center gap-3 backdrop-blur-sm">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl">download</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            Instalar App
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {isIOS 
              ? 'Toca el botón compartir 📤 y selecciona "Agregar a pantalla de inicio"'
              : 'Instala la app para acceso rápido desde tu pantalla de inicio'
            }
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-2">
          {!isIOS && (
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-600 active:scale-95 transition-all shadow-lg"
            >
              Instalar
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 active:scale-95 transition-all rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
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

