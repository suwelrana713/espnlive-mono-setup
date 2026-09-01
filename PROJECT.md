# ESPN Live — Project Manual

Complete reference for humans and AI agents. Read this once instead of re-auditing.

---

## 1. What this is

**Product:** `espnlive.online` — free live sports streaming aggregator.
**Business model:** Ads only (Adsterra). No paywall, no registration.
**Content:** Does NOT host video. Aggregates public embeds from `streamed.pk`.
**Target users:** Sports fans looking for live football, basketball, tennis, cricket, MMA, F1, hockey, baseball, etc.

**Legal posture:** Aggregator/index. Third-party embed disclaimer in Footer + About + Contact/DMCA route.

---

## 2. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.2.9** (App Router, Turbopack) | **Breaking changes vs Next ≤14**. Check `node_modules/next/dist/docs/` before assuming APIs. |
| Runtime | React 19.2.4 | Server Components default. |
| Package manager | pnpm | `pnpm-lock.yaml` committed. |
| Styles | Tailwind CSS v4 + `@tailwindcss/postcss` | Theme tokens in `app/globals.css` `@theme inline` block. |
| UI primitives | Radix (dialog, dropdown, select, tabs, tooltip) + `class-variance-authority` + `clsx` + `tailwind-merge` (`cn()`) | |
| Motion | framer-motion 12 | Respect `useReducedMotion()`. |
| Icons | lucide-react | |
| Data (client) | @tanstack/react-query 5 | See `hooks/`. |
| Data (server) | React `cache()` + `fetch` with `next: { revalidate }` | See `lib/api.ts`. |
| Fonts | `next/font/google` — Geist | Loaded in `app/layout.tsx`. |
| TS | strict mode, `paths: { "@/*": ["./*"] }` | |

**Dev server:** `pnpm dev` → port **5003** (`next dev -p 5003`).
**Build:** `pnpm build` → `next build` (Turbopack).
**Lint:** `pnpm lint` → `eslint` with `eslint-config-next` core-web-vitals + typescript.

---

## 3. Data source (streamed.pk API)

**Base:** `https://streamed.pk/api` (also configured as `API_BASE` if `lib/config.ts` exists).
**Auth:** None. Public, unauth.
**Rate limit:** None documented. Aggressive polling gets throttled.

### Endpoints used

| Path | Returns | Used by |
|---|---|---|
| `GET /sports` | `Sport[]` | Home, Sports index, Sport page, Search |
| `GET /matches/live` | `Match[]` all live | Home Hero + LiveSection, sitemap |
| `GET /matches/all/popular` | `Match[]` trending | Home Hero + PopularSection, sitemap |
| `GET /matches/:sport` | `Match[]` per sport | Sport page, Schedule, home fallback, `getMatchById` fallback scan |
| `GET /stream/:source/:id` | `Stream[]` per source | Match page (server) + `useStreams` hook |

### Images

- Team badges: `https://streamed.pk/api/images/proxy/{path}` (via `getBadgeUrl` in `lib/utils.ts`)
- Match posters: `https://streamed.pk{path}` or absolute (via `getPosterUrl`)

`next.config.ts` `images.remotePatterns` allows `streamed.pk`. `images.unoptimized: true` is set — kills next/image optimization; toggle off when API supports proper sizing.

---

## 4. Domain model

`lib/types.ts`:

```ts
Sport         { id, name }
Team          { name, badge }
MatchSource   { source, id }
Match         { id, title, category, date, poster?, popular?, teams?, sources: MatchSource[] }
Stream        { id, streamNo, language, hd, embedUrl, source, viewers }
MatchStatus   'live' | 'upcoming' | 'finished'
```

### Match status rule

`getMatchStatus(date: number)`:
- `now - date` in `[0, 3h)` → **live**
- `date > now` → **upcoming**
- else → **finished**

**Business meaning:** matches are considered "live" for 3 hours after kickoff. Adjust `LIVE_WINDOW_MS` if you formalize the constant.

### Match ID

