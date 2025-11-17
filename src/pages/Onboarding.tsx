// // import { useState, useEffect } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { ArrowLeft, ArrowRight, Star, Sparkles } from 'lucide-react'
// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import { Textarea } from '@/components/ui/textarea'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Progress } from '@/components/ui/progress'
// // import { useAuth } from '@/hooks/useAuth'
// // import { useToast } from '@/hooks/use-toast'
// // import { api } from '@/lib/api'

// // const ROLES = [
// //   'Designer', 'Developer', 'Illustrator', '3D Artist', 'Motion Designer', 'Brand Designer',
// //   'UI Designer', 'UX Designer', 'Graphic Designer', 'Web Designer', 'Product Designer',
// //   'Interaction Designer', 'Visual Designer', 'Typographer', 'Art Director', 'Creative Director',
// //   'Animator', 'Video Editor', 'Photographer', 'Filmmaker', 'Game Designer',
// //   'Game Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer',
// //   'iOS Developer', 'Android Developer', 'Software Engineer', 'Data Visualization Specialist', 'Icon Designer',
// //   'Logo Designer', 'Packaging Designer', 'Environmental Designer', 'Exhibition Designer', 'Set Designer',
// //   'Costume Designer', 'Sound Designer', 'Composer', 'Musician', 'Writer',
// //   'Editor', 'Journalist', 'Blogger', 'Podcaster', 'Influencer'
// // ].sort()

