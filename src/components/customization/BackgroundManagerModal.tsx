import { useState } from "react"
import { X, Plus, Trash2, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Background {
  url: string
  position?: string
}

interface BackgroundManagerModalProps {
  isOpen: boolean
  onClose: () => void
  backgrounds: Background[]
  shuffle: boolean
  loop: boolean
  duration: number
  isPremium: boolean
  onSave: (data: {
    backgrounds: Background[]
    shuffle: boolean
    loop: boolean
    duration: number
  }) => void
}

export function BackgroundManagerModal({
  isOpen,
  onClose,
  backgrounds: initialBackgrounds,
  shuffle: initialShuffle,
  loop: initialLoop,
  duration: initialDuration,
  isPremium,
  onSave,
}: BackgroundManagerModalProps) {
  const [backgrounds, setBackgrounds] = useState<Background[]>(initialBackgrounds)
  const [shuffle, setShuffle] = useState(initialShuffle)
  const [loop, setLoop] = useState(initialLoop)
  const [duration, setDuration] = useState(initialDuration)
  const [newUrl, setNewUrl] = useState("")

  const maxBackgrounds = isPremium ? 5 : 1

  if (!isOpen) return null

  const handleAdd = () => {
    if (!newUrl.trim()) return
    if (backgrounds.length >= maxBackgrounds) return
    
    setBackgrounds([...backgrounds, { url: newUrl, position: "center" }])
    setNewUrl("")
  }

  const handleRemove = (index: number) => {
    setBackgrounds(backgrounds.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave({ backgrounds, shuffle, loop, duration })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">Background Manager</h3>
            <Badge variant="secondary">
              {backgrounds.length}/{maxBackgrounds}
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Add new background */}
          <div>
            <label className="block text-sm font-medium mb-2">Add Background</label>
            <div className="flex gap-2">
              <Input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://imgur.com/..."
                disabled={backgrounds.length >= maxBackgrounds}
              />
              <Button 
                onClick={handleAdd} 
                disabled={backgrounds.length >= maxBackgrounds}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {!isPremium && backgrounds.length >= 1 && (
              <p className="text-xs text-accent mt-2">
                ⭐ Upgrade to Premium for up to 5 backgrounds
              </p>
            )}
          </div>
          
          {/* Background grid */}
          {backgrounds.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {backgrounds.map((bg, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden border border-border group"
                >
                  <img
                    src={bg.url}
                    alt={`Background ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(index)}
                    className="absolute top-2 right-2 p-2 bg-destructive rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Image className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">No backgrounds added yet</p>
            </div>
          )}
          
          {/* Settings */}
          {backgrounds.length > 1 && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Shuffle</label>
                <Switch checked={shuffle} onCheckedChange={setShuffle} />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Loop</label>
                <Switch checked={loop} onCheckedChange={setLoop} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">Duration (seconds)</label>
                <Slider
                  value={duration}
                  onChange={setDuration}
                  min={3}
                  max={30}
                  defaultValue={5}
                  suffix="s"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="glow" onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
