import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

type CardProps = {
  padding?: "sm" | "md" | "lg" | "none";
  interactive?: boolean;
  shadow?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const paddingMap: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-7",
  lg: "p-8 sm:p-10",
};

export function Card({
  className,
  padding = "md",
  interactive = false,
  shadow = true,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-graphite-100 bg-white",
        paddingMap[padding],
        shadow && "shadow-card",
        interactive && "transition hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

