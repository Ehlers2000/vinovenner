import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  width?: "sm" | "md" | "lg" | "xl" | "full";
} & ComponentPropsWithoutRef<T>;

const widthClasses: Record<NonNullable<ContainerProps["width"]>, string> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-7xl",
};

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  width = "xl",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={clsx(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        widthClasses[width],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