Provided by upstream. Passed as-is in URLs. `getMatchById` scans multiple sports because upstream has no id lookup endpoint — expensive N+1.

### `category` field

Slug like `football`, `american-football`, `motor-sports`. Used for:
- Filtering (`Match.category === "football"`)
- Card labels (`.replace("-", " ")`)
- Icon lookup (`components/SportCard.tsx` `SPORT_META` map)
- URL back-link on match page (`?cat=football`)

---

## 5. Routes

```
/                   Home         page.tsx      (revalidate=60, static prerendered)
/sports             Sports index page.tsx      (revalidate=300, static)
/sports/[sport]     Sport page   page.tsx      (dynamic, generateMetadata)
/schedule           Schedule     page.tsx      (revalidate=60, static)
/search             Search       page.tsx      (dynamic — reads ?q=)
/match/[id]         Match viewer page.tsx      (revalidate=30, dynamic, generateMetadata + JSON-LD)
/about              About        page.tsx      (static)
/contact            Contact      page.tsx      (form → formsubmit.co)
/sitemap.xml        Sitemap      app/sitemap.ts (revalidate=3600)
/robots.txt         Robots       app/robots.ts
```

**Params + searchParams are Promises in Next 16.** Must `await` in `page.tsx` and `generateMetadata`.

---

## 6. File map

### `app/`

| File | Purpose |
|---|---|
| `layout.tsx` | Root layout. Metadata, viewport, JSON-LD, GTM (`GTM-P6B38HG3`), preconnects. Wraps children in `<Providers>` (React Query). Ads (Popunder/SocialBar/SideRail) may be toggled here — currently some are commented. |
| `page.tsx` | Home. Sections: Hero, LiveNow, Trending, Upcoming, Sports Categories. Each wrapped in Suspense with skeleton. `revalidate = 60`. |
| `globals.css` | Tailwind v4 import + `@theme inline` tokens + scrollbar + selection styles + keyframes. Add `:focus-visible` + `prefers-reduced-motion` here. |
| `robots.ts` | Sitemap discovery. |
| `sitemap.ts` | Static routes + all 15 sport slugs + live+popular match URLs (deduped). `revalidate = 3600`. |
| `sports/page.tsx` | Sport catalog grid. `revalidate=300`. |
| `sports/[sport]/page.tsx` | Live/Upcoming/Finished sections per sport. `generateMetadata` produces per-sport SEO. |
| `schedule/page.tsx` | Fetches 7 core sports, dedupes, sorts by date, passes to `ScheduleClient`. |
| `schedule/ScheduleClient.tsx` | Client component: day picker + sport filter. Uses `useSyncExternalStore` (or effect) for today/tomorrow keys to avoid SSR mismatch. |
| `search/page.tsx` | Reads `?q=`, renders `SearchClient`. |
| `search/SearchClient.tsx` | Client: uses `useAllMatches` + `useSports`. Filters by title/team/category. |
| `match/[id]/page.tsx` | Match detail. Fetches match, streams (parallel per source), related. Emits SportsEvent JSON-LD. |
| `match/[id]/MatchViewer.tsx` | Client. Renders `<VideoPlayer>` for selected stream + `<StreamCard>` list. |
| `match/[id]/ShareButton.tsx` | Client. Web Share API → clipboard fallback. |
| `about/page.tsx` | Static about + disclaimer. |
| `contact/page.tsx` | Static form → `formsubmit.co/teamrootdevs@gmail.com`. |

### `components/`

