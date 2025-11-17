// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { Home, Search, Shield, LogOut, LogIn } from 'lucide-react'
// import { Button } from './ui/button'
// import { useAuth } from '@/hooks/useAuth'
// import { useEffect, useState } from 'react'
// import { api } from '@/lib/api'

// export default function Navigation() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { user, logout } = useAuth()
//   const [isAdmin, setIsAdmin] = useState(false)

//   useEffect(() => {
//     if (user) {
//       checkAdminRole()
//     }
//   }, [user])

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
//   }

//   const isActive = (path: string) => location.pathname === path

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link to="/" className="flex items-center space-x-2 group">
//           <img 
//             src="/star.png" 
//             alt="Starlit Logo" 
//             className="h-8 w-8 object-contain"
//           />
//           <span className="text-2xl font-bold text-gradient">STARLIT</span>
//         </Link>

//         <div className="flex items-center space-x-4">
//           <Button
//             variant={isActive('/') ? 'glow' : 'ghost'}
//             asChild
//             size="sm"
//           >
//             <Link to="/">
//               <Home className="h-4 w-4 mr-2" />
//               Home
//             </Link>
//           </Button>

//           <Button
//             variant={isActive('/discover') ? 'glow' : 'ghost'}
//             asChild
//             size="sm"
//           >
//             <Link to="/discover">
//               <Search className="h-4 w-4 mr-2" />
//               Discover
//             </Link>
//           </Button>

//           {user && isAdmin && (
//             <Button
//               variant={isActive('/admin') ? 'glow' : 'ghost'}
//               asChild
//               size="sm"
//             >
//               <Link to="/admin">
//                 <Shield className="h-4 w-4 mr-2" />
//                 Admin
//               </Link>
//             </Button>
//           )}

//           {user ? (
//             <Button variant="outline" onClick={handleLogout} size="sm">
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </Button>
//           ) : (
//             <Button
//               variant={isActive('/auth') ? 'glow' : 'outline'}
//               asChild
//               size="sm"
//             >
//               <Link to="/auth">
//                 <LogIn className="h-4 w-4 mr-2" />
//                 Sign In
//               </Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, FileText, Shield, LogOut, LogIn, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const hiddenPaths = ['/docs/terms', '/docs/privacy']

  // hide navbar on these pages
  if (hiddenPaths.includes(location.pathname)) {
    return null
  }


  useEffect(() => {
    if (user) {
      checkAdminRole()
    }
  }, [user])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const checkAdminRole = async () => {
    try {
      const response = await api.get('/roles')
      setIsAdmin(response.data.includes('admin'))
    } catch (error) {
      console.error('Failed to check admin role:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/star.png" 
              alt="Starlit Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-2xl font-bold text-gradient">STARLIT</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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
              variant={isActive('/docs') ? 'glow' : 'ghost'}
              asChild
              size="sm"
            >
              <Link to="/docs">
                <FileText className="h-4 w-4 mr-2" />
                Legal Documentation
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
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                variant={isActive('/auth') ? 'glow' : 'outline'}
                asChild
                size="sm"
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
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
              variant={isActive('/docs') ? 'glow' : 'ghost'}
              asChild
              size="sm"
              className="w-full justify-start"
            >
              <Link to="/docs">
                <FileText className="h-4 w-4 mr-2" />
                Legal Documentation
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

            {user && isAdmin && (
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

            {user ? (
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                size="sm"
                className="w-full justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                variant={isActive('/auth') ? 'glow' : 'outline'}
                asChild
                size="sm"
                className="w-full justify-start"
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}