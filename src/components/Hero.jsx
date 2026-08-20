import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Container } from "./ui/Container";
import { hidePreloader } from "../utils/hidePreloader";

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // The container will be 400vh tall as requested for the full sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress to give it that 120fps 'Lerp' feel
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 50, 
    damping: 20, 
    restDelta: 0.001 
  });

  // Mobile optimization: Use direct scroll progress on touch devices to eliminate perceived "delay" or lag,
  // since native touch scrolling is already perfectly smooth. Use spring on desktop to smooth out chunky mouse wheels.
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const activeProgress = isTouchDevice ? scrollYProgress : smoothProgress;

  const [images, setImages] = useState([]);
  const totalFrames = 240;
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images with progressive loading to vastly improve initial load time
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    const framesToPreload = Math.min(20, totalFrames); // Only wait for the first 20 frames to unblock UI
    
    // Enforce at least 3 seconds of preloader visibility
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 3000));

    const initialImagesPromise = new Promise(resolve => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(4, '0');
        img.src = `/car-sequence/image_${frameNum}.jpg`;
        
        const handleLoadOrError = () => {
          loadedCount++;
          if (loadedCount >= framesToPreload) resolve();
        };
        
        img.onload = handleLoadOrError;
        img.onerror = handleLoadOrError; // Handle errors so it doesn't hang
        
        loadedImages.push(img);
      }
      
      // Secondary hard failsafe for the promise itself
      setTimeout(resolve, 4000); 
    });

    Promise.all([initialImagesPromise, minTimePromise]).then(() => {
      setIsLoaded(true);
      hidePreloader();
    }).catch(() => {
      setIsLoaded(true);
      hidePreloader(); // Fail-safe
    });
    
    // hard ceiling: never show longer than 4s regardless of what's loading
    setTimeout(() => {
      setIsLoaded(true);
      hidePreloader();
    }, 4000);
    
    setImages(loadedImages);
  }, []);

  // Update canvas when active scroll progress changes
  useEffect(() => {
    const drawFrame = (latest) => {
      if (!isLoaded || images.length === 0) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // { alpha: false } is a massive performance boost for mobile GPU compositing
      const ctx = canvas.getContext('2d', { alpha: false });
      
      // Map scroll progress (0-1) to frame index (0-239)
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(latest * totalFrames)
      );
      
      const img = images[frameIndex];
      if (!img || !img.complete) return;
      
      // Keep canvas resolution crisp on retina displays (cap at 2x for performance)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        ctx.scale(dpr, dpr);
      }

      // Draw image using cover mechanics (no need for clearRect since JPEGs with cover fill the whole canvas)
      const hRatio = displayWidth / img.width;
      const vRatio = displayHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (displayWidth - img.width * ratio) / 2;
      const centerShift_y = (displayHeight - img.height * ratio) / 2;
      
      ctx.drawImage(
        img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    const unsubscribe = activeProgress.on("change", drawFrame);

    // Initial draw when loaded
    if (isLoaded) {
      drawFrame(activeProgress.get());
    }

    const handleResize = () => {
      drawFrame(activeProgress.get());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [activeProgress, images, isLoaded]);

  // --- Animations ---
  
  // 1. Antigravity Lift: Car starts resting, lifts up early in the scroll (0-25%)
  const carY = useTransform(activeProgress, [0, 0.25], [0, -30]);
  
  // 2. Contact Shadow: Shrinks and fades as car lifts
  const shadowScale = useTransform(activeProgress, [0, 0.25], [1, 0.7]);
  const shadowOpacity = useTransform(activeProgress, [0, 0.25], [0.8, 0.3]);

  // 3. Apple Typography Fades
  // "Layered" fades out between 25% and 50%
  const text1Opacity = useTransform(activeProgress, [0.05, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  
  // "Ceramic Shield" fades in exactly as the panels "explode" / Layered fades out
  const text2Opacity = useTransform(activeProgress, [0.45, 0.55, 0.8, 0.9], [0, 1, 1, 0]);

  // Text Y translations for a slight "rise up" effect when appearing
  const text1Y = useTransform(activeProgress, [0.05, 0.25], [20, 0]);
  const text2Y = useTransform(activeProgress, [0.45, 0.55], [20, 0]);

  // 4. Gloss Flash Effect at the end (75% - 100%)
  // Spikes to bright white/gloss at 85%, then resolves to normal
  const flashOpacity = useTransform(activeProgress, [0.75, 0.85, 1], [0, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[250vh] md:h-[400vh] bg-[#000000]"
    >
      {/* Sticky Container (Locks to viewport) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Deep Infinite Black Background */}
        <div className="absolute inset-0 bg-[#000000] z-0" />

        <Container className="relative h-full w-full flex items-center justify-between pointer-events-none z-20">
          
          {/* Left Side Copy */}
          <div className="w-1/3 flex flex-col justify-center h-full relative z-30">
            <motion.div 
              style={{ opacity: text1Opacity, y: text1Y }} 
              className="absolute left-0"
            >
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight">
                Layered <br/>
                <span className="text-gray-400 text-3xl md:text-4xl">Protection.</span>
              </h2>
            </motion.div>

            <motion.div 
              style={{ opacity: text2Opacity, y: text2Y }} 
              className="absolute left-0"
            >
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight">
                Ceramic <br/>
                <span className="text-gradient-gold text-4xl md:text-5xl">Shield.</span>
              </h2>
            </motion.div>
          </div>
          
        </Container>

        {/* 360 Image Sequence Player */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          
          {/* Static HTML Preloader is handled in index.html and hidePreloader.js */}

          {/* Car Container (moves up) */}
          <motion.div 
            style={{ y: carY }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <canvas 
              ref={canvasRef}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Gloss Flash Overlay */}
            <motion.div 
              style={{ opacity: flashOpacity }}
              className="absolute inset-0 bg-white/20 mix-blend-overlay"
            />
          </motion.div>

          {/* Contact Shadow */}
          <motion.div 
            style={{ scale: shadowScale, opacity: shadowOpacity }}
            className="absolute top-[75%] left-1/2 -translate-x-1/2 w-[40%] max-w-lg h-6 bg-[#000000] rounded-[100%] blur-xl shadow-[0_0_50px_rgba(0,0,0,1)]"
          />

        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-30"
        >
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll to Explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-luxury-gold to-transparent" />
        </motion.div>
        
        {/* Brand Logo to Cover Watermark */}
        <div className="absolute bottom-[calc(4rem-7vh)] right-[calc(1rem+2vw)] md:bottom-[calc(5rem-7vh)] md:right-[calc(2rem+2vw)] z-40 pointer-events-none flex items-center justify-center">
          <img 
            src="/brand-logo.png" 
            alt="Detailing Masters" 
            className="h-28 md:h-40 lg:h-44 w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
