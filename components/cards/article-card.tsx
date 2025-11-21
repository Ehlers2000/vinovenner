import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/lib/types";

import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

type ArticleCardProps = {
  article: Article;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden p-0" interactive>
      <div className="relative h-48 w-full">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 320px, 100vw"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {article.categories.map((category) => (
            <Badge key={category} tone="wine">
              {category}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <Link href={`/blog/${article.slug}`} className="group inline-block">
            <h3 className="font-serif text-2xl text-graphite-900 transition group-hover:text-wine-700">
              {article.title}
            </h3>
          </Link>
          <p className="text-sm text-graphite-600">{article.excerpt}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-xs text-graphite-500">
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readingTime} læsetid</span>
        </div>
      </div>
    </Card>
  );
}

