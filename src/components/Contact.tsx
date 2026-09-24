"use client";

import { useState, type FormEvent } from "react";
import type { SiteContent } from "@/content/types";

const fieldClass =
  "rounded-2xl border border-field bg-paper px-4.5 py-4 text-[15px] outline-none focus:border-bronze";

export function Contact({ c }: { c: SiteContent }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="grid grid-cols-1 gap-10 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-28">
      <div className="flex flex-col gap-6 lg:col-span-5">
        <span className="text-xs tracking-[0.3em] text-bronze">{c.contact.eyebrow}</span>
        <h2 className="font-display text-[32px] leading-[1.2] font-normal sm:text-[42px] lg:text-[50px]">
          {c.contact.title}
        </h2>
        <p className="text-[15px] leading-[1.8] text-muted sm:text-base">{c.contact.text}</p>
        <div className="flex flex-col gap-2.5 pt-2">
          <a href="#contact" className="bk-card flex items-center gap-4 rounded-[20px] bg-white px-5 py-4.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="ic">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
              </svg>
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-xs text-muted">{c.contact.phoneLabel}</span>
              <span className="text-[15px] font-medium">{c.contact.phone}</span>
            </span>
          </a>
          <a href="#contact" className="bk-card flex items-center gap-4 rounded-[20px] bg-white px-5 py-4.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="ic">
                <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
              </svg>
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-xs text-muted">{c.contact.emailLabel}</span>
              <span className="text-[15px] font-medium">{c.contact.email}</span>
            </span>
          </a>
          <div className="flex items-center gap-4 rounded-[20px] bg-white px-5 py-4.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="ic">
                <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-xs text-muted">{c.contact.addressLabel}</span>
              <span className="text-[15px] font-medium">{c.contact.address}</span>
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-[28px] bg-white p-6 sm:p-10 lg:col-span-6 lg:col-start-7"
      >
        <span className="font-display text-2xl">{c.contact.formTitle}</span>

        {sent ? (
          <p className="rounded-2xl bg-cream px-5 py-6 text-[15px] leading-relaxed text-muted-strong">
            {c.contact.form.sent}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="bk-name" className="text-[13px] text-muted">
                  {c.contact.form.name}
                </label>
                <input id="bk-name" name="name" type="text" required className={fieldClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="bk-phone" className="text-[13px] text-muted">
                  {c.contact.form.phone}
                </label>
                <input id="bk-phone" name="phone" type="tel" required className={fieldClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="bk-service" className="text-[13px] text-muted">
                  {c.contact.form.service}
                </label>
                <select id="bk-service" name="service" className={fieldClass}>
                  {c.contact.form.services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="bk-area" className="text-[13px] text-muted">
                  {c.contact.form.area}
                </label>
                <input id="bk-area" name="area" type="number" min={0} className={fieldClass} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bk-msg" className="text-[13px] text-muted">
                {c.contact.form.message}
              </label>
              <textarea id="bk-msg" name="message" rows={4} className={`${fieldClass} resize-none`} />
            </div>
            <button
              type="submit"
              className="bk-btn rounded-full bg-ink px-8 py-4.5 text-sm font-semibold text-paper"
            >
              {c.contact.form.submit}
            </button>
          </>
        )}
      </form>
    </section>
  );
}
