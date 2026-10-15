import { WorkPage, validLocale } from "@/lib/pages";
import { copy } from "@/lib/content";
import type { Locale } from "@/lib/content";
import { localizedMetadata } from "@/lib/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; const language: Locale = locale === "ru" ? "ru" : "en"; return localizedMetadata(language, "/work", copy[language].seo.workTitle, copy[language].seo.workDescription); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!validLocale(locale)) return <main className="not-found"><h1>Not found</h1></main>; return <WorkPage locale={locale as Locale}/>; }
