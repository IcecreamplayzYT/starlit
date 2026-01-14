import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = 'Loading' }: LoadingScreenProps) {
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % 3)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      
      {/* Logo */}
      <div className="relative mb-10">
        <div className="absolute inset-0 blur-2xl bg-accent/30 rounded-full scale-150" />
        <img 
          src="/star.png" 
          alt="Starlit" 
          className="relative h-20 w-20 object-contain animate-pulse"
          style={{
            filter: 'drop-shadow(0 0 20px hsl(217 91% 60% / 0.5))'
          }}
        />
      </div>
      
      {/* 3-dot loader */}
      <div className="flex items-center space-x-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="transition-all duration-300 ease-out"
            style={{
              width: activeDot === index ? '14px' : '10px',
              height: activeDot === index ? '14px' : '10px',
              borderRadius: '50%',
              backgroundColor: activeDot === index 
                ? 'hsl(217 91% 60%)' 
                : 'hsl(215 20% 35%)',
              boxShadow: activeDot === index 
                ? '0 0 20px hsl(217 91% 60%), 0 0 40px hsl(217 91% 60% / 0.5)' 
                : 'none',
              transform: activeDot === index ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>
      
      {/* Optional message */}
      {message && (
        <p className="mt-8 text-sm text-muted-foreground">
          Starlit- Lighting Your Way
        </p>
      )}
    </div>
  )
}

export default LoadingScreen