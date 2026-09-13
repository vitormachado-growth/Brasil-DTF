"use client";

import { BlurFade } from "@/components/animation/gsap/blur-fade";
import { ActionButton } from "@/components/ui/action-button";
import { useIntro } from "@/hooks/use-intro";
import { useIsDesktop } from "@/hooks/use-media-query";
import {
  ArrowDownIcon,
  CheckIcon,
  WhatsAppIcon,
} from "@/modules/shell/components/icons";
import videoPoster from "../assets/video-poster.webp";
import { heroContent } from "../data/hero.content";
import { HeroHeadline } from "./hero-headline";
import { StatStrip } from "./stat-strip";
import { VideoPanel } from "./video-panel";

/**
 * Hero.
 *
 * Two columns, the anatomy the client's live page already uses and converts
 * with: eyebrow, headline, two buttons, reassurance under the buttons, and
 * the video on the right. The video is the same one that leads the live page,
 * so a visitor arriving from either lands on the same answer.
 *
 * The lead paragraph that used to sit between the headline and the buttons is
 * gone, cut at the client's request on 03/09/2026: on a phone it pushed the
 * buttons below the fold, and he wanted the headline and the two stat cards
 * carrying the page instead of a paragraph nobody reads.
 *
 * Nothing in the panel animates on arrival. Two attempts at an entrance effect
 * there were turned down, and the third option is to stop spending the page's
 * boldness on the hero image. What moves is the copy sequence coming in.
 *
 * That sequence is gated on the opening animation. Without the gate it would
 * run to completion behind the overlay, and the visitor would meet a hero that
 * had already finished arriving.
 */
export const Hero = () => {
  const ready = useIntro((state) => state.ready);

  // The hero keeps two copies of the video block, one per breakpoint, because
  // the mobile order interleaves it with the copy. Only one is ever on screen,
  // but both are in the DOM, so only one may mount a player: two autoplaying
  // iframes would stream the same video twice.
  const isDesktop = useIsDesktop();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-900"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-print-grid"
      />

      {/* No celular o topo e os intervalos são menores, para que as duas
          estatísticas entrem na primeira tela junto com o vídeo, como o
          cliente pediu em 13/09/2026. De 640px para cima tudo volta ao que
          estava, porque no desktop já estava certo. */}
      <div className="relative mx-auto grid w-full max-w-shell flex-1 grid-cols-1 items-center gap-10 px-5 pb-10 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-12 lg:gap-columns lg:pb-16 lg:pt-32">
        <div className="flex flex-col gap-4 sm:gap-stack lg:col-span-7">
          <BlurFade delay={0.15} y={10} enabled={ready}>
            <p className="type-spec flex items-center gap-3 text-accent">
              <span aria-hidden className="h-px w-8 bg-accent-line" />
              {heroContent.eyebrow}
            </p>
          </BlurFade>

          <HeroHeadline
            lines={heroContent.headingLines}
            highlight={heroContent.headingHighlight}
            delay={0.3}
            enabled={ready}
            className="text-hero text-paper"
          />

          {/* Stacked, the two-column grid would drop the video below the fold,
              and the video is the hook. On narrow screens it sits straight
              after the headline instead. Rendered twice rather than reordered,
              because only one of the two is ever in the layout. */}
          <div className="lg:hidden">
            <VideoBlock enabled={ready} autoPlay={isDesktop === false} />
          </div>

          <BlurFade
            delay={0.65}
            y={12}
            enabled={ready}
            className="flex flex-wrap gap-3"
          >
            <ActionButton
              href={heroContent.primaryCta.href}
              label={heroContent.primaryCta.label}
              target="_blank"
              rel="noopener"
              icon={<WhatsAppIcon className="h-4 w-4" />}
              shine
            />
            <ActionButton
              href={heroContent.secondaryCta.href}
              label={heroContent.secondaryCta.label}
              variant="outline"
            />
          </BlurFade>

          <BlurFade delay={0.78} y={10} enabled={ready}>
            {/* The same checkbox the About list carries: three promises should
                not wear two different markers on one page. */}
            <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
              {heroContent.trust.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-ui text-muted"
                >
                  <span aria-hidden className="check-box">
                    <CheckIcon className="h-[0.8125rem] w-[0.8125rem]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </BlurFade>

          <StatStrip stats={heroContent.stats} delay={0.9} enabled={ready} />
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <VideoBlock enabled={ready} autoPlay={isDesktop === true} />
        </div>
      </div>

      <BlurFade
        as="div"
        delay={1.25}
        y={0}
        enabled={ready}
        className="relative z-10 border-t border-ink-600"
      >
        <div className="mx-auto flex max-w-shell items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <p className="type-spec text-muted-2">{heroContent.statusLine}</p>
          <a
            href="#impressoras"
            className="type-spec inline-flex items-center gap-2 text-muted-2 transition-colors hover:text-accent-hi"
          >
            {heroContent.scrollLabel}
            <ArrowDownIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </BlurFade>
    </section>
  );
};

/**
 * The video, framed. The glow is the one soft edge in a page of right angles,
 * and it is there to pull the eye to the only thing on screen you can press
 * besides the two buttons.
 */
const VideoBlock = ({
  enabled,
  autoPlay,
}: {
  enabled: boolean;
  autoPlay: boolean;
}) => (
  <BlurFade delay={0.45} y={16} enabled={enabled}>
    <div className="relative aspect-video w-full rounded-panel border border-accent-line shadow-[0_0_60px_-12px_rgb(254_191_2_/_0.28)]">
      <VideoPanel
        videoId={heroContent.video.id}
        poster={videoPoster}
        label={heroContent.video.label}
        autoPlay={autoPlay}
        enabled={enabled}
        className="h-full w-full rounded-panel"
      />
    </div>
  </BlurFade>
);
