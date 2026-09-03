import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Play, MapPin, 
  ExternalLink, Sparkles
} from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { ReviewCard } from "./ui/ReviewCard";
import { Button } from "./ui/Button";

const INSTAGRAM_URL = "https://www.instagram.com/detailingmasters_offical";

// Instagram Icon Component
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const instagramReels = [
  {
    id: "reel-1",
    title: "9H Ceramic Coating & Mirror Gloss",
    vehicle: "BMW 3 Series Gran Limousine",
    location: "Marthandam Studio",
    tag: "#CeramicCoating #Marthandam",
    duration: "Reel",
    thumbnail: "/images/ceramic.png",
    highlight: "Extreme Hydrophobic & 9H Glass Gloss"
  },
  {
    id: "reel-2",
    title: "Snow Foam Wash & Decontamination",
    vehicle: "Mahindra XUV700 AX7",
    location: "Opposite KTM Showroom",
    tag: "#CarWash #SnowFoam",
    duration: "Reel",
    thumbnail: "/images/hero-wash.jpg",
    highlight: "100% Swirl-Free Contact Wash"
  },
  {
    id: "reel-3",
    title: "Superbike Deep Foam Wash & Chain Care",
    vehicle: "Continental GT 650 & Superbikes",
    location: "Chankai, Marthandam",
    tag: "#BikeDetailing #Superbike",
    duration: "Reel",
    thumbnail: "/images/bike.png",
    highlight: "Ultrasonic Degrease & Chrome Polish"
  },
  {
    id: "reel-4",
    title: "Interior Steam Spa & Sanitization",
    vehicle: "Toyota Fortuner 4x4",
    location: "Marthandam Studio",
    tag: "#InteriorDetailing #DeepClean",
    duration: "Reel",
    thumbnail: "/images/interior.png",
    highlight: "Hospital-Grade A/C Sanitization"
  }
];

const reviews = [
  {
    name: "ABHI",
    vehicle: "Bike Detailing",
    rating: 5,
    text: "I washed my bike here today and had a great experience. The staff are polite and professional, and the place is well maintained neat, clean, and organised. Their basic foam wash costs ₹250, and the service quality is excellent."
  },
  {
    name: "subair",
    vehicle: "Full Car Wash & Interior",
    rating: 5,
    text: "I recently visited Detailing Masters for a full car wash and interior cleaning, and I'm extremely impressed with the results. They paid great attention to detail, leaving the interior spotless and the exterior with a perfect shine."
  },
  {
    name: "Dr.Arun",
    vehicle: "Ceramic Coating",
    rating: 5,
    text: "Marthandam's finest car detailing and spa. Excellent work by Mr. Ajin and team. Detailing studio where quality meets satisfaction."
  },
  {
    name: "Ashwin",
    vehicle: "General Wash",
    rating: 5,
    text: "One of the best car wash experiences in the district! I had to drive 40 kms for a good wash and it was completely worth it."
  }
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-luxury-secondary/10">
      <Container>
        {/* Section 1: Official Instagram Reels Showcase */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <SectionTitle 
              title="Daily Studio Transformations" 
              subtitle="Watch Our Latest Instagram Reels" 
              align="left"
              className="mb-0"
            />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#833ab4]/80 via-[#fd1d1d]/80 to-[#fcb045]/80 hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] px-4 py-2.5 rounded-full border border-white/20 shadow-[0_0_20px_rgba(253,29,29,0.3)] transition-all transform hover:scale-105 group"
            >
              <InstagramIcon className="w-4 h-4 text-white" />
              <span>@detailingmasters_offical</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramReels.map((reel, index) => (
              <motion.a
                key={reel.id}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="glass-card group relative overflow-hidden rounded-2xl cursor-pointer hover:border-luxury-gold/60 transition-all duration-300 block"
              >
                {/* Reel Thumbnail Box */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                  <img
                    src={reel.thumbnail}
                    alt={`${reel.title} - Detailing Masters Instagram Reel`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] z-10">
                    <span className="flex items-center gap-1 font-semibold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-sm">
                      <MapPin className="w-3 h-3 text-luxury-gold" /> {reel.location}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-white bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
                      <InstagramIcon className="w-2.5 h-2.5" /> Reel
                    </span>
                  </div>

                  {/* Center Play / Watch Reel Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-luxury-gold text-luxury-bg flex items-center justify-center shadow-[0_0_25px_rgba(245,197,24,0.6)] transform group-hover:scale-115 group-hover:bg-white transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5 text-luxury-bg" />
                    </div>
                  </div>

                  {/* Bottom Reel Details */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <span className="text-[10px] text-luxury-gold font-mono tracking-wider block mb-1">
                      {reel.tag}
                    </span>
                    <h4 className="font-bold text-sm leading-snug text-white group-hover:text-luxury-gold transition-colors">
                      {reel.title}
                    </h4>
                    <p className="text-[11px] text-gray-300 truncate mt-0.5">
                      {reel.vehicle}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-block text-[10px] text-luxury-gold font-medium bg-luxury-gold/15 px-2 py-0.5 rounded border border-luxury-gold/30">
                        {reel.highlight}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-white/90 font-medium group-hover:text-luxury-gold transition-colors">
                        Watch <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Follow Call to Action Bar */}
          <div className="mt-8 bg-gradient-to-r from-luxury-secondary/60 via-black to-luxury-secondary/60 border border-luxury-border/60 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shrink-0 shadow-md">
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Want to see real-time customer deliveries & detailing stories?
                </p>
                <p className="text-xs text-gray-400">
                  Follow <span className="text-luxury-gold font-medium">@detailingmasters_offical</span> for new reels posted every week!
                </p>
              </div>
            </div>

            <Button
              className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shrink-0 shadow-lg"
              onClick={() => window.open(INSTAGRAM_URL, '_blank')}
            >
              <InstagramIcon className="w-4 h-4 mr-2" /> Follow on Instagram
            </Button>
          </div>
        </div>

        {/* Section 2: Google Reviews Carousel */}
        <div className="pt-12 border-t border-luxury-border/60">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <SectionTitle 
              title="Verified Google Reviews" 
              subtitle="4.8 Star Customer Trust" 
              align="left"
              className="mb-0"
            />
            
            <div className="flex items-center gap-4">
              <button 
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-luxury-border flex items-center justify-center text-white hover:bg-luxury-gold hover:text-luxury-bg hover:border-luxury-gold transition-all cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-luxury-border flex items-center justify-center text-white hover:bg-luxury-gold hover:text-luxury-bg hover:border-luxury-gold transition-all cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden -mx-4" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {reviews.map((review, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-4">
                  <ReviewCard {...review} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-luxury-gold text-luxury-bg hover:bg-white transition-colors"
              onClick={() => window.open("https://www.google.com/search?q=Detailing+masters#lrd=0x3b0455004a6f7003:0x938740e61277488c,3,,,,", '_blank')}
            >
              Leave a Review on Google <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="ghost" 
              className="border border-luxury-border hover:bg-white/5" 
              onClick={() => window.open("https://www.google.com/search?q=Detailing+masters#lrd=0x3b0455004a6f7003:0x938740e61277488c,1,,,,", '_blank')}
            >
              Read All Reviews on Maps <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

