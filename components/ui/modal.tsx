"use client";

import { clsx } from "clsx";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "./button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

export function Modal({ open, onClose, title, description, children, size = "md" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return undefined;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-900/60 px-4 py-10 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div
        className={clsx(
          "relative w-full rounded-3xl border border-graphite-100 bg-white shadow-xl",
          "max-h-[calc(100vh-4rem)] overflow-y-auto",
          sizeClasses[size],
        )}
      >
        <div className="flex items-start justify-between gap-6 border-b border-graphite-100 px-6 pb-4 pt-6">
          <div className="space-y-2">
            {title && <h2 className="font-serif text-2xl text-graphite-900">{title}</h2>}
            {description && <p className="text-sm text-graphite-600">{description}</p>}
          </div>
          <Button
            aria-label="Luk"
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full text-graphite-500 hover:text-graphite-900"
            onClick={onClose}
          >
            <span aria-hidden>×</span>
          </Button>
        </div>
        <div className="space-y-6 px-6 py-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

