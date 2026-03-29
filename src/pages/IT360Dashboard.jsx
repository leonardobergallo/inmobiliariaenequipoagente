import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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

const demos = [
  {
    title: 'Página Web IT360',
    description: 'Desarrollo de páginas web y sistemas para profesionales y negocios',
    icon: '🌐',
    url: 'https://www.it360.com.ar/?v=2',
    color: 'from-blue-500 to-blue-700'
  },
  {
    title: 'Web Profesional - Ejemplo',
    description: 'Ejemplo de web profesional para inmobiliarias y profesionales',
    icon: '📐',
    url: 'https://www.glagrimensura.com.ar/',
    color: 'from-cyan-500 to-cyan-700'
  },
  {
    title: 'Market Santa Fe',
    description: 'Plataforma de compra y venta local - Tienda online',
    icon: '🛒',
    url: 'https://www.marketsantafe.com.ar/demo',
    color: 'from-orange-500 to-orange-700'
  },
  {
    title: 'CRM Inmobiliario',
    description: 'Gestión de propiedades y clientes - Demo completo',
    icon: '🏢',
    url: 'https://crminmobiliaria-neon.vercel.app/demo',
    color: 'from-green-500 to-green-700'
  },
  {
    title: 'Sistema de Expensas',
    description: 'Administración de consorcios - Demo profesional',
    icon: '🏢',
    url: 'https://expensas-maxi.vercel.app/demo/',
    color: 'from-purple-500 to-purple-700'
  },
  {
    title: 'Portal de Propiedades',
    description: 'Tu propia plataforma tipo Market Santa Fe',
    icon: '🏠',
    url: '/portal',
    internal: true,
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    title: 'Gestión de Alquileres',
    description: 'Control de contratos, pagos e inquilinos',
    icon: '🔑',
    url: '/rentals',
    internal: true,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'CRM Inmobiliario (Nuevo)',
    description: 'Gestión de clientes y leads',
    icon: '📊',
    url: '/crm',
    internal: true,
    color: 'from-rose-500 to-pink-500'
  }
]

const IT360Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingMenu />
      
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              🎮 <span className="text-blue-400">Demos</span>
            </h1>
            <p className="text-2xl text-slate-400">Ve nuestros sistemas en acción</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo, i) => (
              <a
                key={i}
                href={demo.internal ? demo.url : demo.url}
                target={demo.internal ? '_self' : '_blank'}
                rel={demo.internal ? '' : 'noopener noreferrer'}
                onClick={(e) => {
                  if (demo.internal) {
                    e.preventDefault()
                    navigate(demo.url)
                  }
                }}
                className="bg-slate-800/50 hover:bg-slate-800 rounded-3xl p-6 transition-all duration-300 flex flex-col border border-slate-700 hover:border-slate-500 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${demo.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                    <span className="text-3xl">{demo.icon}</span>
                  </div>
                  {!demo.internal && (
                    <span className="text-slate-500">↗</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
                <p className="text-slate-400 mb-4 flex-1">{demo.description}</p>
                <div className="pt-4 border-t border-slate-700">
                  <span className={`px-4 py-2 bg-gradient-to-r ${demo.color} text-white rounded-xl font-medium inline-flex items-center gap-2`}>
                    {demo.internal ? 'Ver demo →' : 'Abrir demo ↗'}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">¿Querés ver más?</h2>
              <p className="text-slate-400 mb-6">Contactanos y te mostramos una demo personalizada</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://wa.me/3425089906?text=Hola, quiero ver una demo" 
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-2xl transition"
                >
                  💬 WhatsApp
                </a>
                <a href="tel:+543425089906" className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white text-xl font-bold rounded-2xl transition">
                  📞 Llamar
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 text-center">
            <div className="flex items-center justify-center gap-6 text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                it360.com.ar
              </span>
              <span>@it360soluciones</span>
              <span>📞 3425089906</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IT360Dashboard
