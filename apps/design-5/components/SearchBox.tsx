"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  onSearch?: (value: string) => void;
}

export function SearchBox({
  className,
  placeholder = "Search teams, matches, competitions…",
  autoFocus,
  defaultValue = "",
  onSearch,
}: SearchBoxProps) {
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
        "flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3 focus-within:border-primary focus-within:shadow-[var(--shadow-focus)]",
        className,
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-muted" strokeWidth={1.75} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="display flex-1 bg-transparent text-[18px] font-extrabold text-ink placeholder-faint outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            onSearch?.("");
          }}
          aria-label="Clear"
          className="rounded-full p-1 text-muted transition hover:bg-surface-2 hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
