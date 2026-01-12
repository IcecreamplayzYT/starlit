import { useState } from "react"
import { X, Upload, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AvatarManagerModalProps {
  isOpen: boolean
  onClose: () => void
  avatarUrl: string
  onSave: (url: string) => void
}

export function AvatarManagerModal({
  isOpen,
  onClose,
  avatarUrl,
  onSave,
}: AvatarManagerModalProps) {
  const [url, setUrl] = useState(avatarUrl)

  if (!isOpen) return null

  const handleSave = () => {
    onSave(url)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Avatar Manager</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-accent/30">
              {url ? (
                <img src={url} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
          
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://imgur.com/..."
                  className="pl-10"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Use <a href="https://imgur.com" target="_blank" className="text-accent hover:underline">Imgur</a> or <a href="https://imgbb.com" target="_blank" className="text-accent hover:underline">ImgBB</a> to host your images
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="glow" onClick={handleSave} className="flex-1">
            Save Avatar
          </Button>
        </div>
      </div>
    </div>
  )
}
