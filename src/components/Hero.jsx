import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "./ui/Container";
import { hidePreloader } from "../utils/hidePreloader";
import {
  preloadImageSequence,
  getFrameSource,
  subscribeSequenceLoad,
  getSequenceMode,
  TOTAL_FRAMES,
} from "../utils/imageSequenceCache";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const modeRef = useRef(getSequenceMode());

  // Ref elements for text overlays
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const scrollHintRef = useRef(null);

  const lastDrawnFrameRef = useRef(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cached layout metrics to completely eliminate layout thrashing during scroll ticks
  const metricsRef = useRef({
    displayWidth: 0,
    displayHeight: 0,
    dpr: 1,
    ratio: 1,
    centerShift_x: 0,
    centerShift_y: 0,
    sWidth: 1280,
    sHeight: 720,
  });

  const updateMetrics = (explicitMode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const currentMode = explicitMode || modeRef.current || (isMobile ? "mobile" : "desktop");
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    const dpr = isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : Math.min(window.devicePixelRatio || 1, 2);

    const targetWidth = Math.floor(displayWidth * dpr);
    const targetHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    }

    const sWidth = currentMode === "mobile" ? 540 : 1280;
    const sHeight = currentMode === "mobile" ? 960 : 720;
    const hRatio = displayWidth / sWidth;
    const vRatio = displayHeight / sHeight;
    const ratio = Math.max(hRatio, vRatio);

    metricsRef.current = {
      displayWidth,
      displayHeight,
      dpr,
      ratio,
      centerShift_x: (displayWidth - sWidth * ratio) / 2,
      centerShift_y: (displayHeight - sHeight * ratio) / 2,
      sWidth,
      sHeight,
    };

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingQuality = isMobile ? "low" : "medium";
    }
  };

  // Helper to draw a specific frame onto canvas with cover mechanics & retina support
  const renderFrame = (targetIndex, explicitMode, forceRedraw = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const currentMode = explicitMode || modeRef.current || getSequenceMode();
    const frameSource = getFrameSource(targetIndex, currentMode);
    if (!frameSource) return;

    const { img, sx, sy, sWidth, sHeight, actualIndex } = frameSource;

    // Skip redundant draw calls if already showing this frame
    if (!forceRedraw && actualIndex === lastDrawnFrameRef.current) return;
    lastDrawnFrameRef.current = actualIndex;

    const { ratio, centerShift_x, centerShift_y } = metricsRef.current;

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
  };

  // Preload frames via shared cache module
  useEffect(() => {
    const initialMode = getSequenceMode();
    modeRef.current = initialMode;
    updateMetrics(initialMode);

    preloadImageSequence(initialMode).then(() => {
      setIsLoaded(true);
      hidePreloader();
      renderFrame(0, initialMode, true);
    });

    const unsubscribe = subscribeSequenceLoad((_loadedCount, _isTier1, updatedMode) => {
      // Re-render current frame when new sprite sheets load for active mode
      if (updatedMode === modeRef.current) {
        renderFrame(lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0, updatedMode, true);
      }
    });

    // Hard ceiling safety for preloader (2.8s max delay)
    const timer = setTimeout(() => {
      setIsLoaded(true);
      hidePreloader();
      renderFrame(0, modeRef.current, true);
    }, 2800);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Handle window resize & responsive sequence mode switching
  useEffect(() => {
    const handleResize = () => {
      const newMode = getSequenceMode();
      modeRef.current = newMode;
      updateMetrics(newMode);
      preloadImageSequence(newMode).then(() => {
        renderFrame(lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0, newMode, true);
      });
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Direct zero-overhead hardware transform helper for text overlays
  const applyTextTransform = (ref, opacity, y) => {
    if (!ref.current) return;
    const el = ref.current;
    el.style.opacity = opacity;
    el.style.transform = opacity > 0.01 ? `translate3d(0, ${y}px, 0)` : "translate3d(0, 30px, 0)";
    el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
  };

  // Set up GSAP ScrollTrigger sequence & pinning
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: isMobile ? "+=90%" : "+=180%", // Snappy single flick on mobile, silky smooth on desktop
        pin: true,
        scrub: isMobile ? 0.05 : 0.35, // Instant 1:1 tracking on mobile, gentle inertia on desktop
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * (TOTAL_FRAMES - 1))
          );

          renderFrame(targetFrame);

          // Fast direct typography opacity and transform
          if (text1Ref.current) {
            let opacity = 0;
            let y = 30;
            if (progress >= 0.02 && progress <= 0.35) {
              if (progress < 0.12) {
                opacity = (progress - 0.02) / 0.1;
                y = 30 * (1 - opacity);
              } else if (progress > 0.28) {
                opacity = (0.35 - progress) / 0.07;
                y = -20 * (1 - opacity);
              } else {
                opacity = 1;
                y = 0;
              }
            }
            applyTextTransform(text1Ref, opacity, y);
          }

          if (text2Ref.current) {
            let opacity = 0;
            let y = 30;
            if (progress >= 0.38 && progress <= 0.70) {
              if (progress < 0.46) {
                opacity = (progress - 0.38) / 0.08;
                y = 30 * (1 - opacity);
              } else if (progress > 0.62) {
                opacity = (0.70 - progress) / 0.08;
                y = -20 * (1 - opacity);
              } else {
                opacity = 1;
                y = 0;
              }
            }
            applyTextTransform(text2Ref, opacity, y);
          }

          if (text3Ref.current) {
            let opacity = 0;
            let y = 30;
            if (progress >= 0.72) {
              if (progress < 0.80) {
                opacity = (progress - 0.72) / 0.08;
                y = 30 * (1 - opacity);
              } else if (progress > 0.94) {
                opacity = (1 - progress) / 0.06;
              } else {
                opacity = 1;
                y = 0;
              }
            }
            applyTextTransform(text3Ref, opacity, y);
          }

          if (scrollHintRef.current) {
            const hintOpacity = Math.max(0, 1 - progress * 4);
            scrollHintRef.current.style.opacity = hintOpacity;
            scrollHintRef.current.style.visibility = hintOpacity > 0.01 ? "visible" : "hidden";
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#000000] overflow-hidden"
    >
      <div className="relative h-screen h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#000000] z-0" />

        <Container className="relative h-full w-full flex items-center justify-between pointer-events-none z-20">
          <div className="w-full md:w-1/2 flex flex-col justify-center h-full relative z-30">
            
            <div 
              ref={text1Ref} 
              className="absolute left-0 opacity-0 translate-y-8 transition-none"
            >
              <span className="text-luxury-gold text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-2 block">
                Precision Detailing
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                Layered <br />
                <span className="text-gray-400 text-2xl md:text-4xl font-normal">
                  Protection.
                </span>
              </h2>
            </div>

            <div 
              ref={text2Ref} 
              className="absolute left-0 opacity-0 translate-y-8 transition-none"
            >
              <span className="text-luxury-gold text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-2 block">
                Nanotechnology
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                Ceramic <br />
                <span className="text-gradient-gold text-3xl md:text-5xl">
                  Shield.
                </span>
              </h2>
            </div>

            <div 
              ref={text3Ref} 
              className="absolute left-0 opacity-0 translate-y-8 transition-none"
            >
              <span className="text-luxury-gold text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-2 block">
                Showroom Finish
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                Ultimate <br />
                <span className="text-white text-3xl md:text-5xl">
                  Perfection.
                </span>
              </h2>
            </div>

          </div>
        </Container>

        <div className="absolute inset-0 pointer-events-none z-10">
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-cover transform-gpu will-change-transform transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 z-30 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] font-medium text-gray-400">
            Scroll to Explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-luxury-gold to-transparent animate-pulse" />
        </div>

      </div>
    </section>
  );
}
