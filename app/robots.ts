import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteOrigin();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/internal/"] }],
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
