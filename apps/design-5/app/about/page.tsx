import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Radio, Shield, Users, Zap } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { ResponsiveAd } from "@/ads/AdBanner";

export const metadata: Metadata = {
  title: "About FanZoneLive — Free Sports Streaming Platform",
  description:
    "FanZoneLive is a free sports streaming aggregator. Watch live football, basketball, tennis, cricket, and more from multiple HD stream sources worldwide.",
  alternates: { canonical: "https://fanzonelive.online/about" },
  openGraph: {
    type: "website",
    url: "https://fanzonelive.online/about",
    title: "About FanZoneLive",
    description:
      "Free live sports streaming aggregator — football, basketball, cricket and more in HD.",
    siteName: "FanZoneLive",
  },
};

const FAQS = [
  {
    q: "Is FanZoneLive really free?",
    a: "Yes. Every stream is free. No signup, no paywall, no subscription. Ads keep the platform running.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account required. Open a match, pick a mirror, hit play.",
  },
  {
    q: "Does FanZoneLive host the video?",
    a: "No. FanZoneLive is an index. All video is served by independent third-party providers. We link to public embed URLs.",
  },
  {
    q: "Which sports can I watch live?",
    a: "Football, basketball, tennis, cricket, American football, hockey, baseball, motor sports (F1, MotoGP), MMA/UFC, rugby, golf, darts and more.",
  },
  {
    q: "What if a stream is not working?",
    a: "Every match has multiple mirror sources. Pick a different mirror. If all fail, the broadcast may not have started or has ended.",
  },
  {
    q: "How do I report a copyright issue (DMCA)?",
    a: "Use the contact form with the offending URL and proof of rights. We respond within 24 hours.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const STATS = [
  { label: "Sports", value: "15+" },
  { label: "Refresh", value: "60s" },
  { label: "Mirrors / match", value: "1–8" },
  { label: "Registration", value: "None" },
];

const PILLARS = [
  {
    icon: Zap,
    heading: "Real-time scores",
    body: "Live match data refreshed every minute across every covered sport.",
  },
  {
    icon: Globe,
    heading: "Global coverage",
    body: "Football, basketball, tennis, cricket, MMA, motorsports, hockey, baseball, rugby.",
  },
  {
    icon: Radio,
    heading: "HD mirrors",
    body: "Multiple stream sources per match. Language options and HD/SD toggles per feed.",
  },
  {
    icon: Users,
    heading: "No paywall",
    body: "Free to use. No sign-up, no subscription, no cards. Ads keep the wire on.",
  },
];

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
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header>
        <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
          About
        </span>
        <h1 className="display mt-3 text-[40px] font-extrabold leading-[1] text-ink sm:text-[56px]">
          A modern sports hub for live scores &amp; streams.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] text-muted">
          FanZoneLive is a free, ads-supported broadcast index. We link to the
          wire — we don’t host video. Every mirror, every sport, one page.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="card p-4">
            <p className="label !text-muted">{s.label}</p>
            <p className="numeric mt-2 text-[28px] font-extrabold text-ink tabular-nums">
              {s.value}
            </p>
          </div>
        ))}
      </section>

      <section>
        <SectionTitle title="What powers the platform" accent="primary" />
        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.heading} className="card p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-tint text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h2 className="display mt-4 text-[18px] font-extrabold text-ink">
                  {p.heading}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {p.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle
          title="Sports we cover"
          subtitle="Full category list"
          accent="warn"
        />
        <ul className="card grid grid-cols-2 divide-x divide-line/60 sm:grid-cols-3 lg:grid-cols-4">
          {SPORTS_COVERED.map((sport, i) => (
            <li
              key={sport}
              className="flex items-center gap-3 border-b border-line/60 px-4 py-3 last:border-b-0 sm:[&:nth-child(n+10)]:border-b-0"
            >
              <span className="mono text-[11px] tabular-nums text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-[13px] font-extrabold text-ink">
                {sport}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <SectionTitle title="Editorial standards" accent="cool" />
          <p className="text-[14px] text-muted">
            Match data comes from public sports APIs and is updated in real
            time. Stream availability varies by match and broadcaster. Spot an
            error?{" "}
            <Link
              href="/contact"
              className="font-semibold text-primary hover:text-primary-2"
            >
              Tell us
            </Link>
            .
          </p>
        </div>
        <div className="card p-6">
          <SectionTitle title="Legal notice" accent="live" />
          <p className="text-[14px] text-muted">
            FanZoneLive does not host any video content. All streams linked are
            provided by independent third parties. For official broadcasts,
            please use licensed streaming services.
          </p>
        </div>
      </section>

      <section className="card flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white">
            <Shield className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="display text-[16px] font-extrabold text-ink">
              Questions or copyright concerns?
            </p>
            <p className="mt-1 text-[13px] text-muted">
              Reach out through the contact form.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-primary-2"
        >
          Contact us
        </Link>
      </section>

      <section>
        <SectionTitle
          title="Frequently asked"
          subtitle="Common questions from fans"
          accent="primary"
        />
        <dl className="card divide-y divide-line/60">
          {FAQS.map((f) => (
            <div
              key={f.q}
              className="grid gap-2 px-5 py-4 sm:grid-cols-[1fr_2fr] sm:gap-6"
            >
              <dt className="display text-[14px] font-extrabold text-ink">
                {f.q}
              </dt>
              <dd className="text-[13px] leading-relaxed text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="rounded-md border border-line bg-surface py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
    </div>
  );
}
