import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found // SportVibeHub",
  description: "That channel is dark.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-start justify-center gap-4 px-5 py-16 sm:px-8">
      <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
        // 404 · Channel dark
      </p>
      <h1 className="display text-[36px] font-bold leading-[0.95] text-fg sm:text-[64px]">
        No signal here.
      </h1>
      <p className="max-w-lg text-fg-mid">
        The URL you asked for isn’t on the wire. Moved, ended, or never
        existed.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="mono rounded-tag border border-neon bg-neon px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-void transition hover:bg-transparent hover:text-neon"
        >
          [ Feed ]
        </Link>
        <Link
          href="/sports"
          className="mono rounded-tag border border-line-2 bg-panel px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-fg transition hover:border-neon hover:text-neon"
        >
          [ Sports ]
        </Link>
      </div>
    </div>
  );
}
