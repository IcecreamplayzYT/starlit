// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ArrowLeft, ArrowRight, Star, Sparkles, X, Plus, Mail, Phone, MessageSquare, ExternalLink } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Progress } from '@/components/ui/progress'
// import { Scrollwheel } from '@/components/ui/scrollwheel'
// import { Badge } from '@/components/ui/badge'
// import { useAuth } from '@/hooks/useAuth'
// import { useToast } from '@/hooks/use-toast'
// import { api } from '@/lib/api'

// const ROLES = [
//   'Designer', 'Developer', 'Illustrator', '3D Artist', 'Motion Designer', 'Brand Designer',
//   'UI Designer', 'UX Designer', 'Graphic Designer', 'Web Designer', 'Product Designer',
//   'Interaction Designer', 'Visual Designer', 'Typographer', 'Art Director', 'Creative Director',
//   'Animator', 'Video Editor', 'Photographer', 'Filmmaker', 'Game Designer',
//   'Game Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer',
//   'iOS Developer', 'Android Developer', 'Software Engineer', 'Data Visualization Specialist', 'Icon Designer',
//   'Logo Designer', 'Packaging Designer', 'Environmental Designer', 'Exhibition Designer', 'Set Designer',
//   'Costume Designer', 'Sound Designer', 'Composer', 'Musician', 'Writer',
//   'Editor', 'Journalist', 'Blogger', 'Podcaster', 'Influencer'
// ].sort()

// const TOOLS = [
//   'Figma', 'Photoshop', 'Illustrator', 'Sketch', 'After Effects', 'Blender',
//   'React', 'Vue', 'TypeScript', 'Python', 'Cinema 4D', 'InDesign',
//   'Canva', 'Photopea', 'Adobe Express', 'JavaScript', 'NodeJS',
//   'Adobe XD', 'InVision', 'Affinity Designer', 'GIMP', 'Inkscape',
//   'HTML', 'CSS', 'Sass', 'Bootstrap', 'Tailwind CSS', 'Unity', 'Unreal Engine',
//   'Visual Studio Code', 'Adobe Illustrator', 'Adobe Photoshop'
// ].sort()

// const THEMES = [
//   { name: 'Blue', primary: '#3B82F6', secondary: '#8B5CF6' },
//   { name: 'Purple', primary: '#8B5CF6', secondary: '#EC4899' },
//   { name: 'Green', primary: '#10B981', secondary: '#3B82F6' },
//   { name: 'Red', primary: '#EF4444', secondary: '#F59E0B' },
//   { name: 'Orange', primary: '#F97316', secondary: '#EF4444' }
// ]

// export default function Onboarding() {
//   const [step, setStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [roleSearchTerm, setRoleSearchTerm] = useState('')
//   const [toolSearchTerm, setToolSearchTerm] = useState('')
//   const [newImage, setNewImage] = useState('')
//   const [newContact, setNewContact] = useState({ type: 'email', value: '', label: '' })
  
//   const [formData, setFormData] = useState({
//     username: '',
//     displayName: '',
//     slug: '',
//     role: '',
//     tools: [] as string[],
//     headline: '',
//     bio: '',
//     description: '',
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

//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const { toast } = useToast()

//   useEffect(() => {
//     if (!user) {
//       navigate('/auth')
//     }
//   }, [user, navigate])

//   const totalSteps = 9
//   const progress = (step / totalSteps) * 100

//   const handleNext = () => {
//     if (step < totalSteps) {
//       setStep(step + 1)
//     } else {
//       handleSubmit()
//     }
//   }

//   const handleBack = () => {
//     if (step > 1) {
//       setStep(step - 1)
//     }
//   }

//   const generateSlug = (name: string) => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/-+/g, '-')
//       .replace(/^-+|-+$/g, '')
//       .trim()
//   }

//   const handleUsernameChange = (value: string) => {
//     const sanitized = generateSlug(value)
//     setFormData(prev => ({
//       ...prev,
//       username: sanitized,
//       slug: sanitized
//     }))
//   }

//   const handleDisplayNameChange = (value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       displayName: value
//     }))
//   }

//   const handleToolToggle = (tool: string) => {
//     setFormData(prev => ({
//       ...prev,
//       tools: prev.tools.includes(tool)
//         ? prev.tools.filter(t => t !== tool)
//         : [...prev.tools, tool]
//     }))
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
    
