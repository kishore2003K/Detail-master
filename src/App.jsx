import { Helmet, HelmetProvider } from 'react-helmet-async';
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

function App() {
  return (
    <HelmetProvider>

      
      <div className="min-h-screen bg-luxury-bg text-luxury-text font-sans selection:bg-luxury-gold selection:text-luxury-bg">
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
    </HelmetProvider>
  );
}

export default App;
