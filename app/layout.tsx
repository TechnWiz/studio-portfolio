import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Independent creative studio", template: "%s" },
  description: "Independent creative studio in Bishkek working across digital design, development and motion.",

};

// The locale layout below sets the language on each localized route.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

