import { Shield, Sparkles, Droplets, Gauge, Bike, Wind } from "lucide-react";
import { useState, useEffect } from "react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { ServiceCard } from "./ui/ServiceCard";

const staticServiceMetadata = [
  {
    title: "Premium Wash",
    description: "Meticulous hand wash using pH-neutral snow foam, two-bucket method, and plush microfiber drying to prevent swirl marks.",
    price: "₹999",
    duration: "45 mins",
    icon: Droplets,
    image: "/images/wash.png"
  },
  {
    title: "Ceramic Coating",
    description: "9H nano-ceramic coating providing years of protection against UV rays, bird droppings, and minor scratches with ultimate gloss.",
    price: "₹14,999",
    duration: "2-3 Days",
    icon: Shield,
    image: "/images/ceramic.png"
  },
  {
    title: "Paint Correction",
    description: "Multi-stage machine polishing to permanently remove swirl marks, holograms, oxidation, and deep scratches from the clear coat.",
    price: "₹4,999",
    duration: "1-2 Days",
    icon: Sparkles,
    image: "/images/Paint Correction-1.jpg"
  },
  {
    title: "Interior Detailing",
    description: "Deep steam cleaning, leather conditioning, stain removal, and odor elimination for a factory-fresh interior.",
    price: "₹2,499",
    duration: "4 Hours",
    icon: Wind,
    image: "/images/interior.png"
  },
  {
    title: "Engine Bay Cleaning",
    description: "Safe degreasing and steam cleaning of the engine compartment followed by plastic and rubber conditioning.",
    price: "₹1,499",
    duration: "2 Hours",
    icon: Gauge,
    image: "/images/engine.png"
  },
  {
    title: "Bike Detailing",
    description: "Comprehensive motorcycle detailing including chrome polishing, chain cleaning, and tank paint correction.",
    price: "₹1,999",
    duration: "3 Hours",
    icon: Bike,
    image: "/images/bike-detailing-1.jpg"
  }
];

export default function Services() {
  const [services, setServices] = useState(staticServiceMetadata);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://detail-master-production.up.railway.app';
        const response = await fetch(`${API_URL}/api/services`);
        if (response.ok) {
          const dbServices = await response.json();
          if (Array.isArray(dbServices)) {
            const activeServices = dbServices.filter(s => s && s.is_active !== false);
            
            if (activeServices.length > 0) {
              const mergedServices = activeServices.map(dbService => {
                const meta = staticServiceMetadata.find(
                  s => s.title.toLowerCase() === (dbService.service_name || '').toLowerCase()
                ) || {};
                
                return {
                  id: dbService.id || meta.id || dbService.service_name,
                  title: dbService.service_name || meta.title,
                  price: dbService.base_price ? `₹${Number(dbService.base_price).toLocaleString('en-IN')}` : meta.price,
                  description: meta.description || `Professional ${dbService.service_name} service.`,
                  duration: meta.duration || "Varies",
                  icon: meta.icon || Sparkles,
                  image: meta.image || "/images/wash.png"
                };
              });
              
              setServices(mergedServices);
            }
          }
        }
      } catch (error) {
        console.warn("Backend services unavailable, using static services:", error);
      }
    };
    
    fetchServices();
  }, []);

  return (
    <section id="services" className="pt-16 pb-24 relative bg-luxury-bg">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(245,197,24,0.06),transparent_55%)]" />

      <Container className="relative z-10">
        <SectionTitle
          title="Our Premium Services"
          subtitle="Uncompromising Quality"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
