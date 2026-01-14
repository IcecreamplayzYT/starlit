import { ExternalLink, Video } from 'lucide-react'

interface TwitchWidgetProps {
  username?: string
  accentColor?: string
}

export function TwitchWidget({ username, accentColor = '#9146FF' }: TwitchWidgetProps) {
  if (!username) return null

  const twitchUrl = `https://twitch.tv/${username}`

  return (
    <div className="glass rounded-xl p-4 hover-lift card-interactive">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
          </svg>
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">Twitch</span>
            <span 
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              Streaming
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">@{username}</p>
        </div>
        
        {/* Follow Button */}
        <a
          href={twitchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-1"
          style={{ 
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          Follow
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export default TwitchWidget
