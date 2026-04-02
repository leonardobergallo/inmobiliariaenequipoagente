import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const proposalUrl = (type, client = 'Inmobiliaria', slide = 'investment') =>
  `/propuesta/${type}/${encodeURIComponent(client)}?slide=${slide}`

const products = [
  {
    id: 'paquete',
    icon: '💎',
    name: 'Paquete Completo',
    desc: 'Web + Portal + CRM + Alquileres + Expensas',
    price: '$899.000',
    color: 'from-violet-500 to-purple-600',
    popular: true
  },
  {
    id: 'web',
    icon: '🌐',
    name: 'Pagina Web',
    desc: 'Tu web profesional con propiedades y contacto directo',
    price: '$299.000',
    color: 'from-blue-400 to-blue-600',
    popular: false
  },
  {
    id: 'alquileres',
    icon: '🔑',
    name: 'Gestion de Alquileres',
    desc: 'Control de contratos, pagos e inquilinos',
    price: '$499.000',
    color: 'from-amber-400 to-orange-500',
    popular: false
  },
  {
    id: 'expensas',
    icon: '🏢',
    name: 'Sistema de Expensas',
    desc: 'Administracion de consorcios profesional',
    price: '$599.000',
    color: 'from-emerald-400 to-teal-500',
    popular: false
  },
  {
    id: 'crm',
    icon: '📊',
    name: 'CRM',
    desc: 'Gestion de clientes, leads y seguimiento comercial',
    price: '$349.000',
    color: 'from-rose-400 to-pink-500',
    popular: false
  },
  {
    id: 'portal',
    icon: '🏠',
    name: 'Portal de Propiedades',
    desc: 'Tu propia plataforma para publicar y captar consultas',
    price: '$399.000',
    color: 'from-cyan-400 to-indigo-500',
    popular: false
  }
]

const publishedProjects = [
  {
    title: 'IT360',
    description: 'Presentacion institucional y servicios de la marca',
    url: 'https://www.it360.com.ar/?v=2',
    tag: 'Presentacion'
  },
  {
    title: 'Web Profesional - Ejemplo',
    description: 'Ejemplo real de presencia online profesional',
    url: 'https://www.glagrimensura.com.ar/',
    tag: 'Sitio publicado'
  },
  {
    title: 'Market Santa Fe',
    description: 'Marketplace publicado con demo navegable',
    url: 'https://www.marketsantafe.com.ar/demo',
    tag: 'Demo publicada'
  },
  {
    title: 'CRM Inmobiliario',
    description: 'Demo funcional para gestion comercial y seguimiento',
    url: 'https://crminmobiliaria-neon.vercel.app/demo',
    tag: 'Demo publicada'
  },
  {
    title: 'Sistema de Alquileres',
    description: 'Demo funcional para administracion de alquileres',
    url: 'https://administracion-alquileres-bigger-n09npjepa.vercel.app/',
    tag: 'Demo publicada'
  },
  {
    title: 'Sistema de Expensas',
    description: 'Demo profesional para administracion y cobranzas',
    url: 'https://expensas-maxi.vercel.app/demo/',
    tag: 'Demo publicada'
  }
]

