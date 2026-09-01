"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFieldProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  onSearch?: (value: string) => void;
}

export function SearchField({
  className,
  placeholder = "Search matches, teams, sports…",
  autoFocus,
  defaultValue = "",
  onSearch,
}: SearchFieldProps) {
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
        "flex items-center gap-3 border-b border-ink pb-3 pt-1",
        className,
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-ink" strokeWidth={1.75} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="serif flex-1 bg-transparent text-[22px] font-semibold text-ink placeholder-faint outline-none sm:text-[28px]"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            onSearch?.("");
          }}
          aria-label="Clear search"
          className="rounded-full p-1 text-muted transition hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
