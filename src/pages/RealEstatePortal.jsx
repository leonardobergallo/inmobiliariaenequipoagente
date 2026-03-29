import { useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const RealEstatePortal = () => {
  const [activeTab, setActiveTab] = useState('properties')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const properties = [
    { id: 1, title: 'Departamento 2 Ambientes Centro', address: 'San Martín 1234, Santa Fe', price: 85000, type: 'Venta', category: 'Departamento', bedrooms: 2, bathrooms: 1, area: 65, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', agency: 'Inmobiliaria Centro' },
    { id: 2, title: 'Casa Zona Norte 3 Dormitorios', address: 'Los Lapachos 456, Santa Fe', price: 180000, type: 'Venta', category: 'Casa', bedrooms: 3, bathrooms: 2, area: 180, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400', agency: 'Inmobiliaria Norte' },
    { id: 3, title: 'Monoambiente Excelente Ubicación', address: '9 de Julio 789, Santa Fe', price: 45000, type: 'Alquiler', category: 'Monoambiente', bedrooms: 1, bathrooms: 1, area: 35, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400', agency: 'Inmobiliaria Centro' },
    { id: 4, title: 'PH con Patio Centro', address: 'Buenos Aires 321, Santa Fe', price: 95000, type: 'Venta', category: 'PH', bedrooms: 2, bathrooms: 1, area: 80, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400', agency: 'Inmobiliaria Sur' },
    { id: 5, title: 'Local Comercial Centro', address: 'Rivadavia 555, Santa Fe', price: 65000, type: 'Alquiler', category: 'Local', bedrooms: 0, bathrooms: 1, area: 120, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', agency: 'Inmobiliaria Centro' },
    { id: 6, title: 'Duplex Premium Zona Norte', address: 'Pringles 888, Santa Fe', price: 220000, type: 'Venta', category: 'Duplex', bedrooms: 3, bathrooms: 2, area: 200, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', agency: 'Inmobiliaria Norte' },
  ]

  const agencies = [
    { id: 1, name: 'Inmobiliaria Centro', properties: 45, logo: '🏢' },
    { id: 2, name: 'Inmobiliaria Norte', properties: 32, logo: '🏗️' },
    { id: 3, name: 'Inmobiliaria Sur', properties: 28, logo: '🏘️' },
    { id: 4, name: 'Inmobiliaria Este', properties: 18, logo: '🏠' },
  ]

  const formatPrice = (price, type) => {
    if (type === 'Alquiler') {
      return `$${price.toLocaleString()}/mes`
    }
    return `$${price.toLocaleString()}`
  }

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || p.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e13] pb-20 md:pb-0">
      <Header title="Portal Inmobiliario" subtitle="Propiedades en Santa Fe" />
      
      <div className="p-4 md:ml-64 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#151d25] rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input
                  type="text"
                  placeholder="Buscar propiedades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1a2332] border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-[#1a2332] border-0 rounded-lg text-gray-900 dark:text-white"
              >
                <option value="all">Todos</option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-[#151d25] rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setActiveTab('properties')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'properties'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Propiedades
              </button>
              <button
                onClick={() => setActiveTab('agencies')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'agencies'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Inmobiliarias
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'properties' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProperties.map(property => (
                    <div
                      key={property.id}
                      className="bg-gray-50 dark:bg-[#1a2332] rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="relative h-48">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                        <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                          property.type === 'Venta' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-blue-500 text-white'
                        }`}>
                          {property.type}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{property.category}</p>
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{property.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{property.address}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-3">
                          <span>{property.bedrooms} dorm.</span>
                          <span>{property.bathrooms} baños</span>
                          <span>{property.area} m²</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-lg font-bold text-primary dark:text-blue-400">
                            {formatPrice(property.price, property.type)}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{property.agency}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'agencies' && (
                <div className="space-y-3">
                  {agencies.map(agency => (
                    <div
                      key={agency.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f2937] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{agency.logo}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{agency.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{agency.properties} propiedades</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg font-medium">
                        Ver Propiedades
                      </button>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                    + Registra tu Inmobiliaria
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">¿Sos inmobiliaria?</h3>
            <p className="text-blue-100 mb-4">Publicá tus propiedades y llegá a miles de clientes en Santa Fe</p>
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium">
              Registrarme Gratis
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default RealEstatePortal
