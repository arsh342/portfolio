interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "border border-[#2a2a2a] text-[#ccc] bg-transparent",
    accent: "border border-[#c97e3a]/40 text-[#c97e3a] bg-[#c97e3a]/10",
    muted: "border border-[#2a2a2a] text-[#777] bg-[#1a1a1a]",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-[11px] font-mono tracking-wider uppercase rounded-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
