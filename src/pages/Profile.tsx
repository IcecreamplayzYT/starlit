// // import { useState, useEffect } from 'react'
// // import { useParams, Link } from 'react-router-dom'
// // import { MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Clock } from 'lucide-react'
// // import { Button } from '@/components/ui/button'
// // import { Badge } from '@/components/ui/badge'
// // import { Card, CardContent } from '@/components/ui/card'
// // import { api } from '@/lib/api'

// // interface Project {
// //   _id: string
// //   title: string
// //   description?: string
// //   images?: string[]
// //   tools?: string[]
// //   year?: number
// //   externalLink?: string
// // }

// // interface Profile {
// //   _id: string
// //   slug: string
// //   name: string
// //   headline?: string
// //   bio?: string
// //   avatarUrl?: string
// //   location?: string
// //   role?: string
// //   tools?: string[]
// //   website?: string
// //   github?: string
// //   linkedin?: string
// //   twitter?: string
// //   approved: boolean
// //   projects?: Project[]
// // }

// // export default function Profile() {
// //   const { slug } = useParams<{ slug: string }>()
// //   const [profile, setProfile] = useState<Profile | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [notFound, setNotFound] = useState(false)

// //   useEffect(() => {
// //     if (slug) {
// //       fetchProfile()
// //     }
// //   }, [slug])

// //   const fetchProfile = async () => {
// //     try {
// //       const response = await api.get(`/profiles/slug/${slug}`)
// //       setProfile(response.data)
      
