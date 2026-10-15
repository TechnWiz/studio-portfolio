// Pre-render both language branches and mark their content language for assistive technology.
import { notFound } from "next/navigation";
export const instant = false;
export function generateStaticParams() { return [{ locale: "en" }, { locale: "ru" }]; }
export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ru") notFound();
  return <div lang={locale === "ru" ? "ru" : "en"}>{children}</div>;
}

