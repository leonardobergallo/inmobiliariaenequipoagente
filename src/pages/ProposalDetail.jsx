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
    title: 'Para Propiedades',
    icon: '📋',
    price: '$359.000',
    priceMonth: '$59.000 /mensual',
    bgGradient: 'from-rose-500 to-pink-500',
    features: ['Hasta 10 propiedades', 'Destacado en búsquedas', 'Estadísticas detalladas', 'Soporte prioritario', 'MercadoPago', 'Transferencia']
  },
  portal: {
    title: 'Tienda en Market Santa Fe',
    icon: '🏪',
    price: '$89.999',
    priceMonth: '$30.000 /mensual',
    bgGradient: 'from-cyan-500 to-indigo-500',
    features: ['Diseño y configuración personalizada', 'Actualización de registro de propiedades', 'Propiedades ilimitadas', 'Edición completa', 'Soporte y mantenimiento mensual']
  }
}

const slides = ['cover', 'it360', 'projects', 'features', 'investment', 'maintenance', 'contact']

const slideIndexByName = {
  cover: 0,
  it360: 1,
  projects: 2,
  features: 3,
  investment: 4,
  maintenance: 5,
  contact: 6
}

const currentProjects = [
  {
    title: 'IT360',
    description: 'Presentacion institucional y servicios',
    icon: '🌐',
    url: 'https://www.it360.com.ar/?v=2'
  },
  {
    title: 'Portal Inmobiliario',
    description: 'Proyecto interno de inmobiliaria en este repo',
    icon: '📐',
    url: '/portal'
  },
  {
    title: 'Market Santa Fe',
    description: 'Caso real de tienda inmobiliaria publicada en Market Santa Fe',
    icon: '🛒',
    url: 'https://www.marketsantafe.com.ar/inmobiliaria/inmobiliaria-solar'
  },
  {
    title: 'CRM Inmobiliario',
    description: 'Sistema activo de gestion comercial',
    icon: '🏢',
    url: 'https://crminmobiliaria-neon.vercel.app/demo'
  },
  {
    title: 'Sistema de Alquileres',
    description: 'Sistema activo para administracion de alquileres',
    icon: '🔑',
    url: 'https://administracion-alquileres-bigger-n09npjepa.vercel.app/'
  },
  {
    title: 'Sistema de Expensas',
    description: 'Sistema activo para administracion',
    icon: '🏢',
    url: 'https://expensas-maxi.vercel.app/demo/'
  }
]

const pdfLibrary = {
  web: [
    { label: 'Descargar PDF Web Inmobiliaria', href: '/pdf/propuesta-web-inmobiliaria-it360.pdf' }
  ],
  alquileres: [
    { label: 'Descargar PDF Gestion de Alquileres', href: '/pdf/presupuesto-alquileres-it360.pdf' }
  ],
  expensas: [
    { label: 'Descargar PDF Sistema de Expensas', href: '/pdf/propuesta-expensas-it360.pdf' }
  ],
  portal: [
    { label: 'Descargar PDF Web Inmobiliaria', href: '/pdf/propuesta-web-inmobiliaria-it360.pdf' },
    { label: 'Descargar PDF Gestion de Alquileres', href: '/pdf/presupuesto-alquileres-it360.pdf' },
    { label: 'Descargar PDF Sistema de Expensas', href: '/pdf/propuesta-expensas-it360.pdf' }
  ],
  crm: [
    { label: 'Descargar PDF Web Inmobiliaria', href: '/pdf/propuesta-web-inmobiliaria-it360.pdf' },
    { label: 'Descargar PDF Sistema de Expensas', href: '/pdf/propuesta-expensas-it360.pdf' }
  ]
}

