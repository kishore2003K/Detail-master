import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export function SectionTitle({ 
  title, 
  subtitle, 
  align = "center",
  className 
}) {
  return (
    <div className={cn("mb-16", align === "center" ? "text-center" : "text-left", className)}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-luxury-gold font-sans font-semibold tracking-[0.2em] uppercase text-xs mb-4 block"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold text-white mb-6"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={cn(
          "h-0.5 w-20 bg-gradient-to-r from-luxury-gold-dim via-luxury-gold to-luxury-gold-dim",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
