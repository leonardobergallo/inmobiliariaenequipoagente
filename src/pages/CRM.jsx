import { useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const CRM = () => {
  const [activeTab, setActiveTab] = useState('leads')
  const [showAddModal, setShowAddModal] = useState(false)

  const leads = [
    { id: 1, name: 'Laura Martínez', phone: '342-1112222', email: 'laura@email.com', source: 'Web', interest: 'Compra', budget: 150000, status: 'new', property: 'Departamento 2 ambientes' },
    { id: 2, name: 'Roberto Sánchez', phone: '342-3334444', email: 'roberto@email.com', source: 'Referido', interest: 'Alquiler', budget: 200000, status: 'contacted', property: 'Casa zona norte' },
    { id: 3, name: 'Ana Gómez', phone: '342-5556666', email: 'ana@email.com', source: 'Facebook', interest: 'Compra', budget: 250000, status: 'visiting', property: 'Duplex centro' },
    { id: 4, name: 'Miguel Torres', phone: '342-7778888', email: 'miguel@email.com', source: 'Web', interest: 'Venta', budget: 180000, status: 'negotiating', property: 'PH 3 ambientes' },
  ]

  const clients = [
    { id: 1, name: 'Carlos Pérez', phone: '342-1234567', email: 'carlos@email.com', transactions: 3, totalSpent: 4500000, lastContact: '2026-03-20', status: 'active' },
    { id: 2, name: 'Sofia López', phone: '342-2345678', email: 'sofia@email.com', transactions: 1, totalSpent: 1200000, lastContact: '2026-03-15', status: 'active' },
  ]

  const tasks = [
    { id: 1, title: 'Llamar a Laura Martínez', lead: 'Laura Martínez', date: '2026-03-29', priority: 'high', completed: false },
    { id: 2, title: 'Enviar propiedades a Roberto', lead: 'Roberto Sánchez', date: '2026-03-30', priority: 'medium', completed: false },
    { id: 3, title: 'Seguimiento visita Ana', lead: 'Ana Gómez', date: '2026-03-28', priority: 'high', completed: true },
  ]

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      contacted: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      visiting: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      negotiating: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      closed: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    }
    return colors[status] || colors.new
  }

  const getStatusLabel = (status) => {
    const labels = {
      new: 'Nuevo',
      contacted: 'Contactado',
      visiting: 'Visitando',
      negotiating: 'Negociando',
      closed: 'Cerrado',
    }
    return labels[status] || status
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e13] pb-20 md:pb-0">
      <Header title="CRM" subtitle="Gestión de Clientes y Leads" />
      
      <div className="p-4 md:ml-64 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Leads Nuevos</p>
              <p className="text-2xl font-bold text-blue-500">{leads.filter(l => l.status === 'new').length}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Contactados</p>
              <p className="text-2xl font-bold text-yellow-500">{leads.filter(l => l.status === 'contacted').length}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">En Negociación</p>
              <p className="text-2xl font-bold text-orange-500">{leads.filter(l => l.status === 'negotiating').length}</p>
            </div>
            <div className="bg-white dark:bg-[#151d25] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400">Clientes</p>
              <p className="text-2xl font-bold text-green-500">{clients.length}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#151d25] rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setActiveTab('leads')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'leads'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Leads
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'clients'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Clientes
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'tasks'
                    ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Tareas
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'leads' && (
                <div className="space-y-3">
                  {leads.map(lead => (
                    <div
                      key={lead.id}
                      className="p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{lead.phone} • {lead.email}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                              {lead.source}
                            </span>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                              {lead.interest}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Presupuesto: ${lead.budget.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            Interesado en: {lead.property}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {getStatusLabel(lead.status)}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-2 bg-primary text-white text-sm rounded-lg font-medium">
                          Contactar
                        </button>
                        <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-lg">
                          <span className="material-symbols-outlined">call</span>
                        </button>
                        <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-lg">
                          <span className="material-symbols-outlined">chat</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    + Nuevo Lead
                  </button>
                </div>
              )}

              {activeTab === 'clients' && (
                <div className="space-y-3">
                  {clients.map(client => (
                    <div
                      key={client.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2332] rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{client.phone} • {client.email}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {client.transactions} operaciones • Total: ${client.totalSpent.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          Activo
                        </span>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Último contacto: {client.lastContact}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                    + Agregar Cliente
                  </button>
                </div>
              )}

              {activeTab === 'tasks' && (
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        task.completed ? 'bg-gray-50 dark:bg-[#1a2332] opacity-60' : 'bg-gray-50 dark:bg-[#1a2332]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => {}}
                          className="w-5 h-5 text-primary rounded"
                        />
                        <div>
                          <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                            {task.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{task.lead}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 dark:text-gray-500">{task.date}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {task.priority === 'high' ? 'Alta' : 'Media'}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                    + Nueva Tarea
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

export default CRM
