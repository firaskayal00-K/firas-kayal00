import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

export function Services({ c }: { c: SiteContent }) {
  return (
    <section id="services" className="flex flex-col gap-10 px-4 py-16 sm:px-8 lg:gap-14 lg:px-14 lg:py-28">
      <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium tracking-[0.3em] text-bronze">{c.services.eyebrow}</span>
          <h2 className="font-display text-[34px] leading-[1.15] font-bold sm:text-[46px] lg:text-[58px]">
            {c.services.title}
          </h2>
        </div>
        <p className="max-w-[480px] text-base leading-[1.75] text-muted sm:text-lg">{c.services.text}</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.services.items.map((s, i) => (
          <Reveal key={s.num} delay={Math.min(i * 0.08, 0.32)}>
            <div className="bk-card flex flex-col gap-5 rounded-[26px] bg-white p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-cream text-ink">
                  <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true" className="ic">
                    <path d={s.icon} />
                  </svg>
                </div>
                <span className="font-sans text-base font-medium text-bronze">{s.num}</span>
              </div>
              <h3 className="font-display text-[26px] leading-[1.2] font-bold sm:text-[30px]">{s.title}</h3>
              <p className="text-[15px] leading-[1.75] text-muted-strong sm:text-base">{s.text}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((t) => (
                  <span key={t} className="rounded-full bg-cream px-4 py-2 text-[13px] text-[#3A3733] sm:text-sm">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex justify-between border-t border-line pt-4 text-sm sm:text-base">
                <span className="text-muted">{c.services.timelineLabel}</span>
                <span className="font-semibold">{s.time}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
