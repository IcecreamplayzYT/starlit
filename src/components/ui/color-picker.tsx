import * as React from "react"
import { cn } from "@/lib/utils"
import { Copy, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  defaultValue?: string
  showReset?: boolean
  className?: string
}

export function ColorPicker({
  value,
  onChange,
  defaultValue,
  showReset = true,
  className,
}: ColorPickerProps) {
  const { toast } = useToast()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    toast({
      title: "Copied!",
      description: `${value} copied to clipboard`,
    })
  }

  const handleReset = () => {
    if (defaultValue) {
      onChange(defaultValue)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="w-10 h-10 rounded-lg border-2 border-border cursor-pointer overflow-hidden relative"
        onClick={() => inputRef.current?.click()}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: value }}
        />
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      
      <input
        type="text"
        value={value.toUpperCase()}
        onChange={(e) => {
          const hex = e.target.value
          if (/^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
            onChange(hex)
          }
        }}
        className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm font-mono uppercase"
        placeholder="#000000"
      />
      
      <button
        type="button"
        onClick={handleCopy}
        className="p-2 hover:bg-muted rounded-lg transition-colors"
        title="Copy color"
      >
        <Copy className="h-4 w-4 text-muted-foreground" />
      </button>
      
      {showReset && defaultValue && value !== defaultValue && (
        <button
          type="button"
          onClick={handleReset}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          title="Reset to default"
        >
          <RotateCcw className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}
