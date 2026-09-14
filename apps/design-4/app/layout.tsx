import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SideNav } from "@/components/SideNav";
import { MobileTopBar } from "@/components/MobileTopBar";
import { MobileTabBar } from "@/components/MobileTabBar";
import { SideRailAds } from "@/ads/SideRailAds";
import { ClickGatedAds } from "@/ads/ClickGatedAds";

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

const BASE_URL = "https://sportvibehub.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SportVibeHub — Catch the Vibe. Live Sports Streaming Free.",
    template: "%s // SportVibeHub",
  },
  description:
    "Catch the vibe. Live. Watch football, basketball, tennis, cricket, F1, MMA and more in HD — free, no signup, no paywall. The hub for every live sports vibe.",
  keywords: [
    "sportvibehub",
    "sport vibe hub",
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
    "sports streaming hub",
    "live sports vibe",
  ],
  authors: [{ name: "SportVibeHub", url: BASE_URL }],
  creator: "SportVibeHub",
  publisher: "SportVibeHub",
  category: "Sports",
  applicationName: "SportVibeHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "SportVibeHub",
    title: "SportVibeHub — Catch the Vibe. Live Sports Streaming Free.",
    description:
      "Catch the vibe. Live. Football, basketball, tennis, cricket and more in HD. Free.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SportVibeHub — Catch the vibe. Live.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sportvibehub",
    creator: "@sportvibehub",
    title: "SportVibeHub — Catch the Vibe. Live.",
    description:
      "Catch the vibe. Live. Football, basketball, cricket and more in HD — free.",
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
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "any" }],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
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
  name: "SportVibeHub",
  alternateName: "SportVibeHub.online",
  url: BASE_URL,
  description:
    "Catch the vibe. Live. Free live sports streaming — football, basketball, tennis, cricket, F1, MMA and more in HD.",
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
  name: "SportVibeHub",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  slogan: "Catch the vibe. Live.",
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
        <link rel="preconnect" href="https://streamed.pk" />
        <link rel="dns-prefetch" href="https://streamed.pk" />
      </head>
      <body className="min-h-dvh bg-void text-fg antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-[#7C3AED] focus:px-3 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-white"
        >
          Skip to main
        </a>
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
