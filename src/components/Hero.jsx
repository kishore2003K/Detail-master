import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { LogoMark } from "./ui/LogoMark";
import logo1 from "../assets/logo1.svg";

const slides = [
  {
    src: "/images/hero-wash.jpg",
    label: "Precision Wash",
  },
  {
    src: "/images/ceramic.png",
    label: "Ceramic Protection",
  },
  {
    src: "/images/wash.png",
    label: "Studio Detailing",
  },
  {
    src: "/images/hero-main.jpg",
    label: "Showroom Finish",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end md:items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slides[index].src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${slides[index].src}")` }}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6.5, ease: "easeOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-luxury-bg/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(245,197,24,0.12),transparent_55%)]" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        animate={{ x: ["-40%", "160%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
      />

      <Container className="relative z-10 w-full pb-24 pt-32 md:py-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <LogoMark variant="none" size="lg" imgClassName="h-32 md:h-48 lg:h-56" className="mb-8" logoSrc={logo1} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5"
          >
            Detailing{" "}
            <span className="text-gradient-gold">Masters</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-base md:text-lg text-gray-300 mb-9 max-w-lg leading-relaxed"
          >
            Ceramic coating, paint protection, and interior restoration — crafted for cars that deserve perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              variant="primary"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Services
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex items-center gap-3"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show ${slide.label}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-10 bg-luxury-gold"
                    : "w-5 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
            <span className="ml-2 text-xs tracking-widest uppercase text-gray-400">
              {slides[index].label}
            </span>
          </motion.div>
        </div>
      </Container>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-luxury-gold to-transparent" />
      </motion.div>
    </section>
  );
}
