import { cn } from "../../lib/utils";

export function LogoMark({
  size = "md",
  variant = "glow",
  className,
  imgClassName,
  logoSrc = "/logo.png",
}) {
  const imgSizes = {
    sm: "h-10",
    md: "h-12",
    lg: "h-28 md:h-36",
  };

  const glowSizes = {
    sm: "w-[4.5rem] h-[4.5rem]",
    md: "w-[5.75rem] h-[5.75rem]",
    lg: "w-40 h-40 md:w-48 md:h-48",
  };

  const padSizes = {
    sm: "p-1",
    md: "p-1.5",
  };

  if (variant === "none") {
    return (
      <div className={cn("relative inline-flex items-center justify-center", className)}>
        <img
          src={logoSrc}
          alt="Detailing Masters"
          className={cn("w-auto object-contain", imgSizes[size], imgClassName)}
        />
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-[#F4EFD8]",
          padSizes[size] || padSizes.md,
          className
        )}
      >
        <img
          src={logoSrc}
          alt="Detailing Masters"
          className={cn("w-auto object-contain", imgSizes[size], imgClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute rounded-full pointer-events-none",
          "bg-[radial-gradient(circle,rgba(255,246,220,0.95)_0%,rgba(255,246,220,0.55)_42%,rgba(245,197,24,0.18)_62%,transparent_78%)]",
          glowSizes[size]
        )}
      />

        <img
          src={logoSrc}
          alt="Detailing Masters"
          decoding="async"
          className={cn(
          "relative z-10 w-auto object-contain",
          "drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
          imgSizes[size],
          imgClassName
        )}
      />
    </div>
  );
}
