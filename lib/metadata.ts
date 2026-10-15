import type { Metadata } from "next";
import type { Locale } from "@/lib/content";
import { studio } from "@/lib/content";

/** Page-specific metadata with canonical and language-alternate URLs. */
export function localizedMetadata(locale: Locale, route: string, title: string, description: string): Metadata {
  const origin = studio.siteUrl;
  const path = `/${locale}${route}`;
  const languages = { en: `/en${route}`, ru: `/ru${route}` };
  return {
    title,
    description,
    alternates: { ...(origin ? { canonical: new URL(path, origin).toString() } : {}), languages },
    openGraph: { title, description, ...(origin ? { url: new URL(path, origin).toString() } : {}), siteName: "Creative Studio", locale: locale === "ru" ? "ru_RU" : "en_US", type: "website" },
    twitter: { card: "summary", title, description },
  };
}
