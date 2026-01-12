import { useState } from "react"
import { X, Plus, Trash2, Music, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface Audio {
  url: string
  name: string
}

interface AudioManagerModalProps {
  isOpen: boolean
  onClose: () => void
  audios: Audio[]
  shuffle: boolean
  showPlayer: boolean
  showVolume: boolean
  sticky: boolean
  isPremium: boolean
  onSave: (data: {
    audios: Audio[]
    shuffle: boolean
    showPlayer: boolean
    showVolume: boolean
    sticky: boolean
  }) => void
}

export function AudioManagerModal({
  isOpen,
  onClose,
  audios: initialAudios,
  shuffle: initialShuffle,
  showPlayer: initialShowPlayer,
  showVolume: initialShowVolume,
  sticky: initialSticky,
  isPremium,
  onSave,
}: AudioManagerModalProps) {
  const [audios, setAudios] = useState<Audio[]>(initialAudios)
  const [shuffle, setShuffle] = useState(initialShuffle)
  const [showPlayer, setShowPlayer] = useState(initialShowPlayer)
  const [showVolume, setShowVolume] = useState(initialShowVolume)
  const [sticky, setSticky] = useState(initialSticky)
  const [newUrl, setNewUrl] = useState("")
  const [newName, setNewName] = useState("")
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const maxAudios = isPremium ? 5 : 3

  if (!isOpen) return null

  const handleAdd = () => {
    if (!newUrl.trim()) return
    if (audios.length >= maxAudios) return
    
    setAudios([...audios, { url: newUrl, name: newName || `Track ${audios.length + 1}` }])
    setNewUrl("")
    setNewName("")
  }

  const handleRemove = (index: number) => {
    setAudios(audios.filter((_, i) => i !== index))
    if (playingIndex === index) setPlayingIndex(null)
  }

  const handleSave = () => {
    onSave({ audios, shuffle, showPlayer, showVolume, sticky })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">Audio Manager</h3>
            <Badge variant="secondary">
              {audios.length}/{maxAudios}
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
          {/* Add new audio */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Add Audio</label>
            <div className="flex gap-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Track name"
                className="w-1/3"
                disabled={audios.length >= maxAudios}
              />
              <Input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Audio URL (.mp3)"
                className="flex-1"
                disabled={audios.length >= maxAudios}
              />
              <Button 
                onClick={handleAdd} 
                disabled={audios.length >= maxAudios}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {!isPremium && audios.length >= 3 && (
              <p className="text-xs text-accent">
                ⭐ Upgrade to Premium for up to 5 audio tracks
              </p>
            )}
          </div>
          
          {/* Audio list */}
          {audios.length > 0 ? (
            <div className="space-y-2">
              {audios.map((audio, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border"
                >
                  <button
                    onClick={() => setPlayingIndex(playingIndex === index ? null : index)}
                    className="p-2 bg-accent/20 rounded-lg hover:bg-accent/30 transition-colors"
                  >
                    {playingIndex === index ? (
                      <Pause className="h-4 w-4 text-accent" />
                    ) : (
                      <Play className="h-4 w-4 text-accent" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{audio.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{audio.url}</p>
                  </div>
                  
                  <button
                    onClick={() => handleRemove(index)}
                    className="p-2 hover:bg-destructive/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Music className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">No audio tracks added yet</p>
            </div>
          )}
          
          {/* Settings */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Shuffle</label>
              <Switch checked={shuffle} onCheckedChange={setShuffle} />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Player</label>
              <Switch checked={showPlayer} onCheckedChange={setShowPlayer} />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Volume Control</label>
              <Switch checked={showVolume} onCheckedChange={setShowVolume} />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Sticky Player</label>
              <Switch checked={sticky} onCheckedChange={setSticky} />
            </div>
          </div>
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
