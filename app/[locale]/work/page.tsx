import type { Metadata } from "next";
import { WorkPage, validLocale } from "@/lib/pages";
import type { Locale } from "@/lib/content";
export const metadata: Metadata = { title: "Work", description: "Selected digital, identity and motion explorations." };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!validLocale(locale)) return <main className="not-found"><h1>Not found</h1></main>; return <WorkPage locale={locale as Locale}/>; }
