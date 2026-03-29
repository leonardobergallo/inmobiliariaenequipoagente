import { useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Ecommerce = () => {
  const [activeTab, setActiveTab] = useState('products')
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['Todos', 'Electrónica', 'Hogar', 'Ropa', 'Deportes', 'Servicios']

  const products = [
    { id: 1, name: 'Smartphone Pro Max', price: 150000, category: 'Electrónica', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300', stock: 15 },
    { id: 2, name: 'Notebook 15"', price: 280000, category: 'Electrónica', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300', stock: 8 },
    { id: 3, name: 'Auriculares Bluetooth', price: 25000, category: 'Electrónica', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', stock: 25 },
    { id: 4, name: 'Smart TV 50"', price: 120000, category: 'Electrónica', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300', stock: 12 },
    { id: 5, name: 'Sofa Cama 3 Cuerpos', price: 85000, category: 'Hogar', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300', stock: 5 },
    { id: 6, name: 'Mesa de Comedor 6 Sillas', price: 65000, category: 'Hogar', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300', stock: 7 },
    { id: 7, name: 'Zapatillas Running', price: 35000, category: 'Deportes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', stock: 20 },
    { id: 8, name: 'Bicicleta Mountain Bike', price: 95000, category: 'Deportes', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=300', stock: 4 },
  ]

  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e13] pb-20 md:pb-0">
      <Header title="Tienda Online" subtitle="Ecommerce IT360" />
      
      <div className="p-4 md:ml-64 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 mr-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-[#151d25] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <button className="relative p-3 bg-primary text-white rounded-lg">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-[#151d25] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white dark:bg-[#151d25] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-40">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.stock < 10 && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                      ¡Últimas unidades!
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{product.name}</h3>
                  <p className="text-lg font-bold text-primary dark:text-blue-400 mt-1">${product.price.toLocaleString()}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-[#151d25] rounded-xl shadow-lg p-4 z-40">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Carrito ({cart.length})</h3>
              <div className="max-h-32 overflow-y-auto mb-2">
                {cart.map((item, i) => (
                  <p key={i} className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {item.name} - ${item.price.toLocaleString()}
                  </p>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                <span className="text-lg font-bold text-primary dark:text-blue-400">${cartTotal.toLocaleString()}</span>
              </div>
              <button className="w-full mt-3 py-2 bg-green-500 text-white rounded-lg font-medium">
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Ecommerce
