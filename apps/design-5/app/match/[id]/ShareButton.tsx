"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink transition hover:border-primary hover:text-primary"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-live" strokeWidth={2.5} />
          <span className="text-live">Copied</span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" strokeWidth={1.75} />
          Share
        </>
      )}
    </button>
  );
}
