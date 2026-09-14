import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found — FanZoneLive",
  description: "This page has left the pitch.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-start justify-center space-y-4 py-16">
      <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary">
        404 · Off the pitch
      </span>
      <h1 className="display text-[32px] font-extrabold leading-[1] text-ink sm:text-[52px]">
        Full time on this URL.
      </h1>
      <p className="max-w-lg text-[14px] text-muted">
        The page you asked for isn’t on the fixture list. It may have moved or
        never existed.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-primary px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-primary-2"
        >
          Back to scores
        </Link>
        <Link
          href="/sports"
          className="rounded-md border border-line px-4 py-2.5 text-[13px] font-bold text-ink transition hover:border-primary/40 hover:text-primary"
        >
          Browse sports
        </Link>
      </div>
    </div>
  );
}
