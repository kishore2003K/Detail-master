import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "./ui/Container";
import { LogoMark } from "./ui/LogoMark";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

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

const serviceLinks = [
  { name: 'Ceramic & Graphene Coating', href: '/services/ceramic-coating' },
  { name: 'Premium Car Wash & Water Wash', href: '/services/car-wash' },
  { name: 'Paint Protection Film (PPF)', href: '/services/paint-protection-film' },
  { name: 'Paint Correction & Scratch Removal', href: '/services/paint-correction' },
  { name: 'Interior Detailing & AC Steaming', href: '/services/interior-detailing' },
  { name: 'Underbody Anti-Rust Coating', href: '/services/underbody-coating' },
  { name: 'Bike Wash & Detailing', href: '/services/bike-detailing' },
];

const locationLinks = [
  { name: 'Kuzhithurai', href: '/locations/kuzhithurai', distance: '3.5 km' },
  { name: 'Arumanai', href: '/locations/arumanai', distance: '11 km' },
  { name: 'Thuckalay', href: '/locations/thuckalay', distance: '14 km' },
  { name: 'Karungal', href: '/locations/karungal', distance: '12 km' },
  { name: 'Kaliakkavilai', href: '/locations/kaliakkavilai', distance: '7 km' },
  { name: 'Nagercoil', href: '/locations/nagercoil', distance: '28 km' },
  { name: 'Colachel', href: '/locations/colachel', distance: '17 km' },
  { name: 'Melpuram', href: '/locations/melpuram', distance: '6.5 km' },
];

const vehicleLinks = [
  { name: 'Mahindra Thar & Scorpio', href: '/vehicles/mahindra-thar-scorpio-xuv700' },
  { name: 'Hyundai Creta & Kia Seltos', href: '/vehicles/hyundai-creta-kia-seltos' },
  { name: 'Tata Dark Edition SUVs', href: '/vehicles/tata-nexon-harrier-safari' },
  { name: 'BMW, Mercedes & Audi Luxury', href: '/vehicles/bmw-mercedes-audi-luxury' },
  { name: 'Royal Enfield & Superbikes', href: '/vehicles/royal-enfield-superbikes' },
];

const guideLinks = [
  { name: 'Ceramic Coating for Coastal Weather', href: '/blog/ceramic-coating-coastal-kanyakumari' },
  { name: 'Monsoon Car Care & Rust Prevention', href: '/blog/monsoon-car-care-marthandam' },
  { name: 'Underbody Anti-Rust Bitumen Armor', href: '/blog/underbody-anti-rust-kanyakumari' },
  { name: 'Car Water Wash vs Foam Detailing', href: '/blog/car-water-wash-vs-foam-detailing' },
  { name: 'Ceramic Coating vs PPF Comparison', href: '/blog/ceramic-coating-vs-ppf-comparison' },
];

export default function Footer() {
  const scrollTo = useSmoothScroll();

  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-luxury-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <LogoMark size="md" variant="simple" />
              <span className="font-heading font-bold text-xl tracking-wide text-white">
                Detailing <span className="text-luxury-gold">Masters</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Marthandam's premier automotive detailing studio specializing in 9H ceramic coatings, self-healing PPF, paint correction, and interior steam spa.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/detailingmasters_offical" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Detailing Masters on Instagram"
                className="w-10 h-10 rounded-full bg-luxury-secondary flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
              >
                <SocialIcon type="instagram" />
              </a>
              <a 
                href="https://www.google.com/maps?cid=10630559981881673868" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Detailing Masters on Google Maps"
                className="w-10 h-10 rounded-full bg-luxury-secondary flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', id: 'home', href: '/' },
                { name: 'Services', id: 'services', href: '/#services' },
                { name: 'Gallery', id: 'gallery', href: '/#gallery' },
                { name: 'Reviews', id: 'reviews', href: '/#reviews' },
                { name: 'Guides & Blog', id: 'blog', href: '/blog' },
                { name: 'Contact Studio', id: 'contact', href: '/#contact' },
              ].map(link => (
                <li key={link.name}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className="text-gray-400 text-sm hover:text-luxury-gold transition-colors block text-left"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-gray-400 text-sm hover:text-luxury-gold transition-colors text-left cursor-pointer"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Dedicated Programmatic Service Pages */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Core Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(service => (
                <li key={service.name}>
                  <Link 
                    to={service.href} 
                    className="text-gray-400 text-sm hover:text-luxury-gold transition-colors block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas We Serve (Programmatic Geo Pages) */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Areas We Serve</h4>
            <ul className="space-y-2.5">
              {locationLinks.map(loc => (
                <li key={loc.name}>
                  <Link 
                    to={loc.href} 
                    className="text-gray-400 text-sm hover:text-luxury-gold transition-colors flex items-center justify-between group"
                  >
                    <span>{loc.name}</span>
                    <span className="text-[11px] text-gray-600 group-hover:text-luxury-gold/70 transition-colors">{loc.distance}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Studio Location</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <a 
                  href="https://maps.google.com/?cid=10630559981881673868" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-white transition-colors leading-relaxed"
                >
                  Opposite KTM Bike Showroom, Chankai, Marthandam, Unnamalaikadai, Tamil Nadu 629155
                  <span className="block text-xs text-luxury-gold mt-1">Free Pickup & Drop in 15km Radius</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-sm text-gray-400">
                  <a href="tel:9111977721" className="hover:text-white transition-colors whitespace-nowrap">+91 91119 77721</a>
                  <a href="tel:9894834700" className="hover:text-white transition-colors whitespace-nowrap">+91 98948 34700</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-luxury-gold shrink-0" />
                <a href="mailto:info@detailingmasters.com" className="text-gray-400 text-sm hover:text-white transition-colors break-words">info@detailingmasters.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Extended Vehicle & Knowledge Hub Silo Matrix */}
        <div className="border-t border-luxury-border/60 pt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-luxury-gold">Specialized Vehicle Detailing</h5>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {vehicleLinks.map(v => (
                <Link key={v.name} to={v.href} className="text-gray-400 hover:text-luxury-gold transition-colors">
                  {v.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-luxury-gold">Automotive Detailing Guides</h5>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {guideLinks.map(g => (
                <Link key={g.name} to={g.href} className="text-gray-400 hover:text-luxury-gold transition-colors">
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-luxury-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Detailing Masters. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog Hub
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
