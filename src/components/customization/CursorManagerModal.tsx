import { useState } from "react"
import { X, MousePointer, Hand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface CursorManagerModalProps {
  isOpen: boolean
  onClose: () => void
  cursor: string
  pointerCursor: string
  isPremium: boolean
  onSave: (data: { cursor: string; pointerCursor: string }) => void
}

export function CursorManagerModal({
  isOpen,
  onClose,
  cursor: initialCursor,
  pointerCursor: initialPointerCursor,
  isPremium,
  onSave,
}: CursorManagerModalProps) {
  const [cursor, setCursor] = useState(initialCursor)
  const [pointerCursor, setPointerCursor] = useState(initialPointerCursor)

  if (!isOpen) return null

  const handleSave = () => {
    onSave({ cursor, pointerCursor })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">Cursor Manager</h3>
            {!isPremium && (
              <Badge variant="secondary">Premium</Badge>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {!isPremium ? (
            <div className="text-center py-8">
              <MousePointer className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">
                Custom cursors are a Premium feature
              </p>
              <Button variant="glow">Upgrade to Premium</Button>
            </div>
          ) : (
            <>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <MousePointer className="h-4 w-4 text-accent" />
                  Default Cursor URL
                </label>
                <Input
                  value={cursor}
                  onChange={(e) => setCursor(e.target.value)}
                  placeholder="https://... (32x32 .cur or .png)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The default cursor shown on your profile
                </p>
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Hand className="h-4 w-4 text-accent" />
                  Pointer Cursor URL
                </label>
                <Input
                  value={pointerCursor}
                  onChange={(e) => setPointerCursor(e.target.value)}
                  placeholder="https://... (32x32 .cur or .png)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Shown when hovering over clickable elements
                </p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Tip:</strong> Use .cur or .png files, 32x32 pixels recommended.
                  You can find free cursors at{" "}
                  <a href="https://www.cursors-4u.com" target="_blank" className="text-accent hover:underline">
                    cursors-4u.com
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
        
        <div className="flex gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          {isPremium && (
            <Button variant="glow" onClick={handleSave} className="flex-1">
              Save Cursors
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
