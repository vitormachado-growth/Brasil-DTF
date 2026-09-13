import { BlurFade } from "@/components/animation/gsap/blur-fade";
import { ScrollAura } from "@/components/animation/gsap/scroll-aura";
import { supplies, suppliesContent } from "../data/supplies.content";
import { SupplyCard } from "./supply-card";

/**
 * The supplies, second in the order the client set (impressoras, insumos,
 * programas e suporte). Same skeleton as the machines section so the two read
 * as one catalogue: centred header, one labelled group per category, cards
 * arriving on scroll.
 *
 * Four groups in the client's own order: tintas, rolos, pó, folhas. Two of
 * them hold a single product today. They still get their own header rather
 * than being folded into a "outros" pile, because the order was his and a
 * category with one item is still a category the buyer looks for by name.
 *
 * The grid is one column denser than the machines': four across on a wide
 * screen instead of three. Supplies are small objects at small prices and
 * the reader is scanning for a colour or a size, not weighing a purchase.
 */
export const SuppliesSection = () => (
  <section
    id="insumos"
    aria-labelledby="insumos-heading"
    className="relative border-t border-ink-600 bg-ink-900 py-20 lg:py-28"
  >
    <div className="mx-auto flex max-w-shell flex-col gap-14 px-5 sm:px-8 lg:gap-20">
      <header className="flex flex-col items-center gap-5 text-center">
        <BlurFade inView y={10}>
          <p className="type-spec flex items-center justify-center gap-3 text-accent">
            <span aria-hidden className="h-px w-8 bg-accent-line" />
            {suppliesContent.eyebrow}
            <span aria-hidden className="h-px w-8 bg-accent-line" />
          </p>
        </BlurFade>

        <BlurFade inView y={14}>
          <h2
            id="insumos-heading"
            className="type-display max-w-[20ch] text-balance text-[clamp(1.75rem,3.1vw,3.5rem)] text-paper"
          >
            {suppliesContent.heading}
          </h2>
        </BlurFade>

        <BlurFade inView y={12}>
          <p className="max-w-[54ch] text-balance text-lead leading-relaxed text-muted">
            {suppliesContent.lead}
          </p>
        </BlurFade>
      </header>

      {suppliesContent.groups.map((group) => {
        const list = supplies.filter((supply) => supply.group === group.key);

        return (
          <div key={group.key} className="flex flex-col gap-7">
            <BlurFade inView y={10}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink-600 pb-4">
                <h3 className="type-display text-lg text-paper">
                  {group.label}
                </h3>
                <p className="text-sm text-muted-2">{group.note}</p>
                <span className="type-spec ml-auto text-muted-2">
                  {list.length} {list.length === 1 ? "item" : "itens"}
                </span>
              </div>
            </BlurFade>

            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
              {list.map((supply, index) => (
                <BlurFade
                  key={supply.slug}
                  as="li"
                  inView
                  y={16}
                  delay={(index % 4) * 0.06}
                  className="flex"
                >
                  <SupplyCard
                    supply={supply}
                    ctaLabel={suppliesContent.cardCta}
                  />
                </BlurFade>
              ))}
            </ul>
          </div>
        );
      })}

      <BlurFade inView y={8}>
        <p className="type-spec text-center text-muted-2">
          {suppliesContent.disclaimer}
        </p>
      </BlurFade>
    </div>

    {/* Same light as the machines above, so the two grids read as one
        catalogue rather than two treatments. */}
    <ScrollAura scope="#insumos" />
  </section>
);
