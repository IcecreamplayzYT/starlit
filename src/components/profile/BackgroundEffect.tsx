import { useState, useEffect } from 'react'

interface BackgroundEffectProps {
  effect: 'none' | 'particles' | 'snow' | 'rain' | 'stars'
  color?: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function BackgroundEffect({ effect, color = '#3B82F6' }: BackgroundEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (effect === 'none') {
      setParticles([])
      return
    }

    const count = effect === 'stars' ? 100 : effect === 'particles' ? 50 : 80
    const newParticles: Particle[] = []

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: effect === 'stars' ? Math.random() * 3 + 1 : Math.random() * 4 + 2,
        speed: effect === 'rain' ? Math.random() * 3 + 2 : Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    setParticles(newParticles)
  }, [effect])

  if (effect === 'none' || particles.length === 0) return null

  const getAnimationStyle = (particle: Particle) => {
    switch (effect) {
      case 'snow':
        return {
          animation: `snowfall ${10 / particle.speed}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }
      case 'rain':
        return {
          animation: `rainfall ${3 / particle.speed}s linear infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }
      case 'stars':
        return {
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }
      case 'particles':
        return {
          animation: `float ${8 / particle.speed}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 4}s`,
        }
      default:
        return {}
    }
  }

  return (
    <>
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        @keyframes rainfall {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(110vh); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: effect === 'snow' || effect === 'rain' ? '-10px' : `${particle.y}%`,
              width: effect === 'rain' ? '2px' : `${particle.size}px`,
              height: effect === 'rain' ? `${particle.size * 4}px` : `${particle.size}px`,
              backgroundColor: effect === 'stars' ? '#ffffff' : color,
              opacity: particle.opacity,
              ...getAnimationStyle(particle),
            }}
          />
        ))}
      </div>
    </>
  )
}

export default BackgroundEffect