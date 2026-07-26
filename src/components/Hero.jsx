import { useEffect, useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const availableSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'];
  const bookedSlots = ['10:30 AM', '03:00 PM'];

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

          <h1 className="hero-title">
            DETAIL BEYOND<br />
            <span className="title-accent">EXPECTATION</span>
          </h1>
          <p className="hero-description">
            Where Precision Meets Passion. DETAILING MASTERS delivers premium auto detailing
            and car wash services for drivers who demand nothing less than perfection.
          </p>
          <div className="hero-buttons">
            <a href="#services" className="btn-primary">
              Explore Services <FiArrowRight />
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

        <div className="hero-form-wrapper">
          <form className="hero-booking-form" onSubmit={(e) => { e.preventDefault(); alert('Quick booking requested! We will call you shortly.'); }}>
            <h3 className="hero-form-title">Quick Booking</h3>
            <p className="hero-form-subtitle">Reserve your spot in under 60 seconds.</p>

            <div className="hero-form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="hero-form-group">
              <input type="tel" placeholder="Phone Number" required />
            </div>
            <div className="hero-form-group">
              <select required>
                <option value="">Select Service...</option>
                <option value="express">Express Wash</option>
                <option value="interior">Interior Detail</option>
                <option value="exterior">Exterior Detail</option>
                <option value="full">Full Detail Package</option>
              </select>
            </div>
            <div className="hero-form-group">
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {date && (
              <div className="hero-form-group">
                <div className="hero-timeslot-grid">
                  {availableSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`hero-timeslot-btn ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                        disabled={isBooked}
                        onClick={() => setTimeSlot(slot)}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary hero-form-submit">
              Reserve Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
