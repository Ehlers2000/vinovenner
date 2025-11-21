"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import type { Event, Wine } from "@/lib/types";
import { EventCard } from "@/components/cards/event-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { Section } from "@/components/ui/section";
import { client, eventsQuery, winesQuery, urlFor } from "@/lib/sanity";

const experienceHighlights = [
  {
    title: "Kurateret og ærligt",
    description:
      "Vi udvælger producenter, vi selv tror på. Ingen skjult reklame – kun vine vi kan stå inde for.",
    icon: "logo" as const,
  },
  {
    title: "Smag og lær",
    description:
      "Smag noter, kort og videoer følger med hver event, så du bliver klogere – også efter aftenen.",
    icon: "play" as const,
  },
  {
    title: "Netværk og hygge",
    description:
      "Plads til nysgerrige spørgsmål, gode historier og nye vinvenner. Du behøver ikke være ekspert.",
    icon: "mail" as const,
  },
];

const testimonials = [
  {
    quote:
      "Vinovenner formår at ramme den perfekte balance mellem læring og hygge. Jeg gik hjem med masser af noter og et stort smil.",
    name: "Katrine, deltager Bourgogne Masterclass",
  },
  {
    quote:
      "En rejseplan der føles som at være på tur med gode venner – vi fik adgang til producenter, man normalt aldrig møder.",
    name: "Morten, deltager Nordrhône 2024",
  },
];

const galleryItems = [
  {
    src: "/assets/images/event-bourgogne.svg",
    alt: "Bourgogne masterclass",
    label: "Masterclass i København",
  },
  {
    src: "/assets/images/event-rhone.svg",
    alt: "Rejse til Rhône",
    label: "Vinrejse i Nordrhône",
  },
  {
    src: "/assets/images/event-sommer.svg",
    alt: "Sommerterrasse",
    label: "Sommerterrasse i Aarhus",
  },
];

