export function Logo({ size = 24 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-bold text-lg tracking-tight">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M3 28 16 4l13 24" stroke="#0b66e0" strokeWidth="4" strokeLinejoin="round" />
        <path d="M10 28 16 17l6 11" stroke="#0f1b2d" strokeWidth="4" strokeLinejoin="round" />
      </svg>
      salesnova
    </span>
  );
}
