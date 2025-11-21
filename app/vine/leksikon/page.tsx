"use client";

import { useMemo, useState, useEffect } from "react";

import { WineCard } from "@/components/cards/wine-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client, urlFor, winesQuery } from "@/lib/sanity";
import type { Wine, WineColor, PriceTier, Occasion } from "@/lib/types";

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

export default function LeksikonPage() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  
  // Filter states
  const [selectedColors, setSelectedColors] = useState<WineColor[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedPriceTier, setSelectedPriceTier] = useState<PriceTier | null>(null);
  const [selectedOccasions, setSelectedOccasions] = useState<Occasion[]>([]);

  // Fetch wines from Sanity - wines that are in leksikon OR in anbefalinger
  useEffect(() => {
    async function fetchWines() {
      try {
        const data = await client.fetch(winesQuery);
        const transformedWines: Wine[] = data
          .map((wine: any) => ({
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
            image: wine.image?.asset 
              ? urlFor(wine.image).width(400).height(600).url() 
              : wine.image || "/assets/images/wine-bourgogne.svg",
            videoId: wine.videoId,
            score: wine.score,
            inAnbefalinger: wine.inAnbefalinger || false,
            inLeksikon: wine.inLeksikon || false,
          }))
          // Filter: show wines that are in leksikon OR in anbefalinger
          .filter((wine: Wine) => wine.inLeksikon || wine.inAnbefalinger);
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

  // Filter wines based on search and filters
  const filtered = useMemo(() => {
    let result = wines;

    // Text search
    if (query.trim()) {
      const searchLower = query.trim().toLowerCase();
      result = result.filter((wine) =>
        wine.title.toLowerCase().includes(searchLower) ||
        wine.producer.toLowerCase().includes(searchLower) ||
        wine.region.toLowerCase().includes(searchLower) ||
        wine.country.toLowerCase().includes(searchLower) ||
        wine.grapes.some((g) => g.toLowerCase().includes(searchLower))
      );
    }

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter((wine) => selectedColors.includes(wine.color));
    }

    // Filter by country
    if (selectedCountries.length > 0) {
      result = result.filter((wine) => selectedCountries.includes(wine.country));
    }

    // Filter by region
    if (selectedRegions.length > 0) {
      result = result.filter((wine) => selectedRegions.includes(wine.region));
    }

    // Filter by price tier
    if (selectedPriceTier) {
      result = result.filter((wine) => wine.priceTier === selectedPriceTier);
    }

    // Filter by occasions
    if (selectedOccasions.length > 0) {
      result = result.filter((wine) =>
        selectedOccasions.some((occ) => wine.occasions.includes(occ))
      );
    }

    return result;
  }, [wines, query, selectedColors, selectedCountries, selectedRegions, selectedPriceTier, selectedOccasions]);

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
    setQuery("");
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
              Leksikon
            </Badge>
            <h1 className="font-serif text-4xl font-bold">Vine vi har smagt</h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Arkivet over vine vi har haft i glasset. Vi opdaterer løbende med noter, serveringsforslag
              og priser.
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
            Leksikon
          </Badge>
          <h1 className="font-serif text-4xl font-bold">Vine vi har smagt</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Arkivet over vine vi har haft i glasset. Vi opdaterer løbende med noter, serveringsforslag
            og priser.
          </p>
          <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-border bg-background px-4 py-2">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Søg efter vin, drue eller region"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {query && (
              <Button variant="ghost" size="sm" onClick={() => setQuery("")}>
                Ryd
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-semibold">Filtre</h2>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Nulstil
                  </Button>
                )}
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Farve</p>
                <div className="space-y-2">
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
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Land</p>
                <div className="space-y-2">
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
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Region</p>
                <div className="space-y-2">
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
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Pris</p>
                <div className="space-y-2">
                  {(["under150", "150-250", "250-400", "over400"] as PriceTier[]).map((tier) => (
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
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Anledning</p>
                <div className="space-y-2">
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
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card p-10 text-center">
                <p className="font-serif text-2xl">
                  {wines.length === 0
                    ? "Ingen vine tilgængelige endnu"
                    : "Ingen vine matcher din søgning"}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {wines.length === 0
                    ? "Tilføj vine i Sanity CMS."
                    : "Prøv at søge på en drue, region eller årgang vi tidligere har omtalt."}
                </p>
                {wines.length > 0 && (
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Nulstil filtre
                  </Button>
                )}
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">
                  Viser {filtered.length} {filtered.length === 1 ? "vin" : "vine"}
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((wine) => (
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
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
