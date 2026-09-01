'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Play, ChevronRight, Radio, Signal } from 'lucide-react'
import type { Match } from '@/lib/types'
import { getMatchStatus, formatMatchTime, formatMatchDate } from '@/lib/types'
import { getPosterUrl } from '@/lib/utils'
import { LiveBadge, UpcomingBadge } from './LiveBadge'

interface HeroBannerProps {
  match: Match[]
}

export function HeroBanner({ match: matches }: HeroBannerProps) {
  const [idx, setIdx] = useState(0)
  const total = matches.length
  const reduce = useReducedMotion()

  useEffect(() => {
    if (total <= 1 || reduce) return
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 6000)
    return () => clearInterval(t)
  }, [total, reduce])

  if (!total) return null
  const featured = matches[idx]
  const rest = matches.slice(0, 5).filter((_, i) => i !== idx % Math.min(5, matches.length))
  const status = getMatchStatus(featured.date)
  const isLive = status === 'live'
  const home = featured.teams?.home.name
  const away = featured.teams?.away.name

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.7fr_1fr]">
      {/* MAIN FEATURED PANEL */}
      <div className="glass-strong relative overflow-hidden rounded-[32px] min-h-[440px] scan-line">
        {/* poster */}
        {featured.poster && (
          <div className="absolute inset-0">
            <Image
              src={getPosterUrl(featured.poster)}
              alt=""
              fill
              className="object-cover opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
              unoptimized
              priority
            />
          </div>
        )}
        {/* aurora sweep */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--color-neon-magenta)]/25 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-[color:var(--color-neon-cyan)]/22 blur-[110px]" />
        </div>

        {/* Top bar — station id + counter */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/6 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-2)] backdrop-blur">
              <Signal className="h-3 w-3 text-[color:var(--color-neon-cyan)]" />
              Studio&nbsp;01
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)] sm:inline-flex">
              /{featured.category}
            </span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)] tabular-nums">
            {String(idx + 1).padStart(2, '0')} <span className="text-[color:var(--color-ink-4)]">/</span> {String(total).padStart(2, '0')}
          </div>
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={featured.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col gap-6 px-6 pt-10 pb-6 sm:px-10"
          >
            <div className="flex items-center gap-3">
              {isLive ? <LiveBadge /> : <UpcomingBadge />}
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
                {formatMatchDate(featured.date)} &middot; {formatMatchTime(featured.date)}
              </span>
            </div>

            {home && away ? (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
                <p className="text-right text-2xl font-bold leading-tight text-[color:var(--color-ink-1)] sm:text-4xl lg:text-5xl">
                  {home}
                </p>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-neon-cyan)]">
                    {isLive ? 'LIVE' : 'V'}
                  </span>
                  <span className="font-mono text-3xl text-[color:var(--color-ink-4)] sm:text-5xl">·</span>
                </div>
                <p className="text-left text-2xl font-bold leading-tight text-[color:var(--color-ink-1)] sm:text-4xl lg:text-5xl">
                  {away}
                </p>
              </div>
            ) : (
              <h1 className="text-3xl font-bold leading-tight text-[color:var(--color-ink-1)] sm:text-5xl">
                {featured.title}
              </h1>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom action bar */}
        <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/6 bg-black/30 px-6 py-4 backdrop-blur sm:px-10">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)]">
            <Radio className="h-3.5 w-3.5" />
            {featured.sources.length}&nbsp;source{featured.sources.length === 1 ? '' : 's'}
          </div>
          <Link
            href={`/match/${featured.id}?cat=${featured.category}`}
            className={
              isLive
                ? 'group inline-flex items-center gap-2 rounded-[14px] bg-[color:var(--color-signal)] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:brightness-110 shadow-[0_0_0_1px_rgba(255,51,85,0.35),0_10px_30px_-10px_rgba(255,51,85,0.55)]'
                : 'group inline-flex items-center gap-2 rounded-[14px] border border-[color:var(--color-neon-cyan)]/45 bg-[color:var(--color-neon-cyan)]/8 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-[color:var(--color-neon-cyan)] transition hover:bg-[color:var(--color-neon-cyan)]/15'
            }
          >
            {isLive ? <Radio className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isLive ? 'Tune In' : 'Preview'}
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Progress dots */}
        {total > 1 && (
          <div className="absolute bottom-[62px] left-1/2 z-10 hidden -translate-x-1/2 gap-1.5 sm:flex">
            {matches.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show match ${i + 1}`}
                className={
                  i === idx
                    ? 'h-1 w-6 rounded-full bg-[color:var(--color-neon-cyan)] shadow-[0_0_10px_rgba(34,228,255,0.6)]'
                    : 'h-1 w-1.5 rounded-full bg-white/25 hover:bg-white/50'
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* SIDE STACK — up next queue */}
      <div className="glass flex flex-col overflow-hidden rounded-[32px]">
        <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-2)]">
            Up&nbsp;Next&nbsp;Queue
          </p>
          <span className="font-mono text-[10px] tabular-nums text-[color:var(--color-ink-4)]">
            {String(rest.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex flex-1 flex-col divide-y divide-white/5">
          {rest.slice(0, 4).map((m, i) => {
            const stat = getMatchStatus(m.date)
            const live = stat === 'live'
            return (
              <Link
                key={m.id}
                href={`/match/${m.id}?cat=${m.category}`}
                onMouseEnter={() => setIdx(matches.findIndex((x) => x.id === m.id))}
                className="group flex flex-1 items-center gap-3 px-5 py-3 transition hover:bg-white/3"
              >
                <span
                  className={
                    live
                      ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[color:var(--color-signal)]/45 bg-[color:var(--color-signal)]/12 font-mono text-[9px] uppercase text-[color:var(--color-signal)] signal-pulse'
                      : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/3 font-mono text-[9px] uppercase text-[color:var(--color-ink-2)]'
                  }
                >
                  {live ? 'LIV' : formatMatchTime(m.date).slice(0, 5)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-[color:var(--color-ink-1)]">
                    {m.teams ? `${m.teams.home.name} vs ${m.teams.away.name}` : m.title}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)]">
                    /{m.category}
                  </p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-ink-3)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--color-neon-cyan)]" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