const presentationSteps = [
  '1. Presenta primero a IT360 para dar contexto y confianza.',
  '2. Muestra despues proyectos y demos ya publicados.',
  '3. Explica la solucion ideal para la inmobiliaria segun su necesidad.',
  '4. Cierra con el precio y la propuesta puntual.'
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

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex gap-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
              (
                (item.label === 'Presentacion' && location.pathname === '/') ||
                (item.label === 'Proyectos' && location.pathname === '/demos') ||
                (item.label === 'Web' && location.pathname.startsWith('/propuesta/web/')) ||
                (item.label === 'Portal' && location.pathname.startsWith('/propuesta/portal/')) ||
                (item.label === 'CRM' && location.pathname.startsWith('/propuesta/crm/')) ||
                (item.label === 'Alquileres' && location.pathname.startsWith('/propuesta/alquileres/')) ||
                (item.label === 'Expensas' && location.pathname.startsWith('/propuesta/expensas/'))
              )
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

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <section className="mb-8 rounded-[2rem] border border-slate-700 bg-slate-800/50 p-8 md:p-10 backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            IT360 Soluciones
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-bold text-white md:text-6xl">
                Presentacion comercial para inmobiliarias
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-300 md:text-2xl">
                Ordenado para vender mejor: primero la marca, despues trabajos reales, luego la solucion ideal y al final el precio.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.it360.com.ar/?v=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-blue-500 px-6 py-4 text-lg font-bold text-white transition hover:bg-blue-400"
                >
                  Ver presentacion IT360
                </a>
                <button
                  onClick={() => navigate('/demos')}
                  className="rounded-2xl border border-slate-600 bg-slate-900 px-6 py-4 text-lg font-bold text-white transition hover:border-slate-400"
                >
                  Ver proyectos publicados
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-slate-400">
                Orden sugerido
              </p>
              <div className="space-y-3">
                {presentationSteps.map((step) => (
                  <div key={step} className="rounded-2xl border border-slate-800 bg-slate-800 px-4 py-4 text-slate-200">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-700 bg-slate-800/40 p-8 md:p-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Paso 1 y 2</p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">IT360 + proyectos y demos publicados</h2>
            </div>
            <p className="max-w-xl text-slate-400">
              Esta seccion sirve para mostrar respaldo, experiencia y ejemplos concretos antes de hablar de precios.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {publishedProjects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-slate-700 bg-slate-900/70 p-6 transition hover:border-blue-500 hover:bg-slate-900"
              >
                <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-blue-300">
                  {project.tag}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 text-slate-400">{project.description}</p>
                <span className="mt-6 inline-flex text-lg font-semibold text-blue-400 transition group-hover:translate-x-1">
                  Abrir referencia →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-700 bg-slate-800/40 p-8 md:p-10">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Paso 3</p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Elegi la solucion ideal para esa inmobiliaria</h2>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">
              <label className="mb-3 block text-lg text-slate-300">Nombre del cliente</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                placeholder="Ej: Inmobiliaria Liliana"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => startProposal(product.id)}
                className="group flex flex-col rounded-3xl border border-slate-700 bg-slate-900/70 p-6 text-left transition hover:border-slate-500 hover:bg-slate-900"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color} text-3xl shadow-lg transition group-hover:scale-110`}>
                    {product.icon}
                  </div>
                  {product.popular && (
                    <span className="rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-3 py-1 text-sm font-medium text-white">
                      Recomendado
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                <p className="mt-3 flex-1 text-slate-400">{product.desc}</p>
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Desde</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="text-3xl font-bold text-white">{product.price}</p>
                    <span className="text-lg font-semibold text-blue-400 transition group-hover:translate-x-1">
                      Ver propuesta →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-700 bg-slate-800/50 p-8 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Paso 4</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Precio claro y cierre simple</h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Cuando ya mostraste la marca, los trabajos publicados y la solucion ideal, el precio entra mucho mejor y la conversacion se vuelve mas simple.
              </p>
            </div>
            <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Cierre sugerido</p>
              <p className="mt-4 text-xl font-semibold text-white">
                "Primero te muestro quienes somos, despues algunos trabajos reales, y si te cierra vemos la opcion ideal para tu inmobiliaria con su precio."
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/3425089906?text=Hola,%20quiero%20presentar%20la%20propuesta%20de%20IT360"
              className="rounded-2xl bg-green-500 px-8 py-4 text-xl font-bold text-white transition hover:bg-green-600"
            >
              WhatsApp
            </a>
            <button
              onClick={() => navigate('/demos')}
              className="rounded-2xl bg-slate-700 px-8 py-4 text-xl font-bold text-white transition hover:bg-slate-600"
            >
              Ver demos
            </button>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-8 text-center text-slate-500">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                it360.com.ar
              </span>
              <span>@it360soluciones</span>
              <span>3425089906</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SalesDashboard
