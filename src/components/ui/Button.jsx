import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";

export function Button({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 ease-out";
  
  const variants = {
    primary: "bg-luxury-gold text-luxury-bg hover:bg-[#FFE04A] shadow-[0_0_20px_rgba(245,197,24,0.35)] hover:shadow-[0_0_32px_rgba(245,197,24,0.5)]",
    secondary: "bg-transparent border border-white/40 text-white hover:border-luxury-gold hover:text-luxury-gold backdrop-blur-sm",
    ghost: "bg-transparent text-white hover:text-luxury-gold hover:bg-white/5",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <Magnetic>
      <motion.button 
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    </Magnetic>
  );
}
