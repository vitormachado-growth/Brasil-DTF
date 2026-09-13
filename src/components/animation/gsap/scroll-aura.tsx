"use client";

import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./register";

export interface ScrollAuraProps {
  /**
   * CSS selector for the section to light. Every `[data-aura]` inside it gets
   * its own trigger.
   */
  scope: string;
}

/**
 * Lights each card as it crosses the screen, instead of when the mouse lands
 * on it.
 *
 * A hover glow answers one visitor doing one thing. Scrolling a catalogue of
 * twenty-two cards is the thing everybody does, and it was the part that had
 * no life in it. So the glow moved: it rises as the card comes up from the
 * bottom, peaks around the middle of the screen, and falls as the card leaves.
 * The light appears to sit still while the page moves through it.
 *
 * The tween drives one custom property, `--card-aura`, and the card's CSS
 * decides what to do with it. Keeping the JavaScript to a single number is
 * what makes twenty-two of these affordable: no layout, no style recalc beyond
 * one composited opacity.
 *
 * Renders nothing. It is a behaviour attached to markup that already exists,
 * so the sections stay server components and only this island ships to the
 * browser.
 */
export const ScrollAura = ({ scope }: ScrollAuraProps) => {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        document.querySelectorAll(`${scope} [data-aura]`),
      );

      for (const card of cards) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              // The card is lit across its whole passage, so the peak in the
              // middle of this range lands with the card near the middle of
              // the screen.
              start: "top 92%",
              end: "bottom 8%",
              // A touch of smoothing rather than a hard tie to the scrollbar.
              // Light that tracks the wheel pixel for pixel reads as a slider;
              // a fraction of lag reads as light.
              scrub: 0.4,
            },
          })
          .fromTo(
            card,
            { "--card-aura": 0 },
            { "--card-aura": 1, ease: "none" },
          )
          .to(card, { "--card-aura": 0, ease: "none" });
      }
    },
    { dependencies: [scope] },
  );

  return null;
};
