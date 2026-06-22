import Link from 'next/link'
import { Tv2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
                <Tv2 className="h-4 w-4 text-white" />
              </div>
              <div className="leading-none">
                <span className="block text-sm font-black uppercase tracking-widest text-white">ESPN</span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-red-500">Live</span>
              </div>
            </Link>
            <p className="mt-3 text-xs text-white/30 leading-relaxed">
              Free live sports streaming — football, basketball, tennis, cricket and more in HD. No registration required.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Navigation</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/sports', 'Sports'], ['/schedule', 'Schedule'], ['/search', 'Search'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/50 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Football</h4>
            <ul className="space-y-2">
              {[
                ['/sports/football', 'Live Football'],
                ['/sports/football', 'Premier League'],
                ['/sports/football', 'Champions League'],
                ['/sports/football', 'La Liga'],
                ['/sports/football', 'Serie A'],
              ].map(([href, name]) => (
                <li key={name}>
                  <Link href={href} className="text-sm text-white/50 transition hover:text-white">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">More Sports</h4>
            <ul className="space-y-2">
              {[
                ['basketball', 'Basketball'],
                ['tennis', 'Tennis'],
                ['cricket', 'Cricket'],
                ['hockey', 'Hockey'],
                ['motor-sports', 'Motor Sports'],
                ['fight', 'MMA / UFC'],
              ].map(([id, name]) => (
                <li key={id}>
                  <Link href={`/sports/${id}`} className="text-sm text-white/50 transition hover:text-white">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} ESPN Live. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-white/20 hover:text-white/50 transition">About</Link>
            <Link href="/contact" className="text-xs text-white/20 hover:text-white/50 transition">Contact</Link>
            <p className="text-xs text-white/20">
              Streams from third-party sources. For entertainment only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
