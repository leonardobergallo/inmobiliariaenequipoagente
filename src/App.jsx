import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { isInstalled } from './utils/pwa.js'

// Components
import InstallPrompt from './components/InstallPrompt'
import InstallHelpButton from './components/InstallHelpButton'
import LoadingScreen from './components/LoadingScreen'

// Auth Pages
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

// Main Pages
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import PropertyDetail from './pages/PropertyDetail'
import VirtualTour from './pages/VirtualTour'

// User Pages
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import Chat from './pages/Chat'
import Contact from './pages/Contact'

// Tool Pages
import MortgageCalculator from './pages/MortgageCalculator'
import PropertyMap from './pages/PropertyMap'
import CompareProperties from './pages/CompareProperties'
import PropertyAlerts from './pages/PropertyAlerts'

// Additional Pages
import PublishProperty from './pages/PublishProperty'
import News from './pages/News'
import FAQ from './pages/FAQ'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(
    localStorage.getItem('hasSeenOnboarding') === 'true'
  )
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Verificar si está instalada
    const installed = isInstalled()
    setIsStandalone(installed)

    // Simular carga inicial
    const timer = setTimeout(() => {
      try {
        const auth = localStorage.getItem('isAuthenticated')
        
        // Si está instalada como PWA, autenticar automáticamente y saltar onboarding
        if (installed) {
          setIsAuthenticated(true)
          setHasSeenOnboarding(true)
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('hasSeenOnboarding', 'true')
        } else {
          setIsAuthenticated(auth === 'true')
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error al cargar estado:', error)
        setIsLoading(false)
      }
    }, 500) // 500ms de carga mínima

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      {/* Solo mostrar prompts de instalación si NO está instalada */}
      {!isStandalone && (
        <>
          <InstallPrompt />
          <InstallHelpButton />
        </>
      )}
      <Routes>
        {/* Onboarding - Only show if not seen and not installed */}
        <Route 
          path="/onboarding" 
          element={
            hasSeenOnboarding || isStandalone ? (
              <Navigate to={isStandalone ? "/" : "/login"} replace />
            ) : (
              <Onboarding onComplete={() => setHasSeenOnboarding(true)} />
            )
          } 
        />

        {/* Auth Routes - Skip if installed */}
        <Route 
          path="/login" 
          element={
            isAuthenticated || isStandalone ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated || isStandalone ? (
              <Navigate to="/" replace />
            ) : (
              <Register onRegister={() => setIsAuthenticated(true)} />
            )
          } 
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main Routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated || isStandalone ? (
              <Home />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          } 
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/property/:id/tour" element={<VirtualTour />} />

        {/* User Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/contact/:agentId?" element={<Contact />} />

        {/* Tool Routes */}
        <Route path="/calculator" element={<MortgageCalculator />} />
        <Route path="/map" element={<PropertyMap />} />
        <Route path="/compare" element={<CompareProperties />} />
        <Route path="/alerts" element={<PropertyAlerts />} />

        {/* Additional Routes */}
        <Route path="/publish" element={<PublishProperty />} />
        <Route path="/news" element={<News />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

