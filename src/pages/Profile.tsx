import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Clock, Heart, 
  Settings, Mail, Phone, MessageSquare, Eye, Volume2, VolumeX, ChevronDown,
  Calendar, Play, Pause
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from '@/components/ui/carousel'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

interface Project {
  _id: string
  title: string
  description?: string
  images?: string[]
  tools?: string[]
  year?: number
  externalLink?: string
}

interface Customization {
  description?: string
  location?: string
  enterText?: string
  avatarRadius?: number
  profileOpacity?: number
  profileBlur?: number
  backgroundEffect?: string
  usernameEffect?: string
  avatarUrl?: string
  bannerUrl?: string
  accentColor?: string
  textColor?: string
  secondaryTextColor?: string
  backgroundColor?: string
  gradientEnabled?: boolean
  borderEnabled?: boolean
  borderColor?: string
  borderRadius?: number
  aboutMeEnabled?: boolean
  aboutMeText?: string
  showJoinDate?: boolean
  timeFormat?: string
  showViews?: boolean
  parallaxEnabled?: boolean
  parallaxIntensity?: number
  theme?: string
  backgrounds?: Array<{ url: string; position?: string }>
  backgroundShuffle?: boolean
  backgroundDuration?: number
  audios?: Array<{ url: string; name: string }>
  audioPlayer?: boolean
  audioVolume?: boolean
  forceEnterScreen?: boolean
}

interface Profile {
  _id: string
  slug: string
  username: string
  displayName: string
  name: string
  headline?: string
  bio?: string
  description?: string
  avatarUrl?: string
  bannerUrl?: string
  location?: string
  role?: string
  tools?: string[]
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  behance?: string
  dribbble?: string
  customization?: Customization
  approved: boolean
  likes: number
  isPremium: boolean
  projects?: Project[]
  userId: any
  createdAt?: string
  views?: number
}

