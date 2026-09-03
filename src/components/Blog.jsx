import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, X, Sparkles, BookOpen, MapPin, CheckCircle2 } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { Button } from "./ui/Button";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const articles = [
  {
    id: "ceramic-coating-coastal-kanyakumari",
    title: "Why Ceramic Coating is Essential for Coastal Cars in Kanyakumari",
    tag: "Ceramic Coating",
    category: "Paint Protection",
    readTime: "4 min read",
    date: "Aug 2026",
    location: "Kanyakumari & Marthandam",
    excerpt: "Living near the coast means salt-laden winds, intense humidity, and strong tropical sun accelerate clear coat oxidation and paint fading.",
    image: "/images/ceramic.png",
    content: {
      introduction: "Vehicles in coastal districts like Kanyakumari, Colachel, and neighboring Marthandam face harsh environmental elements daily. The combination of sea salt aerosols, high relative humidity, and intense UV rays creates the perfect storm for paint degradation, water spot etching, and clear coat failure.",
      keyPoints: [
        {
          heading: "1. The Threat of Salt Air Corrosion",
          text: "Microscopic salt particles carried by coastal breezes settle onto vehicle paint. When combined with morning dew, they create a weak saline solution that chemically etches into microscopic clear coat pores, causing dullness and premature rust."
        },
        {
          heading: "2. How 9H Nano-Ceramic Solves This",
          text: "Ceramic coatings form a semi-permanent molecular chemical bond with the factory clear coat. The resulting 9H hard layer seals all microscopic paint pores with a slick, non-porous glass shield that prevents salt crystals, bird lime, and acidic rain from contacting the base paint."
        },
        {
          heading: "3. Extreme Hydrophobic Water-Beading",
          text: "A genuine ceramic coating creates contact angles exceeding 110°, making water and coastal grime bead up and slide off effortlessly during driving or a light rinse."
        },
        {
          heading: "4. Long-Term Resale Value Protection",
          text: "Maintaining factory paint depth and gloss preserves thousands of rupees in vehicle resale value compared to faded, oxidized coastal cars."
        }
      ],
      recommendation: "For coastal vehicles, we recommend a 9H multi-layer Ceramic or Graphene Coating with an annual inspection to ensure optimal hydrophobic performance."
    }
  },
  {
    id: "monsoon-car-care-marthandam",
    title: "Monsoon Car Care Tips for Marthandam & Arumanai Drivers",
    tag: "Seasonal Guide",
    category: "Vehicle Maintenance",
    readTime: "5 min read",
    date: "Sep 2026",
    location: "Marthandam & Arumanai",
    excerpt: "Heavy South-Indian monsoons bring mud splatter, waterlogged roads, and damp cabin mildew. Here is how to keep your vehicle protected.",
    image: "/images/wash.png",
    content: {
      introduction: "The monsoon season in Kanyakumari district brings heavy downpours that test every vehicle component. From rainwater acidity to slush accumulation in wheel wells and moisture trapped in car carpets, proactive care prevents costly repair bills.",
      keyPoints: [
        {
          heading: "1. Clean the Undercarriage Frequently",
          text: "Road slurry contains fine grit and acidic rainwater that sticks to chassis brackets and brake lines. A weekly high-pressure underbody rinse prevents mud hardening and chassis corrosion."
        },
        {
          heading: "2. Never Wipe a Wet, Muddy Car with a Dry Cloth",
          text: "Wiping rainwater off your car with a regular cloth grinds trapped road grit into your clear coat, creating thousands of micro-scratches. Always use a two-bucket pH-neutral snow foam wash."
        },
        {
          heading: "3. Apply Windshield Rain Repellent",
          text: "Hydrophobic glass coatings allow rainwater to roll off windshields at speeds above 40 km/h, dramatically improving nighttime visibility during heavy downpours."
        },
        {
          heading: "4. Prevent Cabin Dampness & AC Mildew",
          text: "High humidity during monsoons leads to fungal odors in air conditioning ducts. High-temperature steam cleaning of A/C vents eliminates spores and sterilizes cabin air."
        }
      ],
      recommendation: "Schedule a comprehensive monsoon prep wash with glass water-repellent coating and A/C steam sanitation before the peak rains hit."
    }
  },
  {
    id: "underbody-anti-rust-kanyakumari",
    title: "Underbody Anti-Rust Coating: Protecting Your Chassis from Humidity",
    tag: "Chassis Protection",
    category: "Rust Prevention",
    readTime: "4 min read",
    date: "Sep 2026",
    location: "Marthandam & Kuzhithurai",
    excerpt: "Why undercarriage corrosion is the silent killer of vehicles in South Tamil Nadu and how a rubberized bitumen barrier prevents structural rust.",
    image: "/images/paint.png",
    content: {
      introduction: "While most car owners meticulously clean visible body paint, the underbody remains out of sight and exposed to flying gravel, mud, stagnant puddle water, and humid road salt.",
      keyPoints: [
        {
          heading: "1. Why Factory E-Coating Isn't Always Enough",
          text: "While modern cars have factory electro-coated chassis, flying road gravel and speed breakers chip away this thin layer, exposing bare metal to moisture and corrosive mud."
        },
        {
          heading: "2. The Rubberized Bitumen Advantage",
          text: "Our heavy-duty rubberized bitumen coating forms a thick, elastic protective armor that absorbs stone impacts without cracking and seals all metal joints against moisture."
        },
        {
          heading: "3. Cabin Noise Dampening (NVH Reduction)",
          text: "In addition to rust prevention, the thick rubberized layer dampens tire hum and road vibration, making your highway drive noticeably quieter."
        },
        {
          heading: "4. Silencer High-Heat Zinc Coating",
          text: "Exhaust silencers operate at extreme temperatures and corrode rapidly from moisture. Applying a specialized 600°C heat-resistant zinc coating prevents premature exhaust rusting."
        }
      ],
      recommendation: "Every new and pre-owned vehicle in Kanyakumari district should receive a professional underbody anti-rust application before the onset of heavy rains."
    }
  },
  {
    id: "car-water-wash-vs-foam-detailing",
    title: "Car Water Wash vs. Multi-Stage Foam Detailing: What Your Car Truly Needs",
    tag: "Detailing Education",
    category: "Wash Techniques",
    readTime: "3 min read",
    date: "Aug 2026",
    location: "Marthandam",
    excerpt: "Why roadside bucket washes create permanent swirl marks, and how professional pH-neutral foam washing protects your clear coat.",
    image: "/images/hero-wash.jpg",
    content: {
      introduction: "Many car owners believe all car washes are equal. However, standard roadside service stations often use harsh borewell water, alkaline detergents, and dirty sponges that inflict severe swirl marks and paint holograms on your car.",
      keyPoints: [
        {
          heading: "1. The Danger of Roadside Bucket Washes",
          text: "When a detailer dips a cloth into a single bucket repeatedly, dirt particles from the bottom are rubbed back into your paint under pressure, acting like sandpaper on your clear coat."
        },
        {
          heading: "2. Touchless Snow Foam Pre-Soak",
          text: "Professional detailing starts with thick pH-neutral snow foam that encapsulates dirt and pulls it down the bodywork safely before any mitt ever touches the car."
        },
        {
          heading: "3. Two-Bucket Method with Grit Guards",
          text: "We utilize dedicated wash and rinse buckets equipped with sediment trap grit guards, ensuring the wash mitt is 100% clean every single pass."
        },
        {
          heading: "4. Warm Filtered Air Blower Drying",
          text: "Instead of dragging regular towels that risk marring, we dry crevices, mirrors, and badges using high-velocity warm filtered air blowers."
        }
      ],
      recommendation: "Treat your vehicle to a scratch-safe multi-stage wash every 2 to 4 weeks to keep the gloss mirror-sharp and swirl-free."
    }
  }
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const scrollTo = useSmoothScroll();

  return (
    <section id="blog" className="py-24 relative bg-[#070707] border-t border-luxury-border">
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-14">
          <SectionTitle
            title="Local Car & Bike Care Hub"
            subtitle="Marthandam & Kanyakumari Expert Guides"
            align="left"
            className="mb-0"
          />
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-luxury-gold bg-luxury-gold/10 px-4 py-2 rounded-full border border-luxury-gold/25">
            <BookOpen className="w-4 h-4" />
            Expert Automotive Detailing Guides
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="glass-card group flex flex-col justify-between overflow-hidden rounded-2xl hover:border-luxury-gold/40 transition-all duration-300"
            >
              <div>
                {/* Article Image */}
                <div className="relative h-44 w-full overflow-hidden bg-luxury-secondary">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-card via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold text-luxury-gold bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-luxury-gold/30">
                    {article.tag}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-luxury-gold" /> {article.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-luxury-gold" /> {article.location}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-luxury-gold transition-colors leading-snug mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 mt-auto">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-luxury-gold hover:text-black text-luxury-gold text-xs font-semibold flex items-center justify-center gap-2 border border-luxury-gold/20 hover:border-luxury-gold transition-all cursor-pointer"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>

      {/* Interactive Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              data-lenis-prevent="true"
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar rounded-2xl bg-[#111111] border border-luxury-gold/35 shadow-2xl p-6 md:p-8 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-luxury-gold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedArticle.category} • {selectedArticle.location}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-white leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-gray-400 pb-4 border-b border-white/10 mb-6">
                <span>By Detailing Masters Studio Team</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
                <p className="text-base text-gray-200 font-medium">
                  {selectedArticle.content.introduction}
                </p>

                <div className="space-y-4">
                  {selectedArticle.content.keyPoints.map((point, i) => (
                    <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-xl">
                      <h4 className="font-bold text-white text-sm mb-1.5 text-luxury-gold">
                        {point.heading}
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-luxury-gold/10 border border-luxury-gold/30 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white text-xs mb-1">Master Recommendation</h5>
                    <p className="text-xs text-gray-300">{selectedArticle.content.recommendation}</p>
                  </div>
                </div>

                {/* Call to Action Inside Article */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <div>
                    <p className="font-bold text-white text-xs">Ready to protect your vehicle?</p>
                    <p className="text-[11px] text-gray-400">Book your slot at our Marthandam studio today.</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedArticle(null);
                      scrollTo("contact");
                    }}
                  >
                    Reserve Appointment
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
