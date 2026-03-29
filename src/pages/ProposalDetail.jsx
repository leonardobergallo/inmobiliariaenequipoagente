import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const proposals = {
  alquileres: { title: 'Administración de Alquileres', icon: '🔑', price: '$499.000', priceMonth: '$29.000/mes', color: '#f59e0b', bgGradient: 'from-amber-500 to-orange-500', features: ['Propiedades', 'Propietarios', 'Inquilinos', 'Contratos', 'Pagos', 'Reportes', 'Alertas', 'Historial'], weeks: 4 },
  web: { title: 'Página Web Inmobiliaria', icon: '🌐', price: '$299.000', priceMonth: '$15.000/mes', color: '#3b82f6', bgGradient: 'from-blue-500 to-cyan-500', features: ['Diseño profesional', 'Propiedades', 'Diseño responsive', 'Tu marca', 'SEO', 'Galería'], weeks: 2 },
  expensas: { title: 'Sistema de Expensas', icon: '🏢', price: '$599.000', priceMonth: '$35.000/mes', color: '#8b5cf6', bgGradient: 'from-purple-500 to-violet-500', features: ['Múltiples edificios', 'Liquidaciones', 'Portal propietarios', 'Control deudas', 'Reportes PDF'], weeks: 4 },
  crm: { title: 'CRM Inmobiliario', icon: '📊', price: '$349.000', priceMonth: '$25.000/mes', color: '#10b981', bgGradient: 'from-emerald-500 to-teal-500', features: ['Gestión leads', 'Seguimiento', 'Tareas', 'Historial', 'Pipeline', 'Reportes'], weeks: 3 },
  portal: { title: 'Portal de Propiedades', icon: '🏠', price: '$399.000', priceMonth: '$25.000/mes', color: '#06b6d4', bgGradient: 'from-cyan-500 to-indigo-500', features: ['Tu marca', 'Publicación ilimitada', 'Búsqueda', 'Filtros', 'Perfil agencia'], weeks: 3 },
  paquete: { title: 'Paquete Completo', icon: '💎', price: '$899.000', priceMonth: '$49.000/mes', color: '#ec4899', bgGradient: 'from-rose-500 to-pink-500', features: ['Todos los módulos', 'Página Web', 'Portal', 'CRM', 'Alquileres', 'Expensas', 'Soporte'], weeks: 6 }
}

const slides = ['cover', 'features', 'investment', 'maintenance', 'demos', 'contact']

