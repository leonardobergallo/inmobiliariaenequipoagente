import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

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

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      try {
        const auth = localStorage.getItem('isAuthenticated')
        setIsAuthenticated(auth === 'true')
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
      <InstallPrompt />
      <InstallHelpButton />
      <Routes>
        {/* Onboarding - Only show if not seen */}
        <Route 
          path="/onboarding" 
          element={
            hasSeenOnboarding ? (
              <Navigate to="/login" replace />
            ) : (
              <Onboarding onComplete={() => setHasSeenOnboarding(true)} />
            )
          } 
        />

        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? (
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
            isAuthenticated ? (
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

