import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const ConsortiumExpenses = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('buildings')
  const [showAddModal, setShowAddModal] = useState(false)

  const buildings = [
    { id: 1, name: 'Edificio Centro', address: 'San Martín 1234', units: 12, pending: 3 },
    { id: 2, name: 'Torre Norte', address: '9 de Julio 567', units: 24, pending: 5 },
    { id: 3, name: 'Complex Sur', address: 'Buenos Aires 890', units: 18, pending: 2 },
  ]

  const expenses = [
    { id: 1, building: 'Edificio Centro', concept: 'Limpieza', amount: 25000, date: '2026-03-15', status: 'pending' },
    { id: 2, building: 'Edificio Centro', concept: 'Expensas Febrero', amount: 180000, date: '2026-03-01', status: 'paid' },
    { id: 3, building: 'Torre Norte', concept: 'Ascensor Mantenimiento', amount: 45000, date: '2026-03-10', status: 'pending' },
    { id: 4, building: 'Torre Norte', concept: 'Expensas Febrero', amount: 320000, date: '2026-03-01', status: 'paid' },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const totalPending = expenses
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0)

  const totalPaid = expenses
    .filter(e => e.status === 'paid')
    .reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e13] pb-20 md:pb-0">
      <Header title="Expensas" subtitle="Administración de Consorcios" />
      
      <div className="p-4 md:ml-64 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Edificios</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{buildings.length}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Unidades</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{buildings.reduce((s, b) => s + b.units, 0)}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Pendiente</p>
              <p className="text-2xl font-bold text-red-500">{formatCurrency(totalPending)}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Pagado</p>
              <p className="text-2xl font-bold text-green-500">{formatCurrency(totalPaid)}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#151d25] rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setActiveTab('buildings')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'buildings'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Edificios
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'expenses'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Gastos
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'reports'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Informes
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'buildings' && (
                <div className="space-y-3">
                  {buildings.map(building => (
                    <div
                      key={building.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f2937] transition-colors cursor-pointer"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{building.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{building.address}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{building.units} unidades</p>
                      </div>
                      <div className="text-right">
                        {building.pending > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            {building.pending} pendientes
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                  >
                    + Agregar Edificio
                  </button>
                </div>
              )}

              {activeTab === 'expenses' && (
                <div className="space-y-3">
                  {expenses.map(expense => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{expense.concept}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{expense.building}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{expense.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(expense.amount)}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          expense.status === 'paid'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {expense.status === 'paid' ? 'Pagado' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    + Registrar Gasto
                  </button>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">description</span>
                  <p className="text-gray-500 dark:text-gray-400 mt-4">Informes y liquidaciones</p>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                    Generar Informe Mensual
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

export default ConsortiumExpenses
