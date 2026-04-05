import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const products = [
  {
    id: 'web',
    sectionId: 'proyecto-web',
    icon: '🌐',
    name: 'Pagina Web',
    desc: 'Web profesional con propiedades y contacto directo.',
    summary: 'Ideal para inmobiliarias que quieren presencia online propia, consultas directas y una vidriera con su marca.',
    price: '$299.000',
    priceMonth: '$15.000/mes',
    details: ['Diseno profesional', 'Propiedades y contacto directo', 'Responsive y listo para tu marca'],
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'portal',
    sectionId: 'proyecto-market',
    icon: '🏪',
    name: 'Tienda en Market Santa Fe',
    desc: 'Publicacion inmobiliaria dentro de Market Santa Fe.',
    summary: 'Una opcion rapida para salir a vender dentro de un marketplace real, con implementacion simple y mantenimiento incluido.',
    price: '$89.999',
    priceMonth: '$30.000 /mensual',
    details: ['Alta y puesta a punto', 'Publicacion dentro de Market Santa Fe', 'Actualizacion y soporte mensual'],
    color: 'from-cyan-400 to-indigo-500',
    externalUrl: 'https://www.marketsantafe.com.ar/inmobiliaria/inmobiliaria-solar'
  },
  {
    id: 'crm',
    sectionId: 'proyecto-crm',
    icon: '📋',
    name: 'Para Propiedades',
    desc: 'Publicacion y gestion inmobiliaria con enfoque comercial.',
    summary: 'Pensado para inmobiliarias que quieren publicar, gestionar mejor y contar con un producto comercial mas completo.',
    price: '$359.000',
    priceMonth: '$59.000 /mensual',
    details: ['Hasta 10 propiedades', 'Destacado en busquedas', 'Estadisticas y soporte prioritario'],
    color: 'from-rose-400 to-pink-500',
    popular: true
  },
  {
    id: 'alquileres',
    sectionId: 'proyecto-alquileres',
    icon: '🔑',
    name: 'Gestion de Alquileres',
    desc: 'Control de contratos, pagos e inquilinos.',
    summary: 'Enfocado en administracion de alquileres para ordenar contratos, seguimiento de pagos y control operativo.',
    price: '$499.000',
    priceMonth: '$29.000/mes',
    details: ['Contratos y pagos', 'Inquilinos y propietarios', 'Alertas e historial'],
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'expensas',
    sectionId: 'proyecto-expensas',
    icon: '🏢',
    name: 'Sistema de Expensas',
    desc: 'Administracion profesional de consorcios.',
    summary: 'La alternativa para consorcios y edificios que necesitan liquidaciones, reportes y administracion centralizada.',
    price: '$599.000',
    priceMonth: '$35.000/mes',
    details: ['Liquidaciones y deudas', 'Portal propietarios', 'Reportes y administracion'],
    color: 'from-emerald-400 to-teal-500'
  }
]

const currentProjects = [
  {
    title: 'IT360',
    description: 'Presentacion institucional y servicios de la marca.',
    url: 'https://www.it360.com.ar/?v=2',
    tag: 'Marca'
  },
  {
    title: 'Portal Inmobiliario',
    description: 'Ejemplo interno de inmobiliaria disponible en este repo.',
    url: '/portal',
    tag: 'Proyecto vigente'
  },
  {
    title: 'Market Santa Fe',
    description: 'Caso real de tienda inmobiliaria publicada en Market Santa Fe.',
    url: 'https://www.marketsantafe.com.ar/inmobiliaria/inmobiliaria-solar',
    tag: 'Caso real'
  },
  {
    title: 'CRM Inmobiliario',
    description: 'Sistema activo para gestion comercial y seguimiento.',
    url: 'https://crminmobiliaria-neon.vercel.app/demo',
    tag: 'Proyecto vigente'
  },
  {
    title: 'Sistema de Alquileres',
    description: 'Sistema activo para administracion de alquileres.',
    url: 'https://administracion-alquileres-bigger-n09npjepa.vercel.app/',
    tag: 'Proyecto vigente'
  },
  {
    title: 'Sistema de Expensas',
    description: 'Sistema activo para administracion y cobranzas.',
    url: 'https://expensas-maxi.vercel.app/demo/',
    tag: 'Proyecto vigente'
  }
]

