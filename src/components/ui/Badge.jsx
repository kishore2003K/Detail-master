import { cn } from "../../lib/utils";

export function Badge({ children, className }) {
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide",
      "bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20",
      className
    )}>
      {children}
    </span>
  );
}
