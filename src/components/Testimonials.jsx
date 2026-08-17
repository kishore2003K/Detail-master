import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { ReviewCard } from "./ui/ReviewCard";
import { Button } from "./ui/Button";

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
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <SectionTitle 
            title="What Our Clients Say" 
            subtitle="Google Reviews" 
            align="left"
            className="mb-0"
          />
          
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-luxury-border flex items-center justify-center text-white hover:bg-luxury-gold hover:text-luxury-bg hover:border-luxury-gold transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-luxury-border flex items-center justify-center text-white hover:bg-luxury-gold hover:text-luxury-bg hover:border-luxury-gold transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-4" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {reviews.map((review, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="bg-luxury-gold text-luxury-bg hover:bg-white transition-colors"
            onClick={() => window.open("https://www.google.com/maps/place/Dirt+Buster's+Diesel+%26+Automotive+Detailing+industry/@32.6031662,-82.3413047,17z/data=!3m1!4b1!4m6!3m5!1s0x88f0a5ab53c918ad:0x6acfd66315b9557!8m2!3d32.6031662!4d-82.3413047!16s%2Fg%2F11h1dgbld7", '_blank')}
          >
            Leave a Review on Google <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            variant="ghost" 
            className="border border-luxury-border hover:bg-white/5" 
            onClick={() => window.open("https://www.google.com/search?q=Detailing+masters", '_blank')}
          >
            Read All Reviews <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
