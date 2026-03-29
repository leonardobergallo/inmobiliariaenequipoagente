import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const products = [
  { id: 'paquete', icon: '💎', name: 'Paquete Completo', desc: 'Todo: Web + Portal + CRM + Alquileres + Expensas', price: '$899.000', color: 'from-violet-500 to-purple-600', popular: true },
  { id: 'web', icon: '🌐', name: 'Página Web', desc: 'Tu web profesional con propiedades', price: '$299.000', color: 'from-blue-400 to-blue-600', popular: false },
  { id: 'alquileres', icon: '🔑', name: 'Gestión de Alquileres', desc: 'Control de contratos, pagos e inquilinos', price: '$499.000', color: 'from-amber-400 to-orange-500', popular: false },
  { id: 'expensas', icon: '🏢', name: 'Sistema de Expensas', desc: 'Administración de consorcios profesional', price: '$599.000', color: 'from-emerald-400 to-teal-500', popular: false },
  { id: 'crm', icon: '📊', name: 'CRM', desc: 'Gestión de clientes y leads', price: '$349.000', color: 'from-rose-400 to-pink-500', popular: false },
  { id: 'portal', icon: '🏠', name: 'Portal de Propiedades', desc: 'Tu propia plataforma tipo Market Santa Fe', price: '$399.000', color: 'from-cyan-400 to-indigo-500', popular: false },
]

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

const SalesDashboard = () => {
  const navigate = useNavigate()
  const [clientName, setClientName] = useState('')

  const startProposal = (type) => {
    const name = clientName.trim() || 'Inmobiliaria'
    navigate(`/propuesta/${type}/${encodeURIComponent(name)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingMenu />
      
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              IT360 <span className="text-blue-400">Soluciones</span>
            </h1>
            <p className="text-2xl text-slate-400">Software para Inmobiliarias</p>
          </div>

          <div className="bg-slate-800/50 rounded-3xl p-8 mb-8 backdrop-blur">
            <label className="text-slate-400 text-xl mb-3 block">¿A quién le vas a presentar?</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-6 py-5 bg-slate-900 border border-slate-700 rounded-2xl text-white text-xl placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              placeholder="Ej: Inmobiliaria Liliana"
            />
          </div>

          <p className="text-slate-400 text-xl mb-6">Seleccioná un producto:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <button 
                key={product.id}
                onClick={() => startProposal(product.id)}
                className="bg-slate-800/50 hover:bg-slate-800 rounded-3xl p-6 transition-all duration-300 flex flex-col border border-slate-700 hover:border-slate-600 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                    <span className="text-3xl">{product.icon}</span>
                  </div>
                  {product.popular && (
                    <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-medium rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-slate-400 mb-4 flex-1">{product.desc}</p>
                <div className="flex items-end justify-between pt-4 border-t border-slate-700">
                  <p className="text-3xl font-bold text-white">{product.price}</p>
                  <span className="text-blue-400 text-lg group-hover:translate-x-2 transition">Ver →</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-xl mb-6">¿Querés ver más opciones?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://wa.me/3425089906?text=Hola" 
                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-2xl transition"
              >
                💬 WhatsApp
              </a>
              <button 
                onClick={() => navigate('/demos')}
                className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white text-xl font-bold rounded-2xl transition"
              >
                🎮 Ver Todas las Demos
              </button>
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

export default SalesDashboard