| File | Purpose |
|---|---|
| `Navbar.tsx` | Sticky top nav. Client. Logo, links, search, mobile menu. |
| `Footer.tsx` | Site-wide footer with legal disclaimer. |
| `HeroBanner.tsx` | Client carousel of up to 8 featured matches. Auto-rotate 6s (respect reduced motion). |
| `MatchCard.tsx` | Client. Match tile with teams + badges + status + link. |
| `StreamCard.tsx` | Client. Selectable stream option (language, HD, viewers). |
| `SportCard.tsx` | Client. Sport category tile with icon+color from `SPORT_META`. |
| `VideoPlayer.tsx` | Client. iframe wrapper + fullscreen toggle. Reads `embedUrl` from upstream. **MUST have `sandbox` attr for safety.** |
| `SearchBar.tsx` | Client. Debounced (300ms) search input. Router push on submit. |
| `LiveBadge.tsx` | `<LiveBadge>` (red pulse) + `<UpcomingBadge>` (cyan). |
| `LoadingSkeleton.tsx` | `MatchCardSkeleton`, `SportCardSkeleton`, `HeroSkeleton`, `GridSkeleton`. |
| `EmptyState.tsx` | Generic empty-state block. |
| `ErrorState.tsx` | Generic error block. **Currently unused — candidate for deletion.** |
| `providers.tsx` | Client. `<QueryClientProvider>` + `<ReactQueryDevtools>`. Wrap dev tools in `NODE_ENV !== 'production'` guard. |
| `ads/adConfig.ts` | Adsterra keys and URLs (single source of truth). |
| `ads/AdBanner.tsx` | Isolated `srcdoc` iframe per banner (fixes `atOptions` global collision). `<ResponsiveAd>` for mobile/desktop swap. |
| `ads/AdNativeBanner.tsx` | Dynamic script injection with cleanup. |
| `ads/AdSocialBar.tsx` | `next/script` lazyOnload. |
| `ads/AdPopunder.tsx` | `next/script` lazyOnload. |
| `ads/SideRailAds.tsx` | Fixed sticky 160x600 rails outside main container, `2xl:block`. |

### `lib/`

| File | Purpose |
|---|---|
| `types.ts` | Domain types + `getMatchStatus`, `formatMatchDate`, `formatMatchTime`. |
| `api.ts` | Fetchers. `getSports`, `getMatchesBySport`, `getLiveMatches`, `getPopularMatches`, `getAllMatches`, `getStreams`, `getMatchById`. All wrap `fetch` with `next: { revalidate: 60 }`. Wrap each with React `cache()` for request-level dedup. |
| `utils.ts` | `cn()` classname helper, `BASE_URL` = `https://streamed.pk`, `getBadgeUrl`, `getPosterUrl`. |
| `query-client.ts` | React Query client factory + browser singleton. |
| `config.ts` (if present) | `SITE_URL`, `API_BASE`, sports catalogs, timing constants, `isSafeEmbedUrl` allowlist. |

### `hooks/`

| Hook | Fetches |
|---|---|
| `useSports()` | `/sports`. `staleTime = 10 min`. |
| `useLiveMatches()` | `/matches/live`. `refetchInterval = 30s`. |
| `usePopularMatches()` | `/matches/all/popular`. `staleTime = 5 min`. |
| `useMatchesBySport(sport)` | `/matches/:sport`. Enabled if slug present. |
| `useAllMatches()` | Merges 9 sport calls. `staleTime = 2 min`. |
| `useMatchById(id)` | Scan-based. |
| `useStreams(sources)` | Aggregates `/stream/:source/:id` per source. `refetchInterval = 60s`. |

---

## 7. Rendering strategy

| Route | Mode | Reason |
|---|---|---|
| `/` | Static + ISR 60s | Live-adjacent but tolerates 1min stale |
| `/sports` | Static + ISR 300s | Catalog changes rarely |
| `/sports/[sport]` | Dynamic | Per-slug — could switch to `generateStaticParams` on the 15 known slugs |
| `/schedule` | Static + ISR 60s | Daily view |
| `/search` | Dynamic | Reads `?q` |
| `/match/[id]` | Dynamic + ISR 30s | Time-sensitive, per-match |

**Suspense boundaries** on home for each section — sections load independently.

---

## 8. Metadata + SEO

- Root defaults in `app/layout.tsx` `metadata` export.
- Per-route overrides: About, Contact, Search, Schedule, Sports, Sports/[sport], Match/[id].
- **JSON-LD:**
  - Global (layout): `WebSite` + `Organization`
  - Per-match: `SportsEvent` with teams, startDate, organizer
