"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-start justify-center gap-4 px-5 py-16 sm:px-8">
      <p className="mono text-[10px] uppercase tracking-[0.28em] text-live">
        // Error · Signal lost
      </p>
      <h1 className="display text-[36px] font-bold leading-[0.95] text-fg sm:text-[64px]">
        Off the wire.
      </h1>
      <p className="max-w-lg text-fg-mid">
        Something broke serving this page. Try again or head back to the feed.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="mono rounded-tag border border-neon bg-neon px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-void transition hover:bg-transparent hover:text-neon"
        >
          [ Retry ]
        </button>
        <Link
          href="/"
          className="mono rounded-tag border border-line-2 bg-panel px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-fg transition hover:border-neon hover:text-neon"
        >
          [ Feed ]
        </Link>
      </div>
      {error.digest && (
        <p className="mono mt-4 text-[10px] uppercase tracking-[0.28em] text-fg-faint">
          Ref · {error.digest}
        </p>
      )}
    </div>
  );
}
