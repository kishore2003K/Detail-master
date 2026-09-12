import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import { CustomCursor } from './components/ui/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import LocationPage from './pages/LocationPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import VehiclePage from './pages/VehiclePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFoundPage from './pages/NotFoundPage';
import { hidePreloader } from './utils/hidePreloader';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    hidePreloader(150);
  }, [location.pathname]);

  useEffect(() => {
    // Only enable heavy Lenis smooth scrolling on desktop non-touch devices
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);

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
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
    }

    return () => {
      if (updateGSAP) gsap.ticker.remove(updateGSAP);
      if (lenis) lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-text font-sans selection:bg-luxury-gold selection:text-luxury-bg overflow-x-hidden w-full relative max-w-[100vw]">
      <ScrollToTop />
      <CustomCursor />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/locations/:slug" element={<LocationPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/vehicles/:slug" element={<VehiclePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        {/* 404 Fallback route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