// //       // Track profile view
// //       api.post('/analytics', {
// //         profileId: response.data._id,
// //         eventType: 'profile_view'
// //       }).catch(() => {}) // Silent fail
// //     } catch (error: any) {
// //       if (error.response?.status === 404) {
// //         setNotFound(true)
// //       }
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const getInitials = (name: string) => {
// //     return name
// //       .split(' ')
// //       .map(n => n[0])
// //       .join('')
// //       .toUpperCase()
// //       .slice(0, 2)
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
// //           <p className="text-muted-foreground">Loading profile...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (notFound) {
// //     return (
// //       <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
// //         <div className="text-center">
// //           <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
// //           <p className="text-muted-foreground mb-8">
// //             The profile you're looking for doesn't exist or has been removed.
// //           </p>
// //           <Button variant="glow" asChild>
// //             <Link to="/discover">Discover Other Creators</Link>
// //           </Button>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!profile) return null

// //   return (
// //     <div className="min-h-screen pt-24 px-4">
// //       <div className="container mx-auto py-8 max-w-6xl">
// //         <div className="grid lg:grid-cols-3 gap-8">
// //           {/* Left Sidebar */}
// //           <div className="lg:col-span-1">
// //             <Card className="sticky top-32">
// //               <CardContent className="p-6 text-center space-y-6">
// //                 <div className="relative mx-auto w-24 h-24">
// //                   {profile.avatarUrl ? (
// //                     <img
// //                       src={profile.avatarUrl}
// //                       alt={profile.name}
// //                       className="w-full h-full rounded-full object-cover border-2 border-primary-glow shadow-glow"
// //                     />
// //                   ) : (
// //                     <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-glow border-2 border-primary-glow shadow-glow flex items-center justify-center text-primary-foreground font-bold text-xl">
// //                       {getInitials(profile.name)}
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <h1 className="text-2xl font-bold text-accent mb-2">{profile.name}</h1>
// //                   {profile.headline && (
// //                     <p className="text-muted-foreground">{profile.headline}</p>
// //                   )}
// //                   {profile.role && (
// //                     <Badge variant="outline" className="mt-2">{profile.role}</Badge>
// //                   )}
// //                 </div>

// //                 {profile.location && (
// //                   <div className="flex items-center justify-center text-muted-foreground">
// //                     <MapPin className="h-4 w-4 mr-2" />
// //                     {profile.location}
// //                   </div>
// //                 )}

// //                 {profile.tools && profile.tools.length > 0 && (
// //                   <div>
// //                     <h3 className="text-sm font-semibold mb-3 text-left">Tools & Skills</h3>
// //                     <div className="flex flex-wrap gap-2">
// //                       {profile.tools.map((tool) => (
// //                         <Badge key={tool} variant="secondary" className="text-xs">
// //                           {tool}
// //                         </Badge>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Social Links */}
// //                 <div className="space-y-3">
// //                   {profile.website && (
// //                     <Button variant="outline" size="sm" asChild className="w-full">
// //                       <a href={profile.website} target="_blank" rel="noopener noreferrer">
// //                         <Globe className="h-4 w-4 mr-2" />
// //                         Website
// //                       </a>
// //                     </Button>
// //                   )}
// //                   {profile.github && (
// //                     <Button variant="outline" size="sm" asChild className="w-full">
// //                       <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">
// //                         <Github className="h-4 w-4 mr-2" />
// //                         GitHub
// //                       </a>
// //                     </Button>
// //                   )}
// //                   {profile.linkedin && (
// //                     <Button variant="outline" size="sm" asChild className="w-full">
// //                       <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
// //                         <Linkedin className="h-4 w-4 mr-2" />
// //                         LinkedIn
// //                       </a>
// //                     </Button>
// //                   )}
// //                   {profile.twitter && (
// //                     <Button variant="outline" size="sm" asChild className="w-full">
// //                       <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer">
// //                         <Twitter className="h-4 w-4 mr-2" />
// //                         Twitter
// //                       </a>
// //                     </Button>
// //                   )}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Right Content */}
// //           <div className="lg:col-span-2 space-y-8">
// //             {!profile.approved && (
// //               <Card className="border-secondary-glow bg-secondary/10">
// //                 <CardContent className="p-4 flex items-center space-x-3">
// //                   <Clock className="h-5 w-5 text-secondary-glow" />
// //                   <div>
// //                     <p className="font-medium">Profile Pending Review</p>
// //                     <p className="text-sm text-muted-foreground">
// //                       Your profile is pending admin approval and will be visible in Discover once reviewed.
// //                     </p>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             )}

// //             {/* About Section */}
// //             {profile.bio && (
// //               <Card>
// //                 <CardContent className="p-6">
// //                   <h2 className="text-xl font-semibold mb-4">About</h2>
// //                   <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
// //                     {profile.bio}
// //                   </p>
// //                 </CardContent>
// //               </Card>
// //             )}

// //             {/* Projects Section */}
// //             <Card>
// //               <CardContent className="p-6">
// //                 <h2 className="text-xl font-semibold mb-4">Projects</h2>
                
// //                 {profile.projects && profile.projects.length > 0 ? (
// //                   <div className="space-y-6">
// //                     {profile.projects.map((project) => (
// //                       <div key={project._id} className="border-l-2 border-primary/30 pl-4 space-y-3">
// //                         <div className="flex items-start justify-between">
// //                           <div>
// //                             <h3 className="font-semibold text-lg">{project.title}</h3>
// //                             {project.year && (
// //                               <p className="text-sm text-muted-foreground">{project.year}</p>
// //                             )}
// //                           </div>
// //                           {project.externalLink && (
// //                             <Button variant="outline" size="sm" asChild>
// //                               <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
// //                                 <ExternalLink className="h-4 w-4 mr-2" />
// //                                 View Project
// //                               </a>
// //                             </Button>
// //                           )}
// //                         </div>
                        
// //                         {project.description && (
// //                           <p className="text-muted-foreground">{project.description}</p>
// //                         )}
                        
// //                         {project.tools && project.tools.length > 0 && (
// //                           <div className="flex flex-wrap gap-2">
// //                             {project.tools.map((tool) => (
// //                               <Badge key={tool} variant="secondary" className="text-xs">
// //                                 {tool}
// //                               </Badge>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-8">
// //                     <p className="text-muted-foreground">No projects yet</p>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // Original Code

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

// V2

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, CheckCircle, Eye, Trash2, Edit, Save, X, Shield, ShieldCheck, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import DeleteConfirmModal from '@/components/DeleteConfirmModal'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

interface Profile {
  _id: string
  slug: string
  username: string
  displayName: string
  name: string
  headline?: string
  role?: string
  approved: boolean
  createdAt: string
  userId: {
    _id: string
    email: string
  }
  likes: number
  views: number
  isStaff: boolean
  isPremium: boolean
}

interface EditingProfile {
  username: string
  displayName: string
  slug: string
  email: string
}

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [editingProfile, setEditingProfile] = useState<string | null>(null)
  const [editData, setEditData] = useState<EditingProfile>({
    username: '',
    displayName: '',
    slug: '',
    email: ''
  })
  const [permissionsOpen, setPermissionsOpen] = useState<string | null>(null)
  const [userRoles, setUserRoles] = useState<{ [key: string]: string[] }>({})
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; profile: Profile | null }>({
    open: false,
    profile: null
  })

  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }
    checkAdminAndFetchData()
  }, [user, navigate])

  const checkAdminAndFetchData = async () => {
    try {
      const rolesResponse = await api.get('/roles')
      const roles = rolesResponse.data
      
      if (!roles.includes('admin')) {
        navigate('/')
        return
      }

      setIsAdmin(true)
      fetchProfiles()
    } catch (error) {
      navigate('/')
    }
  }

  const fetchProfiles = async () => {
    try {
      const response = await api.get('/admin/profiles')
      setProfiles(response.data)
      
      // Fetch roles for all users
      const rolesMap: { [key: string]: string[] } = {}
      for (const profile of response.data) {
        try {
          const rolesRes = await api.get(`/admin/users/${profile.userId._id}/roles`)
          rolesMap[profile.userId._id] = rolesRes.data
        } catch {
          rolesMap[profile.userId._id] = []
        }
      }
      setUserRoles(rolesMap)
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch profiles",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async (reason: string) => {
    if (!deleteModal.profile) return
    
    setActionLoading(deleteModal.profile._id)
    try {
      await api.delete(`/admin/profiles/${deleteModal.profile._id}`, {
        data: { reason }
      })
      setProfiles(prev => prev.filter(p => p._id !== deleteModal.profile!._id))
      toast({
        title: "Profile deleted",
        description: "The profile has been permanently deleted"
      })
      setDeleteModal({ open: false, profile: null })
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete profile",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const startEditing = (profile: Profile) => {
    setEditingProfile(profile._id)
    setEditData({
      username: profile.username || profile.slug,
      displayName: profile.displayName || profile.name,
      slug: profile.slug,
      email: profile.userId.email
    })
  }

  const cancelEditing = () => {
    setEditingProfile(null)
    setEditData({ username: '', displayName: '', slug: '', email: '' })
  }

  const saveProfile = async (profileId: string, userId: string) => {
    setActionLoading(profileId)
    try {
      await api.patch(`/admin/profiles/${profileId}`, {
        username: editData.username,
        displayName: editData.displayName,
        slug: editData.slug
      })

      await api.patch(`/admin/users/${userId}`, {
        email: editData.email
      })

      setProfiles(prev => prev.map(p => 
        p._id === profileId 
          ? { 
              ...p, 
              username: editData.username,
              displayName: editData.displayName,
              slug: editData.slug,
              userId: { ...p.userId, email: editData.email }
            }
          : p
      ))

      toast({
        title: "Profile updated",
        description: "Changes have been saved successfully"
      })
      
      setEditingProfile(null)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update profile",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const toggleRole = async (userId: string, role: string) => {
    try {
      const currentRoles = userRoles[userId] || []
      const hasRole = currentRoles.includes(role)

      if (hasRole) {
        await api.delete(`/admin/users/${userId}/roles/${role}`)
        setUserRoles(prev => ({
          ...prev,
          [userId]: currentRoles.filter(r => r !== role)
        }))
        
        // Update isStaff in profile list
        if (role === 'admin') {
          setProfiles(prev => prev.map(p => 
            p.userId._id === userId ? { ...p, isStaff: false } : p
          ))
        }
        
        toast({ title: "Role removed", description: `${role} role has been removed` })
      } else {
        await api.post(`/admin/users/${userId}/roles`, { role })
        setUserRoles(prev => ({
          ...prev,
          [userId]: [...currentRoles, role]
        }))
        
        // Update isStaff in profile list
        if (role === 'admin') {
          setProfiles(prev => prev.map(p => 
            p.userId._id === userId ? { ...p, isStaff: true } : p
          ))
        }
        
        toast({ title: "Role added", description: `${role} role has been added` })
      }
    } catch {
      toast({ title: "Error", description: "Failed to update role", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="container mx-auto py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage all profiles and permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12 animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profiles.length}</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {profiles.filter(p => p.approved).length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
              <ShieldCheck className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {profiles.filter(p => p.isStaff).length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
              <Crown className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">
                {profiles.filter(p => p.isPremium).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Profiles */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Profiles</span>
              <Badge variant="secondary">{profiles.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {profiles.length > 0 ? (
              <div className="space-y-4">
                {profiles.map((profile) => {
                  const isEditing = editingProfile === profile._id
                  const roles = userRoles[profile.userId._id] || []

                  return (
                    <div key={profile._id} className="p-4 border border-border rounded-lg">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-medium">Username</label>
                              <Input
                                className="h-8"
                                value={editData.username}
                                onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium">Display Name</label>
                              <Input
                                className="h-8"
                                value={editData.displayName}
                                onChange={(e) => setEditData(prev => ({ ...prev, displayName: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium">Slug</label>
                              <Input
                                className="h-8"
                                value={editData.slug}
                                onChange={(e) => setEditData(prev => ({ ...prev, slug: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium">Email</label>
                              <Input
                                className="h-8"
                                value={editData.email}
                                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="glow"
                              onClick={() => saveProfile(profile._id, profile.userId._id)}
                              disabled={actionLoading === profile._id}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEditing}>
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1 flex-wrap gap-y-1">
                              <h3 className="font-semibold">{profile.displayName || profile.name}</h3>
                              {profile.isStaff && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg font-bold">
                                  <ShieldCheck className="h-3 w-3 mr-1" />
                                  STAFF
                                </Badge>
                              )}
                              {profile.isPremium && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                              {profile.approved && (
                                <Badge variant="outline" className="text-green-500 border-green-500">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approved
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{profile.headline || 'No headline'}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground flex-wrap gap-y-1">
                              <span>@{profile.username || profile.slug}</span>
                              <span>•</span>
                              <span>{profile.userId.email}</span>
                              <span>•</span>
                              <span>❤️ {profile.likes || 0}</span>
                              <span>👁️ {profile.views || 0}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/profile/${profile.slug}`} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPermissionsOpen(permissionsOpen === profile._id ? null : profile._id)}
                            >
                              <Shield className="h-4 w-4" />
                            </Button>

                            <Button variant="outline" size="sm" onClick={() => startEditing(profile)}>
                              <Edit className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setDeleteModal({ open: true, profile })}
                              disabled={actionLoading === profile._id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Permissions Panel */}
                      {permissionsOpen === profile._id && !isEditing && (
                        <div className="mt-4 p-4 border-t border-border bg-muted/20 rounded-b-lg">
                          <h4 className="text-sm font-semibold mb-3">User Permissions</h4>
                          <div className="flex flex-wrap gap-2">
                            {['admin', 'designer', 'hirer'].map((role) => (
                              <Button
                                key={role}
                                size="sm"
                                variant={roles.includes(role) ? 'glow' : 'outline'}
                                onClick={() => toggleRole(profile.userId._id, role)}
                              >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No profiles found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, profile: null })}
        onConfirm={handleDeleteConfirm}
        profileName={deleteModal.profile?.displayName || deleteModal.profile?.name || ''}
        loading={actionLoading === deleteModal.profile?._id}
      />
    </div>
  )
}