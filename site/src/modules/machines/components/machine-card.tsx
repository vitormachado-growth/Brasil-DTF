import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, WhatsAppIcon } from "@/modules/shell/components/icons";
import {
  INSTALLMENTS,
  machinesContent,
  whatsappUrl,
  type Machine,
} from "../data/machines.content";
import { machineImages } from "../data/machine-images";

export interface MachineCardProps {
  machine: Machine;
  ctaLabel: string;
}

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * Uma máquina, na ordem em que o comprador lê: o que é, o que ela faz por ele,
 * quanto custa e o que fazer em seguida.
 *
 * A foto sai limpa, sem véu por cima.
 *
 * Havia uma lavagem navy a 35% em `mix-blend-multiply` aqui, escrita quando eu
 * supunha que as fotos eram de estúdio em fundo claro e fossem furar o layout
 * escuro. Não eram, e o custo era alto: medido, o véu tirava **um terço do
 * brilho e um terço do contraste** de toda foto da página. O cliente reclamou
 * em 09/09/2026 que as fotos estavam "apagadas", e estavam mesmo.
 *
 * A moldura é quadrada porque as fotos de origem são: todas chegam em 900x900.
 *
 * **Duas ações desde 10/09/2026**, a pedido do cliente. Antes o card inteiro
 * era um link de WhatsApp; agora ele leva para a página da máquina e o
 * WhatsApp é um botão à parte. O card inteiro continua clicável pelo truque do
 * link esticado: o "Ver detalhes" tem um `::after` que cobre o card, e o
 * WhatsApp sobe para a frente dele. Link dentro de link é HTML inválido, e
 * este padrão dá as duas ações sem aninhar nada.
 *
 * A superfície e a aura são `.card-surface`, portadas do site do cliente.
 */
export const MachineCard = ({ machine, ctaLabel }: MachineCardProps) => (
  <article
    data-aura
    aria-labelledby={`maquina-${machine.slug}`}
    className="card-surface group relative flex w-full flex-col overflow-hidden rounded-panel"
  >
    <div className="relative aspect-square overflow-hidden bg-ink-800">
      <Image
        src={machineImages[machine.slug]}
        alt={`Impressora ${machine.name}`}
        fill
        loading="lazy"
        sizes="(max-width: 48rem) 92vw, (max-width: 80rem) 45vw, 30vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      {/* O selo virou o tipo da máquina por extenso em 10/09/2026 e ficou
          longo: "Impressora industrial DTF têxtil 60 cm" não cabe numa linha
          sobre a foto de um celular. Com a largura limitada ele quebra em duas
          dentro da foto, em vez de passar da borda e sair cortado. */}
      <span className="type-spec absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-control bg-ink-950/80 px-2.5 py-1.5 leading-snug text-paper backdrop-blur-sm">
        {machine.badge}
      </span>
    </div>

    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
      <div className="flex flex-col gap-2">
        <h3
          id={`maquina-${machine.slug}`}
          className="type-display text-xl leading-tight text-paper transition-colors group-hover:text-accent-hi"
        >
          {machine.name}
        </h3>
        <p className="text-ui leading-snug text-paper/85">{machine.tagline}</p>
        <p className="text-sm text-muted-2">{machine.target}</p>
      </div>

      <dl className="mt-auto grid gap-1.5 border-t border-ink-600/80 pt-4">
        {machine.specs.map((spec) => (
          <div key={spec.label} className="flex items-baseline gap-3 text-sm">
            {/* 6.5rem, nao 5.5: com a Archivo espacada "VELOCIDADE" pede
                99px, e na coluna antiga ele vazava por 11px. */}
            <dt className="type-spec w-[6.5rem] shrink-0 text-muted-2">
              {spec.label}
            </dt>
            <dd className="text-muted">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-4 border-t border-ink-600/80 pt-4">
        {/* Preço cheio à vista em destaque, com "à vista" no amarelo, e o
            parcelado pequeno embaixo, como o cliente pediu em 10/09/2026. */}
        <div>
          {machine.price ? (
            <>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="type-display text-2xl leading-none text-paper">
                  {brl.format(machine.price)}
                </span>
                <span className="type-spec text-accent">à vista</span>
              </p>
              {machine.installment ? (
                <p className="mt-1.5 text-xs text-muted-2">
                  ou {INSTALLMENTS}x de {brl.format(machine.installment)}
                </p>
              ) : null}
            </>
          ) : (
            <p className="type-display text-xl leading-none text-paper">
              Sob consulta
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* O link esticado: é ele que faz o card inteiro levar para a
              página da máquina. */}
          {/* Sem prefetch de propósito. No site exportado como arquivos o
              Next pede um payload de rota dinâmica que a exportação grava com
              outro nome, então cada card dispararia um pedido que volta 404.
              A navegação não depende dele: sem o prefetch o clique só faz um
              carregamento normal de uma página estática pequena. */}
          <Link
            href={`/maquinas/${machine.slug}`}
            prefetch={false}
            className="type-action inline-flex items-center gap-2 text-xs text-paper transition-colors after:absolute after:inset-0 hover:text-accent-hi"
          >
            {machinesContent.cardDetails}
            <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          {/* Precisa subir para a frente do link esticado, senão o clique
              nele cairia na página da máquina. */}
          <a
            href={whatsappUrl(machine)}
            target="_blank"
            rel="noopener"
            aria-label={`${machine.name}: falar no WhatsApp sobre esta máquina`}
            className="type-action relative z-10 inline-flex items-center gap-2 rounded-control border border-accent-line px-3 py-2 text-xs text-accent transition-colors hover:border-accent hover:text-accent-hi"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  </article>
);
