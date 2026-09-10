import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

export function ServiceCard({ slug, title, description, icon: Icon, image, duration, index = 0 }) {
  const scrollTo = useSmoothScroll();
  const serviceUrl = slug ? `/services/${slug}` : '#contact';

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card group relative overflow-hidden flex flex-col h-full min-h-[420px] rounded-2xl border border-luxury-border hover:border-luxury-gold/40 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-bg/60 to-luxury-bg/95 z-10" />
      
      <img 
        src={image}
        alt={`${title} - Car & Bike Detailing Service at Detailing Masters Marthandam`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-end">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-luxury-gold/20 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md border border-luxury-gold/30">
            <Icon className="text-luxury-gold w-6 h-6" />
          </div>
          {slug && (
            <Link 
              to={serviceUrl}
              className="text-[11px] font-mono uppercase tracking-wider text-luxury-gold hover:text-white bg-black/60 px-3 py-1 rounded-full border border-luxury-gold/30 flex items-center gap-1 transition-colors"
            >
              <span>Explore</span> <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-luxury-gold transition-colors">
          {slug ? (
            <Link to={serviceUrl} className="hover:underline decoration-luxury-gold">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="text-gray-300 text-xs md:text-sm mb-5 line-clamp-3 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-300 mb-5 bg-black/40 px-3.5 py-2 rounded-xl border border-white/5">
          <span className="font-semibold text-luxury-gold">Custom Treatment</span>
          <span className="text-gray-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-luxury-gold" /> {duration}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {slug ? (
            <Link
              to={serviceUrl}
              className="w-full py-2.5 rounded-full bg-luxury-secondary hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1 border border-luxury-border transition-colors text-center"
            >
              View Details
            </Link>
          ) : null}
          <Button 
            variant="primary" 
            size="sm" 
            className={`w-full text-xs font-bold ${slug ? '' : 'col-span-2'}`}
            onClick={() => scrollTo("contact")}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
