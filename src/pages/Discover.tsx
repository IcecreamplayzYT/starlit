import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import ProfileCard from '@/components/ProfileCard'
import { api } from '@/lib/api'

interface Profile {
  _id: string
  slug: string
  name: string
  headline?: string
  role?: string
  avatarUrl?: string
  location?: string
  tools?: string[]
}

export default function Discover() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfiles()
  }, [])

  useEffect(() => {
    filterProfiles()
  }, [searchQuery, profiles])

  const fetchProfiles = async () => {
    try {
      const response = await api.get('/profiles')
      setProfiles(response.data)
      setFilteredProfiles(response.data)
    } catch (error) {
      console.error('Failed to fetch profiles:', error)
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
        profile.name.toLowerCase().includes(query) ||
        profile.headline?.toLowerCase().includes(query) ||
        profile.role?.toLowerCase().includes(query) ||
        profile.tools?.some(tool => tool.toLowerCase().includes(query))
      )
    })

    setFilteredProfiles(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profiles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Discover Creators</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find talented designers, developers, and artists
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, or tools..."
              className="pl-10"
            />
          </div>
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            {profiles.length === 0 ? (
              <div className="animate-fade-in">
                <p className="text-xl text-muted-foreground mb-4">No approved profiles yet</p>
                <p className="text-muted-foreground">Check back soon for amazing creators!</p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <p className="text-xl text-muted-foreground mb-4">No profiles found</p>
                <p className="text-muted-foreground">Try searching with different keywords</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
        )}

        {searchQuery && filteredProfiles.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Showing {filteredProfiles.length} of {profiles.length} profiles
            </p>
          </div>
        )}
      </div>
    </div>
  )
}