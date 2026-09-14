'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-start justify-center px-4 py-16 sm:px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-signal)]">
        Signal lost &middot; Broadcast error
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-[color:var(--color-ink-1)] sm:text-5xl">
        Something knocked us off air.
      </h1>
      <p className="mt-4 max-w-lg text-sm text-[color:var(--color-ink-2)]">
        The station hit interference. Try again or head back to the front.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[color:var(--color-neon-cyan)] px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-canvas)] transition hover:brightness-110"
        >
          Retry transmission
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/10 bg-white/2 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-1)] transition hover:border-[color:var(--color-neon-cyan)]/40"
        >
          Back to front
        </Link>
      </div>
      {error.digest && (
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-4)]">
          Ref &middot; {error.digest}
        </p>
      )}
    </div>
  )
}
