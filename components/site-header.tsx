"use client";

import { Menu, Wine, X } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const vineMenuLinks: { href: string; label: string }[] = [
  { href: "/shop", label: "Shop" },
  { href: "/vine/anbefalinger", label: "Anbefalinger" },
  { href: "/vine/leksikon", label: "Leksikon" },
];

const navLinks: { href: Route; label: string }[] = [
  { href: "/videoer", label: "Videoer" },
  { href: "/smagninger", label: "Smagninger" },
  { href: "/blog", label: "Blog/Guides" },
  { href: "/om-os", label: "Om os" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [vineOpen, setVineOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openVineMenu() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setVineOpen(true);
  }

  function scheduleCloseVineMenu(delay = 120) {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setVineOpen(false);
      closeTimeoutRef.current = null;
    }, delay);
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container px-4 py-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Vinovenner forside">
            <Wine className="h-7 w-7 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <span className="font-serif text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
              Vinovenner
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
            <div
              className="relative"
              onMouseEnter={openVineMenu}
              onMouseLeave={() => scheduleCloseVineMenu()}
            >
              <button
                type="button"
                className="flex items-center gap-1 transition hover:text-primary"
                onClick={() => (vineOpen ? scheduleCloseVineMenu(0) : openVineMenu())}
                aria-haspopup="true"
                aria-expanded={vineOpen}
              >
                Vine
                <span aria-hidden>{vineOpen ? "–" : "+"}</span>
              </button>
              {vineOpen && (
                <div className="absolute left-0 top-full mt-3 w-48 rounded-2xl border border-border bg-card p-3 shadow-lg">
                  {vineMenuLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href as Route}
                      className="block rounded-xl px-3 py-2 text-sm text-foreground/80 transition hover:bg-muted hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative transition-all duration-200 hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 text-foreground transition hover:bg-muted/70 hover:text-primary"
            aria-label="Åbn menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 border-t border-border/60 pt-4 md:hidden">
            <div className="flex flex-col gap-1">
              <div className="rounded-lg bg-muted/60 p-2">
                <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Vine
                </p>
                {vineMenuLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as Route}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted/80 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-2 py-3 text-sm font-medium text-foreground/80 transition hover:bg-muted/80 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

