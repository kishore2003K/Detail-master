import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg bg-luxury-secondary/50 border border-luxury-border px-4 py-3 text-sm text-white",
        "transition-colors placeholder:text-gray-500",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold focus-visible:border-luxury-gold",
        "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
