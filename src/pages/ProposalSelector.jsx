import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const proposals = [
  {
    id: 'alquileres',
    title: 'Administración de Alquileres',
    subtitle: 'Sistema de gestión para propiedades e inquilinos',
    icon: '🔑',
    bgGradient: 'from-amber-400 via-orange-500 to-red-500',
    price: '$499.000',
    priceMonth: '$29.000/mes',
    weeks: 4
  },
  {
    id: 'web',
    title: 'Página Web Inmobiliaria',
    subtitle: 'Diseño profesional y presencia online',
    icon: '🌐',
    bgGradient: 'from-blue-400 via-blue-500 to-cyan-500',
    price: '$299.000',
    priceMonth: '$15.000/mes',
    weeks: 2
  },
  {
    id: 'expensas',
    title: 'Sistema de Expensas',
    subtitle: 'Administración profesional de consorcios',
    icon: '🏢',
    bgGradient: 'from-purple-400 via-violet-500 to-purple-600',
    price: '$599.000',
    priceMonth: '$35.000/mes',
    weeks: 4
  },
  {
    id: 'crm',
    title: 'CRM Inmobiliario',
    subtitle: 'Gestión completa de clientes y leads',
    icon: '📊',
    bgGradient: 'from-emerald-400 via-green-500 to-teal-500',
    price: '$349.000',
    priceMonth: '$25.000/mes',
    weeks: 3
  },
  {
    id: 'portal',
    title: 'Portal de Propiedades',
    subtitle: 'Tu propia plataforma como Market Santa Fe',
    icon: '🏠',
    bgGradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    price: '$399.000',
    priceMonth: '$25.000/mes',
    weeks: 3
  },
  {
    id: 'paquete',
    title: 'Paquete Completo',
    subtitle: 'Todo lo que tu inmobiliaria necesita',
    icon: '💎',
    bgGradient: 'from-rose-400 via-red-500 to-orange-500',
    price: '$899.000',
    priceMonth: '$49.000/mes',
    weeks: 6
  }
]

const ProposalSelector = () => {
  const navigate = useNavigate()
  const [clientName, setClientName] = useState('Inmobiliaria')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">IT360 Soluciones</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Propuestas Comerciales</h1>
          <p className="text-xl text-gray-500">Seleccioná una propuesta para presentar</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <label className="text-base text-gray-500 mb-3 block font-medium">Nombre del cliente:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg text-gray-900"
            placeholder="Nombre del cliente"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {proposals.map(proposal => (
            <div 
              key={proposal.id}
              onClick={() => navigate(`/propuesta/${proposal.id}/${encodeURIComponent(clientName)}`)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className={`h-2 bg-gradient-to-r ${proposal.bgGradient}`}></div>
              <div className="p-6">
                <div className="flex items-start gap-5">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${proposal.bgGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="text-4xl">{proposal.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{proposal.title}</h3>
                    <p className="text-base text-gray-500 mt-1">{proposal.subtitle}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{proposal.price}</p>
                    <p className="text-base text-gray-500">{proposal.priceMonth}</p>
                  </div>
                  <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                    ⏱️ {proposal.weeks} semanas
                  </span>
                </div>
                
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Clic para ver propuesta</span>
                  <span className="text-blue-500 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center">
          <p className="text-2xl font-bold mb-3">💎 Paquetes con descuento</p>
          <p className="text-gray-300 text-lg mb-6">Ahorrá hasta 30% comprando múltiples módulos</p>
          <a href="https://wa.me/3425089906?text=Hola, quiero info de paquetes" className="inline-block px-8 py-4 bg-green-500 text-white rounded-xl text-lg font-bold hover:bg-green-600 transition shadow-lg">
            💬 Consultar Paquetes
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProposalSelector
