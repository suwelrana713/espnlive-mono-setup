'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Radio, Home, LayoutGrid, CalendarClock, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Home', code: '01', icon: Home },
  { href: '/sports', label: 'Channels', code: '02', icon: LayoutGrid },
  { href: '/schedule', label: 'Schedule', code: '03', icon: CalendarClock },
  { href: '/search', label: 'Search', code: '04', icon: Search },
  { href: '/about', label: 'About', code: '05', icon: Info },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [clock, setClock] = useState('')
  const [tz, setTz] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setClock(
        `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`,
      )
    }
    tick()
    setTz(`UTC${new Date().getTimezoneOffset() / -60 >= 0 ? '+' : ''}${new Date().getTimezoneOffset() / -60}`)
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* Broadcast station bar */}
      <div className="relative z-40 border-b border-white/6 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex h-8 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-signal)] signal-pulse" />
              On&nbsp;Air
            </span>
            <span aria-hidden className="h-3 w-px bg-white/10" />
            <span className="hidden sm:inline">sportpulsetv.online &middot; broadcast&nbsp;#4271</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)] tabular-nums">
            <span suppressHydrationWarning>{clock || '--:--'}</span>
            <span aria-hidden className="h-3 w-px bg-white/10" />
            <span suppressHydrationWarning className="hidden sm:inline">{tz || 'UTC'}</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-colors duration-300',
          scrolled
            ? 'border-white/8 bg-[color:var(--color-canvas)]/85 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="SportPulseTV home"
            className="group flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[color:var(--color-neon-magenta)]/30 to-[color:var(--color-neon-cyan)]/30">
              <Radio className="h-4 w-4 text-[color:var(--color-ink-1)]" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-ink-3)]">
                SportPulse
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--color-ink-1)]">
                TV<span className="text-[color:var(--color-neon-cyan)]">.</span>
              </span>
            </div>
          </Link>

          {/* Center pill nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/6 bg-black/40 p-1 backdrop-blur-md md:flex">
            {NAV.map((n) => {
              const active = n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)
              const Icon = n.icon
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    'relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors',
                    active
                      ? 'text-[color:var(--color-canvas)]'
                      : 'text-[color:var(--color-ink-2)] hover:text-[color:var(--color-ink-1)]',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[color:var(--color-neon-cyan)]"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <Icon className="relative h-3.5 w-3.5" />
                  <span className="relative">{n.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/2 text-[color:var(--color-ink-2)] transition hover:border-[color:var(--color-neon-cyan)]/40 hover:text-[color:var(--color-neon-cyan)] md:hidden"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/sports/football"
              className="hidden items-center gap-1.5 rounded-full bg-[color:var(--color-signal)] px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:brightness-110 sm:inline-flex shadow-[0_0_0_1px_rgba(255,51,85,0.35),0_10px_28px_-10px_rgba(255,51,85,0.55)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white signal-pulse" />
              Tune&nbsp;In
            </Link>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/2 text-[color:var(--color-ink-2)] transition hover:border-[color:var(--color-neon-cyan)]/40 md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-24 z-30 border-y border-white/6 bg-[color:var(--color-canvas)]/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="mx-auto max-w-[1400px] divide-y divide-white/6 px-4 py-2 sm:px-6">
              {NAV.map((n) => {
                const Icon = n.icon
                const active = n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-4 py-4 text-sm font-semibold transition',
                      active
                        ? 'text-[color:var(--color-neon-cyan)]'
                        : 'text-[color:var(--color-ink-2)] hover:text-[color:var(--color-ink-1)]',
                    )}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-4)] tabular-nums">
                      {n.code}
                    </span>
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 uppercase tracking-[0.15em]">{n.label}</span>
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
