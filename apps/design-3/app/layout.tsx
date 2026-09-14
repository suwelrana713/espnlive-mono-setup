import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SideRailAds } from "@/ads/SideRailAds";
import { ClickGatedAds } from "@/ads/ClickGatedAds";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://kickoffstreams.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KickoffStreams — Watch Live Sports Free in HD",
    template: "%s · KickoffStreams",
  },
  description:
    "Every kickoff, live and free. Watch football, basketball, tennis, cricket, F1, MMA and more in HD. Live scores, streams and full fixture list — no signup, no paywall.",
  keywords: [
    "kickoffstreams",
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
    "sports streaming site no signup",
  ],
  authors: [{ name: "KickoffStreams", url: BASE_URL }],
  creator: "KickoffStreams",
  publisher: "KickoffStreams",
  category: "Sports",
  applicationName: "KickoffStreams",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "KickoffStreams",
    title: "KickoffStreams — Watch Live Sports Free in HD",
    description:
      "Every kickoff, live and free. Football, basketball, tennis, cricket and more — HD streams, no signup.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "KickoffStreams — Every kickoff. Live. Free.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kickoffstreams",
    creator: "@kickoffstreams",
    title: "KickoffStreams — Watch Live Sports Free in HD",
    description:
      "Every kickoff, live and free. Football, basketball, cricket and more in HD.",
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
  alternates: {
    canonical: BASE_URL,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#00A651",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KickoffStreams",
  alternateName: "KickoffStreams.online",
  url: BASE_URL,
  description:
    "Free live sports streaming — football, basketball, tennis, cricket, F1, MMA and more in HD.",
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
  name: "KickoffStreams",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  slogan: "Every kickoff. Live. Free.",
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
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
      <body className="relative flex min-h-dvh flex-col overflow-x-hidden bg-paper text-ink antialiased">
        <Providers>
          <SiteHeader />
          <SideRailAds />
          <main id="main" className="relative z-[1] flex-1">
            {children}
          </main>
          <SiteFooter />
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
