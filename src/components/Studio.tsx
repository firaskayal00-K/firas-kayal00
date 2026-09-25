import type { SiteContent } from "@/content/types";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { Reveal } from "./Reveal";

export function Studio({ c }: { c: SiteContent }) {
  return (
    <section id="studio" className="grid grid-cols-1 items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-28">
      <Reveal className="order-1 lg:order-none lg:col-span-6">
        <div className="bk-photo relative h-[280px] overflow-hidden rounded-[28px] sm:h-[420px] lg:h-[680px] lg:rounded-[32px]">
          <PhotoPlaceholder label={c.studio.featured.tag} className="bk-zoom" />
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-[20px] bg-ink/70 px-4 py-3.5 text-paper sm:inset-x-5 sm:bottom-5 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.22em] text-muted-soft">{c.studio.featured.tag}</span>
              <span className="font-display text-lg sm:text-[22px]">{c.studio.featured.name}</span>
            </div>
            <div className="hidden gap-4 text-[13px] sm:flex sm:gap-5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-muted-soft">{c.projects.areaLabel}</span>
                <span>{c.studio.featured.area}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-muted-soft">{c.projects.floorsLabel}</span>
                <span>{c.studio.featured.floors}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-muted-soft">{c.projects.yearLabel}</span>
                <span>{c.studio.featured.year}</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-8">
        <div className="flex flex-col gap-5 lg:gap-6">
          <span className="text-xs font-medium tracking-[0.3em] text-bronze">{c.studio.eyebrow}</span>
          <h2 className="font-display text-[32px] leading-[1.2] font-normal sm:text-[42px] lg:text-[50px] lg:leading-[1.12]">
            {c.studio.title}
          </h2>
          <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">{c.studio.text}</p>
          <div className="grid grid-cols-2 gap-3">
            {c.studio.cards.map((card) => (
              <div key={card.title} className="bk-card flex flex-col gap-2.5 rounded-[22px] bg-white p-5">
                <svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true" className="ic">
                  <path d={card.icon} />
                </svg>
                <span className="text-sm font-semibold">{card.title}</span>
                <span className="text-[13px] text-muted">{card.note}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
