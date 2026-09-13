import { BlurFade } from "@/components/animation/gsap/blur-fade";
import { ActionButton } from "@/components/ui/action-button";
import { goldWord } from "@/components/ui/gold-word";
import { WhatsAppIcon } from "@/modules/shell/components/icons";
import {
  faqs,
  guide,
  keepTermsWhole,
  plainAnswer,
  supportContent,
} from "../data/support.content";
import { FaqList } from "./faq-list";

/**
 * Support, the last stop before the footer: the questions people ask before
 * buying, then the one thing left to do, which is talk.
 *
 * The FAQ is also emitted as FAQPage structured data, the way the live page
 * does it. Google requires the schema to mirror visible text, so both come
 * from the same array and can never drift apart.
 *
 * The closing band is the live page's closing band. On its light ground it
 * floated a white card in a yellow halo; here the card is the raised navy and
 * the halo is the same gold, dimmed so it reads as warmth behind the panel
 * rather than as a spotlight on it.
 *
 * It carries the print bed and the gold "faturar" because it is the page's
 * last screen and it was the only large panel wearing neither: flat navy
 * behind a headline that broke into three lines with an article stranded on
 * the second. The word is gold here for the same reason it is gold in the
 * hero, which is that it is the same promise closing where it opened.
 *
 * Beside the questions sits the picker, also from the live page. A column of
 * questions alone left half the section empty, and the thing that belongs in
 * that half is not decoration: it is the answer to the question the catalogue
 * above cannot give, which is which of the eight rows the reader is standing
 * in.
 */
export const SupportSection = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: plainAnswer(item.a) },
    })),
  };

  return (
    <section
      id="suporte"
      aria-labelledby="suporte-heading"
      className="relative border-t border-ink-600 bg-ink-900 py-20 lg:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto flex max-w-shell flex-col gap-14 px-5 sm:px-8 lg:gap-20">
        <header className="flex flex-col items-center gap-5 text-center">
          <BlurFade inView y={10}>
            <p className="type-spec flex items-center justify-center gap-3 text-accent">
              <span aria-hidden className="h-px w-8 bg-accent-line" />
              {supportContent.eyebrow}
              <span aria-hidden className="h-px w-8 bg-accent-line" />
            </p>
          </BlurFade>

          <BlurFade inView y={14}>
            <h2
              id="suporte-heading"
              className="type-display max-w-[20ch] text-balance text-[clamp(1.75rem,3.1vw,3.5rem)] text-paper"
            >
              {supportContent.heading}
            </h2>
          </BlurFade>

          <BlurFade inView y={12}>
            <p className="max-w-[54ch] text-balance text-lead leading-relaxed text-muted">
              {supportContent.lead}
            </p>
          </BlurFade>
        </header>

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <BlurFade inView y={16}>
            <FaqList items={faqs} />
          </BlurFade>

          <BlurFade inView y={18}>
            <div className="rounded-panel border border-ink-600 bg-ink-850/70 p-6 sm:p-7">
              <h3 className="type-display text-xl text-paper">
                {supportContent.guide.heading}
              </h3>

              <dl className="mt-5 divide-y divide-ink-600/70 border-y border-ink-600/70">
                {guide.map((row) => (
                  <div
                    key={row.who}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="text-sm text-muted-2">{row.who}</dt>
                    <dd className="text-right text-sm font-semibold text-paper">
                      {keepTermsWhole(row.pick)}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <ActionButton
                  href={supportContent.guide.cta.href}
                  label={supportContent.guide.cta.label}
                  target="_blank"
                  rel="noopener"
                  variant="outline"
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                  className="w-full"
                />
              </div>
            </div>
          </BlurFade>
        </div>

        <BlurFade inView y={18} className="relative mx-auto w-full max-w-4xl">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(254_191_2_/_0.14),transparent_72%)]"
          />
          {/* The same lit surface the catalogue cards wear, minus the hover
              half: gold falling from above, the navy ramp under it, and the
              1px white edge that keeps the top from reading as flat. Its own
              gold halo stays, with the edge highlight added to it. */}
          <div className="relative isolate overflow-hidden rounded-panel border border-accent-line bg-[radial-gradient(130%_90%_at_50%_-20%,rgb(254_191_2_/_0.08),transparent_55%),linear-gradient(180deg,var(--ink-800),var(--ink-850)_45%,#030f24)] shadow-[0_0_80px_-20px_rgb(254_191_2_/_0.35),inset_0_1px_rgb(255_255_255_/_0.06)]">
            {/* The one large panel on the page that was still a flat field.
                Every other surface sits on the print bed; this one reads as a
                hole without it. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-print-grid opacity-60"
            />

            <div className="relative flex flex-col items-center gap-6 px-6 py-11 text-center sm:px-14 sm:py-14">
              <span aria-hidden className="h-1 w-14 rounded-full bg-accent" />

              {/* The chosen breaks only hold where they fit. On a phone the
                  two lines each wrap again and strand "DTF?" on its own, so
                  below `sm` the spans go back to being inline and the sentence
                  is balanced by the browser. */}
              <h3 className="type-display max-w-[24ch] text-balance text-[clamp(1.75rem,3.4vw,3.5rem)] text-paper">
                {supportContent.band.titleLines.map((line, index) => (
                  <span key={line} className="sm:block">
                    {goldWord(line, supportContent.band.highlight)}
                    {index < supportContent.band.titleLines.length - 1 && " "}
                  </span>
                ))}
              </h3>

              <p className="max-w-[52ch] text-balance text-lead leading-relaxed text-muted">
                {supportContent.band.subtitle}
              </p>

              <div className="flex flex-col items-center gap-4">
                <ActionButton
                  href={supportContent.band.cta.href}
                  label={supportContent.band.cta.label}
                  target="_blank"
                  rel="noopener"
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                  shine
                />
                <p className="type-spec text-muted-2">
                  {keepTermsWhole(supportContent.band.phone)}
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
