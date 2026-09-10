import { useCallback } from "react";
import { animate } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export function useSmoothScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = useCallback((elementId) => {
    if (location.pathname !== '/') {
      navigate(`/#${elementId}`);
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Calculate position offset for sticky header
    const offset = 80;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    
    // Smooth cinematic spring scroll
    animate(window.scrollY, targetPosition, {
      type: "spring",
      stiffness: 45,
      damping: 15,
      mass: 1.2,
      onUpdate: (latest) => window.scrollTo(0, latest)
    });
  }, [location.pathname, navigate]);

  return scrollTo;
}
