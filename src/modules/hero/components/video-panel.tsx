"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/components/animation/gsap/register";
import { PlayIcon, SoundIcon } from "@/modules/shell/components/icons";

export interface VideoPanelProps {
  /** YouTube video id. */
  videoId: string;
  poster: StaticImageData;
  /** Describes what the viewer is about to watch, not just "play". */
  label: string;
  /** Start muted on its own, without waiting for a click. */
  autoPlay?: boolean;
  /** Gate for `autoPlay`: hold until the opening animation hands the page over. */
  enabled?: boolean;
  className?: string;
  sizes?: string;
}

type Mode = "poster" | "ambient" | "watching";

const EMBED = "https://www.youtube-nocookie.com/embed";

/**
 * Stripped of every piece of player furniture YouTube will let go of: no
 * control bar, no keyboard handling, no fullscreen button, no annotations.
 * `loop` needs `playlist` set to the same id, which is how a single video is
 * looped. Paired with `pointer-events: none` on the iframe, the title bar and
 * the hover chrome never get a chance to appear either.
 */
const ambientParams = (videoId: string) =>
  [
    "autoplay=1",
    "mute=1",
    "controls=0",
    "disablekb=1",
    "fs=0",
    "iv_load_policy=3",
    // Sem legenda automatica por cima do video: e mais uma camada de texto
    // numa tela que a gente acabou de limpar.
    "cc_load_policy=0",
    "cc_lang_pref=pt",
    "loop=1",
    `playlist=${videoId}`,
    "rel=0",
    "playsinline=1",
  ].join("&");

/** The real player, for someone who chose to watch: controls back, sound on. */
const watchParams = () =>
  ["autoplay=1", "mute=0", "rel=0", "playsinline=1"].join("&");

/**
 * The hero video, in two states.
 *
 * On arrival it plays as ambience: moving, muted, and completely free of
 * YouTube's interface. That interface is the problem it solves. An ordinary
 * embed opens with a title bar, a channel avatar, three icon buttons, a
 * progress bar, a fullscreen button and a YouTube logo stacked over the frame,
 * which is a lot of someone else's furniture in the middle of the page.
 *
 * Sound is the deliberate act. Clicking anywhere on the panel swaps the
 * ambient loop for the real player, with controls and audio, from the top.
 *
 * The iframe waits for `enabled` rather than starting at page load, and that
 * wait is doing real work: the poster is a plain image, so it stays the LCP
 * element and the first screen paints without several hundred kilobytes of
 * third-party player code. Reduced motion never leaves the poster at all.
 *
 * The wrapper holds the 16:9 ratio, so swapping states never shifts the page.
 */
export const VideoPanel = ({
  videoId,
  poster,
  label,
  autoPlay = false,
  enabled = true,
  className,
  sizes = "(max-width: 1024px) 100vw, 44vw",
}: VideoPanelProps) => {
  const [mode, setMode] = useState<Mode>("poster");

  useEffect(() => {
    if (!autoPlay || !enabled) return;
    if (prefersReducedMotion()) return;

    setMode((current) => (current === "poster" ? "ambient" : current));
  }, [autoPlay, enabled]);

  return (
    <div
      className={["relative overflow-hidden bg-ink-950", className]
        .filter(Boolean)
        .join(" ")}
    >
      {mode === "watching" && (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`${EMBED}/${videoId}?${watchParams()}`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}

      {mode === "ambient" && (
        <>
          <iframe
            // Decorative in this state, and unreachable on purpose: without a
            // hover target YouTube never draws its chrome over the frame.
            className="pointer-events-none absolute inset-0 h-full w-full"
            src={`${EMBED}/${videoId}?${ambientParams(videoId)}`}
            title=""
            aria-hidden
            tabIndex={-1}
            allow="autoplay; encrypted-media"
          />

          <button
            type="button"
            onClick={() => setMode("watching")}
            aria-label={`${label}, com som`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <span
              aria-hidden
              className="type-action absolute bottom-3 left-3 flex items-center gap-2 rounded-control border border-paper/25 bg-ink-950/75 px-3 py-2 text-[0.6875rem] text-paper backdrop-blur-sm transition-[background-color,border-color,color] duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
            >
              <SoundIcon className="h-3.5 w-3.5" />
              Ativar som
            </span>
          </button>
        </>
      )}

      {mode === "poster" && (
        <button
          type="button"
          onClick={() => setMode("watching")}
          aria-label={label}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes={sizes}
            className="object-cover"
          />

          <span
            aria-hidden
            className="absolute inset-0 bg-ink-950/20 transition-colors duration-300 group-hover:bg-ink-950/5"
          />

          {/* Glass rather than a solid yellow disc: the thumbnail already
              carries a lot of yellow, and a filled circle competes with it and
              covers the face underneath. This reads as a player control and
              lets the frame through. It fills in on hover. */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 bg-ink-950/45 text-paper backdrop-blur-sm transition-[transform,background-color,border-color,color] duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
          >
            <PlayIcon className="ml-0.5 h-4 w-4" />
          </span>
        </button>
      )}
    </div>
  );
};
