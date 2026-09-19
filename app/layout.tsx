import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FontAtlas — Discover, test and use fonts",
  description: "A modern, no-login font library with live previews, glyph inspection, language coverage, CDN links and developer code.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
