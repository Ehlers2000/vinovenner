import Image from "next/image";
import Link from "next/link";
import { Wine } from "lucide-react";

import { primaryNav, legalNav, socialNav } from "@/lib/navigation";

import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card text-foreground">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
          <Link href="/" className="group mb-4 flex items-center gap-2.5" aria-label="Vinovenner forside">
            <Wine className="h-7 w-7 text-primary transition group-hover:rotate-12 group-hover:text-primary" />
            <span className="font-serif text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
              Vinovenner
            </span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              Ærlige vine. Fortalt af venner. Vi finder og forklarer gode vine – med historier, smag
              og klare anbefalinger.
            </p>
            <div className="flex gap-3">
              {socialNav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="text-muted-foreground transition hover:text-primary"
                >
                  <Image
                    src={item.iconSrc}
                    alt={item.label}
                    width={item.width}
                    height={item.height}
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">Info</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">Nyhedsbrev</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Få ærlige anbefalinger 1–2 gange om måneden. Ingen spam – kun vin, vi selv drikker.
            </p>
            <form className="mt-4 space-y-2">
              <label htmlFor="footer-email" className="sr-only">
                Din e-mail
              </label>
              <input
                id="footer-email"
                type="email"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="din@email.dk"
              />
              <Button type="submit" size="sm" className="w-full">
                Tilmeld
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Vinovenner. Alle rettigheder forbeholdes.</p>
            <div className="flex gap-4">
              {legalNav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

