import { ExternalLink } from 'lucide-react'

interface DiscordWidgetProps {
  serverId?: string
  serverName?: string
  onlineCount?: number
  memberCount?: number
  inviteUrl?: string
  iconUrl?: string
  accentColor?: string
}

export function DiscordWidget({
  serverId,
  serverName = 'Discord Server',
  onlineCount = 0,
  memberCount = 0,
  inviteUrl = 'https://discord.gg/starlit',
  iconUrl,
  accentColor = '#5865F2'
}: DiscordWidgetProps) {
  return (
    <div className="glass rounded-xl p-4 hover-lift card-interactive">
      <div className="flex items-center gap-4">
        {/* Server Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
          style={{ 
            backgroundColor: iconUrl ? 'transparent' : accentColor,
            backgroundImage: iconUrl ? `url(${iconUrl})` : undefined,
            backgroundSize: 'cover',
          }}
        >
          {!iconUrl && serverName.charAt(0)}
        </div>
        
        {/* Server Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold truncate">{serverName}</span>
            <span 
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              Discord
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {onlineCount.toLocaleString()} Online
            </span>
            <span>•</span>
            <span>{memberCount.toLocaleString()} Members</span>
          </div>
        </div>
        
        {/* Join Button */}
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ 
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          Join
        </a>
      </div>
    </div>
  )
}

export default DiscordWidget