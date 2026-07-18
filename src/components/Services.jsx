import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './Services.css';

const services = [
  {
    id: 1,
    num: '01',
    title: 'Foam Wash',
    desc: 'Thorough exterior foam wash for a spotless shine.',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80&auto=format&fit=crop',
    items: ['Snow foam pre-wash', 'Two-bucket hand wash', 'Wheel & tire cleaning', 'Microfiber towel dry'],
  },
  {
    id: 2,
    num: '02',
    title: 'Interior Cleaning',
    desc: 'Deep clean of every surface, fabric, and panel.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    items: ['Full vacuuming', 'Dashboard & console detail', 'Interior glass cleaning', 'Leather & plastic conditioning'],
  },
  {
    id: 3,
    num: '03',
    title: 'Ceramic Coating',
    desc: 'Ultimate long-term protection with nano-ceramic tech.',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&q=80&auto=format&fit=crop',
    items: ['9H hardness ceramic formula', 'Hydrophobic water repellency', 'UV & chemical resistance', 'Long-lasting shine'],
  },
  {
    id: 4,
    num: '04',
    title: 'Headlight Restoration',
    desc: 'Restore clarity to faded or yellowed headlights.',
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80&auto=format&fit=crop',
    items: ['Multi-stage wet sanding', 'High-gloss compounding', 'UV protective clear coat', 'Improved night visibility'],
  },
  {
    id: 5,
    num: '05',
    title: 'Interior Steaming',
    desc: 'Steam cleaning for deep sanitization and stain removal.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&auto=format&fit=crop',
    items: ['High-temp steam sanitization', 'Stain lifting & removal', 'Odor elimination', 'Fabric & upholstery care'],
  },
  {
    id: 6,
    num: '06',
    title: 'Engine Bay Detailing',
    desc: 'Safe and thorough cleaning of your engine compartment.',
    image: 'https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=600&q=80&auto=format&fit=crop',
    items: ['Sensitive electronics masking', 'Degreasing & wash', 'High-pressure air dry', 'Plastic & hose dressing'],
  },
  {
    id: 7,
    num: '07',
    title: 'Polish',
    desc: 'Enhance paint gloss and eliminate minor imperfections.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop',
    items: ['Paint decontamination', 'Machine polishing', 'Swirl mark reduction', 'High-gloss finish'],
  },
  {
    id: 8,
    num: '08',
    title: 'Paint Protection Film',
    desc: 'Invisible shield to protect against rock chips and scratches.',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&q=80&auto=format&fit=crop',
    items: ['Self-healing clear bra', 'Rock chip protection', 'Stain & scratch resistance', 'Custom cut & fit'],
  },
];

const Services = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">OUR SERVICES</h2>
          <p className="section-subtitle">
            Hover over each service to see what's included. Every package is tailored
            to your vehicle's unique needs.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${activeCard === service.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="service-img">
                <img src={service.image} alt={service.title} />
                <div className="service-overlay" />
              </div>
              <span className="service-num">{service.num}</span>
              <div className="service-info">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
              <div className="service-hover-detail">
                <h4 className="service-detail-title">{service.title}</h4>
                <ul className="service-detail-list">
                  {service.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
