import { SideRailAds } from "@/ads/SideRailAds";
import { MobileTabBar } from "@/components/MobileTabBar";
import { MobileTopBar } from "@/components/MobileTopBar";
import { Providers } from "@/components/providers";
import { SideNav } from "@/components/SideNav";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const BASE_URL = "https://livesofascore.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "Live Score — Live Scores, Fixtures & Free Sports Streams Online",
    template: "%s | Live Score",
  },
  description:
    "Live Score (livesofascore) — free live scores, fixtures, results and HD sports streams. Football, basketball, cricket, tennis, F1, MMA, NFL and more, updated every minute. A fast, ad-supported SofaScore-style live score alternative.",
  keywords: [
    "live score",
    "livescore",
    "live scores",
    "live scores today",
    "livesofascore",
    "live sofa score",
    "sofascore alternative",
    "sofa score live",
    "live football score",
    "soccer live score",
    "basketball live score",
    "cricket live score",
    "tennis live score",
    "nfl live score",
    "hockey live score",
    "f1 live timing",
    "mma live results",
    "live sports streaming free",
    "watch football live free",
    "free live sports stream",
    "live match streaming",
    "sports live today",
    "free sports streaming",
    "watch live sports online",
    "live sports scores and stream",
  ],
  authors: [{ name: "Live Score", url: BASE_URL }],
  creator: "Live Score",
  publisher: "Live Score",
  category: "Sports",
  applicationName: "Live Score",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Live Score",
    title: "Live Score — Free Live Sports Streaming & Live Scores",
    description:
      "Real-time live scores, fixtures and free HD streams for football, basketball, tennis, cricket, F1, MMA, NFL and more. No signup, no paywall.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Live Score — Live Sports Streams & Scores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@livescore",
    creator: "@livescore",
    title: "Live Score — Free Live Sports Streams & Scores",
    description:
      "Free live scores and HD sports streams. Football, basketball, cricket, tennis and more, refreshed every minute.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en": BASE_URL,
      "en-US": BASE_URL,
      "x-default": BASE_URL,
    },
    types: {
      "application/rss+xml": `${BASE_URL}/sitemap.xml`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Populate with real IDs once verified in Search Console / Bing.
    // google: "",
    // yandex: "",
    // other: { "msvalidate.01": "" },
  },
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Live Score",
  alternateName: ["LiveSofaScore", "livesofascore", "Live Score Online"],
  url: BASE_URL,
  description:
    "Free live scores, fixtures and HD sports streams for football, basketball, tennis, cricket, F1, MMA and more.",
  inLanguage: "en",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Live Score",
  alternateName: "LiveSofaScore",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 1003,
    height: 249,
  },
  slogan: "Free Live Sports Streams & Scores",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${BASE_URL}/contact`,
    availableLanguage: ["English"],
  },
  sameAs: [],
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Live Score",
  url: BASE_URL,
  applicationCategory: "SportsApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1284",
    bestRating: "5",
    worstRating: "1",
  },
};

const siteNavJsonLd = [
  { name: "Home", url: BASE_URL },
  { name: "Sports", url: `${BASE_URL}/sports` },
  { name: "Schedule", url: `${BASE_URL}/schedule` },
  { name: "About", url: `${BASE_URL}/about` },
  { name: "Contact", url: `${BASE_URL}/contact` },
  { name: "Football", url: `${BASE_URL}/sports/football` },
  { name: "Basketball", url: `${BASE_URL}/sports/basketball` },
  { name: "Tennis", url: `${BASE_URL}/sports/tennis` },
  { name: "Cricket", url: `${BASE_URL}/sports/cricket` },
  { name: "American Football", url: `${BASE_URL}/sports/american-football` },
  { name: "MMA", url: `${BASE_URL}/sports/fight` },
  { name: "Motor Sports", url: `${BASE_URL}/sports/motor-sports` },
].map((n) => ({
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: n.name,
  url: n.url,
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavJsonLd) }}
        />
        <link rel="preconnect" href="https://streamed.pk" />
        <link rel="dns-prefetch" href="https://streamed.pk" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-dvh bg-void text-fg antialiased overflow-x-hidden">
        <Providers>
          <div className="flex min-h-dvh">
            <SideNav />
            <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
              <MobileTopBar />
              <main id="main" className="relative flex-1 pb-24 lg:pb-0">
                {children}
              </main>
            </div>
          </div>
          <MobileTabBar />
          <SideRailAds />
        </Providers>
        {/* <ClickGatedAds /> */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P6B38HG3');`,
          }}
        />
      </body>
    </html>
  );
}
