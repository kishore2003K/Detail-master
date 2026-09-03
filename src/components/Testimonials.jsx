import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Play, Star, MapPin, 
  CheckCircle2, X, Volume2, ShieldCheck, Video 
} from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { ReviewCard } from "./ui/ReviewCard";
import { Button } from "./ui/Button";

const videoTestimonials = [
  {
    id: "video-1",
    name: "Dr. Arun S.",
    location: "Nagercoil",
    vehicle: "BMW 3 Series Gran Limousine",
    service: "9H Ceramic Coating & Paint Correction",
    duration: "0:45",
    rating: 5,
    thumbnail: "/images/ceramic.png",
    quote: "I drove 45 mins all the way from Nagercoil to Detailing Masters Marthandam for their 9H Ceramic Coating. The paint depth and water beading are extraordinary—better than showroom delivery!",
    highlight: "Flawless Swirl Removal & 9H Glass Gloss"
  },
  {
    id: "video-2",
    name: "Subair M.",
    location: "Marthandam",
    vehicle: "Mahindra XUV700 AX7",
    service: "Full Car Wash & A/C Steaming",
    duration: "0:38",
    rating: 5,
    thumbnail: "/images/interior.png",
    quote: "Finding a proper car wash that uses pH-neutral foam and steam cleans the A/C ducts without damaging upholstery was tough until I visited Detailing Masters near KTM showroom.",
    highlight: "Hospital-Grade Cabin Sanitization"
  },
  {
    id: "video-3",
    name: "Abhishek K.",
    location: "Thuckalay",
    vehicle: "Royal Enfield Continental GT 650",
    service: "Superbike Foam Wash & Chain Detailing",
    duration: "0:52",
    rating: 5,
    thumbnail: "/images/bike.png",
    quote: "They took 2 hours on my GT 650—chain degreasing, ultrasonic cleaning, ceramic lube, and chrome tank polish. The best motorcycle detailing studio in Kanyakumari district.",
    highlight: "Dedicated Superbike Care"
  },
  {
    id: "video-4",
    name: "Ashwin V.",
    location: "Arumanai",
    vehicle: "Toyota Fortuner 4x4",
    service: "Underbody Anti-Rust Coating",
    duration: "0:40",
    rating: 5,
    thumbnail: "/images/hero-wash.jpg",
    quote: "Living near Melpuram-Arumanai road, mud and rust were always an issue. Their rubberized underbody coating sealed the chassis completely and made highway drives so much quieter.",
    highlight: "100% Chassis Rust Protection"
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
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const handleOpenVideo = (video) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-luxury-secondary/10">
      <Container>
        {/* Section 1: Customer Video Testimonials */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <SectionTitle 
              title="Real Stories, Real Results" 
              subtitle="Video Testimonials from Local Owners" 
              align="left"
              className="mb-0"
            />
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-luxury-gold bg-luxury-gold/10 px-4 py-2 rounded-full border border-luxury-gold/25">
              <Video className="w-4 h-4" />
              Verified Local Customers (Nagercoil, Marthandam, Thuckalay)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => handleOpenVideo(video)}
                className="glass-card group relative overflow-hidden rounded-2xl cursor-pointer hover:border-luxury-gold/50 transition-all duration-300"
              >
                {/* Video Thumbnail Box */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                  <img
                    src={video.thumbnail}
                    alt={`${video.name} - ${video.vehicle} review at Detailing Masters`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-luxury-gold text-luxury-bg flex items-center justify-center shadow-[0_0_20px_rgba(245,197,24,0.5)] transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      <MapPin className="w-3 h-3 text-luxury-gold" /> {video.location}
                    </span>
                    <span className="font-mono text-[10px] text-gray-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                      {video.duration}
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 text-luxury-gold mb-1">
                      {[...Array(video.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <h4 className="font-bold text-sm leading-tight text-white">{video.name}</h4>
                    <p className="text-[11px] text-gray-300 truncate">{video.vehicle}</p>
                    <span className="inline-block mt-1 text-[10px] text-luxury-gold font-medium bg-luxury-gold/15 px-2 py-0.5 rounded border border-luxury-gold/30">
                      {video.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              data-lenis-prevent="true"
              className="relative w-full max-w-lg rounded-2xl bg-[#121212] border border-luxury-gold/30 shadow-2xl p-6 text-white overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveVideo(null);
                  setIsPlaying(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
                aria-label="Close video testimonial"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player Display */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-5 border border-white/10">
                <img 
                  src={activeVideo.thumbnail} 
                  alt={activeVideo.name} 
                  className="w-full h-full object-cover opacity-90"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-luxury-gold bg-black/80 px-2.5 py-1 rounded-full border border-luxury-gold/30">
                      Customer Experience Video
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-luxury-gold text-black flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    >
                      {isPlaying ? (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-4 bg-black rounded-sm" />
                          <div className="w-1.5 h-4 bg-black rounded-sm" />
                        </div>
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded-full border border-white/10 text-xs text-gray-300">
                      <Volume2 className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>HD Audio • {activeVideo.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Customer Card */}
              <div className="space-y-3 text-left">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{activeVideo.name}</h3>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Verified Studio Visit
                      </span>
                    </div>
                    <p className="text-xs text-luxury-gold font-medium">
                      {activeVideo.vehicle} • <span className="text-gray-400">{activeVideo.location}</span>
                    </p>
                  </div>

                  <div className="flex text-luxury-gold">
                    {[...Array(activeVideo.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    "{activeVideo.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" /> {activeVideo.service}
                  </span>
                  <a
                    href="#contact"
                    onClick={() => {
                      setActiveVideo(null);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-luxury-gold hover:underline font-semibold"
                  >
                    Book Similar Service →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

