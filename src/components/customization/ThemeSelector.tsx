import { cn } from "@/lib/utils"

interface ThemeSelectorProps {
  value: string
  onChange: (value: string) => void
}

const themes = [
  {
    id: "default",
    name: "Default",
    description: "Classic profile layout",
    preview: "gradient-to-br from-accent/20 to-accent/5",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean and minimal",
    preview: "gradient-to-br from-gray-800/50 to-gray-900/50",
  },
  {
    id: "simplistic",
    name: "Simplistic",
    description: "Content-focused design",
    preview: "gradient-to-br from-blue-900/30 to-purple-900/30",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work",
    preview: "gradient-to-br from-emerald-900/30 to-teal-900/30",
  },
]

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onChange(theme.id)}
          className={cn(
            "relative p-4 rounded-xl border-2 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-lg",
            value === theme.id
              ? "border-accent bg-accent/10 shadow-glow-sm"
              : "border-border hover:border-accent/50"
          )}
        >
          {/* Preview */}
          <div
            className={cn(
              "aspect-[4/3] rounded-lg bg-gradient-to-br mb-3",
              theme.preview
            )}
          >
            <div className="p-2">
              <div className="w-4 h-4 rounded-full bg-white/20 mb-2" />
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-white/10 rounded" />
                <div className="h-1.5 w-2/3 bg-white/10 rounded" />
              </div>
            </div>
          </div>
          
          <div className="text-left">
            <p className="text-sm font-medium">{theme.name}</p>
            <p className="text-xs text-muted-foreground">{theme.description}</p>
          </div>
          
          {value === theme.id && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full" />
          )}
        </button>
      ))}
    </div>
  )
}
