/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "Brasil DTF: Máquinas e Insumos para DTF Têxtil e DTF UV",
  description:
    "Impressoras, tintas, filmes e pó para DTF têxtil e DTF UV. Entrega para todo o Brasil, com treinamento e suporte de quem estampa todo dia.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD.
   *
   * CONFIRMAR: o domínio da landing page ainda não foi definido. Definir
   * `NEXT_PUBLIC_SITE_URL` no deploy assim que fechar.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Default Open Graph / Twitter share image. The live image is generated at
   * `src/app/opengraph-image.tsx`; this path is the JSON-LD fallback.
   */
  ogImage: "/opengraph-image",
  twitterHandle: "@brasildtf",
  author: "Brasil DTF",
  /** Browser theme-color (address bar / PWA). Matches the page ground. */
  themeColor: "#0e0f11",
} as const;
