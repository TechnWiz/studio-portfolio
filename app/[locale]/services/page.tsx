import { ServicesPage, validLocale } from "@/lib/pages";
import type { Locale } from "@/lib/content";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!validLocale(locale)) return <main className="not-found"><h1>Not found</h1></main>; return <ServicesPage locale={locale as Locale}/>; }