const FloatingMenu = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const menuItems = [
    { path: '/', label: 'Venta', icon: '💰' },
    { path: '/demos', label: 'Demos', icon: '🎮' },
    { path: '/portal', label: 'Portal', icon: '🏠' },
    { path: '/crm', label: 'CRM', icon: '📊' },
    { path: '/rentals', label: 'Alquileres', icon: '🔑' },
    { path: '/expenses', label: 'Expensas', icon: '🏢' },
  ]

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex gap-1">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
              location.pathname === item.path
                ? 'bg-white text-black'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{item.icon}</span>
            <span className="hidden lg:inline font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const ProposalDetail = () => {
  const { type, client } = useParams()
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const clientName = client ? decodeURIComponent(client) : 'Inmobiliaria'
  const proposal = proposals[type] || proposals.alquileres

  const nextSlide = () => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1)
  const prevSlide = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  const renderSlide = () => {
    switch (slides[currentSlide]) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-8 border border-slate-700 shadow-2xl">
              <span className="text-7xl">{proposal.icon}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{proposal.title}</h1>
            <p className="text-2xl text-slate-400 mb-8">para <span className="text-blue-400 font-bold">{clientName}</span></p>
            <div className="px-8 py-4 bg-slate-800 rounded-full border border-slate-700">
              <p className="text-slate-400 text-xl">Válido 15 días • Marzo 2026</p>
            </div>
          </div>
        )
      
      case 'features':
        return (
          <div className="py-8">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">¿Qué incluye?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {proposal.features.map((item, i) => (
                <div key={i} className="p-5 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-3">
                  <span className="text-green-400 text-2xl">✓</span>
                  <span className="text-white text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'investment':
        return (
          <div className="py-8">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Inversión</h2>
            <div className={`p-12 bg-gradient-to-br ${proposal.bgGradient} rounded-3xl mb-8 shadow-2xl`}>
              <p className="text-white/80 text-2xl">IMPLEMENTACIÓN</p>
              <p className="text-7xl md:text-8xl font-bold text-white">{proposal.price}</p>
              <p className="text-white/80 text-2xl">pago único</p>
            </div>
            <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-slate-400 text-xl text-center">Mantenimiento mensual</p>
              <p className="text-4xl font-bold text-white text-center">{proposal.priceMonth}</p>
            </div>
          </div>
        )
      
      case 'maintenance':
        return (
          <div className="py-8">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Incluye</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['🌐 Hosting 24/7', '🎫 Soporte directo', '💾 Backups', '📝 Ajustes', '🚀 Actualizaciones'].map((item, i) => (
                <div key={i} className="p-5 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-4 text-xl">
                  <span className="text-2xl">{item.split(' ')[0]}</span>
                  <span className="text-white">{item.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-amber-500/20 border-2 border-amber-500/50 rounded-2xl">
              <p className="text-amber-400 text-2xl text-center font-bold">🎁 15% descuento si contratas hoy</p>
            </div>
          </div>
        )
      
      case 'demos':
        return (
          <div className="py-8">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">🎮 Ve nuestras demos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://www.it360.com.ar/?v=2" target="_blank" className="p-5 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition">
                <span className="text-3xl">🌐</span>
                <p className="text-white font-bold mt-2">Página Web IT360</p>
              </a>
              <a href="https://www.glagrimensura.com.ar/" target="_blank" className="p-5 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition">
                <span className="text-3xl">📐</span>
                <p className="text-white font-bold mt-2">Web Profesional Ejemplo</p>
              </a>
              <a href="https://www.marketsantafe.com.ar/demo" target="_blank" className="p-5 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition">
                <span className="text-3xl">🛒</span>
                <p className="text-white font-bold mt-2">Market Santa Fe</p>
              </a>
              <a href="https://crminmobiliaria-neon.vercel.app/demo" target="_blank" className="p-5 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition">
                <span className="text-3xl">🏢</span>
                <p className="text-white font-bold mt-2">CRM Inmobiliario</p>
              </a>
              <a href="https://expensas-maxi.vercel.app/demo/" target="_blank" className="p-5 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition">
                <span className="text-3xl">🏢</span>
                <p className="text-white font-bold mt-2">Sistema de Expensas</p>
              </a>
              <button onClick={() => navigate('/demos')} className="p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl border border-slate-700 hover:border-blue-400 transition">
                <span className="text-3xl">🎮</span>
                <p className="text-white font-bold mt-2">Ver todas las demos</p>
              </button>
            </div>
          </div>
        )
      
      case 'contact':
        return (
          <div className="py-8">
            <div className="p-6 bg-amber-500/20 border-2 border-amber-500/50 rounded-2xl mb-8">
              <p className="text-amber-400 text-3xl text-center font-bold">🎁 15% descuento si contratas hoy</p>
              <p className="text-slate-400 text-center mt-2">Implementación con descuento</p>
            </div>
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Contacto</h2>
            <div className="space-y-4 max-w-lg mx-auto">
              <a href="https://wa.me/3425089906?text=Hola, me interesa" className="flex items-center justify-center gap-4 p-6 bg-green-600 text-white text-2xl font-bold rounded-2xl hover:bg-green-700 transition shadow-lg">
                <span className="text-3xl">💬</span> WhatsApp
              </a>
              <a href="tel:+543425089906" className="flex items-center justify-center gap-4 p-6 bg-slate-800 text-white text-2xl font-bold rounded-2xl hover:bg-slate-700 transition border border-slate-700">
                <span className="text-3xl">📞</span> Llamar
              </a>
              <a href="mailto:it360tecnologia@gmail.com" className="flex items-center justify-center gap-4 p-6 bg-slate-800 text-white text-2xl font-bold rounded-2xl hover:bg-slate-700 transition border border-slate-700">
                <span className="text-3xl">📧</span> Email
              </a>
            </div>
            <p className="text-center text-slate-500 text-xl mt-8">it360.com.ar • @it360soluciones</p>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingMenu />
      
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-5xl w-full">
          <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 text-xl">
            ← Volver
          </button>
          
          <div className="bg-slate-800/50 rounded-3xl p-8 md:p-12 backdrop-blur">
            <div className={`h-2 bg-gradient-to-r ${proposal.bgGradient} rounded-full mb-8`}></div>
          
            {renderSlide()}

            <div className="mt-12">
              <div className="flex justify-center gap-3 mb-8">
                {slides.map((_, i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-12 bg-white' : 'w-4 bg-slate-700'}`} />
                ))}
              </div>
              
              <div className="flex gap-4">
                <button onClick={prevSlide} disabled={currentSlide === 0} className={`flex-1 py-5 rounded-2xl font-bold text-xl transition ${currentSlide === 0 ? 'bg-slate-800 text-slate-600' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
                  ← Anterior
                </button>
                <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className={`flex-1 py-5 rounded-2xl font-bold text-xl transition ${currentSlide === slides.length - 1 ? 'bg-slate-800 text-slate-600' : 'bg-white text-black hover:bg-gray-200'}`}>
                  {currentSlide === slides.length - 1 ? 'Fin' : 'Siguiente →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalDetail
