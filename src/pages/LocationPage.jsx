import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Car, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  Star, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award
} from 'lucide-react';
import { locationsData } from '../data/locationsData';
import JsonLd from '../components/JsonLd';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export default function LocationPage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);

  // Fallback to kuzhithurai if slug not found
  const location = locationsData[slug] || locationsData['kuzhithurai'];

  // Other related locations for cross-linking
  const otherLocations = Object.values(locationsData).filter((loc) => loc.slug !== location.slug);

  // Structured Data Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://detailingmasters.in/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: 'https://detailingmasters.in/#contact'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: location.city,
        item: `https://detailingmasters.in/locations/${location.slug}`
      }
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['AutoDetailing', 'LocalBusiness'],
    name: `Detailing Masters - Car Detailing for ${location.city}`,
    image: 'https://detailingmasters.in/brand-logo.png',
    telephone: '+919111977721',
    url: `https://detailingmasters.in/locations/${location.slug}`,
    hasMap: 'https://www.google.com/maps?cid=10630559981881673868',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Opposite KTM Bike Showroom, Chankai, Unnamalaikadai',
      addressLocality: 'Marthandam',
      addressRegion: 'Tamil Nadu',
      postalCode: '629155',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.2995,
      longitude: 77.2380
    },
    areaServed: {
      '@type': 'City',
      name: location.city
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '31',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Detailing Masters, I am contacting you from ${location.city}. I would like to inquire about car detailing / ceramic coating and your doorstep pickup service.`
  );

  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-text font-sans selection:bg-luxury-gold selection:text-luxury-bg">
      {/* 1. Dynamic SEO Helmet Meta Tags */}
      <Helmet>
        <title>{location.title}</title>
        <meta name="description" content={location.metaDescription} />
        <link rel="canonical" href={`https://detailingmasters.in/locations/${location.slug}`} />

        {/* Geo Meta Tags */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content={`${location.city}, Kanyakumari, Tamil Nadu`} />
        <meta name="geo.position" content="8.2995;77.2380" />
        <meta name="ICBM" content="8.2995, 77.2380" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Detailing Masters" />
        <meta property="og:title" content={location.title} />
        <meta property="og:description" content={location.metaDescription} />
        <meta property="og:url" content={`https://detailingmasters.in/locations/${location.slug}`} />
        <meta property="og:image" content="https://detailingmasters.in/images/ceramic-coating.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={location.title} />
        <meta name="twitter:description" content={location.metaDescription} />
        <meta name="twitter:image" content="https://detailingmasters.in/images/ceramic-coating.jpg" />
      </Helmet>

      {/* 2. Structured Data Injections */}
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={localBusinessSchema} />
      <JsonLd schema={faqSchema} />

      {/* Hero / Header Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-luxury-border">
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="/images/hero-detail.jpg"
            alt={`Detailing Masters Studio Serving ${location.city}`}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-cover blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-luxury-bg/90 to-transparent" />
        </div>

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(245,197,24,0.12),transparent_60%)]" />

        <Container className="relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <Link to="/#contact" className="hover:text-luxury-gold transition-colors">Locations</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-luxury-gold font-medium truncate">{location.city}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Serving {location.city} • {location.tag}</span>
              </div>

              {/* Single strict H1 tag targeting local search */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                {location.h1}
              </h1>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
                {location.heroSubtitle}
              </p>

              {/* Location Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-300 pt-2">
                <div className="flex items-center gap-1.5 bg-luxury-card/90 px-3.5 py-2 rounded-xl border border-luxury-border">
                  <Navigation className="w-4 h-4 text-luxury-gold" />
                  <span><strong>{location.distance}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-luxury-card/90 px-3.5 py-2 rounded-xl border border-luxury-border">
                  <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                  <span><strong>4.8/5.0</strong> (31 Google Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-luxury-card/90 px-3.5 py-2 rounded-xl border border-luxury-border">
                  <Car className="w-4 h-4 text-luxury-gold" />
                  <span>Complimentary Doorstep Valet</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  variant="primary"
                  className="px-6 py-3.5 font-bold shadow-[0_0_20px_rgba(245,197,24,0.3)]"
                  onClick={() => window.open(`https://wa.me/919111977721?text=${whatsappMessage}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Book from {location.city} via WhatsApp
                </Button>
                <a
                  href="tel:9111977721"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-luxury-card hover:bg-white/10 text-white border border-luxury-border text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-luxury-gold" /> Call 9111977721
                </a>
              </div>
            </div>

            {/* Valet Pickup Card */}
            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-luxury-gold/30 bg-gradient-to-b from-luxury-secondary/80 to-luxury-bg shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl pointer-events-none" />
                
                <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">Studio Valet Service</span>
                <div className="mt-2 mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-heading">
                    Free Pickup & Return in {location.city}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Book any major ceramic coating, PPF, or combo package and our insured studio driver handles pickup from your residence.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300 border-t border-luxury-border/60 pt-4 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                    <span>Free pre-wash paint depth audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                    <span>Insured transit with verified studio staff</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                    <span>Real-time WhatsApp video progress updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                    <span>Written warranty cards on handover</span>
                  </li>
                </ul>

                <Button
                  className="w-full bg-luxury-gold text-luxury-bg font-bold hover:bg-white transition-colors text-xs py-3"
                  onClick={() => window.open(`https://wa.me/919111977721?text=${whatsappMessage}`, '_blank')}
                >
                  Schedule Doorstep Pickup
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Localized In-Depth Content */}
      <section className="py-20 bg-[#070707] border-b border-luxury-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <article className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold">
                  Local Vehicle Care Guide
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Why Car Owners in {location.city} Choose Detailing Masters
                </h2>
                <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                  {location.overview.trim().split('\n\n').map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
              </div>

              {/* Road & Climate Conditions Box */}
              <div className="bg-luxury-card/80 border border-luxury-gold/25 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0 mt-1">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">
                      Road & Weather Protection for {location.city} Motorists
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {location.roadConditions}
                    </p>
                  </div>
                </div>
              </div>

              {/* Popular Services Grid */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-heading text-white">
                    Available Services for {location.city}
                  </h2>
                  <Link to="/#services" className="text-xs text-luxury-gold hover:underline flex items-center gap-1">
                    <span>All Services</span> <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {location.popularServices.map((serviceItem) => (
                    <Link
                      key={serviceItem.slug}
                      to={`/services/${serviceItem.slug}`}
                      className="glass-card rounded-xl p-5 border border-luxury-border/80 hover:border-luxury-gold/40 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-white text-base group-hover:text-luxury-gold transition-colors">
                            {serviceItem.name}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-luxury-gold transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">{serviceItem.description}</p>
                      </div>
                      <span className="text-[11px] font-mono text-luxury-gold mt-4 block">
                        Explore Treatment & Process →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar Sticky Quick Contact & Studio Directions */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Directions Card */}
                <div className="glass-card rounded-2xl p-6 border border-luxury-border space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-luxury-gold" />
                    <h3 className="font-bold text-white text-base">Studio Directions</h3>
                  </div>

                  <div className="space-y-3 text-xs text-gray-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span>Opposite KTM Bike Showroom, Chankai, Marthandam 629155</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Navigation className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Distance: {location.distance}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>Mon - Sat: 9:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                      <span>+91 91119 77721 / +91 98948 34700</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-luxury-gold text-luxury-bg font-bold hover:bg-white text-xs py-3"
                    onClick={() => window.open('https://maps.google.com/?cid=10630559981881673868', '_blank')}
                  >
                    Get GPS Directions on Google Maps
                  </Button>
                </div>

                {/* Nearby Locations Navigation Silo */}
                <div className="glass-card rounded-2xl p-6 border border-luxury-border space-y-4">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                    Other Nearby Towns We Serve
                  </h3>
                  <div className="space-y-2">
                    {otherLocations.map((loc) => (
                      <Link
                        key={loc.slug}
                        to={`/locations/${loc.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg text-xs text-gray-300 hover:text-luxury-gold hover:bg-white/5 transition-all border border-transparent hover:border-luxury-border"
                      >
                        <span className="truncate">{loc.city}</span>
                        <span className="text-[10px] text-gray-500">{loc.distance.split('(')[0]}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* 4. Frequently Asked Questions (FAQ Section) */}
      <section className="py-20 bg-luxury-bg border-b border-luxury-border">
        <Container className="max-w-3xl">
          <div className="text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-luxury-gold font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Customer Inquiries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Questions from {location.city} Car Owners
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Clear answers regarding our doorstep pickup, studio location, and warranties.
            </p>
          </div>

          <div className="space-y-3">
            {location.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-luxury-border bg-luxury-card/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left text-sm md:text-base font-semibold text-white hover:text-luxury-gold transition-colors gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-luxury-gold shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 md:px-5 pb-5 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. Booking Banner */}
      <section className="py-16 bg-gradient-to-r from-luxury-secondary/90 via-black to-luxury-secondary/90 border-b border-luxury-border">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">
                Book Your Detailing Slot in {location.city}
              </h2>
              <p className="text-gray-400 text-sm max-w-xl">
                Enjoy complimentary doorstep vehicle pickup and return delivery. Reserve your studio appointment today.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Button
                variant="primary"
                className="px-6 py-3.5 font-bold shadow-lg text-sm"
                onClick={() => window.open(`https://wa.me/919111977721?text=${whatsappMessage}`, '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Book from {location.city} via WhatsApp
              </Button>
              <Link
                to="/"
                className="px-6 py-3.5 rounded-full bg-luxury-card hover:bg-white/10 text-white border border-luxury-border text-sm font-semibold transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
