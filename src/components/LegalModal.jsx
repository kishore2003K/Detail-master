import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from "lucide-react";

export default function LegalModal({ type, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          data-lenis-prevent="true"
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar rounded-2xl bg-[#121212] border border-luxury-gold/35 shadow-2xl p-6 md:p-8 text-white text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {type === "privacy" ? (
            /* Privacy Policy (DPDP Act, 2023 Compliant) */
            <div className="space-y-5 text-xs text-gray-300 leading-relaxed">
              <div className="flex items-center gap-2 text-luxury-gold font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>Privacy Policy • DPDP Act (India) Compliant</span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold font-heading text-white">
                Detailing Masters Privacy Policy
              </h2>
              <p className="text-[11px] text-gray-400">
                Last updated: September 2026 • Effective for Detailing Masters Marthandam
              </p>

              <div className="space-y-4 pt-2">
                <section className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> 1. Information We Collect
                  </h3>
                  <p>
                    When you schedule an appointment through our website reservation form or WhatsApp, we collect only necessary service details:
                  </p>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-gray-400">
                    <li>Full Name</li>
                    <li>Contact Mobile Number (for slot confirmation & updates)</li>
                    <li>Email Address (optional)</li>
                    <li>Vehicle Brand, Model & Type</li>
                    <li>Requested detailing services and custom notes</li>
                  </ul>
                </section>

                <section className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> 2. Purpose of Data Processing
                  </h3>
                  <p>
                    In accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, your data is strictly used for:
                  </p>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-gray-400">
                    <li>Booking and allocating detailing bays and technician slots</li>
                    <li>Sending booking receipts and service progress updates via SMS/WhatsApp</li>
                    <li>Providing accurate warranty tracking for Ceramic Coating & PPF installations</li>
                  </ul>
                </section>

                <section className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> 3. Data Protection & Zero Third-Party Sharing
                  </h3>
                  <p>
                    We <strong>never sell, rent, trade, or share</strong> your personal or vehicle data with third-party advertisers or data brokers. All customer records are stored securely with restricted access.
                  </p>
                </section>

                <section className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold" /> 4. Your Rights & Grievance Contact
                  </h3>
                  <p>
                    You have the right to request access to, correction of, or complete deletion of your booking records at any time. For privacy inquiries:
                  </p>
                  <p className="mt-2 text-luxury-gold font-mono">
                    Email: info@detailingmasters.com | Phone: +91 91119 77721<br />
                    Studio: Opposite KTM Bike Showroom, Chankai, Marthandam, TN 629155
                  </p>
                </section>
              </div>
            </div>
          ) : (
            /* Terms of Service */
            <div className="space-y-5 text-xs text-gray-300 leading-relaxed">
              <div className="flex items-center gap-2 text-luxury-gold font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>Terms of Service • Service Agreement</span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold font-heading text-white">
                Detailing Masters Terms of Service
              </h2>
              <p className="text-[11px] text-gray-400">
                Last updated: September 2026 • Detailing Masters Studio
              </p>

              <div className="space-y-4 pt-2">
                <section className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" /> 1. Booking & Slot Allocation
                  </h3>
                  <p>
                    Online reservations submit an appointment request. Final slot confirmation is communicated via WhatsApp or phone call depending on studio bay availability.
                  </p>
                </section>

                <section className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" /> 2. Vehicle Check-In & Pre-Inspection
                  </h3>
                  <p>
                    Prior to starting any detailing, paint correction, or coating service, our technicians conduct a joint digital inspection with the vehicle owner to document existing scratches, dents, or pre-existing paint defects.
                  </p>
                </section>

                <section className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" /> 3. Pricing & Transparent Quotations
                  </h3>
                  <p>
                    Base rates are listed for standard vehicle categories. Final pricing for heavily oxidized paint or specialized custom treatments is mutually agreed upon before commencement of work.
                  </p>
                </section>

                <section className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" /> 4. Pickup & Drop Service
                  </h3>
                  <p>
                    Complimentary pickup and drop within a 15km radius is provided for premium Ceramic Coating and PPF packages. Vehicles are driven by insured, verified studio personnel.
                  </p>
                </section>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-luxury-gold hover:bg-white text-black font-bold text-xs transition-colors cursor-pointer"
            >
              I Understand & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
