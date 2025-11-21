import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const starterSections: {
  title: string;
  description: string;
  href: Route;
  cta: string;
}[] = [
  {
    title: "Nysgerrig nybegynder",
    description: "Start din vinrejse med grundlæggende guides og lette vine.",
    href: "/blog",
    cta: "Kom i gang",
  },
  {
    title: "Kvalitet til maden",
    description: "Find den perfekte vin til din ret med vores parringsguides.",
    href: "/vine",
    cta: "Se parringer",
  },
  {
    title: "Gaven",
    description: "Gaveidéer og tema-pakker til den vininteresserede ven.",
    href: "/vine",
    cta: "Find gaven",
  },
];

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative flex min-h-[900px] items-center overflow-hidden">
        <Image
          src="/hero-front.png"
          alt="Venner der skåler med vin"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="container relative z-10 px-4 py-36 text-background sm:py-44">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-background sm:text-5xl lg:text-6xl">
            Ærlige vine. Fortalt af venner.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-background/90">
            Vi finder og forklarer gode vine – med historier, smag og klare anbefalinger.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/vine">
                Se ugens anbefaling
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="secondary" asChild size="lg">
              <Link href="/videoer">
                <Play className="mr-2 h-5 w-5" />
                Se vores videoer
              </Link>
            </Button>
          </div>
        </div>
      </section>


      <section className="bg-muted py-16">
        <div className="container space-y-12">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold">Start her</h2>
            <p className="mt-2 text-muted-foreground">Find indhold der passer til dig</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {starterSections.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-card p-8 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-serif text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.description}</p>
                <Button variant="outline" className="mt-8 w-full" asChild>
                  <Link href={item.href}>{item.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

