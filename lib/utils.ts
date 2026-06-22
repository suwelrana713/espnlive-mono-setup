import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_URL = 'https://streamed.pk'

export function getBadgeUrl(badge: string): string {
  if (!badge) return '/placeholder-team.svg'
  if (badge.startsWith('http')) return badge
  return `${BASE_URL}/api/images/proxy/${badge}`
}

export function getPosterUrl(poster: string): string {
  if (!poster) return ''
  if (poster.startsWith('http')) return poster
  return `${BASE_URL}${poster}`
}
