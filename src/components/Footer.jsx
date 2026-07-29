import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "./ui/Container";
import { LogoMark } from "./ui/LogoMark";

const SocialIcon = ({ type }) => {
  if (type === 'instagram') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    );
  }
  if (type === 'facebook') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    );
  }
  if (type === 'twitter') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
      </svg>
    );
  }
  return null;
};

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-luxury-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <LogoMark size="md" />
              <span className="font-heading font-bold text-xl tracking-wide text-white">
                Detailing <span className="text-luxury-gold">Masters</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium automotive detailing studio specializing in ceramic coatings, paint correction, and interior restoration.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-luxury-secondary flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors">
                <SocialIcon type="instagram" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-luxury-secondary flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors">
                <SocialIcon type="facebook" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-luxury-secondary flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors">
                <SocialIcon type="twitter" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Gallery', 'Reviews', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 text-sm hover:text-luxury-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Our Services</h4>
            <ul className="space-y-3">
              {['Ceramic Coating', 'Paint Correction', 'Paint Protection Film', 'Interior Detailing', 'Premium Wash', 'Engine Bay Detailing'].map(link => (
                <li key={link}>
                  <a href="#services" className="text-gray-400 text-sm hover:text-luxury-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Opposite KTM Bike Showroom, Chankai, Marthandam, Tamil Nadu 629155</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-luxury-gold shrink-0" />
                <a href="tel:9111977721" className="text-gray-400 text-sm hover:text-white transition-colors">9111977721, 9894834700</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-luxury-gold shrink-0" />
                <a href="mailto:info@detailingmasters.com" className="text-gray-400 text-sm hover:text-white transition-colors">info@detailingmasters.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Detailing Masters. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
