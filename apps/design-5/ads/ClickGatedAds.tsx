'use client'

import { useEffect } from 'react'
import { ADS } from './adConfig'

const CLICK_THRESHOLD = 5
const STORAGE_KEY = 'espnlive_ads_click_count'

export function ClickGatedAds() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = (e: MouseEvent) => {
      if (e.button !== 0) return

      const target = e.target as HTMLElement | null
      if (!target) return
      if (target.closest('[data-ad-slot]')) return
      if (target.closest('iframe')) return

      let count = 0
      try {
        count = Number(sessionStorage.getItem(STORAGE_KEY) || 0)
      } catch {
        return
      }
      count += 1

      if (count < CLICK_THRESHOLD) {
        try {
          sessionStorage.setItem(STORAGE_KEY, String(count))
        } catch {}
        return
      }

      try {
        sessionStorage.setItem(STORAGE_KEY, '0')
      } catch {}

      const src = Math.random() < 0.5 ? ADS.socialBarSrc : ADS.popunderSrc
      const scriptId = 'ads-gated-' + src.split('/').pop()
      if (document.getElementById(scriptId)) return

      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.id = scriptId
      s.setAttribute('data-cfasync', 'false')
      document.body.appendChild(s)
    }

    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [])

  return null
}
