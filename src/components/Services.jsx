import { Shield, Sparkles, Droplets, Gauge, Bike, Wind, Layers, Sun, ShieldCheck } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { ServiceCard } from "./ui/ServiceCard";

const services = [
  {
    title: "Basic Bike Foam Wash & Lube",
    description: "Quick pH-neutral snow foam wash for two-wheelers, pressure wheel rinse, chain de-grime & lube, and clean microfiber dry.",
    price: "₹250",
    duration: "25 mins",
    icon: Bike,
    image: "/images/bike.png"
  },
  {
    title: "Express Car Foam Wash",
    description: "Quick exterior snow foam wash, high-pressure body rinse, wheel clean, glass wipe, and streak-free chamois dry for regular maintenance.",
    price: "₹499",
    duration: "30 mins",
    icon: Droplets,
    image: "/images/hero-wash.jpg"
  },
  {
    title: "Premium Car Wash & Water Wash",
    description: "Multi-stage pH-neutral snow foam bath, undercarriage high-pressure wash, two-bucket scratch-safe hand wash, wheel de-ironing, and streak-free blower dry.",
    price: "₹999",
    duration: "45 mins",
    icon: Droplets,
    image: "/images/wash.png"
  },
  {
    title: "Bike Wash & Detailing",
    description: "Specialized foam bike wash, engine degreasing, chain cleaning & ceramic lube, alloy chrome polishing, and hydrophobic tank paint protection.",
    price: "₹1,499",
    duration: "2 Hours",
    icon: Bike,
    image: "/images/bike.png"
  },
  {
    title: "Ceramic & Graphene Coating",
    description: "9H multi-layer nano-ceramic shield offering 3 to 5 years of extreme gloss, hydrophobic water beading, chemical resistance, and UV defense.",
    price: "₹14,999",
    duration: "2-3 Days",
    icon: Shield,
    image: "/images/ceramic.png"
  },
  {
    title: "Paint Correction & Scratch Removal",
    description: "Precision multi-stage machine compounding and polishing to eliminate 85–95% of swirl marks, light scratches, holograms, and heavy paint oxidation.",
    price: "₹4,999",
    duration: "1-2 Days",
    icon: Sparkles,
    image: "/images/Paint Correction-1.jpg"
  },
  {
    title: "Interior Detailing & A/C Steaming",
    description: "Deep high-temperature steam sterilization, fabric extraction, premium leather conditioning, dashboard UV dress, and complete odor & germ removal.",
    price: "₹2,499",
    duration: "4 Hours",
    icon: Wind,
    image: "/images/interior.png"
  },
  {
    title: "Underbody Anti-Rust Coating",
    description: "Heavy-duty rubberized bitumen chassis coating designed for coastal humidity and road conditions to prevent rust, corrosion, and road gravel damage.",
    price: "₹2,999",
    duration: "3 Hours",
    icon: Layers,
    image: "/images/paint.png"
  },
  {
    title: "Wax Coating & Gloss Sealant",
    description: "Premium carnauba mirror wax and synthetic polymer paint sealant providing intense showroom reflection and 3 months of hydrophobic UV protection.",
    price: "₹1,999",
    duration: "2 Hours",
    icon: Sun,
    image: "/images/hero-wash.jpg"
  },
  {
    title: "Paint Protection Film (PPF) & Tint",
    description: "Ultra-clear self-healing TPU film and high heat-rejection sun control tint to shield vulnerable panels against rock chips, scratches, and harsh sunlight.",
    price: "₹34,999",
    duration: "3-4 Days",
    icon: ShieldCheck,
    image: "/images/hero.png"
  },
  {
    title: "Engine Bay Cleaning & Dressing",
    description: "Safe precision degreasing, steam cleaning, non-conductive drying, and high-temperature plastic & hose conditioning for a factory-fresh bay.",
    price: "₹1,499",
    duration: "2 Hours",
    icon: Gauge,
    image: "/images/engine.png"
  }
];

export default function Services() {
  return (
    <section id="services" className="pt-16 pb-24 relative bg-luxury-bg">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(245,197,24,0.06),transparent_55%)]" />

      <Container className="relative z-10">
        <SectionTitle
          title="Our Premium Detailing Services"
          subtitle="Precision Care for Cars & Bikes in Marthandam"
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

