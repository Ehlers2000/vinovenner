"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import type { Article, ArticleCategory } from "@/lib/types";
import { ArticleCard } from "@/components/cards/article-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { client, articlesQuery, urlFor } from "@/lib/sanity";

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<("Alle" | ArticleCategory)>("Alle");

  // Fetch articles from Sanity
  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await client.fetch(articlesQuery);
        const transformedArticles: Article[] = data.map((article: any) => {
          // Convert Sanity block content to markdown string
          const bodyText = article.body
            ? article.body
                .map((block: any) => {
                  if (block._type === "block") {
                    return block.children
                      .map((child: any) => child.text)
                      .join("");
                  }
                  return "";
                })
                .join("\n\n")
            : "";

          return {
            id: article.id,
            slug: article.slug?.current || article.slug || article.id,
            title: article.title,
            heroImage: article.heroImage?.asset
              ? urlFor(article.heroImage).width(800).height(600).url()
              : article.heroImage || "/assets/images/article-bourgogne.svg",
            excerpt: article.excerpt,
            publishedAt: article.publishedAt,
            readingTime: article.readingTime,
            author: article.author,
            categories: article.categories || [],
            body: bodyText,
            relatedWineIds: article.relatedWines?.map((w: any) => w.id) || [],
            relatedVideoIds: article.relatedVideos?.map((v: any) => v.id) || [],
          };
        });
        setArticles(transformedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const allCategories: ("Alle" | ArticleCategory)[] = useMemo(
    () => [
      "Alle",
      ...Array.from(new Set(articles.flatMap((article) => article.categories))),
    ],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    if (activeCategory === "Alle") return articles;
    return articles.filter((article) => article.categories.includes(activeCategory));
  }, [articles, activeCategory]);

  const featured = articles[0];
  const rest = filteredArticles.filter((article) => article.id !== featured?.id);

  if (loading) {
    return (
      <main className="bg-cream-50">
        <div className="container py-12 text-center">
          <p className="text-graphite-600">Indlæser artikler...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream-50">
      <section className="border-b border-graphite-100 bg-cream-25">
        <Container className="grid gap-10 py-20 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div className="space-y-6">
            <Badge tone="wine">Blog & guides</Badge>
            <h1 className="font-serif text-4xl text-graphite-900 sm:text-5xl">
              Lær, smag og køb bedre vin
            </h1>
            <p className="text-lg text-graphite-600">
              Guides, købskoncepter og historier fra vinmarken – skrevet af venner, der elsker vin
              uden filter.
            </p>
            {featured && (
              <>
                <div className="flex flex-wrap gap-3">
                  {featured.categories.map((category) => (
                    <Tag key={category} tone="neutral">
                      {category}
                    </Tag>
                  ))}
                </div>
                <Button asChild>
                  <Link href={`/blog/${featured.slug}`}>Læs ugens guide</Link>
                </Button>
              </>
            )}
          </div>
          {featured && (
            <Card padding="lg" className="space-y-4 bg-white">
              <p className="text-sm font-semibold text-wine-700">Fremhævet artikel</p>
              <Link href={`/blog/${featured.slug}`} className="group block space-y-3">
                <h2 className="font-serif text-3xl text-graphite-900 transition group-hover:text-wine-700">
                  {featured.title}
                </h2>
                <p className="text-sm text-graphite-600">{featured.excerpt}</p>
              </Link>
              <div className="flex items-center gap-3 text-xs text-graphite-500">
                <span>{formatDate(featured.publishedAt)}</span>
                <span>·</span>
                <span>{featured.readingTime}</span>
                <span>·</span>
                <span>{featured.author}</span>
              </div>
            </Card>
          )}
        </Container>
      </section>

      <Container className="py-12">
        {articles.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-3">
              {allCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeCategory === category
                      ? "border-wine-300 bg-wine-50 text-wine-700"
                      : "border-graphite-200 bg-white text-graphite-700 hover:border-wine-200 hover:text-wine-700"
                  }`}
                  data-analytics="blog-filter"
                >
                  {category}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm text-graphite-600">
              Viser {filteredArticles.length} artikler · {activeCategory}
            </p>

            <Section spacing="tight" className="px-0">
              <div className="grid gap-6 lg:grid-cols-3">
                {(activeCategory === "Alle" ? articles : filteredArticles).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </Section>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-graphite-600">Ingen artikler tilgængelige endnu. Tilføj artikler i Sanity CMS.</p>
          </div>
        )}
      </Container>
    </main>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