export default function Profile() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isOwner, setIsOwner] = useState(false)
  const [showEnterScreen, setShowEnterScreen] = useState(false)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (slug) fetchProfile()
  }, [slug])

  useEffect(() => {
    if (profile && user) {
      checkIfLiked()
      checkIfOwner()
    }
  }, [profile, user])

  // Background slideshow
  useEffect(() => {
    const c = profile?.customization
    if (!c?.backgrounds?.length || c.backgrounds.length <= 1) return
    
    const duration = (c.backgroundDuration || 5) * 1000
    const interval = setInterval(() => {
      setCurrentBgIndex(prev => 
        c.backgroundShuffle 
          ? Math.floor(Math.random() * c.backgrounds!.length)
          : (prev + 1) % c.backgrounds!.length
      )
    }, duration)
    
    return () => clearInterval(interval)
  }, [profile?.customization?.backgrounds, profile?.customization?.backgroundDuration])

  // Parallax effect
  useEffect(() => {
    if (!profile?.customization?.parallaxEnabled) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [profile?.customization?.parallaxEnabled])

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/profiles/slug/${slug}`)
      setProfile(response.data)
      setLikeCount(response.data.likes || 0)
      
      // Check for enter screen
      if (response.data.customization?.forceEnterScreen) {
        setShowEnterScreen(true)
      }
      
      // Track view
      api.post('/analytics', {
        profileId: response.data._id,
        eventType: 'profile_view'
      }).catch(() => {})
    } catch (error: any) {
      if (error.response?.status === 404) {
        setNotFound(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const checkIfLiked = async () => {
    if (!user || !profile) return
    try {
      const response = await api.get(`/likes/check/${profile._id}`)
      setHasLiked(response.data.liked)
    } catch (error) {
      console.error('Failed to check like status:', error)
    }
  }

  const checkIfOwner = () => {
    if (!user || !profile) return
    setIsOwner(profile.userId._id === user.id || profile.userId === user.id)
  }

  const handleLike = async () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to like profiles", variant: "destructive" })
      navigate('/auth')
      return
    }
    if (!profile) return

    try {
      if (hasLiked) {
        await api.delete(`/likes/${profile._id}`)
        setHasLiked(false)
        setLikeCount(prev => prev - 1)
      } else {
        await api.post('/likes', { profileId: profile._id })
        setHasLiked(true)
        setLikeCount(prev => prev + 1)
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.error || "Failed to update like", variant: "destructive" })
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsAudioPlaying(!isAudioPlaying)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (loading) {
    return <LoadingScreen message="Loading profile..." />
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground mb-8">The profile you're looking for doesn't exist.</p>
          <Button variant="glow" asChild>
            <Link to="/discover">Discover Creators</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const c = profile.customization || {}
  const accentColor = c.accentColor || '#3B82F6'
  const textColor = c.textColor || '#FFFFFF'
  const secondaryTextColor = c.secondaryTextColor || '#A0A0A0'
  const backgroundColor = c.backgroundColor || '#0a0a0f'
  const avatarRadius = c.avatarRadius ?? 50
  const profileOpacity = (c.profileOpacity ?? 100) / 100
  const profileBlur = c.profileBlur || 0
  const borderRadius = c.borderRadius || 16
  const parallaxIntensity = (c.parallaxIntensity ?? 50) / 100

  const currentBg = c.backgrounds?.[currentBgIndex]?.url || profile.bannerUrl

  // Enter Screen
  if (showEnterScreen) {
    return (
      <div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
        style={{ backgroundColor }}
        onClick={() => setShowEnterScreen(false)}
      >
        {currentBg && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${currentBg})` }}
          />
        )}
        <div className="relative z-10 text-center animate-fade-up">
          {(c.avatarUrl || profile.avatarUrl) && (
            <img
              src={c.avatarUrl || profile.avatarUrl}
              alt={profile.displayName || profile.name}
              className="w-32 h-32 mx-auto mb-6 object-cover border-4 glow-blue"
              style={{ 
                borderRadius: `${avatarRadius}%`,
                borderColor: accentColor
              }}
            />
          )}
          <h1 className="text-4xl font-bold mb-4" style={{ color: textColor }}>
            {profile.displayName || profile.name}
          </h1>
          <p className="text-lg animate-pulse" style={{ color: secondaryTextColor }}>
            {c.enterText || 'Click to enter'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor,
        color: textColor,
        '--accent-color': accentColor,
      } as React.CSSProperties}
    >
      {/* Background */}
      {currentBg && (
        <div 
          className="fixed inset-0 z-0 transition-all duration-1000"
          style={{
            backgroundImage: `url(${currentBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: c.parallaxEnabled 
              ? `translate(${mousePosition.x * parallaxIntensity * 20}px, ${mousePosition.y * parallaxIntensity * 20}px) scale(1.1)`
              : undefined,
            filter: profileBlur > 0 ? `blur(${profileBlur}px)` : undefined,
            opacity: profileOpacity * 0.5,
          }}
        />
      )}
      
      {/* Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Audio Player */}
      {c.audios && c.audios.length > 0 && (
        <>
          <audio ref={audioRef} src={c.audios[0].url} loop />
          {c.audioPlayer && (
            <button
              onClick={toggleAudio}
              className="fixed top-6 left-6 z-50 p-3 rounded-full glass hover:bg-accent/20 transition-colors"
              style={{ borderColor: accentColor }}
            >
              {isAudioPlaying ? (
                <Volume2 className="h-5 w-5" style={{ color: accentColor }} />
              ) : (
                <VolumeX className="h-5 w-5" style={{ color: secondaryTextColor }} />
              )}
            </button>
          )}
        </>
      )}

      {/* Content */}
      <div className="relative z-10 pt-24 px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-up">
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              {(c.avatarUrl || profile.avatarUrl) ? (
                <img
                  src={c.avatarUrl || profile.avatarUrl}
                  alt={profile.displayName || profile.name}
                  className="w-32 h-32 object-cover border-4 profile-glow-ring"
                  style={{ 
                    borderRadius: `${avatarRadius}%`,
                    borderColor: accentColor,
                  }}
                />
              ) : (
                <div 
                  className="w-32 h-32 flex items-center justify-center text-3xl font-bold profile-glow-ring"
                  style={{ 
                    borderRadius: `${avatarRadius}%`,
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
                    color: textColor,
                  }}
                >
                  {getInitials(profile.displayName || profile.name)}
                </div>
              )}
              {profile.isPremium && (
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 premium-badge">
                  Premium
                </Badge>
              )}
            </div>

            {/* Name */}
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-2 ${
                c.usernameEffect === 'glow' ? 'animate-glow-pulse' : ''
              }`}
              style={{ color: textColor }}
            >
              {profile.displayName || profile.name}
            </h1>
            
            <p className="text-lg mb-2" style={{ color: secondaryTextColor }}>
              @{profile.username || profile.slug}
            </p>
            
            {profile.headline && (
              <p className="text-lg mb-4" style={{ color: secondaryTextColor }}>
                {profile.headline}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-6 text-sm" style={{ color: secondaryTextColor }}>
              {c.showViews !== false && profile.views !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" /> {profile.views.toLocaleString()}
                </span>
              )}
              {(c.location || profile.location) && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {c.location || profile.location}
                </span>
              )}
              {c.showJoinDate !== false && profile.createdAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {profile.github && (
                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-accent/20 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profile.twitter && (
                <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-accent/20 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {profile.linkedin && (
                <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-accent/20 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-accent/20 transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
              )}
              <a href={`mailto:${profile.slug}@starlit.app`} className="p-3 rounded-full glass hover:bg-accent/20 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={hasLiked ? 'glow' : 'outline'}
                onClick={handleLike}
                disabled={isOwner}
                className="gap-2"
              >
                <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>
              {isOwner && (
                <Button variant="outline" asChild>
                  <Link to="/customization">
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mb-12 animate-bounce">
            <ChevronDown className="h-6 w-6" style={{ color: secondaryTextColor }} />
          </div>

          {/* About Me */}
          {c.aboutMeEnabled !== false && (c.aboutMeText || c.description || profile.bio || profile.description) && (
            <Card 
              className="mb-8 glass animate-fade-up"
              style={{ borderRadius: `${borderRadius}px` }}
            >
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>About Me</h2>
                <p className="leading-relaxed whitespace-pre-wrap" style={{ color: textColor }}>
                  {c.aboutMeText || c.description || profile.bio || profile.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tools & Skills */}
          {profile.tools && profile.tools.length > 0 && (
            <Card 
              className="mb-8 glass animate-fade-up"
              style={{ borderRadius: `${borderRadius}px`, animationDelay: '0.1s' }}
            >
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>Skills & Tools</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.tools.map((tool) => (
                    <Badge 
                      key={tool} 
                      variant="secondary"
                      className="px-3 py-1"
                      style={{ 
                        backgroundColor: `${accentColor}20`,
                        color: textColor,
                        borderColor: accentColor,
                      }}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Featured Projects */}
          {profile.projects && profile.projects.length > 0 && (
            <Card 
              className="mb-8 glass animate-fade-up"
              style={{ borderRadius: `${borderRadius}px`, animationDelay: '0.2s' }}
            >
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6" style={{ color: accentColor }}>Featured Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {profile.projects.map((project) => (
                    <div 
                      key={project._id}
                      className="glass rounded-xl overflow-hidden hover-lift card-interactive"
                    >
                      {/* Project Image Carousel */}
                      {project.images && project.images.length > 0 && (
                        <Carousel>
                          <CarouselContent>
                            {project.images.map((img, idx) => (
                              <CarouselItem key={idx}>
                                <img
                                  src={img}
                                  alt={`${project.title} ${idx + 1}`}
                                  className="w-full h-48 object-cover"
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      )}
                      
                      <div className="p-6">
                        {/* Project Tools */}
                        {project.tools && project.tools.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tools.map((tool) => (
                              <Badge key={tool} variant="outline" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <h3 className="text-xl font-semibold mb-2" style={{ color: textColor }}>
                          {project.title}
                        </h3>
                        
                        {project.description && (
                          <p className="text-sm mb-4 line-clamp-2" style={{ color: secondaryTextColor }}>
                            {project.description}
                          </p>
                        )}
                        
                        {project.externalLink && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Project
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}