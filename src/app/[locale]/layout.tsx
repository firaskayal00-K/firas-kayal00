import type { Metadata } from "next";
import {
  Playfair_Display,
  Montserrat,
  Amiri,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "../globals.css";
import { dir, isLocale, locales, type Locale } from "@/lib/i18n";
import { content } from "@/content/site";
import { notFound } from "next/navigation";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = content[locale];
  return {
    title: c.meta.title,
    description: c.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <html
      lang={locale}
      dir={dir[locale]}
      className={`${playfair.variable} ${montserrat.variable} ${amiri.variable} ${ibmPlexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
