import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const proposals = {
  alquileres: {
    title: 'Gestion de Alquileres',
    icon: '🔑',
    price: '$499.000',
    priceMonth: '$29.000/mes',
    bgGradient: 'from-amber-500 to-orange-500',
    features: ['Propiedades', 'Propietarios', 'Inquilinos', 'Contratos', 'Pagos', 'Reportes', 'Alertas', 'Historial']
  },
  web: {
    title: 'Pagina Web Inmobiliaria',
    icon: '🌐',
    price: '$299.000',
    priceMonth: '$15.000/mes',
    bgGradient: 'from-blue-500 to-cyan-500',
    features: ['Diseno profesional', 'Propiedades', 'Responsive', 'Tu marca', 'SEO', 'Galeria']
  },
  expensas: {
    title: 'Sistema de Expensas',
    icon: '🏢',
    price: '$599.000',
    priceMonth: '$35.000/mes',
    bgGradient: 'from-purple-500 to-violet-500',
    features: ['Multiples edificios', 'Liquidaciones', 'Portal propietarios', 'Control deudas', 'Reportes PDF']
  },
  crm: {
    title: 'CRM Inmobiliario',
    icon: '📊',
    price: '$349.000',
    priceMonth: '$25.000/mes',
    bgGradient: 'from-emerald-500 to-teal-500',
    features: ['Gestion leads', 'Seguimiento', 'Tareas', 'Historial', 'Pipeline', 'Reportes']
  },
  portal: {
    title: 'Portal de Propiedades',
    icon: '🏠',
    price: '$399.000',
    priceMonth: '$25.000/mes',
    bgGradient: 'from-cyan-500 to-indigo-500',
    features: ['Tu marca', 'Publicacion ilimitada', 'Busqueda', 'Filtros', 'Perfil agencia']
  },
  paquete: {
    title: 'Paquete Completo',
    icon: '💎',
    price: '$899.000',
    priceMonth: '$49.000/mes',
    bgGradient: 'from-rose-500 to-pink-500',
    features: ['Todos los modulos', 'Pagina Web', 'Portal', 'CRM', 'Alquileres', 'Expensas', 'Soporte']
  }
}

const slides = ['cover', 'it360', 'demos', 'features', 'investment', 'maintenance', 'contact']

const slideIndexByName = {
  cover: 0,
  it360: 1,
  demos: 2,
  features: 3,
  investment: 4,
  maintenance: 5,
  contact: 6
}

const proposalUrl = (type, client = 'Inmobiliaria', slide = 'investment') =>
  `/propuesta/${type}/${encodeURIComponent(client)}?slide=${slide}`

const demoLinks = [
  {
    title: 'IT360',
    description: 'Presentacion institucional y servicios',
    icon: '🌐',
    url: 'https://www.it360.com.ar/?v=2'
  },
  {
    title: 'Web Profesional Ejemplo',
    description: 'Sitio real ya publicado',
    icon: '📐',
    url: 'https://www.glagrimensura.com.ar/'
  },
  {
    title: 'Market Santa Fe',
    description: 'Marketplace con demo navegable',
    icon: '🛒',
    url: 'https://www.marketsantafe.com.ar/demo'
  },
  {
    title: 'CRM Inmobiliario',
    description: 'Demo funcional de gestion comercial',
    icon: '🏢',
    url: 'https://crminmobiliaria-neon.vercel.app/demo'
  },
  {
    title: 'Sistema de Alquileres',
    description: 'Demo funcional para administracion de alquileres',
    icon: '🔑',
    url: 'https://administracion-alquileres-bigger-n09npjepa.vercel.app/'
  },
  {
    title: 'Sistema de Expensas',
    description: 'Demo profesional para administracion',
    icon: '🏢',
    url: 'https://expensas-maxi.vercel.app/demo/'
  }
]

