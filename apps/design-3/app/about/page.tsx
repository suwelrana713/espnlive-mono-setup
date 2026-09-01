import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Radio, Shield, Users, Zap } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
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
  },
  {
    icon: Globe,
    heading: "Global desk",
    body: "Football, basketball, tennis, cricket, MMA, motorsports, hockey, baseball, rugby — every major sport, one index.",
  },
  {
    icon: Radio,
    heading: "HD mirrors",
    body: "Multiple stream sources per match. Language options, viewer counts, and HD/SD toggles per feed.",
  },
  {
    icon: Users,
    heading: "No paywall",
    body: "Watch any match instantly. No sign-up, no subscription, no cards on file. Ads keep the wire on.",
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
    <div className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8">
      <div className="grid gap-12 border-b border-hairline pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">About · The masthead</p>
          <h1 className="serif mt-3 text-[52px] font-black leading-[0.95] tracking-tight text-ink sm:text-[92px]">
            An index for live sport.
          </h1>
        </div>
        <div className="flex flex-col justify-end">
          <p className="serif text-2xl leading-[1.3] text-ink-2">
            ESPN Live is a free, ads-supported broadcast index for global sport.
            We link to the wire. We don’t host it.
          </p>
          <p className="mt-4 text-muted">
            Fast, quiet, no registration. Refreshed every minute from the
            source.
          </p>
        </div>
      </div>

      <section className="py-16">
        <Eyebrow number="01">The four pillars</Eyebrow>
        <div className="mt-6 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.heading}
                className="flex flex-col gap-4 bg-panel p-8"
              >
                <Icon
                  className="h-6 w-6 text-accent"
                  strokeWidth={1.5}
                />
                <div>
                  <h2 className="serif text-2xl font-black text-ink">
                    {p.heading}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-10 border-t border-hairline py-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow number="02">Coverage</Eyebrow>
          <h2 className="serif mt-3 text-4xl font-black leading-tight text-ink">
            Sports we cover
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {SPORTS_COVERED.map((sport, i) => (
            <li
              key={sport}
              className="flex items-center gap-3 border-b border-hairline pb-3"
            >
              <span className="mono text-[10px] tabular-nums text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="serif text-[16px] font-semibold text-ink">
                {sport}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-12 border-t border-hairline py-16 lg:grid-cols-2">
        <div>
          <Eyebrow number="03">Editorial standards</Eyebrow>
          <h3 className="serif mt-3 text-3xl font-black text-ink">
            How we source
          </h3>
          <p className="mt-4 text-muted">
            Match data comes from public sports APIs and is updated in real
            time. Stream availability varies by match and broadcaster. If you
            spot an error,{" "}
            <Link
              href="/contact"
              className="underline decoration-accent decoration-2 underline-offset-4 hover:text-ink"
            >
              tell us
            </Link>
            .
          </p>
        </div>
        <div>
          <Eyebrow number="04">Legal notice</Eyebrow>
          <h3 className="serif mt-3 text-3xl font-black text-ink">
            No hosting, no storage
          </h3>
          <p className="mt-4 text-muted">
            ESPN Live does not host any video content. All streams linked are
            provided by independent third parties. For official broadcasts,
            please use licensed streaming services. This site is for
            entertainment purposes only.
          </p>
        </div>
      </section>

      <section className="border-t border-hairline py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Shield className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <p className="serif text-2xl text-ink">
              Questions or copyright concerns?
            </p>
          </div>
          <Link
            href="/contact"
            className="mono inline-flex items-center gap-3 rounded-sm border border-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-paper"
          >
            Contact the desk
          </Link>
        </div>
      </section>

      <div className="mt-8 border-y border-hairline bg-panel-soft/60 py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
    </div>
  );
}
