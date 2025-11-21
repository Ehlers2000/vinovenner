import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "link";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  asChild?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-400 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-wine-700 text-cream-25 shadow-card hover:bg-wine-600 active:bg-wine-800 focus-visible:outline-wine-600",
  secondary:
    "bg-forest-600 text-cream-25 shadow-card hover:bg-forest-500 active:bg-forest-700 focus-visible:outline-forest-500",
  ghost:
    "bg-transparent text-wine-700 hover:bg-wine-50 active:bg-wine-100 focus-visible:outline-wine-500",
  outline:
    "border border-graphite-200 bg-transparent text-graphite-800 hover:bg-graphite-50 active:bg-graphite-100 focus-visible:outline-graphite-400",
  link: "bg-transparent text-wine-700 underline-offset-4 hover:text-wine-600 hover:underline focus-visible:outline-wine-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-base",
  lg: "h-14 px-7 text-base sm:text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", fullWidth = false, asChild = false, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
});