const FloatingMenu = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Presentacion', icon: '💼', onClick: () => navigate('/') },
    { label: 'IT360', icon: '🧩', onClick: () => navigate('/it360') },
    { label: 'Portal', icon: '🏠', onClick: () => navigate('/portal') },
    { label: 'CRM', icon: '📊', onClick: () => navigate('/crm') },
    { label: 'Alquileres', icon: '🔑', onClick: () => navigate('/rentals') },
    { label: 'Expensas', icon: '🏢', onClick: () => navigate('/expenses') }
  ]

  const isActive = (label) => {
    if (label === 'Presentacion') return location.pathname === '/'
    if (label === 'IT360') return location.pathname === '/it360'
    if (label === 'Portal') return location.pathname === '/portal'
    if (label === 'CRM') return location.pathname === '/crm'
    if (label === 'Alquileres') return location.pathname === '/rentals'
    if (label === 'Expensas') return location.pathname === '/expenses'
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
        <button
          onClick={() => window.open('https://www.marketsantafe.com.ar/inmobiliaria/inmobiliaria-solar', '_blank', 'noopener,noreferrer')}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span>ðŸª</span>
          <span className="hidden font-medium lg:inline">Market</span>
        </button>
      </div>
    </div>
  )
}

const ProposalDetail = () => {
  const { type, client } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [clientName, setClientName] = useState('Inmobiliaria')

  const proposal = proposals[type] || proposals.web
  const isPortalProposal = type === 'portal'
  const pdfDownloads = pdfLibrary[type] || pdfLibrary.web

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const requestedSlide = params.get('slide')
    const nextIndex = slideIndexByName[requestedSlide] ?? 0
    setCurrentSlide(nextIndex)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [type, client, location.search])

  useEffect(() => {
    setClientName(client ? decodeURIComponent(client) : 'Inmobiliaria')
  }, [client])

  const nextSlide = () => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1)
  const prevSlide = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === ' ') nextSlide()
      if (event.key === 'ArrowLeft') prevSlide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  const renderInvestment = () => {
    if (type === 'portal') {
      return (
        <div className="py-8">
          <h2 className="mb-8 text-center text-4xl font-bold text-white">Cuarto: inversión de la tienda</h2>
          <div className={`mb-8 rounded-3xl bg-gradient-to-br ${proposal.bgGradient} p-12 shadow-2xl`}>
            <p className="text-2xl text-white/80">VALOR INICIAL</p>
            <p className="text-7xl font-bold text-white md:text-8xl">{proposal.price}</p>
            <p className="mt-3 text-2xl text-white/90">Incluye: diseño + puesta a punto + actualización de registro</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
            <p className="text-center text-xl text-slate-400">Abono de mantenimiento mensual</p>
            <p className="mt-2 text-center text-slate-300">Despreocupate de la parte técnica. Nosotros nos encargamos de todo.</p>
            <p className="mt-4 text-center text-4xl font-bold text-white">{proposal.priceMonth}</p>
          </div>
        </div>
      )
    }

    if (type === 'crm') {
      return (
        <div className="py-8">
          <h2 className="mb-8 text-center text-4xl font-bold text-white">Cuarto: precio final</h2>
          <div className="mx-auto max-w-2xl rounded-3xl border border-pink-500 bg-slate-800 p-8 shadow-lg shadow-pink-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-pink-300">Inmobiliaria</p>
            <h3 className="mt-2 text-3xl font-bold text-white">Inmobiliaria</h3>
            <p className="mt-6 text-6xl font-bold text-white">$359.000</p>
            <p className="mt-2 text-xl text-slate-400">valor inicial</p>
            <p className="mt-5 text-lg text-slate-300">Incluye: diseño + puesta a punto + actualización de registro</p>
            <div className="mt-8 border-t border-slate-700 pt-6">
              <p className="text-4xl font-bold text-white">$59.000</p>
              <p className="mt-2 text-xl text-slate-400">/mes mantenimiento</p>
            </div>
          </div>
        </div>
      )
    }

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
  }

  const renderMaintenance = () => {
    if (type === 'portal') {
      return (
        <div className="py-8">
          <h2 className="mb-8 text-center text-4xl font-bold text-white">Lo que incluye el mantenimiento</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              'Diseño y configuración personalizada',
              'Actualización de registro de propiedades',
              'Propiedades ilimitadas',
              'Edición completa',
              'Soporte y mantenimiento mensual'
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-700 bg-slate-800 p-5 text-xl text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (type === 'crm') {
      return (
        <div className="py-8">
          <h2 className="mb-8 text-center text-4xl font-bold text-white">Resumen del plan inmobiliaria</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              'Diseño y configuración personalizada',
              'Actualización de registro de propiedades',
              'Propiedades ilimitadas',
              'Edición completa',
              'Soporte y mantenimiento mensual',
              'MercadoPago y transferencia'
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-700 bg-slate-800 p-5 text-xl text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      )
    }

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
      </div>
    )
  }

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
            {isPortalProposal && (
              <div className="mt-8 grid w-full max-w-5xl gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-6 text-left">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Valor inicial</p>
                  <p className="mt-3 text-4xl font-bold text-white">{proposal.price}</p>
                  <p className="mt-2 text-base text-slate-300">Alta, diseno y puesta a punto</p>
                </div>
                <div className="rounded-3xl border border-indigo-500/30 bg-indigo-500/10 p-6 text-left">
                  <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Mantenimiento</p>
                  <p className="mt-3 text-4xl font-bold text-white">{proposal.priceMonth}</p>
                  <p className="mt-2 text-base text-slate-300">Actualizacion y soporte mensual</p>
                </div>
                <a
                  href="https://www.marketsantafe.com.ar/inmobiliaria/inmobiliaria-solar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-3xl border border-slate-700 bg-slate-800 p-6 text-left transition hover:border-cyan-500"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Caso real</p>
                  <p className="mt-3 text-2xl font-bold text-white">Market Santa Fe</p>
                  <p className="mt-2 text-base text-slate-300">Tienda inmobiliaria ya publicada</p>
                </a>
              </div>
            )}
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
                    '2. Proyectos vigentes y referencias',
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

      case 'projects':
        if (isPortalProposal) {
          return (
            <div className="py-8">
              <h2 className="mb-4 text-center text-4xl font-bold text-white">Segundo: resumen comercial completo</h2>
              <p className="mb-8 text-center text-xl text-slate-400">
                Todo junto en el carrusel: valor inicial, mantenimiento, alcance y caso real publicado.
              </p>
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Que incluye la propuesta</p>
                  <h3 className="mt-4 text-3xl font-bold text-white">{proposal.title}</h3>
                  <p className="mt-4 text-xl text-slate-300">
                    Una tienda inmobiliaria publicada dentro de Market Santa Fe para mostrar propiedades, captar consultas y mantener la vidriera siempre actualizada.
                  </p>
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Implementacion</p>
                      <p className="mt-3 text-4xl font-bold text-white">{proposal.price}</p>
                    </div>
                    <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Mantenimiento</p>
                      <p className="mt-3 text-4xl font-bold text-white">{proposal.priceMonth}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Caso real</p>
                  <h3 className="mt-4 text-3xl font-bold text-white">Market Santa Fe</h3>
                  <p className="mt-4 text-xl text-slate-300">
                    Referencia real ya publicada para mostrar exactamente como queda la tienda.
                  </p>
                  <a
                    href="https://www.marketsantafe.com.ar/inmobiliaria/inmobiliaria-solar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex rounded-2xl bg-blue-500 px-6 py-4 text-xl font-bold text-white transition hover:bg-blue-400"
                  >
                    Ver caso real
                  </a>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="py-8">
            <h2 className="mb-4 text-center text-4xl font-bold text-white">Segundo: proyectos vigentes y referencias</h2>
            <p className="mb-8 text-center text-xl text-slate-400">
              Mostra trabajos activos y referencias reales antes de hablar de funcionalidades y presupuesto.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-5 transition hover:border-blue-500"
                >
                  <span className="text-3xl">{project.icon}</span>
                  <p className="mt-2 font-bold text-white">{project.title}</p>
                  <p className="mt-2 text-slate-400">{project.description}</p>
                </a>
              ))}
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
              {[
                ...(isPortalProposal ? ['Publicacion dentro de Market Santa Fe'] : []),
                ...proposal.features
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-5">
                  <span className="text-2xl text-green-400">✓</span>
                  <span className="text-lg font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case 'investment':
        return renderInvestment()

      case 'maintenance':
        return renderMaintenance()

      case 'contact':
        return (
          <div className="py-8">
            <div className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
              <p className="text-center text-3xl font-bold text-white">Cierre simple y accion inmediata</p>
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
      <FloatingMenu />

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
                {slides.map((_, index) => (
                  <div key={index} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-12 bg-white' : 'w-4 bg-slate-700'}`} />
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
