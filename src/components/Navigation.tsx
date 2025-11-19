// // import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import { Home, Search, Shield, LogOut, LogIn } from 'lucide-react'
// // import { Button } from './ui/button'
// // import { useAuth } from '@/hooks/useAuth'
// // import { useEffect, useState } from 'react'
// // import { api } from '@/lib/api'

// // export default function Navigation() {
// //   const location = useLocation()
// //   const navigate = useNavigate()
// //   const { user, logout } = useAuth()
// //   const [isAdmin, setIsAdmin] = useState(false)

// //   useEffect(() => {
// //     if (user) {
// //       checkAdminRole()
// //     }
// //   }, [user])

// //   const checkAdminRole = async () => {
// //     try {
// //       const response = await api.get('/roles')
// //       setIsAdmin(response.data.includes('admin'))
// //     } catch (error) {
// //       console.error('Failed to check admin role:', error)
// //     }
// //   }

// //   const handleLogout = () => {
// //     logout()
// //     navigate('/')
// //   }

// //   const isActive = (path: string) => location.pathname === path

// //   return (
// //     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
// //       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //         <Link to="/" className="flex items-center space-x-2 group">
// //           <img 
// //             src="/star.png" 
// //             alt="Starlit Logo" 
// //             className="h-8 w-8 object-contain"
// //           />
// //           <span className="text-2xl font-bold text-gradient">STARLIT</span>
// //         </Link>

// //         <div className="flex items-center space-x-4">
// //           <Button
// //             variant={isActive('/') ? 'glow' : 'ghost'}
// //             asChild
// //             size="sm"
// //           >
// //             <Link to="/">
// //               <Home className="h-4 w-4 mr-2" />
// //               Home
// //             </Link>
// //           </Button>

// //           <Button
// //             variant={isActive('/discover') ? 'glow' : 'ghost'}
// //             asChild
// //             size="sm"
// //           >
// //             <Link to="/discover">
// //               <Search className="h-4 w-4 mr-2" />
// //               Discover
// //             </Link>
// //           </Button>

// //           {user && isAdmin && (
// //             <Button
// //               variant={isActive('/admin') ? 'glow' : 'ghost'}
// //               asChild
// //               size="sm"
// //             >
// //               <Link to="/admin">
// //                 <Shield className="h-4 w-4 mr-2" />
// //                 Admin
// //               </Link>
// //             </Button>
// //           )}

// //           {user ? (
// //             <Button variant="outline" onClick={handleLogout} size="sm">
// //               <LogOut className="h-4 w-4 mr-2" />
// //               Logout
// //             </Button>
// //           ) : (
// //             <Button
// //               variant={isActive('/auth') ? 'glow' : 'outline'}
// //               asChild
// //               size="sm"
// //             >
// //               <Link to="/auth">
// //                 <LogIn className="h-4 w-4 mr-2" />
// //                 Sign In
// //               </Link>
// //             </Button>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   )
// // }

// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { Home, Search, FileText, Shield, LogOut, LogIn, Menu, X } from 'lucide-react'
// import { Button } from './ui/button'
// import { useAuth } from '@/hooks/useAuth'
// import { useEffect, useState } from 'react'
// import { api } from '@/lib/api'

// export default function Navigation() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { user, logout } = useAuth()
//   const [isAdmin, setIsAdmin] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const hiddenPaths = ['/docs/terms', '/docs/privacy']

//   // hide navbar on these pages
//   if (hiddenPaths.includes(location.pathname)) {
//     return null
//   }


//   useEffect(() => {
//     if (user) {
//       checkAdminRole()
//     }
//   }, [user])

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setMobileMenuOpen(false)
//   }, [location.pathname])

//   const checkAdminRole = async () => {
//     try {
//       const response = await api.get('/roles')
//       setIsAdmin(response.data.includes('admin'))
//     } catch (error) {
//       console.error('Failed to check admin role:', error)
//     }
//   }

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//     setMobileMenuOpen(false)
//   }

//   const isActive = (path: string) => location.pathname === path

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 group">
//             <img 
//               src="/star.png" 
//               alt="Starlit Logo" 
//               className="h-8 w-8 object-contain"
//             />
//             <span className="text-2xl font-bold text-gradient">STARLIT</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Button
//               variant={isActive('/') ? 'glow' : 'ghost'}
//               asChild
//               size="sm"
//             >
//               <Link to="/">
//                 <Home className="h-4 w-4 mr-2" />
//                 Home
//               </Link>
//             </Button>

//             <Button
//               variant={isActive('/docs') ? 'glow' : 'ghost'}
//               asChild
//               size="sm"
//             >
//               <Link to="/docs">
//                 <FileText className="h-4 w-4 mr-2" />
//                 Legal Documentation
//               </Link>
//             </Button>

//             <Button
//               variant={isActive('/discover') ? 'glow' : 'ghost'}
//               asChild
//               size="sm"
//             >
//               <Link to="/discover">
//                 <Search className="h-4 w-4 mr-2" />
//                 Discover
//               </Link>
//             </Button>

//             {user && isAdmin && (
//               <Button
//                 variant={isActive('/admin') ? 'glow' : 'ghost'}
//                 asChild
//                 size="sm"
//               >
//                 <Link to="/admin">
//                   <Shield className="h-4 w-4 mr-2" />
//                   Admin
//                 </Link>
//               </Button>
//             )}

