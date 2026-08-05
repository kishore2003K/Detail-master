import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'https://detail-master-production.up.railway.app';

  useEffect(() => {
    fetch(`${API_URL}/api/services`)
      .then(res => res.json())
      .then(data => {
        // filter out inactive if necessary, or just set all
        setServices(data.filter(s => s.is_active));
      })
      .catch(err => console.error("Error fetching services:", err));
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
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
          service_id: data.service,
          preferred_date: data.date,
          preferred_time_period: data.time_period,
          additional_notes: data.message
        })
      });
      
      if (response.ok) {
        alert("Thank you for your booking request! We will contact you shortly to confirm.");
        reset();
      } else {
        const errorData = await response.json();
        alert(`Failed to submit booking: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting booking request. Please try again later.");
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
          <div className="lg:col-span-3 glass-card p-8 md:p-10">
            <h3 className="text-2xl font-bold text-white mb-6">Booking Details</h3>
            
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Textarea 
                  placeholder="Additional Notes or Specific Requests..." 
                  {...register("message")}
                />
              </div>
              
              <Button type="submit" variant="primary" className="w-full h-14 text-lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </Button>
            </form>
          </div>
          
          {/* Contact Info & Map */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Our Studio</h4>
                    <p className="text-gray-400 text-sm">Opposite KTM Bike Showroom,<br />Chankai, Marthandam,<br />Tamil Nadu 629155</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Call Us</h4>
                    <p className="text-gray-400 text-sm">9111977721<br />9894834700</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Business Hours</h4>
                    <p className="text-gray-400 text-sm">Mon - Sat: 9:00 AM - 8:00 PM<br />Sunday: Leave</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="glass-card overflow-hidden h-[300px] p-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.032954774763!2d77.23808897423896!3d8.29951919173554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0455004a6f7003%3A0x938740e61277488c!2sDetailing%20masters!5e0!3m2!1sen!2sin!4v1785078483595!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.5rem' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin">
              </iframe>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 mt-6">
            <a 
              href="https://share.google/Karz2vMmzVsBdwtI7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 ease-out px-8 py-3.5 text-base flex-1 gap-2 bg-transparent border border-white/40 text-white hover:border-luxury-gold hover:text-luxury-gold backdrop-blur-sm"
            >
              📍 Locate Us on Maps
            </a>
            <a 
              href="https://share.google/Karz2vMmzVsBdwtI7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 ease-out px-8 py-3.5 text-base flex-1 gap-2 bg-luxury-gold text-luxury-bg hover:bg-[#FFE04A] shadow-[0_0_20px_rgba(245,197,24,0.35)] hover:shadow-[0_0_32px_rgba(245,197,24,0.5)]"
            >
              ⭐ Leave a Google Review
            </a>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
