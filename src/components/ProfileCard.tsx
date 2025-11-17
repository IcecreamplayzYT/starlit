import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

interface ProfileCardProps {
  profile: {
    _id: string
    slug: string
    name: string
    headline?: string
    role?: string
    avatarUrl?: string
    location?: string
    tools?: string[]
  }
}

export default function ProfileCard({ profile }: ProfileCardProps) {
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
      <Card className="p-6 h-full transition-all duration-300 hover:scale-105 cursor-pointer">
        <CardContent className="p-0 text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover border-2 border-primary-glow/30 group-hover:border-primary-glow transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-glow border-2 border-primary-glow/30 group-hover:border-primary-glow flex items-center justify-center text-primary-foreground font-bold text-lg transition-all duration-300">
                {getInitials(profile.name)}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
              {profile.name}
            </h3>
            {profile.headline && (
              <p className="text-sm text-muted-foreground mt-1">
                {profile.headline}
              </p>
            )}
            {profile.role && (
              <Badge variant="outline" className="mt-2">
                {profile.role}
              </Badge>
            )}
          </div>

          {profile.location && (
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {profile.location}
            </div>
          )}

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