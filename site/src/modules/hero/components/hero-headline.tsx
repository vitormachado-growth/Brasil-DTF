"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  SplitText,
  prefersReducedMotion,
} from "@/components/animation/gsap/register";
import { goldWord } from "@/components/ui/gold-word";

export interface HeroHeadlineProps {
  lines: readonly string[];
  /** One word to paint in the accent, matched case-insensitively. */
  highlight?: string;
  delay?: number;
  /** Hold until the opening animation is out of the way. */
  enabled?: boolean;
  className?: string;
}

/**
 * The hero headline, revealed line by line from behind a mask.
 *
 * Each line is a real line of text that slides up out of its own clipped box,
 * which reads like the print itself arriving on the page. `SplitText` with
 * `mask: "lines"` builds those wrappers, so the markup stays one clean
 * heading for search engines and assistive tech.
 *
 * The split waits on `document.fonts.ready`. Splitting before the display face
 * has loaded measures the fallback, and the lines land in the wrong places.
 */
export const HeroHeadline = ({
  lines,
  highlight,
  delay = 0.25,
  enabled = true,
  className,
}: HeroHeadlineProps) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || !enabled) return;

      if (prefersReducedMotion()) {
        gsap.set(node, { autoAlpha: 1 });
        return;
      }

      let split: SplitText | null = null;
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled || !ref.current) return;

        gsap.set(node, { autoAlpha: 1 });

        // `mask: "lines"` wraps each line in its own clipping box, sized to the
        // line-height. At 0.92em that box is shorter than a capital with an
        // accent on top, so the circumflex on "VOCÊ" gets shaved off while the
        // masks are in place. They are only needed for the slide, so once the
        // last line has landed the split is reverted and the heading goes back
        // to being a plain `<h1>` with nothing clipping it.
        split = SplitText.create(node, { type: "lines", mask: "lines" });

        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.09,
          delay,
          onComplete: () => {
            split?.revert();
            split = null;
          },
        });
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [delay, enabled] },
  );

  return (
    <h1
      ref={ref}
      className={["type-display animate-hidden", className]
        .filter(Boolean)
        .join(" ")}
    >
      {lines.map((line, index) => (
        <span key={line} className="block">
          {goldWord(line, highlight)}
          {index < lines.length - 1 && " "}
        </span>
      ))}
    </h1>
  );
};
