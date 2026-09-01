"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  onSearch?: (value: string) => void;
}

export function SearchInput({
  className,
  placeholder = "Query the broadcast index…",
  autoFocus,
  defaultValue = "",
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (!onSearch) return;
    const t = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(t);
  }, [value, onSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 rounded-panel border border-line-2 bg-panel px-4 py-3 focus-within:border-neon focus-within:shadow-[0_0_0_1px_rgba(0,229,255,0.35)]",
        className,
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-fg-dim" strokeWidth={1.75} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="mono flex-1 bg-transparent text-[15px] text-fg placeholder-fg-faint outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            onSearch?.("");
          }}
          aria-label="Clear"
          className="rounded-tag p-1 text-fg-dim transition hover:text-fg"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
