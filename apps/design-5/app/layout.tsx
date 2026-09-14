import type { Metadata, Viewport } from "next";
import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { TopBar } from "@/components/TopBar";
import { LeftRail } from "@/components/LeftRail";
import { MobileTabs } from "@/components/MobileTabs";
import { SideRailAds } from "@/ads/SideRailAds";
import { ClickGatedAds } from "@/ads/ClickGatedAds";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = "https://fanzonelive.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FanZoneLive — Where Fans Watch Live Sports Free",
    template: "%s — FanZoneLive",
  },
  description:
    "Where fans watch live. Free HD streams of football, basketball, tennis, cricket, F1, MMA and more. Live scores, fixtures, mirrors — no signup, no paywall, one fan zone.",
  keywords: [
    "fanzonelive",
    "fan zone live",
    "live sports streaming free",
    "watch football live free",
    "free live football stream HD",
    "soccer live stream free",
    "watch match online free",
    "live sports online",
    "football match today live",
    "basketball live stream free",
    "cricket live stream",
    "F1 live stream free",
    "MMA live stream",
    "tennis live stream",
    "sports fan streaming",
    "live scores and streams",
  ],
  authors: [{ name: "FanZoneLive", url: BASE_URL }],
  creator: "FanZoneLive",
  publisher: "FanZoneLive",
  category: "Sports",
  applicationName: "FanZoneLive",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "FanZoneLive",
    title: "FanZoneLive — Where Fans Watch Live Sports Free",
    description:
      "Where fans watch live. Football, basketball, tennis, cricket and more in HD. Free, no signup.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FanZoneLive — Where fans watch live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fanzonelive",
    creator: "@fanzonelive",
    title: "FanZoneLive — Where Fans Watch Live Sports Free",
    description:
      "Where fans watch live. Football, basketball, cricket and more in HD — free.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: BASE_URL },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#FF6B00",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FanZoneLive",
  alternateName: "FanZoneLive.online",
  url: BASE_URL,
  description:
    "Where fans watch live. Free live sports streaming — football, basketball, tennis, cricket, F1, MMA and more in HD.",
  inLanguage: "en",
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
  name: "FanZoneLive",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  slogan: "Where fans watch live.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${BASE_URL}/contact`,
    availableLanguage: ["English"],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${plexMono.variable}`}
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
        <link rel="preconnect" href="https://streamed.pk" />
        <link rel="dns-prefetch" href="https://streamed.pk" />
      </head>
      <body className="min-h-dvh bg-bg text-ink antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-[#FF6B00] focus:px-3 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-white"
        >
          Skip to main
        </a>
        <Providers>
          <TopBar />
          <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:px-8">
            <LeftRail />
            <main id="main" className="min-w-0 flex-1 pb-24 lg:pb-8">
              {children}
            </main>
          </div>
          <MobileTabs />
          <SideRailAds />
        </Providers>
        <ClickGatedAds />
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