const pdfDownloads = [
  {
    title: 'PDF Web Inmobiliaria',
    description: 'Referencia comercial para pagina web inmobiliaria.',
    href: '/pdf/propuesta-web-inmobiliaria-it360.pdf'
  },
  {
    title: 'PDF Gestion de Alquileres',
    description: 'Referencia comercial para alquileres.',
    href: '/pdf/presupuesto-alquileres-it360.pdf'
  },
  {
    title: 'PDF Sistema de Expensas',
    description: 'Referencia comercial para consorcios y expensas.',
    href: '/pdf/propuesta-expensas-it360.pdf'
  }
]

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (!element) return
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const FloatingMenu = () => {
  const menuItems = [
    { label: 'Inicio', icon: '💼', onClick: () => scrollToSection('inicio-presentacion') },
    { label: 'Referencias', icon: '🧩', onClick: () => scrollToSection('referencias') },
    { label: 'Web', icon: '🌐', onClick: () => scrollToSection('proyecto-web') },
    { label: 'Market', icon: '🏪', onClick: () => scrollToSection('proyecto-market') },
    { label: 'CRM', icon: '📋', onClick: () => scrollToSection('proyecto-crm') },
    { label: 'Alquileres', icon: '🔑', onClick: () => scrollToSection('proyecto-alquileres') },
    { label: 'Expensas', icon: '🏢', onClick: () => scrollToSection('proyecto-expensas') },
    { label: 'PDFs', icon: '📄', onClick: () => scrollToSection('pdfs-finales') }
  ]

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex max-w-[95vw] flex-wrap justify-center gap-1 rounded-2xl bg-white/10 p-2 backdrop-blur-md">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <span>{item.icon}</span>
            <span className="hidden font-medium lg:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const SalesDashboard = () => {
  const navigate = useNavigate()
  const [clientName, setClientName] = useState('')
  const activeClientName = clientName.trim() || 'Inmobiliaria'

  const startProposal = (type) => {
    navigate(`/propuesta/${type}/${encodeURIComponent(activeClientName)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingMenu />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28">
        <section id="inicio-presentacion" className="mb-8 rounded-[2rem] border border-slate-700 bg-slate-800/50 p-8 backdrop-blur md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            IT360 Soluciones
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-bold text-white md:text-6xl">
                Presentacion comercial para inmobiliarias
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-300 md:text-2xl">
                Un solo flujo para vender mejor: referencias reales, proyectos ordenados, precio claro y PDFs al final.
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
                  onClick={() => scrollToSection('referencias')}
                  className="rounded-2xl border border-slate-600 bg-slate-900 px-6 py-4 text-lg font-bold text-white transition hover:border-slate-400"
                >
                  Ver referencias
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">
              <label className="mb-3 block text-lg text-slate-300">Nombre del cliente</label>
              <input
                type="text"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                placeholder="Ej: Inmobiliaria Liliana"
              />
              <p className="mt-3 text-sm text-slate-400">
                Presentacion activa para <span className="font-semibold text-white">{activeClientName}</span>
              </p>
            </div>
          </div>
        </section>

        <section id="referencias" className="mb-8 rounded-[2rem] border border-slate-700 bg-slate-800/40 p-8 md:p-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Referencias</p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Marca y proyectos vigentes</h2>
            </div>
            <p className="max-w-xl text-slate-400">
              Primero mostramos respaldo y proyectos activos. Despues pasamos directo a cada producto.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {currentProjects.map((project) => (
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

        {products.map((product, index) => (
          <section
            key={product.id}
            id={product.sectionId}
            className="mb-8 rounded-[2rem] border border-slate-700 bg-slate-800/40 p-8 md:p-10"
          >
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-4">
                <div className={`flex h-18 w-18 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${product.color} px-5 py-4 text-4xl shadow-lg`}>
                  {product.icon}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Proyecto {index + 1}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">{product.name}</h2>
                    {product.popular && (
                      <span className="rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-3 py-1 text-sm font-medium text-white">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xl text-slate-300">{product.desc}</p>
                  <p className="mt-3 max-w-3xl text-slate-400">{product.summary}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
                <div className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Implementacion</p>
                  <p className="mt-2 text-3xl font-bold text-white">{product.price}</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Mantenimiento</p>
                  <p className="mt-2 text-3xl font-bold text-white">{product.priceMonth}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {product.details.map((detail) => (
                <div key={`${product.id}-${detail}`} className="rounded-2xl border border-slate-700 bg-slate-900/70 px-5 py-4 text-slate-300">
                  {detail}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => startProposal(product.id)}
                className="rounded-2xl bg-white px-6 py-3 text-lg font-bold text-black transition hover:bg-slate-200"
              >
                Ver propuesta
              </button>
              {product.externalUrl && (
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-600 bg-slate-800 px-6 py-3 text-lg font-bold text-white transition hover:border-slate-400"
                >
                  Ver caso real
                </a>
              )}
            </div>
          </section>
        ))}

        <section id="pdfs-finales" className="rounded-[2rem] border border-slate-700 bg-slate-800/50 p-8 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Final</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">PDFs y cierre</h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Cuando terminaste de mostrar los proyectos, aca quedan los PDFs para que {activeClientName} pueda revisar la informacion con tranquilidad.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/3425089906?text=Hola,%20quiero%20presentar%20la%20propuesta%20de%20IT360"
                  className="rounded-2xl bg-green-500 px-8 py-4 text-xl font-bold text-white transition hover:bg-green-600"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.it360.com.ar/?v=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-slate-700 px-8 py-4 text-xl font-bold text-white transition hover:bg-slate-600"
                >
                  Ver IT360
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Material para analizar</p>
              <div className="mt-5 space-y-4">
                {pdfDownloads.map((pdf) => (
                  <a
                    key={pdf.href}
                    href={pdf.href}
                    download
                    className="block rounded-2xl border border-slate-700 bg-slate-800 px-5 py-5 transition hover:border-blue-500 hover:bg-slate-700"
                  >
                    <p className="text-lg font-bold text-white">{pdf.title}</p>
                    <p className="mt-2 text-sm text-slate-400">{pdf.description}</p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-blue-400">
                      Descargar PDF →
                    </span>
                  </a>
                ))}
              </div>
            </div>
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
