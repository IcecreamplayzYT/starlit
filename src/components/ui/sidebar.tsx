import * as React from 'react'
import { cn } from '@/lib/utils'
import { X, Menu, ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  collapsed: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({ children, defaultOpen = false }: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const collapsed = !open

  return (
    <SidebarContext.Provider value={{ open, setOpen, collapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Sidebar({ children, className, ...props }: SidebarProps) {
  const { open, setOpen } = useSidebar()

  return (
    <>
      {/* Mobile overlay - click to close */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-card border-r border-border/50 transition-all duration-300 flex flex-col',
          open ? 'w-64' : 'w-16',
          className
        )}
        {...props}
      >
        <div className={cn('flex flex-col h-full overflow-hidden', !open && 'items-center')}>
          {children}
        </div>
      </aside>

      {/* Spacer to push content */}
      <div className={cn('shrink-0 transition-all duration-300', open ? 'w-64' : 'w-16')} />
    </>
  )
}

export function SidebarHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()
  
  return (
    <div 
      className={cn(
        'flex items-center p-4 border-b border-border/50',
        !open && 'justify-center p-3',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex-1 overflow-y-auto custom-scrollbar p-4', className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-4 border-t border-border/50', className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarTrigger({ className, showArrow = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { showArrow?: boolean }) {
  const { open, setOpen } = useSidebar()

  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn(
        'p-2 rounded-lg hover:bg-accent/10 transition-colors',
        className
      )}
      {...props}
    >
      {showArrow ? (
        open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />
      ) : (
        open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />
      )}
    </button>
  )
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarGroup({ children, className, ...props }: SidebarGroupProps) {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroupLabel({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()
  
  if (!open) return null
  
  return (
    <div 
      className={cn('px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider', className)} 
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarMenu({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn('space-y-1', className)} {...props}>
      {children}
    </ul>
  )
}

export function SidebarMenuItem({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn('', className)} {...props}>
      {children}
    </li>
  )
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  asChild?: boolean
  children: React.ReactNode
}

export function SidebarMenuButton({ 
  children, 
  className, 
  isActive,
  asChild,
  ...props 
}: SidebarMenuButtonProps) {
  const { open } = useSidebar()
  
  const Comp = asChild ? 'div' : 'button'
  
  return (
    <Comp
      className={cn(
        'flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        'hover:bg-accent/10 hover:text-accent',
        isActive && 'bg-accent/15 text-accent',
        !open && 'lg:justify-center lg:px-2',
        className
      )}
      {...(asChild ? {} : props)}
    >
      {children}
    </Comp>
  )
}