// // const TOOLS = [
// //   'Figma', 'Photoshop', 'Illustrator', 'Sketch', 'After Effects', 'Blender',
// //   'React', 'Vue', 'TypeScript', 'Python', 'Cinema 4D', 'InDesign',
// //   'Canva', 'Photopea', 'Adobe Express', 'JavaScript', 'NodeJS',
// //   'Adobe XD', 'InVision', 'Affinity Designer', 'GIMP', 'Inkscape',
// //   'CorelDRAW', 'Krita', 'Vectr', 'Gravit Designer', 'Lunacy',
// //   'Procreate', 'Clip Studio Paint', 'MediBang Paint', 'FireAlpaca',
// //   'Maya', '3ds Max', 'Houdini', 'ZBrush', 'Substance Painter',
// //   'Rhino', 'Fusion 360', 'Tinkercad', 'SketchUp', 'AutoCAD',
// //   'Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'Adobe Animate', 'Toon Boom',
// //   'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby',
// //   'Ember.js', 'Backbone.js', 'jQuery', 'HTML', 'CSS',
// //   'Sass', 'Less', 'Bootstrap', 'Tailwind CSS', 'Material-UI',
// //   'Ant Design', 'Chakra UI', 'Bulma', 'Foundation', 'Semantic UI',
// //   'Java', 'C++', 'C#', 'Ruby', 'Go',
// //   'Swift', 'Kotlin', 'PHP', 'Scala', 'Rust',
// //   'Dart', 'Flutter', 'Express.js', 'Koa.js', 'NestJS',
// //   'Django', 'Flask', 'Ruby on Rails', 'Laravel', 'Spring Boot',
// //   'ASP.NET', 'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA',
// //   'Eclipse', 'Android Studio', 'Xcode', 'Postman', 'Docker',
// //   'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase',
// //   'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis',
// //   'GraphQL', 'Apollo', 'Prisma', 'TensorFlow', 'PyTorch',
// //   'Scikit-learn', 'Keras', 'Unity', 'Unreal Engine', 'Godot',
// //   'Three.js', 'Babylon.js', 'Webpack', 'Vite', 'Parcel',
// //   'Rollup', 'ESLint', 'Prettier', 'Jest', 'Mocha',
// //   'Cypress', 'Selenium', 'Jenkins', 'Travis CI', 'CircleCI',
// //   'GitLab CI', 'Bitbucket', 'Notion', 'Trello', 'Jira',
// //   'Asana', 'Slack', 'Discord', 'Zoom', 'Microsoft Teams',
// //   'FigJam', 'Miro', 'Adobe Lightroom', 'Capture One', 'Affinity Photo',
// //   'Pixelmator', 'Paint.NET', 'SumoPaint', 'Autodesk Maya', 'Modo',
// //   'Lightwave 3D', 'Sculptris', 'Meshmixer', 'FreeCAD', 'Onshape',
// //   'HitFilm Express', 'Blender Video Editor', 'Synfig Studio', 'Pencil2D', 'OpenToonz',
// //   'Elm', 'ClojureScript', 'Meteor', 'Deno', 'FastAPI',
// //   'SQLAlchemy', 'Symfony', 'CodeIgniter', 'Yii', 'Zend Framework',
// //   'Heroku', 'Netlify', 'Vercel', 'DigitalOcean', 'Linode',
// //   'Oracle DB', 'Cassandra', 'CouchDB', 'Neo4j', 'Elasticsearch',
// //   'SpaCy', 'NLTK', 'Hugging Face', 'OpenCV', 'Pillow',
// //   'CryEngine', 'Lumberyard', 'A-Frame', 'PlayCanvas', 'Phaser',
// //   'Babel', 'Ansible', 'Puppet', 'Chef',
// //   'Prometheus', 'Grafana', 'ELK Stack', 'Splunk', 'New Relic',
// //   'Fivetran', 'Airbyte', 'dbt', 'Snowflake', 'BigQuery',
// //   'Redshift', 'Athena', 'Databricks', 'Spark', 'Hadoop',
// //   'Kafka', 'RabbitMQ', 'ActiveMQ', 'NATS', 'ZeroMQ',
// //   'Terraform', 'Pulumi', 'CloudFormation', 'ARM Templates', ' CDK',
// //   'Serverless Framework', 'SAM', 'Amplify', 'AppSync', 'Cognito',
// //   'Lambda', 'EC2', 'S3', 'RDS', 'DynamoDB',
// //   'EKS', 'ECS', 'Fargate', 'API Gateway', 'SQS',
// //   'SNS', 'Step Functions', 'EventBridge', 'Kinesis', 'Firehose',
// //   'Glue', 'EMR', 'SageMaker', 'Rekognition', 'Comprehend',
// //   'Textract', 'Polly', 'Translate', 'Lex', 'Connect',
// //   'Quarkus', 'Micronaut', 'Vert.x', 'Akka', 'Play Framework',
// //   'Grails', 'Dropwizard', 'Jersey', 'Restlet', 'Spark Java',
// //   'Gin', 'Echo', 'Beego', 'Revel', 'Buffalo',
// //   'Actix', 'Rocket', 'Warp', 'Tide', 'Poem',
// //   'Axum', 'Tokio', 'Hyper', 'Reqwest', 'Serde',
// //   'Nom', 'Pest', 'Lalrpop', 'Rusqlite', 'Diesel',
// //   'Sqlx', 'SeaORM', 'Prisma (Rust)', 'Tauri', 'Druid',
// //   'Iced', 'VGTK', 'Relm', 'GTK-RS', 'Qt for Rust',
// //   'SwiftUI', 'UIKit', 'AppKit', 'Combine', 'RealityKit',
// //   'ARKit', 'SceneKit', 'SpriteKit', 'Metal', 'Core Data',
// //   'Realm', 'Firebase iOS', 'Alamofire', 'Kingfisher', 'SnapKit',
// //   'RxSwift', 'PromiseKit', 'Moya', 'SwiftyJSON', 'Charts',
// //   'Lottie', 'Hero', 'SkeletonView', 'FSCalendar', 'JTAppleCalendar',
// //   'Koloda', 'Eureka', 'XLForm', 'IQKeyboardManager', 'SideMenu'
// // ].sort()

// // export default function Onboarding() {
// //   const [step, setStep] = useState(1)
// //   const [loading, setLoading] = useState(false)
// //   const [roleSearchTerm, setRoleSearchTerm] = useState('')
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     slug: '',
// //     role: '',
// //     tools: [] as string[],
// //     headline: '',
// //     bio: '',
// //     location: '',
// //     website: ''
// //   })

// //   const { user } = useAuth()
// //   const navigate = useNavigate()
// //   const { toast } = useToast()

// //   useEffect(() => {
// //     if (!user) {
// //       navigate('/auth')
// //     }
// //   }, [user, navigate])

// //   const totalSteps = 5
// //   const progress = (step / totalSteps) * 100

// //   const handleNext = () => {
// //     if (step < totalSteps) {
// //       setStep(step + 1)
// //     } else {
// //       handleSubmit()
// //     }
// //   }

