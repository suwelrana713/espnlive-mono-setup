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
      className="mono inline-flex items-center gap-2 rounded-tag border border-line-2 bg-panel-2 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-fg-mid transition hover:border-neon hover:text-fg"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-neon" strokeWidth={2} />
          <span className="text-neon">Copied</span>
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
