import type { MetadataRoute } from "next";

const BASE_URL = "https://livesofascore.online";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/search", "/search/*", "/*?*"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/*.js$", "/*.css$", "/*.png$", "/*.webp$", "/*.avif$"],
        disallow: ["/api/", "/_next/static/chunks/", "/search"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/search"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/search"],
      },
      {
        userAgent: ["YandexBot", "Slurp", "Applebot"],
        allow: "/",
        disallow: ["/api/", "/search"],
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