//             {user ? (
//               <Button variant="outline" onClick={handleLogout} size="sm">
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </Button>
//             ) : (
//               <Button
//                 variant={isActive('/auth') ? 'glow' : 'outline'}
//                 asChild
//                 size="sm"
//               >
//                 <Link to="/auth">
//                   <LogIn className="h-4 w-4 mr-2" />
//                   Sign In
//                 </Link>
//               </Button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
//             <Button
//               variant={isActive('/') ? 'glow' : 'ghost'}
//               asChild
//               size="sm"
//               className="w-full justify-start"
//             >
//               <Link to="/">
//                 <Home className="h-4 w-4 mr-2" />
//                 Home
//               </Link>
//             </Button>

//             <Button
//               variant={isActive('/docs') ? 'glow' : 'ghost'}
//               asChild
//               size="sm"
//               className="w-full justify-start"
//             >
//               <Link to="/docs">
//                 <FileText className="h-4 w-4 mr-2" />
//                 Legal Documentation
//               </Link>
//             </Button>

//             <Button
//               variant={isActive('/discover') ? 'glow' : 'ghost'}
//               asChild
//               size="sm"
//               className="w-full justify-start"
//             >
//               <Link to="/discover">
//                 <Search className="h-4 w-4 mr-2" />
//                 Discover
//               </Link>
//             </Button>

//             {user && isAdmin && (
//               <Button
//                 variant={isActive('/admin') ? 'glow' : 'ghost'}
//                 asChild
//                 size="sm"
//                 className="w-full justify-start"
//               >
//                 <Link to="/admin">
//                   <Shield className="h-4 w-4 mr-2" />
//                   Admin
//                 </Link>
//               </Button>
//             )}

//             {user ? (
//               <Button 
//                 variant="outline" 
//                 onClick={handleLogout} 
//                 size="sm"
//                 className="w-full justify-start"
//               >
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </Button>
//             ) : (
//               <Button
//                 variant={isActive('/auth') ? 'glow' : 'outline'}
//                 asChild
//                 size="sm"
//                 className="w-full justify-start"
//               >
//                 <Link to="/auth">
//                   <LogIn className="h-4 w-4 mr-2" />
//                   Sign In
//                 </Link>
//               </Button>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// src/components/Navigation.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, Shield, User, Menu, X, Settings, LogOut, ChevronDown } from 'lucide-react'
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
  const settingsRef = useRef<HTMLDivElement>(null)

  const hiddenPaths = ['/docs/terms', '/docs/privacy']

  // Hide navbar on legal pages
  if (hiddenPaths.includes(location.pathname)) {
    return null
  }

  useEffect(() => {
    if (user) {
      checkAdminRole()
      fetchUserProfile()
    }
  }, [user])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setSettingsOpen(false)
  }, [location.pathname])

  // Close settings dropdown when clicking outside
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

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    setSettingsOpen(false)
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo with "starlit" text */}
          <div className="flex items-center w-1/4">
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src="/star.png" 
                alt="Starlit Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-gradient">STARLIT</span>
            </Link>
          </div>

          {/* Center: Empty space for balance */}
          <div className="flex-1"></div>

          {/* Right: Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-3 w-1/4 justify-end">
            <Button
              variant="outline"
              asChild
              size="sm"
            >
              <a 
                href="https://discord.gg/starlit" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Discord
              </a>
            </Button>
            <Button
              variant={isActive('/') ? 'glow' : 'ghost'}
              asChild
              size="sm"
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>

            <Button
              variant={isActive('/discover') ? 'glow' : 'ghost'}
              asChild
              size="sm"
            >
              <Link to="/discover">
                <Search className="h-4 w-4 mr-2" />
                Discover
              </Link>
            </Button>

            {user && isAdmin && (
              <Button
                variant={isActive('/admin') ? 'glow' : 'ghost'}
                asChild
                size="sm"
              >
                <Link to="/admin">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}

            {user ? (
              <>
                <Button 
                  variant="outline" 
                  asChild
                  size="sm"
                >
                  <Link to={userSlug ? `/profile/${userSlug}` : '/onboarding'}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>

                {/* Settings Dropdown */}
                <div className="relative" ref={settingsRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="relative"
                  >
                    <Settings className="h-4 w-4" />
                    <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
                  </Button>

                  {settingsOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50 animate-fade-in">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-accent/10 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Button
                variant={isActive('/auth') ? 'glow' : 'outline'}
                asChild
                size="sm"
              >
                <Link to="/auth">
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button - Only show when signed in */}
          {user ? (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors w-1/4 flex justify-end"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          ) : (
            <div className="md:hidden w-1/4 flex justify-end">
              <Button
                variant={isActive('/auth') ? 'glow' : 'outline'}
                asChild
                size="sm"
              >
                <Link to="/auth">
                  Sign In
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && user && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            {/* User Info Section */}
            <div className="mb-4 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                  {userSlug && (
                    <p className="text-xs text-muted-foreground truncate">@{userSlug}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  asChild
                  size="sm"
                  className="w-full"
                >
                  <Link to={userSlug ? `/profile/${userSlug}` : '/onboarding'}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <Button
                variant="outline"
                asChild
                size="sm"
                className="w-full justify-start"
              >
                <a 
                  href="https://discord.gg/starlit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Discord Server
                </a>
              </Button>

              <Button
                variant={isActive('/') ? 'glow' : 'ghost'}
                asChild
                size="sm"
                className="w-full justify-start"
              >
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </Button>

              <Button
                variant={isActive('/discover') ? 'glow' : 'ghost'}
                asChild
                size="sm"
                className="w-full justify-start"
              >
                <Link to="/discover">
                  <Search className="h-4 w-4 mr-2" />
                  Discover
                </Link>
              </Button>

              {isAdmin && (
                <Button
                  variant={isActive('/admin') ? 'glow' : 'ghost'}
                  asChild
                  size="sm"
                  className="w-full justify-start"
                >
                  <Link to="/admin">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}