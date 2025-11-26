"use client";

import { useEffect, useState } from "react";
import { Youtube } from "lucide-react";

import { VideoCard } from "@/components/cards/video-card";
import { VideoPlayer } from "@/components/video-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

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

  // Generate YouTube thumbnail URL with fallback
  const getYouTubeThumbnail = (youtubeId: string) => {
    // Try maxresdefault first, fallback to hqdefault if not available
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
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="block text-left"
                >
                  <VideoCard
                    thumbnail={getYouTubeThumbnail(video.youtubeId)}
                    title={video.title}
                    duration={video.runtime}
                    category={video.categories[0] || "Video"}
                    description={video.description}
                  />
                </button>
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

      {selectedVideo && (
        <Modal
          open={Boolean(selectedVideo)}
          onClose={() => setSelectedVideo(null)}
          title={selectedVideo.title}
          description={selectedVideo.description}
          size="lg"
        >
          <div className="space-y-4">
            <VideoPlayer youtubeId={selectedVideo.youtubeId} title={selectedVideo.title} />
            {selectedVideo.keyTakeaways && selectedVideo.keyTakeaways.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-semibold text-graphite-900">Nøglepunkter</h3>
                <ul className="space-y-2 text-sm text-graphite-600">
                  {selectedVideo.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-wine-700" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Modal>
      )}
    </main>
  );
}
