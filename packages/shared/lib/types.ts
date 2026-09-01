export interface Sport {
  id: string
  name: string
}

export interface Team {
  name: string
  badge: string
}

export interface MatchSource {
  source: string
  id: string
}

export interface Match {
  id: string
  title: string
  category: string
  date: number
  poster?: string
  popular?: boolean
  teams?: {
    home: Team
    away: Team
  }
  sources: MatchSource[]
}

export interface Stream {
  id: string
  streamNo: number
  language: string
  hd: boolean
  embedUrl: string
  source: string
  viewers: number
}

export type MatchStatus = 'live' | 'upcoming' | 'finished'

export function getMatchStatus(date: number): MatchStatus {
  const now = Date.now()
  const diff = now - date
  if (diff > 0 && diff < 3 * 60 * 60 * 1000) return 'live'
  if (diff < 0) return 'upcoming'
  return 'finished'
}

export function formatMatchDate(date: number): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function formatMatchTime(date: number): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
