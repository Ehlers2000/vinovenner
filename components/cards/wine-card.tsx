import Image from "next/image";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type WineCardProps = {
  id?: string;
  image: string;
  name: string;
  vintage?: string;
  region: string;
  description: string;
  price: string;
  grapes?: string;
  affiliateLink?: string;
  tags?: string[];
};

export function WineCard({
  id,
  image,
  name,
  vintage,
  region,
  description,
  price,
  grapes,
  affiliateLink,
  tags = [],
}: WineCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {id ? (
          <Link href={`/vine/${id}`}>
            <Image
              src={image}
              alt={`${name} ${vintage || ""}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 240px, 100vw"
            />
          </Link>
        ) : (
          <Image
            src={image}
            alt={`${name} ${vintage || ""}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 240px, 100vw"
          />
        )}
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} tone="neutral" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div>
          {id ? (
            <Link href={`/vine/${id}`}>
              <h3 className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                {name}
              </h3>
            </Link>
          ) : (
            <h3 className="font-serif text-xl font-semibold text-foreground">{name}</h3>
          )}
          <p className="text-sm text-muted-foreground">
            {region}
            {grapes ? ` • ${grapes}` : ""}
            {vintage ? ` • ${vintage}` : ""}
          </p>
        </div>

        <p className="text-sm text-foreground/80">{description}</p>

        <div className="text-lg font-semibold text-primary">{price}</div>

        <div className="flex gap-2">
          {affiliateLink && (
            <Button variant="primary" className="flex-1" asChild>
              <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                Køb hos importør
              </a>
            </Button>
          )}
          {id ? (
            <Button variant="outline" size="sm" className="w-28" asChild>
              <Link href={`/vine/${id}`}>Detaljer</Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="w-28">
              Detaljer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

