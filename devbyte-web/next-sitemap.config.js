import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  siteUrl: "https://devbyte.com.ar",
  generateRobots: false,
  generateIndexSitemap: true,
  robots: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/_next/", "/admin/"] },
    ],
  },
  sitemap: [
    { loc: "/", lastmod: "auto", changefreq: "weekly", priority: 1.0 },
    { loc: "/servicios", changefreq: "weekly", priority: 0.9 },
    { loc: "/portfolio", changefreq: "weekly", priority: 0.8 },
    { loc: "/blog", changefreq: "weekly", priority: 0.8 },
    { loc: "/contacto", changefreq: "weekly", priority: 0.9 },
    { loc: "/sobre-nosotros", changefreq: "monthly", priority: 0.6 },
  ],
};

module.exports = nextConfig;
