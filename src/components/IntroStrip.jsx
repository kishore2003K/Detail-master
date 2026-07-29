import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { Container } from "./ui/Container";

const highlights = [
  {
    icon: ShieldCheck,
    label: "Certified Detailing",
    detail: "Master-trained specialists",
  },
  {
    icon: Sparkles,
    label: "Premium Products",
    detail: "Imported coatings & care",
  },
  {
    icon: Clock,
    label: "Same-Day Slots",
    detail: "Flexible booking windows",
  },
  {
    icon: MapPin,
    label: "Marthandam Studio",
    detail: "Chankai, Tamil Nadu",
  },
];

export default function IntroStrip() {
  return (
    <section className="relative z-20 -mt-10 md:-mt-14 pb-4">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-luxury-border bg-luxury-card shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <div className="h-1 w-full bg-gradient-to-r from-luxury-gold-dim via-luxury-gold to-luxury-gold-dim" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-luxury-border">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index, duration: 0.4 }}
                  className="flex items-start gap-4 px-6 py-7 md:px-8"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-luxury-gold/10 border border-luxury-gold/25 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="font-heading text-white text-lg leading-tight mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-400">{item.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
