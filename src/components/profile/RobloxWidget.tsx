import { useState, useEffect } from 'react'
import { Users, Calendar, ExternalLink, Gamepad2 } from 'lucide-react'

interface RobloxUser {
  id: number
  name: string
  displayName: string
  description: string
  created: string
  isBanned: boolean
  hasVerifiedBadge: boolean
}

interface RobloxUserPresence {
  userPresenceType: number
  lastLocation: string
  placeId: number | null
  rootPlaceId: number | null
  gameId: string | null
  universeId: number | null
  userId: number
  lastOnline: string
}

interface RobloxWidgetProps {
  userId?: string
  accentColor?: string
}

export function RobloxWidget({ userId, accentColor = '#00A2FF' }: RobloxWidgetProps) {
  const [user, setUser] = useState<RobloxUser | null>(null)
  const [avatar, setAvatar] = useState<string>('')
  const [friendCount, setFriendCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchRobloxData = async () => {
      try {
        // Fetch user info
        const userRes = await fetch(`https://users.roblox.com/v1/users/${userId}`)
        if (!userRes.ok) throw new Error('User not found')
        const userData = await userRes.json()
        setUser(userData)

        // Fetch avatar
        const avatarRes = await fetch(
          `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
        )
        const avatarData = await avatarRes.json()
        if (avatarData.data?.[0]?.imageUrl) {
          setAvatar(avatarData.data[0].imageUrl)
        }

        // Fetch friend count
        const friendsRes = await fetch(`https://friends.roblox.com/v1/users/${userId}/friends/count`)
        const friendsData = await friendsRes.json()
        setFriendCount(friendsData.count || 0)

      } catch (err) {
        console.error('Failed to fetch Roblox data:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchRobloxData()
  }, [userId])

  if (!userId) return null

  if (loading) {
    return (
      <div className="glass rounded-xl p-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-3 bg-muted rounded w-32" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Gamepad2 className="w-6 h-6" style={{ color: accentColor }} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Roblox user not found</p>
          </div>
        </div>
      </div>
    )
  }

  const joinDate = new Date(user.created)
  const formattedJoinDate = joinDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="glass rounded-xl p-4 hover-lift card-interactive">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          {avatar ? (
            <img
              src={avatar}
              alt={user.displayName}
              className="w-14 h-14 rounded-xl object-cover"
            />
          ) : (
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: accentColor }}
            >
              {user.displayName.charAt(0)}
            </div>
          )}
          <div 
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <Gamepad2 className="w-3 h-3 text-white" />
          </div>
        </div>
        
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold truncate">{user.displayName}</span>
            {user.hasVerifiedBadge && (
              <span className="text-xs">✓</span>
            )}
            <span 
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              Roblox
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {friendCount.toLocaleString()} friends
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedJoinDate}
            </span>
          </div>
          {user.name !== user.displayName && (
            <p className="text-xs text-muted-foreground mt-0.5">@{user.name}</p>
          )}
        </div>
        
        {/* View Profile Button */}
        <a
          href={`https://www.roblox.com/users/${userId}/profile`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-1"
          style={{ 
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          View
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export default RobloxWidget
