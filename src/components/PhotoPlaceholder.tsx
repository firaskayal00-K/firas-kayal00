export function PhotoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 text-gold-soft ${className}`}
      style={{
        backgroundColor: "#1e1e1d",
        backgroundImage:
          "linear-gradient(rgba(226,214,196,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(226,214,196,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="ic">
        <path d="M6 34h28M10 34V14l10-8 10 8v20M16 34V22h8v12" />
      </svg>
      <span className="text-[11px] tracking-[0.2em]">{label}</span>
    </div>
  );
}
