import { ImageResponse } from "next/og";
import { OgImage } from "@/lib/og-image";
import { studio } from "@/lib/content";
export const alt = "Creative studio in Bishkek";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return new ImageResponse(<OgImage studioName={studio.name} location={studio.location[locale === "ru" ? "ru" : "en"]} eyebrow={locale === "ru" ? "Креативная студия · Бишкек" : "Independent creative studio · Bishkek"} title={locale === "ru" ? "Идеи на новой орбите." : "Ideas in another orbit."}/>, size);
}
