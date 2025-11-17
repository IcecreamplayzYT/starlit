import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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

interface Profile {
  _id: string
  slug: string
  name: string
  headline?: string
  bio?: string
  avatarUrl?: string
  location?: string
  role?: string
  tools?: string[]
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  approved: boolean
  projects?: Project[]
}

export default function Profile() {
  const { slug } = useParams<{ slug: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchProfile()
    }
  }, [slug])

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/profiles/slug/${slug}`)
      setProfile(response.data)
      
      // Track profile view
      api.post('/analytics', {
        profileId: response.data._id,
        eventType: 'profile_view'
      }).catch(() => {}) // Silent fail
    } catch (error: any) {
      if (error.response?.status === 404) {
        setNotFound(true)
      }
    } finally {
      setLoading(false)
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

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardContent className="p-6 text-center space-y-6">
                <div className="relative mx-auto w-24 h-24">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover border-2 border-primary-glow shadow-glow"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-glow border-2 border-primary-glow shadow-glow flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {getInitials(profile.name)}
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-accent mb-2">{profile.name}</h1>
                  {profile.headline && (
                    <p className="text-muted-foreground">{profile.headline}</p>
                  )}
                  {profile.role && (
                    <Badge variant="outline" className="mt-2">{profile.role}</Badge>
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
          <div className="lg:col-span-2 space-y-8">
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

            {/* About Section */}
            {profile.bio && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {profile.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Projects Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                
                {profile.projects && profile.projects.length > 0 ? (
                  <div className="space-y-6">
                    {profile.projects.map((project) => (
                      <div key={project._id} className="border-l-2 border-primary/30 pl-4 space-y-3">
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
