import { useNavigate, useLocation } from 'react-router-dom'

const proposalUrl = (type, client = 'Inmobiliaria', slide = 'investment') =>
  `/propuesta/${type}/${encodeURIComponent(client)}?slide=${slide}`

const demos = [
  {
    title: 'IT360',
    description: 'Presentacion institucional y servicios',
    icon: '🌐',
    url: 'https://www.it360.com.ar/?v=2',
    color: 'from-blue-500 to-blue-700'
  },
  {
    title: 'Web Profesional - Ejemplo',
    description: 'Referencia de web profesional publicada',
    icon: '📐',
    url: 'https://www.glagrimensura.com.ar/',
    color: 'from-cyan-500 to-cyan-700'
  },
  {
    title: 'Market Santa Fe',
    description: 'Marketplace con demo navegable',
    icon: '🛒',
    url: 'https://www.marketsantafe.com.ar/demo',
    color: 'from-orange-500 to-orange-700'
  },
  {
    title: 'CRM Inmobiliario',
    description: 'Demo funcional de gestion comercial',
    icon: '🏢',
    url: 'https://crminmobiliaria-neon.vercel.app/demo',
    color: 'from-green-500 to-green-700'
  },
  {
    title: 'Sistema de Alquileres',
    description: 'Demo funcional para administracion de alquileres',
    icon: '🔑',
    url: 'https://administracion-alquileres-bigger-n09npjepa.vercel.app/',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    title: 'Sistema de Expensas',
    description: 'Demo profesional para administracion',
    icon: '🏢',
    url: 'https://expensas-maxi.vercel.app/demo/',
    color: 'from-purple-500 to-purple-700'
  }
]

const FloatingMenu = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Presentacion', icon: '💼', onClick: () => navigate('/') },
    { label: 'Proyectos', icon: '🎮', onClick: () => navigate('/demos') },
    { label: 'Web', icon: '🌐', onClick: () => navigate(proposalUrl('web')) },
    { label: 'Portal', icon: '🏠', onClick: () => navigate(proposalUrl('portal')) },
    { label: 'CRM', icon: '📊', onClick: () => navigate(proposalUrl('crm')) },
    { label: 'Alquileres', icon: '🔑', onClick: () => navigate(proposalUrl('alquileres')) },
    { label: 'Expensas', icon: '🏢', onClick: () => navigate(proposalUrl('expensas')) }
  ]

  const isActive = (label) => {
    if (label === 'Presentacion') return location.pathname === '/'
    if (label === 'Proyectos') return location.pathname === '/demos'
    if (label === 'Web') return location.pathname.startsWith('/propuesta/web/')
    if (label === 'Portal') return location.pathname.startsWith('/propuesta/portal/')
    if (label === 'CRM') return location.pathname.startsWith('/propuesta/crm/')
    if (label === 'Alquileres') return location.pathname.startsWith('/propuesta/alquileres/')
    if (label === 'Expensas') return location.pathname.startsWith('/propuesta/expensas/')
    return false
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex gap-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
              isActive(item.label)
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

const IT360Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingMenu />

      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              🎮 <span className="text-blue-400">Proyectos y demos publicados</span>
            </h1>
            <p className="mt-4 text-2xl text-slate-400">
              Esta pantalla queda como respaldo comercial, no como menu principal de venta.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {demos.map((demo) => (
              <a
                key={demo.title}
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-3xl border border-slate-700 bg-slate-800/50 p-6 transition-all duration-300 hover:border-slate-500 hover:bg-slate-800"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${demo.color} text-3xl shadow-lg transition group-hover:scale-110`}>
                    {demo.icon}
                  </div>
                  <span className="text-slate-500">↗</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{demo.title}</h3>
                <p className="mb-4 flex-1 text-slate-400">{demo.description}</p>
                <div className="border-t border-slate-700 pt-4">
                  <span className={`inline-flex gap-2 rounded-xl bg-gradient-to-r ${demo.color} px-4 py-2 font-medium text-white`}>
                    Abrir referencia ↗
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="rounded-3xl border border-slate-700 bg-slate-800/50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-white">Uso recomendado</h2>
              <p className="mb-6 text-slate-400">
                Primero presenta IT360, despues mostras estas referencias, y recien ahi pasas a la propuesta puntual con precio.
              </p>
              <a
                href="https://wa.me/3425089906?text=Hola,%20quiero%20presentar%20la%20propuesta%20de%20IT360"
                className="inline-block rounded-2xl bg-green-600 px-8 py-4 text-xl font-bold text-white transition hover:bg-green-700"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IT360Dashboard
