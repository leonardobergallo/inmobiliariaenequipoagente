import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { isInstalled } from './utils/pwa.js'

// Components
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

// IT360 Modules
import IT360Dashboard from './pages/IT360Dashboard'
import ConsortiumExpenses from './pages/ConsortiumExpenses'
import Rentals from './pages/Rentals'
import CRM from './pages/CRM'
import RealEstatePortal from './pages/RealEstatePortal'
import AgencyProfile from './pages/AgencyProfile'
import Ecommerce from './pages/Ecommerce'
import ProposalSelector from './pages/ProposalSelector'
import SalesDashboard from './pages/SalesDashboard'
import ProposalDetail from './pages/ProposalDetail'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(
    localStorage.getItem('hasSeenOnboarding') === 'true'
  )
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const installed = isInstalled()
    setIsStandalone(installed)

    const timer = setTimeout(() => {
      try {
        const auth = localStorage.getItem('isAuthenticated')

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
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/onboarding"
          element={
            hasSeenOnboarding || isStandalone ? (
              <Navigate to={isStandalone ? '/' : '/login'} replace />
            ) : (
              <Onboarding onComplete={() => setHasSeenOnboarding(true)} />
            )
          }
        />

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

        <Route path="/" element={<SalesDashboard />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/property/:id/tour" element={<VirtualTour />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/contact/:agentId?" element={<Contact />} />

        <Route path="/calculator" element={<MortgageCalculator />} />
        <Route path="/map" element={<PropertyMap />} />
        <Route path="/compare" element={<CompareProperties />} />
        <Route path="/alerts" element={<PropertyAlerts />} />

        <Route path="/publish" element={<PublishProperty />} />
        <Route path="/news" element={<News />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/demos" element={<IT360Dashboard />} />
        <Route path="/it360" element={<ProposalSelector />} />
        <Route path="/expenses" element={<ConsortiumExpenses />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/portal" element={<RealEstatePortal />} />
        <Route path="/agencia/:id" element={<AgencyProfile />} />
        <Route path="/ecommerce" element={<Ecommerce />} />

        <Route path="/propuestas" element={<SalesDashboard />} />
        <Route path="/propuesta/:type/:client" element={<ProposalDetail />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
