import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const proposals = [
  {
    id: 'web',
    title: 'Pagina Web Inmobiliaria',
    subtitle: 'Profesional, con catalogo, filtros y WhatsApp',
    icon: '🌐',
    bgGradient: 'from-blue-400 via-blue-500 to-cyan-500',
    price: '$359.000',
    priceMonth: '$59.000/mes',
    weeks: 4
  },
  {
    id: 'portal',
    title: 'Tienda en Market Santa Fe',
    subtitle: 'Publicacion inmobiliaria dentro de Market Santa Fe',
    icon: '🏪',
    bgGradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    price: '$89.999',
    priceMonth: '$30.000 /mensual',
    weeks: 2
  },
  {
    id: 'crm',
    title: 'Para Propiedades',
    subtitle: 'Planes Premium, Inmobiliaria y Profesional',
    icon: '📋',
    bgGradient: 'from-emerald-400 via-green-500 to-teal-500',
    price: '$359.000',
    priceMonth: 'Mantenimiento $59.000 /mensual',
    weeks: 1
  },
  {
    id: 'alquileres',
    title: 'Administracion de Alquileres',
    subtitle: 'Sistema de gestión para propiedades e inquilinos',
    icon: '🔑',
    bgGradient: 'from-amber-400 via-orange-500 to-red-500',
    price: '$499.000',
    priceMonth: '$29.000/mes',
    weeks: 4
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
  }
]

const ProposalSelector = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [clientName, setClientName] = useState('Inmobiliaria')
  const params = new URLSearchParams(location.search)
  const clientMode = params.get('modo') === 'cliente'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
            <span className="text-sm font-medium text-gray-600">IT360 Soluciones</span>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">Propuestas Comerciales</h1>
          <p className="text-xl text-gray-500">
            {clientMode ? 'Selecciona una propuesta para compartir sin valores visibles' : 'Seleccioná una propuesta para presentar'}
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
          <label className="mb-3 block text-base font-medium text-gray-500">Nombre del cliente:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-lg text-gray-900"
            placeholder="Nombre del cliente"
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              onClick={() => navigate({
                pathname: `/propuesta/${proposal.id}/${encodeURIComponent(clientName)}`,
                search: clientMode ? '?modo=cliente' : ''
              })}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
            >
              <div className={`h-2 bg-gradient-to-r ${proposal.bgGradient}`}></div>
              <div className="p-6">
                <div className="flex items-start gap-5">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${proposal.bgGradient} shadow-lg transition-transform group-hover:scale-110`}>
                    <span className="text-4xl">{proposal.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{proposal.title}</h3>
                    <p className="mt-1 text-base text-gray-500">{proposal.subtitle}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  {!clientMode && (
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{proposal.price}</p>
                      <p className="text-base text-gray-500">{proposal.priceMonth}</p>
                    </div>
                  )}
                  {clientMode && (
                    <div>
                      <p className="text-lg font-bold text-gray-900">Valores en reunion comercial</p>
                      <p className="text-base text-gray-500">Demo y alcance segun necesidad</p>
                    </div>
                  )}
                  <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                    ⏱️ {proposal.weeks} semanas
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm text-gray-400">Clic para ver propuesta</span>
                  <span className="font-semibold text-blue-500 transition-transform group-hover:translate-x-2">
                    Ver →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-center text-white">
          <p className="mb-3 text-2xl font-bold">Soluciones combinadas</p>
          <p className="mb-6 text-lg text-gray-300">Podés agrupar múltiples módulos en una sola propuesta a medida</p>
          <a href="https://wa.me/3425089906?text=Hola, quiero una propuesta a medida" className="inline-block rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-600">
            💬 Consultar propuesta
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProposalSelector
