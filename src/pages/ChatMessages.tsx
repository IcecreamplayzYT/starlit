import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ArrowLeft, MoreVertical, Search, MessageSquare, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

interface Chat {
  _id: string
  participants: any[]
  lastMessage?: {
    content: string
    createdAt: string
    senderId: string
    filtered: boolean
  }
  lastMessageAt: string
  otherProfile?: any
  unreadCount?: number
}

interface Message {
  _id: string
  chatId: string
  senderId: string
  content: string
  filtered: boolean
  read: boolean
  createdAt: string
}

export default function ChatMessages() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }
    fetchChats()
    fetchUnreadCount()
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(() => {
      if (selectedChat) {
        fetchMessages(selectedChat._id)
      }
      fetchUnreadCount()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [user, navigate])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchChats = async () => {
    try {
      setLoading(true)
      const response = await api.get('/chat')
      setChats(response.data)
    } catch (error) {
      console.error('Failed to fetch chats:', error)
      toast({
        title: "Error",
        description: "Failed to load chats",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/chat/unread')
      setUnreadCount(response.data.unreadCount)
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
    }
  }

  const fetchMessages = async (chatId: string, silent = true) => {
    try {
      if (!silent) setLoadingMessages(true)
      const response = await api.get(`/chat/${chatId}/messages`)
      setMessages(response.data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      if (!silent) {
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive"
        })
      }
    } finally {
      if (!silent) setLoadingMessages(false)
    }
  }

  const handleSelectChat = async (chat: Chat) => {
    setSelectedChat(chat)
    await fetchMessages(chat._id, false)
    fetchUnreadCount()
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !selectedChat) return
    
    setSending(true)
    try {
      const response = await api.post(`/chat/${selectedChat._id}/messages`, {
        content: newMessage
      })
      
      setMessages(prev => [...prev, response.data])
      setNewMessage('')
      
      if (response.data.filtered) {
        toast({
          title: "Message filtered",
          description: "Some content was automatically filtered",
          variant: "default"
        })
      }
      
      // Update chat list
      fetchChats()
    } catch (error: any) {
      toast({
        title: "Failed to send",
        description: error.response?.data?.error || "Message could not be sent",
        variant: "destructive"
      })
    } finally {
      setSending(false)
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
      return d.toLocaleDateString()
    }
  }

  const filteredChats = chats.filter(chat => {
    if (!searchQuery) return true
    const otherProfile = chat.otherProfile
    return (
      otherProfile?.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      otherProfile?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Chat List */}
          <Card className="md:col-span-1 flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Messages</h2>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="rounded-full">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">No conversations yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start chatting by visiting profiles and sending a chat request
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredChats.map((chat) => (
                    <button
                      key={chat._id}
                      onClick={() => handleSelectChat(chat)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedChat?._id === chat._id
                          ? 'bg-primary/10 border border-primary/30'
                          : 'hover:bg-accent/10'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          {chat.otherProfile?.avatarUrl ? (
                            <img
                              src={chat.otherProfile.avatarUrl}
                              alt=""
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold">
                              {chat.otherProfile?.displayName?.[0] || '?'}
                            </div>
                          )}
                          {chat.otherProfile?.isPremium && (
                            <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold truncate">
                              {chat.otherProfile?.displayName || 'Unknown User'}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(chat.lastMessageAt)}
                            </span>
                          </div>
                          
                          {chat.lastMessage && (
                            <p className={`text-sm truncate ${
                              chat.unreadCount && chat.unreadCount > 0
                                ? 'text-foreground font-medium'
                                : 'text-muted-foreground'
                            }`}>
                              {chat.lastMessage.filtered && '🚫 '}
                              {chat.lastMessage.senderId === user?.id && 'You: '}
                              {chat.lastMessage.content}
                            </p>
                          )}
                        </div>
                        
                        {chat.unreadCount && chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Messages */}
          <Card className="md:col-span-2 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedChat(null)}
                      className="md:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    
                    {selectedChat.otherProfile?.avatarUrl ? (
                      <img
                        src={selectedChat.otherProfile.avatarUrl}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold">
                        {selectedChat.otherProfile?.displayName?.[0] || '?'}
                      </div>
                    )}
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">
                          {selectedChat.otherProfile?.displayName || 'Unknown User'}
                        </h3>
                        {selectedChat.otherProfile?.isPremium && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        @{selectedChat.otherProfile?.username}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/profile/${selectedChat.otherProfile?.slug}`)}
                    >
                      View Profile
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {loadingMessages ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No messages yet</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Start the conversation!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((message, index) => {
                        const isOwn = message.senderId === user?.id
                        const showDate = index === 0 || 
                          new Date(messages[index - 1].createdAt).toDateString() !== 
                          new Date(message.createdAt).toDateString()

                        return (
                          <div key={message._id}>
                            {showDate && (
                              <div className="flex items-center justify-center my-4">
                                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                                  {new Date(message.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            
                            <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                                <div
                                  className={`rounded-lg p-3 ${
                                    isOwn
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted'
                                  } ${message.filtered ? 'border-2 border-yellow-500' : ''}`}
                                >
                                  {message.filtered && (
                                    <p className="text-xs mb-1 opacity-75">⚠️ Content filtered</p>
                                  )}
                                  <p className="text-sm whitespace-pre-wrap break-words">
                                    {message.content}
                                  </p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 px-1">
                                  {formatTime(message.createdAt)}
                                  {isOwn && message.read && ' · Read'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                  <div className="flex items-end space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                      maxLength={2000}
                      disabled={sending}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!newMessage.trim() || sending}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {newMessage.length}/2000
                  </p>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-8">
                <div>
                  <MessageSquare className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">Select a conversation</p>
                  <p className="text-muted-foreground">
                    Choose a chat from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}