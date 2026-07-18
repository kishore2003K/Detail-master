import { useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-bg-shapes">
        <div className="hero-shape shape-1" />
        <div className="hero-shape shape-2" />
        <div className="hero-shape shape-3" />
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot" />
            SUMMER SPECIAL — 20% OFF All Detail Packages
          </div>
          <h1 className="hero-title">
            DETAIL BEYOND<br />
            <span className="title-accent">EXPECTATION</span>
          </h1>
          <p className="hero-description">
            Where Precision Meets Passion. DETAILMASTER delivers premium auto detailing
            and car wash services for drivers who demand nothing less than perfection.
          </p>
          <div className="hero-buttons">
            <a href="#services" className="btn-primary">
              Explore Services <FiArrowRight />
            </a>
            <a href="#contact" className="btn-secondary">
              Book Appointment
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Cars Detailed</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">5★</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="hero-images">
          <div className="hero-img-main">
            <img
              src="https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=700&q=80&auto=format&fit=crop"
              alt="Professional car wash"
            />
          </div>
          <div className="hero-img-float">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&auto=format&fit=crop"
              alt="Polished car detail"
            />
          </div>
          <div className="hero-float-badge">
            <span className="float-badge-number">15+</span>
            <span className="float-badge-text">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
