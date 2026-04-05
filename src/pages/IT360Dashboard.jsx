import { useNavigate, useLocation } from 'react-router-dom'

const proposalUrl = (type, client = 'Inmobiliaria', slide = 'cover') =>
  `/propuesta/${type}/${encodeURIComponent(client)}?slide=${slide}`

const currentProjects = [
  {
    title: 'IT360',
    description: 'Presentacion institucional y servicios',
    icon: '🌐',
    url: 'https://www.it360.com.ar/?v=2',
    color: 'from-blue-500 to-blue-700'
  },
  {
    title: 'Portal Inmobiliario',
    description: 'Referencia interna de inmobiliaria en este repo',
    icon: '📐',
    url: '/portal',
    color: 'from-cyan-500 to-cyan-700'
  },
  {
    title: 'Market Santa Fe',
    description: 'Caso real de tienda inmobiliaria publicada en Market Santa Fe',
    icon: '🛒',
    url: 'https://www.marketsantafe.com.ar/inmobiliaria/inmobiliaria-solar',
    color: 'from-orange-500 to-orange-700'
  },
  {
    title: 'CRM Inmobiliario',
    description: 'Sistema activo de gestion comercial',
    icon: '🏢',
    url: 'https://crminmobiliaria-neon.vercel.app/demo',
    color: 'from-green-500 to-green-700'
  },
  {
    title: 'Sistema de Alquileres',
    description: 'Sistema activo para administracion de alquileres',
    icon: '🔑',
    url: 'https://administracion-alquileres-bigger-n09npjepa.vercel.app/',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    title: 'Sistema de Expensas',
    description: 'Sistema activo para administracion',
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
    { label: 'IT360', icon: '🧩', onClick: () => navigate('/it360') },
    { label: 'Portal', icon: '🏠', onClick: () => navigate(proposalUrl('portal')) },
    { label: 'CRM', icon: '📊', onClick: () => navigate(proposalUrl('crm')) },
    { label: 'Alquileres', icon: '🔑', onClick: () => navigate(proposalUrl('alquileres')) },
    { label: 'Expensas', icon: '🏢', onClick: () => navigate(proposalUrl('expensas')) },
    { label: 'Market', icon: '🏪', onClick: () => navigate(proposalUrl('portal', 'Inmobiliaria', 'projects')) }
  ]

  const isActive = (label) => {
    if (label === 'Presentacion') return location.pathname === '/'
    if (label === 'IT360') return location.pathname === '/it360'
    if (label === 'Portal') return location.pathname.startsWith('/propuesta/portal/')
    if (label === 'CRM') return location.pathname.startsWith('/propuesta/crm/')
    if (label === 'Alquileres') return location.pathname.startsWith('/propuesta/alquileres/')
    if (label === 'Expensas') return location.pathname.startsWith('/propuesta/expensas/')
    if (label === 'Market') return location.pathname.startsWith('/propuesta/portal/')
    return false
  }

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex max-w-[95vw] flex-wrap justify-center gap-1 rounded-2xl bg-white/10 p-2 backdrop-blur-md">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition ${
              isActive(item.label)
                ? 'bg-white text-black'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            <span className="hidden font-medium lg:inline">{item.label}</span>
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
              Proyectos vigentes
            </h1>
            <p className="mt-4 text-2xl text-slate-400">
              Accesos directos a referencias y sistemas activos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentProjects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-slate-700 bg-slate-900/70 p-6 transition hover:border-blue-500 hover:bg-slate-900"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${project.color} text-3xl shadow-lg`}>
                  {project.icon}
                </div>
                <h2 className="mt-5 text-2xl font-bold text-white">{project.title}</h2>
                <p className="mt-3 text-slate-400">{project.description}</p>
                <span className="mt-6 inline-flex text-lg font-semibold text-blue-400 transition group-hover:translate-x-1">
                  Abrir proyecto →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IT360Dashboard
