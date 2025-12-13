import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Clock, MessageSquare, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

interface ChatRequest {
  _id: string
  senderId: any
  receiverId: any
  status: 'pending' | 'accepted' | 'denied'
  createdAt: string
  senderProfile?: any
}

export default function ChatRequests() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [requests, setRequests] = useState<ChatRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }
    fetchRequests()
  }, [user, navigate])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const response = await api.get('/chat/requests')
      setRequests(response.data)
    } catch (error) {
      console.error('Failed to fetch requests:', error)
      toast({
        title: "Error",
        description: "Failed to load chat requests",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (requestId: string) => {
    setActionLoading(requestId)
    try {
      await api.post(`/chat/request/${requestId}/accept`)
      toast({
        title: "Request accepted",
        description: "You can now chat with this user"
      })
      fetchRequests()
      // Navigate to messages
      setTimeout(() => navigate('/messages'), 1000)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to accept request",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeny = async (requestId: string) => {
    setActionLoading(requestId)
    try {
      await api.post(`/chat/request/${requestId}/deny`)
      toast({
        title: "Request denied",
        description: "Chat request has been declined"
      })
      fetchRequests()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to deny request",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const formatTime = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return minutes < 1 ? 'Just now' : `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Chat Requests</h1>
          <p className="text-muted-foreground">Manage your pending chat requests</p>
        </div>

        {requests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold mb-2">No pending requests</p>
              <p className="text-muted-foreground text-center mb-6">
                You don't have any chat requests at the moment
              </p>
              <Button variant="glow" onClick={() => navigate('/discover')}>
                Discover Creators
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="relative">
                        {request.senderProfile?.avatarUrl ? (
                          <img
                            src={request.senderProfile.avatarUrl}
                            alt=""
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold text-xl">
                            {request.senderProfile?.displayName?.[0] || '?'}
                          </div>
                        )}
                        {request.senderProfile?.isPremium && (
                          <Crown className="absolute -top-1 -right-1 h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold">
                            {request.senderProfile?.displayName || 'Unknown User'}
                          </h3>
                          {request.senderProfile?.isVerified && (
                            <Badge variant="outline" className="text-xs">
                              Verified
                            </Badge>
                          )}
                          {request.senderProfile?.isStaff && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                              Staff
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          @{request.senderProfile?.username}
                        </p>
                        
                        {request.senderProfile?.headline && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {request.senderProfile.headline}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(request.createdAt)}</span>
                          </div>
                          
                          {request.senderProfile?.role && (
                            <Badge variant="secondary" className="text-xs">
                              {request.senderProfile.role}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/profile/${request.senderProfile?.slug}`)}
                      >
                        View Profile
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeny(request._id)}
                        disabled={actionLoading === request._id}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="glow"
                        size="sm"
                        onClick={() => handleAccept(request._id)}
                        disabled={actionLoading === request._id}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}