"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Filter } from "lucide-react";
import Link from "next/link";

import { WineCard } from "@/components/cards/wine-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client, urlFor, winesQuery } from "@/lib/sanity";
import type { Wine, WineColor, PriceTier, Occasion } from "@/lib/types";

type SortOption = "seneste" | "pris" | "favorit";

const priceOrder: PriceTier[] = ["under150", "150-250", "250-400", "over400"];

const colorLabels: Record<WineColor, string> = {
  rød: "Rød",
  hvid: "Hvid",
  rosé: "Rosé",
  mousserende: "Mousserende",
};

const occasionLabels: Record<Occasion, string> = {
  hverdagsvin: "Hverdag",
  fest: "Fest",
  gave: "Gave",
  hyggeaften: "Hyggeaften",
  madparring: "Til mad",
  oplevelse: "Oplevelse",
};

const priceLabels: Record<PriceTier, string> = {
  under150: "Under 150 kr.",
  "150-250": "150 – 250 kr.",
  "250-400": "250 – 400 kr.",
  over400: "Over 400 kr.",
};

export default function VineAnbefalingerPage() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedColors, setSelectedColors] = useState<WineColor[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedPriceTier, setSelectedPriceTier] = useState<PriceTier | null>(null);
  const [selectedOccasions, setSelectedOccasions] = useState<Occasion[]>([]);
  const [sort, setSort] = useState<SortOption>("seneste");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch wines from Sanity
  useEffect(() => {
    async function fetchWines() {
      try {
        const data = await client.fetch(winesQuery);
        // Filter first: only show wines that are in anbefalinger (check raw Sanity value)
        const filteredData = data.filter((wine: any) => wine.inAnbefalinger === true);
        
        const transformedWines: Wine[] = filteredData.map((wine: any) => ({
          id: wine.id,
          title: wine.title,
          year: wine.year,
          producer: wine.producer,
          region: wine.region,
          country: wine.country,
          color: wine.color,
          grapes: wine.grapes || [],
          priceTier: wine.priceTier,
          styleTags: wine.styleTags || [],
          occasions: wine.occasions || [],
          shortNote: wine.shortNote,
          longNote: wine.longNote,
          recommendation: wine.recommendation,
          foodPairing: wine.foodPairing,
          tasteIcons: wine.tasteIcons || [],
          affiliate: wine.affiliate,
          // Transform Sanity image to URL
          image: wine.image?.asset 
            ? urlFor(wine.image).width(400).height(600).url() 
            : wine.image || "/assets/images/wine-bourgogne.svg",
          videoId: wine.videoId,
          score: wine.score,
          inAnbefalinger: wine.inAnbefalinger || false,
          inLeksikon: wine.inLeksikon || false,
        }));
        setWines(transformedWines);
      } catch (error) {
        console.error("Error fetching wines:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWines();
  }, []);

  // Dynamically get unique countries and regions from actual wines
  const countries = useMemo(
    () => Array.from(new Set(wines.map((w) => w.country))).sort(),
    [wines]
  );

  const regions = useMemo(
    () => Array.from(new Set(wines.map((w) => w.region))).sort(),
    [wines]
  );

  // Filter wines based on selections
  const filteredWines = useMemo(() => {
    return wines
      .filter((wine) => {
        if (selectedColors.length > 0 && !selectedColors.includes(wine.color)) {
          return false;
        }
        if (selectedCountries.length > 0 && !selectedCountries.includes(wine.country)) {
          return false;
        }
        if (selectedRegions.length > 0 && !selectedRegions.includes(wine.region)) {
          return false;
        }
        if (selectedPriceTier && wine.priceTier !== selectedPriceTier) {
          return false;
        }
        if (selectedOccasions.length > 0) {
          const hasMatchingOccasion = selectedOccasions.some((occ) =>
            wine.occasions.includes(occ)
          );
          if (!hasMatchingOccasion) return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case "pris": {
            return priceOrder.indexOf(a.priceTier) - priceOrder.indexOf(b.priceTier);
          }
          case "favorit": {
            const scoreA = a.score ?? 0;
            const scoreB = b.score ?? 0;
            if (scoreA === scoreB) {
              return b.year - a.year;
            }
            return scoreB - scoreA;
          }
          case "seneste":
          default:
            return b.year - a.year;
        }
      });
  }, [wines, selectedColors, selectedCountries, selectedRegions, selectedPriceTier, selectedOccasions, sort]);

  function toggleColor(color: WineColor) {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  }

  function toggleCountry(country: string) {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  }

  function toggleRegion(region: string) {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  }

  function toggleOccasion(occasion: Occasion) {
    setSelectedOccasions((prev) =>
      prev.includes(occasion) ? prev.filter((o) => o !== occasion) : [...prev, occasion]
    );
  }

  function clearFilters() {
    setSelectedColors([]);
    setSelectedCountries([]);
    setSelectedRegions([]);
    setSelectedPriceTier(null);
    setSelectedOccasions([]);
  }

  const activeFilterCount =
    selectedColors.length +
    selectedCountries.length +
    selectedRegions.length +
    (selectedPriceTier ? 1 : 0) +
    selectedOccasions.length;

  if (loading) {
    return (
      <main className="bg-background text-foreground">
        <section className="bg-card py-16">
          <div className="container space-y-4 text-center">
            <Badge tone="wine" className="mx-auto w-fit">
              Anbefalinger
            </Badge>
            <h1 className="font-serif text-4xl font-bold">Vine vi anbefaler lige nu</h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Alle vine er nøje udvalgt og smagt af os. Vi anbefaler kun vine, vi selv ville købe og
              drikke.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container text-center">
            <p className="text-muted-foreground">Indlæser vine...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <section className="bg-card py-16">
        <div className="container space-y-4 text-center">
          <Badge tone="wine" className="mx-auto w-fit">
            Anbefalinger
          </Badge>
          <h1 className="font-serif text-4xl font-bold">Vine vi anbefaler lige nu</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Alle vine er nøje udvalgt og smagt af os. Vi anbefaler kun vine, vi selv ville købe og
            drikke.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold">Filtre</h2>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 lg:hidden"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                <Filter className="h-4 w-4" />
                Filtre {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>
            <div className={`mt-6 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <FilterGroup title="Farve">
                {(Object.keys(colorLabels) as WineColor[]).map((color) => (
                  <label
                    key={color}
                    className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => toggleColor(color)}
                      className="rounded border-border"
                    />
                    {colorLabels[color]}
                  </label>
                ))}
              </FilterGroup>

              <FilterGroup title="Land">
                {/* Dynamic countries - automatically includes new ones like USA */}
                {countries.length > 0 ? (
                  countries.map((country) => (
                    <label
                      key={country}
                      className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCountries.includes(country)}
                        onChange={() => toggleCountry(country)}
                        className="rounded border-border"
                      />
                      {country}
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Ingen lande tilgængelige</p>
                )}
              </FilterGroup>

              <FilterGroup title="Region">
                {/* Dynamic regions - automatically includes new ones */}
                {regions.length > 0 ? (
                  regions.map((region) => (
                    <label
                      key={region}
                      className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(region)}
                        onChange={() => toggleRegion(region)}
                        className="rounded border-border"
                      />
                      {region}
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Ingen regioner tilgængelige</p>
                )}
              </FilterGroup>

              <FilterGroup title="Pris">
                <div className="space-y-2">
                  {priceOrder.map((tier) => (
                    <label
                      key={tier}
                      className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priceTier"
                        checked={selectedPriceTier === tier}
                        onChange={() => setSelectedPriceTier(tier)}
                        className="rounded border-border"
                      />
                      {priceLabels[tier]}
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Anledning">
                {(Object.keys(occasionLabels) as Occasion[]).map((occasion) => (
                  <label
                    key={occasion}
                    className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedOccasions.includes(occasion)}
                      onChange={() => toggleOccasion(occasion)}
                      className="rounded border-border"
                    />
                    {occasionLabels[occasion]}
                  </label>
                ))}
              </FilterGroup>

              <Button variant="outline" className="w-full" onClick={clearFilters}>
                Nulstil filtre
              </Button>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-muted-foreground">
                Viser {filteredWines.length} udvalgte vine
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="seneste">Seneste</option>
                <option value="pris">Pris (lav-høj)</option>
                <option value="favorit">Favoritter</option>
              </select>
            </div>
            {filteredWines.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredWines.map((wine) => (
                  <WineCard
                    key={wine.id}
                    id={wine.id}
                    image={wine.image}
                    name={wine.title}
                    vintage={wine.year.toString()}
                    region={`${wine.region}, ${wine.country}`}
                    description={wine.shortNote}
                    price={priceLabels[wine.priceTier]}
                    grapes={wine.grapes.join(", ")}
                    affiliateLink={wine.affiliate?.url}
                    tags={[
                      colorLabels[wine.color],
                      ...wine.occasions.slice(0, 2).map((o) => occasionLabels[o]),
                    ]}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center py-12">
                <p className="text-muted-foreground">
                  {wines.length === 0
                    ? "Ingen vine tilgængelige endnu. Tilføj vine i Sanity CMS."
                    : "Ingen vine matcher dine filtre."}
                </p>
                {wines.length > 0 && (
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Nulstil filtre
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
