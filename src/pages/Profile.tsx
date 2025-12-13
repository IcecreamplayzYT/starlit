// import { useState, useEffect } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Clock, Heart, Settings, Mail, Phone, MessageSquare } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardContent } from '@/components/ui/card'
// import { useAuth } from '@/hooks/useAuth'
// import { useToast } from '@/hooks/use-toast'
// import { api } from '@/lib/api'

// interface Project {
//   _id: string
//   title: string
//   description?: string
//   images?: string[]
//   tools?: string[]
//   year?: number
//   externalLink?: string
// }

// interface ContactMethod {
//   type: string
//   value: string
//   label?: string
// }

// interface Profile {
//   _id: string
//   slug: string
//   username: string
//   displayName: string
//   name: string
//   headline?: string
//   bio?: string
//   description?: string
//   avatarUrl?: string
//   bannerUrl?: string
//   profileImages?: string[]
//   location?: string
//   role?: string
//   tools?: string[]
//   website?: string
//   github?: string
//   linkedin?: string
//   twitter?: string
//   contactMethods?: ContactMethod[]
//   customization?: {
//     primaryColor?: string
//     secondaryColor?: string
//     positioning?: string
//     theme?: string
//   }
//   approved: boolean
//   likes: number
//   isPremium: boolean
//   projects?: Project[]
//   userId: any
// }

// export default function Profile() {
//   const { slug } = useParams<{ slug: string }>()
//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const { toast } = useToast()
//   const [profile, setProfile] = useState<Profile | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [notFound, setNotFound] = useState(false)
//   const [hasLiked, setHasLiked] = useState(false)
//   const [likeCount, setLikeCount] = useState(0)
//   const [isOwner, setIsOwner] = useState(false)

//   useEffect(() => {
//     if (slug) {
//       fetchProfile()
//     }
//   }, [slug])

//   useEffect(() => {
//     if (profile && user) {
//       checkIfLiked()
//       checkIfOwner()
//     }
//   }, [profile, user])

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get(`/profiles/slug/${slug}`)
//       setProfile(response.data)
//       setLikeCount(response.data.likes || 0)
      
//       // Track profile view
//       api.post('/analytics', {
//         profileId: response.data._id,
//         eventType: 'profile_view'
//       }).catch(() => {})
//     } catch (error: any) {
//       // Log errors for debugging redirect/authorization issues
//       try {
//         console.error('fetchProfile error', {
//           slug,
//           status: error.response?.status,
//           data: error.response?.data,
//           message: error.message
//         })
//       } catch (e) {
//         console.error('Error while logging fetchProfile error', e)
//       }

