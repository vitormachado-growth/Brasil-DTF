import type { ReactNode } from "react";
import { keepTermsWhole, type FaqItem } from "../data/support.content";

/**
 * Turns the `**bold**` markers in an answer into <strong>, and nothing else.
 * Seven answers with one kind of emphasis do not need a markdown library.
 */
const emphasise = (text: string): ReactNode[] =>
  text.split("**").map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-paper">
        {part}
      </strong>
    ) : (
      part
    ),
  );

/**
 * The questions, as native disclosure widgets.
 *
 * `<details>` gives keyboard operation, screen-reader semantics and open state
 * for free, with no client JavaScript and nothing for GSAP to manage. What it
 * does not give is a smooth open, so the height animation lives in CSS on
 * `::details-content` (see globals). Nothing here manages it.
 *
 * `name="faq"` makes the group exclusive: opening one closes the last, which
 * is how the client's live page behaves and what keeps a seven-item list from
 * growing into a wall.
 *
 * The open row is tinted gold (see globals) and its question turns gold with
 * it, so which one is open reads at a glance instead of only from the cross.
 *
 * Plain <div> and <h3>, not <dl>/<dt>/<dd>: a <details> is not a legal child
 * of a definition list, and a heading is a legal child of <summary>.
 */
export const FaqList = ({ items }: { items: readonly FaqItem[] }) => (
  <div className="divide-y divide-ink-600 border-y border-ink-600">
    {items.map((item) => (
      <details key={item.q} name="faq" className="faq-item group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-4 py-5 text-left [&::-webkit-details-marker]:hidden sm:px-5">
          <h3 className="type-display text-base text-paper transition-colors group-hover:text-accent-hi group-open:text-accent sm:text-lg">
            {keepTermsWhole(item.q)}
          </h3>
          <span
            aria-hidden
            className="relative h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
          >
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          </span>
        </summary>
        <p className="max-w-[62ch] px-4 pb-6 text-ui leading-relaxed text-muted sm:px-5">
          {emphasise(item.a)}
        </p>
      </details>
    ))}
  </div>
);
