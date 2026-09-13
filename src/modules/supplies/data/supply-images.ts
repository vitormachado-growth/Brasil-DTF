import type { StaticImageData } from "next/image";

import filmeA3 from "../assets/filme-dtf-avulso-tamanho-a3.webp";
import filmeA4 from "../assets/filme-dtf-avulso-tamanho-a4.webp";
import kitCmykw from "../assets/kit-tinta-dtf-1litro-cmykw.webp";
import poTpu from "../assets/po-tpu-premium.webp";
import rolo30 from "../assets/rolo-filme-30x100.webp";
import rolo60 from "../assets/rolo-filme-60x100.webp";
import amarela from "../assets/tinta-dtf-amarela-1litro.webp";
import azul from "../assets/tinta-dtf-azul-1litro.webp";
import branca from "../assets/tinta-dtf-branca-1litro.webp";
import magenta from "../assets/tinta-dtf-magenta-1litro.webp";
import preta from "../assets/tinta-dtf-preta-1litro.webp";

/**
 * Photographs live here rather than in the content file so the content stays
 * plain data. Keyed by slug, 800x800 webp.
 *
 * As nove fotos novas chegaram do cliente em 08/09/2026 e substituem as da
 * loja em tudo que ele refez. São imagens geradas, não fotografias, e mostram
 * a embalagem da Xinflying, que é a marca que ele revende. Cada tinta foi
 * casada pela tampa e pela letra do rótulo (C, M, Y, K, W), não pelo nome do
 * arquivo, que era só a hora em que a imagem saiu.
 *
 * A do kit veio em pé (1145x1374) e o corte para o quadrado sobe a partir da
 * base, não do centro: centralizado, cortaria o pescoço das garrafas.
 *
 * A3 e A4 continuam com a foto da loja, e continuam dividindo uma só, porque a
 * loja usa a mesma para as duas.
 *
 * As fotos antigas (frascos de 100 ml, kits que saíram de linha) ficaram na
 * pasta de propósito: `site/` ainda não está no git, então apagar seria
 * perder de vez.
 */
export const supplyImages: Record<string, StaticImageData> = {
  "tinta-dtf-azul-1litro": azul,
  "tinta-dtf-magenta-1litro": magenta,
  "tinta-dtf-amarela-1litro": amarela,
  "tinta-dtf-preta-1litro": preta,
  "tinta-dtf-branca-1litro": branca,
  "kit-tinta-dtf-1litro-cmykw": kitCmykw,

  "rolo-filme-30x100": rolo30,
  "rolo-filme-60x100": rolo60,

  "po-tpu-premium": poTpu,

  "filme-dtf-avulso-tamanho-a4": filmeA4,
  "filme-dtf-avulso-tamanho-a3": filmeA3,
};
