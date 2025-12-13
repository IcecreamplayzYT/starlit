// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Save, X, Plus } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { useAuth } from '@/hooks/useAuth'
// import { useToast } from '@/hooks/use-toast'
// import { api } from '@/lib/api'

// const THEMES = [
//   { name: 'Blue', primary: '#3B82F6', secondary: '#8B5CF6' },
//   { name: 'Purple', primary: '#8B5CF6', secondary: '#EC4899' },
//   { name: 'Green', primary: '#10B981', secondary: '#3B82F6' },
//   { name: 'Red', primary: '#EF4444', secondary: '#F59E0B' },
//   { name: 'Orange', primary: '#F97316', secondary: '#EF4444' }
// ]

// export default function ProfileCustomization() {
//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)
//   const [profile, setProfile] = useState<any>(null)
//   const [formData, setFormData] = useState({
//     username: '',
//     displayName: '',
//     headline: '',
//     description: '',
//     bio: '',
//     location: '',
//     website: '',
//     github: '',
//     linkedin: '',
//     twitter: '',
//     avatarUrl: '',
//     bannerUrl: '',
//     profileImages: [] as string[],
//     contactMethods: [] as Array<{ type: string; value: string; label: string }>,
//     customization: {
//       primaryColor: '#3B82F6',
//       secondaryColor: '#8B5CF6',
//       positioning: 'center',
//       theme: 'blue'
//     }
//   })
//   const [newImage, setNewImage] = useState('')
//   const [newContact, setNewContact] = useState({ type: 'email', value: '', label: '' })

//   useEffect(() => {
//     if (!user) {
//       navigate('/auth')
//       return
//     }
//     fetchProfile()
//   }, [user, navigate])

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get('/profiles/me')
//       setProfile(response.data)
//       setFormData({
//         username: response.data.username || '',
//         displayName: response.data.displayName || response.data.name || '',
//         headline: response.data.headline || '',
//         description: response.data.description || '',
//         bio: response.data.bio || '',
//         location: response.data.location || '',
//         website: response.data.website || '',
//         github: response.data.github || '',
//         linkedin: response.data.linkedin || '',
//         twitter: response.data.twitter || '',
//         avatarUrl: response.data.avatarUrl || '',
//         bannerUrl: response.data.bannerUrl || '',
//         profileImages: response.data.profileImages || [],
//         contactMethods: response.data.contactMethods || [],
//         customization: response.data.customization || {
//           primaryColor: '#3B82F6',
//           secondaryColor: '#8B5CF6',
//           positioning: 'center',
//           theme: 'blue'
//         }
//       })
//     } catch (error) {
//       console.error('Failed to fetch profile:', error)
//     }
//   }

//   const validateUrl = (url: string): boolean => {
//     if (!url) return true
//     try {
//       new URL(url)
//       return true
//     } catch {
//       return false
//     }
//   }

//   const handleAddImage = () => {
//     if (!newImage.trim()) return
    
//     if (!validateUrl(newImage)) {
//       toast({
//         title: "Invalid URL",
//         description: "Please enter a valid image URL",
//         variant: "destructive"
//       })
//       return
//     }
    
//     const maxImages = profile?.isPremium ? 10 : 5
//     if (formData.profileImages.length >= maxImages) {
//       toast({
//         title: "Image limit reached",
//         description: `You can only have ${maxImages} images`,
//         variant: "destructive"
//       })
//       return
//     }

//     setFormData(prev => ({
//       ...prev,
//       profileImages: [...prev.profileImages, newImage]
//     }))
//     setNewImage('')
//   }

//   const handleRemoveImage = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       profileImages: prev.profileImages.filter((_, i) => i !== index)
//     }))
//   }

//   const handleAddContact = () => {
//     if (!newContact.value.trim()) return
    
//     setFormData(prev => ({
//       ...prev,
//       contactMethods: [...prev.contactMethods, { ...newContact }]
//     }))
//     setNewContact({ type: 'email', value: '', label: '' })
//   }

