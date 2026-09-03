import { useEffect } from "react";
import { ShieldCheck, FileText, CheckCircle2, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms of Service | Detailing Masters Marthandam";
  }, []);

  return (
    <div className="min-h-screen bg-[#070707] text-gray-300 py-16 md:py-24 selection:bg-luxury-gold selection:text-black">
      <Container className="max-w-4xl">
        {/* Navigation Bar */}
        <div className="mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-luxury-gold hover:text-white transition-colors bg-luxury-gold/10 hover:bg-luxury-gold/20 px-4 py-2 rounded-full border border-luxury-gold/25"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Studio Home
          </a>
        </div>

        {/* Header */}
        <div className="border-b border-luxury-border/60 pb-8 mb-10">
          <div className="flex items-center gap-2 text-luxury-gold font-bold text-xs uppercase tracking-widest mb-3">
            <FileText className="w-4 h-4" />
            <span>Service Agreement & Studio Guidelines</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400">
            Effective Date: September 2026 • Detailing Masters Marthandam
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm leading-relaxed">
          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-luxury-gold" /> 1. Booking & Reservation Confirmation
            </h2>
            <p className="text-gray-300">
              Submitting a booking request via our website reserves a tentative slot. Our team contacts clients via WhatsApp or phone call to finalize vehicle arrival times and specific package details based on bay availability.
            </p>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-luxury-gold" /> 2. Vehicle Check-In & Pre-Inspection
            </h2>
            <p className="text-gray-300">
              Before commencing any wash, compounding, or coating service, our technicians perform a thorough joint inspection with the owner to document existing paint scratches, stone chips, dents, or pre-existing interior wear.
            </p>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-luxury-gold" /> 3. Transparent Quotations & Custom Treatments
            </h2>
            <p className="text-gray-300">
              Standard prices are listed for routine vehicle conditions. In cases of severe paint oxidation, heavy water spot etching, or deeply soiled interiors, any additional restoration charges will be explicitly quoted and agreed upon prior to starting work.
            </p>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-luxury-gold" /> 4. Warranty & After-Care Protocols
            </h2>
            <p className="text-gray-300">
              Ceramic Coating and Paint Protection Film (PPF) installations include formal warranty cards. To preserve warranty validity, vehicles must follow recommended maintenance wash practices and avoid harsh alkaline roadside bucket washes.
            </p>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-luxury-gold" /> 5. Complimentary Pickup & Drop Terms
            </h2>
            <p className="text-gray-300">
              Complimentary pickup and drop within a 15km radius is offered for all multi-day Ceramic Coating and PPF packages. Transit is carried out by licensed, verified studio drivers.
            </p>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-luxury-gold" /> 6. Studio Contact & Queries
            </h2>
            <div className="bg-black/50 border border-white/10 p-4 rounded-xl space-y-2 text-xs">
              <p className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4 text-luxury-gold" />
                <span>Detailing Masters, Opposite KTM Bike Showroom, Chankai, Marthandam, Tamil Nadu 629155</span>
              </p>
              <p className="flex items-center gap-2 text-white">
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span>+91 91119 77721 / +91 98948 34700</span>
              </p>
              <p className="flex items-center gap-2 text-white">
                <Mail className="w-4 h-4 text-luxury-gold" />
                <span>info@detailingmasters.com</span>
              </p>
            </div>
          </section>
        </div>

        {/* Footer Return CTA */}
        <div className="mt-12 text-center pt-8 border-t border-white/10">
          <a href="/">
            <Button variant="primary">
              Return to Detailing Masters Home
            </Button>
          </a>
        </div>
      </Container>
    </div>
  );
}
