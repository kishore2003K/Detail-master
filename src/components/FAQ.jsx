import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";

const faqs = [
  {
    question: "What is included in your Car Wash and Car Water Wash in Marthandam?",
    answer: "Our premium car wash goes far beyond an ordinary water wash. We perform a pH-neutral high-density snow foam pre-soak, undercarriage high-pressure wash, scratch-safe two-bucket contact wash, deep alloy wheel de-ironing, interior vacuuming, dashboard sanitization, and streak-free warm blower drying to prevent swirl marks."
  },
  {
    question: "Why do I need Underbody Anti-Rust Coating for my car?",
    answer: "In coastal and humid regions like Kanyakumari, Marthandam, and Arumanai, road moisture, mud, and humidity lead to severe chassis rust. Our rubberized bitumen underbody coating creates an impenetrable barrier against moisture, prevents rust, reduces cabin road noise, and protects against flying gravel damage."
  },
  {
    question: "What is the difference between Wax Coating and Ceramic Coating?",
    answer: "Wax coating provides a warm, deep mirror gloss and hydrophobic paint protection that lasts 2 to 3 months—perfect for budget-friendly regular upkeep. Ceramic coating forms a permanent 9H chemical nano-bond that lasts 3 to 5 years, providing extreme scratch resistance, UV protection, chemical defense, and intense showroom shine."
  },
  {
    question: "Where is Detailing Masters located?",
    answer: "Detailing Masters is located opposite the KTM Bike Showroom, Chankai, Marthandam (Unnamalaikadai, Tamil Nadu 629155). We are easily accessible from Melpuram-Arumanai Road, Kuzhithurai, and Nagercoil."
  },
  {
    question: "Do you offer Bike Wash & Motorcycle Ceramic Coating?",
    answer: "Yes! We offer specialized foam bike washes, engine degreasing, chain cleaning & lubrication, chrome polishing, and dedicated multi-layer ceramic coatings for all sports bikes, cruisers, and commuter motorcycles."
  },
  {
    question: "How long does a premium ceramic coating take?",
    answer: "A proper ceramic coating installation typically takes 2-3 days. This includes a thorough wash, deep chemical decontamination, multi-stage paint correction to remove imperfections, and the precise application of the ceramic coating, followed by adequate curing time in our controlled environment."
  },
  {
    question: "Do you offer pickup and drop services?",
    answer: "Yes, we offer complimentary pickup and drop services within a 15km radius for all premium detailing and ceramic coating packages. We ensure your vehicle is handled with the utmost care during transit."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 border-t border-luxury-border">
      <Container className="max-w-4xl">
        <SectionTitle 
          title="Frequently Asked Questions" 
          subtitle="Clear Answers" 
        />
        
        <div className="space-y-4 mt-12">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
              >
                <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-luxury-gold' : 'text-white'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-luxury-gold transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-gray-400 leading-relaxed border-t border-luxury-border pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
