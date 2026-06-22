'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Menu, X, Tv2, Zap } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/sports', label: 'Sports' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/search', label: 'Search' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 shadow-lg shadow-red-900/50 transition group-hover:shadow-red-600/40">
              <Tv2 className="h-4 w-4 text-white" />
            </div>
            <div className="leading-none">
              <span className="block text-sm font-black uppercase tracking-widest text-white">ES</span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-red-500">Soccer Sports</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors',
                    active ? 'text-white' : 'text-white/50 hover:text-white/80'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/8"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/8 hover:text-white"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/sports/football"
              className="hidden items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 sm:flex"
            >
              <Zap className="h-3.5 w-3.5" />
              Live Now
            </Link>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/8 hover:text-white md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-x-0 top-16 z-30 border-b border-white/5 bg-black/95 backdrop-blur-xl md:hidden"
        >
          <nav className="mx-auto max-w-7xl px-4 py-4">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center rounded-xl px-4 py-3 text-base font-medium transition',
                    active ? 'bg-white/8 text-white' : 'text-white/50 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </motion.div>
      )}
    </>
  )
}
