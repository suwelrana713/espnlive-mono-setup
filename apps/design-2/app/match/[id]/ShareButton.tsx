'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="group inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-2)] transition hover:border-[color:var(--color-neon-cyan)]/40 hover:text-[color:var(--color-neon-cyan)]"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-[color:var(--color-neon-lime)]" />
          <span className="text-[color:var(--color-neon-lime)]">Copied</span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" />
          Share
        </>
      )}
    </button>
  )
}
