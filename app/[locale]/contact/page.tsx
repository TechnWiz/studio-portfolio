import { ContactPage, validLocale } from "@/lib/pages";
import { localizedMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/content";
import { copy } from "@/lib/content";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; const language: Locale = locale === "ru" ? "ru" : "en"; return localizedMetadata(language, "/contact", copy[language].seo.contactTitle, copy[language].seo.contactDescription); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!validLocale(locale)) notFound(); return <ContactPage locale={locale as Locale}/>; }
