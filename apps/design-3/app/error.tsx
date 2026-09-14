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
    <div className="mx-auto flex min-h-[60dvh] max-w-[720px] flex-col items-start justify-center px-5 py-16 sm:px-8">
      <p className="mono text-[11px] uppercase tracking-[0.22em] text-accent">
        Error · The wire dropped
      </p>
      <h1 className="serif mt-4 text-4xl font-black leading-tight text-ink sm:text-6xl">
        Something broke on our end.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        The desk hit a snag serving this page. Try again or head back to the
        front page.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="mono rounded-sm bg-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-paper transition hover:bg-accent"
        >
          Try again
        </button>
        <Link
          href="/"
          className="mono rounded-sm border border-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-paper"
        >
          Back to front
        </Link>
      </div>
      {error.digest && (
        <p className="mono mt-8 text-[10px] uppercase tracking-[0.22em] text-faint">
          Ref · {error.digest}
        </p>
      )}
    </div>
  );
}
