const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#111a22]">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Cargando...</p>
      </div>
    </div>
  )
}

export default LoadingScreen

