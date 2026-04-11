import React, { useState } from 'react'

const steps = [
  {
    title: 'Presentacion',
    subtitle: 'IT360 Soluciones',
    description: (
      <div className="space-y-2">
        <p>Presentacion comercial para inmobiliarias. Ordenado para vender mejor: primero la marca, despues trabajos reales, luego la solucion ideal y al final el precio.</p>
        <p>Este paso da el contexto y la confianza para avanzar.</p>
      </div>
    )
  },
  {
    title: 'IT360',
    subtitle: 'Marca y servicios',
    description: (
      <div className="space-y-2">
        <p>IT360 ofrece soluciones completas para inmobiliarias: portal, CRM, alquileres, expensas y Market.</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Presentacion institucional y servicios de la marca.</p>
        <a href="https://it360.com.ar" target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">Ver presentacion IT360</a>
      </div>
    )
  },
  {
    title: 'Portal',
    subtitle: 'Proyecto vigente',
    description: (
      <div className="space-y-2">
        <p>Portal Inmobiliario - Ejemplo interno disponible en este repo.</p>
        <a href="/portal" className="text-primary underline text-sm">Abrir referencia -&gt;</a>
      </div>
    )
  },
  {
    title: 'CRM',
    subtitle: 'Proyecto vigente',
    description: (
      <div className="space-y-2">
        <p>CRM Inmobiliario - Sistema activo para gestion comercial y seguimiento.</p>
        <a
          href="https://crminmobiliaria-9c9xcypfx-marketsantafeoficial-a11ys-projects.vercel.app/demo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline text-sm"
        >
          Abrir referencia -&gt;
        </a>
      </div>
    )
  },
  {
    title: 'Alquileres',
    subtitle: 'Proyecto vigente',
    description: (
      <div className="space-y-2">
        <p>Sistema de Alquileres - Administracion de alquileres, contratos y pagos.</p>
        <a
          href="https://administracion-alquileres-bigger2-g58w8h4pi-leonardobergallo.vercel.app/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline text-sm"
        >
          Abrir referencia -&gt;
        </a>
      </div>
    )
  },
  {
    title: 'Expensas',
    subtitle: 'Proyecto vigente',
    description: (
      <div className="space-y-2">
        <p>Sistema de Expensas - Administracion y cobranzas para consorcios.</p>
        <a href="#" className="text-primary underline text-sm">Abrir referencia -&gt;</a>
      </div>
    )
  },
  {
    title: 'Market',
    subtitle: 'Caso real',
    description: (
      <div className="space-y-2">
        <p>Market Santa Fe - Caso real de tienda inmobiliaria publicada en Market Santa Fe.</p>
        <a href="#" className="text-primary underline text-sm">Abrir referencia -&gt;</a>
      </div>
    )
  },
  {
    title: 'Solucion ideal',
    subtitle: 'Elegi la mejor opcion',
    description: (
      <div className="space-y-2">
        <p>Elige la solucion ideal para esa inmobiliaria. Presentacion activa para el cliente.</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Ejemplo: Inmobiliaria Liliana.</p>
      </div>
    )
  },
  {
    title: 'Pagina Web',
    subtitle: 'Tu presencia propia',
    description: (
      <div className="space-y-2">
        <p>Tu web profesional con propiedades y contacto directo.</p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Diseno profesional</li>
          <li>Propiedades y contacto directo</li>
          <li>Responsive y listo para tu marca</li>
        </ul>
        <div className="text-sm font-semibold">Implementacion: $299.000</div>
        <div className="text-sm">Mantenimiento: $15.000/mes</div>
        <button className="mt-3 rounded bg-primary px-3 py-2 text-sm text-white">Ver propuesta -&gt;</button>
      </div>
    )
  },
  {
    title: 'Tienda Market',
    subtitle: 'Market Santa Fe',
    description: (
      <div className="space-y-2">
        <p>Publicacion inmobiliaria dentro de Market Santa Fe para mostrar y vender propiedades.</p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Alta y puesta a punto</li>
          <li>Publicacion dentro de Market Santa Fe</li>
          <li>Actualizacion y soporte mensual</li>
        </ul>
        <div className="text-sm font-semibold">Implementacion: $89.999</div>
        <div className="text-sm">Mantenimiento: $30.000/mes</div>
        <button className="mt-3 rounded bg-primary px-3 py-2 text-sm text-white">Ver propuesta -&gt;</button>
      </div>
    )
  },
  {
    title: 'Para Propiedades',
    subtitle: 'Recomendado',
    description: (
      <div className="space-y-2">
        <p>Publica y gestiona inmuebles con planes Premium, Inmobiliaria y Profesional.</p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Hasta 10 propiedades</li>
          <li>Destacado en busquedas</li>
          <li>Estadisticas y soporte prioritario</li>
        </ul>
        <div className="text-sm font-semibold">Implementacion: $299.999</div>
        <div className="text-sm">Mantenimiento: $59.000/mes</div>
        <button className="mt-3 rounded bg-primary px-3 py-2 text-sm text-white">Ver propuesta -&gt;</button>
      </div>
    )
  },
  {
    title: 'Gestion de Alquileres',
    subtitle: 'Control total',
    description: (
      <div className="space-y-2">
        <p>Control de contratos, pagos e inquilinos.</p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Contratos y pagos</li>
          <li>Inquilinos y propietarios</li>
          <li>Alertas e historial</li>
        </ul>
        <div className="text-sm font-semibold">Implementacion: $499.000</div>
        <div className="text-sm">Mantenimiento: $29.000/mes</div>
        <button className="mt-3 rounded bg-primary px-3 py-2 text-sm text-white">Ver propuesta -&gt;</button>
      </div>
    )
  },
  {
    title: 'Sistema de Expensas',
    subtitle: 'Administracion profesional',
    description: (
      <div className="space-y-2">
        <p>Administracion de consorcios profesional con liquidaciones y portal propietarios.</p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Liquidaciones y deudas</li>
          <li>Portal propietarios</li>
          <li>Reportes y administracion</li>
        </ul>
        <div className="text-sm font-semibold">Implementacion: $499.999</div>
        <div className="text-sm">Mantenimiento: $69.999/mes</div>
        <button className="mt-3 rounded bg-primary px-3 py-2 text-sm text-white">Ver propuesta -&gt;</button>
      </div>
    )
  },
  {
    title: 'Todo en uno',
    subtitle: 'Resumen completo',
    description: (
      <div className="space-y-3">
        <p>Resumen completo sin salir de esta pantalla. Muestra que hace cada producto, cuanto cuesta, cuanto vale el mantenimiento y cuando conviene ofrecerlo.</p>
        <div className="grid gap-3 text-sm">
          <div className="rounded-xl border border-gray-200 p-3 dark:border-gray-700">
            <div className="font-semibold">Pagina Web</div>
            <div>Implementacion $299.000 · Mantenimiento $15.000/mes</div>
          </div>
          <div className="rounded-xl border border-gray-200 p-3 dark:border-gray-700">
            <div className="font-semibold">Tienda en Market Santa Fe</div>
            <div>Implementacion $89.999 · Mantenimiento $30.000/mes</div>
          </div>
          <div className="rounded-xl border border-gray-200 p-3 dark:border-gray-700">
            <div className="font-semibold">Para Propiedades</div>
            <div>Implementacion $299.999 · Mantenimiento $59.000/mes</div>
          </div>
          <div className="rounded-xl border border-gray-200 p-3 dark:border-gray-700">
            <div className="font-semibold">Gestion de Alquileres</div>
            <div>Implementacion $499.000 · Mantenimiento $29.000/mes</div>
          </div>
          <div className="rounded-xl border border-gray-200 p-3 dark:border-gray-700">
            <div className="font-semibold">Sistema de Expensas</div>
            <div>Implementacion $499.999 · Mantenimiento $69.999/mes</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Cierre simple',
    subtitle: 'Precio claro y propuesta puntual',
    description: (
      <div className="space-y-3">
        <p>Primero te mostramos quienes somos, luego algunos proyectos vigentes, y si te cierra vemos la opcion ideal para tu inmobiliaria con su precio.</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Material listo para revisar despues de la reunion.</p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li><a href="/pdf/portal-inmobiliario-it360.pdf" download className="text-primary underline">PDF Portal Inmobiliario</a></li>
          <li><a href="/pdf/gestion-alquileres-it360.pdf" download className="text-primary underline">PDF Gestion de Alquileres</a></li>
          <li><a href="/pdf/gestion-consorcios-it360.pdf" download className="text-primary underline">PDF Gestion de Consorcios</a></li>
        </ul>
        <div className="text-sm">WhatsApp: <a href="https://wa.me/3425089906" className="text-primary underline">3425089906</a></div>
        <div className="text-sm">Web: <a href="https://it360.com.ar" className="text-primary underline">it360.com.ar</a></div>
        <div className="text-sm">Instagram: <a href="https://instagram.com/it360soluciones" className="text-primary underline">@it360soluciones</a></div>
      </div>
    )
  }
]

export default function IT360Presentation() {
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <div className="mx-auto my-6 w-full max-w-xl rounded-xl bg-white p-4 shadow-lg dark:bg-gray-900">
      <div className="mb-2">
        <div className="mb-1 text-base font-semibold text-primary">{current.title}</div>
        {current.subtitle && (
          <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{current.subtitle}</div>
        )}
        <div className="mb-2 text-sm text-gray-800 dark:text-gray-200">
          {typeof current.description === 'string' ? current.description : current.description}
        </div>
        {current.link && (
          <a href={current.link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">{current.link.label}</a>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="rounded bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200"
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          disabled={step === 0}
        >
          &lt;- Anterior
        </button>
        <div className="flex items-center gap-1">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`inline-block h-2 w-2 rounded-full ${index === step ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
        <button
          className="rounded bg-primary px-3 py-1 text-sm font-semibold text-white disabled:opacity-50"
          onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}
          disabled={step === steps.length - 1}
        >
          Siguiente -&gt;
        </button>
      </div>
    </div>
  )
}
