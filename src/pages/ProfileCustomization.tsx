import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Save, User, Image, Music, MousePointer,
  Settings, Palette, Square, FileText, Clock,
  LayoutGrid, Sparkles, Eye, MessageSquare, Move,
  Link2, Gamepad2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ColorPicker } from '@/components/ui/color-picker'
import { SelectCustom } from '@/components/ui/select-custom'
import { ManagerCard } from '@/components/customization/ManagerCard'
import { SectionHeader } from '@/components/customization/SectionHeader'
import { SectionCard } from '@/components/customization/SectionCard'
import { SettingRow } from '@/components/customization/SettingRow'
import { ThemeSelector } from '@/components/customization/ThemeSelector'
import { AvatarManagerModal } from '@/components/customization/AvatarManagerModal'
import { BackgroundManagerModal } from '@/components/customization/BackgroundManagerModal'
import { AudioManagerModal } from '@/components/customization/AudioManagerModal'
import { CursorManagerModal } from '@/components/customization/CursorManagerModal'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/api'

interface Profile {
  _id: string
  slug: string
  username: string
  displayName: string
  isPremium: boolean
  customization?: CustomizationState
}

interface CustomizationState {
  // General
  description: string
  location: string
  enterText: string
  avatarRadius: number
  profileOpacity: number
  profileBlur: number
  backgroundEffect: string
  usernameEffect: string
  avatarUrl: string
  bannerUrl: string
  
  // Colors
  accentColor: string
  textColor: string
  secondaryTextColor: string
  backgroundColor: string
  gradientEnabled: boolean
  
  // Border
  borderEnabled: boolean
  borderColor: string
  borderRadius: number
  
  // About Me
  aboutMeEnabled: boolean
  aboutMeText: string
  
  // Time
  showJoinDate: boolean
  timeFormat: string
  displayMode: string
  timeSchema: string
  
  // Other
  volumeControl: boolean
  titleAnimation: string
  forceEnterScreen: boolean
  showViews: boolean
  viewsAnimation: boolean
  viewsAnimationDuration: number
  parallaxEnabled: boolean
  parallaxInverted: boolean
  parallaxIntensity: number
  allowFeedback: boolean
  allowComments: boolean
  commentsPublic: boolean
  
  // Theme
  theme: string
  
  // Media
  backgrounds: Array<{ url: string; position?: string }>
  backgroundShuffle: boolean
  backgroundLoop: boolean
  backgroundDuration: number
  
  audios: Array<{ url: string; name: string }>
  audioShuffle: boolean
  audioPlayer: boolean
  audioVolume: boolean
  audioSticky: boolean
  
  customCursor: string
  customPointerCursor: string
  
  // Integrations
  discordUserId: string
  robloxUserId: string
  steamId: string
  spotifyUsername: string
  twitchUsername: string
  youtubeChannelId: string
  youtubeChannelName: string
}

const defaultCustomization: CustomizationState = {
  description: '',
  location: '',
  enterText: '',
  avatarRadius: 50,
  profileOpacity: 100,
  profileBlur: 0,
  backgroundEffect: 'none',
  usernameEffect: 'none',
  avatarUrl: '',
  bannerUrl: '',
  
  accentColor: '#3B82F6',
  textColor: '#FFFFFF',
  secondaryTextColor: '#A0A0A0',
  backgroundColor: '#030303',
  gradientEnabled: false,
  
  borderEnabled: false,
  borderColor: '#3B82F6',
  borderRadius: 16,
  
  aboutMeEnabled: true,
  aboutMeText: '',
  
  showJoinDate: true,
  timeFormat: '12h',
  displayMode: 'absolute',
  timeSchema: 'MMM DD, YYYY, HH:mm A',
  
  volumeControl: false,
  titleAnimation: 'none',
  forceEnterScreen: false,
  showViews: true,
  viewsAnimation: false,
  viewsAnimationDuration: 1000,
  parallaxEnabled: false,
  parallaxInverted: false,
  parallaxIntensity: 50,
  allowFeedback: false,
  allowComments: false,
  commentsPublic: false,
  
  theme: 'default',
  
  backgrounds: [],
  backgroundShuffle: false,
  backgroundLoop: false,
  backgroundDuration: 5,
  
  audios: [],
  audioShuffle: false,
  audioPlayer: false,
  audioVolume: true,
  audioSticky: false,
  
  customCursor: '',
  customPointerCursor: '',
  
  // Integrations
  discordUserId: '',
  robloxUserId: '',
  steamId: '',
  spotifyUsername: '',
  twitchUsername: '',
  youtubeChannelId: '',
  youtubeChannelName: '',
}

