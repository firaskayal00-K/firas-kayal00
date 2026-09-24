import type { SiteContent } from "@/content/types";
import { AnimatedCounter } from "./AnimatedCounter";

export function BigStats({ c }: { c: SiteContent }) {
  return (
    <section className="mx-4 flex flex-col gap-8 rounded-[28px] bg-ink px-5 py-11 text-paper sm:mx-8 sm:rounded-[36px] sm:px-9 sm:py-14 lg:mx-14 lg:gap-14 lg:px-18 lg:py-22">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-4">
          <span className="text-xs tracking-[0.3em] text-gold">{c.bigStats.eyebrow}</span>
          <h2 className="font-display text-[28px] leading-[1.25] font-normal sm:text-[36px] lg:text-[46px] lg:leading-[1.12]">
            {c.bigStats.title}
          </h2>
        </div>
        <span className="text-[13px] text-muted-soft">{c.bigStats.updated}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="grid grid-cols-2 gap-3 lg:col-span-7">
          {c.bigStats.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2.5 rounded-[22px] border border-ink-border bg-ink-soft px-5 py-6 sm:gap-3 sm:rounded-[26px] sm:px-7 sm:py-7"
            >
              <span className="font-sans text-[28px] leading-none font-light tracking-tight text-gold sm:text-[44px] lg:text-[56px]">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[13px] font-medium sm:text-[15px]">{s.label}</span>
              {s.note && <span className="text-xs leading-relaxed text-muted-soft sm:text-[13px]">{s.note}</span>}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 rounded-[22px] border border-ink-border bg-ink-soft p-6 sm:gap-6 sm:rounded-[26px] sm:p-8 lg:col-span-5">
          <div className="flex items-baseline justify-between">
            <span className="text-[15px] font-medium">{c.bigStats.mix.title}</span>
            <span className="text-xs text-muted-soft">{c.bigStats.mix.note}</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {c.bigStats.mix.rows.map((row, i) => (
              <div key={row.label} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>{row.label}</span>
                  <span className="text-gold">{row.pct}%</span>
                </div>
                <div className="flex h-2.5 overflow-hidden rounded-full bg-ink-border">
                  <div
                    className="bk-grow h-full rounded-full"
                    style={{ width: `${row.pct}%`, backgroundColor: row.color, animationDelay: `${i * 0.15}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto flex justify-between border-t border-ink-border pt-5 text-[13px] text-muted-soft">
            <span>{c.bigStats.mix.avgLabel}</span>
            <span className="text-paper">{c.bigStats.mix.avgValue}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
