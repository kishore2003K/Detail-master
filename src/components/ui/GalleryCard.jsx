import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function GalleryCard({ image, category, title, onClick }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
      onClick={onClick}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url("${image}")` }}
      />
      
      <div className="absolute inset-0 bg-luxury-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
        <div className="bg-luxury-gold text-luxury-bg p-3 rounded-full mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <Search className="w-6 h-6" />
        </div>
        <h4 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{title}</h4>
        <span className="text-luxury-gold text-sm font-medium uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">{category}</span>
      </div>
    </motion.div>
  );
}
