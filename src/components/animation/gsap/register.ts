import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Registers GSAP plugins exactly once, on the client.
 *
 * GSAP warns (and ScrollTrigger silently no-ops) if a plugin is used before
 * registration, and registering inside a component body would re-run on every
 * render. Import this module for its side effect from any client component
 * that animates.
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  gsap.defaults({ ease: "power3.out", duration: 0.8 });

  registered = true;
}

/**
 * True when the visitor asked the OS to reduce motion. Read at call time, not
 * module scope, so it is correct after hydration and if the setting changes.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
