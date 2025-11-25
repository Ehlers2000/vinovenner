"use client";

import { useEffect, useState } from "react";
import { Youtube } from "lucide-react";

import { VideoCard } from "@/components/cards/video-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client, videosQuery, urlFor } from "@/lib/sanity";
import type { Video } from "@/lib/types";

const categories = [
  { id: "all", label: "Alle" },
  { id: "Smagning", label: "Smagning" },
  { id: "Rejse", label: "Rejse" },
  { id: "Læring", label: "Læring" },
  { id: "Bag kulissen", label: "Bag kulissen" },
];

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch videos from Sanity
  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = await client.fetch(videosQuery);
        const transformedVideos: Video[] = data.map((video: any) => ({
          id: video.id,
          title: video.title,
          description: video.description,
          youtubeId: video.youtubeId,
          runtime: video.runtime,
          runtimeMinutes: video.runtimeMinutes,
          categories: video.categories || [],
          keyTakeaways: video.keyTakeaways || [],
          publishedAt: video.publishedAt,
          hero: video.hero || false,
          relatedWineIds: video.relatedWines?.map((w: any) => w.id) || [],
        }));
        setVideos(transformedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const filteredVideos =
    activeCategory === "all"
      ? videos
      : videos.filter((video) => video.categories.includes(activeCategory as any));

  // Generate YouTube thumbnail URL
  const getYouTubeThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  if (loading) {
    return (
      <main className="bg-background text-foreground">
        <section className="bg-card py-16">
          <div className="container text-center">
            <h1 className="font-serif text-4xl font-bold">Vores videoer</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Se, smag og lær med os. Vi dykker ned i vine, producenter og historier fra vinens verden.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container text-center">
            <p className="text-muted-foreground">Indlæser videoer...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <section className="bg-card py-16">
        <div className="container text-center">
          <h1 className="font-serif text-4xl font-bold">Vores videoer</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Se, smag og lær med os. Vi dykker ned i vine, producenter og historier fra vinens verden.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <a href="https://youtube.com/@vinovenner" target="_blank" rel="noopener noreferrer">
              <Youtube className="mr-2 h-5 w-5" />
              Abonner på YouTube
            </a>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container space-y-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "primary" : "outline"}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {filteredVideos.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <VideoCard
                    thumbnail={getYouTubeThumbnail(video.youtubeId)}
                    title={video.title}
                    duration={video.runtime}
                    category={video.categories[0] || "Video"}
                    description={video.description}
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {videos.length === 0
                  ? "Ingen videoer tilgængelige endnu. Tilføj videoer i Sanity CMS."
                  : "Ingen videoer i denne kategori."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
