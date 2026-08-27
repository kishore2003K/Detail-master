import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import {
  preloadImageSequence,
  getFrameSource,
  subscribeSequenceLoad,
  getSequenceMode,
  TOTAL_FRAMES,
} from '../utils/imageSequenceCache';

export default function CeramicCoatingShowcase() {
  const scrollTo = useSmoothScroll();
  const canvasRef = useRef(null);
  
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const modeRef = useRef(getSequenceMode());

  // Use shared cache preloader
  useEffect(() => {
    const mode = getSequenceMode();
    modeRef.current = mode;

    preloadImageSequence(mode).then(() => {
      setIsLoaded(true);
    });

    const unsubscribe = subscribeSequenceLoad((_count, _isTier1, updatedMode) => {
      if (updatedMode === modeRef.current) {
        setIsLoaded(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mode = getSequenceMode();
    modeRef.current = mode;
    const frameSource = getFrameSource(currentFrame, mode);
    if (!frameSource) return;

    const { img, sx, sy, sWidth, sHeight } = frameSource;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const hRatio = canvas.width / sWidth;
    const vRatio = canvas.height / sHeight;
    const ratio = Math.min(hRatio, vRatio);

    const centerShift_x = (canvas.width - sWidth * ratio) / 2;
    const centerShift_y = (canvas.height - sHeight * ratio) / 2;

    ctx.drawImage(
      img,
      sx,
      sy,
      sWidth,
      sHeight,
      centerShift_x,
      centerShift_y,
      sWidth * ratio,
      sHeight * ratio
    );
  }, [currentFrame, isLoaded]);

  // Scrubbing Interaction
  const startX = useRef(0);
  const startFrame = useRef(0);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
    startFrame.current = currentFrame;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const deltaX = clientX - startX.current;
      
      const sensitivity = 5; 
      let newFrame = Math.floor(startFrame.current - (deltaX / sensitivity));
      
      newFrame = ((newFrame % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
      setCurrentFrame(newFrame);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
    }

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [isDragging, currentFrame]);

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  const shadowAnimation = {
    scale: [1, 0.8, 1],
    opacity: [0.6, 0.3, 0.6],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  return (
    <section className="relative py-24 bg-[#0A0A0A] overflow-hidden border-y border-luxury-border/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Ultimate Protection</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The Science of <br/>
              <span className="text-gradient-gold">Invisible Protection</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              At Detailing Masters, we don't just wash; we deconstruct the art of shine. Our 3D ceramic shield is more than a layer—it's a molecular bond that levitates above your paint, repelling water, dust, and time.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Extreme Hydrophobic Properties",
                "Protection against UV & Oxidation",
                "Enhanced Scratch Resistance",
                "Deep Showroom Gloss Finish"
              ].map((benefit, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-6 h-6 rounded-full bg-luxury-gold/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-luxury-gold" />
                  </div>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            <Button 
              variant="primary" 
              size="lg"
              className="group"
              onClick={() => scrollTo("contact")}
            >
              Explore the Gloss [Interactive Model]
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
            </Button>
          </motion.div>
          
          {/* 360 Image Sequence Player */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`relative h-[400px] sm:h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden glass-card border border-luxury-border/50 group ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={handlePointerDown}
          >
            <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent ${isDragging ? 'opacity-100 mix-blend-overlay' : 'opacity-0'}`} style={{ backgroundSize: '200% 200%', animation: isDragging ? 'shimmer 2s linear infinite' : 'none' }} />

            <div className="absolute inset-0 bg-transparent flex items-center justify-center">
              {!isLoaded && (
                <div className="text-luxury-gold/80 flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
                  <p className="text-sm tracking-wider uppercase">Loading 3D Experience...</p>
                </div>
              )}
              
              <motion.div 
                className="relative w-full h-full flex flex-col items-center justify-center"
                animate={isLoaded ? floatAnimation : {}}
              >
                <canvas 
                  ref={canvasRef} 
                  width={800} 
                  height={800} 
                  role="img"
                  aria-label="Interactive 360-degree rotating model of nano-ceramic coated vehicle"
                  className={`w-full h-full object-contain transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p>Interactive 360-degree ceramic coating gloss and hydrophobic layer demonstration.</p>
                </canvas>
              </motion.div>

              {isLoaded && (
                <motion.div 
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/60 rounded-[100%] blur-xl pointer-events-none"
                  animate={shadowAnimation}
                />
              )}
            </div>
            
            <div className="absolute bottom-6 left-0 right-0 text-center z-30 pointer-events-none transition-opacity duration-300">
              <span className={`text-sm font-medium tracking-widest uppercase text-luxury-gold/80 bg-[#0A0A0A]/80 px-4 py-2 rounded-full backdrop-blur-md border border-luxury-gold/20 transition-opacity duration-300 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                Drag to rotate
              </span>
            </div>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
}
