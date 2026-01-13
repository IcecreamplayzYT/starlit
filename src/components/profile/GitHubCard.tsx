import { Github, Star, GitFork, ExternalLink } from 'lucide-react'

interface GitHubCardProps {
  username?: string
  avatarUrl?: string
  displayName?: string
  followers?: number
  repos?: number
  accentColor?: string
}

export function GitHubCard({
  username = 'username',
  avatarUrl,
  displayName,
  followers = 0,
  repos = 0,
  accentColor = '#3B82F6'
}: GitHubCardProps) {
  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-xl p-4 hover-lift card-interactive block"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={username}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Github className="h-6 w-6" style={{ color: accentColor }} />
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold truncate">{displayName || username}</span>
            <Github className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{followers} followers</span>
            <span>•</span>
            <span>{repos} repos</span>
          </div>
        </div>
        
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
      </div>
    </a>
  )
}

export default GitHubCard