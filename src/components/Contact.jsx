import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { trackBookingSubmit, trackCallClick, trackDirectionsClick } from "../utils/analytics";

const fallbackServices = [
  { id: "wash", service_name: "Premium Wash" },
  { id: "ceramic", service_name: "Ceramic Coating" },
  { id: "paint", service_name: "Paint Correction" },
  { id: "interior", service_name: "Interior Detailing" },
  { id: "engine", service_name: "Engine Bay Cleaning" },
  { id: "bike", service_name: "Bike Detailing" }
];

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [services, setServices] = useState(fallbackServices);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'https://detail-master-production.up.railway.app';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/services`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const activeServices = data.filter(s => s && s.is_active !== false);
            if (activeServices.length > 0) {
              setServices(activeServices);
            }
          }
        }
      } catch (err) {
        console.warn("Backend services unavailable, using fallback:", err);
      }
    };
    fetchServices();
  }, []);

  const handleWhatsAppFallback = (data, selectedServices) => {
    const serviceNames = selectedServices
      .map(id => services.find(s => s.id === id || s.service_name === id)?.service_name || id)
      .join(', ');

    const text = `*New Detailing Booking Request*\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📞 *Phone:* ${data.phone}\n` +
      `📧 *Email:* ${data.email || 'N/A'}\n` +
      `🚗 *Vehicle:* ${data.brand || ''} ${data.model || ''} (${data.type || 'Car'})\n` +
      `✨ *Service:* ${serviceNames || 'Detailing'}\n` +
      `📅 *Preferred Date:* ${data.date || 'Flexible'} (${data.time_period || 'Anytime'})\n` +
      `📝 *Notes:* ${data.message || 'None'}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919111977721?text=${encodedText}`, '_blank');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const selectedServices = Array.isArray(data.service) ? data.service : [data.service];

    try {
      const response = await fetch(`${API_URL}/api/web_bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.name,
          phone: data.phone,
          email: data.email,
          vehicle_brand: data.brand,
          vehicle_model: data.model,
          vehicle_type: data.type,
          service_id: selectedServices,
          preferred_date: data.date,
          preferred_time_period: data.time_period,
          additional_notes: data.message || ''
        })
      });

      if (response.ok) {
        trackBookingSubmit({
          service: selectedServices,
          vehicle_type: data.type,
          vehicle_brand: data.brand
        });
        alert("Thank you for your booking request! We will contact you shortly to confirm.");
        reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Backend service unavailable');
      }
    } catch (err) {
      console.warn("Backend booking API unreachable, switching to WhatsApp instant booking fallback:", err);
      trackBookingSubmit({
        service: selectedServices,
        vehicle_type: data.type,
        vehicle_brand: data.brand
      });
      alert("We've prepared your booking details directly on WhatsApp for instant confirmation. Redirecting now...");
      handleWhatsAppFallback(data, selectedServices);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-luxury-secondary/10 border-t border-luxury-border">
      <Container>
        <SectionTitle
          title="Reserve Your Spot"
          subtitle="Book Appointment"
        />

        <div className="grid lg:grid-cols-5 gap-12 mt-12">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 glass-card p-8 md:p-10 relative overflow-hidden group"
          >
            {/* Subtle glow effect on focus */}
            <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Booking Details</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phone", { required: true })}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    placeholder="Vehicle Brand (e.g. BMW)"
                    {...register("brand", { required: true })}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Vehicle Model (e.g. M4)"
                    {...register("model", { required: true })}
                  />
                </div>
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                  className={errors.email ? "border-red-500" : ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <select
                  className="flex h-12 w-full rounded-lg bg-luxury-secondary/50 border border-luxury-border px-4 py-2 text-sm text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold focus-visible:border-luxury-gold"
                  {...register("type", { required: true })}
                >
                  <option value="">Vehicle Type</option>
                  <option value="sedan">Sedan / Hatchback</option>
                  <option value="suv">SUV / Truck</option>
                  <option value="bike">Motorcycle</option>
                  <option value="luxury">Luxury / Exotic</option>
                </select>

                <Input
                  type="date"
                  {...register("date", { required: true })}
                  style={{ colorScheme: "dark" }}
                />

                <select
                  className="flex h-12 w-full rounded-lg bg-luxury-secondary/50 border border-luxury-border px-4 py-2 text-sm text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold focus-visible:border-luxury-gold"
                  {...register("time_period", { required: true })}
                >
                  <option value="">Select Time</option>
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                </select>
              </div>

              <div>
                <select
                  className="flex h-12 w-full rounded-lg bg-luxury-secondary/50 border border-luxury-border px-4 py-2 text-sm text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold focus-visible:border-luxury-gold"
                  {...register("service", { required: true })}
                >
                  <option value="">Select Service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.service_name}
                    </option>
                  ))}
                </select>
                {errors.service && <span className="text-red-500 text-xs mt-2 block">Please select a service.</span>}
              </div>

              <div>
                <Textarea
                  placeholder="Additional Notes or Specific Requests..."
                  {...register("message")}
                />
              </div>

              <Button type="submit" variant="primary" className="w-full h-14 text-lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Detailing Masters</h4>
                    <a 
                      href="https://maps.google.com/?cid=10630559981881673868" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={trackDirectionsClick}
                      className="text-gray-400 text-sm hover:text-luxury-gold transition-colors block"
                    >
                      Opposite KTM Bike Showroom,<br />Chankai, Marthandam,<br />Tamil Nadu 629155
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Call Us</h4>
                    <div className="flex flex-col gap-1 text-sm">
                      <a 
                        href="tel:9111977721" 
                        onClick={() => trackCallClick('contact_info')}
                        className="text-gray-400 hover:text-luxury-gold transition-colors"
                      >
                        +91 91119 77721
                      </a>
                      <a 
                        href="tel:9894834700" 
                        onClick={() => trackCallClick('contact_info')}
                        className="text-gray-400 hover:text-luxury-gold transition-colors"
                      >
                        +91 98948 34700
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Business Hours</h4>
                    <p className="text-gray-400 text-sm">Mon - Sat: 9:00 AM - 8:00 PM<br />Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass-card overflow-hidden h-[300px] p-2">
              <iframe
                title="Detailing Masters Google Maps Location in Marthandam"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.032954774763!2d77.23808897423896!3d8.29951919173554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0455004a6f7003%3A0x938740e61277488c!2sDetailing%20masters!5e0!3m2!1sen!2sin!4v1785078483595!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin">
              </iframe>
            </div>
          </motion.div>



        </div>
      </Container>
    </section>
  );
}
