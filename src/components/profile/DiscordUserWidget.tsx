import { useState, useEffect } from 'react'
import { ExternalLink, Users, Calendar, MessageCircle } from 'lucide-react'

interface DiscordUser {
  id: string
  username: string
  avatar: string | null
  discriminator: string
  banner_color: string | null
  accent_color: number | null
}

interface DiscordUserWidgetProps {
  userId?: string
  accentColor?: string
}

export function DiscordUserWidget({ userId, accentColor = '#5865F2' }: DiscordUserWidgetProps) {
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    // Discord doesn't have a public API for user info without a bot
    // We'll display the user ID and a link to add them
    setUser({
      id: userId,
      username: `User ${userId.slice(-4)}`,
      avatar: null,
      discriminator: '0',
      banner_color: null,
      accent_color: null
    })
    setLoading(false)
  }, [userId])

  if (!userId) return null
  if (loading) {
    return (
      <div className="glass rounded-xl p-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-3 bg-muted rounded w-16" />
          </div>
        </div>
      </div>
    )
  }

  const avatarUrl = user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.png?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(userId) % 5}.png`

  return (
    <div className="glass rounded-xl p-4 hover-lift card-interactive">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={avatarUrl}
            alt="Discord Avatar"
            className="w-14 h-14 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://cdn.discordapp.com/embed/avatars/0.png`
            }}
          />
          <div 
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
        </div>
        
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold truncate">Discord</span>
            <span 
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              User
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-mono truncate">
            {userId}
          </p>
        </div>
        
        {/* Add Friend Button */}
        <a
          href={`https://discord.com/users/${userId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
          style={{ 
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          Add
        </a>
      </div>
    </div>
  )
}

export default DiscordUserWidget
