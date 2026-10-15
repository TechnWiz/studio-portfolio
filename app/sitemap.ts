import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
// Set NEXT_PUBLIC_SITE_URL to the deployed origin before publishing this sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = ["", "/work", "/services", "/studio", "/contact"];
  const pages: MetadataRoute.Sitemap = [
    ...["en", "ru"].flatMap((locale) => routes.map((route) => ({ url: `${base}/${locale}${route}`, alternates: { languages: { en: `${base}/en${route}`, ru: `${base}/ru${route}` } } }))),
    ...["en", "ru"].flatMap((locale) => projects.map((project) => ({ url: `${base}/${locale}/work/${project.slug}` }))),
  ];
  return pages;
}
