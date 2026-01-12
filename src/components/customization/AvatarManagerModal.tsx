import { useState, useRef } from "react"
import { X, Upload, Link2, Loader2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"

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
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post('/uploads/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setUrl(response.data.url)
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(error.response?.data?.error || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

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
            <div 
              className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-accent/30 cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {url ? (
                <>
                  <img src={url} alt="Avatar preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                  ) : (
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setUploadMode('file')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                uploadMode === 'file' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => setUploadMode('url')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                uploadMode === 'url' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Use URL
            </button>
          </div>

          {uploadMode === 'file' ? (
            <div>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full h-20 border-dashed border-2"
              >
                {isUploading ? (
                  <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-6 w-6 mr-2" />
                )}
                {isUploading ? 'Uploading...' : 'Click to upload image'}
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Max file size: 5MB. Supported: JPG, PNG, WebP
              </p>
            </div>
          ) : (
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
          )}
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