// //   const handleBack = () => {
// //     if (step > 1) {
// //       setStep(step - 1)
// //     }
// //   }

// //   const generateSlug = (name: string) => {
// //     return name
// //       .toLowerCase()
// //       .replace(/[^a-z0-9\s-]/g, '')
// //       .replace(/\s+/g, '-')
// //       .replace(/-+/g, '-')
// //       .trim()
// //   }

// //   const handleNameChange = (value: string) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       name: value,
// //       slug: generateSlug(value)
// //     }))
// //   }

// //   const handleToolToggle = (tool: string) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       tools: prev.tools.includes(tool)
// //         ? prev.tools.filter(t => t !== tool)
// //         : [...prev.tools, tool]
// //     }))
// //   }

// //   const handleSubmit = async () => {
// //     setLoading(true)
// //     try {
// //       const response = await api.post('/profiles', formData)
// //       toast({
// //         title: "Lit! Your profile's live.",
// //         description: "Welcome to the Starlit community.",
// //       })
// //       navigate(`/profile/${response.data.slug}`)
// //     } catch (error: any) {
// //       toast({
// //         title: "Shoot — that didn't work",
// //         description: error.response?.data?.error || "Something went wrong. Please try again.",
// //         variant: "destructive"
// //       })
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const canContinue = () => {
// //     switch (step) {
// //       case 1: return formData.name.trim() && formData.slug.trim()
// //       case 2: return formData.role.trim()
// //       case 3: return formData.tools.length > 0
// //       case 4: return formData.headline.trim()
// //       case 5: return true
// //       default: return false
// //     }
// //   }

// //   const renderStep = () => {
// //     switch (step) {
// //       case 1:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center">
// //               <h2 className="text-2xl font-semibold mb-2">Who are you?</h2>
// //               <p className="text-muted-foreground">Let's start with the basics</p>
// //             </div>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium mb-2">Username</label>
// //                 <Input
// //                   value={formData.name}
// //                   onChange={(e) => handleNameChange(e.target.value)}
// //                   placeholder="Enter your username"
// //                   autoFocus
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium mb-2">Your URL</label>
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-muted-foreground">starlit.you/</span>
// //                   <Input
// //                     value={formData.slug}
// //                     onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
// //                     placeholder="your-name"
// //                     className="flex-1"
// //                   />
// //                 </div>
// //                 <p className="text-xs text-muted-foreground mt-1">
// //                   Only letters, numbers, and dashes allowed
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )

// //       case 2:
// //         const filteredRoles = ROLES.filter(role => role.toLowerCase().includes(roleSearchTerm.toLowerCase()))
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center">
// //               <h2 className="text-2xl font-semibold mb-2">What do you do?</h2>
// //               <p className="text-muted-foreground">Choose your primary role</p>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Search roles</label>
// //               <Input
// //                 value={roleSearchTerm}
// //                 onChange={(e) => setRoleSearchTerm(e.target.value)}
// //                 placeholder="Search roles..."
// //               />
// //             </div>
// //             <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
// //               {filteredRoles.map((role) => (
// //                 <button
// //                   key={role}
// //                   onClick={() => setFormData(prev => ({ ...prev, role }))}
// //                   className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
// //                     formData.role === role
// //                       ? 'border-primary-glow bg-primary/10 shadow-glow-sm'
// //                       : 'border-border hover:border-primary/50'
// //                   }`}
// //                 >
// //                   <div className="font-medium">{role}</div>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )

// //       case 3:
// //         const filteredTools = TOOLS.filter(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()))
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center">
// //               <h2 className="text-2xl font-semibold mb-2">Your tools</h2>
// //               <p className="text-muted-foreground">Select the tools you use (choose multiple)</p>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Search tools</label>
// //               <Input
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 placeholder="Search tools..."
// //               />
// //             </div>
// //             <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
// //               {filteredTools.map((tool) => (
// //                 <button
// //                   key={tool}
// //                   onClick={() => handleToolToggle(tool)}
// //                   className={`p-3 rounded-lg border-2 text-center transition-all duration-300 hover:scale-105 ${
// //                     formData.tools.includes(tool)
// //                       ? 'border-primary-glow bg-primary/10 shadow-glow-sm'
// //                       : 'border-border hover:border-primary/50'
// //                   }`}
// //                 >
// //                   <div className="text-sm font-medium">{tool}</div>
// //                 </button>
// //               ))}
// //             </div>
// //             <p className="text-center text-sm text-muted-foreground">
// //               Selected: {formData.tools.length} tools
// //             </p>
// //           </div>
// //         )

