import { cn } from "../../lib/utils";
import logo from "../../assets/logo.png";

export function LogoMark({
  size = "md",
  className,
  imgClassName,
}) {
  const imgSizes = {
    sm: "h-11",
    md: "h-14",
    lg: "h-28 md:h-36",
  };

  const glowSizes = {
    sm: "w-[4.5rem] h-[4.5rem]",
    md: "w-[5.75rem] h-[5.75rem]",
    lg: "w-40 h-40 md:w-48 md:h-48",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      {/* Soft feathered light so black logo details stay readable — no hard box */}
      <div
        aria-hidden
        className={cn(
          "absolute rounded-full pointer-events-none",
          "bg-[radial-gradient(circle,rgba(255,246,220,0.95)_0%,rgba(255,246,220,0.55)_42%,rgba(245,197,24,0.18)_62%,transparent_78%)]",
          glowSizes[size]
        )}
      />

      <img
        src={logo}
        alt="Detailing Masters"
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
