import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import type { Article } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { VideoButton } from "@/components/video-button";
import { client, articlesQuery, winesQuery, videosQuery, urlFor } from "@/lib/sanity";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = await client.fetch(articlesQuery);
  return articles.map((article: any) => ({
    slug: article.slug?.current || article.slug || article.id,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const articles = await client.fetch(articlesQuery);
  const article = articles.find(
    (item: any) => (item.slug?.current || item.slug || item.id) === params.slug
  );

  if (!article) {
    return {
      title: "Vinovenner – Artikel ikke fundet",
    };
  }

  return {
    title: `${article.title} – Vinovenner`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: article.heroImage?.asset
        ? [urlFor(article.heroImage).width(1200).height(630).url()]
        : [],
    },
  };
}

// Helper function for creating URL-friendly slugs
function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9æøå ]/g, "")
    .replace(/\s+/g, "-");
}

// PortableText components for rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || "Article image"}
            width={800}
            height={600}
            className="rounded-2xl"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2
        id={slugify(children?.toString() || "")}
        className="mt-8 mb-4 font-serif text-3xl text-graphite-900 first:mt-0"
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        id={slugify(children?.toString() || "")}
        className="mt-6 mb-3 font-serif text-2xl text-graphite-900"
      >
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-base leading-relaxed text-graphite-700">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-graphite-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-graphite-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-graphite-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-wine-700 underline hover:text-wine-800"
        >
          {children}
        </a>
      );
    },
  },
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const [articlesData, winesData, videosData] = await Promise.all([
    client.fetch(articlesQuery),
    client.fetch(winesQuery),
    client.fetch(videosQuery),
  ]);

  const article = articlesData.find(
    (item: any) => (item.slug?.current || item.slug || item.id) === params.slug
  );

  if (!article) {
    notFound();
  }

  // Keep body as raw Sanity blocks for PortableText
  const heroImageUrl = article.heroImage?.asset
    ? urlFor(article.heroImage).width(1200).height(800).url()
    : article.heroImage || "/assets/images/article-bourgogne.svg";

  const transformedArticle: Article & { bodyBlocks: any } = {
    id: article.id,
    slug: article.slug?.current || article.slug || article.id,
    title: article.title,
    heroImage: heroImageUrl,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
    author: article.author,
    categories: article.categories || [],
    body: "", // Keep empty for type compatibility, we'll use bodyBlocks
    bodyBlocks: article.body || [], // Raw Sanity blocks
    relatedWineIds: article.relatedWines?.map((w: any) => w.id) || [],
    relatedVideoIds: article.relatedVideos?.map((v: any) => v.id) || [],
  };

  // Extract headings from body blocks for table of contents
  const headings = extractHeadingsFromBlocks(article.body || []);

  // Transform wines and videos for related content
  const wines = winesData.map((wine: any) => ({
    id: wine.id,
    title: wine.title,
    shortNote: wine.shortNote,
  }));

  const videos = videosData.map((video: any) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    youtubeId: video.youtubeId,
  }));

  const relatedWines = (transformedArticle.relatedWineIds ?? [])
    .map((id: string) => wines.find((wine: any) => wine.id === id))
    .filter(Boolean);
  const relatedVideos = (transformedArticle.relatedVideoIds ?? [])
    .map((id: string) => videos.find((video: any) => video.id === id))
    .filter(Boolean);

  const allArticles = articlesData.map((item: any) => ({
    id: item.id,
    slug: item.slug?.current || item.slug || item.id,
    title: item.title,
    publishedAt: item.publishedAt,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: transformedArticle.title,
    description: transformedArticle.excerpt,
    author: {
      "@type": "Person",
      name: transformedArticle.author,
    },
    datePublished: transformedArticle.publishedAt,
    image: heroImageUrl,
  };

  return (
    <main className="bg-cream-50">
      {/* Hero Image Section */}
      {heroImageUrl && (
        <section className="relative h-[400px] w-full overflow-hidden sm:h-[500px]">
          <Image
            src={heroImageUrl}
            alt={transformedArticle.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-cream-50 sm:p-10">
            <Container>
              <div className="flex flex-wrap gap-3 mb-4">
                {transformedArticle.categories.map((category) => (
                  <Tag key={category} tone="neutral" className="bg-white/20 text-cream-50 border-white/30">
                    {category}
                  </Tag>
                ))}
              </div>
              <h1 className="font-serif text-3xl text-cream-50 sm:text-4xl md:text-5xl mb-4">
                {transformedArticle.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-cream-100">
                <span>{formatDate(transformedArticle.publishedAt)}</span>
                <span>·</span>
                <span>{transformedArticle.author}</span>
                <span>·</span>
                <span>{transformedArticle.readingTime}</span>
              </div>
            </Container>
          </div>
        </section>
      )}

      {/* Fallback header if no hero image */}
      {!heroImageUrl && (
        <section className="border-b border-graphite-100 bg-cream-25">
          <Container className="flex flex-col gap-6 py-20">
            <div className="flex flex-wrap gap-3">
              {transformedArticle.categories.map((category) => (
                <Tag key={category} tone="neutral">
                  {category}
                </Tag>
              ))}
            </div>
            <h1 className="font-serif text-4xl text-graphite-900 sm:text-5xl">
              {transformedArticle.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-graphite-600">
              <span>{formatDate(transformedArticle.publishedAt)}</span>
              <span>·</span>
              <span>{transformedArticle.author}</span>
              <span>·</span>
              <span>{transformedArticle.readingTime}</span>
            </div>
          </Container>
        </section>
      )}

      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,3fr),minmax(0,1fr)]">
        <article className="space-y-10">
          <div className="rounded-3xl border border-graphite-100 bg-white p-6 shadow-card sm:p-10">
            {transformedArticle.bodyBlocks && transformedArticle.bodyBlocks.length > 0 ? (
              <PortableText
                value={transformedArticle.bodyBlocks}
                components={portableTextComponents}
              />
            ) : (
              <p className="text-graphite-700">Ingen indhold tilgængeligt.</p>
            )}
          </div>

          {relatedWines.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-graphite-900">Relaterede vine</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedWines.map((wine) => (
                  <Card
                    key={wine!.id}
                    padding="lg"
                    className="flex flex-col gap-3 bg-white shadow-card"
                  >
                    <p className="font-serif text-xl text-graphite-900">{wine!.title}</p>
                    <p className="text-sm text-graphite-600">{wine!.shortNote}</p>
                    <Button
                      asChild
                      className="mt-2 w-fit"
                      data-analytics="article-wine-click"
                    >
                      <a href="/vine">Se anbefaling</a>
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {relatedVideos.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-graphite-900">Relaterede videoer</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedVideos.map((video) => (
                  <Card key={video!.id} padding="lg" className="flex flex-col gap-3">
                    <p className="font-serif text-xl text-graphite-900">{video!.title}</p>
                    <p className="text-sm text-graphite-600">{video!.description}</p>
                    <VideoButton
                      youtubeId={video!.youtubeId}
                      title={video!.title}
                      description={video!.description}
                      variant="outline"
                      className="w-fit"
                    >
                      Se video
                    </VideoButton>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="space-y-8">
          {headings.length > 0 && (
            <Card padding="lg" className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-graphite-500">
                Indhold
              </h2>
              <nav className="space-y-3 text-sm text-graphite-600">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="block hover:text-wine-700"
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </Card>
          )}
          <Card padding="lg" className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-graphite-500">
              Flere guides
            </h2>
            <div className="space-y-3 text-sm">
              {allArticles
                .filter((item: any) => item.id !== transformedArticle.id)
                .slice(0, 4)
                .map((item: any) => (
                  <div key={item.id} className="space-y-1">
                    <a
                      href={`/blog/${item.slug}`}
                      className="font-semibold text-graphite-900 hover:text-wine-700"
                    >
                      {item.title}
                    </a>
                    <p className="text-xs text-graphite-500">{formatDate(item.publishedAt)}</p>
                  </div>
                ))}
            </div>
          </Card>
        </aside>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}

type Heading = {
  id: string;
  title: string;
};

function extractHeadingsFromBlocks(blocks: any[]): Heading[] {
  const headings: Heading[] = [];
  
  blocks.forEach((block) => {
    if (block._type === "block" && (block.style === "h2" || block.style === "h3")) {
      const text = block.children
        .map((child: any) => child.text)
        .join("");
      if (text) {
        headings.push({
          id: slugify(text),
          title: text,
        });
      }
    }
  });
  
  return headings;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
