"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./register";

export interface BlurFadeProps {
  children: ReactNode;
  /** Seconds to wait before this element starts. */
  delay?: number;
  duration?: number;
  /** Travel distance in px. Negative moves down into place. */
  y?: number;
  /** Blur radius in px at the start of the reveal. */
  blur?: number;
  /** Wait for the element to scroll into view instead of running on mount. */
  inView?: boolean;
  /** Hold until the caller is ready (an intro sequence, a loaded image). */
  enabled?: boolean;
  as?: ElementType;
  className?: string;
}

/**
 * Reveals its children by lifting them out of a blur.
 *
 * A GSAP port of the `blur-fade` pattern: the element starts transparent,
 * offset and defocused, then resolves. Staggering `delay` across siblings is
 * what makes a page-load sequence read as one movement instead of several.
 *
 * The element is rendered hidden (`animate-hidden`), so there is no flash of
 * finished content before the timeline starts. Reduced motion, or a disabled
 * intro, resolves it immediately with no tween.
 */
export const BlurFade = ({
  children,
  delay = 0,
  duration = 0.9,
  y = 14,
  blur = 10,
  inView = false,
  enabled = true,
  as: Tag = "div",
  className,
}: BlurFadeProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !enabled) return;

      if (prefersReducedMotion()) {
        gsap.set(ref.current, { autoAlpha: 1, y: 0, filter: "none" });
        return;
      }

      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y, filter: `blur(${blur}px)` },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          // Applies in both modes. With a ScrollTrigger the tween starts when
          // the trigger fires, so the delay still staggers siblings; zeroing it
          // here would flatten every scroll-revealed group onto one frame.
          delay,
          ease: "power3.out",
          // Blur is expensive to composite; drop the filter once it is gone so
          // the element stops paying for a layer it no longer needs.
          onComplete: () => gsap.set(ref.current, { clearProps: "filter" }),
          ...(inView && {
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          }),
        },
      );
    },
    { scope: ref, dependencies: [enabled, delay, duration, y, blur, inView] },
  );

  return (
    <Tag
      ref={ref}
      className={["animate-hidden", className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
};
