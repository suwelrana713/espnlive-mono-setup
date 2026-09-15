'use client'

import { AdBanner } from './AdBanner'
import { adsEnabled } from '@espnlive/shared/lib/ads-config'

export function SideRailAds() {
  if (!adsEnabled) return null
  return (
    <>
      <aside
        aria-label="Advertisement left rail"
        className="pointer-events-none fixed left-4 top-1/2 z-20 hidden -translate-y-1/2 2xl:block"
      >
        <div className="pointer-events-auto">
          <AdBanner size="160x600" />
        </div>
      </aside>
      <aside
        aria-label="Advertisement right rail"
        className="pointer-events-none fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 2xl:block"
      >
        <div className="pointer-events-auto">
          <AdBanner size="160x600" />
        </div>
      </aside>
    </>
  )
}
