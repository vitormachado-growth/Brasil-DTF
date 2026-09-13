import Image from "next/image";
import Link from "next/link";
import lockup from "../assets/lockup-branco.webp";

export interface LogoProps {
  /** Rendered height in px. The width follows the lockup's own proportions. */
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * The Brasil DTF lockup: ink bottle over an oblique wordmark.
 *
 * This is the real mark, taken from the master the first landing page shipped
 * with. The white version is built from that black master by keeping its alpha
 * mask and laying it over white, because the mask is what carries the artwork.
 *
 * It stays an image rather than live text on purpose. The wordmark is a heavy
 * oblique cut that no web font matches, and setting it in a near-miss typeface
 * would be a redrawn logo, not this one.
 */
export const Logo = ({ height = 48, className, priority }: LogoProps) => (
  <Link
    href="/"
    aria-label="Brasil DTF, ir para o início"
    className={[
      "inline-flex shrink-0 items-center transition-opacity hover:opacity-80",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    <Image
      src={lockup}
      alt="Brasil DTF"
      height={height}
      priority={priority}
      className="h-auto w-auto"
      style={{ height }}
      sizes={`${Math.round((height * lockup.width) / lockup.height)}px`}
    />
  </Link>
);
