"use client";

import { useRef, type AnchorHTMLAttributes } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./register";

export type UnderlineVariant = "center" | "in-out" | "out-in";
export type UnderlineDirection = "left" | "right";

export interface UnderlineLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  /**
   * `center` grows outward from the middle.
   * `in-out` enters from one side and leaves through the other.
   * `out-in` starts drawn, exits to one side and returns from the opposite.
   */
  variant?: UnderlineVariant;
  /** Side the rule enters from. */
  direction?: UnderlineDirection;
  /** Rule thickness as a fraction of font size. */
  heightRatio?: number;
  /** Gap below the baseline as a fraction of font size. */
  paddingRatio?: number;
}

const OPPOSITE: Record<UnderlineDirection, UnderlineDirection> = {
  left: "right",
  right: "left",
};

/**
 * A link whose underline is animated.
 *
 * A GSAP port of the `underline-animation` pattern. The rule is a real element
 * scaled on the X axis, not `text-decoration`, which is what makes direction
 * and origin controllable at all. Sizing it from font size (rather than a
 * fixed px) keeps the rule in proportion wherever the link is used.
 *
 * The tween is `scaleX` only, so it runs on the compositor and never triggers
 * layout on hover.
 */
export const UnderlineLink = ({
  label,
  variant = "in-out",
  direction = "left",
  heightRatio = 0.08,
  paddingRatio = 0.24,
  className,
  ...anchorProps
}: UnderlineLinkProps) => {
  const root = useRef<HTMLAnchorElement>(null);
  const rule = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const host = root.current;
      const line = rule.current;
      if (!host || !line || prefersReducedMotion()) return;

      // `out-in` is the one variant that rests visible: it animates away and
      // back, so its idle state is a drawn rule.
      const restsVisible = variant === "out-in";
      gsap.set(line, {
        scaleX: restsVisible ? 1 : 0,
        transformOrigin: `${direction} center`,
      });

      const enter = () => {
        gsap.killTweensOf(line);

        if (variant === "center") {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "center center" },
            { scaleX: 1, duration: 0.4, ease: "power2.out" },
          );
          return;
        }

        if (variant === "out-in") {
          gsap
            .timeline()
            .to(line, {
              scaleX: 0,
              transformOrigin: `${OPPOSITE[direction]} center`,
              duration: 0.25,
              ease: "power2.in",
            })
            .fromTo(
              line,
              { scaleX: 0, transformOrigin: `${direction} center` },
              { scaleX: 1, duration: 0.35, ease: "power2.out" },
            );
          return;
        }

        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: `${direction} center` },
          { scaleX: 1, duration: 0.4, ease: "power2.out" },
        );
      };

      const leave = () => {
        gsap.killTweensOf(line);

        if (variant === "center") {
          gsap.to(line, {
            scaleX: 0,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "power2.in",
          });
          return;
        }

        if (variant === "out-in") {
          gsap.set(line, { scaleX: 1, transformOrigin: `${direction} center` });
          return;
        }

        // `in-out`: the rule keeps travelling and leaves through the far side,
        // so the exit reads as continuation rather than as a rewind.
        gsap.to(line, {
          scaleX: 0,
          transformOrigin: `${OPPOSITE[direction]} center`,
          duration: 0.35,
          ease: "power2.in",
        });
      };

      host.addEventListener("pointerenter", enter);
      host.addEventListener("pointerleave", leave);
      host.addEventListener("focus", enter);
      host.addEventListener("blur", leave);

      return () => {
        host.removeEventListener("pointerenter", enter);
        host.removeEventListener("pointerleave", leave);
        host.removeEventListener("focus", enter);
        host.removeEventListener("blur", leave);
      };
    },
    { scope: root, dependencies: [variant, direction] },
  );

  return (
    <a
      ref={root}
      className={["relative inline-block", className].filter(Boolean).join(" ")}
      {...anchorProps}
    >
      {label}
      <span
        ref={rule}
        aria-hidden
        className="pointer-events-none absolute left-0 w-full bg-current"
        style={{
          height: `${heightRatio}em`,
          top: `calc(100% + ${paddingRatio}em)`,
          transform: "scaleX(0)",
        }}
      />
    </a>
  );
};
