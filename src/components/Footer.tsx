import type { SiteContent } from "@/content/types";

export function Footer({ c }: { c: SiteContent }) {
  return (
    <footer className="mx-4 mb-4 flex flex-col gap-8 rounded-[28px] bg-ink px-5 py-10 text-muted-soft sm:mx-8 sm:mb-8 sm:rounded-[36px] sm:px-9 lg:mx-14 lg:mb-14 lg:px-18 lg:py-16">
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4 text-paper">
          <svg width="42" height="37" viewBox="0 0 34 30" aria-hidden="true" className="shrink-0">
            <path
              d="M17 2 L31 12 V28 H3 V12 Z M11 28 V18 H23 V28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <span className="flex flex-col gap-1.5">
            <span className="font-display text-lg tracking-[0.32em]">{c.brand.name}</span>
            <span className="text-[10px] tracking-[0.5em]">{c.brand.role}</span>
          </span>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm sm:flex sm:gap-9">
          {c.footer.nav.map((l) => (
            <a key={l.label} href={l.href} className="py-2 hover:text-paper">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-2 border-t border-ink-border pt-6 text-xs tracking-[0.08em] sm:flex-row sm:justify-between">
        <span>{c.footer.copyright}</span>
        <span className="tracking-[0.3em]">{c.footer.tagline}</span>
      </div>
    </footer>
  );
}
