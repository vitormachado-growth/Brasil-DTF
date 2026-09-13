import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { machines } from "@/modules/machines/data/machines.content";

// Gerado uma vez no build e gravado como arquivo, porque no site estático não
// há servidor para montá-lo a cada pedido.
export const dynamic = "force-static";

/**
 * Gera o `/sitemap.xml`: a home mais uma entrada por página de máquina.
 *
 * As páginas de máquina saem da mesma lista que monta o catálogo, então uma
 * máquina nova entra no sitemap sozinha. Sitemap escrito à mão é sitemap que
 * envelhece calado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...machines.map((machine) => ({
      url: `${siteConfig.url}/maquinas/${machine.slug}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