- **OG + Twitter:** every route should have `openGraph` + `twitter` blocks with image (default `/og-image.png`, match uses `match.poster`).
- **Canonical:** every route sets `alternates.canonical`.
- **Sitemap:** static + sport slugs + live/popular matches. `robots.ts` allows all + points to sitemap.

---

## 9. Ads (Adsterra)

**All keys in `components/ads/adConfig.ts`.**

| Format | Component | Placement |
|---|---|---|
| Popunder + Social Bar (click-gated) | `ClickGatedAds` | site-wide (layout body). Injects socialbar OR popunder script (random 50/50) on every **5th** user click, resets counter. First 4 clicks clean. Counter in `sessionStorage['espnlive_ads_click_count']`. Ignores clicks inside `[data-ad-slot]` and `iframe`. Replaces always-on `AdSocialBar` + `AdPopunder`. |
| Native Banner | `AdNativeBanner` | home mid-feed + match page below player + sport listing bottom + schedule bottom |
| 728x90 / 320x50 responsive | `<ResponsiveAd mobile="320x50" desktop="728x90"/>` | top of each content route |
| 468x60 / 320x50 responsive | `<ResponsiveAd mobile="320x50" desktop="468x60"/>` | sport page section-break (between Live ↔ Upcoming, only when both exist) |
| 728x90 / 320x50 in-feed | `<ResponsiveAd mobile="320x50" desktop="728x90"/>` inside `MatchesLoadMore` | Auto-injected inside long match grids: sport `/sports/[sport]` Upcoming + `/schedule` day list. Only when total list ≥ 50 items. Injects after every 10 rendered cards (`AD_THRESHOLD=50`, `AD_INTERVAL=10` in `components/MatchesLoadMore.tsx`). Skips ad at last visible slot (avoids ad above Load-more button). |
| 300x250 | `<AdBanner size="300x250"/>` | match page sidebar top, home between sections |
| 160x600 | `<AdBanner size="160x600"/>` | match page sidebar bottom (xl+), side rails (2xl+) |
| 160x300 | `<AdBanner size="160x300"/>` | reserved for narrow sidebars |

**Legacy components (unused, safe to delete):** `AdPopunder.tsx`, `AdSocialBar.tsx` — superseded by `ClickGatedAds`.

**Per-page ad density (UX ceiling — do not exceed):**

| Page | Units | Status |
|---|---|---|
| Home | 5 | full — no more |
| Match | 5 | full — no more |
| Sport page | 3 base (top + section-break + bottom native) + in-feed ad every 10 cards when Upcoming ≥ 50 | at ceiling |
| Sports index | 2 | grid layout — do not break with inline ads |
| Schedule | 2 base + in-feed ad every 10 cards when day list ≥ 50 | at ceiling |
| Search | 1 | do not add — kills scan flow |
| About / Contact | 1 | low intent — do not add |

### Technical rules

- **atOptions collision:** every banner renders inside its own `srcdoc` iframe. Never inline `<script>` with `atOptions` — they stomp each other's config.
- **Click gating:** Popunder + SocialBar are NOT site-wide always-on. `ClickGatedAds` injects them lazily on every 5th user click (random pick between the two). Never re-add `<AdPopunder/>` or `<AdSocialBar/>` to layout — would double-serve.
- **Loading:** Banner iframes have `loading="lazy"`. Click-gated scripts inject only after threshold hit.
- **Sandbox:** ad iframes get `allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox` (popups needed for revenue). Banner wrapper `<div>` carries `data-ad-slot="banner"` so `ClickGatedAds` ignores clicks on ad chrome.
- **CSP:** if you re-add CSP header, must allowlist:
  ```
  script-src   *.profitableratecpmnetwork.com  *.highrevenueformat.com
  frame-src    *.profitableratecpmnetwork.com  *.highrevenueformat.com
  connect-src  *.profitableratecpmnetwork.com  *.highrevenueformat.com
  ```
- **Do NOT** add more ad units than listed — Adsterra bans over-monetized sites.

---

## 10. Security posture

