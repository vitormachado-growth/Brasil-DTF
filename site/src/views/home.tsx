import { BrandIntro } from "@/modules/intro/components/brand-intro";
import { SiteHeader } from "@/modules/shell/components/site-header";
import { SiteFooter } from "@/modules/shell/components/site-footer";
import { Hero } from "@/modules/hero/components/hero";
import { MachinesSection } from "@/modules/machines/components/machines-section";
import { SuppliesSection } from "@/modules/supplies/components/supplies-section";
import { AboutSection } from "@/modules/about/components/about-section";
import { SupportSection } from "@/modules/support/components/support-section";

/**
 * Home view. Server Component: it assembles the page and hands each module its
 * own content, while the animation stays in the client leaves.
 */
export const HomeView = () => (
  <>
    <BrandIntro />

    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
    >
      Pular para o conteúdo
    </a>

    <SiteHeader />

    <main id="main">
      <Hero />
      <MachinesSection />
      <SuppliesSection />
      <AboutSection />
      <SupportSection />
    </main>

    <SiteFooter />
  </>
);
