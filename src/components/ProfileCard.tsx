import { Link } from 'react-router-dom'
import { MapPin, Heart, Eye, ShieldCheck, Crown } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

interface ProfileCardProps {
  profile: {
    _id: string
    slug: string
    username?: string
    displayName?: string
    name: string
    headline?: string
    role?: string
    avatarUrl?: string
    location?: string
    tools?: string[]
    likes?: number
    views?: number
    isStaff?: boolean
    isPremium?: boolean
    cardImageUrl?: string
  }
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const displayName = profile.displayName || profile.name
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Link to={`/profile/${profile.slug}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
        {/* Premium Custom Card Image */}
        {profile.isPremium && profile.cardImageUrl ? (
          <div className="relative h-32 w-full">
            <img
              src={profile.cardImageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
        ) : null}
        
        <CardContent className={`p-6 text-center space-y-4 ${profile.cardImageUrl ? 'pt-4' : ''}`}>
          {/* Avatar */}
          <div className="relative mx-auto w-16 h-16">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={displayName}
                className="w-full h-full rounded-full object-cover border-2 border-primary-glow/30 group-hover:border-primary-glow transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-glow border-2 border-primary-glow/30 group-hover:border-primary-glow flex items-center justify-center text-primary-foreground font-bold text-lg transition-all duration-300">
                {getInitials(displayName)}
              </div>
            )}
            
            {/* Premium Badge */}
            {profile.isPremium && (
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                <Crown className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {/* Name & Staff Badge */}
          <div>
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                {displayName}
              </h3>
              {profile.isStaff && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Staff
                </Badge>
              )}
            </div>
            
            {profile.username && (
              <p className="text-xs text-muted-foreground">@{profile.username}</p>
            )}
            
            {profile.headline && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {profile.headline}
              </p>
            )}
            
            {profile.role && (
              <Badge variant="outline" className="mt-2">
                {profile.role}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{profile.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{profile.views || 0}</span>
            </div>
          </div>

          {/* Location */}
          {profile.location && (
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {profile.location}
            </div>
          )}

          {/* Tools */}
          {profile.tools && profile.tools.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center">
              {profile.tools.slice(0, 3).map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs">
                  {tool}
                </Badge>
              ))}
              {profile.tools.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{profile.tools.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}