**Current gaps** (audit-known — may or may not be fixed at any given time):

- iframe in `VideoPlayer.tsx` should have `sandbox="allow-same-origin allow-scripts allow-presentation"` + `embedUrl` should pass `isSafeEmbedUrl()` allowlist (hosts: `streamed.pk`, `embedstreams.top`, `embedme.top`).
- `next.config.ts` should include CSP + HSTS. Current file has only X-Frame-Options, X-Content-Type-Options, X-DNS-Prefetch-Control, Referrer-Policy, Permissions-Policy.
- `getMatchById` in `lib/api.ts` scans 15 sports for any lookup — DoS amplification. Wrap in `React.cache()` and fast-path live+popular first.
- GTM script in layout uses raw `dangerouslySetInnerHTML` — should use `next/script` (`strategy="afterInteractive"`).
- No rate-limiting on upstream API calls.

**Never do:**
- Never render `embedUrl` in an unsandboxed iframe.
- Never store secrets in code — no server env secrets exist today, don't introduce any without `.env.local` + `.gitignore` check.
- Never expose upstream API base to CORS-abusing rewrites.

---

## 11. Correctness rules (business logic)

1. **Match status window** is 3h from kickoff → `live`. Adjust `LIVE_WINDOW_MS` if changed.
2. **Home Hero** takes up to **8** featured matches, dedup by `id` across live+popular.
3. **Section limits:** Live/Popular/Upcoming/Related show max **6** matches each. Sports categories show max **10**.
4. **Football priority sort:** on home Live + Popular sections, football matches sort first.
5. **Schedule** shows only 7 core sports (`football, basketball, american-football, hockey, baseball, tennis, cricket`) — NOT the full 15-sport catalog. Full 15 sports listed in `SPORTS_CATALOG` in `lib/config.ts` (or duplicated across `lib/api.ts`, `sitemap.ts`, etc.).
6. **Sitemap** excludes finished matches (should) and encodes match IDs.
7. **`useAllMatches`** merges 9 sports (matches Schedule's 7 + 2 extras: `motor-sports`, `fight`).
8. **Related matches** on match page: same category, exclude self, take 4.
9. **Search debounce:** 300ms (`SEARCH_DEBOUNCE_MS`).
10. **Hero autoplay:** 6s (`HERO_AUTOPLAY_MS`). Skipped when `useReducedMotion()`.
11. **Query defaults:** staleTime 60s, refetchOnWindowFocus false, retry 2. Live streams poll 30s + 60s.

---

## 12. Conventions

- **Client vs Server:** default to server. Add `'use client'` only when using state, effects, browser APIs, or event handlers.
- **Async pattern:** `Promise.allSettled` for tolerating upstream failures. Fall through to empty arrays.
- **Params:** `params: Promise<{...}>` — always await.
- **Error handling:** `.catch(() => [])` on API calls in Server Components to render EmptyState instead of throwing.
- **Class names:** always via `cn()` from `lib/utils.ts`. No inline string concat.
- **No barrel index files** — import directly.
- **No CSS modules** — Tailwind only.
- **No tests** currently — if adding, use Vitest + Testing Library.

---

## 13. Constants (should live in `lib/config.ts`)

```ts
SITE_URL              = 'https://espnlive.online'
API_BASE              = 'https://streamed.pk/api'
IMAGE_BASE            = 'https://streamed.pk'
LIVE_WINDOW_MS        = 3 * 60 * 60 * 1000
HERO_AUTOPLAY_MS      = 6000
SEARCH_DEBOUNCE_MS    = 300
QUERY_STALE_MS        = 60 * 1000
CORE_SPORTS           = 9-item list used by home/hooks
SPORTS_CATALOG        = 15-item list used by sitemap/getMatchById
EMBED_ALLOWED_HOSTS   = Set for isSafeEmbedUrl
```

If not present, values are duplicated across files — search & unify when refactoring.

---

## 14. Third-party integrations

| Service | Purpose | Where |
|---|---|---|
| streamed.pk | Match + stream API | `lib/api.ts` |
| Adsterra | Monetization | `components/ads/*` |
| Google Tag Manager | Analytics | `app/layout.tsx` (`GTM-P6B38HG3`) |
| Google Fonts (Geist) | Typography | `app/layout.tsx` via `next/font/google` |
| formsubmit.co | Contact form action | `app/contact/page.tsx` → `teamrootdevs@gmail.com` |
| Next Image | streamed.pk poster/badge optimization | `next.config.ts` remotePatterns |

---

## 15. Deployment

- **Domain:** `espnlive.online`
- **Metadata base:** `SITE_URL` = `https://espnlive.online`
- **Dev port:** 5003
- Assumed target: Vercel or Node self-host (nothing platform-specific in code besides `next start`).
- **Cache headers:** `next.config.ts` sets `/sitemap.xml` to `s-maxage=3600`. Do NOT hand-set `/_next/static/*` cache (Next 16 handles it — warning emitted if you do).

---

## 16. Known audit findings (snapshot)

Categorized shortlist from the last full audit. Fix status varies — check current code.

**🔴 Critical**
- VideoPlayer iframe missing `sandbox` + URL allowlist
- Hydration mismatch: HeroBanner `setInterval` + ScheduleClient `Date.now()` in state init
- `getMatchById` N+1 without cache (DoS amplification)
- GTM injected raw via `dangerouslySetInnerHTML` in `<head>` — blocks FCP
- `images.unoptimized: true` kills next/image

**🟡 High**
- No CSP, no HSTS
- `types.ts` live window uses `<` not `<=` at boundary (off-by-one)
- ShareButton clipboard un-awaited, errors swallowed
- Missing `error.tsx`, `not-found.tsx`, `app/loading.tsx`
- OG/twitter missing on `/search`, `/schedule`, `/sports`
- `Navbar` logo `priority` steals LCP from hero
- Sitemap includes finished matches
- No `prefers-reduced-motion` global reset
- No skip-to-main link
- Icon-only buttons missing `aria-label` (SearchBar, VideoPlayer, Navbar, HeroBanner, ShareButton, StreamCard, ScheduleClient)

**🔵 Quality**
- `lucide-react` version pin looks odd (`^1.21.0` — verify)
- `ErrorState.tsx` unused
- `BASE_URL` duplicated across 4 files — consolidate to `lib/config.ts`
- Empty `verification.google: ''` string
- Magic numbers should be constants
- No tests

---

## 17. Do / Don't

**Do**
- Read `node_modules/next/dist/docs/` before assuming a Next API (v16 breaking changes).
- Use `React.cache()` for server-side fetch dedup.
- Wrap Ad banners in isolated iframes.
- Use `next/script` for third-party scripts.
- Await `params` / `searchParams`.
- Fall back gracefully with `.catch(() => [])` on API failures.

**Don't**
- Don't add more Adsterra units than listed in Section 9 density table.
- Don't re-enable always-on `AdPopunder`/`AdSocialBar` — they are click-gated via `ClickGatedAds` now.
- Don't drop the click threshold below 5 without user sign-off — UX priority.
- Don't render `embedUrl` without sandbox.
- Don't use `dangerouslySetInnerHTML` for scripts — use `next/script`.
- Don't call `Date.now()` in `useState` initializers (hydration).
- Don't set `_next/static` Cache-Control manually.
- Don't add features beyond what a change requires (see AGENTS.md conventions).

---

## 18. When AI agents work on this repo

Read this file first, then:
1. Check current file state (revert may have happened — see `git status`).
2. Refer to Section 11 (business logic) for rules that must not break.
3. Refer to Section 9 for ads placement — do not add units freely.
4. Refer to Section 10 for security posture — always sandbox iframes.
5. Refer to Section 16 for known issues; do not "discover" them again.
6. If task requires a new fetch, place in `lib/api.ts` with `React.cache()` wrapper + `next: { revalidate }`.
7. If task adds client interactivity, verify no hydration mismatch (Date.now / Math.random / window in state initializer → BAD).
8. Run `npx next build` before declaring done.
