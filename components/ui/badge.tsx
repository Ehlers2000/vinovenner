import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "wine" | "forest" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  wine: "bg-wine-50 text-wine-700 border-wine-200",
  forest: "bg-forest-50 text-forest-700 border-forest-200",
  neutral: "bg-graphite-100 text-graphite-700 border-graphite-200",
};

type BadgeProps = {
  tone?: BadgeTone;
  icon?: ReactNode;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({ tone = "wine", icon, children, className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}

