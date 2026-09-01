'use client'

import { AdBanner } from './AdBanner'
import { adsEnabled } from '@espnlive/shared/lib/ads-config'

/**
 * Fixed side-rail ads outside the max-w-7xl main container.
 * Hidden below xl (1280px). Sticky to viewport middle.
 * Left rail: 160x600. Right rail: 160x600.
 * Only shows when viewport width >= container width + 2 * (rail width + gutter).
 * xl breakpoint (1280px) ≈ 7xl (1280px) + no room, so use 2xl (1536px) for real side rails.
 */
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
