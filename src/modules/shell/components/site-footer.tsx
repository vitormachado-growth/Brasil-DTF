import { Logo } from "@/modules/brand/components/logo";
import { UnderlineLink } from "@/components/animation/gsap/underline-link";
import { contactContent } from "../data/nav.content";

const CHANNELS = [
  { label: "WhatsApp", href: contactContent.whatsapp[0] },
  { label: "Instagram", href: contactContent.instagram },
  { label: "YouTube", href: contactContent.youtube },
  { label: "Loja", href: contactContent.store },
] as const;

/**
 * Footer.
 *
 * Deliberately thin for now: the page ends on the channels the business
 * actually answers on, every one of them recovered from the live store rather
 * than invented. It grows as the sections below the hero land.
 */
export const SiteFooter = () => (
  <footer className="border-t border-ink-600 bg-ink-950">
    <div className="mx-auto flex max-w-shell flex-col gap-10 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <Logo height={52} />

      <nav aria-label="Canais de contato">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {CHANNELS.map((channel) => (
            <li key={channel.label}>
              <UnderlineLink
                href={channel.href}
                label={channel.label}
                variant="in-out"
                target="_blank"
                rel="noopener"
                className="text-sm text-muted transition-colors hover:text-paper"
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className="border-t border-ink-600/70">
      <div className="mx-auto flex max-w-shell flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="type-spec text-muted-2">
          © {new Date().getFullYear()} Brasil DTF
        </p>
        <p className="type-spec text-muted-2">
          Desenvolvida por{" "}
          <a
            href="https://methodgrowthhub.com.br"
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-accent-hi"
          >
            Method Growth Hub
          </a>
        </p>
      </div>
    </div>
  </footer>
);
