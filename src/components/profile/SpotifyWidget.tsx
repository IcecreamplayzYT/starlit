import { ExternalLink, Music } from 'lucide-react'

interface SpotifyWidgetProps {
  username?: string
  accentColor?: string
}

export function SpotifyWidget({ username, accentColor = '#1DB954' }: SpotifyWidgetProps) {
  if (!username) return null

  const spotifyUrl = `https://open.spotify.com/user/${username}`

  return (
    <div className="glass rounded-xl p-4 hover-lift card-interactive">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-black fill-current">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">Spotify</span>
            <span 
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              Music
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">@{username}</p>
        </div>
        
        {/* Follow Button */}
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-1"
          style={{ 
            backgroundColor: accentColor,
            color: 'black',
          }}
        >
          Follow
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export default SpotifyWidget
