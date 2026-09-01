import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/search?"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://espnlive.online/sitemap.xml",
    host: "https://espnlive.online",
  };
}
