import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

// Gerado uma vez no build e gravado como arquivo, porque no site estático não
// há servidor para montá-lo a cada pedido.
export const dynamic = "force-static";

/**
 * Generates `/robots.txt`. Allows all crawlers and points them at the sitemap.
 * Tighten the rules per environment (e.g. disallow `/` on staging).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