const privateOptions = [
  "Firmaarrangementer med blindsmagning og quiz",
  "Tematiske middage med vinparring",
  "Vinrejser skræddersyet til jeres team eller venner",
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Fetch events and wines from Sanity
  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsData, winesData] = await Promise.all([
          client.fetch(eventsQuery),
          client.fetch(winesQuery),
        ]);

        // Transform events
        const transformedEvents: Event[] = eventsData.map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          city: event.city,
          type: event.type,
          price: event.price,
          seats: event.seats,
          seatsLeft: event.seatsLeft,
          ticketUrl: event.ticketUrl,
          image: event.image?.asset
            ? urlFor(event.image).width(800).height(600).url()
            : event.image || "/assets/images/event-bourgogne.svg",
          highlights: event.highlights || [],
          wines: event.wines?.map((w: any) => w.id) || [],
          program: event.program || [],
          faq: event.faq || [],
          soldOut: event.soldOut || false,
        }));

        // Transform wines
        const transformedWines: Wine[] = winesData.map((wine: any) => ({
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
        }));

        setEvents(transformedEvents);
        setWines(transformedWines);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    [events],
  );

  const wineLookup = useMemo(
    () => new Map(wines.map((wine) => [wine.id, wine])),
    [wines],
  );

  if (loading) {
    return (
      <main className="bg-cream-50">
        <div className="container py-12 text-center">
          <p className="text-graphite-600">Indlæser events...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream-50">
      <section className="relative overflow-hidden bg-graphite-900 text-cream-50">
        <Image
          src="/hero-events.png"
          alt="Vinvenner der skåler til smagning"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-graphite-900/60" />
        <Container className="relative z-10 flex flex-col gap-8 py-24 sm:py-32">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Smag med os
            </h1>
            <p className="text-lg text-cream-200">
              Fra intime masterclasses til rejser med vinbønder. Vi samler nysgerrige vinvenner, der
              vil lære, smage og hygge sig – uden snobberi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href="#events">Se kommende events</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/kontakt">Planlæg privat event</a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-cream-200">
            <Stat label="Deltagere" value="2.500+" detail="siden 2021" />
            <Stat label="Tilfredshed" value="4,8/5" detail="gennemsnitlig feedback" />
            <Stat label="Events årligt" value="25" detail="i DK og udlandet" />
          </div>
        </Container>
      </section>

      <Section
        id="events"
        kicker="Kommende events"
        headline="Book plads før de bliver udsolgt"
        description="Vi holder deltagerantallet nede, så der er tid til spørgsmål, noter og snakke med vinmagerne."
      >
        {sortedEvents.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} onDetails={setSelectedEvent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-graphite-600">Ingen events tilgængelige endnu. Tilføj events i Sanity CMS.</p>
          </div>
        )}
      </Section>

      <Section
        kicker="Hvorfor deltage?"
        headline="Vinoplevelser med nerve"
        description="Alle events er bygget på de samme principper: ærlighed, faglighed og gode historier. Vi lover let forståeligt sprog og højt humør."
        spacing="tight"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {experienceHighlights.map((highlight) => (
            <Card key={highlight.title} padding="lg" className="flex flex-col gap-4">
              <Icon name={highlight.icon} width={28} height={28} className="text-wine-700" />
              <h3 className="font-serif text-2xl text-graphite-900">{highlight.title}</h3>
              <p className="text-sm text-graphite-600">{highlight.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        kicker="Stemning"
        headline="Glimt fra tidligere events"
        spacing="tight"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {galleryItems.map((item) => (
            <figure
              key={item.label}
              className="overflow-hidden rounded-2xl border border-graphite-100 bg-white shadow-card"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 200px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm text-graphite-600">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        kicker="Det siger deltagerne"
        headline="Feedback fra vinvenner"
        spacing="tight"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} padding="lg" className="flex flex-col gap-4">
              <p className="font-serif text-xl text-graphite-900">
                "{testimonial.quote}"
              </p>
              <p className="text-sm font-semibold text-wine-700">{testimonial.name}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        kicker="Skræddersyet smagning?"
        headline="Skal vi skabe en oplevelse kun til jer?"
        description="Vi designer events til virksomheder og vennegrupper – fra 10 til 150 personer. Fortæl os, hvad I drømmer om."
        spacing="tight"
        actions={
          <>
            <Button asChild>
              <a href="/kontakt">Kontakt os</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:hej@vinovenner.dk">hej@vinovenner.dk</a>
            </Button>
          </>
        }
      >
        <div className="grid gap-4 rounded-3xl border border-graphite-100 bg-white p-8 shadow-card sm:grid-cols-2">
          <div className="space-y-4 text-sm text-graphite-700">
            <p>Vi kan hjælpe med:</p>
            <ul className="space-y-2">
              {privateOptions.map((option) => (
                <li key={option} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-wine-700" />
                  <span>{option}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 rounded-2xl bg-cream-25 p-6 text-sm text-graphite-600">
            <p className="font-semibold text-graphite-900">Sådan foregår det</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Vi tager en kort snak om jeres ønsker og budget.</li>
              <li>Vi sender et forslag med vine, menu og pointer.</li>
              <li>Vi afvikler smagningen og sørger for noter og efterfølgende anbefalinger.</li>
            </ol>
          </div>
        </div>
      </Section>

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        wineLookup={wineLookup}
      />
    </main>
  );
}

const Stat = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-cream-100 backdrop-blur">
    <p className="text-xs uppercase tracking-wide text-cream-200">{label}</p>
    <p className="font-serif text-2xl">{value}</p>
    <p className="text-xs text-cream-200/80">{detail}</p>
  </div>
);

const EventDetailModal = ({
  event,
  onClose,
  wineLookup,
}: {
  event: Event | null;
  onClose: () => void;
  wineLookup: Map<string, Wine>;
}) => {
  if (!event) return null;

  const winesForEvent = event.wines
    .map((id) => wineLookup.get(id))
    .filter(Boolean) as Wine[];

  return (
    <Modal
      open={Boolean(event)}
      onClose={onClose}
      size="lg"
      title={event.title}
      description={`${event.location}, ${event.city} · ${new Date(event.date).toLocaleDateString("da-DK")}`}
    >
      <div className="grid gap-6 md:grid-cols-[1.2fr,1fr]">
        <div className="space-y-6">
          <section className="space-y-3">
            <h3 className="font-serif text-xl text-graphite-900">Hvad du kan forvente</h3>
            <p className="text-sm text-graphite-700">{event.description}</p>
            <div className="flex flex-wrap gap-2">
              {event.highlights.map((highlight) => (
                <Badge key={highlight} tone="wine">
                  {highlight}
                </Badge>
              ))}
            </div>
          </section>
          {event.program && event.program.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-serif text-xl text-graphite-900">Program</h3>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-graphite-600">
                {event.program.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>
          )}
          {winesForEvent.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-serif text-xl text-graphite-900">Vine vi smager</h3>
              <ul className="space-y-2 text-sm text-graphite-600">
                {winesForEvent.map((wine) => (
                  <li key={wine.id} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-forest-500" />
                    <div>
                      <p className="font-semibold text-graphite-800">{wine.title}</p>
                      <p className="text-xs text-graphite-500">
                        {wine.region}, {wine.country} · {wine.year}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {event.faq && event.faq.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-serif text-xl text-graphite-900">FAQ</h3>
              <div className="space-y-3">
                {event.faq.map((item) => (
                  <details
                    key={item.question}
                    className="rounded-xl border border-graphite-100 bg-white p-4 text-sm text-graphite-700"
                  >
                    <summary className="cursor-pointer font-semibold text-graphite-900">
                      {item.question}
                    </summary>
                    <p className="mt-2 text-sm text-graphite-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className="space-y-4 rounded-2xl border border-graphite-100 bg-cream-25 p-6 text-sm text-graphite-700">
          <div className="space-y-2">
            <p className="font-semibold text-graphite-900">Praktisk info</p>
            <ul className="space-y-2">
              <InfoItem icon={<Icon name="calendar" width={16} height={16} />} text={new Date(event.date).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })} />
              <InfoItem icon={<Icon name="clock" width={16} height={16} />} text={`${event.startTime} – ${event.endTime}`} />
              <InfoItem icon={<Icon name="map-pin" width={16} height={16} />} text={`${event.location}, ${event.city}`} />
              <InfoItem icon={<Icon name="mail" width={16} height={16} />} text="Spørgsmål? hej@vinovenner.dk" />
            </ul>
          </div>
          <Button
            asChild
            data-analytics="event-ticket-modal"
            data-event-id={event.id}
          >
            <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
              Book billet
            </a>
          </Button>
          <Button variant="outline" onClick={onClose}>
            Luk
          </Button>
        </aside>
      </div>
    </Modal>
  );
};

const InfoItem = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <li className="flex items-center gap-2">
    <span className="text-wine-600">{icon}</span>
    <span>{text}</span>
  </li>
);
