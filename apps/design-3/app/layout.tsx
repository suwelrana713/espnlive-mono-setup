import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
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

const BASE_URL = "https://espnlive.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ESPN Live — Free Live Sports Streaming Online",
    template: "%s · ESPN Live",
  },
  description:
    "Watch live football, basketball, tennis, cricket and more sports online free in HD. Live scores, match streams, and upcoming fixtures — all in one place.",
  keywords: [
    "live sports streaming",
    "watch football live",
    "free sports stream",
    "live football stream",
    "soccer live stream free",
    "watch match online",
    "live sports online",
    "football match today",
    "basketball live stream",
    "sports streaming site",
    "HD sports stream",
    "watch cricket live",
  ],
  authors: [{ name: "ESPN Live", url: BASE_URL }],
  creator: "ESPN Live",
  publisher: "ESPN Live",
  category: "Sports",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "ESPN Live",
    title: "ESPN Live — Free Live Sports Streaming Online",
    description:
      "Watch live football, basketball, tennis, cricket and more sports free in HD. Live scores, streams and fixtures.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ESPN Live — Free Live Sports Streaming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESPN Live — Free Live Sports Streaming",
    description:
      "Watch live football, basketball, cricket and more free in HD.",
    images: ["/og-image.png"],
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
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ESPN Live",
  url: BASE_URL,
  description:
    "Free live sports streaming — football, basketball, tennis, cricket and more in HD.",
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
  name: "ESPN Live",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${BASE_URL}/contact`,
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
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P6B38HG3');`,
          }}
        />
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
      <body className="relative flex min-h-dvh flex-col bg-paper text-ink antialiased">
        <Providers>
          <SiteHeader />
          <SideRailAds />
          <main className="relative z-[1] flex-1">{children}</main>
          <SiteFooter />
        </Providers>
        <ClickGatedAds />
      </body>
    </html>
  );
}
