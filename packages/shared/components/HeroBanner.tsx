"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Calendar,
  Zap,
  ChevronLeft,
  ChevronRight,
  Wifi,
} from "lucide-react";
import type { Match } from "@/lib/types";
import { getMatchStatus, formatMatchDate, formatMatchTime } from "@/lib/types";
import { getBadgeUrl, getPosterUrl } from "@/lib/utils";
import { LiveBadge, UpcomingBadge } from "./LiveBadge";

interface HeroBannerProps {
  match: Match[];
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function HeroBanner({ match: matches }: HeroBannerProps) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const total = matches.length;

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % total);
    }, 6000);
    return () => clearInterval(t);
  }, [total]);

  if (!total) return null;

  const match = matches[idx];
  const status = getMatchStatus(match.date);
  const isLive = status === "live";

  function go(delta: number) {
    setDir(delta);
    setIdx((i) => (i + delta + total) % total);
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl border border-white/8 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
      {/* Poster BG */}
      {match.poster && (
        <div className="absolute inset-0">
          <Image
            src={getPosterUrl(match.poster)}
            alt={match.title}
            fill
            className="object-cover opacity-15 scale-105"
            unoptimized
            priority
          />
        </div>
      )}

      {/* Gradient layers */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isLive
            ? "bg-[radial-gradient(ellipse_at_top,_#7f1d1d44_0%,_#00000000_60%)]"
            : "bg-[radial-gradient(ellipse_at_top,_#1e1b4b44_0%,_#00000000_60%)]"
        }`}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/60 to-black/90" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50" />

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex flex-1 flex-col"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6">
            <div className="flex items-center gap-2.5">
              {isLive ? <LiveBadge /> : <UpcomingBadge />}
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {match.category.replace("-", " ")}
              </span>
            </div>
            {isLive && (
              <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-white/40 backdrop-blur-sm">
                <Wifi className="h-3 w-3 text-emerald-400" />
                {match.sources.length} streams
              </div>
            )}
          </div>

          {/* Match display */}
          <div className="flex flex-1 flex-col items-center justify-center px-5 py-4 sm:px-8 sm:py-5">
            {match.teams ? (
              <div className="w-full max-w-2xl">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
                  {/* Home team */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4"
                  >
                    {/* <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16 lg:h-20 lg:w-20 drop-shadow-[0_0_16px_rgba(255,255,255,0.18)]">
                      <Image
                        src={getBadgeUrl(match.teams.home.badge)}
                        alt={match.teams.home.name}
                        fill
                        className="object-contain"
                        unoptimized
                        priority
                      />
                    </div> */}
                    <span className="text-center text-sm font-black leading-tight text-white sm:text-left sm:text-lg lg:text-xl">
                      {match.teams.home.name}
                    </span>
                  </motion.div>

                  {/* Center score / VS */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="flex flex-col items-center gap-1"
                  >
                    {isLive ? (
                      <div className="flex flex-col items-center gap-1 rounded-xl border border-red-500/25 bg-red-950/40 px-4 py-3 backdrop-blur-md shadow-lg shadow-red-950/40">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">
                          Live
                        </span>
                        <div className="h-px w-6 bg-red-500/30" />
                        <span className="text-[10px] text-white/40">Now</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-md">
                        <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
                          VS
                        </span>
                        <div className="h-px w-6 bg-white/10" />
                        <span className="text-[10px] font-semibold text-white/50">
                          {formatMatchTime(match.date)}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Away team */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="flex flex-col items-center gap-2 sm:flex-row-reverse sm:items-center sm:gap-4"
                  >
                    {/* <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16 lg:h-20 lg:w-20 drop-shadow-[0_0_16px_rgba(255,255,255,0.18)]">
                      <Image
                        src={getBadgeUrl(match.teams.away.badge)}
                        alt={match.teams.away.name}
                        fill
                        className="object-contain"
                        unoptimized
                        priority
                      />
                    </div> */}
                    <span className="text-center text-sm font-black leading-tight text-white sm:text-right sm:text-lg lg:text-xl">
                      {match.teams.away.name}
                    </span>
                  </motion.div>
                </div>
              </div>
            ) : (
              <h1 className="max-w-xl text-center text-3xl font-black leading-tight text-white sm:text-5xl">
                {match.title}
              </h1>
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 bg-black/30 px-5 py-3 backdrop-blur-sm sm:px-8">
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatMatchDate(match.date)} · {formatMatchTime(match.date)}
              </span>
            </div>
            <Link
              href={`/match/${match.id}?cat=${match.category}`}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all active:scale-95 ${
                isLive
                  ? "bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/50"
                  : "bg-white/10 hover:bg-white/18 border border-white/10"
              }`}
            >
              {isLive ? (
                <>
                  <Zap className="h-4 w-4" />
                  Watch Live
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  View Match
                </>
              )}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      {total > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 -translate-y-8 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/60 backdrop-blur-sm transition hover:bg-black/80 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 -translate-y-8 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/60 backdrop-blur-sm transition hover:bg-black/80 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {matches.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDir(i > idx ? 1 : -1);
                  setIdx(i);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "w-5 bg-white"
                    : "w-1 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