const FloatingMenu = ({ clientName }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Presentacion', icon: '💼', onClick: () => navigate('/') },
    { label: 'Proyectos', icon: '🎮', onClick: () => navigate('/demos') },
    { label: 'Web', icon: '🌐', onClick: () => navigate(proposalUrl('web', clientName, 'investment')) },
    { label: 'Portal', icon: '🏠', onClick: () => navigate(proposalUrl('portal', clientName, 'investment')) },
    { label: 'CRM', icon: '📊', onClick: () => navigate(proposalUrl('crm', clientName, 'investment')) },
    { label: 'Alquileres', icon: '🔑', onClick: () => navigate(proposalUrl('alquileres', clientName, 'investment')) },
    { label: 'Expensas', icon: '🏢', onClick: () => navigate(proposalUrl('expensas', clientName, 'investment')) }
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

const ProposalDetail = () => {
  const { type, client } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentSlide, setCurrentSlide] = useState(0)

  const clientName = client ? decodeURIComponent(client) : 'Inmobiliaria'
  const proposal = proposals[type] || proposals.alquileres

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const requestedSlide = params.get('slide')
    const nextIndex = slideIndexByName[requestedSlide] ?? 0
    setCurrentSlide(nextIndex)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [type, client, location.search])

  const nextSlide = () => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1)
  const prevSlide = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSlide])

  const renderSlide = () => {
    switch (slides[currentSlide]) {
      case 'cover':
        return (
          <div className="flex h-full flex-col items-center justify-center py-12 text-center">
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
              <span className="text-7xl">{proposal.icon}</span>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">{proposal.title}</h1>
            <p className="mb-8 text-2xl text-slate-400">
              para <span className="font-bold text-blue-400">{clientName}</span>
            </p>
            <div className="rounded-full border border-slate-700 bg-slate-800 px-8 py-4">
              <p className="text-xl text-slate-400">Propuesta ordenada para presentar mejor</p>
            </div>
          </div>
        )

      case 'it360':
        return (
          <div className="py-8">
            <h2 className="mb-8 text-center text-4xl font-bold text-white">Primero: presentacion de IT360</h2>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Quienes somos</p>
                <h3 className="mt-4 text-3xl font-bold text-white">Desarrollo web, sistemas y soluciones digitales</h3>
                <p className="mt-4 text-xl text-slate-300">
                  Arrancamos mostrando la marca, el respaldo y la forma de trabajo de IT360. Asi la inmobiliaria entiende mejor el valor de la propuesta antes de entrar en el precio.
                </p>
                <a
                  href="https://www.it360.com.ar/?v=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-2xl bg-blue-500 px-6 py-4 text-xl font-bold text-white transition hover:bg-blue-400"
                >
                  Ver presentacion IT360
                </a>
              </div>

              <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Orden sugerido</p>
                <div className="mt-6 space-y-4">
                  {[
                    '1. Presentacion de IT360',
                    '2. Proyectos y demos publicados',
                    '3. Solucion ideal para la inmobiliaria',
                    '4. Precio y cierre'
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-800 bg-slate-800 px-4 py-4 text-lg text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'demos':
        return (
          <div className="py-8">
            <h2 className="mb-4 text-center text-4xl font-bold text-white">Segundo: proyectos y demos publicados</h2>
            <p className="mb-8 text-center text-xl text-slate-400">
              Mostra referencias reales antes de hablar de funcionalidades y presupuesto.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {demoLinks.map((demo) => (
                <a
                  key={demo.title}
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-5 transition hover:border-blue-500"
                >
                  <span className="text-3xl">{demo.icon}</span>
                  <p className="mt-2 font-bold text-white">{demo.title}</p>
                  <p className="mt-2 text-slate-400">{demo.description}</p>
                </a>
              ))}
              <button
                onClick={() => navigate('/demos')}
                className="rounded-2xl border border-slate-700 bg-gradient-to-r from-blue-500 to-purple-500 p-5 transition hover:border-blue-400"
              >
                <span className="text-3xl">🎮</span>
                <p className="mt-2 font-bold text-white">Ver todos los proyectos</p>
                <p className="mt-2 text-white/80">Abrir el tablero completo de demos</p>
              </button>
            </div>
          </div>
        )

      case 'features':
        return (
          <div className="py-8">
            <h2 className="mb-8 text-center text-4xl font-bold text-white">
              Tercero: la solucion ideal para {clientName}
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {proposal.features.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-5">
                  <span className="text-2xl text-green-400">✓</span>
                  <span className="text-lg font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case 'investment':
        return (
          <div className="py-8">
            <h2 className="mb-8 text-center text-4xl font-bold text-white">Cuarto: precio de la propuesta</h2>
            <div className={`mb-8 rounded-3xl bg-gradient-to-br ${proposal.bgGradient} p-12 shadow-2xl`}>
              <p className="text-2xl text-white/80">IMPLEMENTACION</p>
              <p className="text-7xl font-bold text-white md:text-8xl">{proposal.price}</p>
              <p className="text-2xl text-white/80">pago unico</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
              <p className="text-center text-xl text-slate-400">Mantenimiento mensual</p>
              <p className="text-center text-4xl font-bold text-white">{proposal.priceMonth}</p>
            </div>
          </div>
        )

      case 'maintenance':
        return (
          <div className="py-8">
            <h2 className="mb-8 text-center text-4xl font-bold text-white">Lo que incluye el mantenimiento</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {['Hosting 24/7', 'Soporte directo', 'Backups', 'Ajustes menores', 'Actualizaciones'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-700 bg-slate-800 p-5 text-xl text-white">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border-2 border-amber-500/50 bg-amber-500/20 p-6">
              <p className="text-center text-2xl font-bold text-amber-400">15% de descuento si contratan hoy</p>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="py-8">
            <div className="mb-8 rounded-2xl border-2 border-amber-500/50 bg-amber-500/20 p-6">
              <p className="text-center text-3xl font-bold text-amber-400">Cierre simple y accion inmediata</p>
              <p className="mt-2 text-center text-slate-300">
                Si les gusto la presentacion, avanzamos con demo, ajuste final y puesta en marcha.
              </p>
            </div>
            <h2 className="mb-8 text-center text-4xl font-bold text-white">Contacto</h2>
            <div className="mx-auto max-w-lg space-y-4">
              <a
                href="https://wa.me/3425089906?text=Hola,%20me%20interesa%20la%20propuesta"
                className="flex items-center justify-center gap-4 rounded-2xl bg-green-600 p-6 text-2xl font-bold text-white shadow-lg transition hover:bg-green-700"
              >
                <span className="text-3xl">💬</span> WhatsApp
              </a>
              <a
                href="tel:+543425089906"
                className="flex items-center justify-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-6 text-2xl font-bold text-white transition hover:bg-slate-700"
              >
                <span className="text-3xl">📞</span> Llamar
              </a>
              <a
                href="mailto:it360tecnologia@gmail.com"
                className="flex items-center justify-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-6 text-2xl font-bold text-white transition hover:bg-slate-700"
              >
                <span className="text-3xl">📧</span> Email
              </a>
            </div>
            <p className="mt-8 text-center text-xl text-slate-500">it360.com.ar • @it360soluciones</p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingMenu clientName={clientName} />

      <div className="flex min-h-screen justify-center px-8 pb-8 pt-28">
        <div className="w-full max-w-5xl">
          <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-xl text-slate-400 hover:text-white">
            ← Volver
          </button>

          <div className="rounded-3xl bg-slate-800/50 p-8 backdrop-blur md:p-12">
            <div className={`mb-8 h-2 rounded-full bg-gradient-to-r ${proposal.bgGradient}`}></div>

            {renderSlide()}

            <div className="mt-12">
              <div className="mb-8 flex justify-center gap-3">
                {slides.map((_, i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-12 bg-white' : 'w-4 bg-slate-700'}`} />
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className={`flex-1 rounded-2xl py-5 text-xl font-bold transition ${currentSlide === 0 ? 'bg-slate-800 text-slate-600' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                >
                  ← Anterior
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className={`flex-1 rounded-2xl py-5 text-xl font-bold transition ${currentSlide === slides.length - 1 ? 'bg-slate-800 text-slate-600' : 'bg-white text-black hover:bg-gray-200'}`}
                >
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
