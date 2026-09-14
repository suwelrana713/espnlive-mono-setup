import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not Found — SportPulseTV',
  description: 'That channel is off air.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-start justify-center px-4 py-16 sm:px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-neon-cyan)]">
        404 &middot; Dead channel
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-[color:var(--color-ink-1)] sm:text-5xl">
        No signal on that frequency.
      </h1>
      <p className="mt-4 max-w-lg text-sm text-[color:var(--color-ink-2)]">
        The page you asked for is not on the wire. It may have moved, ended, or never existed.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-[color:var(--color-neon-cyan)] px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-canvas)] transition hover:brightness-110"
        >
          Back to front
        </Link>
        <Link
          href="/sports"
          className="rounded-full border border-white/10 bg-white/2 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-1)] transition hover:border-[color:var(--color-neon-cyan)]/40"
        >
          Browse channels
        </Link>
      </div>
    </div>
  )
}
