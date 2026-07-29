import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";

export function ServiceCard({ title, description, icon: Icon, image, price, duration, index = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card group relative overflow-hidden flex flex-col h-full min-h-[380px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-bg/90 z-10" />
      
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url("${image}")` }}
      />

      <div className="relative z-20 p-8 flex flex-col h-full justify-end">
        <div className="mb-4 bg-luxury-gold/20 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-luxury-gold/30">
          <Icon className="text-luxury-gold w-7 h-7" />
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300 text-sm mb-6 line-clamp-3">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
          <span className="font-semibold text-white">From {price}</span>
          <span>{duration}</span>
        </div>
        
        <div className="flex items-center gap-4 mt-auto">
          <Button variant="primary" size="sm" className="w-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Book Now</Button>
          <button className="text-luxury-gold p-2 hover:bg-luxury-gold/10 rounded-full transition-colors" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
