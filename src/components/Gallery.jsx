import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { GalleryCard } from "./ui/GalleryCard";
import { Button } from "./ui/Button";

const categories = ["All", "Cars", "SUV", "Bike", "Ceramic", "Interior"];

const galleryImages = [
  { 
    id: 1, 
    category: "Cars", 
    title: "Premium Wash", 
    image: "/images/wash.png",
    alt: "Premium Car Wash and Foam Cleaning at Detailing Masters Marthandam"
  },
  { 
    id: 2, 
    category: "SUV", 
    title: "Ceramic Coating", 
    image: "/images/ceramic.png",
    alt: "SUV 9H Ceramic Coating Protection at Detailing Masters Marthandam"
  },
  { 
    id: 3, 
    category: "Ceramic", 
    title: "Paint Correction", 
    image: "/images/Paint Correction-1.jpg",
    alt: "Multi-stage Paint Correction and Scratch Removal in Marthandam"
  },
  { 
    id: 4, 
    category: "Interior", 
    title: "Interior Detailing", 
    image: "/images/interior.png",
    alt: "Deep Interior Car Detailing and Steam Cleaning Marthandam"
  },
  { 
    id: 5, 
    category: "Bike", 
    title: "Ducati Panigale", 
    image: "/images/bike-detailing-2.jpg",
    alt: "Superbike Detailing and Ceramic Coating on Ducati Panigale"
  },
  { 
    id: 6, 
    category: "Cars", 
    title: "Engine Bay", 
    image: "/images/engine.png",
    alt: "Complete Engine Bay Degreasing and Detailing Marthandam"
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = galleryImages.filter(img =>
    activeCategory === "All" || img.category === activeCategory
  );

  return (
    <section id="gallery" className="py-24 border-y border-luxury-border">
      <Container>
        <SectionTitle
          title="Before & After"
          subtitle="Our Masterpieces"
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                  ? "bg-luxury-gold text-luxury-bg shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "bg-luxury-card text-gray-400 hover:text-white border border-luxury-border hover:border-luxury-gold/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <GalleryCard key={img.id} {...img} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <Button variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Book a Service</Button>
        </div>
      </Container>
    </section>
  );
}
