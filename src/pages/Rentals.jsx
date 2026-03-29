import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Rentals = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('contracts')
  const [showAddModal, setShowAddModal] = useState(false)

  const contracts = [
    { id: 1, property: 'Departamento Centro', address: 'San Martín 1234', tenant: 'Juan Pérez', rent: 250000, startDate: '2025-06-01', endDate: '2026-05-31', status: 'active', pendingPayment: false },
    { id: 2, property: 'Casa Zona Norte', address: 'Los Laplaceros 456', tenant: 'María García', rent: 350000, startDate: '2025-09-01', endDate: '2026-08-31', status: 'active', pendingPayment: true },
    { id: 3, property: 'Monoambiente Sur', address: 'Buenos Aires 789', tenant: 'Carlos López', rent: 180000, startDate: '2025-01-01', endDate: '2025-12-31', status: 'expired', pendingPayment: false },
  ]

  const payments = [
    { id: 1, tenant: 'Juan Pérez', property: 'Departamento Centro', amount: 250000, month: 'Marzo 2026', date: '2026-03-05', status: 'paid' },
    { id: 2, tenant: 'María García', property: 'Casa Zona Norte', amount: 350000, month: 'Marzo 2026', date: null, status: 'pending' },
    { id: 3, tenant: 'Juan Pérez', property: 'Departamento Centro', amount: 250000, month: 'Febrero 2026', date: '2026-02-03', status: 'paid' },
  ]

  const tenants = [
    { id: 1, name: 'Juan Pérez', property: 'Departamento Centro', phone: '342-1234567', email: 'juan@email.com', documents: true },
    { id: 2, name: 'María García', property: 'Casa Zona Norte', phone: '342-7654321', email: 'maria@email.com', documents: true },
    { id: 3, name: 'Carlos López', property: 'Monoambiente Sur', phone: '342-9876543', email: 'carlos@email.com', documents: false },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const totalRent = contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + c.rent, 0)
  const pendingPayments = payments.filter(p => p.status === 'pending').length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e13] pb-20 md:pb-0">
      <Header title="Alquileres" subtitle="Gestión de Propiedades en Alquiler" />
      
      <div className="p-4 md:ml-64 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Contratos Activos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{contracts.filter(c => c.status === 'active').length}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Ingreso Mensual</p>
              <p className="text-2xl font-bold text-green-500">{formatCurrency(totalRent)}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Pagos Pendientes</p>
              <p className="text-2xl font-bold text-yellow-500">{pendingPayments}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Inquilinos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tenants.length}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#151d25] rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setActiveTab('contracts')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'contracts'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Contratos
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'payments'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Pagos
              </button>
              <button
                onClick={() => setActiveTab('tenants')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'tenants'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Inquilinos
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'contracts' && (
                <div className="space-y-3">
                  {contracts.map(contract => (
                    <div
                      key={contract.id}
                      className="p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{contract.property}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{contract.address}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                              {contract.tenant}
                            </span>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(contract.rent)}/mes
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            {contract.startDate} - {contract.endDate}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          contract.status === 'active'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {contract.status === 'active' ? 'Activo' : 'Vencido'}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                  >
                    + Nuevo Contrato
                  </button>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-3">
                  {payments.map(payment => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{payment.tenant}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{payment.property}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{payment.month}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(payment.amount)}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {payment.status === 'paid' ? 'Pagado' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    + Registrar Pago
                  </button>
                </div>
              )}

              {activeTab === 'tenants' && (
                <div className="space-y-3">
                  {tenants.map(tenant => (
                    <div
                      key={tenant.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{tenant.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{tenant.property}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{tenant.phone} • {tenant.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          tenant.documents
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {tenant.documents ? 'Documentos OK' : 'Sin documentos'}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                    + Agregar Inquilino
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Rentals
