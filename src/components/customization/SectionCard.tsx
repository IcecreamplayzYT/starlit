import { cn } from "@/lib/utils"

interface SectionCardProps {
  children: React.ReactNode
  className?: string
}

export function SectionCard({ children, className }: SectionCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-card border border-border",
        className
      )}
    >
      {children}
    </div>
  )
}