//   const handleRemoveContact = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       contactMethods: prev.contactMethods.filter((_, i) => i !== index)
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (formData.website && !validateUrl(formData.website)) {
//       toast({
//         title: "Invalid URL",
//         description: "Please enter a valid website URL",
//         variant: "destructive"
//       })
//       return
//     }

//     setLoading(true)

//     try {
//       await api.patch(`/profiles/${profile._id}`, formData)
//       toast({
//         title: "Profile updated!",
//         description: "Your changes have been saved successfully."
//       })
//       navigate(`/profile/${profile.slug}`)
//     } catch (error: any) {
//       toast({
//         title: "Update failed",
//         description: error.response?.data?.error || "Failed to update profile",
//         variant: "destructive"
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-24 px-4 pb-12">
//       <div className="container mx-auto py-8 max-w-4xl">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2 text-gradient">Customize Your Profile</h1>
//           <p className="text-muted-foreground">Make your profile uniquely yours</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Info */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Basic Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Username</label>
//                   <Input value={formData.username} disabled className="bg-muted" />
//                   <p className="text-xs text-muted-foreground mt-1">Cannot be changed</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Display Name</label>
//                   <Input
//                     value={formData.displayName}
//                     onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Headline</label>
//                 <Input
//                   value={formData.headline}
//                   onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
//                   maxLength={100}
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">{formData.headline.length}/100</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Description</label>
//                 <Textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                   rows={4}
//                   maxLength={1000}
//                   className="resize-none"
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/1000</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Bio</label>
//                 <Textarea
//                   value={formData.bio}
//                   onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
//                   rows={3}
//                   maxLength={500}
//                   className="resize-none"
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">{formData.bio.length}/500</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Profile Pictures */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Profile Pictures</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Avatar URL</label>
//                 <Input
//                   value={formData.avatarUrl}
//                   onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
//                   placeholder="https://i.imgur.com/avatar.jpg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Banner URL</label>
//                 <Input
//                   value={formData.bannerUrl}
//                   onChange={(e) => setFormData(prev => ({ ...prev, bannerUrl: e.target.value }))}
//                   placeholder="https://i.imgur.com/banner.jpg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Gallery <Badge variant="secondary">{formData.profileImages.length}/{profile.isPremium ? 10 : 5}</Badge>
//                 </label>
//                 <div className="flex gap-2 mb-2">
//                   <Input
//                     value={newImage}
//                     onChange={(e) => setNewImage(e.target.value)}
//                     placeholder="Image URL"
//                   />
//                   <Button type="button" onClick={handleAddImage} size="sm">
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
                
//                 {formData.profileImages.length > 0 && (
//                   <div className="grid grid-cols-3 gap-2">
//                     {formData.profileImages.map((img, idx) => (
//                       <div key={idx} className="relative group">
//                         <img src={img} alt="" className="w-full h-24 object-cover rounded border" />
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveImage(idx)}
//                           className="absolute top-1 right-1 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100"
//                         >
//                           <X className="h-3 w-3 text-white" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Contact Methods */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Contact Methods</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex gap-2">
//                 <select
//                   value={newContact.type}
//                   onChange={(e) => setNewContact(prev => ({ ...prev, type: e.target.value }))}
//                   className="px-3 py-2 rounded-lg border-2 border-border bg-background"
//                 >
//                   <option value="email">Email</option>
//                   <option value="phone">Phone</option>
//                   <option value="discord">Discord</option>
//                   <option value="telegram">Telegram</option>
//                   <option value="other">Other</option>
//                 </select>
//                 <Input
//                   value={newContact.value}
//                   onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
//                   placeholder="Value"
//                 />
//                 <Input
//                   value={newContact.label}
//                   onChange={(e) => setNewContact(prev => ({ ...prev, label: e.target.value }))}
//                   placeholder="Label"
//                 />
//                 <Button type="button" onClick={handleAddContact} size="sm">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>

