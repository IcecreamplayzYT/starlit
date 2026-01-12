import { LucideIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  description?: string
  toggle?: {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
  }
  className?: string
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
  toggle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gradient-blue">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      
      {toggle && (
        <Switch
          checked={toggle.checked}
          onCheckedChange={toggle.onCheckedChange}
        />
      )}
    </div>
  )
}
