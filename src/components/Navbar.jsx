import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/it360', icon: 'apps', label: 'Software' },
    { path: '/propuestas', icon: 'description', label: 'Propuestas' },
    { path: '/portal', icon: 'home', label: 'Portal' },
    { path: '/crm', icon: 'group', label: 'CRM' },
    { path: '/rentals', icon: 'key', label: 'Alquileres' },
    { path: '/expenses', icon: 'apartment', label: 'Expensas' },
  ]

  return (
    <>
      {/* Mobile Navigation - Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full max-w-md mx-auto bg-white/95 dark:bg-[#111a22]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 safe-area-bottom">
        <div className="flex justify-around items-center h-16" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors active:scale-95 touch-manipulation ${
                isActive(item.path)
                  ? 'text-primary dark:text-blue-400'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              <span className={`material-symbols-outlined text-[26px] ${isActive(item.path) ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation - Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-[#111a22] border-r border-gray-100 dark:border-gray-800 z-40 flex-col pt-20">
        <div className="flex flex-col px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive(item.path) ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Navbar

