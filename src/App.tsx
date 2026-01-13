import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { Toaster } from './components/ui/toaster'
import Navigation from './components/Navigation'
import Index from './pages/Index'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import ProfileCustomization from './pages/ProfileCustomization'
import ChatMessages from './pages/ChatMessages'
import ChatRequests from './pages/ChatRequests'
import AdminDashboard from './pages/AdminDashboard'
import DocsIndex from './pages/DocsIndex'
import TermsNew from './pages/TermsNew'
import NotFound from './pages/NotFound'
import PrivacyNew from './pages/PrivacyNew'
import Premium from './pages/PremiumPurchase'

function AppContent() {
  const location = useLocation()
  
  // Pages that have their own layout (no global nav)
  const noNavPages = ['/', '/docs/terms', '/docs/privacy']
  const hideNav = noNavPages.includes(location.pathname) || location.pathname.startsWith('/profile/')

  return (
    <div className="min-h-screen bg-background">
      {!hideNav && <Navigation />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile/:slug" element={<Profile />} />
        <Route path="/customization" element={<ProfileCustomization />} />
        <Route path="/messages" element={<ChatMessages />} />
        <Route path="/chat-requests" element={<ChatRequests />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/docs" element={<DocsIndex />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/docs/terms" element={<TermsNew />} />
        <Route path="/docs/privacy" element={<PrivacyNew />} />
        <Route path="/docs/*" element={<NotFound />} />          
      </Routes>
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App