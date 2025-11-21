import type { Metadata } from "next";
import { Inter, Playfair_Display as PlayfairDisplay } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = PlayfairDisplay({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinovenner – ærlige vine, fortalt af venner",
  description:
    "Ærlige anbefalinger, videoer og smagninger. Vi guider til gode vine med historier og reel værdi.",
  metadataBase: new URL("https://www.vinovenner.dk"),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Vinovenner – ærlige vine, fortalt af venner",
    description:
      "Ærlige anbefalinger, videoer og smagninger. Vi guider til gode vine med historier og reel værdi.",
    url: "https://www.vinovenner.dk",
    siteName: "Vinovenner",
    images: [
      {
        url: "/opengraph.svg",
        width: 1200,
        height: 630,
        alt: "Vinovenner – ærlige vine, fortalt af venner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinovenner – ærlige vine, fortalt af venner",
    description:
      "Ærlige anbefalinger, videoer og smagninger. Vi guider til gode vine med historier og reel værdi.",
    images: ["/opengraph.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-cream-50 text-graphite-900 antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

