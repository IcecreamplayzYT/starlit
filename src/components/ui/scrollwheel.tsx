import * as React from 'react'
import { cn } from '@/lib/utils'

interface ScrollwheelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxHeight?: string
  showScrollbar?: boolean
}

const Scrollwheel = React.forwardRef<HTMLDivElement, ScrollwheelProps>(
  ({ className, children, maxHeight = '400px', showScrollbar = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-y-auto overflow-x-hidden rounded-lg',
          showScrollbar
            ? 'scrollbar-thin scrollbar-track-background scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50 scrollbar-thumb-rounded-full'
            : 'scrollbar-hide',
          className
        )}
        style={{ maxHeight }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Scrollwheel.displayName = 'Scrollwheel'

export { Scrollwheel }