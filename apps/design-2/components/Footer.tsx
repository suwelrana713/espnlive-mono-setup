import Image from 'next/image'
import Link from 'next/link'
import { Signal } from 'lucide-react'

const CHANNELS = [
  ['football', 'Football'],
  ['basketball', 'Basketball'],
  ['tennis', 'Tennis'],
  ['cricket', 'Cricket'],
  ['american-football', 'NFL'],
  ['hockey', 'Hockey'],
  ['baseball', 'Baseball'],
  ['motor-sports', 'Motor'],
  ['fight', 'MMA'],
  ['rugby', 'Rugby'],
  ['golf', 'Golf'],
  ['darts', 'Darts'],
]

const LINKS = [
  ['/', 'Home'],
  ['/sports', 'Channels'],
  ['/schedule', 'Schedule'],
  ['/search', 'Search'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
]

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/6 bg-[color:var(--color-void)]/70 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[color:var(--color-neon-cyan)]/50 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Station identity */}
          <div>
            <Link href="/" aria-label="SportPulseTV home" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SportPulseTV"
                width={210}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-2)]">
              Feel every play. A free broadcast index for live sport &mdash; we do not host video, we aggregate publicly
              available embed feeds from third-party providers.
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
              <Signal className="h-3 w-3 text-[color:var(--color-neon-cyan)]" />
              broadcast&nbsp;#4271
              <span aria-hidden className="h-3 w-px bg-white/10" />
              &copy;&nbsp;{new Date().getFullYear()}
            </div>
          </div>

          {/* Nav sitemap */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-ink-3)]">
              &mdash; Directory
            </p>
            <ul className="grid grid-cols-2 gap-y-3">
              {LINKS.map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[color:var(--color-ink-2)] transition hover:text-[color:var(--color-neon-cyan)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Channel chips */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-ink-3)]">
              &mdash; Channels
            </p>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map(([slug, name]) => (
                <Link
                  key={slug}
                  href={`/sports/${slug}`}
                  className="rounded-full border border-white/6 bg-white/3 px-3 py-1 text-xs text-[color:var(--color-ink-2)] transition hover:border-[color:var(--color-neon-cyan)]/40 hover:bg-[color:var(--color-neon-cyan)]/8 hover:text-[color:var(--color-neon-cyan)]"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/6 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-4)]">
            All streams supplied by independent third parties. For entertainment only.
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-4)]">
            <Link href="/about" className="transition hover:text-[color:var(--color-ink-2)]">About</Link>
            <Link href="/contact" className="transition hover:text-[color:var(--color-ink-2)]">Contact / DMCA</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
