import { motion } from "framer-motion";
import { Award, Leaf, Settings, ShieldCheck, ThumbsUp, Truck, Sparkles } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";

const features = [
  {
    icon: Award,
    title: "Certified Professionals",
    description: "Our detailers are master-certified with hundreds of hours of advanced training."
  },
  {
    icon: Sparkles,
    title: "Premium Imported Products",
    description: "We exclusively use top-tier, imported detailing chemicals and ceramic coatings." // need to import Sparkles, or use something else. Let's use ShieldCheck
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Cleaning",
    description: "Water-conscious techniques and biodegradable products safe for the environment."
  },
  {
    icon: Settings,
    title: "Advanced Equipment",
    description: "State-of-the-art polishers, steam cleaners, and specialized lighting systems."
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "We don't consider the job complete until you are absolutely thrilled with the result."
  },
  {
    icon: Truck,
    title: "Pickup & Drop Available",
    description: "Complimentary enclosed transport for premium ceramic and PPF packages."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden bg-luxury-secondary/20 border-t border-luxury-border">
      <Container>
        <SectionTitle 
          title="The Detailing Masters Difference" 
          subtitle="Why Choose Us" 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.title === "Premium Imported Products" ? ShieldCheck : feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="bg-luxury-bg border border-luxury-border w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:border-luxury-gold/50 transition-colors">
                  <Icon className="w-8 h-8 text-luxury-gold" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