// //       case 4:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center">
// //               <h2 className="text-2xl font-semibold mb-2">Tell your story</h2>
// //               <p className="text-muted-foreground">Help others understand what you do</p>
// //             </div>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium mb-2">Headline</label>
// //                 <Input
// //                   value={formData.headline}
// //                   onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
// //                   placeholder="e.g., UI/UX Designer crafting beautiful experiences"
// //                   maxLength={100}
// //                 />
// //                 <p className="text-xs text-muted-foreground mt-1">
// //                   {formData.headline.length}/100 characters
// //                 </p>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium mb-2">Bio (Optional)</label>
// //                 <Textarea
// //                   value={formData.bio}
// //                   onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
// //                   placeholder="Tell us about yourself, your experience, and what you're passionate about..."
// //                   maxLength={500}
// //                   rows={4}
// //                 />
// //                 <p className="text-xs text-muted-foreground mt-1">
// //                   {formData.bio.length}/500 characters
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )

// //       case 5:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center">
// //               <h2 className="text-2xl font-semibold mb-2">Almost done!</h2>
// //               <p className="text-muted-foreground">Just a few more details</p>
// //             </div>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium mb-2">Location (Optional)</label>
// //                 <Input
// //                   value={formData.location}
// //                   onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
// //                   placeholder="e.g., San Francisco, CA"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium mb-2">Website (Optional)</label>
// //                 <Input
// //                   value={formData.website}
// //                   onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
// //                   placeholder="https://yourwebsite.com"
// //                   type="url"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         )

// //       default:
// //         return null
// //     }
// //   }

// //   if (!user) return null

// //   return (
// //     <div className="min-h-screen pt-24 px-4 bg-gradient-hero">
// //       <div className="max-w-2xl mx-auto">
// //         <div className="text-center mb-8 animate-fade-in">
// //           <div className="flex items-center justify-center space-x-2 mb-4">
// //             <Star className="h-8 w-8 text-primary-glow animate-float" fill="currentColor" />
// //             <span className="text-2xl font-bold text-gradient">STARLIT</span>
// //           </div>
// //           <div className="flex items-center justify-center space-x-2 mb-6">
// //             <Sparkles className="h-4 w-4 text-accent" />
// //             <span className="text-muted-foreground">Let's set up your profile</span>
// //             <Sparkles className="h-4 w-4 text-accent" />
// //           </div>
// //           <Progress value={progress} className="w-full max-w-md mx-auto" />
// //           <p className="text-sm text-muted-foreground mt-2">
// //             Step {step} of {totalSteps}
// //           </p>
// //         </div>

// //         <Card className="animate-scale-in">
// //           <CardHeader className="text-center">
// //             <CardTitle className="sr-only">Onboarding Step {step}</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             {renderStep()}
            
// //             <div className="flex justify-between pt-8">
// //               <Button
// //                 variant="outline"
// //                 onClick={handleBack}
// //                 disabled={step === 1}
// //               >
// //                 <ArrowLeft className="h-4 w-4 mr-2" />
// //                 Back
// //               </Button>
              
// //               <Button
// //                 variant="glow"
// //                 onClick={handleNext}
// //                 disabled={!canContinue() || loading}
// //               >
// //                 {step === totalSteps ? (loading ? 'Creating...' : 'Complete') : 'Next'}
// //                 {step < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }

