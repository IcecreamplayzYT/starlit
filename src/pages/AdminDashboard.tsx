// // import { useState, useEffect } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { Users, CheckCircle, Clock, Eye, Check, X, ExternalLink } from 'lucide-react'
// // import { Button } from '@/components/ui/button'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Badge } from '@/components/ui/badge'
// // import { useAuth } from '@/hooks/useAuth'
// // import { useToast } from '@/hooks/use-toast'
// // import { api } from '@/lib/api'

// // interface Profile {
// //   _id: string
// //   slug: string
// //   name: string
// //   headline?: string
// //   role?: string
// //   approved: boolean
// //   createdAt: string
// //   userId: {
// //     email: string
// //   }
// // }

// // export default function AdminDashboard() {
// //   const [profiles, setProfiles] = useState<Profile[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [isAdmin, setIsAdmin] = useState(false)
// //   const [actionLoading, setActionLoading] = useState<string | null>(null)

// //   const { user } = useAuth()
// //   const navigate = useNavigate()
// //   const { toast } = useToast()

// //   useEffect(() => {
// //     if (!user) {
// //       navigate('/auth')
// //       return
// //     }
// //     checkAdminAndFetchData()
// //   }, [user, navigate])

// //   const checkAdminAndFetchData = async () => {
// //     try {
// //       const rolesResponse = await api.get('/roles')
// //       const roles = rolesResponse.data
      
// //       if (!roles.includes('admin')) {
// //         navigate('/')
// //         return
// //       }

// //       setIsAdmin(true)
// //       fetchProfiles()
// //     } catch (error) {
// //       navigate('/')
// //     }
// //   }

