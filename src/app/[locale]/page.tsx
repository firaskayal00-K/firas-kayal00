import { content } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Studio } from "@/components/Studio";
import { BigStats } from "@/components/BigStats";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = content[locale];

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-4">
      <Hero locale={locale} c={c} />
      <div className="mx-1 sm:mx-4 lg:mx-11">
        <Marquee items={c.marquee} />
      </div>
      <Studio c={c} />
      <BigStats c={c} />
      <Services c={c} />
      <Projects c={c} />
      <Process c={c} />
      <Contact c={c} />
      <Footer c={c} />
    </main>
  );
}
