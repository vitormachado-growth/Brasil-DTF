"use client";

import { CountUp } from "@/components/animation/gsap/count-up";
import { BlurFade } from "@/components/animation/gsap/blur-fade";
import type { HeroStat } from "../data/hero.content";

export interface StatStripProps {
  stats: readonly HeroStat[];
  /** Delay of the first item; the rest follow it. */
  delay?: number;
  /** Hold until the opening animation is out of the way. */
  enabled?: boolean;
}

/**
 * Two claims about the business, counted up.
 *
 * This used to hold press parameters (temperature, time, film width), numbers
 * a buyer could check against any DTF technique. The client asked to swap
 * those for stats about the business instead, on 03/09/2026. The layout and
 * the counting animation are unchanged; only what they count changed. Both
 * figures are marked CONFIRMAR in the content file until he supplies real
 * ones, since a claim about the business has to be true.
 *
 * Two columns rather than the old three, wrapped flex rather than a fixed
 * grid: a two-word stat and a short subtitle wrap safely on a narrow phone
 * without needing an orphan-proof grid.
 *
 * No celular as duas ficam lado a lado, não empilhadas. Empilhadas elas
 * ocupavam 138px e caíam fora da primeira tela: num aparelho de 800px de
 * altura a faixa terminava em 816px, e com a barra do navegador visível
 * sobrava ainda menos. Em duas colunas o mesmo conteúdo cabe em cerca de
 * metade disso. De 640px para cima nada muda, que é como o cliente aprovou.
 */
export const StatStrip = ({
  stats,
  delay = 0.85,
  enabled = true,
}: StatStripProps) => (
  <dl className="grid grid-cols-2 gap-x-5 border-t border-ink-600 pt-4 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-6 sm:pt-5">
    {stats.map((stat, index) => (
      <BlurFade
        key={stat.label}
        as="div"
        delay={delay + index * 0.1}
        y={10}
        enabled={enabled}
      >
        <dt className="sr-only">{stat.label}</dt>
        <dd>
          <p className="type-display text-[1.375rem] leading-none text-paper sm:text-figure">
            {stat.prefix}
            <CountUp
              value={stat.value}
              delay={delay + index * 0.1 + 0.15}
              enabled={enabled}
            />
            <span className="text-shine">{stat.suffix}</span>
          </p>
          <p className="type-spec mt-1.5 text-[0.625rem] leading-tight text-muted-2 sm:mt-2.5 sm:text-[0.6875rem]">
            {stat.label}
          </p>
        </dd>
      </BlurFade>
    ))}
  </dl>
);
