import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Clock, Calendar, ChevronDown, Check, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { trackBookingSubmit, trackCallClick, trackDirectionsClick } from "../utils/analytics";

const fallbackServices = [
  { id: 1, service_name: "Premium Wash" },
  { id: 2, service_name: "Ceramic Coating" },
  { id: 3, service_name: "Paint Correction" },
  { id: 4, service_name: "Interior Detailing" },
  { id: 5, service_name: "Engine Bay Cleaning" },
  { id: 6, service_name: "Bike Detailing" }
];

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [services, setServices] = useState(fallbackServices);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'https://detail-master-production.up.railway.app';
  const todayDate = new Date().toISOString().split("T")[0];

  // Fetch backend services if available
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/services`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const activeServices = data
              .filter(s => s && s.is_active !== false)
              .map(s => ({
                id: Number(s.service_id || s.id),
                service_name: s.service_name || s.name
              }));

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
  }, [API_URL]);

  // Close service multi-select on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleService = (id) => {
    setServiceError(false);
    setSelectedServiceIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const removeService = (id, e) => {
    e.stopPropagation();
    setSelectedServiceIds(prev => prev.filter(item => item !== id));
  };

  const handleWhatsAppFallback = (data, selectedServices) => {
    const serviceNames = selectedServices
      .map(id => services.find(s => s.id === id)?.service_name || `Service #${id}`)
      .join(', ');

    const text = `*New Detailing Booking Request*\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📞 *Phone:* ${data.phone}\n` +
      `📧 *Email:* ${data.email || 'N/A'}\n` +
      `🚗 *Vehicle:* ${data.brand || ''} ${data.model || ''} (${data.type || 'Car'})\n` +
      `✨ *Services:* ${serviceNames || 'Detailing'}\n` +
      `📅 *Preferred Date:* ${data.date || 'Flexible'} (${data.time_period || 'Anytime'})\n` +
      `📝 *Notes:* ${data.message || 'None'}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919111977721?text=${encodedText}`, '_blank');
  };

  const onSubmit = async (data) => {
    if (selectedServiceIds.length === 0) {
      setServiceError(true);
      return;
    }

    setIsSubmitting(true);
    const serviceIds = selectedServiceIds.map(Number);
    const primaryServiceId = serviceIds[0] || 1;
    const selectedServiceNames = serviceIds
      .map(id => services.find(s => s.id === id)?.service_name || `Service #${id}`)
      .join(', ');

    const combinedNotes = serviceIds.length > 1
      ? `Selected Services: ${selectedServiceNames}${data.message ? `\nCustomer Notes: ${data.message}` : ''}`
      : (data.message || '');

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
          service_id: primaryServiceId,
          service_ids: serviceIds,
          services: serviceIds,
          preferred_date: data.date,
          preferred_time_period: data.time_period,
          additional_notes: combinedNotes
        })
      });

      if (response.ok) {
        trackBookingSubmit({
          service: serviceIds,
          vehicle_type: data.type,
          vehicle_brand: data.brand
        });
        alert("Thank you for your booking request! We will contact you shortly to confirm.");
        reset();
        setSelectedServiceIds([]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Backend service unavailable');
      }
    } catch (err) {
      console.warn("Backend booking API unreachable, switching to WhatsApp instant booking fallback:", err);
      trackBookingSubmit({
        service: serviceIds,
        vehicle_type: data.type,
        vehicle_brand: data.brand
      });
      alert("We've prepared your booking details directly on WhatsApp for instant confirmation. Redirecting now...");
      handleWhatsAppFallback(data, serviceIds);
      reset();
      setSelectedServiceIds([]);
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
            <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-2xl font-bold text-white">Booking Details</h3>
              <span className="text-xs text-luxury-gold uppercase tracking-wider font-semibold bg-luxury-gold/10 px-3 py-1 rounded-full border border-luxury-gold/20">
                Online Reservation
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    {...register("name", { required: true })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1 block">Name is required</span>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Phone Number *</label>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    {...register("phone", { required: true })}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1 block">Phone number is required</span>}
                </div>
              </div>

              {/* Vehicle Brand & Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Vehicle Brand *</label>
                  <Input
                    placeholder="e.g. BMW, Hyundai, Royal Enfield"
                    {...register("brand", { required: true })}
                    className={errors.brand ? "border-red-500" : ""}
                  />
                  {errors.brand && <span className="text-red-500 text-xs mt-1 block">Brand is required</span>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Vehicle Model *</label>
                  <Input
                    placeholder="e.g. M4, Creta, GT 650"
                    {...register("model", { required: true })}
                    className={errors.model ? "border-red-500" : ""}
                  />
                  {errors.model && <span className="text-red-500 text-xs mt-1 block">Model is required</span>}
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">Email Address *</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: true })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">Valid email is required</span>}
              </div>

              {/* Vehicle Type, Date & Time Period */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Vehicle Type *</label>
                  <select
                    className="flex h-12 w-full rounded-lg bg-luxury-secondary/50 border border-luxury-border px-4 py-2 text-sm text-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold focus-visible:border-luxury-gold"
                    {...register("type", { required: true })}
                  >
                    <option value="" className="bg-[#111] text-gray-400">Select Type</option>
                    <option value="sedan" className="bg-[#111]">Sedan / Hatchback</option>
                    <option value="suv" className="bg-[#111]">SUV / Compact SUV</option>
                    <option value="bike" className="bg-[#111]">Motorcycle / Superbike</option>
                    <option value="luxury" className="bg-[#111]">Luxury / Exotic Car</option>
                  </select>
                  {errors.type && <span className="text-red-500 text-xs mt-1 block">Select vehicle type</span>}
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-luxury-gold" /> Preferred Date *
                  </label>
                  <Input
                    type="date"
                    min={todayDate}
                    {...register("date", { required: true })}
                    className={`text-gray-200 ${errors.date ? "border-red-500" : ""}`}
                    style={{ colorScheme: "dark" }}
                  />
                  {errors.date && <span className="text-red-500 text-xs mt-1 block">Select a date</span>}
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-luxury-gold" /> Preferred Time *
                  </label>
                  <select
                    className="flex h-12 w-full rounded-lg bg-luxury-secondary/50 border border-luxury-border px-4 py-2 text-sm text-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold focus-visible:border-luxury-gold"
                    {...register("time_period", { required: true })}
                  >
                    <option value="" className="bg-[#111] text-gray-400">Select Time</option>
                    <option value="Morning (9 AM - 12 PM)" className="bg-[#111]">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)" className="bg-[#111]">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 8 PM)" className="bg-[#111]">Evening (4 PM - 8 PM)</option>
                  </select>
                  {errors.time_period && <span className="text-red-500 text-xs mt-1 block">Select a time slot</span>}
                </div>
              </div>

              {/* Multiple Service Selection Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <label className="text-xs text-gray-400 font-medium mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-luxury-gold" /> Select Services (Multiple Selection) *
                  </span>
                  {selectedServiceIds.length > 0 && (
                    <span className="text-luxury-gold text-[11px] font-semibold">
                      {selectedServiceIds.length} service{selectedServiceIds.length > 1 ? "s" : ""} selected
                    </span>
                  )}
                </label>

                {/* Dropdown Trigger Box */}
                <div
                  onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                  className={`min-h-[48px] w-full rounded-lg bg-luxury-secondary/50 border ${
                    serviceError ? "border-red-500" : isServiceDropdownOpen ? "border-luxury-gold ring-1 ring-luxury-gold" : "border-luxury-border"
                  } px-3 py-2 text-sm cursor-pointer flex items-center justify-between transition-all select-none`}
                >
                  <div className="flex flex-wrap gap-1.5 items-center flex-1 mr-2">
                    {selectedServiceIds.length === 0 ? (
                      <span className="text-gray-500">Choose one or multiple detailing services...</span>
                    ) : (
                      selectedServiceIds.map(id => {
                        const serviceObj = services.find(s => s.id === id);
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30"
                          >
                            {serviceObj?.service_name || `Service #${id}`}
                            <button
                              type="button"
                              onClick={(e) => removeService(id, e)}
                              className="hover:text-white hover:bg-luxury-gold/30 rounded-full p-0.5 transition-colors"
                              aria-label="Remove service"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-luxury-gold shrink-0 transition-transform duration-200 ${
                      isServiceDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {serviceError && (
                  <span className="text-red-500 text-xs mt-1 block">Please select at least one service.</span>
                )}

                {/* Dropdown Options Menu */}
                <AnimatePresence>
                  {isServiceDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 mt-2 w-full rounded-xl bg-[#111111]/98 backdrop-blur-xl border border-luxury-border shadow-2xl p-2 max-h-60 overflow-y-auto"
                    >
                      <div className="text-[11px] font-semibold text-gray-400 px-3 py-1.5 uppercase tracking-wider border-b border-luxury-border/40 mb-1">
                        Click to Select / Deselect Services
                      </div>
                      <div className="space-y-1">
                        {services.map(service => {
                          const isSelected = selectedServiceIds.includes(service.id);
                          return (
                            <div
                              key={service.id}
                              onClick={() => toggleService(service.id)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm ${
                                isSelected
                                  ? "bg-luxury-gold/15 text-white font-semibold border border-luxury-gold/30"
                                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                                    isSelected
                                      ? "bg-luxury-gold border-luxury-gold text-luxury-bg"
                                      : "border-gray-600 bg-transparent"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span>{service.service_name}</span>
                              </div>
                              {isSelected && (
                                <span className="text-xs text-luxury-gold font-medium">Selected</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">Additional Notes or Custom Requests</label>
                <Textarea
                  placeholder="Mention any specific scratches, deep stains, or custom detailing requirements..."
                  {...register("message")}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" className="w-full h-14 text-lg font-bold tracking-wide" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Booking Request..." : "Submit Booking Request"}
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
