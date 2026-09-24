export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="flex h-14 items-center overflow-hidden rounded-full bg-gold sm:h-[84px]">
      <div className="bk-marquee flex gap-8 whitespace-nowrap ps-6 font-display text-lg text-ink sm:gap-12 sm:text-3xl">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-12">
            {item}
            <span className="text-bronze">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
