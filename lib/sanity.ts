import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-18',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Image URL builder
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ queries
export const winesQuery = `*[_type == "wine"] | order(year desc) {
  id,
  title,
  year,
  producer,
  region,
  country,
  color,
  grapes,
  priceTier,
  styleTags,
  occasions,
  shortNote,
  longNote,
  recommendation,
  foodPairing,
  tasteIcons,
  affiliate,
  image,
  videoId,
  score,
  inAnbefalinger,
  inLeksikon,
}`

export const eventsQuery = `*[_type == "event"] | order(date asc) {
  id,
  title,
  description,
  date,
  startTime,
  endTime,
  location,
  city,
  type,
  price,
  seats,
  seatsLeft,
  ticketUrl,
  image,
  highlights,
  wines[]->{id, title, year, region, country},
  program,
  faq,
  soldOut,
}`

export const videosQuery = `*[_type == "video"] | order(publishedAt desc) {
  id,
  title,
  description,
  youtubeId,
  runtime,
  runtimeMinutes,
  categories,
  keyTakeaways,
  publishedAt,
  hero,
  relatedWines[]->{id, title},
}`

export const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  id,
  slug,
  title,
  heroImage,
  excerpt,
  publishedAt,
  readingTime,
  author,
  categories,
  body,
  relatedWines[]->{id, title, shortNote},
  relatedVideos[]->{id, title, description, youtubeId},
}`

