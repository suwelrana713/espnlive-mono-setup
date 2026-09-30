import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getMatchesBySport, getSports } from "@/lib/api";
import { getMatchStatus } from "@/lib/types";
import { MatchTile } from "@/components/MatchTile";
import { MatchesLoadMore } from "@/components/MatchesLoadMore";
import { SectionBar } from "@/components/SectionBar";
import { TileGridSkeleton } from "@/components/Skeletons";
import { EmptyBlock } from "@/components/EmptyBlock";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

interface Props {
  params: Promise<{ sport: string }>;
}

const BASE_URL = "https://livesofascore.online";

const SPORT_COPY: Record<
  string,
  { display: string; kw: string[]; intro: string }
> = {
  football: {
    display: "Football",
    kw: [
      "football live score",
      "soccer live score",
      "live football streaming free",
      "watch football live",
      "premier league live score",
      "la liga live score",
      "champions league live stream",
    ],
    intro:
      "Live football scores, fixtures and free HD streams — Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, Europa League, World Cup qualifiers and more.",
  },
  basketball: {
    display: "Basketball",
    kw: [
      "basketball live score",
      "nba live score",
      "nba live stream free",
      "watch basketball live",
      "euroleague live score",
    ],
    intro:
      "Live basketball scores and free HD streams — NBA, EuroLeague, NCAA, WNBA and international games.",
  },
  "american-football": {
    display: "American Football",
    kw: [
      "nfl live score",
      "nfl live stream free",
      "college football live stream",
      "american football live",
    ],
    intro:
      "Live NFL scores, fixtures and free HD streams — regular season, playoffs, Super Bowl and college football.",
  },
  hockey: {
    display: "Hockey",
    kw: [
      "nhl live score",
      "hockey live stream free",
      "ice hockey live score",
      "khl live stream",
    ],
    intro:
      "Live ice hockey scores and free HD streams — NHL, KHL, SHL, Champions Hockey League and internationals.",
  },
  baseball: {
    display: "Baseball",
    kw: [
      "mlb live score",
      "mlb live stream free",
      "baseball live score",
      "nippon baseball live",
    ],
    intro:
      "Live MLB scores and free HD streams — regular season, postseason, World Series and international leagues.",
  },
  "motor-sports": {
    display: "Motor Sports",
    kw: [
      "f1 live timing",
      "formula 1 live stream free",
      "motogp live stream",
      "nascar live stream",
      "motorsport live",
    ],
    intro:
      "Live motor sports timing and free HD streams — Formula 1, MotoGP, NASCAR, WRC and Formula E.",
  },
  fight: {
    display: "MMA / Boxing",
    kw: [
      "ufc live stream free",
      "mma live results",
      "boxing live stream",
      "ppv live stream free",
    ],
    intro:
      "Live MMA and boxing results with free HD streams — UFC, Bellator, ONE Championship, PFL and major boxing PPVs.",
  },
  tennis: {
    display: "Tennis",
    kw: [
      "tennis live score",
      "atp live score",
      "wta live score",
      "grand slam live stream",
      "wimbledon live stream free",
    ],
    intro:
      "Live tennis scores and free HD streams — ATP, WTA, Grand Slams (Australian Open, Roland Garros, Wimbledon, US Open) and Davis Cup.",
  },
  cricket: {
    display: "Cricket",
    kw: [
      "cricket live score",
      "ipl live score",
      "psl live stream free",
      "world cup cricket live",
      "test match live score",
    ],
    intro:
      "Live cricket scores and free HD streams — IPL, PSL, Big Bash, ICC World Cup, T20 internationals and Test matches.",
  },
  rugby: {
    display: "Rugby",
    kw: [
      "rugby live score",
      "six nations live stream",
      "rugby world cup live",
      "premiership rugby stream",
    ],
    intro:
      "Live rugby scores and free HD streams — Six Nations, Rugby Championship, Rugby World Cup, Premiership and Super Rugby.",
  },
  golf: {
    display: "Golf",
    kw: [
      "golf live leaderboard",
      "pga live stream free",
      "the masters live stream",
      "ryder cup live",
    ],
    intro:
      "Live golf leaderboards and free HD streams — PGA Tour, DP World Tour, LPGA, majors and the Ryder Cup.",
  },
  darts: {
    display: "Darts",
    kw: [
      "darts live score",
      "pdc live stream free",
      "world darts championship live",
    ],
    intro:
      "Live darts scores and free HD streams — PDC World Championship, Premier League Darts, Grand Slam and majors.",
  },
};

