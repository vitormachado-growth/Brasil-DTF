"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  prefersReducedMotion,
} from "@/components/animation/gsap/register";
import { useIntro } from "@/hooks/use-intro";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import garrafa from "../assets/garrafa.webp";
import wordmark from "../assets/wordmark.webp";

/** Mirrors the lockup's own `clamp(14rem, 30vw, 30rem)` width. */
const INTRO_SIZES = "(max-width: 47rem) 14rem, (max-width: 100rem) 30vw, 30rem";

/**
 * Playback rate for the whole opening. The beats below are written in real
 * seconds and scaled here, so the sequence can be sped up or slowed without
 * re-tuning every overlap by hand. Above 1 is faster.
 *
 * At 1.08 the animation runs about 1.19s. Hydration has to happen first, so
 * the page is handed over between 1.5s and 1.75s after navigation starts,
 * the spread being hydration rather than the animation.
 */
const SPEED = 1.08;

/**
 * Opening animation: the bottle rises out from behind the wordmark.
 *
 * The logo ships as one flat image, so the two halves were cut apart along the
 * empty band that already separates them in the master file (the bottle ends
 * at y 982, the letters start at y 1010). Stacked back up at the same width
 * they reassemble the lockup exactly, which is what lets the bottle move on
 * its own without the mark ever looking rebuilt.
 *
 * The rise is a clip, not a z-index trick. The bottle sits in a box whose
 * bottom edge is the top of the letters and starts pushed fully below it, so
 * it is genuinely hidden behind them rather than layered under artwork it
 * would otherwise show through the gaps of.
 *
 * Nothing here is load-bearing. Reduced motion removes the overlay in CSS
 * before this component runs, no JavaScript means a `noscript` rule does the
 * same, and either way the page underneath is already complete.
 */
export const BrandIntro = () => {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  const setReady = useIntro((state) => state.setReady);
  const startScroll = useScroll((state) => state.start);
  const stopScroll = useScroll((state) => state.stop);

  useGSAP(
    () => {
      // Releasing the hero and tearing the overlay down are separate moments.
      // The hero has to start moving while the curtain is still going up, or
      // the reveal lands on an empty page and the page fills in afterwards.
      const handOver = () => {
        setReady();
        startScroll();
      };

      const teardown = () => {
        handOver();
        setDone(true);
      };

      if (prefersReducedMotion()) {
        teardown();
        return;
      }

      stopScroll();

      const timeline = gsap.timeline({ onComplete: teardown }).timeScale(SPEED);

      // The build-up is where the time was cut and the exit is where it was
      // kept: assembling the mark is setup, handing the page over is the part
      // worth watching. Between them the finished logo holds for a beat, so it
      // registers as a logo rather than as something passing through.
      timeline
        // The lockup ships hidden so no finished logo flashes before hydration.
        // Revealing it here, at position zero, means the first frame the
        // visitor sees is already the first frame of the animation.
        .set("[data-intro-lockup]", { visibility: "visible" })
        // The letters lay down left to right, the direction a head prints in.
        .fromTo(
          "[data-intro-wordmark]",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.28, ease: "power2.inOut" },
        )
        // Then the bottle climbs out from behind them, overshooting a touch so
        // it settles like an object with weight rather than sliding to a stop.
        .fromTo(
          "[data-intro-bottle]",
          { yPercent: 100 },
          { yPercent: 0, duration: 0.4, ease: "back.out(1.4)" },
          "-=0.13",
        )
        // The mark lifts away rather than just fading, so the exit reads as the
        // logo leaving instead of the page dissolving.
        .to(
          "[data-intro-lockup]",
          { y: -18, scale: 1.03, duration: 0.26, ease: "power2.in" },
          "+=0.12",
        )
        .to(
          "[data-intro-lockup]",
          { autoAlpha: 0, duration: 0.22, ease: "power2.in" },
          "-=0.22",
        )
        .add(handOver)
        .to(
          root.current,
          { clipPath: "inset(0 0 100% 0)", duration: 0.46, ease: "power3.inOut" },
          "-=0.11",
        );

      return () => {
        // A hot reload mid-timeline must not leave the page frozen.
        startScroll();
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      id="brand-intro"
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
    >
      <div
        data-intro-lockup
        className="w-[clamp(14rem,30vw,30rem)] will-change-transform"
      >
        {/* The clip: its bottom edge is the top of the letters.

            `sizes` is not cosmetic here. Without it Next requests a 2560px
            render of the asset to fill a box that is never wider than about
            480px, and the first paint of the animation happens before either
            half has arrived: the timeline runs on an empty screen. */}
        <div className="overflow-hidden">
          <Image
            data-intro-bottle
            src={garrafa}
            alt=""
            priority
            sizes={INTRO_SIZES}
            className="h-auto w-full will-change-transform"
          />
        </div>

        <Image
          data-intro-wordmark
          src={wordmark}
          alt=""
          priority
          sizes={INTRO_SIZES}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};
