import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile/:slug" element={<Profile />} />
          <Route path="/profile/:slug/customize" element={<ProfileCustomization />} />
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
    </AuthProvider>
  )
}

export default App