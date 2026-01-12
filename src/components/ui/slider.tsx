import * as React from "react"
import { cn } from "@/lib/utils"
import { RotateCcw } from "lucide-react"

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  showReset?: boolean
  showValue?: boolean
  suffix?: string
  className?: string
  disabled?: boolean
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  showReset = true,
  showValue = true,
  suffix = "",
  className,
  disabled = false,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  const handleReset = () => {
    if (defaultValue !== undefined) {
      onChange(defaultValue)
    }
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-1 h-2">
        <div className="absolute inset-0 bg-muted rounded-full" />
        <div
          className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-lg border-2 border-background pointer-events-none transition-all"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      
      {showValue && (
        <span className="text-sm text-muted-foreground min-w-[3rem] text-right">
          {value}{suffix}
        </span>
      )}
      
      {showReset && defaultValue !== undefined && value !== defaultValue && (
        <button
          type="button"
          onClick={handleReset}
          className="p-1 hover:bg-muted rounded transition-colors"
          title="Reset to default"
        >
          <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}
