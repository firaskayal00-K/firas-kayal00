"use client";

import { useMemo, useState } from "react";
import type { SiteContent } from "@/content/types";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

export function Projects({ c }: { c: SiteContent }) {
  const [filter, setFilter] = useState("all");

  const items = useMemo(
    () => c.projects.items.filter((p) => filter === "all" || p.catKey === filter),
    [c.projects.items, filter]
  );

  return (
    <section id="projects" className="flex flex-col gap-8 px-4 py-14 sm:px-8 lg:gap-10 lg:px-14 lg:py-20">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-4">
          <span className="text-xs tracking-[0.3em] text-bronze">{c.projects.eyebrow}</span>
          <h2 className="font-display text-[32px] leading-[1.2] font-normal sm:text-[42px] lg:text-[50px]">
            {c.projects.title} <span className="text-bronze italic">({items.length})</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-1.5 rounded-full bg-white p-1.5">
          {c.projects.filters.map((f) => {
            const active = f.key === filter;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-5 py-3 text-[13px] transition-colors ${
                  active ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-cream"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <a key={p.name} href="#projects" className="bk-card flex flex-col overflow-hidden rounded-[26px] bg-white">
            <div className="bk-photo relative m-2 h-[220px] overflow-hidden rounded-[20px] sm:h-[260px]">
              <PhotoPlaceholder label={p.hasImage ? p.name : c.projects.photoPlaceholder} />
              <span className="absolute top-3.5 start-3.5 rounded-full bg-paper/90 px-3.5 py-2 text-xs font-medium text-ink">
                {p.cat}
              </span>
            </div>
            <div className="flex flex-col gap-4 px-5 pb-6 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xl">{p.name}</span>
                <span className="text-[13px] text-muted">{p.city}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-0.5 rounded-2xl bg-cream px-3 py-2.5">
                  <span className="text-[10px] tracking-[0.14em] text-muted">{c.projects.areaLabel}</span>
                  <span className="text-sm font-semibold">{p.area}</span>
                </div>
                <div className="flex flex-col gap-0.5 rounded-2xl bg-cream px-3 py-2.5">
                  <span className="text-[10px] tracking-[0.14em] text-muted">{c.projects.floorsLabel}</span>
                  <span className="text-sm font-semibold">{p.floors}</span>
                </div>
                <div className="flex flex-col gap-0.5 rounded-2xl bg-cream px-3 py-2.5">
                  <span className="text-[10px] tracking-[0.14em] text-muted">{c.projects.yearLabel}</span>
                  <span className="text-sm font-semibold">{p.year}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
