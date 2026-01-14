import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Shield, User, Menu, X, Settings, LogOut, MessageSquare, Bell } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState, useRef } from 'react'
import { api } from '@/lib/api'

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [userSlug, setUserSlug] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [requestCount, setRequestCount] = useState(0)
  const settingsRef = useRef<HTMLDivElement>(null)

  const hiddenPaths = ['/docs/terms', '/docs/privacy']
  if (hiddenPaths.includes(location.pathname)) {
    return null
  }

  useEffect(() => {
    if (user) {
      checkAdminRole()
      fetchUserProfile()
      fetchNotifications()
      const interval = setInterval(fetchNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  useEffect(() => {
    setMobileMenuOpen(false)
    setSettingsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const checkAdminRole = async () => {
    try {
      const response = await api.get('/roles')
      setIsAdmin(response.data.includes('admin'))
    } catch (error) {
      console.error('Failed to check admin role:', error)
    }
  }

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/profiles/me')
      setUserSlug(response.data.slug)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  const fetchNotifications = async () => {
    try {
      const [messagesRes, requestsRes] = await Promise.all([
        api.get('/chat/unread'),
        api.get('/chat/requests')
      ])
      setUnreadCount(messagesRes.data.unreadCount)
      setRequestCount(requestsRes.data.length)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  const handleLogout = () => {
    logout()
    setSettingsOpen(false)
    navigate('/')
  }

  const totalNotifications = unreadCount + requestCount

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="h-full max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/star.png" alt="Starlit" className="h-6 w-6" />
          <span className="font-semibold">starlit</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/discover">
              <Search className="h-4 w-4 mr-1.5" />
              Discover
            </Link>
          </Button>

          {user && isAdmin && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">
                <Shield className="h-4 w-4 mr-1.5" />
                Admin
              </Link>
            </Button>
          )}

          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild className="relative">
                <Link to="/messages">
                  <MessageSquare className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="sm" asChild className="relative">
                <Link to="/chat-requests">
                  <Bell className="h-4 w-4" />
                  {requestCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center">
                      {requestCount}
                    </span>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="sm" asChild>
                <Link to={userSlug ? `/profile/${userSlug}` : '/onboarding'}>
                  <User className="h-4 w-4" />
                </Link>
              </Button>

              <div className="relative" ref={settingsRef}>
                <Button variant="ghost" size="sm" onClick={() => setSettingsOpen(!settingsOpen)}>
                  <Settings className="h-4 w-4" />
                </Button>

                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-md shadow-lg py-1 z-50">
                    <Link to="/customization" className="block px-3 py-1.5 text-sm hover:bg-muted transition-colors">
                      Settings
                    </Link>
                    <Link to="/docs" className="block px-3 py-1.5 text-sm hover:bg-muted transition-colors">
                      Docs
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted transition-colors">
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 hover:bg-muted rounded-md transition-colors relative"
        >
          {totalNotifications > 0 && !mobileMenuOpen && (
            <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />
          )}
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <div className="px-4 py-3 space-y-1">
            <Link to="/discover" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
              <Search className="h-4 w-4" />
              Discover
            </Link>

            {user ? (
              <>
                <Link to="/messages" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  Messages
                  {unreadCount > 0 && (
                    <span className="ml-auto text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                <Link to="/chat-requests" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Bell className="h-4 w-4" />
                  Requests
                  {requestCount > 0 && (
                    <span className="ml-auto text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                      {requestCount}
                    </span>
                  )}
                </Link>

                <Link to={userSlug ? `/profile/${userSlug}` : '/onboarding'} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <User className="h-4 w-4" />
                  Profile
                </Link>

                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}

                <Link to="/customization" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>

                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left">
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </>
            ) : (
              <Link to="/auth" className="flex items-center justify-center py-2 mt-2 bg-accent text-accent-foreground rounded-md font-medium">
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}