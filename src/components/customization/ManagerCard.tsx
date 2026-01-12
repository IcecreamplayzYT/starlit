import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ManagerCardProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  onClick: () => void
  className?: string
}

export function ManagerCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
  className,
}: ManagerCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center p-6 rounded-xl",
        "border-2 border-dashed border-border hover:border-accent/50",
        "bg-card/50 hover:bg-card transition-all duration-300",
        "min-h-[120px]",
        className
      )}
    >
      <div className="p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors mb-3">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <span className="text-sm font-medium text-foreground">{title}</span>
      {subtitle && (
        <span className="text-xs text-muted-foreground mt-1">{subtitle}</span>
      )}
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent" />
      </div>
    </button>
  )
}
