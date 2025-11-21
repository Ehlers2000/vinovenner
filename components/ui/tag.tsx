import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

type TagTone = "wine" | "forest" | "gold" | "neutral";

const toneClasses: Record<TagTone, string> = {
  wine: "bg-wine-50 text-wine-700",
  forest: "bg-forest-50 text-forest-700",
  gold: "bg-[#fff4d6] text-[#a05a00]",
  neutral: "bg-graphite-100 text-graphite-700",
};

type TagProps = {
  tone?: TagTone;
} & HTMLAttributes<HTMLSpanElement>;

export function Tag({ tone = "neutral", className, ...props }: TagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}

