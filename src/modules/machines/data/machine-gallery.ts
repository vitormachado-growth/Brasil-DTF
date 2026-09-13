import type { StaticImageData } from "next/image";

import g_l8180_xp600_1 from "../assets/galeria/l8180-xp600-1.webp";
import g_l8180_xp600_2 from "../assets/galeria/l8180-xp600-2.webp";
import g_l8180_xp600_3 from "../assets/galeria/l8180-xp600-3.webp";
import g_l8180_xp600_4 from "../assets/galeria/l8180-xp600-4.webp";
import g_xf_450s_uv_1 from "../assets/galeria/xf-450s-uv-1.webp";
import g_xf_450s_uv_2 from "../assets/galeria/xf-450s-uv-2.webp";
import g_xf_450s_uv_3 from "../assets/galeria/xf-450s-uv-3.webp";
import g_xf_450s_uv_4 from "../assets/galeria/xf-450s-uv-4.webp";
import g_xf_400pro_a2_1 from "../assets/galeria/xf-400pro-a2-1.webp";
import g_xf_400pro_a2_2 from "../assets/galeria/xf-400pro-a2-2.webp";
import g_702e_c650sc_1 from "../assets/galeria/702e-c650sc-1.webp";
import g_702e_c650sc_2 from "../assets/galeria/702e-c650sc-2.webp";
import g_702e_c650sc_3 from "../assets/galeria/702e-c650sc-3.webp";
import g_702e_c650sc_4 from "../assets/galeria/702e-c650sc-4.webp";
import g_xf_420s_1 from "../assets/galeria/xf-420s-1.webp";
import g_xf_420s_2 from "../assets/galeria/xf-420s-2.webp";
import g_xf_420s_3 from "../assets/galeria/xf-420s-3.webp";
import g_xf_420s_4 from "../assets/galeria/xf-420s-4.webp";
import g_702e_z650_2_1 from "../assets/galeria/702e-z650-2-1.webp";
import g_702e_z650_2_2 from "../assets/galeria/702e-z650-2-2.webp";
import g_702e_z650_2_3 from "../assets/galeria/702e-z650-2-3.webp";
import g_702e_z650_2_4 from "../assets/galeria/702e-z650-2-4.webp";
import g_c605_h6502_1 from "../assets/galeria/c605-h6502-1.webp";
import g_c605_h6502_2 from "../assets/galeria/c605-h6502-2.webp";
import g_c605_h6502_3 from "../assets/galeria/c605-h6502-3.webp";
import g_c605_h6502_4 from "../assets/galeria/c605-h6502-4.webp";

/**
 * As fotos de cada máquina na página de detalhe, na ordem em que aparecem no
 * site do cliente. Todas vieram de brasildtfimpressoras.com.br, convertidas
 * para webp com no máximo 1200px de largura.
 *
 * Elas chegam em proporções diferentes (quadrada, 3:2, paisagem larga), então
 * a galeria mostra a foto inteira dentro de uma moldura fixa, sem cortar.
 *
 * A L8050 não está aqui: é posterior àquele site e só tem a foto do card.
 */
export const machineGallery: Record<string, StaticImageData[]> = {
  "l8180-xp600": [
    g_l8180_xp600_1,
    g_l8180_xp600_2,
    g_l8180_xp600_3,
    g_l8180_xp600_4,
  ],
  "xf-450s-uv": [
    g_xf_450s_uv_1,
    g_xf_450s_uv_2,
    g_xf_450s_uv_3,
    g_xf_450s_uv_4,
  ],
  "xf-400pro-a2": [
    g_xf_400pro_a2_1,
    g_xf_400pro_a2_2,
  ],
  "702e-c650sc": [
    g_702e_c650sc_1,
    g_702e_c650sc_2,
    g_702e_c650sc_3,
    g_702e_c650sc_4,
  ],
  "xf-420s": [
    g_xf_420s_1,
    g_xf_420s_2,
    g_xf_420s_3,
    g_xf_420s_4,
  ],
  "702e-z650-2": [
    g_702e_z650_2_1,
    g_702e_z650_2_2,
    g_702e_z650_2_3,
    g_702e_z650_2_4,
  ],
  "c605-h6502": [
    g_c605_h6502_1,
    g_c605_h6502_2,
    g_c605_h6502_3,
    g_c605_h6502_4,
  ],
};
