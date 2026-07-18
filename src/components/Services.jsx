import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './Services.css';

const services = [
  {
    id: 1,
    num: '01',
    title: 'Express Wash',
    desc: 'Quick yet thorough wash for a spotless shine.',
    price: 'Starting from $39',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80&auto=format&fit=crop',
    items: [
      'Exterior hand wash & dry',
      'Wheel & tire cleaning',
      'Window cleaning',
      'Quick interior vacuum',
      'Dashboard wipe-down',
      'Air freshener',
    ],
  },
  {
    id: 2,
    num: '02',
    title: 'Interior Detail',
    desc: 'Deep clean of every surface, fabric, and panel.',
    price: 'Starting from $149',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    items: [
      'Full vacuum (seats, carpet, trunk)',
      'Steam cleaning & sanitization',
      'Leather conditioning & treatment',
      'Dashboard & console detail',
      'Interior glass cleaning',
      'Odor elimination treatment',
    ],
  },
  {
    id: 3,
    num: '03',
    title: 'Exterior Detail',
    desc: "Restore your vehicle's paint to a gleaming finish.",
    price: 'Starting from $179',
    image: 'https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=600&q=80&auto=format&fit=crop',
    items: [
      'Hand wash & decontamination',
      'Clay bar treatment',
      'Wheel & tire deep clean',
      'Paint sealant application',
      'Glass & trim treatment',
      'Tire dressing & shine',
    ],
  },
  {
    id: 4,
    num: '04',
    title: 'Full Detail',
    desc: 'The complete DETAILMASTER experience — inside and out.',
    price: 'Starting from $299',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80&auto=format&fit=crop',
    items: [
      'Everything in Interior Detail',
      'Everything in Exterior Detail',
      'Multi-stage paint correction',
      'Premium carnauba wax',
      'Interior dressing & protection',
      'Full engine detailing',
    ],
  },
  {
    id: 5,
    num: '05',
    title: 'Paint Correction',
    desc: 'Eliminate swirl marks, scratches, and oxidation.',
    price: 'Starting from $399',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop',
    items: [
      'Paint thickness measurement',
      'Single / dual stage correction',
      'Swirl mark removal',
      'Light scratch elimination',
      'Oxidation removal',
      'High-gloss polish finish',
    ],
  },
  {
    id: 6,
    num: '06',
    title: 'Ceramic Coating',
    desc: 'Ultimate long-term protection with nano-ceramic tech.',
    price: 'Starting from $699',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&q=80&auto=format&fit=crop',
    items: [
      '9H hardness ceramic formula',
      '2–5 year protection warranty',
      'Hydrophobic water repellency',
      'UV & chemical resistance',
      'Pre-coat paint correction',
      'Professional-grade application',
    ],
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
                <span className="service-price">{service.price}</span>
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