//     if (formData.profileImages.length >= 5) {
//       toast({
//         title: "Image limit reached",
//         description: "You can only have 5 images during onboarding",
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

//   const handleSubmit = async () => {
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
//       const response = await api.post('/profiles', formData)
//       toast({
//         title: "Lit! Your profile's live.",
//         description: "Welcome to the Starlit community.",
//       })
//       navigate(`/profile/${response.data.slug}`)
//     } catch (error: any) {
//       toast({
//         title: "Shoot — that didn't work",
//         description: error.response?.data?.error || "Something went wrong. Please try again.",
//         variant: "destructive"
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const canContinue = () => {
//     switch (step) {
//       case 1: return formData.username.trim() && formData.displayName.trim()
//       case 2: return formData.role.trim()
//       case 3: return formData.tools.length > 0
//       case 4: return formData.headline.trim()
//       case 5: return formData.description.trim()
//       case 6: return true
//       case 7: return true
//       case 8: return true
//       case 9: return true
//       default: return false
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

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">Who are you?</h2>
//               <p className="text-muted-foreground">Let's start with the basics</p>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Username <span className="text-destructive">*</span>
//                 </label>
//                 <Input
//                   value={formData.username}
//                   onChange={(e) => handleUsernameChange(e.target.value)}
//                   placeholder="yourusername"
//                   autoFocus
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Only letters, numbers, and dashes. This cannot be changed later.
//                 </p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Display Name <span className="text-destructive">*</span>
//                 </label>
//                 <Input
//                   value={formData.displayName}
//                   onChange={(e) => handleDisplayNameChange(e.target.value)}
//                   placeholder="Your Display Name"
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">
//                   This is how your name will appear on your profile
//                 </p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">Your URL Preview</label>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-muted-foreground text-sm">starlit.you/profile/</span>
//                   <Input
//                     value={formData.slug}
//                     disabled
//                     className="flex-1 bg-muted"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         const filteredRoles = ROLES.filter(role => 
//           role.toLowerCase().includes(roleSearchTerm.toLowerCase())
//         )
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">What do you do?</h2>
//               <p className="text-muted-foreground">Choose your primary role</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Search roles</label>
//               <Input
//                 value={roleSearchTerm}
//                 onChange={(e) => setRoleSearchTerm(e.target.value)}
//                 placeholder="Search roles..."
//               />
//             </div>
//             <Scrollwheel maxHeight="450px">
//               <div className="grid grid-cols-2 gap-3 p-2">
//                 {filteredRoles.length > 0 ? (
//                   filteredRoles.map((role) => (
//                     <button
//                       key={role}
//                       type="button"
//                       onClick={() => setFormData(prev => ({ ...prev, role }))}
//                       className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
//                         formData.role === role
//                           ? 'border-primary-glow bg-primary/10 shadow-glow-sm'
//                           : 'border-border hover:border-primary/50'
//                       }`}
//                     >
//                       <div className="font-medium">{role}</div>
//                     </button>
//                   ))
//                 ) : (
//                   <div className="col-span-2 text-center text-muted-foreground py-8">
//                     No roles found
//                   </div>
//                 )}
//               </div>
//             </Scrollwheel>
//           </div>
//         )

//       case 3:
//         const filteredTools = TOOLS.filter(tool => 
//           tool.toLowerCase().includes(toolSearchTerm.toLowerCase())
//         )
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">Your tools</h2>
//               <p className="text-muted-foreground">Select the tools you use</p>
//             </div>
//             <div>
//               <Input
//                 value={toolSearchTerm}
//                 onChange={(e) => setToolSearchTerm(e.target.value)}
//                 placeholder="Search tools..."
//               />
//             </div>
//             <Scrollwheel maxHeight="450px">
//               <div className="grid grid-cols-3 gap-3 p-2">
//                 {filteredTools.map((tool) => (
//                   <button
//                     key={tool}
//                     type="button"
//                     onClick={() => handleToolToggle(tool)}
//                     className={`p-3 rounded-lg border-2 text-center transition-all ${
//                       formData.tools.includes(tool)
//                         ? 'border-primary-glow bg-primary/10'
//                         : 'border-border'
//                     }`}
//                   >
//                     <div className="text-sm font-medium">{tool}</div>
//                   </button>
//                 ))}
//               </div>
//             </Scrollwheel>
//             {formData.tools.length > 0 && (
//               <div className="text-center">
//                 <p className="text-sm text-muted-foreground">
//                   Selected: {formData.tools.length}
//                 </p>
//               </div>
//             )}
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">Your headline</h2>
//               <p className="text-muted-foreground">A short, catchy intro</p>
//             </div>
//             <div>
//               <Input
//                 value={formData.headline}
//                 onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
//                 placeholder="e.g., UI/UX Designer crafting beautiful experiences"
//                 maxLength={100}
//               />
//               <p className="text-xs text-muted-foreground mt-1">
//                 {formData.headline.length}/100
//               </p>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">Tell your story</h2>
//               <p className="text-muted-foreground">About you</p>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <Textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                   placeholder="Tell us about yourself..."
//                   maxLength={1000}
//                   rows={6}
//                   className="resize-none"
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">
//                   {formData.description.length}/1000
//                 </p>
//               </div>
//               <div>
//                 <Textarea
//                   value={formData.bio}
//                   onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
//                   placeholder="Quick summary (optional)"
//                   maxLength={500}
//                   rows={3}
//                   className="resize-none"
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">
//                   {formData.bio.length}/500
//                 </p>
//               </div>
//             </div>
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">Profile Pictures</h2>
//               <p className="text-muted-foreground">Add your images</p>
//             </div>
            
//             <div className="bg-muted/50 p-3 rounded-lg">
//               <p className="text-xs text-muted-foreground">
//                 Use <a href="https://imgur.com" target="_blank" className="text-primary">Imgur</a> or <a href="https://imgbb.com" target="_blank" className="text-primary">ImgBB</a>
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium">Avatar URL</label>
//                 <Input
//                   value={formData.avatarUrl}
//                   onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
//                   placeholder="https://i.imgur.com/avatar.jpg"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium">Banner URL</label>
//                 <Input
//                   value={formData.bannerUrl}
//                   onChange={(e) => setFormData(prev => ({ ...prev, bannerUrl: e.target.value }))}
//                   placeholder="https://i.imgur.com/banner.jpg"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium">Gallery <Badge variant="secondary">{formData.profileImages.length}/5</Badge></label>
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
//                         <img src={img} alt="" className="w-full h-24 object-cover rounded" />
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
//             </div>
//           </div>
//         )

//       case 7:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">Contact Methods</h2>
//               <p className="text-muted-foreground">How can people reach you?</p>
//             </div>

//             <div className="space-y-4">
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
//                   className="flex-1"
//                 />
//                 <Button type="button" onClick={handleAddContact} size="sm">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>

//               {formData.contactMethods.length > 0 && (
//                 <div className="space-y-2">
//                   {formData.contactMethods.map((contact, idx) => (
//                     <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
//                       <div className="flex items-center space-x-2">
//                         {getContactIcon(contact.type)}
//                         <div>
//                           <p className="text-sm capitalize">{contact.type}</p>
//                           <p className="text-xs text-muted-foreground">{contact.value}</p>
//                         </div>
//                       </div>
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleRemoveContact(idx)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )

