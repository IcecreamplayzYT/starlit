import { ExternalLink, Play } from 'lucide-react'

interface YouTubeWidgetProps {
  channelId?: string
  channelName?: string
  accentColor?: string
}

export function YouTubeWidget({ channelId, channelName, accentColor = '#FF0000' }: YouTubeWidgetProps) {
  if (!channelId && !channelName) return null

  const youtubeUrl = channelId 
    ? `https://youtube.com/channel/${channelId}`
    : `https://youtube.com/@${channelName}`

  return (
    <div className="glass rounded-xl p-4 hover-lift card-interactive">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">YouTube</span>
            <span 
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              Video
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {channelName ? `@${channelName}` : channelId}
          </p>
        </div>
        
        {/* Subscribe Button */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-1"
          style={{ 
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          Subscribe
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export default YouTubeWidget