//               {formData.contactMethods.length > 0 && (
//                 <div className="space-y-2">
//                   {formData.contactMethods.map((contact, idx) => (
//                     <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
//                       <div>
//                         <p className="text-sm font-medium capitalize">{contact.type}</p>
//                         <p className="text-xs text-muted-foreground">{contact.value}</p>
//                       </div>
//                       <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveContact(idx)}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Customization */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Theme & Colors</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-3">Theme</label>
//                 <div className="grid grid-cols-5 gap-3">
//                   {THEMES.map((theme) => (
//                     <button
//                       key={theme.name}
//                       type="button"
//                       onClick={() => setFormData(prev => ({
//                         ...prev,
//                         customization: {
//                           ...prev.customization,
//                           theme: theme.name.toLowerCase(),
//                           primaryColor: theme.primary,
//                           secondaryColor: theme.secondary
//                         }
//                       }))}
//                       className={`p-4 rounded-lg border-2 ${
//                         formData.customization.theme === theme.name.toLowerCase()
//                           ? 'border-primary-glow'
//                           : 'border-border'
//                       }`}
//                     >
//                       <div className="flex flex-col items-center space-y-2">
//                         <div className="flex space-x-1">
//                           <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.primary }} />
//                           <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.secondary }} />
//                         </div>
//                         <span className="text-xs">{theme.name}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Positioning</label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {['left', 'center', 'right'].map((pos) => (
//                     <button
//                       key={pos}
//                       type="button"
//                       onClick={() => setFormData(prev => ({
//                         ...prev,
//                         customization: { ...prev.customization, positioning: pos }
//                       }))}
//                       className={`p-4 rounded-lg border-2 ${
//                         formData.customization.positioning === pos
//                           ? 'border-primary-glow bg-primary/10'
//                           : 'border-border'
//                       }`}
//                     >
//                       <div className="capitalize">{pos}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Social Links */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Location & Social</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Location</label>
//                 <Input
//                   value={formData.location}
//                   onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">Website</label>
//                 <Input
//                   value={formData.website}
//                   onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">GitHub</label>
//                 <Input
//                   value={formData.github || ''}
//                   onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">LinkedIn</label>
//                 <Input
//                   value={formData.linkedin || ''}
//                   onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">Twitter</label>
//                 <Input
//                   value={formData.twitter || ''}
//                   onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex justify-end space-x-4">
//             <Button type="button" variant="outline" onClick={() => navigate(`/profile/${profile.slug}`)}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="glow" disabled={loading}>
//               <Save className="h-4 w-4 mr-2" />
//               {loading ? 'Saving...' : 'Save Changes'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Save,
  X,
  Plus,
  Crown,
  Palette,
  Layout,
  Image as ImageIcon,
  Lock,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

/* -------------------------------------------------------------------------- */
/*  Constants                                                               */
/* -------------------------------------------------------------------------- */
const THEMES = [
  { name: 'Blue', primary: '#3B82F6', secondary: '#8B5CF6' },
  { name: 'Purple', primary: '#8B5CF6', secondary: '#EC4899' },
  { name: 'Green', primary: '#10B981', secondary: '#3B82F6' },
  { name: 'Red', primary: '#EF4444', secondary: '#F59E0B' },
  { name: 'Orange', primary: '#F97316', secondary: '#EF4444' },
  { name: 'Cyan', primary: '#06B6D4', secondary: '#8B5CF6' },
  { name: 'Pink', primary: '#EC4899', secondary: '#8B5CF6' },
  { name: 'Teal', primary: '#14B8A6', secondary: '#06B6D4' },
]

const BACKGROUND_TYPES = ['solid', 'gradient', 'image']
const CARD_STYLES = [
  'modern',
  'minimal',
  'glassmorphism',
  'neumorphism',
]