// //   const fetchProfiles = async () => {
// //     try {
// //       const response = await api.get('/admin/profiles')
// //       setProfiles(response.data)
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to fetch profiles",
// //         variant: "destructive"
// //       })
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleApprove = async (profileId: string) => {
// //     setActionLoading(profileId)
// //     try {
// //       await api.put(`/admin/profiles/${profileId}/approve`)
// //       setProfiles(prev => prev.map(p => 
// //         p._id === profileId ? { ...p, approved: true } : p
// //       ))
// //       toast({
// //         title: "Profile approved",
// //         description: "The profile is now visible in Discover"
// //       })
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to approve profile",
// //         variant: "destructive"
// //       })
// //     } finally {
// //       setActionLoading(null)
// //     }
// //   }

// //   const handleReject = async (profileId: string) => {
// //     if (!confirm('Are you sure you want to reject and delete this profile? This action cannot be undone.')) {
// //       return
// //     }

// //     setActionLoading(profileId)
// //     try {
// //       await api.delete(`/admin/profiles/${profileId}/reject`)
// //       setProfiles(prev => prev.filter(p => p._id !== profileId))
// //       toast({
// //         title: "Profile rejected",
// //         description: "The profile has been deleted"
// //       })
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to reject profile",
// //         variant: "destructive"
// //       })
// //     } finally {
// //       setActionLoading(null)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
// //           <p className="text-muted-foreground">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!isAdmin) {
// //     return null
// //   }

// //   const totalProfiles = profiles.length
// //   const approvedProfiles = profiles.filter(p => p.approved).length
// //   const pendingProfiles = profiles.filter(p => !p.approved).length
// //   const approvedProfilesList = profiles.filter(p => p.approved)
// //   const pendingProfilesList = profiles.filter(p => !p.approved)

// //   return (
// //     <div className="min-h-screen pt-24 px-4">
// //       <div className="container mx-auto py-8">
// //         <div className="mb-8 animate-fade-in">
// //           <h1 className="text-4xl font-bold mb-4 text-gradient">Admin Dashboard</h1>
// //           <p className="text-xl text-muted-foreground">
// //             Manage profiles and review submissions
// //           </p>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
// //               <Users className="h-4 w-4 text-muted-foreground" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{totalProfiles}</div>
// //             </CardContent>
// //           </Card>

// //           <Card className="border-green-500/30">
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Approved</CardTitle>
// //               <CheckCircle className="h-4 w-4 text-green-500" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-green-500">{approvedProfiles}</div>
// //             </CardContent>
// //           </Card>

// //           <Card className="border-secondary-glow/30">
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
// //               <Clock className="h-4 w-4 text-secondary-glow" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-secondary-glow">{pendingProfiles}</div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Review Queue */}
// //         {pendingProfilesList.length > 0 && (
// //           <Card className="mb-8 animate-fade-in">
// //             <CardHeader>
// //               <CardTitle className="flex items-center space-x-2">
// //                 <Clock className="h-5 w-5 text-secondary-glow" />
// //                 <span>Review Queue</span>
// //                 <Badge variant="secondary">{pendingProfilesList.length}</Badge>
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 {pendingProfilesList.map((profile) => (
// //                   <div key={profile._id} className="flex items-center justify-between p-4 border border-border rounded-lg">
// //                     <div className="flex-1">
// //                       <div className="flex items-center space-x-4">
// //                         <div>
// //                           <h3 className="font-semibold">{profile.name}</h3>
// //                           <p className="text-sm text-muted-foreground">{profile.headline || 'No headline'}</p>
// //                           <p className="text-xs text-muted-foreground">
// //                             starlit.you/{profile.slug} • {profile.userId.email}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center space-x-2">
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         asChild
// //                       >
// //                         <a href={`/profile/${profile.slug}`} target="_blank" rel="noopener noreferrer">
// //                           <Eye className="h-4 w-4 mr-1" />
// //                           View
// //                         </a>
// //                       </Button>
// //                       <Button
// //                         variant="glow"
// //                         size="sm"
// //                         onClick={() => handleApprove(profile._id)}
// //                         disabled={actionLoading === profile._id}
// //                       >
// //                         <Check className="h-4 w-4 mr-1" />
// //                         Approve
// //                       </Button>
// //                       <Button
// //                         variant="destructive"
// //                         size="sm"
// //                         onClick={() => handleReject(profile._id)}
// //                         disabled={actionLoading === profile._id}
// //                       >
// //                         <X className="h-4 w-4 mr-1" />
// //                         Reject
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </CardContent>
// //           </Card>
// //         )}

// //         {/* Approved Profiles */}
// //         <Card className="animate-fade-in">
// //           <CardHeader>
// //             <CardTitle className="flex items-center space-x-2">
// //               <CheckCircle className="h-5 w-5 text-green-500" />
// //               <span>Approved Profiles</span>
// //               <Badge variant="secondary">{approvedProfilesList.length}</Badge>
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             {approvedProfilesList.length > 0 ? (
// //               <div className="grid md:grid-cols-2 gap-4">
// //                 {approvedProfilesList.map((profile) => (
// //                   <div key={profile._id} className="flex items-center justify-between p-4 border border-border rounded-lg">
// //                     <div>
// //                       <h3 className="font-semibold">{profile.name}</h3>
// //                       <p className="text-sm text-muted-foreground">{profile.headline || 'No headline'}</p>
// //                       <p className="text-xs text-muted-foreground">
// //                         starlit.you/{profile.slug}
// //                       </p>
// //                     </div>
// //                     <Button
// //                       variant="outline"
// //                       size="sm"
// //                       asChild
// //                     >
// //                       <a href={`/profile/${profile.slug}`} target="_blank" rel="noopener noreferrer">
// //                         <ExternalLink className="h-4 w-4" />
// //                       </a>
// //                     </Button>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="text-center py-8">
// //                 <p className="text-muted-foreground">No approved profiles yet</p>
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }

// // Original Code

// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Users, CheckCircle, Eye, Trash2, Edit, Save, X, Shield, ShieldCheck, Search } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Input } from '@/components/ui/input'
// import { Scrollwheel } from '@/components/ui/scrollwheel'
// import { useAuth } from '@/hooks/useAuth'
// import { useToast } from '@/hooks/use-toast'
// import { api } from '@/lib/api'

// interface Profile {
//   _id: string
//   slug: string
//   username: string
//   displayName: string
//   name: string
//   headline?: string
//   role?: string
//   approved: boolean
//   createdAt: string
//   userId: {
//     _id: string
//     email: string
//   }
//   likes: number
// }

// interface EditingProfile {
//   username: string
//   displayName: string
//   slug: string
//   email: string
//   headline: string
//   bio: string
//   description: string
//   location: string
//   website: string
// }

// export default function AdminDashboard() {
//   const [profiles, setProfiles] = useState<Profile[]>([])
//   const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
//   const [loading, setLoading] = useState(true)
//   const [isAdmin, setIsAdmin] = useState(false)
//   const [actionLoading, setActionLoading] = useState<string | null>(null)
//   const [editingProfile, setEditingProfile] = useState<string | null>(null)
//   const [editData, setEditData] = useState<EditingProfile>({
//     username: '',
//     displayName: '',
//     slug: '',
//     email: '',
//     headline: '',
//     bio: '',
//     description: '',
//     location: '',
//     website: ''
//   })
//   const [permissionsOpen, setPermissionsOpen] = useState<string | null>(null)
//   const [userRoles, setUserRoles] = useState<{ [key: string]: string[] }>({})
//   const [searchQuery, setSearchQuery] = useState('')

//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const { toast } = useToast()

//   useEffect(() => {
//     if (!user) {
//       navigate('/auth')
//       return
//     }
//     checkAdminAndFetchData()
//   }, [user, navigate])

//   useEffect(() => {
//     filterProfiles()
//   }, [searchQuery, profiles])

//   const checkAdminAndFetchData = async () => {
//     try {
//       const rolesResponse = await api.get('/roles')
//       const roles = rolesResponse.data
      
//       if (!roles.includes('admin')) {
//         navigate('/')
//         return
//       }

//       setIsAdmin(true)
//       fetchProfiles()
//     } catch (error) {
//       navigate('/')
//     }
//   }

//   const fetchProfiles = async () => {
//     try {
//       const response = await api.get('/admin/profiles')
//       setProfiles(response.data)
//       setFilteredProfiles(response.data)
      
//       // Fetch roles for all users
//       const rolesMap: { [key: string]: string[] } = {}
//       for (const profile of response.data) {
//         try {
//           const rolesRes = await api.get(`/admin/users/${profile.userId._id}/roles`)
//           rolesMap[profile.userId._id] = rolesRes.data
//         } catch (error) {
//           rolesMap[profile.userId._id] = []
//         }
//       }
//       setUserRoles(rolesMap)
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch profiles",
//         variant: "destructive"
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filterProfiles = () => {
//     if (!searchQuery.trim()) {
//       setFilteredProfiles(profiles)
//       return
//     }

//     const query = searchQuery.toLowerCase()
//     const filtered = profiles.filter(profile => {
//       return (
//         profile.username?.toLowerCase().includes(query) ||
//         profile.displayName?.toLowerCase().includes(query) ||
//         profile.name?.toLowerCase().includes(query) ||
//         profile.slug?.toLowerCase().includes(query) ||
//         profile.userId.email?.toLowerCase().includes(query)
//       )
//     })

//     setFilteredProfiles(filtered)
//   }

//   const handleDelete = async (profileId: string) => {
//     if (!confirm('Are you sure you want to DELETE this profile? This action cannot be undone.')) {
//       return
//     }

//     setActionLoading(profileId)
//     try {
//       await api.delete(`/admin/profiles/${profileId}`)
//       setProfiles(prev => prev.filter(p => p._id !== profileId))
//       toast({
//         title: "Profile deleted",
//         description: "The profile has been permanently deleted"
//       })
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete profile",
//         variant: "destructive"
//       })
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const startEditing = (profile: Profile) => {
//     setEditingProfile(profile._id)
//     setEditData({
//       username: profile.username || profile.slug,
//       displayName: profile.displayName || profile.name,
//       slug: profile.slug,
//       email: profile.userId.email,
//       headline: profile.headline || '',
//       bio: '',
//       description: '',
//       location: '',
//       website: ''
//     })
//   }

//   const cancelEditing = () => {
//     setEditingProfile(null)
//     setEditData({ 
//       username: '', 
//       displayName: '', 
//       slug: '', 
//       email: '',
//       headline: '',
//       bio: '',
//       description: '',
//       location: '',
//       website: ''
//     })
//   }

//   const saveProfile = async (profileId: string, userId: string) => {
//     setActionLoading(profileId)
//     try {
//       // Update profile
//       await api.patch(`/admin/profiles/${profileId}`, {
//         username: editData.username,
//         displayName: editData.displayName,
//         slug: editData.slug,
//         headline: editData.headline,
//         bio: editData.bio,
//         description: editData.description,
//         location: editData.location,
//         website: editData.website
//       })

//       // Update user email
//       await api.patch(`/admin/users/${userId}`, {
//         email: editData.email
//       })

//       setProfiles(prev => prev.map(p => 
//         p._id === profileId 
//           ? { 
//               ...p, 
//               username: editData.username,
//               displayName: editData.displayName,
//               slug: editData.slug,
//               headline: editData.headline,
//               userId: { ...p.userId, email: editData.email }
//             }
//           : p
//       ))

//       toast({
//         title: "Profile updated",
//         description: "Changes have been saved successfully"
//       })
      
//       setEditingProfile(null)
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.error || "Failed to update profile",
//         variant: "destructive"
//       })
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const toggleRole = async (userId: string, role: string) => {
//     try {
//       const currentRoles = userRoles[userId] || []
//       const hasRole = currentRoles.includes(role)

//       if (hasRole) {
//         await api.delete(`/admin/users/${userId}/roles/${role}`)
//         setUserRoles(prev => ({
//           ...prev,
//           [userId]: currentRoles.filter(r => r !== role)
//         }))
//         toast({
//           title: "Role removed",
//           description: `${role} role has been removed`
//         })
//       } else {
//         await api.post(`/admin/users/${userId}/roles`, { role })
//         setUserRoles(prev => ({
//           ...prev,
//           [userId]: [...currentRoles, role]
//         }))
//         toast({
//           title: "Role added",
//           description: `${role} role has been added`
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update role",
//         variant: "destructive"
//       })
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!isAdmin) {
//     return null
//   }

//   const totalProfiles = profiles.length

//   return (
//     <div className="min-h-screen pt-24 px-4">
//       <div className="container mx-auto py-8">
//         <div className="mb-8 animate-fade-in">
//           <h1 className="text-4xl font-bold mb-4 text-gradient">Admin Dashboard</h1>
//           <p className="text-xl text-muted-foreground">
//             Manage all profiles and permissions
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{totalProfiles}</div>
//             </CardContent>
//           </Card>

//           <Card className="border-green-500/30">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Approved</CardTitle>
//               <CheckCircle className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-500">
//                 {profiles.filter(p => p.approved).length}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-blue-500/30">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
//               <Eye className="h-4 w-4 text-blue-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-500">
//                 {profiles.reduce((sum, p) => sum + (p.likes || 0), 0)}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search Bar */}
//         <Card className="mb-6 animate-fade-in">
//           <CardContent className="p-6">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <Input
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search by username, display name, slug, or email..."
//                 className="pl-10"
//               />
//             </div>
//             {searchQuery && (
//               <p className="text-sm text-muted-foreground mt-2">
//                 Showing {filteredProfiles.length} of {totalProfiles} profiles
//               </p>
//             )}
//           </CardContent>
//         </Card>

//         {/* All Profiles */}
//         <Card className="animate-fade-in">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Users className="h-5 w-5" />
//               <span>All Profiles</span>
//               <Badge variant="secondary">{filteredProfiles.length}</Badge>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {filteredProfiles.length > 0 ? (
//               <Scrollwheel maxHeight="600px" showScrollbar={true}>
//                 <div className="space-y-4 pr-2">
//                   {filteredProfiles.map((profile) => {
//                     const isEditing = editingProfile === profile._id
//                     const roles = userRoles[profile.userId._id] || []

//                     return (
//                       <div key={profile._id} className="p-4 border border-border rounded-lg">
//                         {isEditing ? (
//                           <div className="space-y-3">
//                             <div className="grid grid-cols-2 gap-3">
//                               <div>
//                                 <label className="text-xs font-medium">Username</label>
//                                 <Input
//                                   className="h-8"
//                                   value={editData.username}
//                                   onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
//                                 />
//                               </div>
//                               <div>
//                                 <label className="text-xs font-medium">Display Name</label>
//                                 <Input
//                                   className="h-8"
//                                   value={editData.displayName}
//                                   onChange={(e) => setEditData(prev => ({ ...prev, displayName: e.target.value }))}
//                                 />
//                               </div>
//                               <div>
//                                 <label className="text-xs font-medium">Slug</label>
//                                 <Input
//                                   className="h-8"
//                                   value={editData.slug}
//                                   onChange={(e) => setEditData(prev => ({ ...prev, slug: e.target.value }))}
//                                 />
//                               </div>
//                               <div>
//                                 <label className="text-xs font-medium">Email</label>
//                                 <Input
//                                   className="h-8"
//                                   value={editData.email}
//                                   onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
//                                 />
//                               </div>
//                               <div className="col-span-2">
//                                 <label className="text-xs font-medium">Headline</label>
//                                 <Input
//                                   className="h-8"
//                                   value={editData.headline}
//                                   onChange={(e) => setEditData(prev => ({ ...prev, headline: e.target.value }))}
//                                   placeholder="User's headline"
//                                 />
//                               </div>
//                               <div className="col-span-2">
//                                 <label className="text-xs font-medium">Location</label>
//                                 <Input
//                                   className="h-8"
//                                   value={editData.location}
//                                   onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
//                                   placeholder="City, Country"
//                                 />
//                               </div>
//                               <div className="col-span-2">
//                                 <label className="text-xs font-medium">Website</label>
//                                 <Input
//                                   className="h-8"
//                                   value={editData.website}
//                                   onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
//                                   placeholder="https://example.com"
//                                 />
//                               </div>
//                             </div>
//                             <div className="flex space-x-2">
//                               <Button
//                                 size="sm"
//                                 variant="glow"
//                                 onClick={() => saveProfile(profile._id, profile.userId._id)}
//                                 disabled={actionLoading === profile._id}
//                               >
//                                 <Save className="h-4 w-4 mr-1" />
//                                 Save
//                               </Button>
//                               <Button size="sm" variant="outline" onClick={cancelEditing}>
//                                 <X className="h-4 w-4 mr-1" />
//                                 Cancel
//                               </Button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="flex items-start justify-between">
//                             <div className="flex-1">
//                               <div className="flex items-center space-x-2 mb-1">
//                                 <h3 className="font-semibold">{profile.displayName || profile.name}</h3>
//                                 {roles.includes('admin') && (
//                                   <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
//                                     <ShieldCheck className="h-3 w-3 mr-1" />
//                                     Verified Staff
//                                   </Badge>
//                                 )}
//                                 {profile.approved && (
//                                   <Badge variant="outline" className="text-green-500 border-green-500">
//                                     <CheckCircle className="h-3 w-3 mr-1" />
//                                     Approved
//                                   </Badge>
//                                 )}
//                               </div>
//                               <p className="text-sm text-muted-foreground">{profile.headline || 'No headline'}</p>
//                               <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
//                                 <span>@{profile.username || profile.slug}</span>
//                                 <span>•</span>
//                                 <span>{profile.userId.email}</span>
//                                 <span>•</span>
//                                 <span>❤️ {profile.likes || 0} likes</span>
//                               </div>
//                             </div>

//                             <div className="flex items-center space-x-2">
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 asChild
//                               >
//                                 <a href={`/profile/${profile.slug}`} target="_blank" rel="noopener noreferrer">
//                                   <Eye className="h-4 w-4" />
//                                 </a>
//                               </Button>

//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => setPermissionsOpen(permissionsOpen === profile._id ? null : profile._id)}
//                               >
//                                 <Shield className="h-4 w-4" />
//                               </Button>

//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => startEditing(profile)}
//                               >
//                                 <Edit className="h-4 w-4" />
//                               </Button>

//                               <Button
//                                 variant="destructive"
//                                 size="sm"
//                                 onClick={() => handleDelete(profile._id)}
//                                 disabled={actionLoading === profile._id}
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </div>
//                         )}

//                         {/* Permissions Panel */}
//                         {permissionsOpen === profile._id && !isEditing && (
//                           <div className="mt-4 p-4 border-t border-border bg-muted/20 rounded-b-lg">
//                             <h4 className="text-sm font-semibold mb-3">User Permissions</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {['admin', 'designer', 'hirer'].map((role) => (
//                                 <Button
//                                   key={role}
//                                   size="sm"
//                                   variant={roles.includes(role) ? 'glow' : 'outline'}
//                                   onClick={() => toggleRole(profile.userId._id, role)}
//                                 >
//                                   {role.charAt(0).toUpperCase() + role.slice(1)}
//                                 </Button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )
//                   })}
//                 </div>
//               </Scrollwheel>
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-muted-foreground">
//                   {searchQuery ? 'No profiles found matching your search' : 'No profiles found'}
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, CheckCircle, Eye, Trash2, Edit, Save, X, Shield, ShieldCheck, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Scrollwheel } from '@/components/ui/scrollwheel'
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
}

interface EditingProfile {
  username: string
  displayName: string
  slug: string
  email: string
  headline: string
  bio: string
  description: string
  location: string
  website: string
}

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [editingProfile, setEditingProfile] = useState<string | null>(null)
  const [editData, setEditData] = useState<EditingProfile>({
    username: '',
    displayName: '',
    slug: '',
    email: '',
    headline: '',
    bio: '',
    description: '',
    location: '',
    website: ''
  })
  const [permissionsOpen, setPermissionsOpen] = useState<string | null>(null)
  const [userRoles, setUserRoles] = useState<{ [key: string]: string[] }>({})
  const [searchQuery, setSearchQuery] = useState('')

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

  useEffect(() => {
    filterProfiles()
  }, [searchQuery, profiles])

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
      setFilteredProfiles(response.data)
      
      // Fetch roles for all users
      const rolesMap: { [key: string]: string[] } = {}
      for (const profile of response.data) {
        try {
          const rolesRes = await api.get(`/admin/users/${profile.userId._id}/roles`)
          rolesMap[profile.userId._id] = rolesRes.data
        } catch (error) {
          rolesMap[profile.userId._id] = []
        }
      }
      setUserRoles(rolesMap)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profiles",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filterProfiles = () => {
    if (!searchQuery.trim()) {
      setFilteredProfiles(profiles)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = profiles.filter(profile => {
      return (
        profile.username?.toLowerCase().includes(query) ||
        profile.displayName?.toLowerCase().includes(query) ||
        profile.name?.toLowerCase().includes(query) ||
        profile.slug?.toLowerCase().includes(query) ||
        profile.userId.email?.toLowerCase().includes(query)
      )
    })

    setFilteredProfiles(filtered)
  }

  const handleDelete = async (profileId: string) => {
    if (!confirm('Are you sure you want to DELETE this profile? This action cannot be undone.')) {
      return
    }

    setActionLoading(profileId)
    try {
      await api.delete(`/admin/profiles/${profileId}`)
      setProfiles(prev => prev.filter(p => p._id !== profileId))
      toast({
        title: "Profile deleted",
        description: "The profile has been permanently deleted"
      })
    } catch (error) {
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
      email: profile.userId.email,
      headline: profile.headline || '',
      bio: '',
      description: '',
      location: '',
      website: ''
    })
  }

  const cancelEditing = () => {
    setEditingProfile(null)
    setEditData({ 
      username: '', 
      displayName: '', 
      slug: '', 
      email: '',
      headline: '',
      bio: '',
      description: '',
      location: '',
      website: ''
    })
  }

  const saveProfile = async (profileId: string, userId: string) => {
    setActionLoading(profileId)
    try {
      // Update profile
      await api.patch(`/admin/profiles/${profileId}`, {
        username: editData.username,
        displayName: editData.displayName,
        slug: editData.slug,
        headline: editData.headline,
        bio: editData.bio,
        description: editData.description,
        location: editData.location,
        website: editData.website
      })

      // Update user email
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
              headline: editData.headline,
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
        toast({
          title: "Role removed",
          description: `${role} role has been removed`
        })
      } else {
        await api.post(`/admin/users/${userId}/roles`, { role })
        setUserRoles(prev => ({
          ...prev,
          [userId]: [...currentRoles, role]
        }))
        toast({
          title: "Role added",
          description: `${role} role has been added`
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive"
      })
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

  if (!isAdmin) {
    return null
  }

  const totalProfiles = profiles.length

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Manage all profiles and permissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProfiles}</div>
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

          <Card className="border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {profiles.reduce((sum, p) => sum + (p.likes || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by username, display name, slug, or email..."
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Showing {filteredProfiles.length} of {totalProfiles} profiles
              </p>
            )}
          </CardContent>
        </Card>

        {/* All Profiles */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Profiles</span>
              <Badge variant="secondary">{filteredProfiles.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredProfiles.length > 0 ? (
              <Scrollwheel maxHeight="600px" showScrollbar={true}>
                <div className="space-y-4 pr-2">
                  {filteredProfiles.map((profile) => {
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
                              <div className="col-span-2">
                                <label className="text-xs font-medium">Headline</label>
                                <Input
                                  className="h-8"
                                  value={editData.headline}
                                  onChange={(e) => setEditData(prev => ({ ...prev, headline: e.target.value }))}
                                  placeholder="User's headline"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="text-xs font-medium">Location</label>
                                <Input
                                  className="h-8"
                                  value={editData.location}
                                  onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                                  placeholder="City, Country"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="text-xs font-medium">Website</label>
                                <Input
                                  className="h-8"
                                  value={editData.website}
                                  onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                                  placeholder="https://example.com"
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
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold">{profile.displayName || profile.name}</h3>
                                {roles.includes('admin') && (
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                                    <ShieldCheck className="h-3 w-3 mr-1" />
                                    Verified Staff
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
                              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                                <span>@{profile.username || profile.slug}</span>
                                <span>•</span>
                                <span>{profile.userId.email}</span>
                                <span>•</span>
                                <span>❤️ {profile.likes || 0} likes</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
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

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => startEditing(profile)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(profile._id)}
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
              </Scrollwheel>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchQuery ? 'No profiles found matching your search' : 'No profiles found'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}