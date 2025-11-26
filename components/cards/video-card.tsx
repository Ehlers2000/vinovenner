"use client";

import { useState } from "react";
import Image from "next/image";

import { Badge } from "../ui/badge";

type VideoCardProps = {
  thumbnail: string;
  title: string;
  duration: string;
  category: string;
  description?: string;
};

export function VideoCard({ thumbnail, title, duration, category, description }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-graphite-100">
        {!imageError ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className={`object-cover transition-opacity duration-300 group-hover:scale-105 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 100vw"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-graphite-200">
            <span className="text-graphite-500">Ingen thumbnail</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-primary transition-transform group-hover:scale-105">
            ▶
          </div>
        </div>
        <div className="absolute left-3 top-3">
          <Badge tone="wine" className="text-xs uppercase">
            {category}
          </Badge>
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
          {duration}
        </div>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}

