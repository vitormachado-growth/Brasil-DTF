import Link from "next/link";
import { notFound } from "next/navigation";

import { BlurFade } from "@/components/animation/gsap/blur-fade";
import { ActionButton } from "@/components/ui/action-button";
import { SiteHeader } from "@/modules/shell/components/site-header";
import { SiteFooter } from "@/modules/shell/components/site-footer";
import {
  ArrowRightIcon,
  CheckIcon,
  WhatsAppIcon,
} from "@/modules/shell/components/icons";
import {
  INSTALLMENTS,
  machines,
  machinesContent,
  whatsappUrl,
} from "@/modules/machines/data/machines.content";
import {
  SPECS_RESSALVA,
  machineDetails,
} from "@/modules/machines/data/machine-details";
import { machineGallery } from "@/modules/machines/data/machine-gallery";
import { machineImages } from "@/modules/machines/data/machine-images";
import { PhotoGallery } from "@/modules/machines/components/photo-gallery";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * A página de uma máquina.
 *
 * O cliente pediu em 10/09/2026: no card só cabe o resumo, e quem está
 * decidindo uma compra de dezenas de milhares de reais precisa ver as fotos, o
 * que vem na caixa e a ficha inteira. A estrutura é a da página que ele já tem
 * no ar (fotos, destaques, o que acompanha, especificações, WhatsApp), porque
 * ele mesmo apontou aquela como espelho.
 *
 * Uma diferença deliberada: lá as fotos ficam num carrossel e aqui aparecem
 * todas de uma vez, a primeira grande e o resto numa fileira. São de duas a
 * quatro fotos por máquina, então o carrossel só esconderia metade delas atrás
 * de um clique, e a página existe justamente para mostrar.
 *
 * As fotos vêm em proporções bem diferentes (quadrada, 3:2, paisagem larga),
 * então cada uma aparece inteira dentro de uma moldura fixa, sem corte.
 */
