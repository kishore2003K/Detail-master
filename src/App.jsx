import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import HowItWorks from './components/HowItWorks';
import Hours from './components/Hours';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <Header />
      <Hero />
      <Hours />
      <About />
      <Services />
      <Gallery />
      <HowItWorks />
      <Testimonials />
      <Contact />
      <Footer
        onOpenPrivacy={() => setShowPrivacy(true)}
        onOpenTerms={() => setShowTerms(true)}
      />

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <p><strong>Last Updated: January 1, 2024</strong></p>
        <p>DETAILING MASTERS LLC ("Company," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

        <h3>1. Information We Collect</h3>
        <p>We may collect the following categories of personal information: Contact Information (name, email, phone, address), Vehicle Information (make, model, year, condition), Transaction Data, Communications, and Usage Data.</p>

        <h3>2. How We Use Your Information</h3>
        <p>We use your information to schedule and fulfill detailing appointments, process payments, communicate about services, improve our website, and comply with applicable laws.</p>

        <h3>3. Sharing of Information</h3>
        <p>We do not sell, rent, or trade your personal information. We may share data with service providers, for legal compliance, or during business transfers.</p>

        <h3>4. Cookies & Tracking</h3>
        <p>We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.</p>

        <h3>5. Your Rights</h3>
        <p>You may have rights to access, correct, or delete your personal data. To exercise these rights, contact us at hello@DETAILING MASTERS.com.</p>

        <h3>6. Contact Us</h3>
        <p>DETAILING MASTERS LLC — 123 Detail Street, Auto City, FL 33101. Phone: +1 (555) 123-4567. Email: hello@DETAILING MASTERS.com</p>
      </Modal>

      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service">
        <p><strong>Last Updated: January 1, 2024</strong></p>
        <p>These Terms of Service govern your use of services provided by DETAILING MASTERS LLC ("Company," "we," "our," or "us"), including our website and auto detailing services.</p>

        <h3>1. Services</h3>
        <p>DETAILING MASTERS LLC provides professional automotive detailing, paint correction, ceramic coating, and related services. All services are subject to availability.</p>

        <h3>2. Appointments & Booking</h3>
        <p>Appointments may be scheduled by phone, email, or through our website. Bookings are confirmed upon receipt of confirmation from our team.</p>

        <h3>3. Cancellation Policy</h3>
        <p>Cancellations must be made at least 24 hours in advance. Late cancellations may incur a fee of up to 25%. No-shows may be charged 50% of the scheduled service cost.</p>

        <h3>4. Pricing & Payment</h3>
        <p>All prices are estimates and may vary based on vehicle size and condition. Final pricing is communicated before work begins. Payment is due upon service completion.</p>

        <h3>5. Satisfaction Guarantee</h3>
        <p>If you are not satisfied, please notify us within 24 hours of pickup. We will address your concerns at no additional charge.</p>

        <h3>6. Contact Us</h3>
        <p>DETAILING MASTERS LLC — 123 Detail Street, Auto City, FL 33101. Phone: +1 (555) 123-4567. Email: hello@DETAILING MASTERS.com</p>
      </Modal>
    </>
  );
}

export default App;
