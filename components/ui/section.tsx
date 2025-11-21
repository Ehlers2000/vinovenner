import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

import { Container } from "./container";

type SectionProps = {
  id?: string;
  headline?: ReactNode;
  description?: ReactNode;
  kicker?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  spacing?: "tight" | "normal" | "loose";
} & Omit<HTMLAttributes<HTMLElement>, "children">;

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  tight: "py-12 sm:py-16",
  normal: "py-16 sm:py-20",
  loose: "py-20 sm:py-24",
};

export function Section({
  id,
  headline,
  description,
  kicker,
  actions,
  children,
  spacing = "normal",
  className,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={clsx(spacingMap[spacing], className)} {...props}>
      <Container>
        {(headline || description || actions || kicker) && (
          <div className="flex flex-col gap-4 pb-10 text-center sm:pb-12">
            {kicker && (
              <span className="inline-flex h-8 w-fit items-center justify-center rounded-full border border-wine-200 bg-wine-50 px-4 text-sm font-semibold uppercase tracking-wide text-wine-700">
                {kicker}
              </span>
            )}
            {headline && (
              <h2 className="font-serif text-3xl tracking-tight text-graphite-900 sm:text-4xl">
                {headline}
              </h2>
            )}
            {description && (
              <p className="mx-auto max-w-2xl text-base text-graphite-600 sm:text-lg">
                {description}
              </p>
            )}
            {actions && <div className="flex flex-wrap justify-center gap-3">{actions}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

