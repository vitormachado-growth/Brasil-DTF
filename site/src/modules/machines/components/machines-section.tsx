import { BlurFade } from "@/components/animation/gsap/blur-fade";
import { ScrollAura } from "@/components/animation/gsap/scroll-aura";
import { machines, machinesContent } from "../data/machines.content";
import { MachineCard } from "./machine-card";

/**
 * The machines, which is the section the client asked for first: a menu where
 * the two things a buyer looks for, the price and what sets each one apart,
 * are the things you cannot miss.
 *
 * Split by line rather than sorted into one list. Têxtil and UV print onto
 * different materials for different businesses, so a single price ladder
 * mixing them would ask the reader to filter in their head. Inside each group
 * the order is by price, which is the ladder they place themselves on.
 *
 * Cards arrive on scroll, staggered along the row. That is the one animated
 * moment below the hero, and it is here because this is where the page asks
 * for a decision.
 */
export const MachinesSection = () => (
  <section
    id="impressoras"
    aria-labelledby="impressoras-heading"
    className="relative border-t border-ink-600 bg-ink-900 py-20 lg:py-28"
  >
    <div className="mx-auto flex max-w-shell flex-col gap-14 px-5 sm:px-8 lg:gap-20">
      {/* Centred, unlike the hero. The hero is two columns and its copy is the
          left one, so it aligns left against the video. Here the cards run the
          full width underneath, and a header pinned to the left edge leaves a
          third of a 1920 screen empty beside it. */}
      <header className="flex flex-col items-center gap-5 text-center">
        <BlurFade inView y={10}>
          {/* Rules on both sides: a single leading rule is a left-aligned
              device and reads as a mistake once the label is centred. */}
          <p className="type-spec flex items-center justify-center gap-3 text-accent">
            <span aria-hidden className="h-px w-8 bg-accent-line" />
            {machinesContent.eyebrow}
            <span aria-hidden className="h-px w-8 bg-accent-line" />
          </p>
        </BlurFade>

        <BlurFade inView y={14}>
          <h2
            id="impressoras-heading"
            className="type-display max-w-[20ch] text-balance text-[clamp(1.75rem,3.1vw,3.5rem)] text-paper"
          >
            {machinesContent.heading}
          </h2>
        </BlurFade>

        <BlurFade inView y={12}>
          <p className="max-w-[54ch] text-balance text-lead leading-relaxed text-muted">
            {machinesContent.lead}
          </p>
        </BlurFade>
      </header>

      {machinesContent.groups.map((group) => {
        const list = machines.filter((machine) => machine.line === group.line);

        return (
          <div key={group.line} className="flex flex-col gap-7">
            <BlurFade inView y={10}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink-600 pb-4">
                <h3 className="type-display text-lg text-paper">
                  {group.label}
                </h3>
                <p className="text-sm text-muted-2">{group.note}</p>
                <span className="type-spec ml-auto text-muted-2">
                  {list.length} {list.length === 1 ? "modelo" : "modelos"}
                </span>
              </div>
            </BlurFade>

            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((machine, index) => (
                <BlurFade
                  key={machine.slug}
                  as="li"
                  inView
                  y={18}
                  // Staggered across the row, so a row assembles left to right
                  // instead of every card landing on the same frame.
                  delay={(index % 3) * 0.08}
                  className="flex"
                >
                  <MachineCard
                    machine={machine}
                    ctaLabel={machinesContent.cardCta}
                  />
                </BlurFade>
              ))}
            </ul>
          </div>
        );
      })}

      <BlurFade inView y={8}>
        <p className="type-spec text-center text-muted-2">
          {machinesContent.disclaimer}
        </p>
      </BlurFade>
    </div>

    {/* Renders nothing: it lights each card as the page moves past it. Kept
        at the end so the section itself stays a server component. */}
    <ScrollAura scope="#impressoras" />
  </section>
);
