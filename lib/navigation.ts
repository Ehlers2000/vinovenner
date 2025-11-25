import type { Route } from "next";

type NavItem = {
  label: string;
  href: Route;
};

type SocialItem = {
  label: string;
  href: string;
  iconSrc: string;
  width: number;
  height: number;
};

type LegalItem = {
  label: string;
  href: Route;
};

export const primaryNav: NavItem[] = [
  { label: "Forside", href: "/" },
  { label: "Vine/Anbefalinger", href: "/vine" },
  { label: "Videoer", href: "/videoer" },
  { label: "Smagninger/Events", href: "/smagninger" },
  { label: "Blog/Guides", href: "/blog" },
  { label: "Om os", href: "/om-os" },
  { label: "Kontakt", href: "/kontakt" },
];

export const socialNav: SocialItem[] = [
  { label: "Facebook", href: "https://www.facebook.com/vinovenner", iconSrc: "/facebook.png", width: 20, height: 20 },
  { label: "Instagram", href: "https://www.instagram.com/vinovenner_", iconSrc: "/instagram.png", width: 20, height: 20 },
  { label: "YouTube", href: "https://www.youtube.com/@vinovenner", iconSrc: "/youtube.png", width: 24, height: 16 },
];

export const legalNav: LegalItem[] = [
  { label: "Vilkår", href: "/vilkaar" },
  { label: "Privatlivspolitik", href: "/privatliv" },
  { label: "Cookies", href: "/cookies" },
];

export type { NavItem, SocialItem, LegalItem };