//       case 8:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">Customize</h2>
//               <p className="text-muted-foreground">Choose your theme</p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium mb-3 block">Theme</label>
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
//                 <label className="text-sm font-medium">Positioning</label>
//                 <div className="grid grid-cols-3 gap-3 mt-2">
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
//             </div>
//           </div>
//         )

//       case 9:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold mb-2">Final touches!</h2>
//               <p className="text-muted-foreground">Social links</p>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium">Location</label>
//                 <Input
//                   value={formData.location}
//                   onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
//                   placeholder="San Francisco, CA"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Website</label>
//                 <Input
//                   value={formData.website}
//                   onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
//                   placeholder="https://yoursite.com"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">GitHub</label>
//                 <Input
//                   value={formData.github || ''}
//                   onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
//                   placeholder="username"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">LinkedIn</label>
//                 <Input
//                   value={formData.linkedin || ''}
//                   onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
//                   placeholder="username"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Twitter/X</label>
//                 <Input
//                   value={formData.twitter || ''}
//                   onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
//                   placeholder="username"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   if (!user) return null

//   return (
//     <div className="min-h-screen pt-24 px-4 bg-gradient-hero pb-12">
//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8 animate-fade-in">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <Star className="h-8 w-8 text-primary-glow animate-float" fill="currentColor" />
//             <span className="text-2xl font-bold text-gradient">STARLIT</span>
//           </div>
//           <div className="flex items-center justify-center space-x-2 mb-6">
//             <Sparkles className="h-4 w-4 text-accent" />
//             <span className="text-muted-foreground">Let's set up your profile</span>
//             <Sparkles className="h-4 w-4 text-accent" />
//           </div>
//           <Progress value={progress} className="w-full max-w-md mx-auto" />
//           <p className="text-sm text-muted-foreground mt-2">
//             Step {step} of {totalSteps}
//           </p>
//         </div>

