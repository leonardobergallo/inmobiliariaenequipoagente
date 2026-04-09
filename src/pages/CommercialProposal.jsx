import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const CommercialProposal = () => {
  const { client } = useParams()
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const clientName = client ? decodeURIComponent(client) : 'Inmobiliaria'

  const slides = [
    {
      title: 'IT360 Soluciones',
      subtitle: 'Administración de Alquileres',
      content: (
        <div className="text-center">
          <p className="text-xl font-bold mb-4">Propuesta comercial para</p>
          <p className="text-2xl font-bold text-blue-600">{clientName}</p>
          <p className="text-gray-500 mt-4">Marzo 2026</p>
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">Válido por 15 días</p>
          </div>
        </div>
      ),
      icon: '💻'
    },
    {
      title: 'El Problema',
      subtitle: '¿Por qué necesitas este sistema?',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <span className="text-xl">📋</span>
            <div>
              <p className="font-bold text-red-600">Facturación manual</p>
              <p className="text-sm text-gray-600">Planillas, Excel y papeles dispersos</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
            <span className="text-xl">😰</span>
            <div>
              <p className="font-bold text-yellow-600">Sin trazabilidad</p>
              <p className="text-sm text-gray-600">No sabés qué pagaron o qué deben</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <span className="text-xl">⏰</span>
            <div>
              <p className="font-bold text-orange-600">Pérdida de tiempo</p>
              <p className="text-sm text-gray-600">Buscando papeles y calculando a mano</p>
            </div>
          </div>
        </div>
      ),
      icon: '⚠️'
    },
    {
      title: 'La Solución',
      subtitle: 'Todo centralizado y automático',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-bold text-green-600">Adiós a la facturación manual</p>
              <p className="text-sm text-gray-600">Contratos, cobros y reportes en un solo sistema</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🏠</span>
            <div>
              <p className="font-bold text-blue-600">Todo centralizado</p>
              <p className="text-sm text-gray-600">Propiedades, inquilinos, contratos y pagos</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <span className="text-xl">📊</span>
            <div>
              <p className="font-bold text-purple-600">Más control, menos errores</p>
              <p className="text-sm text-gray-600">Trazabilidad y reportes listos cuando los necesites</p>
            </div>
          </div>
        </div>
      ),
      icon: '✨'
    },
    {
      title: '¿Qué incluye?',
      subtitle: 'Sistema completo de gestión',
      content: (
        <div className="grid grid-cols-2 gap-3">
          {['Propiedades', 'Propietarios', 'Inquilinos', 'Contratos', 'Pagos', 'Reportes', 'Alertas', 'Historial'].map((item, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="font-bold text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      ),
      icon: '📦'
    },
    {
      title: 'Plan de Trabajo',
      subtitle: 'Implementación en 4 semanas',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-bold">Semana 1</p>
              <p className="text-sm text-gray-600">Setup y carga de datos iniciales</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-bold">Semanas 2-3</p>
              <p className="text-sm text-gray-600">Configuración y pruebas</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-bold">Semana 4</p>
              <p className="text-sm text-gray-600">Capacitación y puesta en marcha</p>
            </div>
          </div>
        </div>
      ),
      icon: '📅'
    },
    {
      title: 'Inversión',
      subtitle: 'Administración de Alquileres',
      content: (
        <div className="text-center">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl text-white mb-4">
            <p className="text-sm opacity-80">IMPLEMENTACIÓN</p>
            <p className="text-4xl font-bold">$499.000</p>
            <p className="text-sm opacity-80">en 3 pagos</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-xl font-bold">$166.333</p>
              <p className="text-xs text-gray-500">Pago 1</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-xl font-bold">$166.333</p>
              <p className="text-xs text-gray-500">Pago 2</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-xl font-bold">$166.334</p>
              <p className="text-xs text-gray-500">Pago 3</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600">Mantenimiento opcional</p>
            <p className="text-2xl font-bold text-green-600">$29.000/mes</p>
          </div>
        </div>
      ),
      icon: '💰'
    },
    {
      title: 'Mantenimiento',
      subtitle: '¿Qué incluye?',
      content: (
        <div className="space-y-3">
          {[
            '🌐 Hosting del sistema online 24/7',
            '🎫 Soporte técnico por canal directo',
            '💾 Backups periódicos y seguridad',
            '📝 Ajustes menores de reportes',
            '🚀 Actualizaciones y optimizaciones'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span>{item}</span>
            </div>
          ))}
        </div>
      ),
      icon: '🔧'
    },
    {
      title: 'Resumen',
      subtitle: 'Lo que obtenés',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span>Implementación</span>
            <span className="font-bold">$499.000</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span>Semanas de implementación</span>
            <span className="font-bold">4 semanas</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span>Mantenimiento mensual</span>
            <span className="font-bold">$29.000/mes</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span>Validez de propuesta</span>
            <span className="font-bold text-green-600">15 días</span>
          </div>
        </div>
      ),
      icon: '📋'
    },
    {
      title: '¿Qué sigue?',
      subtitle: 'Próximos pasos',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <span className="text-2xl">1️⃣</span>
            <p className="font-medium">Confirmás que te interesa</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <span className="text-2xl">2️⃣</span>
            <p className="font-medium">Programamos una demo</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <span className="text-2xl">3️⃣</span>
            <p className="font-medium">Firmamos y arrancamos</p>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-400">
            <p className="text-center font-bold text-yellow-700">Listo para avanzar cuando lo decidan</p>
          </div>
        </div>
      ),
      icon: '👉'
    },
    {
      title: 'Contacto',
      subtitle: 'Hablamos pronto',
      content: (
        <div className="space-y-4">
          <a href="https://wa.me/3425089906?text=Hola, me interesa la propuesta" className="flex items-center justify-center gap-2 p-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600">
            <span>💬</span> WhatsApp
          </a>
          <a href="tel:+543425089906" className="flex items-center justify-center gap-2 p-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600">
            <span>📞</span> Llamar
          </a>
          <div className="text-center mt-6 text-gray-500">
            <p>📧 it360tecnologia@gmail.com</p>
            <p>🌐 it360.com.ar</p>
            <p>📷 @it360soluciones</p>
          </div>
        </div>
      ),
      icon: '📱'
    }
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1)
  }

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0a0e13]">
      <Header title="Propuesta Comercial" subtitle="IT360 Soluciones" />
      
      <div className="p-4 md:ml-64">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-[#151d25] rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">IT360 Soluciones</p>
                  <p className="text-blue-200 text-sm">Desarrollo Web | Apps | Automatización</p>
                </div>
                <span className="text-3xl">{slides[currentSlide].icon}</span>
              </div>
            </div>

            <div className="p-6 min-h-[400px]">
              <p className="text-xs text-gray-400 mb-2">Slide {currentSlide + 1} de {slides.length}</p>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{slides[currentSlide].title}</h2>
              <p className="text-sm text-gray-500 mb-4">{slides[currentSlide].subtitle}</p>
              
              {slides[currentSlide].content}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <button 
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentSlide === 0 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  ← Anterior
                </button>
                <div className="flex gap-1">
                  {slides.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentSlide === slides.length - 1 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {currentSlide === slides.length - 1 ? 'Fin' : 'Siguiente →'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2 justify-center">
            <button 
              onClick={() => navigate(`/propuesta/${encodeURIComponent(clientName)}`)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
            >
              🔄 Cambiar cliente
            </button>
            <button 
              onClick={() => {
                const phone = prompt('Número de WhatsApp del cliente:')
                if (phone) {
                  const message = encodeURIComponent(`Hola! Te envío la propuesta de IT360: https://it360.com.ar/propuesta/${encodeURIComponent(clientName)}`)
                  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
                }
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
            >
              📤 Enviar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommercialProposal
