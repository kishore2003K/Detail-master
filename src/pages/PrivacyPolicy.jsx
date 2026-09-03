import { useEffect } from "react";
import { ShieldCheck, Lock, CheckCircle2, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | Detailing Masters Marthandam";
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
            <Lock className="w-4 h-4" />
            <span>Digital Personal Data Protection (DPDP) Act, 2023 Compliant</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">
            Effective Date: September 2026 • Official Data Protection Policy for Detailing Masters
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm leading-relaxed">
          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-luxury-gold" /> 1. Overview & Data Fiduciary Identity
            </h2>
            <p className="text-gray-300">
              <strong>Detailing Masters</strong> ("we", "our", or "us"), located Opposite KTM Bike Showroom, Chankai, Marthandam, Tamil Nadu 629155, is committed to safeguarding the digital privacy of our clients in full compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023 (India)</strong>.
            </p>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-luxury-gold" /> 2. Personal Data We Collect
            </h2>
            <p className="mb-3 text-gray-300">
              When scheduling an automotive detailing appointment via our website reservation form or WhatsApp, we collect only necessary operational details:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong className="text-white">Full Name:</strong> To identify the vehicle owner upon arrival.</li>
              <li><strong className="text-white">Mobile Phone Number:</strong> To send appointment verification, slot allocation receipts, and real-time WhatsApp service progress updates.</li>
              <li><strong className="text-white">Email Address (Optional):</strong> Optional contact method for sending electronic billing receipts.</li>
              <li><strong className="text-white">Vehicle Details:</strong> Brand, Model, and Vehicle Type (e.g. Sedan, SUV, Motorcycle) to prepare appropriate bay allocations, compounds, and tooling.</li>
              <li><strong className="text-white">Custom Notes:</strong> Client-provided notes regarding specific paint scratches, stain removal, or custom preferences.</li>
            </ul>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-luxury-gold" /> 3. Lawful Basis & Purpose of Processing
            </h2>
            <p className="mb-3 text-gray-300">
              Your data is collected strictly with your voluntary consent for specified service delivery purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Coordinating and allocating detailing studio bays and certified detailers.</li>
              <li>Dispatching WhatsApp/SMS booking confirmations and turnaround estimates.</li>
              <li>Maintaining warranty records for multi-year Ceramic Coating and Paint Protection Film (PPF) installations.</li>
            </ul>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-luxury-gold" /> 4. Zero Third-Party Sharing & Data Security
            </h2>
            <p className="text-gray-300">
              We uphold a strict <strong>Zero Third-Party Data Sharing</strong> policy. Your contact numbers, personal names, and vehicle information are <strong>never sold, rented, monetized, or shared</strong> with advertising networks or third-party marketing brokers. All customer records are stored securely with restricted access.
            </p>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-luxury-gold" /> 5. Your Rights Under DPDP Act, 2023
            </h2>
            <p className="mb-3 text-gray-300">
              As a data principal, you have the following rights regarding your personal records:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong className="text-white">Right to Access:</strong> Request a summary of your personal data processed by our studio.</li>
              <li><strong className="text-white">Right to Correction & Erasure:</strong> Request the correction of inaccurate contact numbers or deletion of past booking logs.</li>
              <li><strong className="text-white">Right of Grievance Redressal:</strong> Direct inquiries or concerns to our designated grievance officer.</li>
            </ul>
          </section>

          <section className="bg-luxury-card/90 border border-luxury-border p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-luxury-gold" /> 6. Grievance Officer Contact Information
            </h2>
            <p className="mb-4 text-gray-300">
              For any privacy inquiries or to exercise your data rights, please contact our studio administrator:
            </p>
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
