import { useCallback } from "react";
import { animate } from "framer-motion";

export function useSmoothScroll() {
  const scrollTo = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Calculate the position. We might want to offset it slightly to account for the sticky header
    const offset = 80; // approximate header height
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    
    // Spring animation for a smooth, cinematic feel
    animate(window.scrollY, targetPosition, {
      type: "spring",
      stiffness: 45,
      damping: 15,
      mass: 1.2,
      onUpdate: (latest) => window.scrollTo(0, latest)
    });
  }, []);

  return scrollTo;
}
