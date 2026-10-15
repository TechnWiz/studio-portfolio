// Pre-render both language branches and mark their content language for assistive technology.
export const instant = false;
export function generateStaticParams() { return [{ locale: "en" }, { locale: "ru" }]; }
export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  return <div lang={locale === "ru" ? "ru" : "en"}>{children}</div>;
}

