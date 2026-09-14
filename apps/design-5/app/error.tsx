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
    <div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-start justify-center space-y-4 py-16">
      <span className="rounded-pill bg-live/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-live">
        Error · Off the pitch
      </span>
      <h1 className="display text-[32px] font-extrabold leading-[1] text-ink sm:text-[52px]">
        Something went wrong.
      </h1>
      <p className="max-w-lg text-[14px] text-muted">
        We hit a snag serving this page. Try again or head back to the scores.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-primary px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-primary-2"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-line px-4 py-2.5 text-[13px] font-bold text-ink transition hover:border-primary/40 hover:text-primary"
        >
          Back to scores
        </Link>
      </div>
      {error.digest && (
        <p className="mono mt-4 text-[10px] uppercase tracking-widest text-faint">
          Ref · {error.digest}
        </p>
      )}
    </div>
  );
}
