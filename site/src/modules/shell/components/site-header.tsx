"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "@/components/animation/gsap/register";
import { UnderlineLink } from "@/components/animation/gsap/underline-link";
import { ActionButton } from "@/components/ui/action-button";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { Logo } from "@/modules/brand/components/logo";
import { navContent } from "../data/nav.content";
import { WhatsAppIcon } from "./icons";

/**
 * Site header.
 *
 * Fixed, so it travels with the page. Over the top of the hero it is only a
 * hairline and lets the section run full height; once the page moves it
 * becomes frosted glass, the same behaviour as the client's live page, ported
 * from white to navy.
 *
 * The bar is a three column grid rather than `justify-between`. With a narrow
 * logo on one side and a wide button on the other, space-between centres the
 * *gaps*, not the nav, and the links end up visibly left of centre. Equal
 * outer tracks put the nav on the real middle of the page.
 */
export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const startScroll = useScroll((state) => state.start);
  const stopScroll = useScroll((state) => state.stop);

  // The sheet covers the page, so the page behind it must not move.
  useEffect(() => {
    if (open) stopScroll();
    else startScroll();
    return () => startScroll();
  }, [open, startScroll, stopScroll]);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      // A plain number is a scroll position in px, so this needs no element:
      // past 8px the bar is glass, back above it the bar is bare.
      start: 8,
      end: "max",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    // A reload partway down the page must not start in the transparent state.
    setScrolled(window.scrollY > 8);

    return () => trigger.kill();
  }, []);

  useGSAP(
    () => {
      const sheet = sheetRef.current;
      if (!sheet) return;

      if (prefersReducedMotion()) {
        gsap.set(sheet, { autoAlpha: open ? 1 : 0 });
        return;
      }

      if (open) {
        gsap
          .timeline()
          .set(sheet, { autoAlpha: 1 })
          .fromTo(
            sheet,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.out" },
          )
          .fromTo(
            sheet.querySelectorAll("[data-sheet-item]"),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 },
            "-=0.25",
          );
        return;
      }

      gsap.to(sheet, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
    },
    { dependencies: [open] },
  );

  // The sheet gets the glass treatment as soon as it opens, whatever the
  // scroll position, or it would float over the hero on nothing.
  const glass = scrolled || open;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out",
        glass
          ? "border-b border-ink-600 bg-ink-950/70 shadow-[0_14px_34px_-20px_rgb(0_0_0_/_0.75)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-ink-600/70 bg-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto grid max-w-shell grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-6 px-5 transition-[padding] duration-300 ease-out sm:px-8",
          scrolled ? "py-2.5" : "py-4",
        ].join(" ")}
      >
        <Logo height={44} priority className="justify-self-start" />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navContent.links.map((link) => (
              <li key={link.href}>
                <UnderlineLink
                  href={link.href}
                  label={link.label}
                  variant="in-out"
                  className="text-nav font-medium text-muted transition-colors hover:text-paper"
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-start-3 flex items-center gap-3 justify-self-end">
          <ActionButton
            href={navContent.cta.href}
            label={navContent.cta.label}
            target="_blank"
            rel="noopener"
            icon={<WhatsAppIcon className="h-4 w-4" />}
            className="max-md:hidden"
          />

          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-control border border-ink-600 text-paper transition-colors hover:border-accent lg:hidden"
          >
            <span className="sr-only">
              {open ? "Fechar menu" : "Abrir menu"}
            </span>
            <span
              aria-hidden
              className={`h-px w-4 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-px w-4 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={sheetRef}
        // Starts `invisible`, and GSAP drives it with `autoAlpha`, which
        // animates opacity and toggles visibility together. That keeps the
        // closed sheet out of the tab order without a `display` swap, which
        // would kill the exit animation.
        //
        // Absolute, and that is load-bearing. `visibility: hidden` still takes
        // up space, so in the flow the closed sheet made this fixed header 454
        // pixels tall on a phone: an invisible slab lying over the top half of
        // the hero, swallowing taps meant for the buttons under it. Hung below
        // the bar instead, the header is only ever as tall as the bar, and the
        // sheet carries its own surface since the bar's glass no longer reaches
        // it.
        className="invisible absolute inset-x-0 top-full border-t border-ink-600/60 bg-ink-950/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Principal, móvel" className="px-5 py-8 sm:px-8">
          <ul className="flex flex-col gap-1">
            {navContent.links.map((link) => (
              <li key={link.href} data-sheet-item>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="type-display block border-b border-ink-600/60 py-4 text-2xl text-paper transition-colors hover:text-accent-hi"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div data-sheet-item className="mt-8">
            <ActionButton
              href={navContent.cta.href}
              label={navContent.cta.label}
              target="_blank"
              rel="noopener"
              icon={<WhatsAppIcon className="h-4 w-4" />}
              className="w-full"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
