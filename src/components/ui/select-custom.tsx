import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectOption {
  value: string
  label: string
}

interface SelectCustomProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function SelectCustom({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
  disabled = false,
}: SelectCustomProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full appearance-none px-4 py-2.5 pr-10 bg-muted border border-border rounded-lg text-sm",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "cursor-pointer"
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  )
}
