import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Radio, Shield, Users, Zap } from "lucide-react";
import { SectionBar } from "@/components/SectionBar";
import { ResponsiveAd } from "@/ads/AdBanner";

export const metadata: Metadata = {
  title: "About ESPN Live — Free Sports Streaming Platform",
  description:
    "ESPN Live is a free sports streaming aggregator. Watch live football, basketball, tennis, cricket, and more from multiple HD stream sources worldwide.",
  alternates: { canonical: "https://espnlive.online/about" },
  openGraph: {
    type: "website",
    url: "https://espnlive.online/about",
    title: "About ESPN Live",
    description:
      "Free live sports streaming aggregator — football, basketball, cricket and more in HD.",
    siteName: "ESPN Live",
  },
};

const PILLARS = [
  {
    icon: Zap,
    heading: "Live wire",
    body: "Real-time links to live sports events as they happen — sourced from multiple providers so at least one mirror always works.",
    code: "01",
  },
  {
    icon: Globe,
    heading: "Global desk",
    body: "Football, basketball, tennis, cricket, MMA, motorsports, hockey, baseball, rugby — every major sport, one index.",
    code: "02",
  },
  {
    icon: Radio,
    heading: "HD mirrors",
    body: "Multiple stream sources per match. Language options, viewer counts, and HD/SD toggles per feed.",
    code: "03",
  },
  {
    icon: Users,
    heading: "No paywall",
    body: "Watch any match instantly. No sign-up, no subscription, no cards on file. Ads keep the wire on.",
    code: "04",
  },
] as const;

const SPORTS_COVERED = [
  "Football / Soccer",
  "Basketball",
  "Tennis",
  "Cricket",
  "American Football",
  "Hockey",
  "Baseball",
  "Motor Sports",
  "MMA / UFC",
  "Rugby",
  "Golf",
  "Darts",
];

export default function AboutPage() {
  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="grid gap-12 border-b border-line pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
            // About · Broadcast center
          </p>
          <h1 className="display mt-3 text-[52px] font-bold leading-[0.95] text-fg sm:text-[92px]">
            The signal, indexed.
          </h1>
        </div>
        <div className="flex flex-col justify-end">
          <p className="display text-2xl font-bold leading-[1.25] text-fg">
            ESPN Live is a free, ads-supported broadcast index. We link to the
            wire. We don’t host it.
          </p>
          <p className="mt-4 text-fg-mid">
            Fast, quiet, no registration. Refreshed every minute from the
            source.
          </p>
        </div>
      </div>

      <section className="py-16">
        <SectionBar code="01" eyebrow="Pillars" title="What powers the wire" />
        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.heading}
                className="rounded-panel border border-line bg-panel p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="mono rounded-tag border border-neon/40 bg-neon/5 px-2 py-0.5 text-[10px] font-bold tracking-widest text-neon">
                    [ {p.code} ]
                  </span>
                  <Icon
                    className="h-6 w-6 text-fg-mid"
                    strokeWidth={1.5}
                  />
                </div>
                <h2 className="display mt-6 text-2xl font-bold text-fg">
                  {p.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-mid">
                  {p.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line py-16">
        <SectionBar code="02" eyebrow="Coverage" title="Channels indexed" />
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {SPORTS_COVERED.map((sport, i) => (
            <li
              key={sport}
              className="flex items-center gap-3 rounded-panel border border-line bg-panel px-4 py-3"
            >
              <span className="mono text-[10px] tabular-nums text-neon">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-[15px] font-bold text-fg">
                {sport}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-12 border-t border-line py-16 lg:grid-cols-2">
        <div>
          <SectionBar
            code="03"
            eyebrow="Editorial"
            title="How we source"
          />
          <p className="text-fg-mid">
            Match data comes from public sports APIs and is updated in real
            time. Stream availability varies by match and broadcaster. If you
            spot an error,{" "}
            <Link
              href="/contact"
              className="text-neon underline decoration-neon underline-offset-4 hover:text-fg"
            >
              tell us
            </Link>
            .
          </p>
        </div>
        <div>
          <SectionBar
            code="04"
            eyebrow="Legal"
            title="No hosting, no storage"
          />
          <p className="text-fg-mid">
            ESPN Live does not host any video content. All streams linked are
            provided by independent third parties. For official broadcasts,
            please use licensed streaming services. This site is for
            entertainment purposes only.
          </p>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-panel border border-neon/30 bg-neon/5 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Shield className="h-6 w-6 text-neon" strokeWidth={1.5} />
            <p className="display text-xl font-bold text-fg">
              Questions or copyright concerns?
            </p>
          </div>
          <Link
            href="/contact"
            className="mono inline-flex items-center gap-2 rounded-tag border border-neon bg-neon px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-void transition hover:bg-transparent hover:text-neon"
          >
            [ Contact desk ]
          </Link>
        </div>
      </section>

      <div className="mt-8 rounded-panel border border-line-2 bg-panel py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
    </div>
  );
}
