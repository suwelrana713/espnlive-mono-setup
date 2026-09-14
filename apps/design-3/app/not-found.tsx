import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found — KickoffStreams",
  description: "The page you were looking for is not on the wire.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-[720px] flex-col items-start justify-center px-5 py-16 sm:px-8">
      <p className="mono text-[11px] uppercase tracking-[0.22em] text-accent">
        404 · Off the wire
      </p>
      <h1 className="serif mt-4 text-4xl font-black leading-tight text-ink sm:text-6xl">
        No signal on that channel.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        The page you asked for isn’t indexed. It may have moved, ended, or never
        existed.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="mono rounded-sm bg-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-paper transition hover:bg-accent"
        >
          Back to front
        </Link>
        <Link
          href="/sports"
          className="mono rounded-sm border border-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-paper"
        >
          Browse sports
        </Link>
      </div>
    </div>
  );
}
