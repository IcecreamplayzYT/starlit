import { useState, useEffect } from 'react'
import { ExternalLink, Gamepad2, Clock } from 'lucide-react'

interface SteamWidgetProps {
  steamId?: string
  accentColor?: string
}

export function SteamWidget({ steamId, accentColor = '#1b2838' }: SteamWidgetProps) {
  if (!steamId) return null

  // Steam requires API key for user data, so we'll show a link card
  const steamUrl = steamId.match(/^[0-9]+$/) 
    ? `https://steamcommunity.com/profiles/${steamId}`
    : `https://steamcommunity.com/id/${steamId}`

  return (
    <div className="glass rounded-xl p-4 hover-lift card-interactive">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
            <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-4.6 0-8.45-3.08-9.64-7.27l3.18 1.32a2.6 2.6 0 0 0 2.33 2.9 2.6 2.6 0 0 0 2.76-2.4 2.6 2.6 0 0 0-2.4-2.76l-3.42-1.42a10 10 0 0 1 7.19-10.27V2zm6.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
          </svg>
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">Steam</span>
            <span 
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${accentColor}40`, color: '#66c0f4' }}
            >
              Gaming
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{steamId}</p>
        </div>
        
        {/* View Button */}
        <a
          href={steamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-1 bg-[#1b2838] text-white hover:bg-[#2a475e]"
        >
          View
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export default SteamWidget
