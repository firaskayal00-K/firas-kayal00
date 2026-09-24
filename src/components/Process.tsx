import type { SiteContent } from "@/content/types";

export function Process({ c }: { c: SiteContent }) {
  return (
    <section
      id="process"
      className="mx-4 flex flex-col gap-8 rounded-[28px] bg-gold px-5 py-11 sm:mx-8 sm:rounded-[36px] sm:px-9 sm:py-14 lg:mx-14 lg:gap-12 lg:px-18 lg:py-20"
    >
      <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-4">
          <span className="text-xs tracking-[0.3em] text-bronze-dark">{c.process.eyebrow}</span>
          <h2 className="font-display text-[28px] leading-[1.25] font-normal sm:text-[36px] lg:text-[46px] lg:leading-[1.12]">
            {c.process.title}
          </h2>
        </div>
        <span className="rounded-full bg-ink px-5 py-3 text-[13px] text-paper">{c.process.badge}</span>
      </div>

      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <div className="absolute inset-x-10 top-8 hidden h-px bg-gold-line lg:block" />
        {c.process.steps.map((s) => (
          <div key={s.n} className="relative flex flex-col gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-sans text-lg font-medium text-gold">
              {s.n}
            </div>
            <div className="bk-card flex flex-1 flex-col gap-3 rounded-[24px] bg-paper p-6">
              <span className="w-fit rounded-full bg-gold px-3 py-1.5 text-xs font-semibold">{s.time}</span>
              <h3 className="font-display text-xl font-medium">{s.title}</h3>
              <p className="text-sm leading-[1.75] text-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