//         <Card className="animate-scale-in">
//           <CardHeader className="text-center">
//             <CardTitle className="sr-only">Onboarding Step {step}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {renderStep()}
            
//             <div className="flex justify-between pt-8">
//               <Button
//                 variant="outline"
//                 onClick={handleBack}
//                 disabled={step === 1}
//                 type="button"
//               >
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back
//               </Button>
              
//               <Button
//                 variant="glow"
//                 onClick={handleNext}
//                 disabled={!canContinue() || loading}
//                 type="button"
//               >
//                 {step === totalSteps ? (loading ? 'Creating...' : 'Complete') : 'Next'}
//                 {step < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// Original Code

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Star, Sparkles, X, Plus, Mail, Phone, MessageSquare, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Scrollwheel } from '@/components/ui/scrollwheel'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

const ROLES = [
  'Designer', 'Developer', 'Illustrator', '3D Artist', 'Motion Designer', 'Brand Designer',
  'UI Designer', 'UX Designer', 'Graphic Designer', 'Web Designer', 'Product Designer',
  'Interaction Designer', 'Visual Designer', 'Typographer', 'Art Director', 'Creative Director',
  'Animator', 'Video Editor', 'Photographer', 'Filmmaker', 'Game Designer',
  'Game Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer',
  'iOS Developer', 'Android Developer', 'Software Engineer', 'Data Visualization Specialist', 'Icon Designer',
  'Logo Designer', 'Packaging Designer', 'Environmental Designer', 'Exhibition Designer', 'Set Designer',
  'Costume Designer', 'Sound Designer', 'Composer', 'Musician', 'Writer',
  'Editor', 'Journalist', 'Blogger', 'Podcaster', 'Influencer'
].sort()

const TOOLS = [
  'Figma', 'Photoshop', 'Illustrator', 'Sketch', 'After Effects', 'Blender',
  'React', 'Vue', 'TypeScript', 'Python', 'Cinema 4D', 'InDesign',
  'Canva', 'Photopea', 'Adobe Express', 'JavaScript', 'NodeJS',
  'Adobe XD', 'InVision', 'Affinity Designer', 'GIMP', 'Inkscape',
  'HTML', 'CSS', 'Sass', 'Bootstrap', 'Tailwind CSS', 'Unity', 'Unreal Engine',
  'Visual Studio Code', 'Adobe Illustrator', 'Adobe Photoshop'
].sort()