//       if (error.response?.status === 404) {
//         setNotFound(true)
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const checkIfLiked = async () => {
//     if (!user || !profile) return
//     try {
//       const response = await api.get(`/likes/check/${profile._id}`)
//       setHasLiked(response.data.liked)
//     } catch (error) {
//       console.error('Failed to check like status:', error)
//     }
//   }

//   const checkIfOwner = () => {
//     if (!user || !profile) return
//     setIsOwner(profile.userId._id === user.id || profile.userId === user.id)
//   }

//   const handleLike = async () => {
//     if (!user) {
//       toast({
//         title: "Sign in required",
//         description: "Please sign in to like profiles",
//         variant: "destructive"
//       })
//       navigate('/auth')
//       return
//     }

//     if (!profile) return

//     try {
//       if (hasLiked) {
//         await api.delete(`/likes/${profile._id}`)
//         setHasLiked(false)
//         setLikeCount(prev => prev - 1)
//         toast({
//           title: "Unliked",
//           description: "Removed from your liked profiles"
//         })
//       } else {
//         await api.post('/likes', { profileId: profile._id })
//         setHasLiked(true)
//         setLikeCount(prev => prev + 1)
//         toast({
//           title: "Liked!",
//           description: "Added to your liked profiles"
//         })
//       }
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.error || "Failed to update like",
//         variant: "destructive"
//       })
//     }
//   }

//   const getContactIcon = (type: string) => {
//     switch (type) {
//       case 'email': return <Mail className="h-4 w-4" />
//       case 'phone': return <Phone className="h-4 w-4" />
//       case 'discord': return <MessageSquare className="h-4 w-4" />
//       case 'telegram': return <MessageSquare className="h-4 w-4" />
//       default: return <ExternalLink className="h-4 w-4" />
//     }
//   }

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading profile...</p>
//         </div>
//       </div>
//     )
//   }

//   if (notFound) {
//     return (
//       <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
//           <p className="text-muted-foreground mb-8">
//             The profile you're looking for doesn't exist or has been removed.
//           </p>
//           <Button variant="glow" asChild>
//             <Link to="/discover">Discover Other Creators</Link>
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   if (!profile) return null

//   const positioning = profile.customization?.positioning || 'center'
//   const primaryColor = profile.customization?.primaryColor || '#3B82F6'

//   return (
//     <div className="min-h-screen pt-24 px-4">
//       {/* Banner */}
//       {profile.bannerUrl && (
//         <div className="w-full h-64 mb-8">
//           <img
//             src={profile.bannerUrl}
//             alt="Profile banner"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       )}

//       <div className="container mx-auto py-8 max-w-6xl">
//         <div className={`grid lg:grid-cols-${positioning === 'center' ? '3' : '4'} gap-8`}>
//           {/* Left Sidebar */}
//           <div className={`lg:col-span-1 ${positioning === 'right' ? 'lg:order-2' : ''}`}>
//             <Card className="sticky top-32">
//               <CardContent className="p-6 text-center space-y-6">
//                 <div className="relative mx-auto w-24 h-24">
//                   {profile.avatarUrl ? (
//                     <img
//                       src={profile.avatarUrl}
//                       alt={profile.displayName || profile.name}
//                       className="w-full h-full rounded-full object-cover border-2 border-primary-glow shadow-glow"
//                       style={{ borderColor: primaryColor }}
//                     />
//                   ) : (
//                     <div 
//                       className="w-full h-full rounded-full border-2 shadow-glow flex items-center justify-center text-primary-foreground font-bold text-xl"
//                       style={{ 
//                         background: `linear-gradient(to bottom right, ${primaryColor}, ${profile.customization?.secondaryColor || '#8B5CF6'})`,
//                         borderColor: primaryColor
//                       }}
//                     >
//                       {getInitials(profile.displayName || profile.name)}
//                     </div>
//                   )}
//                   {profile.isPremium && (
//                     <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2" variant="default">
//                       Premium
//                     </Badge>
//                   )}
//                 </div>

//                 <div>
//                   <h1 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
//                     {profile.displayName || profile.name}
//                   </h1>
//                   <p className="text-sm text-muted-foreground mb-1">@{profile.username}</p>
//                   {profile.headline && (
//                     <p className="text-muted-foreground">{profile.headline}</p>
//                   )}
//                   {profile.role && (
//                     <Badge variant="outline" className="mt-2">{profile.role}</Badge>
//                   )}
//                 </div>

//                 {/* Like Button */}
//                 <Button
//                   variant={hasLiked ? "glow" : "outline"}
//                   size="sm"
//                   onClick={handleLike}
//                   className="w-full"
//                   disabled={isOwner}
//                 >
//                   <Heart className={`h-4 w-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
//                   {hasLiked ? 'Liked' : 'Like'} ({likeCount})
//                 </Button>

//                 {isOwner && (
//                   <Button variant="outline" size="sm" asChild className="w-full">
//                     <Link to={`/profile/${profile.slug}/customize`}>
//                       <Settings className="h-4 w-4 mr-2" />
//                       Customize Profile
//                     </Link>
//                   </Button>
//                 )}

//                 {profile.location && (
//                   <div className="flex items-center justify-center text-muted-foreground">
//                     <MapPin className="h-4 w-4 mr-2" />
//                     {profile.location}
//                   </div>
//                 )}

//                 {profile.tools && profile.tools.length > 0 && (
//                   <div>
//                     <h3 className="text-sm font-semibold mb-3 text-left">Tools & Skills</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {profile.tools.map((tool) => (
//                         <Badge key={tool} variant="secondary" className="text-xs">
//                           {tool}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Contact Methods */}
//                 {profile.contactMethods && profile.contactMethods.length > 0 && (
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-semibold text-left">Contact</h3>
//                     {profile.contactMethods.map((contact, idx) => (
//                       <div key={idx} className="text-left p-2 border border-border rounded-lg">
//                         <div className="flex items-center space-x-2 text-sm">
//                           {getContactIcon(contact.type)}
//                           <div>
//                             <p className="font-medium">{contact.label || contact.type}</p>
//                             <p className="text-xs text-muted-foreground">{contact.value}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Social Links */}
//                 <div className="space-y-3">
//                   {profile.website && (
//                     <Button variant="outline" size="sm" asChild className="w-full">
//                       <a href={profile.website} target="_blank" rel="noopener noreferrer">
//                         <Globe className="h-4 w-4 mr-2" />
//                         Website
//                       </a>
//                     </Button>
//                   )}
//                   {profile.github && (
//                     <Button variant="outline" size="sm" asChild className="w-full">
//                       <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">
//                         <Github className="h-4 w-4 mr-2" />
//                         GitHub
//                       </a>
//                     </Button>
//                   )}
//                   {profile.linkedin && (
//                     <Button variant="outline" size="sm" asChild className="w-full">
//                       <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
//                         <Linkedin className="h-4 w-4 mr-2" />
//                         LinkedIn
//                       </a>
//                     </Button>
//                   )}
//                   {profile.twitter && (
//                     <Button variant="outline" size="sm" asChild className="w-full">
//                       <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer">
//                         <Twitter className="h-4 w-4 mr-2" />
//                         Twitter
//                       </a>
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Content */}
//           <div className={`lg:col-span-2 space-y-8 ${positioning === 'right' ? 'lg:order-1' : ''}`}>
//             {!profile.approved && (
//               <Card className="border-secondary-glow bg-secondary/10">
//                 <CardContent className="p-4 flex items-center space-x-3">
//                   <Clock className="h-5 w-5 text-secondary-glow" />
//                   <div>
//                     <p className="font-medium">Profile Pending Review</p>
//                     <p className="text-sm text-muted-foreground">
//                       Your profile is pending admin approval and will be visible in Discover once reviewed.
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* About/Description Section */}
//             {(profile.bio || profile.description) && (
//               <Card>
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>About</h2>
//                   <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                     {profile.description || profile.bio}
//                   </p>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Gallery Images */}
//             {profile.profileImages && profile.profileImages.length > 0 && (
//               <Card>
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>Gallery</h2>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {profile.profileImages.map((img, idx) => (
//                       <img
//                         key={idx}
//                         src={img}
//                         alt={`Gallery ${idx + 1}`}
//                         className="w-full h-48 object-cover rounded-lg border border-border hover:scale-105 transition-transform cursor-pointer"
//                       />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Projects Section */}
//             <Card>
//               <CardContent className="p-6">
//                 <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>Projects</h2>
                
//                 {profile.projects && profile.projects.length > 0 ? (
//                   <div className="space-y-6">
//                     {profile.projects.map((project) => (
//                       <div key={project._id} className="border-l-2 pl-4 space-y-3" style={{ borderColor: primaryColor }}>
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h3 className="font-semibold text-lg">{project.title}</h3>
//                             {project.year && (
//                               <p className="text-sm text-muted-foreground">{project.year}</p>
//                             )}
//                           </div>
//                           {project.externalLink && (
//                             <Button variant="outline" size="sm" asChild>
//                               <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
//                                 <ExternalLink className="h-4 w-4 mr-2" />
//                                 View Project
//                               </a>
//                             </Button>
//                           )}
//                         </div>
                        
//                         {project.description && (
//                           <p className="text-muted-foreground">{project.description}</p>
//                         )}
                        
//                         {project.tools && project.tools.length > 0 && (
//                           <div className="flex flex-wrap gap-2">
//                             {project.tools.map((tool) => (
//                               <Badge key={tool} variant="secondary" className="text-xs">
//                                 {tool}
//                               </Badge>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <p className="text-muted-foreground">No projects yet</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Clock, Heart, Settings, Mail, Phone, MessageSquare as MessageSquareIcon, Crown, ShieldCheck, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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

interface ContactMethod {
  type: string
  value: string
  label?: string
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
  profileImages?: string[]
  location?: string
  role?: string
  tools?: string[]
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  contactMethods?: ContactMethod[]
  customization?: any
  approved: boolean
  likes: number
  views: number
  isPremium: boolean
  isStaff: boolean
  isVerified: boolean
  verificationBadge?: string
  projects?: Project[]
  userId: any
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
  const [sendingRequest, setSendingRequest] = useState(false)
  const [chatStatus, setChatStatus] = useState<'none' | 'pending' | 'accepted'>('none')

  useEffect(() => {
    if (slug) {
      fetchProfile()
    }
  }, [slug])

  useEffect(() => {
    if (profile && user) {
      checkIfLiked()
      checkIfOwner()
      checkChatStatus()
      recordView()
    }
  }, [profile, user])

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/profiles/slug/${slug}`)
      setProfile(response.data)
      setLikeCount(response.data.likes || 0)
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

  const checkChatStatus = async () => {
    if (!user || !profile || isOwner) return
    
    try {
      // Check if chat already exists or request is pending
      const response = await api.get('/chat')
      const existingChat = response.data.find((chat: any) => 
        chat.otherProfile?._id === profile._id || 
        chat.participants.some((p: any) => p.toString() === profile.userId._id || p.toString() === profile.userId)
      )
      
      if (existingChat) {
        setChatStatus('accepted')
      }
    } catch (error) {
      console.error('Failed to check chat status:', error)
    }
  }

  const recordView = async () => {
    if (!user || !profile || isOwner) return
    
    try {
      await api.post('/views', { profileId: profile._id })
    } catch (error) {
      // Silent fail
    }
  }

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like profiles",
        variant: "destructive"
      })
      navigate('/auth')
      return
    }

    if (!profile) return

    try {
      if (hasLiked) {
        await api.delete(`/likes/${profile._id}`)
        setHasLiked(false)
        setLikeCount(prev => prev - 1)
        toast({
          title: "Unliked",
          description: "Removed from your liked profiles"
        })
      } else {
        await api.post('/likes', { profileId: profile._id })
        setHasLiked(true)
        setLikeCount(prev => prev + 1)
        toast({
          title: "Liked!",
          description: "Added to your liked profiles"
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update like",
        variant: "destructive"
      })
    }
  }

  const handleSendChatRequest = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to send chat requests",
        variant: "destructive"
      })
      navigate('/auth')
      return
    }

    if (!profile) return

    setSendingRequest(true)
    try {
      await api.post('/chat/request', { receiverId: profile.userId._id || profile.userId })
      setChatStatus('pending')
      toast({
        title: "Chat request sent!",
        description: "You'll be notified when they accept"
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to send chat request",
        variant: "destructive"
      })
    } finally {
      setSendingRequest(false)
    }
  }

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'phone': return <Phone className="h-4 w-4" />
      case 'discord': return <MessageSquareIcon className="h-4 w-4" />
      case 'telegram': return <MessageSquareIcon className="h-4 w-4" />
      default: return <ExternalLink className="h-4 w-4" />
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="glow" asChild>
            <Link to="/discover">Discover Other Creators</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const positioning = profile.customization?.positioning || 'center'
  const primaryColor = profile.customization?.primaryColor || '#3B82F6'

  return (
    <div className="min-h-screen pt-24 px-4">
      {/* Banner */}
      {profile.bannerUrl && (
        <div className="w-full h-64 mb-8">
          <img
            src={profile.bannerUrl}
            alt="Profile banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="container mx-auto py-8 max-w-6xl">
        <div className={`grid lg:grid-cols-${positioning === 'center' ? '3' : '4'} gap-8`}>
          {/* Left Sidebar */}
          <div className={`lg:col-span-1 ${positioning === 'right' ? 'lg:order-2' : ''}`}>
            <Card className="sticky top-32">
              <CardContent className="p-6 text-center space-y-6">
                <div className="relative mx-auto w-24 h-24">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.displayName || profile.name}
                      className="w-full h-full rounded-full object-cover border-2 border-primary-glow shadow-glow"
                      style={{ borderColor: primaryColor }}
                    />
                  ) : (
                    <div 
                      className="w-full h-full rounded-full border-2 shadow-glow flex items-center justify-center text-primary-foreground font-bold text-xl"
                      style={{ 
                        background: `linear-gradient(to bottom right, ${primaryColor}, ${profile.customization?.secondaryColor || '#8B5CF6'})`,
                        borderColor: primaryColor
                      }}
                    >
                      {getInitials(profile.displayName || profile.name)}
                    </div>
                  )}
                  {profile.isPremium && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
                      {profile.displayName || profile.name}
                    </h1>
                    {profile.isStaff && (
                      <ShieldCheck className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">@{profile.username}</p>
                  {profile.headline && (
                    <p className="text-muted-foreground">{profile.headline}</p>
                  )}
                  {profile.role && (
                    <Badge variant="outline" className="mt-2">{profile.role}</Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    variant={hasLiked ? "glow" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    className="w-full"
                    disabled={isOwner}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                    {hasLiked ? 'Liked' : 'Like'} ({likeCount})
                  </Button>

                  {!isOwner && chatStatus === 'none' && (
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={handleSendChatRequest}
                      className="w-full"
                      disabled={sendingRequest}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {sendingRequest ? 'Sending...' : 'Send Message'}
                    </Button>
                  )}

                  {chatStatus === 'pending' && (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Clock className="h-4 w-4 mr-2" />
                      Request Pending
                    </Button>
                  )}

                  {chatStatus === 'accepted' && (
                    <Button variant="glow" size="sm" asChild className="w-full">
                      <Link to="/messages">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Open Chat
                      </Link>
                    </Button>
                  )}

                  {isOwner && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to={`/profile/${profile.slug}/customize`}>
                        <Settings className="h-4 w-4 mr-2" />
                        Customize Profile
                      </Link>
                    </Button>
                  )}
                </div>

                {profile.location && (
                  <div className="flex items-center justify-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {profile.location}
                  </div>
                )}

                {profile.tools && profile.tools.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-left">Tools & Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Methods */}
                {profile.contactMethods && profile.contactMethods.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-left">Contact</h3>
                    {profile.contactMethods.map((contact, idx) => (
                      <div key={idx} className="text-left p-2 border border-border rounded-lg">
                        <div className="flex items-center space-x-2 text-sm">
                          {getContactIcon(contact.type)}
                          <div>
                            <p className="font-medium">{contact.label || contact.type}</p>
                            <p className="text-xs text-muted-foreground">{contact.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                <div className="space-y-3">
                  {profile.website && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                  {profile.github && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {profile.linkedin && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {profile.twitter && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className={`lg:col-span-2 space-y-8 ${positioning === 'right' ? 'lg:order-1' : ''}`}>
            {!profile.approved && (
              <Card className="border-secondary-glow bg-secondary/10">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-secondary-glow" />
                  <div>
                    <p className="font-medium">Profile Pending Review</p>
                    <p className="text-sm text-muted-foreground">
                      Your profile is pending admin approval and will be visible in Discover once reviewed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About/Description Section */}
            {(profile.bio || profile.description) && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>About</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {profile.description || profile.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Gallery Images */}
            {profile.profileImages && profile.profileImages.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {profile.profileImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-border hover:scale-105 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>Projects</h2>
                
                {profile.projects && profile.projects.length > 0 ? (
                  <div className="space-y-6">
                    {profile.projects.map((project) => (
                      <div key={project._id} className="border-l-2 pl-4 space-y-3" style={{ borderColor: primaryColor }}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            {project.year && (
                              <p className="text-sm text-muted-foreground">{project.year}</p>
                            )}
                          </div>
                          {project.externalLink && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Project
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        {project.description && (
                          <p className="text-muted-foreground">{project.description}</p>
                        )}
                        
                        {project.tools && project.tools.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <Badge key={tool} variant="secondary" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No projects yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}