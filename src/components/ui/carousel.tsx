import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface CarouselProps {
  children: React.ReactNode
  className?: string
  autoPlay?: boolean
  interval?: number
}

interface CarouselContextValue {
  currentIndex: number
  setCurrentIndex: (index: number) => void
  itemCount: number
  setItemCount: (count: number) => void
}

const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel')
  }
  return context
}

export function Carousel({ children, className, autoPlay = false, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [itemCount, setItemCount] = React.useState(0)

  React.useEffect(() => {
    if (!autoPlay || itemCount === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, itemCount])

  return (
    <CarouselContext.Provider value={{ currentIndex, setCurrentIndex, itemCount, setItemCount }}>
      <div className={cn('relative group', className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

export function CarouselContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { currentIndex, setItemCount } = useCarousel()
  const childArray = React.Children.toArray(children)

  React.useEffect(() => {
    setItemCount(childArray.length)
  }, [childArray.length, setItemCount])

  return (
    <div className={cn('overflow-hidden rounded-xl', className)}>
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {childArray.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>
}

export function CarouselPrevious({ className }: { className?: string }) {
  const { currentIndex, setCurrentIndex, itemCount } = useCarousel()

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? itemCount - 1 : currentIndex - 1)
  }

  if (itemCount <= 1) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity',
        'h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-border',
        className
      )}
      onClick={handlePrev}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}

export function CarouselNext({ className }: { className?: string }) {
  const { currentIndex, setCurrentIndex, itemCount } = useCarousel()

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % itemCount)
  }

  if (itemCount <= 1) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity',
        'h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-border',
        className
      )}
      onClick={handleNext}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  )
}

export function CarouselDots({ className }: { className?: string }) {
  const { currentIndex, setCurrentIndex, itemCount } = useCarousel()

  if (itemCount <= 1) return null

  return (
    <div className={cn('flex justify-center gap-2 mt-4', className)}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <button
          key={index}
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            currentIndex === index
              ? 'w-6 bg-accent'
              : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
          )}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  )
}