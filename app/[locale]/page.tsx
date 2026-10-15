import type { Metadata } from "next";
import { HomePage, validLocale } from "@/lib/pages";
import type { Locale } from "@/lib/content";
export function generateStaticParams() { return [{ locale: "en" }, { locale: "ru" }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; return { title: locale === "ru" ? "Независимая креативная студия в Бишкеке" : "Independent creative studio in Bishkek", description: locale === "ru" ? "Независимая креативная студия в Бишкеке: цифровой дизайн, разработка и моушн." : "Independent creative studio in Bishkek working across digital design, development and motion.", alternates: { languages: { en: "/en", ru: "/ru" } } }; }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!validLocale(locale)) return <main className="not-found"><h1>Page not found</h1></main>; return <HomePage locale={locale as Locale}/>; }

