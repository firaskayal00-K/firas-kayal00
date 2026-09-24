import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "@/content/types";
import { AnimatedCounter } from "./AnimatedCounter";
import { WireframeModel } from "./WireframeModel";
import { MobileMenu } from "./MobileMenu";

export function Hero({ locale, c }: { locale: Locale; c: SiteContent }) {
  return (
    <section
      id="top"
      className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#121212] text-paper sm:rounded-[36px]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(226,214,196,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(226,214,196,0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <header className="flex h-20 items-center justify-between px-4 sm:h-24 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3" aria-label={`${c.brand.name}, home`}>
          <Image src="/logo-mark.png" alt="" width={144} height={127} priority className="h-8 w-auto shrink-0 sm:h-9" />
          <span className="flex flex-col gap-1">
            <span className="font-display text-[13px] tracking-[0.3em] sm:text-[17px] sm:tracking-[0.32em]">
              {c.brand.name}
            </span>
            <span className="text-[7px] tracking-[0.5em] text-muted-soft sm:text-[9px]">{c.brand.role}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.03] p-1.5 text-[13px] tracking-[0.02em] md:flex">
          <a href="#studio" className="bk-btn rounded-full bg-white/[.06] px-5 py-3">
            {c.nav.studio}
          </a>
          <a href="#services" className="bk-btn rounded-full px-5 py-3 hover:bg-white/[.06]">
            {c.nav.services}
          </a>
          <a href="#projects" className="bk-btn rounded-full px-5 py-3 hover:bg-white/[.06]">
            {c.nav.projects}
          </a>
          <a href="#process" className="bk-btn rounded-full px-5 py-3 hover:bg-white/[.06]">
            {c.nav.process}
          </a>
          <a href="#contact" className="bk-btn rounded-full px-5 py-3 hover:bg-white/[.06]">
            {c.nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={c.nav.langHref}
            lang={locale === "en" ? "ar" : "en"}
            className="hidden rounded-full border border-white/10 px-3.5 py-2.5 text-xs text-muted-soft hover:text-gold sm:block"
          >
            {c.nav.langLabel}
          </a>
          <a
            href="#contact"
            className="bk-btn hidden items-center gap-2 rounded-full bg-paper px-5 py-3.5 text-[13px] font-semibold text-ink lg:flex"
          >
            {c.nav.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="ic rtl:-scale-x-100">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <MobileMenu nav={c.nav} menuLabel={c.nav.menuLabel} />
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-10 px-4 pb-10 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12 lg:pb-12">
        <div className="flex flex-col justify-center gap-6 lg:col-span-6 lg:gap-8">
          <div className="bk-rise flex w-fit items-center gap-3 rounded-full border border-white/15 py-2.5 ps-3.5 pe-4 text-xs tracking-[0.06em] text-gold">
            <span className="bk-pulse h-2 w-2 shrink-0 rounded-full bg-gold" />
            {c.hero.badge}
          </div>
          <h1
            className="bk-rise font-display text-[38px] leading-[1.08] font-normal tracking-tight sm:text-[52px] lg:text-[70px]"
            style={{ animationDelay: "0.12s" }}
          >
            {c.hero.titleLead}
            <span className="text-gold italic">{c.hero.titleAccent}</span>
          </h1>
          <p
            className="bk-rise max-w-[520px] text-[16px] leading-[1.75] font-light text-[#CFC9C0] sm:text-[17px]"
            style={{ animationDelay: "0.24s" }}
          >
            {c.hero.subtitle}
          </p>
          <div className="bk-rise flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "0.36s" }}>
            <a
              href="#contact"
              className="bk-btn rounded-full bg-gold px-7 py-4.5 text-center text-sm font-semibold text-ink"
            >
              {c.hero.ctaPrimary}
            </a>
            <a
              href="#projects"
              className="bk-btn rounded-full border border-white/25 px-7 py-4 text-center text-sm text-paper"
            >
              {c.hero.ctaSecondary}
            </a>
          </div>
          <div className="bk-rise grid grid-cols-3 gap-2.5 sm:gap-3" style={{ animationDelay: "0.5s" }}>
            {c.hero.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1.5 rounded-[20px] border border-white/10 bg-white/[.04] px-3.5 py-4 sm:px-5 sm:py-5"
              >
                <span className="font-sans text-[26px] leading-none font-light tracking-tight sm:text-[34px]">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[11px] leading-tight text-muted-soft sm:text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:col-span-6">
          <div className="relative flex aspect-[6/5] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-[26px] border border-white/10">
            <div className="bk-scan absolute inset-x-0 h-px bg-[rgba(226,214,196,0.55)]" />

            <span className="absolute top-5 start-5 hidden text-[10px] tracking-[0.2em] text-muted-soft sm:top-6 sm:start-7 sm:block">
              {c.hero.model.tag}
            </span>
            <span className="absolute top-5 end-5 hidden text-[10px] tracking-[0.2em] text-muted-soft sm:top-6 sm:end-7 sm:block">
              {c.hero.model.scale}
            </span>
            <span className="absolute bottom-5 start-5 hidden text-[10px] tracking-[0.2em] text-muted-soft sm:bottom-6 sm:start-7 sm:block">
              {c.hero.model.elev}
            </span>
            <span className="absolute bottom-5 end-5 hidden text-[10px] tracking-[0.2em] text-muted-soft sm:bottom-6 sm:end-7 sm:block">
              {c.hero.model.gfa}
            </span>

            <div
              className="relative flex items-center justify-center"
              style={{ width: "min(62%, 320px)", height: "min(56%, 280px)", perspective: 1200 }}
            >
              <WireframeModel size={190} />
            </div>

            <div className="bk-float absolute end-5 top-16 hidden min-w-[160px] flex-col gap-2 rounded-[18px] border border-white/15 bg-ink/70 px-4 py-3.5 backdrop-blur-sm sm:top-18 sm:flex">
              <span className="text-[11px] tracking-[0.2em] text-muted-soft">{c.hero.floatCard.title}</span>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-soft">{c.hero.floatCard.floorsLabel}</span>
                <span>{c.hero.floatCard.floors}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-soft">{c.hero.floatCard.plotLabel}</span>
                <span>{c.hero.floatCard.plot}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-soft">{c.hero.floatCard.permitLabel}</span>
                <span className="text-gold">{c.hero.floatCard.permit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
