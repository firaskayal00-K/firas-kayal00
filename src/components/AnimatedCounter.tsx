"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(() => "0" + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setShown(value.toLocaleString("en-US") + suffix);
        return;
      }
      const start = performance.now();
      const duration = 2200;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(Math.round(value * eased).toLocaleString("en-US") + suffix);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {shown}
    </span>
  );
}
