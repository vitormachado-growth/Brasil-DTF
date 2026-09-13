import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ActionVariant = "solid" | "outline";

export interface ActionButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  variant?: ActionVariant;
  /** Rendered before the label, at label size. */
  icon?: ReactNode;
  /**
   * A light reflection sweeps across the face every few seconds. Opt-in and
   * meant for one button per screen: it is the signature of the client's live
   * page, and a signature on every button is wallpaper.
   */
  shine?: boolean;
}

// `inline-flex` and a caller's `hidden` are both display utilities with equal
// specificity, so the class attribute order does not decide the winner and a
// plain `hidden` loses. Callers hide this with a `max-*:hidden` variant, which
// lands in a media query and therefore wins.
const BASE =
  "type-action group relative inline-flex items-center justify-center gap-2.5 rounded-control px-6 py-3.5 text-[0.8125rem] transition-colors duration-200";

const VARIANTS: Record<ActionVariant, string> = {
  solid: "bg-accent text-accent-ink hover:bg-accent-hi",
  outline:
    "border border-ink-500 text-paper hover:border-accent hover:text-accent-hi",
};

/**
 * The page's call to action. Corners on the control radius, a step tighter
 * than the video frame, so the two read as one family at two sizes.
 */
export const ActionButton = ({
  label,
  variant = "solid",
  icon,
  shine = false,
  className,
  ...anchorProps
}: ActionButtonProps) => (
  <a
    className={[
      BASE,
      VARIANTS[variant],
      // The sweep is a pseudo-element travelling across the face, so the box
      // has to clip it or the light streaks out past the corners.
      shine && "sweep-light overflow-hidden",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...anchorProps}
  >
    {icon}
    {label}
  </a>
);
