import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Shield, 
  Sparkles, 
  Droplets, 
  Bike, 
  Wind, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Star, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  HelpCircle, 
  ChevronDown, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import JsonLd from '../components/JsonLd';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

// Icon map for dynamic service icons
const iconMap = {
  'ceramic-coating': Shield,
  'car-wash': Droplets,
  'paint-protection-film': ShieldCheck,
  'paint-correction': Sparkles,
  'interior-detailing': Wind,
  'underbody-coating': Layers,
  'bike-detailing': Bike,
};

export default function ServicePage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);

  // Fallback to ceramic-coating if slug not found
  const service = servicesData[slug] || servicesData['ceramic-coating'];
  const ServiceIcon = iconMap[service.slug] || Sparkles;

  // Other related services for internal linking
  const otherServices = Object.values(servicesData).filter((s) => s.slug !== service.slug);

  // Schemas
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
        name: 'Services',
        item: 'https://detailingmasters.in/#services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.serviceType,
        item: `https://detailingmasters.in/services/${service.slug}`
      }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.serviceType,
    name: service.h1,
    description: service.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Detailing Masters',
      image: 'https://detailingmasters.in/brand-logo.png',
      telephone: '+919111977721',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Opposite KTM Bike Showroom, Chankai, Unnamalaikadai',
        addressLocality: 'Marthandam',
        addressRegion: 'Tamil Nadu',
        postalCode: '629155',
        addressCountry: 'IN'
      },
      priceRange: '₹₹'
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Marthandam' },
      { '@type': 'AdministrativeArea', name: 'Chankai' },
      { '@type': 'AdministrativeArea', name: 'Kanyakumari District' },
      { '@type': 'AdministrativeArea', name: 'Kuzhithurai' },
      { '@type': 'AdministrativeArea', name: 'Arumanai' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.serviceType} Packages`,
      itemListElement: service.packages.map((pkg) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: pkg.name
        }
      }))
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Detailing Masters, I want to inquire about ${service.serviceType} (${service.h1}) for my vehicle in Marthandam.`
  );

  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-text font-sans selection:bg-luxury-gold selection:text-luxury-bg">
      {/* 1. Dynamic SEO Helmet Meta Tags */}
      <Helmet>
        <title>{service.title}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`https://detailingmasters.in/services/${service.slug}`} />

        {/* Geo Meta Tags for local SEO */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Marthandam, Kanyakumari" />
        <meta name="geo.position" content="8.2995;77.2380" />
        <meta name="ICBM" content="8.2995, 77.2380" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Detailing Masters" />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={`https://detailingmasters.in/services/${service.slug}`} />
        <meta property="og:image" content={`https://detailingmasters.in${service.heroImage}`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.title} />
        <meta name="twitter:description" content={service.metaDescription} />
        <meta name="twitter:image" content={`https://detailingmasters.in${service.heroImage}`} />
      </Helmet>

      {/* 2. Structured Data Injections (Rich Snippets) */}
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={faqSchema} />

      {/* Hero / Header Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-luxury-border">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={service.heroImage}
            alt={service.h1}
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
            <Link to="/#services" className="hover:text-luxury-gold transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-luxury-gold font-medium truncate">{service.serviceType}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
                <ServiceIcon className="w-4 h-4" />
                <span>{service.tag}</span>
              </div>

              {/* Strict single H1 tag */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                {service.h1}
              </h1>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
                {service.heroSubtitle}
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-300 pt-2">
                <div className="flex items-center gap-1.5 bg-luxury-card/90 px-3.5 py-2 rounded-xl border border-luxury-border">
                  <Clock className="w-4 h-4 text-luxury-gold" />
                  <span>Duration: <strong>{service.duration}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-luxury-card/90 px-3.5 py-2 rounded-xl border border-luxury-border">
                  <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                  <span><strong>{service.rating}/5.0</strong> ({service.reviewCount}+ reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-luxury-card/90 px-3.5 py-2 rounded-xl border border-luxury-border">
                  <MapPin className="w-4 h-4 text-luxury-gold" />
                  <span>Marthandam Studio</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  variant="primary"
                  className="px-6 py-3.5 font-bold shadow-[0_0_20px_rgba(245,197,24,0.3)]"
                  onClick={() => window.open(`https://wa.me/919111977721?text=${whatsappMessage}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Inquire via WhatsApp
                </Button>
                <a
                  href="tel:9111977721"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-luxury-card hover:bg-white/10 text-white border border-luxury-border text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-luxury-gold" /> Call 9111977721
                </a>
              </div>
            </div>

            {/* Quick Consultation Card */}
            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-luxury-gold/30 bg-gradient-to-b from-luxury-secondary/80 to-luxury-bg shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl pointer-events-none" />
                
                <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">Studio Consultation</span>
                <div className="mt-2 mb-4">
                  <span className="text-gray-400 text-xs">Custom Packages Tailored for Your Vehicle</span>
                  <div className="text-2xl md:text-3xl font-extrabold text-white font-heading mt-1">
                    Free Inspection
                    <span className="text-xs font-normal text-gray-400 ml-1 block mt-0.5">and paint depth audit</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300 border-t border-luxury-border/60 pt-4 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                    <span>Free inspection & paint thickness test</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                    <span>Certified master detailing technicians</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                    <span>Doorstep pickup & drop available (15km)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                    <span>Written warranty on coatings & PPF</span>
                  </li>
                </ul>

                <Button
                  className="w-full bg-luxury-gold text-luxury-bg font-bold hover:bg-white transition-colors"
                  onClick={() => {
                    const elem = document.getElementById('pricing-packages');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Package Options
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Deep Educational & Localized Content Section */}
      <section className="py-20 bg-[#070707] border-b border-luxury-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <article className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold">
                  In-Depth Service Guide
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Why {service.serviceType} at Detailing Masters Marthandam?
                </h2>
                <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                  {service.overview.trim().split('\n\n').map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
              </div>

              {/* Regional Relevance Box */}
              <div className="bg-luxury-card/80 border border-luxury-gold/25 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">
                      Why This Service is Critical in Kanyakumari & Marthandam
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {service.whyNeededInRegion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Benefits Grid */}
              <div className="space-y-6 pt-4">
                <h2 className="text-2xl font-bold font-heading text-white">
                  Key Benefits of Our {service.serviceType}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="glass-card rounded-xl p-5 border border-luxury-border/80 hover:border-luxury-gold/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
                        <h3 className="font-bold text-white text-sm">{benefit.title}</h3>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Multi-Stage Process */}
              <div className="space-y-6 pt-6">
                <h2 className="text-2xl font-bold font-heading text-white">
                  Our Step-by-Step Master Execution Process
                </h2>
                <div className="space-y-4">
                  {service.process.map((stepItem) => (
                    <div
                      key={stepItem.step}
                      className="flex items-start gap-4 p-4 rounded-xl bg-luxury-card/60 border border-luxury-border"
                    >
                      <span className="font-heading font-extrabold text-lg text-luxury-gold bg-luxury-gold/10 px-3 py-1.5 rounded-lg border border-luxury-gold/20 shrink-0">
                        {stepItem.step}
                      </span>
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-sm md:text-base">
                          {stepItem.title}
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {stepItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar Sticky Quick Contact & Studio Location */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Studio Location & Timing */}
                <div className="glass-card rounded-2xl p-6 border border-luxury-border space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-luxury-gold" />
                    <h3 className="font-bold text-white text-base">Studio Highlights</h3>
                  </div>

                  <div className="space-y-3 text-xs text-gray-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span>Opposite KTM Bike Showroom, Chankai, Marthandam 629155</span>
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
                    Open in Google Maps
                  </Button>
                </div>

                {/* Other Services Navigation Box */}
                <div className="glass-card rounded-2xl p-6 border border-luxury-border space-y-4">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                    Other Detailing Services
                  </h3>
                  <div className="space-y-2">
                    {otherServices.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg text-xs text-gray-300 hover:text-luxury-gold hover:bg-white/5 transition-all border border-transparent hover:border-luxury-border"
                      >
                        <span className="truncate">{s.serviceType}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* 4. Packages Section */}
      <section id="pricing-packages" className="py-20 bg-luxury-bg border-b border-luxury-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold">
              Treatment Options
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
              {service.serviceType} Packages
            </h2>
            <p className="text-gray-400 text-sm">
              Custom packages for hatchbacks, sedans, luxury SUVs, and motorcycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-luxury-secondary via-luxury-card to-luxury-bg border-2 border-luxury-gold shadow-[0_0_30px_rgba(245,197,24,0.15)] scale-105 z-10'
                    : 'glass-card border border-luxury-border'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-luxury-gold text-luxury-bg text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
                    <div className="text-sm font-semibold text-luxury-gold uppercase tracking-wider mt-1">
                      Professional Studio Package
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs text-gray-300 pt-4 border-t border-luxury-border/60">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-auto">
                  <Button
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    className="w-full font-bold text-xs py-3"
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Hi Detailing Masters, I want to inquire about the "${pkg.name}" package for my vehicle in Marthandam.`
                      );
                      window.open(`https://wa.me/919111977721?text=${msg}`, '_blank');
                    }}
                  >
                    Inquire About {pkg.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Frequently Asked Questions (FAQ Section) */}
      <section className="py-20 bg-[#070707] border-b border-luxury-border">
        <Container className="max-w-3xl">
          <div className="text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-luxury-gold font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Frequently Asked Questions: {service.serviceType}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Clear answers regarding detailing process, warranties, and maintenance.
            </p>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, index) => {
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

      {/* 6. High-Conversion Booking Banner */}
      <section className="py-16 bg-gradient-to-r from-luxury-secondary/90 via-black to-luxury-secondary/90 border-b border-luxury-border">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">
                Book Your {service.serviceType} in Marthandam
              </h2>
              <p className="text-gray-400 text-sm max-w-xl">
                Experience precision care, certified detailing masters, and genuine warranties. Reserve your slot today.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Button
                variant="primary"
                className="px-6 py-3.5 font-bold shadow-lg text-sm"
                onClick={() => window.open(`https://wa.me/919111977721?text=${whatsappMessage}`, '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Inquire via WhatsApp
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
