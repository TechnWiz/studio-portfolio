import { ProjectPage, validLocale } from "@/lib/pages";
import { projects } from "@/lib/content";
import type { Locale } from "@/lib/content";
export function generateStaticParams() { return projects.flatMap((p) => ["en", "ru"].map((locale) => ({ slug: p.slug, locale }))); }
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug } = await params; if (!validLocale(locale)) return <main className="not-found"><h1>Not found</h1></main>; return <ProjectPage locale={locale as Locale} slug={slug}/>; }
