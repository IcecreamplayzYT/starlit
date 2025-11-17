import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, CheckCircle, Clock, Eye, Check, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

interface Profile {
  _id: string
  slug: string
  name: string
  headline?: string
  role?: string
  approved: boolean
  createdAt: string
  userId: {
    email: string
  }
}

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

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

  const handleApprove = async (profileId: string) => {
    setActionLoading(profileId)
    try {
      await api.put(`/admin/profiles/${profileId}/approve`)
      setProfiles(prev => prev.map(p => 
        p._id === profileId ? { ...p, approved: true } : p
      ))
      toast({
        title: "Profile approved",
        description: "The profile is now visible in Discover"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve profile",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (profileId: string) => {
    if (!confirm('Are you sure you want to reject and delete this profile? This action cannot be undone.')) {
      return
    }

    setActionLoading(profileId)
    try {
      await api.delete(`/admin/profiles/${profileId}/reject`)
      setProfiles(prev => prev.filter(p => p._id !== profileId))
      toast({
        title: "Profile rejected",
        description: "The profile has been deleted"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject profile",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
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
  const approvedProfiles = profiles.filter(p => p.approved).length
  const pendingProfiles = profiles.filter(p => !p.approved).length
  const approvedProfilesList = profiles.filter(p => p.approved)
  const pendingProfilesList = profiles.filter(p => !p.approved)

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Manage profiles and review submissions
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
              <div className="text-2xl font-bold text-green-500">{approvedProfiles}</div>
            </CardContent>
          </Card>

          <Card className="border-secondary-glow/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-secondary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-glow">{pendingProfiles}</div>
            </CardContent>
          </Card>
        </div>

        {/* Review Queue */}
        {pendingProfilesList.length > 0 && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-secondary-glow" />
                <span>Review Queue</span>
                <Badge variant="secondary">{pendingProfilesList.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingProfilesList.map((profile) => (
                  <div key={profile._id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground">{profile.headline || 'No headline'}</p>
                          <p className="text-xs text-muted-foreground">
                            starlit.you/{profile.slug} • {profile.userId.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={`/profile/${profile.slug}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                      <Button
                        variant="glow"
                        size="sm"
                        onClick={() => handleApprove(profile._id)}
                        disabled={actionLoading === profile._id}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(profile._id)}
                        disabled={actionLoading === profile._id}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Approved Profiles */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Approved Profiles</span>
              <Badge variant="secondary">{approvedProfilesList.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {approvedProfilesList.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {approvedProfilesList.map((profile) => (
                  <div key={profile._id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{profile.headline || 'No headline'}</p>
                      <p className="text-xs text-muted-foreground">
                        starlit.you/{profile.slug}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={`/profile/${profile.slug}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No approved profiles yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}