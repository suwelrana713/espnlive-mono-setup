'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoPlayerProps {
  embedUrl: string
  title?: string
}

export function VideoPlayer({ embedUrl, title }: VideoPlayerProps) {
  const [fullscreen, setFullscreen] = useState(false)
  const [key, setKey] = useState(0)

  return (
    <AnimatePresence>
      <motion.div
        key={fullscreen ? 'full' : 'normal'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          'group relative overflow-hidden bg-black scan-line',
          fullscreen
            ? 'fixed inset-0 z-50 rounded-none'
            : 'aspect-video w-full rounded-[22px] border border-white/8'
        )}
      >
        {/* Broadcast bars */}
        {!fullscreen && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-8 items-center justify-between border-b border-white/6 bg-[linear-gradient(180deg,rgba(0,0,0,0.7),transparent)] px-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--color-signal)] signal-pulse" />
              ch.01 &middot; live feed
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)] md:block">
              {title ?? 'stream'}
            </div>
          </div>
        )}

        <iframe
          key={key}
          src={embedUrl}
          title={title ?? 'Live Stream'}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          referrerPolicy="no-referrer"
        />

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="pointer-events-auto absolute right-3 top-11 flex gap-2">
            <button
              type="button"
              aria-label="Reload stream"
              onClick={() => setKey((k) => k + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-black/60 text-[color:var(--color-ink-1)] backdrop-blur-md transition hover:border-[color:var(--color-neon-cyan)]/40 hover:text-[color:var(--color-neon-cyan)]"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              onClick={() => setFullscreen((f) => !f)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-black/60 text-[color:var(--color-ink-1)] backdrop-blur-md transition hover:border-[color:var(--color-neon-cyan)]/40 hover:text-[color:var(--color-neon-cyan)]"
            >
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {fullscreen && (
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="pointer-events-auto absolute left-4 top-4 z-50 rounded-lg border border-white/15 bg-black/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-1)] backdrop-blur transition hover:border-[color:var(--color-neon-cyan)]/40"
          >
            &larr; Exit fullscreen
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
