import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const AgencyProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('properties')

  const agency = {
    id: 1,
    name: 'Inmobiliaria Centro',
    logo: '🏢',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    description: 'Inmobiliaria líder en Santa Fe con más de 15 años de experiencia. Especialistas en propiedades en el centro y zona norte. Brindamos asesoramiento personalizado para compra, venta y alquiler de propiedades.',
    address: 'San Martín 1234, Santa Fe, Argentina',
    phone: '342-1234567',
    whatsapp: '3425089906',
    email: 'contacto@inmobiliariacentro.com',
    instagram: '@inmobiliariacentro',
    facebook: 'InmobiliariaCentroSF',
    website: 'www.inmobiliariacentro.com',
    hours: 'Lunes a Viernes: 9:00 - 18:00',
    agents: 8,
    properties: 45,
    years: 15,
    verified: true,
    plan: 'Premium'
  }

  const properties = [
    { id: 1, title: 'Departamento 2 Ambientes Centro', address: 'San Martín 1234', price: 85000, type: 'Venta', bedrooms: 2, bathrooms: 1, area: 65, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', featured: true },
    { id: 2, title: 'Monoambiente Excelente Ubicación', address: '9 de Julio 789', price: 45000, type: 'Alquiler', bedrooms: 1, bathrooms: 1, area: 35, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400', featured: true },
    { id: 3, title: 'Oficina Centro Comercial', address: 'Rivadavia 555', price: 65000, type: 'Alquiler', bedrooms: 0, bathrooms: 2, area: 120, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', featured: false },
    { id: 4, title: 'Departamento 3 Ambientes', address: 'Buenos Aires 321', price: 120000, type: 'Venta', bedrooms: 3, bathrooms: 2, area: 95, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400', featured: false },
    { id: 5, title: 'Local Comercial Principal', address: 'San Martín 999', price: 180000, type: 'Venta', bedrooms: 0, bathrooms: 1, area: 150, image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400', featured: false },
  ]

  const agents = [
    { id: 1, name: 'Juan Pérez', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', phone: '342-1111111', email: 'juan@agencia.com', role: 'Gerente' },
    { id: 2, name: 'María García', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', phone: '342-2222222', email: 'maria@agencia.com', role: 'Venta' },
    { id: 3, name: 'Carlos López', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', phone: '342-3333333', email: 'carlos@agencia.com', role: 'Alquileres' },
  ]

  const formatPrice = (price, type) => {
    if (type === 'Alquiler') return `$${price.toLocaleString()}/mes`
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e13] pb-20 md:pb-0">
      <Header title={agency.name} subtitle="Inmobiliaria en Santa Fe" showBack />

      <div className="md:ml-64">
        <div className="relative h-48 md:h-64">
          <img src={agency.cover} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="px-4 -mt-16 relative">
          <div className="bg-white dark:bg-[#151d25] rounded-xl shadow-sm p-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-24 h-24 bg-white dark:bg-[#1a2332] rounded-xl shadow-lg flex items-center justify-center text-5xl border-4 border-white dark:border-[#151d25]">
                {agency.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">{agency.name}</h1>
                  {agency.verified && <span className="text-blue-500" title="Verificada">✓</span>}
                  <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">{agency.plan}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{agency.address}</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <a href={`tel:${agency.phone}`} className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-lg">call</span> {agency.phone}
                  </a>
                  <a href={`https://wa.me/${agency.whatsapp}`} className="flex items-center gap-1 text-sm text-green-600">
                    <span className="material-symbols-outlined text-lg">chat</span> WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm">
                  Contactar
                </button>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">{agency.description}</p>

            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary dark:text-blue-400">{agency.properties}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Propiedades</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary dark:text-blue-400">{agency.agents}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Agentes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary dark:text-blue-400">{agency.years}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Años</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#151d25] rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setActiveTab('properties')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'properties' ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Propiedades ({properties.length})
              </button>
              <button
                onClick={() => setActiveTab('agents')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'agents' ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Agentes ({agents.length})
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'info' ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Info
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'properties' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {properties.map(property => (
                    <div key={property.id} className="bg-gray-50 dark:bg-[#1a2332] rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative h-40">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                        {property.featured && <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">DESTACADA</span>}
                        <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${property.type === 'Venta' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                          {property.type}
                        </span>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{property.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{property.address}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span>{property.bedrooms} dorm.</span>
                          <span>•</span>
                          <span>{property.bathrooms} baños</span>
                          <span>•</span>
                          <span>{property.area} m²</span>
                        </div>
                        <p className="text-lg font-bold text-primary dark:text-blue-400 mt-2">{formatPrice(property.price, property.type)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'agents' && (
                <div className="space-y-3">
                  {agents.map(agent => (
                    <div key={agent.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1a2332] rounded-lg">
                      <img src={agent.photo} alt={agent.name} className="w-14 h-14 rounded-full object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{agent.role}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{agent.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={`tel:${agent.phone}`} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                          <span className="material-symbols-outlined text-lg">call</span>
                        </a>
                        <a href={`https://wa.me/${agent.phone.replace(/-/g, '')}`} className="p-2 bg-green-500 text-white rounded-lg">
                          <span className="material-symbols-outlined text-lg">chat</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Horario de Atención</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{agency.hours}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Redes Sociales</h3>
                    <div className="flex flex-wrap gap-2">
                      <a href="#" className="px-3 py-1 bg-blue-600 text-white text-sm rounded">Facebook</a>
                      <a href="#" className="px-3 py-1 bg-pink-500 text-white text-sm rounded">Instagram</a>
                      <a href="#" className="px-3 py-1 bg-gray-800 text-white text-sm rounded">Web</a>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contacto Directo</h3>
                    <a href={`mailto:${agency.email}`} className="block text-sm text-blue-500 mb-2">{agency.email}</a>
                    <a href={`https://wa.me/${agency.whatsapp}`} className="block text-sm text-green-600">WhatsApp: {agency.whatsapp}</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
              ¿Sos inmobiliaria? <a href="#" className="font-bold underline">Registrá tu inmobiliaria gratis</a>
            </p>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default AgencyProfile