/* -------------------------------------------------------------------------- */
/*  Component                                                               */
/* -------------------------------------------------------------------------- */
export default function ProfileCustomization() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('basic')

  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    headline: '',
    description: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    avatarUrl: '',
    bannerUrl: '',
    cardImageUrl: '',
    profileBackgroundUrl: '',
    profileImages: [] as string[],
    contactMethods: [] as Array<{ type: string; value: string; label: string }>,
    customization: {
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      accentColor: '#EC4899',
      textColor: '#FFFFFF',
      backgroundColor: '#0A0A0A',
      positioning: 'center',
      theme: 'blue',
      backgroundType: 'solid',
      backgroundGradient:
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontStyle: 'sans-serif',
      cardStyle: 'modern',
      borderRadius: 'medium',
      shadowIntensity: 'medium',
      animationSpeed: 'normal',
      showSocialIcons: true,
      compactMode: false,
      customCSS: '',
    },
  })

  const [newImage, setNewImage] = useState('')
  const [newContact, setNewContact] = useState({
    type: 'email',
    value: '',
    label: '',
  })

  /* ---------------------------------------------------------------------- */
  /*  Effects                                                               */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }
    fetchProfile()
  }, [user, navigate])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profiles/me')
      setProfile(response.data)

      const customization = response.data.customization || {}
      setFormData({
        username: response.data.username || '',
        displayName:
          response.data.displayName ||
          response.data.name ||
          '',
        headline: response.data.headline || '',
        description: response.data.description || '',
        bio: response.data.bio || '',
        location: response.data.location || '',
        website: response.data.website || '',
        github: response.data.github || '',
        linkedin: response.data.linkedin || '',
        twitter: response.data.twitter || '',
        avatarUrl: response.data.avatarUrl || '',
        bannerUrl: response.data.bannerUrl || '',
        cardImageUrl: response.data.cardImageUrl || '',
        profileBackgroundUrl:
          response.data.profileBackgroundUrl || '',
        profileImages: response.data.profileImages || [],
        contactMethods: response.data.contactMethods || [],
        customization: {
          primaryColor:
            customization.primaryColor || '#3B82F6',
          secondaryColor:
            customization.secondaryColor || '#8B5CF6',
          accentColor:
            customization.accentColor || '#EC4899',
          textColor:
            customization.textColor || '#FFFFFF',
          backgroundColor:
            customization.backgroundColor || '#0A0A0A',
          positioning:
            customization.positioning || 'center',
          theme: customization.theme || 'blue',
          backgroundType:
            customization.backgroundType || 'solid',
          backgroundGradient:
            customization.backgroundGradient ||
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontStyle:
            customization.fontStyle || 'sans-serif',
          cardStyle:
            customization.cardStyle || 'modern',
          borderRadius:
            customization.borderRadius || 'medium',
          shadowIntensity:
            customization.shadowIntensity || 'medium',
          animationSpeed:
            customization.animationSpeed || 'normal',
          showSocialIcons:
            customization.showSocialIcons !== false,
          compactMode: customization.compactMode || false,
          customCSS: customization.customCSS || '',
        },
      })
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  /* ---------------------------------------------------------------------- */
  /*  Helpers                                                               */
  /* ---------------------------------------------------------------------- */
  const validateUrl = (url: string): boolean => {
    if (!url) return true
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleAddImage = () => {
    if (!newImage.trim()) return

    if (!validateUrl(newImage)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid image URL',
        variant: 'destructive',
      })
      return
    }

    const maxImages = profile?.isPremium ? 20 : 5
    if (formData.profileImages.length >= maxImages) {
      toast({
        title: 'Image limit reached',
        description: `You can only have ${maxImages} images`,
        variant: 'destructive',
      })
      return
    }

    setFormData((prev) => ({
      ...prev,
      profileImages: [...prev.profileImages, newImage],
    }))
    setNewImage('')
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      profileImages: prev.profileImages.filter(
        (_, i) => i !== index,
      ),
    }))
  }

  const handleAddContact = () => {
    if (!newContact.value.trim()) return

    setFormData((prev) => ({
      ...prev,
      contactMethods: [...prev.contactMethods, { ...newContact }],
    }))
    setNewContact({ type: 'email', value: '', label: '' })
  }

  const handleRemoveContact = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      contactMethods: prev.contactMethods.filter(
        (_, i) => i !== index,
      ),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.website && !validateUrl(formData.website)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid website URL',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      await api.patch(`/profiles/${profile._id}`, formData)
      toast({
        title: 'Profile updated!',
        description:
          'Your changes have been saved successfully.',
      })
      navigate(`/profile/${profile.slug}`)
    } catch (error: any) {
      toast({
        title: 'Update failed',
        description:
          error.response?.data?.error ||
          'Failed to update profile',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  /* ---------------------------------------------------------------------- */
  /*  UI helpers                                                            */
  /* ---------------------------------------------------------------------- */
  const PremiumFeature = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    if (profile?.isPremium) return <>{children}</>

    return (
      <div className="relative">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Lock className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-sm font-semibold text-yellow-500">
              Premium Feature
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() =>
                toast({
                  title: 'Coming Soon',
                  description:
                    'Premium upgrades will be available soon!',
                })
              }
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>
        <div className="opacity-50 pointer-events-none">{children}</div>
      </div>
    )
  }

  /* ---------------------------------------------------------------------- */
  /*  Render                                                                */
  /* ---------------------------------------------------------------------- */
  if (!profile) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="container mx-auto py-8 max-w-6xl">
        {/* ---------- Header ---------- */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gradient">
                Customize Your Profile
              </h1>
              <p className="text-muted-foreground">
                Make your profile uniquely yours
              </p>
            </div>
            {profile.isPremium && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Crown className="h-4 w-4 mr-1" />
                Premium User
              </Badge>
            )}
          </div>
        </div>

        {/* ---------- Tab Navigation ---------- */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {[
            { id: 'basic', label: 'Basic Info', icon: Layout },
            { id: 'images', label: 'Images', icon: ImageIcon },
            { id: 'styling', label: 'Styling', icon: Palette },
            { id: 'advanced', label: 'Advanced', icon: Crown },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'glow' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* ---------- Form ---------- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ----- Basic Info ----- */}
          {activeTab === 'basic' && (
            <>
              {/* Basic Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Username
                      </label>
                      <Input
                        value={formData.username}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Cannot be changed
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Display Name
                      </label>
                      <Input
                        value={formData.displayName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            displayName: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Headline
                    </label>
                    <Input
                      value={formData.headline}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          headline: e.target.value,
                        }))
                      }
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.headline.length}/100
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={4}
                      maxLength={1000}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.description.length}/1000
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      rows={3}
                      maxLength={500}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.bio.length}/500
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Methods Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <select
                      value={newContact.type}
                      onChange={(e) =>
                        setNewContact((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="px-3 py-2 rounded-lg border-2 border-border bg-background"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="discord">Discord</option>
                      <option value="telegram">Telegram</option>
                      <option value="other">Other</option>
                    </select>
                    <Input
                      value={newContact.value}
                      onChange={(e) =>
                        setNewContact((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      placeholder="Value"
                    />
                    <Input
                      value={newContact.label}
                      onChange={(e) =>
                        setNewContact((prev) => ({
                          ...prev,
                          label: e.target.value,
                        }))
                      }
                      placeholder="Label"
                    />
                    <Button
                      type="button"
                      onClick={handleAddContact}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {formData.contactMethods.length > 0 && (
                    <div className="space-y-2">
                      {formData.contactMethods.map((contact, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium capitalize">
                              {contact.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {contact.value}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveContact(idx)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Location & Social Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Location & Social</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Website
                    </label>
                    <Input
                      value={formData.website}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      GitHub
                    </label>
                    <Input
                      value={formData.github || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          github: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      LinkedIn
                    </label>
                    <Input
                      value={formData.linkedin || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          linkedin: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Twitter
                    </label>
                    <Input
                      value={formData.twitter || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          twitter: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ----- Images ----- */}
          {activeTab === 'images' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Pictures</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Avatar URL
                    </label>
                    <Input
                      value={formData.avatarUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          avatarUrl: e.target.value,
                        }))
                      }
                      placeholder="https://i.imgur.com/avatar.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Banner URL
                    </label>
                    <Input
                      value={formData.bannerUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bannerUrl: e.target.value,
                        }))
                      }
                      placeholder="https://i.imgur.com/banner.jpg"
                    />
                  </div>

                  <PremiumFeature>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Discovery Card Image{' '}
                        <Badge variant="secondary">Premium</Badge>
                      </label>
                      <Input
                        value={formData.cardImageUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cardImageUrl: e.target.value,
                          }))
                        }
                        placeholder="https://i.imgur.com/card.jpg"
                        disabled={!profile.isPremium}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Custom image for discovery cards
                      </p>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Profile Background{' '}
                        <Badge variant="secondary">Premium</Badge>
                      </label>
                      <Input
                        value={formData.profileBackgroundUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            profileBackgroundUrl: e.target.value,
                          }))
                        }
                        placeholder="https://i.imgur.com/background.jpg"
                        disabled={!profile.isPremium}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Full‑page background image
                      </p>
                    </div>
                  </PremiumFeature>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Gallery{' '}
                      <Badge variant="secondary">
                        {formData.profileImages.length}/
                        {profile.isPremium ? 20 : 5}
                      </Badge>
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="Image URL"
                      />
                      <Button
                        type="button"
                        onClick={handleAddImage}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {formData.profileImages.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {formData.profileImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative group"
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full h-24 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100"
                            >
                              <X className="h-3 w-3 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ----- Styling ----- */}
          {activeTab === 'styling' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Theme & Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Preset Themes */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Preset Themes
                    </label>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {THEMES.map((theme) => (
                        <button
                          key={theme.name}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              customization: {
                                ...prev.customization,
                                theme: theme.name.toLowerCase(),
                                primaryColor: theme.primary,
                                secondaryColor: theme.secondary,
                              },
                            }))
                          }
                          className={`p-4 rounded-lg border-2 ${
                            formData.customization.theme ===
                            theme.name.toLowerCase()
                              ? 'border-primary-glow'
                              : 'border-border'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className="flex space-x-1">
                              <div
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.primary }}
                              />
                              <div
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.secondary }}
                              />
                            </div>
                            <span className="text-xs">{theme.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Premium Color Pickers */}
                  <PremiumFeature>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Primary */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Primary Color{' '}
                          <Badge variant="secondary">Premium</Badge>
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={formData.customization.primaryColor}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customization: {
                                  ...prev.customization,
                                  primaryColor: e.target.value,
                                },
                              }))
                            }
                            disabled={!profile.isPremium}
                            className="w-16 h-10"
                          />
                          <Input
                            value={formData.customization.primaryColor}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customization: {
                                  ...prev.customization,
                                  primaryColor: e.target.value,
                                },
                              }))
                            }
                            disabled={!profile.isPremium}
                            placeholder="#3B82F6"
                          />
                        </div>
                      </div>

                      {/* Secondary */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Secondary Color{' '}
                          <Badge variant="secondary">Premium</Badge>
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={formData.customization.secondaryColor}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customization: {
                                  ...prev.customization,
                                  secondaryColor: e.target.value,
                                },
                              }))
                            }
                            disabled={!profile.isPremium}
                            className="w-16 h-10"
                          />
                          <Input
                            value={formData.customization.secondaryColor}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customization: {
                                  ...prev.customization,
                                  secondaryColor: e.target.value,
                                },
                              }))
                            }
                            disabled={!profile.isPremium}
                            placeholder="#8B5CF6"
                          />
                        </div>
                      </div>

                      {/* Accent */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Accent Color{' '}
                          <Badge variant="secondary">Premium</Badge>
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={formData.customization.accentColor}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customization: {
                                  ...prev.customization,
                                  accentColor: e.target.value,
                                },
                              }))
                            }
                            disabled={!profile.isPremium}
                            className="w-16 h-10"
                          />
                          <Input
                            value={formData.customization.accentColor}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customization: {
                                  ...prev.customization,
                                  accentColor: e.target.value,
                                },
                              }))
                            }
                            disabled={!profile.isPremium}
                            placeholder="#EC4899"
                          />
                        </div>
                      </div>
                    </div>
                  </PremiumFeature>

                  {/* Positioning */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Positioning
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['left', 'center', 'right'].map((pos) => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              customization: {
                                ...prev.customization,
                                positioning: pos,
                              },
                            }))
                          }
                          className={`p-4 rounded-lg border-2 ${
                            formData.customization.positioning === pos
                              ? 'border-primary-glow bg-primary/10'
                              : 'border-border'
                          }`}
                        >
                          <div className="capitalize">{pos}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Background Type – Premium */}
                  <PremiumFeature>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Background Type{' '}
                        <Badge variant="secondary">Premium</Badge>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {BACKGROUND_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                customization: {
                                  ...prev.customization,
                                  backgroundType: type,
                                },
                              }))
                            }
                            disabled={!profile.isPremium}
                            className={`p-4 rounded-lg border-2 capitalize ${
                              formData.customization.backgroundType ===
                              type
                                ? 'border-primary-glow bg-primary/10'
                                : 'border-border'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </PremiumFeature>
                </CardContent>
              </Card>
            </>
          )}

          {/* ----- Advanced ----- */}
          {activeTab === 'advanced' && (
            <PremiumFeature>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Advanced Styling{' '}
                    <Badge variant="secondary" className="ml-2">
                      Premium
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Card Style */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Style
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {CARD_STYLES.map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              customization: {
                                ...prev.customization,
                                cardStyle: style,
                              },
                            }))
                          }
                          disabled={!profile.isPremium}
                          className={`p-4 rounded-lg border-2 capitalize ${
                            formData.customization.cardStyle === style
                              ? 'border-primary-glow bg-primary/10'
                              : 'border-border'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Border Radius, Shadow, Animation Speed */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Border Radius */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Border Radius
                      </label>
                      <select
                        value={formData.customization.borderRadius}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customization: {
                              ...prev.customization,
                              borderRadius: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg border-2 border-border bg-background"
                      >
                        <option value="none">None</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="full">Full</option>
                      </select>
                    </div>

                    {/* Shadow Intensity */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Shadow Intensity
                      </label>
                      <select
                        value={formData.customization.shadowIntensity}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customization: {
                              ...prev.customization,
                              shadowIntensity: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg border-2 border-border bg-background"
                      >
                        <option value="none">None</option>
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="heavy">Heavy</option>
                      </select>
                    </div>

                    {/* Animation Speed */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Animation Speed
                      </label>
                      <select
                        value={formData.customization.animationSpeed}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customization: {
                              ...prev.customization,
                              animationSpeed: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg border-2 border-border bg-background"
                      >
                        <option value="slow">Slow</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                      </select>
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Show Social Icons */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="showSocialIcons"
                        checked={formData.customization.showSocialIcons}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customization: {
                              ...prev.customization,
                              showSocialIcons: e.target.checked,
                            },
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="showSocialIcons"
                        className="text-sm font-medium"
                      >
                        Show Social Icons
                      </label>
                    </div>

                    {/* Compact Mode */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="compactMode"
                        checked={formData.customization.compactMode}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customization: {
                              ...prev.customization,
                              compactMode: e.target.checked,
                            },
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="compactMode"
                        className="text-sm font-medium"
                      >
                        Compact Mode
                      </label>
                    </div>
                  </div>

                  {/* Custom CSS */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Custom CSS (Advanced)
                    </label>
                    <Textarea
                      value={formData.customization.customCSS}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customization: {
                            ...prev.customization,
                            customCSS: e.target.value,
                          },
                        }))
                      }
                      placeholder="/* Your CSS here */"
                      rows={5}
                      className="font-mono"
                    />
                  </div>
                </CardContent>
              </Card>
            </PremiumFeature>
          )}

          {/* ---------- Submit Button ---------- */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}