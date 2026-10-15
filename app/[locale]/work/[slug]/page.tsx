import { ProjectPage, validLocale } from "@/lib/pages";
import { projects } from "@/lib/content";
import type { Locale } from "@/lib/content";
import { localizedMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
export function generateStaticParams() { return projects.flatMap((p) => ["en", "ru"].map((locale) => ({ slug: p.slug, locale }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug } = await params; const language: Locale = locale === "ru" ? "ru" : "en"; const project = projects.find((entry) => entry.slug === slug); if (!project) return localizedMetadata(language, `/work/${slug}`, "Not found", ""); return localizedMetadata(language, `/work/${slug}`, project.title[language], project.summary[language]); }
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug } = await params; if (!validLocale(locale)) notFound(); return <ProjectPage locale={locale as Locale} slug={slug}/>; }
