import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Search, Eye, Crown, Home, ExternalLink, Compass, FileText, Settings, MessageCircle, MailWarning, ChevronLeft, Shield, Palette, Menu, LogOut } from 'lucide-react'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import { useEffect, useState, useRef } from 'react'
import { api } from '@/lib/api'


function SidebarNav() {
  const location = useLocation()
  const [userSlug, setUserSlug] = useState<string | null>(null)
  const { user, logout } = useAuth()
  const { open, setOpen } = useSidebar()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  const mainNav = [
    { title: 'Home', icon: Home, href: '/' },
    { title: 'Discover', icon: Compass, href: '/discover' },
    { title: 'Premium', icon: Crown, href: '/premium' },
    { title: 'Profile Customization', icon: Settings, href: '/customization'},
    { title: 'Messages', icon: MessageCircle, href: '/messages' },
    { title: 'Chat Requests', icon: MailWarning, href: '/chat-requests'},
  ]
  const resourceNav = [
    { title: 'Documentation', icon: FileText, href: '/docs' },
    { title: 'Terms', icon: Shield, href: '/docs/terms' },
    { title: 'Privacy', icon: Eye, href: '/docs/privacy' },
    {
      title: 'Discord Server',
      icon: (props: React.ComponentProps<'svg'>) => (
        <FontAwesomeIcon icon={faDiscord} {...(props as any)} />
      ),
      href: 'https://discord.gg/qPSTxSMppf',
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-3">
          <img src="/star.png" alt="Starlit" className="h-8 w-8" />
          <span className="text-xl font-semibold">starlit</span>
        </Link>
        <button
          onClick={() => setOpen(false)}
          className="ml-auto p-1.5 rounded-md hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link to={item.href} onClick={() => setOpen(false)} className="w-full">
                  <SidebarMenuButton isActive={location.pathname === item.href}>
                    <item.icon className="h-4 w-4" />
                    <span className="ml-3">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarMenu>
            {resourceNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link to={item.href} onClick={() => setOpen(false)} className="w-full">
                  <SidebarMenuButton isActive={location.pathname === item.href}>
                    <item.icon className="h-4 w-4" />
                    <span className="ml-3">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <SidebarMenuButton onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="ml-3">Logout</span>
          </SidebarMenuButton>
        ) : (
          <Link to="/auth" onClick={() => setOpen(false)} className="w-full">
            <Button className="w-full bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

function HomeContent() {
  const { user } = useAuth()
  const { setOpen } = useSidebar()
  const [userSlug, setUserSlug] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/profiles/me')
      setUserSlug(response.data.slug)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  return (
    <div className="flex-1 min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 h-14 border-b border-border/40 bg-background/80 backdrop-blur-sm flex items-center px-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 ml-3">
          <img src="/star.png" alt="Starlit" className="h-6 w-6" />
          <span className="font-semibold">starlit</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/profile/${userSlug}`}>Your Profile</Link>
            </Button>
          ) : (
            <Button size="sm" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your work deserves<br />a better home
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Create a beautiful portfolio in minutes. Share your creative work with the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/discover">
                Explore creators
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border/40 bg-card/50">
              <Palette className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customizable</h3>
              <p className="text-muted-foreground text-sm">
                Make your profile truly yours with themes, colors, and layouts.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border/40 bg-card/50">
              <Search className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Discoverable</h3>
              <p className="text-muted-foreground text-sm">
                Get found by clients and collaborators looking for talent.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border/40 bg-card/50">
              <Eye className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Shareable</h3>
              <p className="text-muted-foreground text-sm">
                One link to share all your work across platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-border/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Join creators already using Starlit to showcase their work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to={user ? '/discover' : '/auth'}>
                {user ? 'Browse creators' : 'Create your profile'}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/premium" className="flex items-center">
                <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                Go Premium
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Starlit - Lighting Your Way
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/docs/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/docs/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Index() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <SidebarNav />
        <HomeContent />
      </div>
    </SidebarProvider>
  )
}