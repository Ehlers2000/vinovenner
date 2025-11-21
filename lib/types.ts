export type TasteProfile = "frugt" | "syre" | "fad" | "tannin" | "mineral" | "blomst";

export type WineStyle =
  | "frisk"
  | "fyldig"
  | "mineralsk"
  | "saftig"
  | "krydret"
  | "let"
  | "struktureret";

export type Occasion =
  | "hverdagsvin"
  | "fest"
  | "gave"
  | "hyggeaften"
  | "madparring"
  | "oplevelse";

export type PriceTier = "under150" | "150-250" | "250-400" | "over400";

export type WineColor = "rød" | "hvid" | "rosé" | "mousserende";

export type Wine = {
  id: string;
  title: string;
  year: number;
  producer: string;
  region: string;
  country: string;
  color: WineColor;
  grapes: string[];
  priceTier: PriceTier;
  styleTags: WineStyle[];
  occasions: Occasion[];
  shortNote: string;
  longNote: string;
  recommendation: string;
  foodPairing: string;
  tasteIcons: TasteProfile[];
  affiliate: {
    label: string;
    url: string;
    partner: string;
  };
  image: string;
  videoId?: string;
  score?: number;
  inAnbefalinger?: boolean;
  inLeksikon?: boolean;
};

export type VideoCategory = "Smagning" | "Bag kulissen" | "Rejse" | "Læring";

export type VideoLength = "<5" | "5-15" | ">15";

export type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  runtime: string;
  runtimeMinutes: number;
  categories: VideoCategory[];
  keyTakeaways: string[];
  publishedAt: string;
  hero?: boolean;
  relatedWineIds?: string[];
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  type: "smagning" | "middag" | "rejse";
  price: number;
  seats: number;
  seatsLeft: number;
  ticketUrl: string;
  image: string;
  highlights: string[];
  wines: string[];
  soldOut?: boolean;
  program?: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
};

export type ArticleCategory =
  | "Lær at smage"
  | "Køb bedre"
  | "Vin & mad"
  | "Rejser"
  | "Producenter";

export type Article = {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  categories: ArticleCategory[];
  body: string;
  relatedWineIds?: string[];
  relatedVideoIds?: string[];
};

