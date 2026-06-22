import type { Metadata } from 'next'
import Link from 'next/link'
import { Tv2, Shield, Zap, Globe, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About ESPN Live — Free Sports Streaming Platform',
  description:
    'ESPN Live is a free sports streaming aggregator. Watch live football, basketball, tennis, cricket, and more from multiple HD stream sources worldwide.',
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
  {
    icon: Zap,
    title: 'Live Streams',
    body: 'Real-time links to live sports events as they happen, sourced from multiple providers for maximum reliability.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    body: 'Football, basketball, tennis, cricket, MMA, motorsports, hockey, baseball, rugby — all major sports covered.',
  },
  {
    icon: Shield,
    title: 'HD Quality',
    body: 'Multiple stream sources per match so you always find a working HD link.',
  },
  {
    icon: Users,
    title: 'No Registration',
    body: 'Watch any match instantly — no sign-up, no subscription, no paywalls.',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 shadow-xl shadow-red-900/40">
            <Tv2 className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-white">About ESPN Live</h1>
        <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
          Your free, always-on hub for live sports streaming — aggregating the best HD streams
          from across the web into one simple, fast interface.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-16">
        {features.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-white/5 bg-white/2 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20">
              <Icon className="h-5 w-5 text-red-400" />
            </div>
            <h2 className="mb-2 text-base font-bold text-white">{title}</h2>
            <p className="text-sm text-white/50 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="space-y-10 text-white/70 leading-relaxed">
        <section>
          <h2 className="mb-3 text-xl font-bold text-white">What is ESPN Live?</h2>
          <p className="text-sm">
            ESPN Live (espnlive.online) is a sports streaming aggregator that indexes and links to
            live sports streams from third-party providers. We do not host, upload, or store any
            video content. All streams are sourced from publicly available third-party services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-white">Sports We Cover</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {['Football / Soccer', 'Basketball', 'Tennis', 'Cricket', 'American Football', 'Hockey', 'Baseball', 'Motor Sports', 'MMA / UFC', 'Rugby', 'Golf', 'Darts'].map(sport => (
              <li key={sport} className="flex items-center gap-2 text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {sport}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-white">Editorial Standards</h2>
          <p className="text-sm">
            Match data is sourced from reliable sports data APIs and updated in real time. Stream
            availability varies by match and broadcaster. We aim to provide accurate schedules,
            correct team names, and verified stream sources. If you spot an error, please{' '}
            <Link href="/contact" className="text-red-400 hover:text-red-300 underline underline-offset-2">
              contact us
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-white">Legal Disclaimer</h2>
          <p className="text-sm">
            ESPN Live does not host any video content. All streams linked are provided by independent
            third parties. We are not responsible for the content of external sites. For official
            broadcasts, please use licensed streaming services. ESPN Live is for entertainment
            and informational purposes only.
          </p>
        </section>
      </div>

      <div className="mt-12 rounded-2xl border border-white/5 bg-white/2 p-6 text-center">
        <p className="text-sm text-white/50">
          Questions?{' '}
          <Link href="/contact" className="text-red-400 hover:text-red-300 font-medium">
            Get in touch →
          </Link>
        </p>
      </div>
    </div>
  )
}
