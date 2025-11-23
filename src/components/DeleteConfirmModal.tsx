import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  profileName: string
  loading?: boolean
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  profileName,
  loading
}: DeleteConfirmModalProps) {
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    if (reason.trim().length < 10) {
      setError('Reason must be at least 10 characters')
      return
    }
    setError('')
    onConfirm(reason)
  }

  const handleClose = () => {
    setReason('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border-2 border-destructive/50 rounded-xl p-6 max-w-md w-full mx-4 animate-scale-in shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2">
          Delete Profile
        </h2>
        
        <p className="text-center text-muted-foreground mb-4">
          You are about to permanently delete <span className="font-semibold text-foreground">{profileName}</span>'s profile. This action cannot be undone.
        </p>

        {/* Reason Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Reason for deletion <span className="text-destructive">*</span>
          </label>
          <Textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value)
              if (e.target.value.length >= 10) setError('')
            }}
            placeholder="Please provide a detailed reason for this deletion (min. 10 characters)..."
            rows={4}
            className={error ? 'border-destructive' : ''}
          />
          {error && (
            <p className="text-sm text-destructive mt-1">{error}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            {reason.length}/10 minimum characters
          </p>
        </div>

        {/* Warning Text */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4">
          <p className="text-sm text-destructive">
            <strong>Warning:</strong> This will permanently delete:
          </p>
          <ul className="text-sm text-destructive/80 mt-2 space-y-1 list-disc list-inside">
            <li>The user's profile and all data</li>
            <li>All chat conversations</li>
            <li>All analytics and statistics</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            className="flex-1"
            disabled={loading || reason.trim().length < 10}
          >
            {loading ? 'Deleting...' : 'Delete Profile'}
          </Button>
        </div>
      </div>
    </div>
  )
}