import { useState, useEffect } from 'react'
import { isInstalled } from '../utils/pwa.js'

const InstallHelpButton = () => {
  const [showButton, setShowButton] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
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

    // Mostrar botón después de 2 segundos
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    setShowModal(true)
    setCurrentStep(0)
  }

  const handleClose = () => {
    setShowModal(false)
    setCurrentStep(0)
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps = [
    {
      title: 'Paso 1: Busca el botón Compartir',
      description: 'En la barra inferior de Safari, busca el botón con un cuadrado y una flecha hacia arriba 📤',
      icon: 'share',
      highlight: 'bottom'
    },
    {
      title: 'Paso 2: Desplázate hacia abajo',
      description: 'En el menú que aparece, desplázate hacia abajo hasta encontrar "Agregar a pantalla de inicio"',
      icon: 'arrow_downward',
      highlight: 'menu'
    },
    {
      title: 'Paso 3: Toca "Agregar"',
      description: 'Toca "Agregar a pantalla de inicio" y luego confirma tocando "Agregar" en la esquina superior derecha',
      icon: 'add_to_home_screen',
      highlight: 'add'
    }
  ]

  if (isInstalled()) {
    return null
  }

  return (
    <>
      {showButton && (
        <button
          onClick={handleClick}
          className="fixed bottom-24 right-4 z-[9998] bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center animate-bounce"
          aria-label="Instalar app"
          title="Instalar app en pantalla de inicio"
        >
          <span className="material-symbols-outlined text-2xl">download</span>
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">download</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Instalar App
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Paso {currentStep + 1} de {steps.length}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-6 min-h-[200px]">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    {steps[currentStep].icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </div>

              {/* Visual Guide */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                {currentStep === 0 && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-xl mb-3">
                      <span className="material-symbols-outlined text-primary text-3xl">share</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Busca este botón en la barra inferior de Safari
                    </p>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-xl mb-3">
                      <span className="material-symbols-outlined text-primary text-3xl">arrow_downward</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Desplázate hacia abajo en el menú de compartir
                    </p>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-xl mb-3">
                      <span className="material-symbols-outlined text-primary text-3xl">add_to_home_screen</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Toca "Agregar a pantalla de inicio" y luego "Agregar"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                className={`flex-1 px-4 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-lg ${
                  currentStep === 0 ? 'w-full' : ''
                }`}
              >
                {currentStep === steps.length - 1 ? 'Entendido ✓' : 'Siguiente →'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  )
}

export default InstallHelpButton

