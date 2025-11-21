import Image from "next/image";

import type { Event } from "@/lib/types";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Icon } from "../ui/icon";

type EventCardProps = {
  event: Event;
  onDetails?: (event: Event) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function EventCard({ event, onDetails }: EventCardProps) {
  const soldOut = event.seatsLeft <= 0 || event.soldOut;
  return (
    <Card className="flex flex-col gap-5 p-0 overflow-hidden">
      <div className="relative h-52 w-full">
        <Image
          src={event.image}
          alt={`Foto fra ${event.title}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 360px, 100vw"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <Badge tone="wine">
            <Icon name="calendar" width={16} height={16} /> {formatDate(event.date)}
          </Badge>
          <Badge tone="neutral">
            <Icon name="map-pin" width={16} height={16} /> {event.city}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl text-graphite-900">{event.title}</h3>
          {soldOut ? (
            <Badge tone="neutral">Udsolgt</Badge>
          ) : (
            <Badge tone="forest">{event.seatsLeft} pladser</Badge>
          )}
        </div>
        <p className="text-sm text-graphite-600">{event.description}</p>
        <ul className="space-y-2 text-sm text-graphite-600">
          {event.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span aria-hidden className="mt-1 block h-1.5 w-3 rounded-full bg-wine-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4 border-t border-graphite-100 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="text-graphite-700">
            <div className="flex items-center gap-2">
              <Icon name="clock" width={16} height={16} />
              <span>
                {event.startTime} – {event.endTime}
              </span>
            </div>
            <div className="mt-1 font-semibold text-graphite-900">{event.price} kr.</div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            {onDetails && (
              <Button
                variant="outline"
                className="min-w-[140px]"
                onClick={() => onDetails(event)}
                data-analytics="event-details"
              >
                Læs mere
              </Button>
            )}
            <Button
              asChild
              variant={soldOut ? "outline" : "primary"}
              className="min-w-[150px]"
              data-analytics="event-ticket"
              data-event-id={event.id}
              disabled={soldOut}
            >
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={soldOut}
              >
                {soldOut ? "Venteliste" : "Book plads"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

