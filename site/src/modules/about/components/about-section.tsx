import Image from "next/image";
import { BlurFade } from "@/components/animation/gsap/blur-fade";
import { ActionButton } from "@/components/ui/action-button";
import { CheckIcon, WhatsAppIcon } from "@/modules/shell/components/icons";
import pecasEstampadas from "../assets/pecas-estampadas.webp";
import { aboutContent } from "../data/about.content";

/**
 * Who you are buying from, placed where the live page puts it: right after the
 * prices, which is where that question arrives.
 *
 * The live version sets a dark card on a light section. Here the page is
 * already dark, so the relationship is rebuilt rather than copied: the section
 * drops to the darkest ground on the page and the card rises above it. Same
 * figure against ground, inverted, because a dark card on a dark page is not a
 * card at all.
 *
 * The photograph is the one piece of the page where the product is the printed
 * garment rather than the machine. The client supplied it on 05/09/2026 at
 * 1448x1086, which is 4:3 to the pixel, so the frame crops nothing. Any
 * replacement should arrive at that same ratio for the same reason.
 *
 * It is framed exactly like the hero video: gold hairline and a soft gold
 * glow. Those are the page's two media panels and they were not matching,
 * which read as an oversight rather than as a choice.
 */
export const AboutSection = () => (
  <section
    id="sobre"
    aria-labelledby="sobre-heading"
    className="relative isolate overflow-hidden border-t border-ink-600 bg-ink-950 py-20 lg:py-28"
  >
    {/* Same print bed as the hero. The two darkest sections of the page were
        the only flat ones; the grid is what keeps a large navy field from
        reading as an empty gap. */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-print-grid"
    />

    <div className="relative mx-auto grid max-w-shell items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-columns">
      <div className="order-2 flex flex-col gap-7 lg:order-1">
        <BlurFade inView y={10}>
          <p className="type-spec flex items-center gap-3 text-accent">
            <span aria-hidden className="h-px w-8 bg-accent-line" />
            {aboutContent.eyebrow}
          </p>
        </BlurFade>

        <BlurFade inView y={14}>
          <h2
            id="sobre-heading"
            className="type-display max-w-[19ch] text-balance text-[clamp(1.75rem,3.1vw,3.25rem)] text-paper"
          >
            {aboutContent.heading}
          </h2>
        </BlurFade>

        <BlurFade inView y={16}>
          {/* Divided rather than spaced. Five promises in one box read as a
              paragraph; five promises on their own rules read as a list of
              specifications, which is what they are, and it matches the spec
              rows on the machine cards.

              The tick is back at the client's request, but not in the filled
              gold circle it wore before: that shape is the single most
              recognisable ornament on a generated landing page. It is a
              checkbox now, which is an object that exists on a job sheet, and
              the page already speaks that language. */}
          <ul className="divide-y divide-ink-600/70 rounded-panel border border-ink-600 bg-ink-850/70 px-6 sm:px-7">
            {aboutContent.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3.5 py-4">
                <span aria-hidden className="check-box mt-0.5">
                  <CheckIcon className="h-[0.8125rem] w-[0.8125rem]" />
                </span>
                <span className="text-ui leading-relaxed text-muted">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </BlurFade>

        <BlurFade inView y={12}>
          <ActionButton
            href={aboutContent.cta.href}
            label={aboutContent.cta.label}
            target="_blank"
            rel="noopener"
            icon={<WhatsAppIcon className="h-4 w-4" />}
          />
        </BlurFade>
      </div>

      <BlurFade inView y={18} className="order-1 lg:order-2">
        <div className="relative overflow-hidden rounded-panel border border-accent-line bg-ink-800 shadow-[0_0_60px_-12px_rgb(254_191_2_/_0.28)]">
          <Image
            src={pecasEstampadas}
            alt={aboutContent.image.alt}
            loading="lazy"
            sizes="(max-width: 64rem) 92vw, 45vw"
            className="aspect-[4/3] w-full object-cover"
          />

          {/* The same corner label the machine cards carry, so the photograph
              belongs to the same catalogue rather than floating on its own. */}
          <span className="type-spec absolute left-4 top-4 rounded-control bg-ink-950/80 px-2.5 py-1.5 text-paper backdrop-blur-sm">
            {aboutContent.image.badge}
          </span>
        </div>
      </BlurFade>
    </div>
  </section>
);
