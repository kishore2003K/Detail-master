import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { trackWhatsAppClick, trackCallClick } from "../utils/analytics";

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/919111977721" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        aria-label="Chat with Detailing Masters on WhatsApp"
        className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-green-500/50 transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      
      {/* Call Button */}
      <a 
        href="tel:9111977721" 
        onClick={() => trackCallClick('floating_button')}
        aria-label="Call Detailing Masters"
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-blue-600/50 transition-all duration-300 md:hidden"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-14 h-14 rounded-full bg-luxury-secondary border border-luxury-border text-luxury-gold flex items-center justify-center shadow-lg hover:scale-110 hover:bg-luxury-gold hover:text-luxury-bg transition-all duration-300"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
