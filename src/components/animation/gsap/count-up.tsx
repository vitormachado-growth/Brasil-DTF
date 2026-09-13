"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./register";

export interface CountUpProps {
  /** Target value to land on. */
  value: number;
  /** Decimal places to hold while counting and at rest. */
  decimals?: number;
  duration?: number;
  delay?: number;
  /** Count when the number scrolls into view instead of on mount. */
  inView?: boolean;
  enabled?: boolean;
  className?: string;
}

const ptBR = (value: number, decimals: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Counts a number up to its target.
 *
 * A GSAP port of the `count-animation` pattern. GSAP tweens a plain proxy
 * object rather than React state, so the value is written straight to the DOM
 * node once per frame and never re-renders the tree.
 *
 * The finished value is what server-rendered HTML contains, so the number is
 * correct for search engines and for anyone who never sees the animation.
 */
export const CountUp = ({
  value,
  decimals = 0,
  duration = 1.6,
  delay = 0,
  inView = false,
  enabled = true,
  className,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || !enabled || prefersReducedMotion()) return;

      const proxy = { current: 0 };

      gsap.to(proxy, {
        current: value,
        duration,
        delay: inView ? 0 : delay,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = ptBR(proxy.current, decimals);
        },
        ...(inView && {
          scrollTrigger: { trigger: node, start: "top 90%", once: true },
        }),
      });
    },
    { dependencies: [value, decimals, duration, delay, inView, enabled] },
  );

  return (
    <span ref={ref} className={className}>
      {ptBR(value, decimals)}
    </span>
  );
};
