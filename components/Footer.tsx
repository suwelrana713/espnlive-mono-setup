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
                <span className="block text-sm font-black uppercase tracking-widest text-white">ES</span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-red-500">Soccer Sports</span>
              </div>
            </Link>
            <p className="mt-3 text-xs text-white/30 leading-relaxed">
              Premium live sports streaming platform. Watch your favorite matches in HD quality.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Navigation</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/sports', 'Sports'], ['/schedule', 'Schedule'], ['/search', 'Search']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/50 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Sports</h4>
            <ul className="space-y-2">
              {[['football', 'Football'], ['basketball', 'Basketball'], ['tennis', 'Tennis'], ['cricket', 'Cricket']].map(([id, name]) => (
                <li key={id}>
                  <Link href={`/sports/${id}`} className="text-sm text-white/50 transition hover:text-white">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">More Sports</h4>
            <ul className="space-y-2">
              {[['hockey', 'Hockey'], ['baseball', 'Baseball'], ['motor-sports', 'Motor Sports'], ['fight', 'Fight / UFC']].map(([id, name]) => (
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
            © {new Date().getFullYear()} ES Soccer Sports. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Streams provided by third-party sources. For entertainment purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
