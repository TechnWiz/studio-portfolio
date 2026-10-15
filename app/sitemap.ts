import type { MetadataRoute } from "next";
import { projects, studio } from "@/lib/content";
// Keep generated URLs on the deployed domain; NEXT_PUBLIC_SITE_URL can override it.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = studio.siteUrl;
  const routes = ["", "/work", "/services", "/studio", "/contact"];
  const pages: MetadataRoute.Sitemap = [
    ...["en", "ru"].flatMap((locale) => routes.map((route) => ({ url: `${base}/${locale}${route}`, alternates: { languages: { en: `${base}/en${route}`, ru: `${base}/ru${route}` } } }))),
    ...["en", "ru"].flatMap((locale) => projects.map((project) => ({ url: `${base}/${locale}/work/${project.slug}` }))),
  ];
  return pages;
}
