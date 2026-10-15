import { HomePage, validLocale } from "@/lib/pages";
import type { Locale } from "@/lib/content";
import { copy } from "@/lib/content";
import { localizedMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
export function generateStaticParams() { return [{ locale: "en" }, { locale: "ru" }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; const language: Locale = locale === "ru" ? "ru" : "en"; return localizedMetadata(language, "", copy[language].seo.homeTitle, copy[language].seo.homeDescription); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!validLocale(locale)) notFound(); return <HomePage locale={locale as Locale}/>; }

import type { Metadata } from "next";
