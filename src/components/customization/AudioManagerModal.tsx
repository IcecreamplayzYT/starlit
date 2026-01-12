import { useState, useRef } from "react"
import { X, Plus, Trash2, Music, Play, Pause, Upload, Loader2, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"

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
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const maxAudios = isPremium ? 5 : 3

  if (!isOpen) return null

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (audios.length >= maxAudios) {
      alert(`Maximum ${maxAudios} audio tracks allowed`)
      return
    }

    const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/x-m4a']
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
      alert('Please select an audio file (MP3, WAV, OGG, M4A)')
      return
    }

    if (file.size > 15 * 1024 * 1024) {
      alert('File size must be less than 15MB')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', newName || file.name.replace(/\.[^/.]+$/, ''))

      const response = await api.post('/uploads/audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setAudios([...audios, { url: response.data.url, name: response.data.name }])
      setNewName("")
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(error.response?.data?.error || 'Upload failed')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleAddUrl = () => {
    if (!newUrl.trim()) return
    if (audios.length >= maxAudios) return
    
    setAudios([...audios, { url: newUrl, name: newName || `Track ${audios.length + 1}` }])
    setNewUrl("")
    setNewName("")
  }

  const handleRemove = async (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
    
    try {
      await api.delete(`/uploads/audio/${index}`)
      setAudios(audios.filter((_, i) => i !== index))
    } catch (error) {
      console.error('Delete error:', error)
      setAudios(audios.filter((_, i) => i !== index))
    }
  }

  const handlePlay = (index: number) => {
    if (playingIndex === index) {
      audioRef.current?.pause()
      setPlayingIndex(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      audioRef.current = new Audio(audios[index].url)
      audioRef.current.play()
      audioRef.current.onended = () => setPlayingIndex(null)
      setPlayingIndex(index)
    }
  }

  const handleSave = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
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
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.m4a"
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

          {/* Track name input */}
          <div>
            <label className="block text-sm font-medium mb-2">Track Name (optional)</label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="My awesome track"
              disabled={audios.length >= maxAudios}
            />
          </div>

          {/* Add new audio */}
          {uploadMode === 'file' ? (
            <div>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || audios.length >= maxAudios}
                className="w-full h-20 border-dashed border-2"
              >
                {isUploading ? (
                  <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-6 w-6 mr-2" />
                )}
                {isUploading ? 'Uploading...' : 'Click to upload audio'}
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Max file size: 15MB. Supported: MP3, WAV, OGG, M4A
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">Audio URL</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/track.mp3"
                    className="pl-10"
                    disabled={audios.length >= maxAudios}
                  />
                </div>
                <Button 
                  onClick={handleAddUrl} 
                  disabled={audios.length >= maxAudios}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {!isPremium && audios.length >= 3 && (
            <p className="text-xs text-accent">
              ⭐ Upgrade to Premium for up to 5 audio tracks
            </p>
          )}
          
          {/* Audio list */}
          {audios.length > 0 ? (
            <div className="space-y-2">
              {audios.map((audio, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border"
                >
                  <button
                    onClick={() => handlePlay(index)}
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
