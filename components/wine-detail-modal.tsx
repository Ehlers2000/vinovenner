import type { Wine } from "@/lib/types";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";
import { Tag } from "./ui/tag";
import { VideoButton } from "./video-button";
import { videos } from "@/content";

type WineDetailModalProps = {
  wine: Wine | null;
  open: boolean;
  onClose: () => void;
};

const styleLabels: Record<Wine["styleTags"][number], string> = {
  frisk: "Frisk",
  fyldig: "Fyldig",
  mineralsk: "Mineralsk",
  saftig: "Saftig",
  krydret: "Krydret",
  let: "Let",
  struktureret: "Struktureret",
};

const tasteLabel: Record<Wine["tasteIcons"][number], string> = {
  frugt: "Frugt",
  syre: "Syre",
  fad: "Fad",
  tannin: "Tannin",
  mineral: "Mineral",
  blomst: "Blomst",
};

export function WineDetailModal({ wine, open, onClose }: WineDetailModalProps) {
  if (!wine) return null;

  const relatedVideo =
    wine.videoId && videos.find((video) => video.id === wine.videoId);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={wine.title}
      description={`${wine.producer} · ${wine.region}, ${wine.country}`}
      size="lg"
    >
      <div className="grid gap-6 md:grid-cols-[1.2fr,1fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {wine.styleTags.map((style) => (
              <Tag key={style} tone="neutral">
                {styleLabels[style]}
              </Tag>
            ))}
          </div>
          <section className="space-y-3">
            <h3 className="font-serif text-xl text-graphite-900">Hvorfor vi anbefaler den</h3>
            <p className="text-sm leading-relaxed text-graphite-700">{wine.recommendation}</p>
          </section>
          <section className="space-y-3">
            <h3 className="font-serif text-xl text-graphite-900">Smagsnoter</h3>
            <p className="text-sm leading-relaxed text-graphite-700">{wine.longNote}</p>
            <div className="flex flex-wrap gap-2">
              {wine.tasteIcons.map((taste) => (
                <Badge key={taste} tone="wine">
                  {tasteLabel[taste]}
                </Badge>
              ))}
            </div>
          </section>
          <section className="space-y-3">
            <h3 className="font-serif text-xl text-graphite-900">Madparring</h3>
            <p className="text-sm text-graphite-700">{wine.foodPairing}</p>
          </section>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <a
                href={wine.affiliate.url}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="affiliate-click"
                data-affiliate-partner={wine.affiliate.partner}
              >
                Køb hos {wine.affiliate.partner}
              </a>
            </Button>
            <Button variant="outline" onClick={onClose}>
              Luk
            </Button>
          </div>
        </div>
        <aside className="space-y-4 rounded-2xl border border-graphite-100 bg-cream-25 p-5">
          <div>
            <h4 className="font-semibold text-graphite-900">Detaljer</h4>
            <dl className="mt-3 space-y-2 text-sm text-graphite-700">
              <div className="flex justify-between gap-6">
                <dt>Årgang</dt>
                <dd>{wine.year}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt>Druer</dt>
                <dd>{wine.grapes.join(", ")}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt>Region</dt>
                <dd>{wine.region}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt>Land</dt>
                <dd>{wine.country}</dd>
              </div>
            </dl>
          </div>
          {relatedVideo && (
            <div className="space-y-3 rounded-xl bg-white p-4 shadow-card">
              <h4 className="text-sm font-semibold text-graphite-800">
                Relateret video
              </h4>
              <p className="text-sm text-graphite-600">{relatedVideo.title}</p>
              <VideoButton
                youtubeId={relatedVideo.youtubeId}
                title={relatedVideo.title}
                description={relatedVideo.description}
                >
                  Se video
              </VideoButton>
            </div>
          )}
        </aside>
      </div>
    </Modal>
  );
}

