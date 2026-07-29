import { motion } from "framer-motion";
import { Calendar, Search, Sparkles, Key } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";

const steps = [
  {
    icon: Calendar,
    title: "Book",
    description: "Schedule your premium detailing service online or via phone."
  },
  {
    icon: Search,
    title: "Inspection",
    description: "Thorough vehicle assessment to determine the best treatment plan."
  },
  {
    icon: Sparkles,
    title: "Detailing",
    description: "Meticulous execution of our multi-stage detailing process."
  },
  {
    icon: Key,
    title: "Delivery",
    description: "Final walkthrough and vehicle handover in pristine condition."
  }
];

export default function Process() {
  return (
    <section className="py-24 relative">
      <Container>
        <SectionTitle 
          title="Our Premium Process" 
          subtitle="How It Works" 
        />
        
        <div className="relative mt-16">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-luxury-border">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-luxury-gold origin-left"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-luxury-card border-2 border-luxury-gold flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300">
                  <step.icon className="w-10 h-10 text-luxury-gold" />
                </div>
                
                <span className="text-luxury-gold text-sm font-bold uppercase tracking-widest mb-2">
                  Step 0{index + 1}
                </span>
                
                <h4 className="text-2xl font-bold text-white mb-3">{step.title}</h4>
                <p className="text-gray-400 text-sm max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
