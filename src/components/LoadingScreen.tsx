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
      <div className="mb-8 animate-pulse">
        <img 
          src="/star.png" 
          alt="Starlit" 
          className="h-16 w-16 object-contain drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)]"
        />
      </div>
      
      {/* 3-dot loader */}
      <div className="flex items-center space-x-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              activeDot === index
                ? 'bg-accent scale-125 shadow-[0_0_12px_hsl(var(--accent))]'
                : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      
      {/* Optional message */}
      {message && (
        <p className="mt-6 text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

export default LoadingScreen