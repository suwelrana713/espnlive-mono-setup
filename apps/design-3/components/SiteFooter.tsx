import Link from "next/link";

const NAV_COLS = [
  {
    heading: "Sections",
    links: [
      ["/", "Front"],
      ["/sports", "Sports"],
      ["/schedule", "Schedule"],
      ["/search", "Search"],
    ],
  },
  {
    heading: "Football",
    links: [
      ["/sports/football", "Live Football"],
      ["/sports/football", "Premier League"],
      ["/sports/football", "Champions League"],
      ["/sports/football", "La Liga"],
      ["/sports/football", "Serie A"],
    ],
  },
  {
    heading: "More Sports",
    links: [
      ["/sports/basketball", "Basketball"],
      ["/sports/tennis", "Tennis"],
      ["/sports/cricket", "Cricket"],
      ["/sports/hockey", "Hockey"],
      ["/sports/motor-sports", "Motor Sports"],
      ["/sports/fight", "MMA / UFC"],
    ],
  },
  {
    heading: "Information",
    links: [
      ["/about", "About"],
      ["/contact", "Contact"],
      ["/contact", "DMCA / Copyright"],
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-hairline bg-panel-soft/60">
      <div className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div className="max-w-md">
            <Link
              href="/"
              aria-label="KickoffStreams home"
              className="flex items-baseline gap-2"
            >
              <span className="serif text-4xl font-black leading-none tracking-tight text-ink">
                Kickoff
              </span>
              <span className="mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                Streams
              </span>
            </Link>
            <p className="serif mt-6 text-[22px] leading-[1.25] text-ink-2">
              Every kickoff. Live. Free. One index for every live sport on the
              wire.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              KickoffStreams aggregates publicly available streams. No hosting,
              no registration, no paywall.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {NAV_COLS.map((col) => (
              <div key={col.heading}>
                <h4 className="mono mb-4 text-[10px] uppercase tracking-[0.22em] text-faint">
                  {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.links.map(([href, label]) => (
                    <li key={`${href}-${label}`}>
                      <Link
                        href={href}
                        className="text-sm text-ink-2 transition-colors hover:text-accent"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-faint">
            © {year} KickoffStreams · Vol. 1
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-muted">
            Streams provided by third-party sources. For entertainment purposes
            only. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
