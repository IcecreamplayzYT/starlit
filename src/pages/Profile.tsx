import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Heart, Settings, Mail, Eye, Volume2, VolumeX, ChevronDown, Calendar, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { LoadingScreen } from '@/components/LoadingScreen'
import { DiscordWidget } from '@/components/profile/DiscordWidget'
import { DiscordUserWidget } from '@/components/profile/DiscordUserWidget'
import { GitHubCard } from '@/components/profile/GitHubCard'
import { RobloxWidget } from '@/components/profile/RobloxWidget'
import { SteamWidget } from '@/components/profile/SteamWidget'
import { SpotifyWidget } from '@/components/profile/SpotifyWidget'
import { TwitchWidget } from '@/components/profile/TwitchWidget'
import { YouTubeWidget } from '@/components/profile/YouTubeWidget'
import { BackgroundEffect } from '@/components/profile/BackgroundEffect'
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
  allowFeedback?: boolean
  // Integrations
  discordUserId?: string
  robloxUserId?: string
  steamId?: string
  spotifyUsername?: string
  twitchUsername?: string
  youtubeChannelId?: string
  youtubeChannelName?: string
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
      
      if (response.data.customization?.forceEnterScreen) {
        setShowEnterScreen(true)
      }
      
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
  const backgroundEffect = (c.backgroundEffect || 'none') as 'none' | 'particles' | 'snow' | 'rain' | 'stars'

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
              className="w-32 h-32 mx-auto mb-6 object-cover border-4"
              style={{ 
                borderRadius: `${avatarRadius}%`,
                borderColor: accentColor,
                boxShadow: `0 0 30px ${accentColor}50`
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
      }}
    >
      {/* Background Effect */}
      <BackgroundEffect effect={backgroundEffect} color={accentColor} />

      {/* Background Image */}
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
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

      {/* Audio Player */}
      {c.audios && c.audios.length > 0 && (
        <>
          <audio ref={audioRef} src={c.audios[0].url} loop />
          {c.audioPlayer && (
            <button
              onClick={toggleAudio}
              className="fixed top-6 left-6 z-50 p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
              }}
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

      {/* Feedback Button */}
      {c.allowFeedback && (
        <button
          className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-105"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          {/* Avatar */}
          <div className="relative mb-6 animate-fade-up">
            {(c.avatarUrl || profile.avatarUrl) ? (
              <img
                src={c.avatarUrl || profile.avatarUrl}
                alt={profile.displayName || profile.name}
                className="w-28 h-28 object-cover border-4"
                style={{ 
                  borderRadius: `${avatarRadius}%`,
                  borderColor: accentColor,
                  boxShadow: `0 0 0 4px ${backgroundColor}, 0 0 30px ${accentColor}50`
                }}
              />
            ) : (
              <div 
                className="w-28 h-28 flex items-center justify-center text-2xl font-bold"
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
              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 premium-badge text-xs px-2">
                Premium
              </Badge>
            )}
          </div>

          {/* Name */}
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2 animate-fade-up text-center"
            style={{ 
              color: textColor,
              animationDelay: '0.1s',
              textShadow: c.usernameEffect === 'glow' ? `0 0 20px ${accentColor}` : undefined,
            }}
          >
            {profile.displayName || profile.name}
          </h1>
          
          {/* Role Badge */}
          {profile.role && (
            <div 
              className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 animate-fade-up"
              style={{ 
                backgroundColor: `${accentColor}20`,
                animationDelay: '0.15s',
              }}
            >
              <span style={{ color: textColor }}>{profile.role}</span>
            </div>
          )}

          {profile.headline && (
            <p 
              className="text-center mb-4 animate-fade-up"
              style={{ color: secondaryTextColor, animationDelay: '0.2s' }}
            >
              {profile.headline}
            </p>
          )}

          {/* Social Links Row */}
          <div className="flex items-center gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            {profile.github && (
              <a 
                href={`https://github.com/${profile.github}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-110"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile.twitter && (
              <a 
                href={`https://twitter.com/${profile.twitter}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-110"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {profile.linkedin && (
              <a 
                href={`https://linkedin.com/in/${profile.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-110"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {profile.website && (
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-110"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
            <a 
              href={`mailto:${profile.slug}@starlit.app`}
              className="p-3 rounded-full backdrop-blur-xl border transition-all hover:scale-110"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
              }}
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce mt-4" style={{ color: secondaryTextColor }}>
            <p className="text-sm mb-2">scroll for more</p>
            <ChevronDown className="h-5 w-5 mx-auto" />
          </div>
        </div>

        {/* Stats Bar */}
        <div 
          className="flex items-center justify-between px-6 py-4 text-sm border-t"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderColor: 'rgba(255,255,255,0.1)',
            color: secondaryTextColor,
          }}
        >
          <div className="flex items-center gap-6">
            {c.showViews !== false && (
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> {(profile.views || 0).toLocaleString()}
              </span>
            )}
            {(c.location || profile.location) && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {c.location || profile.location}
              </span>
            )}
            {c.showJoinDate !== false && profile.createdAt && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLike}
              disabled={isOwner}
              className="flex items-center gap-1 p-2 rounded-lg transition-colors hover:bg-white/10"
            >
              <ThumbsUp className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} style={{ color: hasLiked ? accentColor : undefined }} />
            </button>
            <button className="flex items-center gap-1 p-2 rounded-lg transition-colors hover:bg-white/10">
              <ThumbsDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="px-4 py-12" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="container mx-auto max-w-5xl space-y-8">
            
            {/* About Me */}
            {c.aboutMeEnabled !== false && (c.aboutMeText || c.description || profile.bio || profile.description) && (
              <Card 
                className="backdrop-blur-xl border animate-fade-up"
                style={{ 
                  backgroundColor: 'rgba(128, 128, 128, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: `${borderRadius}px`,
                }}
              >
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: textColor }}>About Me</h2>
                  {profile.headline && (
                    <p className="mb-4 italic" style={{ color: secondaryTextColor }}>{profile.headline}</p>
                  )}
                  <p className="leading-relaxed whitespace-pre-wrap" style={{ color: textColor }}>
                    {c.aboutMeText || c.description || profile.bio || profile.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Integrations Widgets */}
            {(c.discordUserId || c.robloxUserId || c.steamId || c.spotifyUsername || c.twitchUsername || c.youtubeChannelName || profile.github) && (
              <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-semibold" style={{ color: textColor }}>Integrations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {profile.github && (
                    <GitHubCard
                      username={profile.github}
                      displayName={profile.displayName || profile.name}
                      accentColor={accentColor}
                    />
                  )}
                  {c.discordUserId && (
                    <DiscordUserWidget
                      userId={c.discordUserId}
                      accentColor="#5865F2"
                    />
                  )}
                  {c.robloxUserId && (
                    <RobloxWidget
                      userId={c.robloxUserId}
                      accentColor="#00A2FF"
                    />
                  )}
                  {c.steamId && (
                    <SteamWidget
                      steamId={c.steamId}
                      accentColor="#1b2838"
                    />
                  )}
                  {c.spotifyUsername && (
                    <SpotifyWidget
                      username={c.spotifyUsername}
                      accentColor="#1DB954"
                    />
                  )}
                  {c.twitchUsername && (
                    <TwitchWidget
                      username={c.twitchUsername}
                      accentColor="#9146FF"
                    />
                  )}
                  {c.youtubeChannelName && (
                    <YouTubeWidget
                      channelName={c.youtubeChannelName}
                      accentColor="#FF0000"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Tools & Skills */}
            {profile.tools && profile.tools.length > 0 && (
              <Card 
                className="backdrop-blur-xl border animate-fade-up overflow-hidden"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: `${borderRadius}px`,
                  animationDelay: '0.2s',
                }}
              >
                <CardContent className="p-0">
                  {/* Scrolling tools banner - only scrolls when needed */}
                  <div className="py-4 h-16 flex items-center overflow-x-auto overflow-y-hidden" style={{ backgroundColor: 'rgba(128,128,128,0.2)' }}>
                    <div className="flex gap-4 px-4">
                      {profile.tools.map((tool, idx) => (
                        <Badge 
                          key={idx}
                          className="px-4 py-2 text-sm whitespace-nowrap"
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: textColor,
                            borderColor: 'rgba(255,255,255,0.2)',
                          }}
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Featured Projects */}
            {profile.projects && profile.projects.length > 0 && (
              <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2" style={{ color: textColor }}>Featured Projects</h2>
                  <p style={{ color: secondaryTextColor }}>Here are some of my latest projects, which I have developed with passion.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {profile.projects.map((project) => (
                    <Card 
                      key={project._id}
                      className="backdrop-blur-xl border overflow-hidden hover-lift"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: `${borderRadius}px`,
                      }}
                    >
                      {/* Project Image Carousel */}
                      {project.images && project.images.length > 0 && (
                        <Carousel>
                          <CarouselContent>
                            {project.images.map((img, idx) => (
                              <CarouselItem key={idx}>
                                <div className="relative">
                                  <img
                                    src={img}
                                    alt={`${project.title} ${idx + 1}`}
                                    className="w-full h-48 object-cover"
                                  />
                                  {/* Tool badges overlay */}
                                  {project.tools && project.tools.length > 0 && idx === 0 && (
                                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                      {project.tools.slice(0, 3).map((tool) => (
                                        <Badge 
                                          key={tool}
                                          className="text-xs"
                                          style={{ 
                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                            color: 'white',
                                          }}
                                        >
                                          {tool}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      )}
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>
                          {project.title}
                        </h3>
                        
                        {project.description && (
                          <p className="text-sm mb-4 line-clamp-2" style={{ color: secondaryTextColor }}>
                            {project.description}
                          </p>
                        )}
                        
                        {project.externalLink && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="border-white/20 hover:bg-white/10"
                          >
                            <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Project
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex justify-center pt-8">
                <Button variant="outline" asChild className="border-white/20 hover:bg-white/10">
                  <Link to="/customization">
                    <Settings className="h-4 w-4 mr-2" />
                    Customize Profile
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}