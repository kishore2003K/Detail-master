import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import IntroStrip from '../components/IntroStrip';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Detailing Masters | Best Car Wash, Bike Wash & Detailing in Marthandam</title>
        <meta 
          name="description" 
          content="Best car wash near me & premium car & bike detailing in Marthandam (Opposite KTM Showroom, Chankai). Ceramic Coating, PPF, Underbody Coating, Wax Coating, Car Water Wash & Interior Detailing in Marthandam & Kanyakumari." 
        />
        <link rel="canonical" href="https://detailingmasters.in/" />
      </Helmet>

      <main>
        <Hero />
        <IntroStrip />
        <Services />
        <WhyChooseUs />
        <Process />
        <Gallery />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
