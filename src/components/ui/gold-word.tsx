import type { ReactNode } from "react";

/**
 * Sets one word of a display line apart, the device the client's live page
 * uses on "faturar". There it is a yellow box with a light sweeping across it;
 * here the word itself is gold metal with the sweep running through the
 * letters, the same signature carried over to a dark ground.
 *
 * Shared by the hero headline and the closing band because it is the same word
 * in the same promise, and the two had drifted: the hero paid it in gold and
 * the band left it plain white. Two copies of this rule would drift again.
 *
 * Splitting on a captured group keeps the separators in the result, so the
 * line is rebuilt with nothing lost and no assumption about where the word
 * sits. SplitText is happy to split lines that contain nested elements, so the
 * span survives the hero's reveal.
 */
export const goldWord = (line: string, highlight?: string): ReactNode => {
  if (!highlight) return line;

  // Splitting on a match at the start or end of the line leaves empty strings
  // in the result, which would render as empty accent spans.
  const parts = line
    .split(new RegExp(`(${escapeRegExp(highlight)})`, "i"))
    .filter(Boolean);
  if (parts.length === 1) return line;

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className="text-shine">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
