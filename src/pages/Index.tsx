import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  Search,
  Eye,
  Crown,
  Home,
  Compass,
  Users,
  Star,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Palette,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'

function SidebarNav() {
  const location = useLocation()
  const { user } = useAuth()
  const { open, setOpen, collapsed } = useSidebar()

  const mainNav = [
    { title: 'Home', icon: Home, href: '/' },
    { title: 'Discover', icon: Compass, href: '/discover' },
    { title: 'Premium', icon: Crown, href: '/premium' },
  ]

  const resourceNav = [
    { title: 'Documentation', icon: FileText, href: '/docs' },
    { title: 'Terms', icon: Shield, href: '/docs/terms' },
    { title: 'Privacy', icon: Eye, href: '/docs/privacy' },
  ]

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-3">
          <img src="/star.png" alt="Starlit" className="h-8 w-8" />
          {!collapsed && <span className="text-xl font-bold text-gradient">starlit</span>}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="ml-auto p-1.5 rounded-lg hover:bg-accent/10 transition-colors lg:flex hidden"
        >
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link to={item.href} className="w-full">
                  <SidebarMenuButton isActive={location.pathname === item.href}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="ml-3">{item.title}</span>}
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
                <Link to={item.href} className="w-full">
                  <SidebarMenuButton isActive={location.pathname === item.href}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <Link to="/customization" className="w-full">
            <SidebarMenuButton>
              <Settings className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="ml-3">Settings</span>}
            </SidebarMenuButton>
          </Link>
        ) : (
          <Link to="/auth" className="w-full">
            <Button variant="glow" size="sm" className="w-full">
              {collapsed ? <Zap className="h-4 w-4" /> : 'Get Started'}
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

function HomeContent() {
  const { user } = useAuth()
  const { open } = useSidebar()

  const features = [
    {
      icon: Palette,
      title: 'Beautiful Profiles',
      description: 'Create stunning, fully customizable portfolios that showcase your unique style.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Search,
      title: 'Easy Discovery',
      description: 'Get found by clients and collaborators actively seeking your expertise.',
      gradient: 'from-blue-400 to-blue-500',
    },
    {
      icon: Eye,
      title: 'Simple Sharing',
      description: 'Share your work effortlessly with custom URLs and integrated social features.',
      gradient: 'from-blue-600 to-blue-700',
    },
  ]

  return (
    <div className={`flex-1 min-h-screen transition-all duration-300 ${open ? 'lg:ml-0' : ''}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-orb animate-float opacity-30" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-orb animate-float opacity-20" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="container relative z-10 px-6 text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 glow-blue">
              <img src="/star.png" alt="Starlit" className="h-12 w-12" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-gradient">starlit</span>
          </h1>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Sparkles className="h-5 w-5 text-accent" />
            <p className="text-xl text-muted-foreground">Lighting Your Way</p>
            <Sparkles className="h-5 w-5 text-accent" />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="glow" size="lg" asChild className="group">
              <Link to="/discover">
                Explore Creators
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to={user ? '/discover' : '/auth'}>
                {user ? 'View Profile' : 'Get Started'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">Starlit</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to showcase your creative work and connect with opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group p-8 text-center hover-lift card-interactive animate-fade-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardContent className="p-0 space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to <span className="text-gradient">shine</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of creatives already using Starlit. Upgrade to Premium for exclusive features.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glow" size="lg" asChild className="group">
                <Link to={user ? '/discover' : '/auth'}>
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/premium" className="flex items-center">
                  <Crown className="mr-2 h-5 w-5 text-yellow-500" />
                  Become Premium
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Starlit. Lighting Your Way.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function Index() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <SidebarNav />
        <HomeContent />
      </div>
    </SidebarProvider>
  )
}