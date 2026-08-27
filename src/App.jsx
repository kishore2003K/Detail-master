import Header from './components/Header';
import Hero from './components/Hero';
import IntroStrip from './components/IntroStrip';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import { CustomCursor } from './components/ui/CustomCursor';
import Lenis from 'lenis';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Apple-standard: Allow mobile & touch devices to use native 120Hz/60Hz GPU hardware momentum scrolling
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    let lenis = null;
    let updateGSAP = null;

    if (!isTouch) {
      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        syncTouch: false,
        touchMultiplier: 0,
      });

      lenis.on('scroll', ScrollTrigger.update);

      updateGSAP = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateGSAP);
      gsap.ticker.lagSmoothing(0);
    } else {
      // Native touch momentum for mobile with GSAP ScrollTrigger
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
    }

    return () => {
      if (updateGSAP) gsap.ticker.remove(updateGSAP);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-text font-sans selection:bg-luxury-gold selection:text-luxury-bg overflow-x-hidden w-full relative max-w-[100vw]">
      <CustomCursor />
      <Header />
      
      <main>
        <Hero />
        <IntroStrip />
        <Services />
        <WhyChooseUs />
        <Process />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
