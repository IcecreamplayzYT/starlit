// import { useState, useEffect } from 'react'
// import { Search } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import ProfileCard from '@/components/ProfileCard'
// import { api } from '@/lib/api'

// interface Profile {
//   _id: string
//   slug: string
//   name: string
//   headline?: string
//   role?: string
//   avatarUrl?: string
//   location?: string
//   tools?: string[]
// }

// export default function Discover() {
//   const [profiles, setProfiles] = useState<Profile[]>([])
//   const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchProfiles()
//   }, [])

//   useEffect(() => {
//     filterProfiles()
//   }, [searchQuery, profiles])

//   const fetchProfiles = async () => {
//     try {
//       const response = await api.get('/profiles')
//       setProfiles(response.data)
//       setFilteredProfiles(response.data)
//     } catch (error) {
//       console.error('Failed to fetch profiles:', error)
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
//         profile.name.toLowerCase().includes(query) ||
//         profile.headline?.toLowerCase().includes(query) ||
//         profile.role?.toLowerCase().includes(query) ||
//         profile.tools?.some(tool => tool.toLowerCase().includes(query))
//       )
//     })

//     setFilteredProfiles(filtered)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading profiles...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-24 px-4">
//       <div className="container mx-auto py-8">
//         <div className="text-center mb-12 animate-fade-in">
//           <h1 className="text-4xl font-bold mb-4 text-gradient">Discover Creators</h1>
//           <p className="text-xl text-muted-foreground mb-8">
//             Find talented designers, developers, and artists
//           </p>
          
//           <div className="max-w-md mx-auto relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
//             <Input
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by name, role, or tools..."
//               className="pl-10"
//             />
//           </div>
//         </div>

//         {filteredProfiles.length === 0 ? (
//           <div className="text-center py-12">
//             {profiles.length === 0 ? (
//               <div className="animate-fade-in">
//                 <p className="text-xl text-muted-foreground mb-4">No approved profiles yet</p>
//                 <p className="text-muted-foreground">Check back soon for amazing creators!</p>
//               </div>
//             ) : (
//               <div className="animate-fade-in">
//                 <p className="text-xl text-muted-foreground mb-4">No profiles found</p>
//                 <p className="text-muted-foreground">Try searching with different keywords</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
//             {filteredProfiles.map((profile) => (
//               <ProfileCard key={profile._id} profile={profile} />
//             ))}
//           </div>
//         )}

//         {searchQuery && filteredProfiles.length > 0 && (
//           <div className="text-center mt-8">
//             <p className="text-muted-foreground">
//               Showing {filteredProfiles.length} of {profiles.length} profiles
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// Original Code

import { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, Clock, Heart, Eye, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ProfileCard from '@/components/ProfileCard'
import { api } from '@/lib/api'

interface Profile {
  _id: string
  slug: string
  username: string
  displayName: string
  name: string
  headline?: string
  role?: string
  avatarUrl?: string
  location?: string
  tools?: string[]
  likes: number
  views: number
  weeklyLikes: number
  weeklyViews: number
  isStaff: boolean
  isPremium: boolean
  cardImageUrl?: string
}

const CATEGORIES = [
  { id: 'popular', label: 'Popular', icon: TrendingUp },
  { id: 'up-and-coming', label: 'Up & Coming', icon: Star },
  { id: 'most-viewed-week', label: 'Most Viewed (Week)', icon: Eye },
  { id: 'most-liked-week', label: 'Most Liked (Week)', icon: Heart },
  { id: 'newest', label: 'Newest', icon: Clock },
]

export default function Discover() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('popular')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedTool, setSelectedTool] = useState('')
  const [availableRoles, setAvailableRoles] = useState<string[]>([])
  const [availableTools, setAvailableTools] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchFilters()
  }, [])

  useEffect(() => {
    fetchProfiles()
  }, [category, selectedRole, selectedTool, page])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery !== undefined) {
        setPage(1)
        fetchProfiles()
      }
    }, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery])

  const fetchFilters = async () => {
    try {
      const [rolesRes, toolsRes] = await Promise.all([
        api.get('/discover/roles'),
        api.get('/discover/tools')
      ])
      setAvailableRoles(rolesRes.data)
      setAvailableTools(toolsRes.data)
    } catch (error) {
      console.error('Failed to fetch filters:', error)
    }
  }

  const fetchProfiles = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        category,
        page: page.toString(),
        limit: '20'
      })
      
      if (searchQuery) params.append('search', searchQuery)
      if (selectedRole) params.append('role', selectedRole)
      if (selectedTool) params.append('tool', selectedTool)
      
      const response = await api.get(`/discover?${params}`)
      setProfiles(response.data.profiles)
      setTotalPages(response.data.pagination.pages)
    } catch (error) {
      console.error('Failed to fetch profiles:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedRole('')
    setSelectedTool('')
    setPage(1)
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover</h1>
          <p className="text-muted-foreground">
            Find designers, developers, and artists
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-9"
              />
            </div>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="shrink-0"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="p-4 border border-border rounded-md bg-card space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => { setSelectedRole(e.target.value); setPage(1); }}
                    className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
                  >
                    <option value="">All Roles</option>
                    {availableRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Tool</label>
                  <select
                    value={selectedTool}
                    onChange={(e) => { setSelectedTool(e.target.value); setPage(1); }}
                    className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
                  >
                    <option value="">All Tools</option>
                    {availableTools.map(tool => (
                      <option key={tool} value={tool}>{tool}</option>
                    ))}
                  </select>
                </div>
              </div>
              {(selectedRole || selectedTool || searchQuery) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setPage(1); }}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  category === cat.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5 mr-1.5" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Active Filters */}
        {(selectedRole || selectedTool) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedRole && (
              <span 
                className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-sm cursor-pointer hover:bg-muted/80"
                onClick={() => setSelectedRole('')}
              >
                {selectedRole} ×
              </span>
            )}
            {selectedTool && (
              <span 
                className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-sm cursor-pointer hover:bg-muted/80"
                onClick={() => setSelectedTool('')}
              >
                {selectedTool} ×
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No profiles found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {profiles.map((profile) => (
                <ProfileCard key={profile._id} profile={profile} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}