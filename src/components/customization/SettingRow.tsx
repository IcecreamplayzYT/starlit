import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingRowProps {
  label: string
  description?: string
  tooltip?: string
  children: React.ReactNode
  className?: string
  vertical?: boolean
}

export function SettingRow({
  label,
  description,
  tooltip,
  children,
  className,
  vertical = false,
}: SettingRowProps) {
  return (
    <div
      className={cn(
        "py-4 border-b border-border/50 last:border-0",
        vertical ? "flex flex-col gap-3" : "flex items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div>
          <label className="text-sm font-medium text-foreground">{label}</label>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        {tooltip && (
          <div className="group relative">
            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-popover border border-border rounded-lg text-xs max-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-normal">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className={cn(vertical ? "w-full" : "shrink-0")}>{children}</div>
    </div>
  )
}