export const MachineDetailView = ({ slug }: { slug: string }) => {
  const machine = machines.find((m) => m.slug === slug);
  if (!machine) notFound();

  const detail = machineDetails[slug];
  const fotos = machineGallery[slug] ?? [machineImages[slug]];
  const conversa = whatsappUrl(machine);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader />

      <main id="main" className="bg-ink-900">
        <div className="relative isolate overflow-hidden border-b border-ink-600 pb-16 pt-28 lg:pb-24 lg:pt-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-print-grid"
          />

          <div className="relative mx-auto max-w-shell px-5 sm:px-8">
            <BlurFade y={8}>
              <Link
                href="/#impressoras"
                className="type-spec inline-flex items-center gap-2 text-muted-2 transition-colors hover:text-accent-hi"
              >
                <span aria-hidden>&larr;</span>
                {machinesContent.detail.back}
              </Link>
            </BlurFade>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-columns">
              {/* Fotos, clicáveis para ampliar */}
              <BlurFade y={16}>
                <PhotoGallery fotos={fotos} nome={machine.name} />
              </BlurFade>

              {/* Identidade, preço e ação */}
              <div className="flex flex-col gap-6">
                <BlurFade y={10}>
                  <p className="type-spec text-accent">{machine.badge}</p>
                </BlurFade>

                <BlurFade y={14}>
                  <h1 className="type-display text-[clamp(2rem,4vw,3.5rem)] text-paper">
                    {machine.name}
                  </h1>
                  <p className="mt-4 text-lead leading-relaxed text-paper/85">
                    {machine.tagline}
                  </p>
                  <p className="mt-2 text-sm text-muted-2">
                    {machinesContent.detail.idealFor}: {machine.target}
                  </p>
                </BlurFade>

                <BlurFade y={12}>
                  <dl className="grid gap-1.5 border-y border-ink-600 py-5">
                    {machine.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-baseline gap-3 text-sm"
                      >
                        <dt className="type-spec w-[6.5rem] shrink-0 text-muted-2">
                          {spec.label}
                        </dt>
                        <dd className="text-muted">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </BlurFade>

                <BlurFade y={12}>
                  {machine.price ? (
                    <div>
                      <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="type-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none text-paper">
                          {brl.format(machine.price)}
                        </span>
                        <span className="type-spec text-accent">à vista</span>
                      </p>
                      {machine.installment ? (
                        <p className="mt-2 text-sm text-muted-2">
                          ou {INSTALLMENTS}x de {brl.format(machine.installment)}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="type-display text-2xl leading-none text-paper">
                      Sob consulta
                    </p>
                  )}
                </BlurFade>

                <BlurFade y={12}>
                  <ActionButton
                    href={conversa}
                    label={machinesContent.cardCta}
                    target="_blank"
                    rel="noopener"
                    icon={<WhatsAppIcon className="h-4 w-4" />}
                    shine
                  />
                </BlurFade>
              </div>
            </div>
          </div>
        </div>

        {/* Destaques, kit e ficha completa */}
        <div className="mx-auto flex max-w-shell flex-col gap-14 px-5 py-16 sm:px-8 lg:gap-20 lg:py-24">
          {detail?.destaques.length ? (
            <BlurFade inView y={14}>
              <section aria-labelledby="destaques">
                <h2
                  id="destaques"
                  className="type-display text-[clamp(1.5rem,2.4vw,2.25rem)] text-paper"
                >
                  {machinesContent.detail.highlights}
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {detail.destaques.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 rounded-panel border border-ink-600 bg-ink-850/70 p-5"
                    >
                      <span aria-hidden className="check-box mt-0.5">
                        <CheckIcon className="h-[0.8125rem] w-[0.8125rem]" />
                      </span>
                      <span className="text-ui leading-relaxed text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </BlurFade>
          ) : null}

          {detail?.kit.length ? (
            <BlurFade inView y={14}>
              <section aria-labelledby="kit">
                <h2
                  id="kit"
                  className="type-display text-[clamp(1.5rem,2.4vw,2.25rem)] text-paper"
                >
                  {machinesContent.detail.kit}
                </h2>
                <ul className="mt-6 divide-y divide-ink-600/70 rounded-panel border border-ink-600 bg-ink-850/70 px-6 sm:px-7">
                  {detail.kit.map((item) => (
                    <li key={item} className="flex items-start gap-3.5 py-4">
                      <span aria-hidden className="check-box mt-0.5">
                        <CheckIcon className="h-[0.8125rem] w-[0.8125rem]" />
                      </span>
                      <span className="text-ui leading-relaxed text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </BlurFade>
          ) : null}

          {detail?.specs.length ? (
            <BlurFade inView y={14}>
              <section aria-labelledby="ficha">
                <h2
                  id="ficha"
                  className="type-display text-[clamp(1.5rem,2.4vw,2.25rem)] text-paper"
                >
                  {machinesContent.detail.specs}
                </h2>
                <dl className="mt-6 divide-y divide-ink-600/70 rounded-panel border border-ink-600 bg-ink-850/70 px-6 sm:px-7">
                  {detail.specs.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <dt className="type-spec shrink-0 text-muted-2 sm:w-[14rem]">
                        {row.label}
                      </dt>
                      <dd className="text-ui text-muted">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-muted-2">{SPECS_RESSALVA}</p>
              </section>
            </BlurFade>
          ) : null}

          {/* Faixa final, a mesma do site do cliente */}
          <BlurFade inView y={18} className="relative mx-auto w-full max-w-4xl">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(254_191_2_/_0.14),transparent_72%)]"
            />
            <div className="relative isolate overflow-hidden rounded-panel border border-accent-line bg-[radial-gradient(130%_90%_at_50%_-20%,rgb(254_191_2_/_0.08),transparent_55%),linear-gradient(180deg,var(--ink-800),var(--ink-850)_45%,#030f24)] shadow-[0_0_80px_-20px_rgb(254_191_2_/_0.35),inset_0_1px_rgb(255_255_255_/_0.06)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-print-grid opacity-60"
              />
              <div className="relative flex flex-col items-center gap-6 px-6 py-11 text-center sm:px-14 sm:py-14">
                <span aria-hidden className="h-1 w-14 rounded-full bg-accent" />
                <h2 className="type-display max-w-[22ch] text-balance text-[clamp(1.5rem,2.8vw,2.75rem)] text-paper">
                  {machinesContent.detail.bandTitle}
                </h2>
                <p className="max-w-[52ch] text-balance text-lead leading-relaxed text-muted">
                  {machinesContent.detail.bandText}
                </p>
                <ActionButton
                  href={conversa}
                  label={machinesContent.cardCta}
                  target="_blank"
                  rel="noopener"
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                />
                <Link
                  href="/#impressoras"
                  className="type-action inline-flex items-center gap-2 text-xs text-accent transition-colors hover:text-accent-hi"
                >
                  {machinesContent.detail.back}
                  <ArrowRightIcon className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};
