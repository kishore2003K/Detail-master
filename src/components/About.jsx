import { FiCheckCircle } from 'react-icons/fi';
import './About.css';

const About = () => {
  const features = [
    {
      icon: '🛡️',
      title: 'Certified Professionals',
      desc: 'IDA certified technicians with years of expertise',
    },
    {
      icon: '✨',
      title: 'Premium Products',
      desc: 'Top-tier ceramic coatings & professional compounds',
    },
    {
      icon: '🌿',
      title: 'Eco-Friendly',
      desc: 'Water-conscious processes & biodegradable cleaners',
    },
    {
      icon: '💯',
      title: 'Satisfaction Guaranteed',
      desc: "We don't stop until you're thrilled",
    },
  ];

  return (
    <section className="about" id="about">
      <div className="container about-grid">
        <div className="about-images">
          <div className="about-img-main">
            <img
              src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80&auto=format&fit=crop"
              alt="Detailer at work"
            />
          </div>
          <div className="about-img-accent" />
        </div>

        <div className="about-content">
          <span className="section-label">Our Story</span>
          <h2 className="section-title">CRAFTED WITH CARE,<br />BUILT ON TRUST</h2>
          <p className="about-text">
            DETAILING MASTERS was founded on a simple belief: every vehicle deserves to be treated
            like a work of art. Located in the heart of the city, we bring together expertise,
            premium products, and genuine passion for automotive aesthetics.
          </p>
          <p className="about-text">
            Our certified detailers use only the finest professional-grade products and
            cutting-edge techniques to protect your investment and restore your vehicle's
            showroom glory. From daily drivers to exotic supercars, we treat every car
            with the same dedication.
          </p>

          <div className="about-features">
            {features.map((f, i) => (
              <div className="about-feature" key={i}>
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <h4 className="feature-title">{f.title}</h4>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
