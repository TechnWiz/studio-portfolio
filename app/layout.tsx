import type { Metadata } from "next";
import { studio } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(studio.siteUrl),
  title: { default: "Independent creative studio", template: "%s" },
  description: "Independent creative studio in Bishkek working across digital design, development and motion.",

};

// The locale layout below sets the language on each localized route.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><svg className="filter-defs" aria-hidden="true" focusable="false"><filter id="liquid-lens" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="1" seed="8" result="fluid"/><feDisplacementMap in="SourceGraphic" in2="fluid" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter></svg>{children}</body></html>;
}

