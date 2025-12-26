import { useState, useEffect } from 'react'
import { isInstalled } from '../utils/pwa.js'

const InstallHelpButton = () => {
  const [showButton, setShowButton] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Solo mostrar si no está instalada
    if (isInstalled()) {
      return
    }

    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    
    setIsIOS(iOS)

    // Mostrar botón después de 3 segundos si es iOS
    if (iOS) {
      const timer = setTimeout(() => {
        setShowButton(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClick = () => {
    // Forzar mostrar el prompt
    if (window.showInstallPrompt) {
      window.showInstallPrompt()
    } else {
      // Si no está disponible, mostrar instrucciones
      alert('Para instalar la app:\n\n1. Toca el botón Compartir 📤\n2. Selecciona "Agregar a pantalla de inicio"\n3. Toca "Agregar"')
    }
  }

  if (!showButton || isInstalled()) {
    return null
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-4 z-[9998] bg-primary text-white p-3 rounded-full shadow-2xl hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center"
      aria-label="Ayuda para instalar app"
      title="Instalar app"
    >
      <span className="material-symbols-outlined text-2xl">download</span>
    </button>
  )
}

export default InstallHelpButton

