import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";

const faqs = [
  {
    question: "How long does a premium ceramic coating take?",
    answer: "A proper ceramic coating installation typically takes 2-3 days. This includes a thorough wash, deep chemical decontamination, multi-stage paint correction to remove imperfections, and the precise application of the ceramic coating, followed by adequate curing time in our controlled environment."
  },
  {
    question: "What is paint correction and do I need it?",
    answer: "Paint correction is the process of machine polishing the clear coat to permanently remove swirl marks, light scratches, oxidation, and etching. If you want maximum gloss and a flawless finish, or if you are getting a ceramic coating, paint correction is essential."
  },
  {
    question: "Do you offer pickup and drop services?",
    answer: "Yes, we offer complimentary pickup and drop services within a 15km radius for all premium detailing and ceramic coating packages. We ensure your vehicle is handled with the utmost care during transit."
  },
  {
    question: "How often should I get my car detailed?",
    answer: "We recommend a comprehensive detail every 6 months to maintain the vehicle's aesthetic and resale value. For maintenance washes, every 2-4 weeks is ideal depending on how often the vehicle is driven and where it is parked."
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
