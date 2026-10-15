import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { OgImage } from "@/lib/og-image";
import { studio } from "@/lib/content";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const language = locale === "ru" ? "ru" : "en";
  return new ImageResponse(<OgImage studioName={studio.name} location={studio.location[language]} eyebrow={project.status[language]} title={project.title[language]}/>, size);
}
