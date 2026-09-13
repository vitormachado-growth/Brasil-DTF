"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a media query from JavaScript.
 *
 * Returns `null` until the component has mounted, because the server has no
 * viewport to measure and guessing one produces a layout that changes on
 * hydration. Callers should treat `null` as "not yet known" rather than false.
 */
export const useMediaQuery = (query: string): boolean | null => {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
};

/** Matches Tailwind's `lg`, the breakpoint the hero switches layout at. */
export const useIsDesktop = () => useMediaQuery("(min-width: 64rem)");
