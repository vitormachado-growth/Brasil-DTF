import type { StaticImageData } from "next/image";

import c605h6502 from "../assets/c605-h6502.webp";
import e702c650sc from "../assets/702e-c650sc.webp";
import e702z6502 from "../assets/702e-z650-2.webp";
import l8050xp600pro from "../assets/l8050-xp600-pro.webp";
import l8180xp600 from "../assets/l8180-xp600.webp";
import xf400proA2 from "../assets/xf-400pro-a2.webp";
import xf420s from "../assets/xf-420s.webp";
import xf450suv from "../assets/xf-450s-uv.webp";

/**
 * Photographs live here rather than in the content file so the content stays
 * plain data. Keyed by slug, so a machine added to the list without a photo
 * fails loudly at the type level instead of rendering an empty frame.
 *
 * Two adapted Epsons open the list and they are easy to mix up: l8180 is the
 * A3 (Helio's stock photo, the one with the paper standing up at the back),
 * l8050 is the A4 the client photographed himself on 03/09/2026 (front view,
 * ink tanks on the right). They swapped places once already.
 */
export const machineImages: Record<string, StaticImageData> = {
  "l8050-xp600-pro": l8050xp600pro,
  "l8180-xp600": l8180xp600,
  "xf-450s-uv": xf450suv,
  "xf-400pro-a2": xf400proA2,
  "702e-c650sc": e702c650sc,
  "xf-420s": xf420s,
  "702e-z650-2": e702z6502,
  "c605-h6502": c605h6502,
};
