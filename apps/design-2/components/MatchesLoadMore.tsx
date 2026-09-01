'use client'

import { Fragment, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { MatchCard } from '@/components/MatchCard'
import { ResponsiveAd } from '@/components/ads/AdBanner'
import type { Match } from '@/lib/types'

const AD_THRESHOLD = 50
const AD_INTERVAL = 10

interface Props {
  matches: Match[]
  step?: number
}

export function MatchesLoadMore({ matches, step = 12 }: Props) {
  const [visible, setVisible] = useState(step)
  const shown = matches.slice(0, visible)
  const hasMore = visible < matches.length
  const withAds = matches.length >= AD_THRESHOLD

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {shown.map((m, i) => {
          const injectAd = withAds && (i + 1) % AD_INTERVAL === 0 && i + 1 < shown.length
          return (
            <Fragment key={m.id}>
              <MatchCard match={m} index={i} />
              {injectAd && (
                <div data-ad-slot="in-feed" className="col-span-full my-3">
                  <ResponsiveAd mobile="320x50" desktop="728x90" />
                </div>
              )}
            </Fragment>
          )
        })}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="group inline-flex items-center gap-2 rounded-[14px] border border-white/8 bg-white/3 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-2)] transition hover:border-[color:var(--color-neon-cyan)]/40 hover:bg-[color:var(--color-neon-cyan)]/8 hover:text-[color:var(--color-neon-cyan)]"
          >
            Load next {Math.min(step, matches.length - visible)}
            <ChevronDown className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" />
            <span className="font-mono text-[10px] text-[color:var(--color-ink-4)] tabular-nums">
              ({matches.length - visible} left)
            </span>
          </button>
        </div>
      )}
    </>
  )
}