export default function ProfileCustomization() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [customization, setCustomization] = useState<CustomizationState>(defaultCustomization)
  
  // Modal states
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const [backgroundModalOpen, setBackgroundModalOpen] = useState(false)
  const [audioModalOpen, setAudioModalOpen] = useState(false)
  const [cursorModalOpen, setCursorModalOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }
    fetchProfile()
  }, [user, navigate])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profiles/me')
      setProfile(response.data)
      
      // Merge saved customization with defaults
      if (response.data.customization) {
        setCustomization({
          ...defaultCustomization,
          ...response.data.customization,
          avatarUrl: response.data.avatarUrl || '',
          bannerUrl: response.data.bannerUrl || '',
          description: response.data.description || '',
          location: response.data.location || '',
        })
      } else {
        setCustomization({
          ...defaultCustomization,
          avatarUrl: response.data.avatarUrl || '',
          bannerUrl: response.data.bannerUrl || '',
          description: response.data.description || '',
          location: response.data.location || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return
    
    setSaving(true)
    try {
      await api.patch(`/profiles/${profile._id}`, {
        customization,
        avatarUrl: customization.avatarUrl,
        bannerUrl: customization.bannerUrl,
        description: customization.description,
        location: customization.location,
      })
      
      toast({
        title: "Saved!",
        description: "Your customization has been saved"
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to save",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const updateField = <K extends keyof CustomizationState>(
    field: K, 
    value: CustomizationState[K]
  ) => {
    setCustomization(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading customization...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No profile found</p>
          <Button variant="glow" onClick={() => navigate('/onboarding')}>
            Create Profile
          </Button>
        </div>
      </div>
    )
  }

  const isPremium = profile.isPremium

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gradient">Customization</h1>
            {isPremium && (
              <Badge className="premium-badge text-white">Premium</Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Customize your profile appearance and settings
          </p>
        </div>

        {/* Manager Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ManagerCard
            icon={User}
            title="Avatar"
            subtitle="Profile picture"
            onClick={() => setAvatarModalOpen(true)}
          />
          <ManagerCard
            icon={Image}
            title="Backgrounds"
            subtitle={`${customization.backgrounds.length} added`}
            onClick={() => setBackgroundModalOpen(true)}
          />
          <ManagerCard
            icon={Music}
            title="Audio"
            subtitle={`${customization.audios.length} tracks`}
            onClick={() => setAudioModalOpen(true)}
          />
          <ManagerCard
            icon={MousePointer}
            title="Cursor"
            subtitle={isPremium ? "Custom cursor" : "Premium"}
            onClick={() => setCursorModalOpen(true)}
          />
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* General Customization */}
          <SectionCard>
            <SectionHeader icon={Settings} title="General" />
            
            <SettingRow label="Description" vertical>
              <div className="relative">
                <Textarea
                  value={customization.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Tell visitors about yourself..."
                  maxLength={500}
                  rows={3}
                  className="resize-none"
                />
                <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {customization.description.length}/500
                </span>
              </div>
            </SettingRow>
            
            <SettingRow label="Avatar Radius" tooltip="How rounded your avatar should be">
              <Slider
                value={customization.avatarRadius}
                onChange={(v) => updateField('avatarRadius', v)}
                min={0}
                max={100}
                step={1}
                defaultValue={50}
                suffix="%"
              />
            </SettingRow>
            
            <SettingRow label="Profile Opacity">
              <Slider
                value={customization.profileOpacity}
                onChange={(v) => updateField('profileOpacity', v)}
                min={0}
                max={100}
                step={1}
                defaultValue={100}
                suffix="%"
              />
            </SettingRow>
            
            <SettingRow label="Profile Blur">
              <Slider
                value={customization.profileBlur}
                onChange={(v) => updateField('profileBlur', v)}
                min={0}
                max={100}
                step={1}
                defaultValue={0}
                suffix="px"
              />
            </SettingRow>
            
            <SettingRow label="Background Effect">
              <SelectCustom
                value={customization.backgroundEffect}
                onChange={(v) => updateField('backgroundEffect', v)}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'particles', label: 'Particles' },
                  { value: 'snow', label: 'Snow' },
                  { value: 'rain', label: 'Rain' },
                  { value: 'stars', label: 'Stars' },
                ]}
              />
            </SettingRow>
            
            <SettingRow label="Username Effect">
              <SelectCustom
                value={customization.usernameEffect}
                onChange={(v) => updateField('usernameEffect', v)}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'glow', label: 'Glow' },
                  { value: 'rainbow', label: 'Rainbow' },
                  { value: 'typing', label: 'Typing' },
                  { value: 'wave', label: 'Wave' },
                ]}
              />
            </SettingRow>
            
            <SettingRow label="Location">
              <Input
                value={customization.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="City, Country"
                className="max-w-[200px]"
              />
            </SettingRow>
            
            <SettingRow 
              label="Enter Text" 
              description={!isPremium ? "Premium feature" : undefined}
            >
              <Input
                value={customization.enterText}
                onChange={(e) => updateField('enterText', e.target.value)}
                placeholder="Click to enter..."
                className="max-w-[200px]"
                disabled={!isPremium}
              />
            </SettingRow>
          </SectionCard>

          {/* Color Customization */}
          <SectionCard>
            <SectionHeader icon={Palette} title="Colors" />
            
            <SettingRow label="Accent Color">
              <ColorPicker
                value={customization.accentColor}
                onChange={(v) => updateField('accentColor', v)}
                defaultValue="#3B82F6"
              />
            </SettingRow>
            
            <SettingRow label="Text Color">
              <ColorPicker
                value={customization.textColor}
                onChange={(v) => updateField('textColor', v)}
                defaultValue="#FFFFFF"
              />
            </SettingRow>
            
            <SettingRow label="Secondary Text Color">
              <ColorPicker
                value={customization.secondaryTextColor}
                onChange={(v) => updateField('secondaryTextColor', v)}
                defaultValue="#A0A0A0"
              />
            </SettingRow>
            
            <SettingRow label="Background Color">
              <ColorPicker
                value={customization.backgroundColor}
                onChange={(v) => updateField('backgroundColor', v)}
                defaultValue="#030303"
              />
            </SettingRow>
            
            <SettingRow label="Enable Gradient">
              <Switch
                checked={customization.gradientEnabled}
                onCheckedChange={(v) => updateField('gradientEnabled', v)}
              />
            </SettingRow>
          </SectionCard>

          {/* Border Customization */}
          <SectionCard>
            <SectionHeader 
              icon={Square} 
              title="Border"
              toggle={{
                checked: customization.borderEnabled,
                onCheckedChange: (v) => updateField('borderEnabled', v)
              }}
            />
            
            {customization.borderEnabled && (
              <>
                <SettingRow label="Border Color">
                  <ColorPicker
                    value={customization.borderColor}
                    onChange={(v) => updateField('borderColor', v)}
                    defaultValue="#3B82F6"
                  />
                </SettingRow>
                
                <SettingRow label="Border Radius">
                  <Slider
                    value={customization.borderRadius}
                    onChange={(v) => updateField('borderRadius', v)}
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={16}
                    suffix="px"
                  />
                </SettingRow>
              </>
            )}
          </SectionCard>

          {/* About Me */}
          <SectionCard>
            <SectionHeader 
              icon={FileText} 
              title="About Me"
              toggle={{
                checked: customization.aboutMeEnabled,
                onCheckedChange: (v) => updateField('aboutMeEnabled', v)
              }}
            />
            
            {customization.aboutMeEnabled && (
              <SettingRow label="About Me Content" vertical>
                <div className="relative">
                  <Textarea
                    value={customization.aboutMeText}
                    onChange={(e) => updateField('aboutMeText', e.target.value)}
                    placeholder="Write about yourself... Markdown supported"
                    maxLength={1024}
                    rows={6}
                    className="resize-none font-mono text-sm"
                  />
                  <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {customization.aboutMeText.length}/1024
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports Markdown: **bold**, *italic*, [links](url), `code`
                </p>
              </SettingRow>
            )}
          </SectionCard>

          {/* Time Customization */}
          <SectionCard>
            <SectionHeader icon={Clock} title="Time" />
            
            <SettingRow label="Show Join Date">
              <Switch
                checked={customization.showJoinDate}
                onCheckedChange={(v) => updateField('showJoinDate', v)}
              />
            </SettingRow>
            
            <SettingRow label="Time Format">
              <SelectCustom
                value={customization.timeFormat}
                onChange={(v) => updateField('timeFormat', v)}
                options={[
                  { value: '12h', label: '12 Hour' },
                  { value: '24h', label: '24 Hour' },
                ]}
              />
            </SettingRow>
            
            <SettingRow label="Display Mode">
              <SelectCustom
                value={customization.displayMode}
                onChange={(v) => updateField('displayMode', v)}
                options={[
                  { value: 'absolute', label: 'Absolute' },
                  { value: 'relative', label: 'Relative' },
                ]}
              />
            </SettingRow>
          </SectionCard>

          {/* Other Customization */}
          <SectionCard>
            <SectionHeader icon={Sparkles} title="Other" />
            
            <SettingRow label="Volume Control" description="Show audio volume slider">
              <Switch
                checked={customization.volumeControl}
                onCheckedChange={(v) => updateField('volumeControl', v)}
              />
            </SettingRow>
            
            <SettingRow label="Title Animation">
              <SelectCustom
                value={customization.titleAnimation}
                onChange={(v) => updateField('titleAnimation', v)}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'typing', label: 'Typing' },
                  { value: 'fade', label: 'Fade' },
                  { value: 'slide', label: 'Slide' },
                ]}
              />
            </SettingRow>
            
            <SettingRow label="Force Enter Screen" description="Premium only">
              <Switch
                checked={customization.forceEnterScreen}
                onCheckedChange={(v) => updateField('forceEnterScreen', v)}
                disabled={!isPremium}
              />
            </SettingRow>
            
            <SettingRow label="Show Profile Views">
              <Switch
                checked={customization.showViews}
                onCheckedChange={(v) => updateField('showViews', v)}
              />
            </SettingRow>
            
            {customization.showViews && (
              <>
                <SettingRow label="Views Animation">
                  <Switch
                    checked={customization.viewsAnimation}
                    onCheckedChange={(v) => updateField('viewsAnimation', v)}
                  />
                </SettingRow>
                
                {customization.viewsAnimation && (
                  <SettingRow label="Animation Duration">
                    <Slider
                      value={customization.viewsAnimationDuration}
                      onChange={(v) => updateField('viewsAnimationDuration', v)}
                      min={500}
                      max={3000}
                      step={100}
                      defaultValue={1000}
                      suffix="ms"
                    />
                  </SettingRow>
                )}
              </>
            )}
            
            <SettingRow label="Parallax Effect">
              <Switch
                checked={customization.parallaxEnabled}
                onCheckedChange={(v) => updateField('parallaxEnabled', v)}
              />
            </SettingRow>
            
            {customization.parallaxEnabled && (
              <>
                <SettingRow label="Parallax Inverted">
                  <Switch
                    checked={customization.parallaxInverted}
                    onCheckedChange={(v) => updateField('parallaxInverted', v)}
                  />
                </SettingRow>
                
                <SettingRow label="Parallax Intensity">
                  <Slider
                    value={customization.parallaxIntensity}
                    onChange={(v) => updateField('parallaxIntensity', v)}
                    min={10}
                    max={100}
                    defaultValue={50}
                    suffix="%"
                  />
                </SettingRow>
              </>
            )}
            
            <SettingRow label="Allow Feedback">
              <Switch
                checked={customization.allowFeedback}
                onCheckedChange={(v) => updateField('allowFeedback', v)}
              />
            </SettingRow>
            
            <SettingRow label="Allow Comments">
              <Switch
                checked={customization.allowComments}
                onCheckedChange={(v) => updateField('allowComments', v)}
              />
            </SettingRow>
            
            {customization.allowComments && (
              <SettingRow label="Public Comments">
                <Switch
                  checked={customization.commentsPublic}
                  onCheckedChange={(v) => updateField('commentsPublic', v)}
                />
              </SettingRow>
            )}
          </SectionCard>

          {/* Integrations */}
          <SectionCard>
            <SectionHeader icon={Link2} title="Integrations" />
            
            <SettingRow label="Discord User ID" tooltip="Your Discord user ID (right-click profile > Copy ID)">
              <Input
                value={customization.discordUserId}
                onChange={(e) => updateField('discordUserId', e.target.value)}
                placeholder="123456789012345678"
                className="max-w-[220px] font-mono text-sm"
              />
            </SettingRow>
            
            <SettingRow label="Roblox User ID" tooltip="Your Roblox user ID from your profile URL">
              <Input
                value={customization.robloxUserId}
                onChange={(e) => updateField('robloxUserId', e.target.value)}
                placeholder="1234567890"
                className="max-w-[220px] font-mono text-sm"
              />
            </SettingRow>
            
            <SettingRow label="Steam ID" tooltip="Your Steam ID or custom URL name">
              <Input
                value={customization.steamId}
                onChange={(e) => updateField('steamId', e.target.value)}
                placeholder="76561198012345678"
                className="max-w-[220px] font-mono text-sm"
              />
            </SettingRow>
            
            <SettingRow label="Spotify Username">
              <Input
                value={customization.spotifyUsername}
                onChange={(e) => updateField('spotifyUsername', e.target.value)}
                placeholder="yourusername"
                className="max-w-[220px]"
              />
            </SettingRow>
            
            <SettingRow label="Twitch Username">
              <Input
                value={customization.twitchUsername}
                onChange={(e) => updateField('twitchUsername', e.target.value)}
                placeholder="yourusername"
                className="max-w-[220px]"
              />
            </SettingRow>
            
            <SettingRow label="YouTube Channel" tooltip="Channel ID or @username">
              <div className="flex gap-2">
                <Input
                  value={customization.youtubeChannelName}
                  onChange={(e) => updateField('youtubeChannelName', e.target.value)}
                  placeholder="@username"
                  className="max-w-[140px]"
                />
              </div>
            </SettingRow>
          </SectionCard>

          {/* Layout/Theme */}
          <SectionCard>
            <SectionHeader icon={LayoutGrid} title="Layout" />
            
            <SettingRow label="Theme" vertical>
              <ThemeSelector
                value={customization.theme}
                onChange={(v) => updateField('theme', v)}
              />
            </SettingRow>
          </SectionCard>
        </div>

        {/* Fixed Save Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4 z-40">
          <div className="container mx-auto max-w-4xl flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(`/profile/${profile.slug}`)}
            >
              View Profile
            </Button>
            <Button
              variant="glow"
              onClick={handleSave}
              disabled={saving}
              className="min-w-[120px]"
            >
              {saving ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AvatarManagerModal
        isOpen={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        avatarUrl={customization.avatarUrl}
        onSave={(url) => updateField('avatarUrl', url)}
      />
      
      <BackgroundManagerModal
        isOpen={backgroundModalOpen}
        onClose={() => setBackgroundModalOpen(false)}
        backgrounds={customization.backgrounds}
        shuffle={customization.backgroundShuffle}
        loop={customization.backgroundLoop}
        duration={customization.backgroundDuration}
        isPremium={isPremium}
        onSave={(data) => {
          updateField('backgrounds', data.backgrounds)
          updateField('backgroundShuffle', data.shuffle)
          updateField('backgroundLoop', data.loop)
          updateField('backgroundDuration', data.duration)
        }}
      />
      
      <AudioManagerModal
        isOpen={audioModalOpen}
        onClose={() => setAudioModalOpen(false)}
        audios={customization.audios}
        shuffle={customization.audioShuffle}
        showPlayer={customization.audioPlayer}
        showVolume={customization.audioVolume}
        sticky={customization.audioSticky}
        isPremium={isPremium}
        onSave={(data) => {
          updateField('audios', data.audios)
          updateField('audioShuffle', data.shuffle)
          updateField('audioPlayer', data.showPlayer)
          updateField('audioVolume', data.showVolume)
          updateField('audioSticky', data.sticky)
        }}
      />
      
      <CursorManagerModal
        isOpen={cursorModalOpen}
        onClose={() => setCursorModalOpen(false)}
        cursor={customization.customCursor}
        pointerCursor={customization.customPointerCursor}
        isPremium={isPremium}
        onSave={(data) => {
          updateField('customCursor', data.cursor)
          updateField('customPointerCursor', data.pointerCursor)
        }}
      />
    </div>
  )
}
