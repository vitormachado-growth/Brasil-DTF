import Image from "next/image";
import { ArrowRightIcon, WhatsAppIcon } from "@/modules/shell/components/icons";
import { supplyWhatsappUrl, type Supply } from "../data/supplies.content";
import { supplyImages } from "../data/supply-images";

export interface SupplyCardProps {
  supply: Supply;
  ctaLabel: string;
}

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * One supply. Denser than a machine card on purpose: a bottle of ink is a
 * R$ 70 decision, not a R$ 70.000 one, so it gets a photo, a name, one line of
 * detail and a price, and nothing that asks the reader to slow down.
 *
 * A lavagem navy saiu daqui em 09/09/2026, junto com a das máquinas, pelo
 * mesmo motivo: ela custava um terço do brilho e um terço do contraste de cada
 * foto, e o cliente reparou. Ver `machine-card.tsx` para a medição.
 *
 * The whole card is the link, same as the machines.
 */
export const SupplyCard = ({ supply, ctaLabel }: SupplyCardProps) => (
  <a
    href={supplyWhatsappUrl(supply)}
    target="_blank"
    rel="noopener"
    aria-label={`${supply.name}, ${supply.detail}: pedir pelo WhatsApp`}
    data-aura
    className="card-surface group flex w-full flex-col overflow-hidden rounded-panel"
  >
    <div className="relative aspect-square overflow-hidden bg-ink-800">
      <Image
        src={supplyImages[supply.slug]}
        alt={`${supply.name}, ${supply.detail}`}
        fill
        loading="lazy"
        sizes="(max-width: 40rem) 46vw, (max-width: 64rem) 30vw, 22vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>

    <div className="flex flex-1 flex-col gap-1 p-4">
      <h3 className="type-display text-base leading-tight text-paper transition-colors group-hover:text-accent-hi">
        {supply.name}
      </h3>
      <p className="text-sm text-muted">{supply.detail}</p>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-2 border-t border-ink-600/80 pt-3">
        <p className="type-display text-lg leading-none text-paper">
          {brl.format(supply.price)}
        </p>
        <span className="type-action inline-flex items-center gap-1.5 text-[0.6875rem] text-accent transition-colors group-hover:text-accent-hi">
          <WhatsAppIcon className="h-3.5 w-3.5" />
          {ctaLabel}
          <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  </a>
);
