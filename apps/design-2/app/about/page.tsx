import type { Metadata } from 'next'
import Link from 'next/link'
import { Radio, Shield, Zap, Globe, Users, Signal } from 'lucide-react'
import { ResponsiveAd } from '@/components/ads/AdBanner'
import { SectionHeader } from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'About ESPN Live — Free Sports Streaming Platform',
  description:
    'ESPN Live is a free sports streaming aggregator. Watch live football, basketball, tennis, cricket and more from multiple HD stream sources worldwide.',
  alternates: { canonical: 'https://espnlive.online/about' },
  openGraph: {
    type: 'website',
    url: 'https://espnlive.online/about',
    title: 'About ESPN Live',
    description: 'Free live sports streaming aggregator — football, basketball, cricket and more in HD.',
    siteName: 'ESPN Live',
  },
}

const features = [
  { code: '01', icon: Zap, title: 'Live Broadcasts', body: 'Real-time embed links to live sports events sourced from multiple providers for maximum reliability.' },
  { code: '02', icon: Globe, title: 'Global Coverage', body: 'Football, basketball, tennis, cricket, MMA, motorsport, hockey, baseball, rugby — every major sport indexed.' },
  { code: '03', icon: Shield, title: 'HD First', body: 'Multiple stream sources per fixture so you always land on a working HD feed.' },
  { code: '04', icon: Users, title: 'No Sign-Up', body: 'Watch any match instantly — no account, no subscription, no paywall.' },
]

const SPORTS_LIST = [
  'Football / Soccer',
  'Basketball',
  'Tennis',
  'Cricket',
  'American Football',
  'Hockey',
  'Baseball',
  'Motor Sports',
  'MMA / UFC',
  'Rugby',
  'Golf',
  'Darts',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="glass-strong relative mb-12 overflow-hidden rounded-[32px] p-8 sm:p-12">
        <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[color:var(--color-neon-cyan)]/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[color:var(--color-neon-magenta)]/15 blur-[100px]" />

        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-neon-cyan)]">
            &mdash;&nbsp; Station&nbsp;Profile
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[color:var(--color-ink-1)] sm:text-4xl md:text-6xl">
            The broadcast<br />
            index for <span className="text-[color:var(--color-neon-cyan)]">every</span> sport.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-ink-2)]">
            ESPN Live is a free live sports aggregator. We do not host video. We index public embed feeds
            from third-party providers and present them in one fast, ad-supported interface.
          </p>
          <div className="mt-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
            <Signal className="h-3.5 w-3.5 text-[color:var(--color-neon-cyan)]" />
            broadcast&nbsp;#4271
            <span aria-hidden className="h-3 w-px bg-white/10" />
            aggregator &middot; index only
          </div>
        </div>
      </div>

      <SectionHeader code="01" eyebrow="What we do" title="Core Features" />
      <div className="mb-16 grid gap-4 sm:grid-cols-2">
        {features.map(({ code, icon: Icon, title, body }) => (
          <div
            key={title}
            className="glass rounded-[22px] p-6 transition hover:border-[color:var(--color-neon-cyan)]/30"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[color:var(--color-neon-cyan)]/10 text-[color:var(--color-neon-cyan)]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-4)] tabular-nums">
                {code}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[color:var(--color-ink-1)]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-2)]">{body}</p>
          </div>
        ))}
      </div>

      <SectionHeader code="02" eyebrow="Coverage" title="Channels We Broadcast" />
      <div className="glass mb-16 rounded-[22px] p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SPORTS_LIST.map((s) => (
            <div
              key={s}
              className="flex items-center gap-2 rounded-lg border border-white/6 bg-white/2 px-3 py-2 text-sm text-[color:var(--color-ink-2)]"
            >
              <Radio className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-neon-cyan)]" />
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8 text-[color:var(--color-ink-2)] leading-relaxed">
        <section className="glass rounded-[22px] p-6">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
            &mdash;&nbsp; What&nbsp;is&nbsp;ESPN&nbsp;Live?
          </p>
          <p className="text-sm">
            ESPN Live (espnlive.online) is a sports streaming aggregator that indexes and links to live
            sports streams from third-party providers. We do not host, upload, or store any video content.
            All streams are sourced from publicly available third-party services.
          </p>
        </section>

        <section className="glass rounded-[22px] p-6">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
            &mdash;&nbsp; Editorial&nbsp;Standards
          </p>
          <p className="text-sm">
            Match data is sourced from reliable sports data APIs and updated in real time. Stream
            availability varies by match and broadcaster. If you spot an error, please{' '}
            <Link
              href="/contact"
              className="text-[color:var(--color-neon-cyan)] underline underline-offset-4 hover:text-[color:var(--color-neon-cyan-soft)]"
            >
              contact us
            </Link>
            .
          </p>
        </section>

        <section className="glass rounded-[22px] p-6">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
            &mdash;&nbsp; Legal&nbsp;Disclaimer
          </p>
          <p className="text-sm">
            ESPN Live does not host any video content. All streams linked are provided by independent
            third parties. We are not responsible for the content of external sites. For official
            broadcasts please use licensed streaming services. ESPN Live is for entertainment and
            informational purposes only.
          </p>
        </section>
      </div>

      <div className="mt-10 glass flex flex-col items-center gap-3 rounded-[22px] p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
          &mdash;&nbsp; Questions?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-neon-cyan)]/40 bg-[color:var(--color-neon-cyan)]/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-neon-cyan)] transition hover:bg-[color:var(--color-neon-cyan)]/15"
        >
          Open contact channel &rarr;
        </Link>
      </div>

      <div className="mt-10">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
    </div>
  )
}
