"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";

export function MobileMenu({ nav, menuLabel }: { nav: SiteContent["nav"]; menuLabel: string }) {
  const [open, setOpen] = useState(false);

  const links: { label: string; href: string }[] = [
    { label: nav.studio, href: "#studio" },
    { label: nav.services, href: "#services" },
    { label: nav.projects, href: "#projects" },
    { label: nav.process, href: "#process" },
    { label: nav.contact, href: "#contact" },
  ];

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-label={menuLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="ic">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h10" />}
        </svg>
      </button>
      {open && (
        <div className="absolute end-0 top-13 z-20 flex w-56 flex-col gap-1 rounded-3xl border border-white/10 bg-ink/95 p-3 text-sm text-paper shadow-2xl backdrop-blur">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
