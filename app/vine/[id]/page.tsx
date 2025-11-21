import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { client, urlFor, winesQuery, videosQuery } from "@/lib/sanity";
import type { Wine } from "@/lib/types";

const styleLabels: Record<string, string> = {
  frisk: "Frisk",
  fyldig: "Fyldig",
  mineralsk: "Mineralsk",
  saftig: "Saftig",
  krydret: "Krydret",
  let: "Let",
  struktureret: "Struktureret",
};

const tasteLabel: Record<string, string> = {
  frugt: "Frugt",
  syre: "Syre",
  fad: "Fad",
  tannin: "Tannin",
  mineral: "Mineral",
  blomst: "Blomst",
};

const colorLabels: Record<string, string> = {
  rød: "Rød",
  hvid: "Hvid",
  rosé: "Rosé",
  mousserende: "Mousserende",
};

const priceLabels: Record<string, string> = {
  under150: "Under 150 kr.",
  "150-250": "150 – 250 kr.",
  "250-400": "250 – 400 kr.",
  over400: "Over 400 kr.",
};

export async function generateStaticParams() {
  const wines = await client.fetch(winesQuery);
  return wines.map((wine: any) => ({
    id: wine.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const wines = await client.fetch(winesQuery);
  const wine = wines.find((w: any) => w.id === params.id);

  if (!wine) {
    return {
      title: "Vin ikke fundet",
    };
  }

  return {
    title: `${wine.title} ${wine.year} – Vinovenner`,
    description: wine.shortNote,
  };
}

export default async function WineDetailPage({ params }: { params: { id: string } }) {
  const wines = await client.fetch(winesQuery);
  const videos = await client.fetch(videosQuery);
  
  const wineData = wines.find((w: any) => w.id === params.id);

  if (!wineData) {
    notFound();
  }

  const wine: Wine = {
    id: wineData.id,
    title: wineData.title,
    year: wineData.year,
    producer: wineData.producer,
    region: wineData.region,
    country: wineData.country,
    color: wineData.color,
    grapes: wineData.grapes || [],
    priceTier: wineData.priceTier,
    styleTags: wineData.styleTags || [],
    occasions: wineData.occasions || [],
    shortNote: wineData.shortNote,
    longNote: wineData.longNote,
    recommendation: wineData.recommendation,
    foodPairing: wineData.foodPairing,
    tasteIcons: wineData.tasteIcons || [],
    affiliate: wineData.affiliate,
    image: wineData.image?.asset 
      ? urlFor(wineData.image).width(800).height(1200).url() 
      : wineData.image || "/assets/images/wine-bourgogne.svg",
    videoId: wineData.videoId,
    score: wineData.score,
    inAnbefalinger: wineData.inAnbefalinger || false,
    inLeksikon: wineData.inLeksikon || false,
  };

  const relatedVideo = wine.videoId 
    ? videos.find((v: any) => v.id === wine.videoId)
    : null;

  return (
    <main className="bg-background text-foreground">
      <section className="bg-card py-8">
        <div className="container">
          <Link
            href="/vine/anbefalinger"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbage til anbefalinger
          </Link>
          
          <div className="grid gap-8 md:grid-cols-[1fr,1.2fr] lg:grid-cols-[1fr,1.5fr]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
              <Image
                src={wine.image}
                alt={`${wine.title} ${wine.year}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 500px, (min-width: 768px) 400px, 100vw"
                priority
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge tone="wine">{colorLabels[wine.color]}</Badge>
                  {wine.styleTags.map((style) => (
                    <Tag key={style} tone="neutral">
                      {styleLabels[style]}
                    </Tag>
                  ))}
                </div>
                <h1 className="font-serif text-3xl font-bold mb-2">{wine.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {wine.producer} · {wine.region}, {wine.country} · {wine.year}
                </p>
                <p className="text-xl font-semibold text-primary mb-6">
                  {priceLabels[wine.priceTier]}
                </p>
                <p className="text-foreground/80 leading-relaxed">{wine.shortNote}</p>
              </div>

              {wine.recommendation && (
                <section className="space-y-3 pt-6 border-t border-border">
                  <h2 className="font-serif text-2xl font-semibold">Hvorfor vi anbefaler den</h2>
                  <p className="text-sm leading-relaxed text-foreground/80">{wine.recommendation}</p>
                </section>
              )}

              {wine.longNote && (
                <section className="space-y-3 pt-6 border-t border-border">
                  <h2 className="font-serif text-2xl font-semibold">Smagsnoter</h2>
                  <p className="text-sm leading-relaxed text-foreground/80">{wine.longNote}</p>
                  {wine.tasteIcons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {wine.tasteIcons.map((taste) => (
                        <Badge key={taste} tone="wine">
                          {tasteLabel[taste]}
                        </Badge>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {wine.foodPairing && (
                <section className="space-y-3 pt-6 border-t border-border">
                  <h2 className="font-serif text-2xl font-semibold">Madparring</h2>
                  <p className="text-sm text-foreground/80">{wine.foodPairing}</p>
                </section>
              )}

              <div className="pt-6 border-t border-border">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-6">
                    <dt className="text-muted-foreground">Årgang</dt>
                    <dd className="font-medium">{wine.year}</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-muted-foreground">Druer</dt>
                    <dd className="font-medium">{wine.grapes.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-muted-foreground">Region</dt>
                    <dd className="font-medium">{wine.region}</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-muted-foreground">Land</dt>
                    <dd className="font-medium">{wine.country}</dd>
                  </div>
                  {wine.score && (
                    <div className="flex justify-between gap-6">
                      <dt className="text-muted-foreground">Score</dt>
                      <dd className="font-medium">{wine.score}/100</dd>
                    </div>
                  )}
                </dl>
              </div>

              {relatedVideo && (
                <div className="space-y-3 rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-semibold">Relateret video</h3>
                  <p className="text-sm text-muted-foreground">{relatedVideo.title}</p>
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full"
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${relatedVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Se video
                    </a>
                  </Button>
                </div>
              )}

              {wine.affiliate && (
                <div className="pt-6">
                  <Button asChild className="w-full" size="lg">
                    <a
                      href={wine.affiliate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {wine.affiliate.label || `Køb hos ${wine.affiliate.partner}`}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