// // Onboarding.tsx

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Star, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Scrollwheel } from '@/components/ui/scrollwheel'
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
  'CorelDRAW', 'Krita', 'Vectr', 'Gravit Designer', 'Lunacy',
  'Procreate', 'Clip Studio Paint', 'MediBang Paint', 'FireAlpaca',
  'Maya', '3ds Max', 'Houdini', 'ZBrush', 'Substance Painter',
  'Rhino', 'Fusion 360', 'Tinkercad', 'SketchUp', 'AutoCAD',
  'Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'Adobe Animate', 'Toon Boom',
  'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby',
  'Ember.js', 'Backbone.js', 'jQuery', 'HTML', 'CSS',
  'Sass', 'Less', 'Bootstrap', 'Tailwind CSS', 'Material-UI',
  'Ant Design', 'Chakra UI', 'Bulma', 'Foundation', 'Semantic UI',
  'Java', 'C++', 'C#', 'Ruby', 'Go',
  'Swift', 'Kotlin', 'PHP', 'Scala', 'Rust',
  'Dart', 'Flutter', 'Express.js', 'Koa.js', 'NestJS',
  'Django', 'Flask', 'Ruby on Rails', 'Laravel', 'Spring Boot',
  'ASP.NET', 'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA',
  'Eclipse', 'Android Studio', 'Xcode', 'Postman', 'Docker',
  'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase',
  'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis',
  'GraphQL', 'Apollo', 'Prisma', 'TensorFlow', 'PyTorch',
  'Scikit-learn', 'Keras', 'Unity', 'Unreal Engine', 'Godot',
  'Three.js', 'Babylon.js', 'Webpack', 'Vite', 'Parcel',
  'Rollup', 'ESLint', 'Prettier', 'Jest', 'Mocha',
  'Cypress', 'Selenium', 'Jenkins', 'Travis CI', 'CircleCI',
  'GitLab CI', 'Bitbucket', 'Notion', 'Trello', 'Jira',
  'Asana', 'Slack', 'Discord', 'Zoom', 'Microsoft Teams',
  'FigJam', 'Miro', 'Adobe Lightroom', 'Capture One', 'Affinity Photo',
  'Pixelmator', 'Paint.NET', 'SumoPaint', 'Autodesk Maya', 'Modo',
  'Lightwave 3D', 'Sculptris', 'Meshmixer', 'FreeCAD', 'Onshape',
  'HitFilm Express', 'Blender Video Editor', 'Synfig Studio', 'Pencil2D', 'OpenToonz',
  'Elm', 'ClojureScript', 'Meteor', 'Deno', 'FastAPI',
  'SQLAlchemy', 'Symfony', 'CodeIgniter', 'Yii', 'Zend Framework',
  'Heroku', 'Netlify', 'Vercel', 'DigitalOcean', 'Linode',
  'Oracle DB', 'Cassandra', 'CouchDB', 'Neo4j', 'Elasticsearch',
  'SpaCy', 'NLTK', 'Hugging Face', 'OpenCV', 'Pillow',
  'CryEngine', 'Lumberyard', 'A-Frame', 'PlayCanvas', 'Phaser',
  'Babel', 'Terraform', 'Ansible', 'Puppet', 'Chef',
  'Prometheus', 'Grafana', 'ELK Stack', 'Splunk', 'New Relic',
  'Fivetran', 'Airbyte', 'dbt', 'Snowflake', 'BigQuery',
  'Redshift', 'Athena', 'Databricks', 'Spark', 'Hadoop',
  'Kafka', 'RabbitMQ', 'ActiveMQ', 'NATS', 'ZeroMQ',
  'Pulumi', 'CloudFormation', 'ARM Templates', 'CDK',
  'Serverless Framework', 'SAM', 'Amplify', 'AppSync', 'Cognito',
  'Lambda', 'EC2', 'S3', 'RDS', 'DynamoDB',
  'EKS', 'ECS', 'Fargate', 'API Gateway', 'SQS',
  'SNS', 'Step Functions', 'EventBridge', 'Kinesis', 'Firehose',
  'Glue', 'EMR', 'SageMaker', 'Rekognition', 'Comprehend',
  'Textract', 'Polly', 'Translate', 'Lex', 'Connect',
  'Quarkus', 'Micronaut', 'Vert.x', 'Akka', 'Play Framework',
  'Grails', 'Dropwizard', 'Jersey', 'Restlet', 'Spark Java',
  'Gin', 'Echo', 'Beego', 'Revel', 'Buffalo',
  'Actix', 'Rocket', 'Warp', 'Tide', 'Poem',
  'Axum', 'Tokio', 'Hyper', 'Reqwest', 'Serde',
  'Nom', 'Pest', 'Lalrpop', 'Rusqlite', 'Diesel',
  'Sqlx', 'SeaORM', 'Prisma (Rust)', 'Tauri', 'Druid',
  'Iced', 'VGTK', 'Relm', 'GTK-RS', 'Qt for Rust',
  'SwiftUI', 'UIKit', 'AppKit', 'Combine', 'RealityKit',
  'ARKit', 'SceneKit', 'SpriteKit', 'Metal', 'Core Data',
  'Realm', 'Firebase iOS', 'Alamofire', 'Kingfisher', 'SnapKit',
  'RxSwift', 'PromiseKit', 'Moya', 'SwiftyJSON', 'Charts',
  'Lottie', 'Hero', 'SkeletonView', 'FSCalendar', 'JTAppleCalendar',
  'Koloda', 'Eureka', 'XLForm', 'IQKeyboardManager', 'SideMenu'
].sort()

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [roleSearchTerm, setRoleSearchTerm] = useState('')
  const [toolSearchTerm, setToolSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    role: '',
    tools: [] as string[],
    headline: '',
    bio: '',
    location: '',
    website: ''
  })

  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      navigate('/auth')
    }
  }, [user, navigate])

  const totalSteps = 5
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

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: generateSlug(value)
    }))
  }

  const handleSlugChange = (value: string) => {
    const sanitizedSlug = generateSlug(value)
    setFormData(prev => ({
      ...prev,
      slug: sanitizedSlug
    }))
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

  const handleSubmit = async () => {
    if (formData.website && !validateUrl(formData.website)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL (e.g., https://example.com)",
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
      case 1: return formData.name.trim() && formData.slug.trim()
      case 2: return formData.role.trim()
      case 3: return formData.tools.length > 0
      case 4: return formData.headline.trim()
      case 5: return true
      default: return false
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
                <label className="block text-sm font-medium mb-2">Username</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter your username"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your URL</label>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground text-sm">starlit.you/</span>
                  <Input
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="your-name"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Only letters, numbers, and dashes allowed
                </p>
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
              <p className="text-muted-foreground">Choose your primary role</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Search roles</label>
              <Input
                value={roleSearchTerm}
                onChange={(e) => setRoleSearchTerm(e.target.value)}
                placeholder="Search roles..."
              />
            </div>
            <Scrollwheel maxHeight="450px">
              <div className="grid grid-cols-2 gap-3 p-2">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setFormData(prev => ({ ...prev, role }))}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                        formData.role === role
                          ? 'border-primary-glow bg-primary/10 shadow-glow-sm'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">{role}</div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-muted-foreground py-8">
                    No roles found matching "{roleSearchTerm}"
                  </div>
                )}
              </div>
            </Scrollwheel>
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
              <p className="text-muted-foreground">Select the tools you use (choose multiple)</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Search tools</label>
              <Input
                value={toolSearchTerm}
                onChange={(e) => setToolSearchTerm(e.target.value)}
                placeholder="Search tools..."
              />
            </div>
            <Scrollwheel maxHeight="450px">
              <div className="grid grid-cols-3 gap-3 p-2">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => handleToolToggle(tool)}
                      className={`p-3 rounded-lg border-2 text-center transition-all duration-300 hover:scale-105 ${
                        formData.tools.includes(tool)
                          ? 'border-primary-glow bg-primary/10 shadow-glow-sm'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium">{tool}</div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-muted-foreground py-8">
                    No tools found matching "{toolSearchTerm}"
                  </div>
                )}
              </div>
            </Scrollwheel>
            {formData.tools.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Selected: {formData.tools.length} tool{formData.tools.length !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, tools: [] }))}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Tell your story</h2>
              <p className="text-muted-foreground">Help others understand what you do</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Headline <span className="text-destructive">*</span>
                </label>
                <Input
                  value={formData.headline}
                  onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
                  placeholder="e.g., UI/UX Designer crafting beautiful experiences"
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.headline.length}/100 characters
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio (Optional)</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                  maxLength={500}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Almost done!</h2>
              <p className="text-muted-foreground">Just a few more details</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location (Optional)</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website (Optional)</label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yourwebsite.com"
                  type="url"
                />
                {formData.website && !validateUrl(formData.website) && (
                  <p className="text-xs text-destructive mt-1">
                    Please enter a valid URL starting with http:// or https://
                  </p>
                )}
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
    <div className="min-h-screen pt-24 px-4 bg-gradient-hero">
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
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Button
                variant="glow"
                onClick={handleNext}
                disabled={!canContinue() || loading}
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
