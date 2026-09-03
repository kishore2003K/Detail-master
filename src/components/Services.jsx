import { Shield, Sparkles, Droplets, Bike, Wind, Layers, Gift, MessageCircle } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { ServiceCard } from "./ui/ServiceCard";
import { Button } from "./ui/Button";

const services = [
  {
    title: "Premium Car Wash & Water Wash",
    description: "Multi-stage pH-neutral snow foam bath, undercarriage high-pressure wash, two-bucket scratch-safe hand wash, wheel de-ironing, and streak-free blower dry.",
    price: "₹999",
    duration: "45 mins",
    icon: Droplets,
    image: "/images/wash.png"
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
    title: "Bike Wash & Complete Detailing",
    description: "Specialized foam bike wash, engine degreasing, chain cleaning & ceramic lube, alloy chrome polishing, and hydrophobic tank paint protection.",
    price: "₹1,499",
    duration: "2 Hours",
    icon: Bike,
    image: "/images/bike.png"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>

        {/* Regular Customer & Loyalty Package Privilege Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-luxury-secondary/80 via-black to-luxury-secondary/80 border border-luxury-gold/30 p-6 md:p-8 shadow-[0_0_30px_rgba(245,197,24,0.08)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/15 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 mt-1">
                <Gift className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-gold bg-luxury-gold/10 px-2.5 py-0.5 rounded border border-luxury-gold/20">
                    Studio Privilege
                  </span>
                  <span className="text-xs text-gray-400">Regular Clients & Combo Packages</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  Exclusive Loyalty Perks & Multi-Service Package Offers
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-2xl">
                  Are you a regular client or bundling services together (e.g., Ceramic Coating + Underbody Protection + Interior Spa)? Ask our studio manager for special repeat customer rates, bundled package savings, and priority weekend slots.
                </p>
              </div>
            </div>

            <Button
              className="bg-luxury-gold text-luxury-bg hover:bg-white transition-colors shrink-0 font-semibold px-6 py-3 shadow-lg"
              onClick={() => {
                const message = encodeURIComponent("Hi Detailing Masters, I am interested in your multi-service package offers and regular customer detailing plans.");
                window.open(`https://wa.me/919111977721?text=${message}`, '_blank');
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Inquire About Package Offers
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