function sportCopy(sport: string) {
  const fallbackName = sport
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    SPORT_COPY[sport] ?? {
      display: fallbackName,
      kw: [
        `${fallbackName.toLowerCase()} live score`,
        `${fallbackName.toLowerCase()} live stream free`,
      ],
      intro: `Live ${fallbackName.toLowerCase()} scores and free HD streams — every fixture, one signal.`,
    }
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport } = await params;
  const copy = sportCopy(sport);
  const sportUrl = `${BASE_URL}/sports/${sport}`;
  const title = `${copy.display} Live Scores & Free Live Streams`;
  const description = `${copy.intro} Live scores, fixtures and multiple free HD stream sources — refreshed every minute.`;
  return {
    title,
    description,
    keywords: copy.kw,
    alternates: { canonical: sportUrl },
    openGraph: {
      type: "website",
      url: sportUrl,
      title,
      description,
      siteName: "Live Score",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `Live ${copy.display} Streams & Scores`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const revalidate = 60;
export const dynamicParams = true;

const PRERENDER_SPORTS = [
  "football",
  "basketball",
  "american-football",
  "hockey",
  "baseball",
  "motor-sports",
  "fight",
  "tennis",
  "cricket",
  "rugby",
  "golf",
  "darts",
];

export function generateStaticParams() {
  return PRERENDER_SPORTS.map((sport) => ({ sport }));
}

async function ChannelListing({ sport }: { sport: string }) {
  const matches = await getMatchesBySport(sport).catch(() => []);
  if (!matches.length) {
    return (
      <EmptyBlock
        title="Channel offline"
        description={`No ${sport.replace("-", " ")} broadcasts scheduled right now.`}
      />
    );
  }

  const live = matches.filter((m) => getMatchStatus(m.date) === "live");
  const upcoming = matches.filter(
    (m) => getMatchStatus(m.date) === "upcoming",
  );
  const finished = matches.filter(
    (m) => getMatchStatus(m.date) === "finished",
  );

  return (
    <div className="space-y-16">
      {live.length > 0 && (
        <section>
          <SectionBar
            code="A"
            eyebrow={`On air · ${live.length} broadcast${live.length === 1 ? "" : "s"}`}
            title="Live now"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((m, i) => (
              <MatchTile key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}

      {live.length > 0 && upcoming.length > 0 && (
        <div className="rounded-panel border border-line-2 bg-panel py-3">
          <ResponsiveAd mobile="320x50" desktop="468x60" />
        </div>
      )}

      {upcoming.length > 0 && (
        <section>
          <SectionBar
            code="B"
            eyebrow={`Scheduled · ${upcoming.length} broadcast${upcoming.length === 1 ? "" : "s"}`}
            title="On deck"
          />
          <MatchesLoadMore matches={upcoming} step={12} />
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <SectionBar
            code="C"
            eyebrow="Archive · Full time"
            title="Recent broadcasts"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {finished.slice(0, 6).map((m, i) => (
              <MatchTile key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default async function SportPage({ params }: Props) {
  const { sport } = await params;
  const sports = await getSports().catch(() => []);
  const sportData = sports.find((s) => s.id === sport);
  if (!sportData && !sports.length) notFound();
  const copy = sportCopy(sport);
  const name = sportData?.name ?? copy.display;
  const sportUrl = `${BASE_URL}/sports/${sport}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sports",
        item: `${BASE_URL}/sports`,
      },
      { "@type": "ListItem", position: 3, name, item: sportUrl },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${name} — Live Scores & Free Streams`,
    url: sportUrl,
    description: copy.intro,
    isPartOf: { "@type": "WebSite", url: BASE_URL, name: "Live Score" },
    about: { "@type": "Thing", name },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Where can I watch ${name.toLowerCase()} live streams for free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `On Live Score (livesofascore.online). Every ${name.toLowerCase()} match on this page has multiple free HD mirror streams — no signup required.`,
        },
      },
      {
        "@type": "Question",
        name: `How often are ${name.toLowerCase()} live scores updated?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Live ${name.toLowerCase()} scores and fixtures on Live Score are refreshed every minute from the source.`,
        },
      },
      {
        "@type": "Question",
        name: `Is a Live Score account required to watch ${name.toLowerCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All live streams and live scores are free and open — no signup, no subscription, no credit card.",
        },
      },
    ],
  };

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="border-b border-line pb-8">
        <Link
          href="/sports"
          className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fg-dim transition hover:text-neon"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Back to channels
        </Link>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
              // Channel · {sport}
            </p>
            <h1 className="display mt-3 text-3xl sm:text-4xl md:text-[52px] font-bold leading-[0.95] text-fg sm:text-[80px]">
              {name} Live Scores &amp; Free Streams
            </h1>
          </div>
          <p className="max-w-sm text-fg-mid lg:text-right">{copy.intro}</p>
        </div>
      </div>

      <div className="my-10 rounded-panel border border-line-2 bg-panel py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <Suspense fallback={<TileGridSkeleton count={6} />}>
        <ChannelListing sport={sport} />
      </Suspense>

      <div className="mt-14">
        <AdNativeBanner />
      </div>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="display text-2xl font-bold text-fg">
          About {name.toLowerCase()} on Live Score
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-mid">
          {copy.intro} Every fixture links to multiple mirror streams so at
          least one feed is always available. Live {name.toLowerCase()} scores
          are updated every minute from the source — a fast SofaScore-style
          alternative with the added bonus of free HD live streams.
        </p>
      </section>
    </div>
  );
}