const THEMES = [
  { name: 'Blue', primary: '#3B82F6', secondary: '#8B5CF6' },
  { name: 'Purple', primary: '#8B5CF6', secondary: '#EC4899' },
  { name: 'Green', primary: '#10B981', secondary: '#3B82F6' },
  { name: 'Red', primary: '#EF4444', secondary: '#F59E0B' },
  { name: 'Orange', primary: '#F97316', secondary: '#EF4444' }
]

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [roleSearchTerm, setRoleSearchTerm] = useState('')
  const [toolSearchTerm, setToolSearchTerm] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newContact, setNewContact] = useState({ type: 'email', value: '', label: '' })
  
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    slug: '',
    role: '',
    tools: [] as string[],
    headline: '',
    bio: '',
    description: '',
    location: '',
    website: '',
    roles: [] as string[],
    github: '',
    linkedin: '',
    twitter: '',
    avatarUrl: '',
    bannerUrl: '',
    profileImages: [] as string[],
    contactMethods: [] as Array<{ type: string; value: string; label: string }>,
    customization: {
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      positioning: 'center',
      theme: 'blue'
    }
  })

  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      navigate('/auth')
    }
  }, [user, navigate])

  const totalSteps = 9
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim()
  }

  const handleUsernameChange = (value: string) => {
    const sanitized = generateSlug(value)
    setFormData(prev => ({
      ...prev,
      username: sanitized,
      slug: sanitized
    }))
  }

  const handleDisplayNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      displayName: value
    }))
  }

  const handleRoleToggle = (role: string) => {
    setFormData(prev => {
      const currentRoles = prev.roles || []
      const isSelected = currentRoles.includes(role)
      
      let newRoles: string[]
      if (isSelected) {
        newRoles = currentRoles.filter(r => r !== role)
      } else {
        newRoles = [...currentRoles, role]
      }
      
      return {
        ...prev,
        roles: newRoles,
        role: newRoles[0] || '' // Set primary role to first selected
      }
    })
  }


  const handleToolToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool]
    }))
  }

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
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive"
      })
      return
    }
    
    if (formData.profileImages.length >= 5) {
      toast({
        title: "Image limit reached",
        description: "You can only have 5 images during onboarding",
        variant: "destructive"
      })
      return
    }

    setFormData(prev => ({
      ...prev,
      profileImages: [...prev.profileImages, newImage]
    }))
    setNewImage('')
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      profileImages: prev.profileImages.filter((_, i) => i !== index)
    }))
  }

  const handleAddContact = () => {
    if (!newContact.value.trim()) return
    
    setFormData(prev => ({
      ...prev,
      contactMethods: [...prev.contactMethods, { ...newContact }]
    }))
    setNewContact({ type: 'email', value: '', label: '' })
  }

  const handleRemoveContact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contactMethods: prev.contactMethods.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    if (formData.website && !validateUrl(formData.website)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/profiles', formData)
      toast({
        title: "Lit! Your profile's live.",
        description: "Welcome to the Starlit community.",
      })
      navigate(`/profile/${response.data.slug}`)
    } catch (error: any) {
      toast({
        title: "Shoot — that didn't work",
        description: error.response?.data?.error || "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const canContinue = () => {
    switch (step) {
      case 1: return formData.username.trim() && formData.displayName.trim()
      case 2: return (formData.roles && formData.roles.length > 0) || formData.role.trim()
      case 3: return formData.tools.length > 0
      case 4: return formData.headline.trim()
      case 5: return formData.description.trim()
      case 6: return true
      case 7: return true
      case 8: return true
      case 9: return true
      default: return false
    }
  }

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'phone': return <Phone className="h-4 w-4" />
      case 'discord': return <MessageSquare className="h-4 w-4" />
      case 'telegram': return <MessageSquare className="h-4 w-4" />
      default: return <ExternalLink className="h-4 w-4" />
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Who are you?</h2>
              <p className="text-muted-foreground">Let's start with the basics</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username <span className="text-destructive">*</span>
                </label>
                <Input
                  value={formData.username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="yourusername"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Only letters, numbers, and dashes. This cannot be changed later.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Display Name <span className="text-destructive">*</span>
                </label>
                <Input
                  value={formData.displayName}
                  onChange={(e) => handleDisplayNameChange(e.target.value)}
                  placeholder="Your Display Name"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This is how your name will appear on your profile
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your URL Preview</label>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground text-sm">starlit.you/profile/</span>
                  <Input
                    value={formData.slug}
                    disabled
                    className="flex-1 bg-muted"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        const filteredRoles = ROLES.filter(role => 
          role.toLowerCase().includes(roleSearchTerm.toLowerCase())
        )
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">What do you do?</h2>
              <p className="text-muted-foreground">Choose your roles (select multiple)</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Search roles</label>
              <Input
                value={roleSearchTerm}
                onChange={(e) => setRoleSearchTerm(e.target.value)}
                placeholder="Search roles..."
              />
            </div>
            
            {/* Selected Roles Display */}
            {formData.roles && formData.roles.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Selected:</span>
                {formData.roles.map(role => (
                  <Badge 
                    key={role} 
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/20"
                    onClick={() => handleRoleToggle(role)}
                  >
                    {role} ×
                  </Badge>
                ))}
              </div>
            )}
            
            <Scrollwheel maxHeight="350px">
              <div className="grid grid-cols-2 gap-3 p-2">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => {
                    const isSelected = formData.roles?.includes(role) || formData.role === role
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleToggle(role)}
                        className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                          isSelected
                            ? 'border-primary-glow bg-primary/10 shadow-glow-sm'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium">{role}</div>
                      </button>
                    )
                  })
                ) : (
                  <div className="col-span-2 text-center text-muted-foreground py-8">
                    No roles found
                  </div>
                )}
              </div>
            </Scrollwheel>
            
            <p className="text-center text-sm text-muted-foreground">
              {formData.roles?.length || 0} role(s) selected
            </p>
          </div>
        )

      case 3:
        const filteredTools = TOOLS.filter(tool => 
          tool.toLowerCase().includes(toolSearchTerm.toLowerCase())
        )
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Your tools</h2>
              <p className="text-muted-foreground">Select the tools you use</p>
            </div>
            <div>
              <Input
                value={toolSearchTerm}
                onChange={(e) => setToolSearchTerm(e.target.value)}
                placeholder="Search tools..."
              />
            </div>
            <Scrollwheel maxHeight="450px">
              <div className="grid grid-cols-3 gap-3 p-2">
                {filteredTools.map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => handleToolToggle(tool)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      formData.tools.includes(tool)
                        ? 'border-primary-glow bg-primary/10'
                        : 'border-border'
                    }`}
                  >
                    <div className="text-sm font-medium">{tool}</div>
                  </button>
                ))}
              </div>
            </Scrollwheel>
            {formData.tools.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Selected: {formData.tools.length}
                </p>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Your headline</h2>
              <p className="text-muted-foreground">A short, catchy intro</p>
            </div>
            <div>
              <Input
                value={formData.headline}
                onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
                placeholder="e.g., UI/UX Designer crafting beautiful experiences"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.headline.length}/100
              </p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Tell your story</h2>
              <p className="text-muted-foreground">About you</p>
            </div>
            <div className="space-y-4">
              <div>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  maxLength={1000}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.description.length}/1000
                </p>
              </div>
              <div>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Quick summary (optional)"
                  maxLength={500}
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.bio.length}/500
                </p>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Profile Pictures</h2>
              <p className="text-muted-foreground">Add your images</p>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Use <a href="https://imgur.com" target="_blank" className="text-primary">Imgur</a> or <a href="https://imgbb.com" target="_blank" className="text-primary">ImgBB</a>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Avatar URL</label>
                <Input
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
                  placeholder="https://i.imgur.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Banner URL</label>
                <Input
                  value={formData.bannerUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, bannerUrl: e.target.value }))}
                  placeholder="https://i.imgur.com/banner.jpg"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Gallery <Badge variant="secondary">{formData.profileImages.length}/5</Badge></label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Image URL"
                  />
                  <Button type="button" onClick={handleAddImage} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.profileImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {formData.profileImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt="" className="w-full h-24 object-cover rounded" />
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
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Contact Methods</h2>
              <p className="text-muted-foreground">How can people reach you?</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={newContact.type}
                  onChange={(e) => setNewContact(prev => ({ ...prev, type: e.target.value }))}
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
                  onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="Value"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddContact} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.contactMethods.length > 0 && (
                <div className="space-y-2">
                  {formData.contactMethods.map((contact, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getContactIcon(contact.type)}
                        <div>
                          <p className="text-sm capitalize">{contact.type}</p>
                          <p className="text-xs text-muted-foreground">{contact.value}</p>
                        </div>
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
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Customize</h2>
              <p className="text-muted-foreground">Choose your theme</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Theme</label>
                <div className="grid grid-cols-5 gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        customization: {
                          ...prev.customization,
                          theme: theme.name.toLowerCase(),
                          primaryColor: theme.primary,
                          secondaryColor: theme.secondary
                        }
                      }))}
                      className={`p-4 rounded-lg border-2 ${
                        formData.customization.theme === theme.name.toLowerCase()
                          ? 'border-primary-glow'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex space-x-1">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.primary }} />
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.secondary }} />
                        </div>
                        <span className="text-xs">{theme.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Positioning</label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {['left', 'center', 'right'].map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        customization: { ...prev.customization, positioning: pos }
                      }))}
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
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Final touches!</h2>
              <p className="text-muted-foreground">Social links</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Website</label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yoursite.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">GitHub</label>
                <Input
                  value={formData.github || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                  placeholder="username"
                />
              </div>
              <div>
                <label className="text-sm font-medium">LinkedIn</label>
                <Input
                  value={formData.linkedin || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="username"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Twitter/X</label>
                <Input
                  value={formData.twitter || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="username"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-hero pb-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="h-8 w-8 text-primary-glow animate-float" fill="currentColor" />
            <span className="text-2xl font-bold text-gradient">STARLIT</span>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Let's set up your profile</span>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <Progress value={progress} className="w-full max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>

        <Card className="animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="sr-only">Onboarding Step {step}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                type="button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Button
                variant="glow"
                onClick={handleNext}
                disabled={!canContinue() || loading}
                type="button"
              >
                {step === totalSteps ? (loading ? 'Creating...' : 'Complete') : 'Next'}
                {step < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
