import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Car, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight,
  AlertTriangle,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import { vehiclesData } from '../data/vehiclesData';
import JsonLd from '../components/JsonLd';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export default function VehiclePage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);

  // Fallback to first vehicle if slug not found
  const vehicle = vehiclesData[slug] || vehiclesData['mahindra-thar-scorpio-xuv700'];

  // Other vehicle segments
  const otherVehicles = Object.values(vehiclesData).filter((v) => v.slug !== vehicle.slug);

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
        name: 'Vehicle Detailing',
        item: 'https://detailingmasters.in/#services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: vehicle.brand,
        item: `https://detailingmasters.in/vehicles/${vehicle.slug}`
      }
    ]
  };

  const autoDetailingSchema = {
    '@context': 'https://schema.org',
    '@type': ['AutoDetailing', 'LocalBusiness'],
    name: `Detailing Masters - ${vehicle.brand} Detailing & Paint Protection`,
    image: `https://detailingmasters.in${vehicle.image}`,
    telephone: '+919111977721',
    url: `https://detailingmasters.in/vehicles/${vehicle.slug}`,
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
    areaServed: [
      { '@type': 'City', name: 'Marthandam' },
      { '@type': 'City', name: 'Kuzhithurai' },
      { '@type': 'City', name: 'Thuckalay' },
      { '@type': 'City', name: 'Nagercoil' },
      { '@type': 'AdministrativeArea', name: 'Kanyakumari District' }
    ],
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
    mainEntity: vehicle.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="pt-24 pb-20 bg-luxury-bg min-h-screen text-luxury-text">
      <Helmet>
        <title>{vehicle.metaTitle}</title>
        <meta name="description" content={vehicle.metaDescription} />
        <link rel="canonical" href={`https://detailingmasters.in/vehicles/${vehicle.slug}`} />
        <meta property="og:title" content={vehicle.title} />
        <meta property="og:description" content={vehicle.metaDescription} />
        <meta property="og:image" content={`https://detailingmasters.in${vehicle.image}`} />
        <meta property="og:url" content={`https://detailingmasters.in/vehicles/${vehicle.slug}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* JSON-LD Schemas */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={autoDetailingSchema} />
      <JsonLd data={faqSchema} />

      {/* Breadcrumb Bar */}
      <div className="border-b border-luxury-border bg-black/40 py-3">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-gray-400 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <Link to="/#services" className="hover:text-luxury-gold transition-colors">Vehicles</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-luxury-gold">{vehicle.brand}</span>
          </nav>
        </Container>
      </div>

      {/* Hero Header */}
      <section className="py-14 md:py-20 relative bg-radial-gradient border-b border-luxury-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-luxury-gold bg-luxury-gold/10 px-3.5 py-1.5 rounded-full border border-luxury-gold/25">
                <Car className="w-3.5 h-3.5" />
                <span>{vehicle.tag}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                {vehicle.brand} <span className="text-gradient">Specialist Detailing</span>
              </h1>

              <p className="text-sm md:text-base text-gray-300 font-medium">
                {vehicle.heroSubtitle}
              </p>

              <div className="flex items-center gap-2 text-xs text-luxury-gold/90 bg-luxury-secondary/70 p-3 rounded-xl border border-luxury-border">
                <Sparkles className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>Models Covered: <strong>{vehicle.models}</strong></span>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={`https://wa.me/919111977721?text=Hi%20Detailing%20Masters,%20I%20have%20a%20${encodeURIComponent(vehicle.brand)}%20and%20would%20like%20a%20custom%20detailing%20quote.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs md:text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4" /> Book {vehicle.brand} via WhatsApp
                </a>
                <a
                  href="tel:9111977721"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-xl border border-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-luxury-gold" /> Call Studio (+91 91119 77721)
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-luxury-gold/30 shadow-2xl aspect-video lg:aspect-square bg-luxury-secondary">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} Detailing Studio Marthandam`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs">
                  <span className="text-luxury-gold font-bold block mb-1">Marthandam Detailing Bay</span>
                  <p className="text-gray-300">Opposite KTM Bike Showroom • Free Pickup & Drop within 15 km</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className="py-14 border-b border-luxury-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">
              Tailored Engineering for {vehicle.brand} Paint & Bodywork
            </h2>
            <div className="text-xs md:text-sm text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
              {vehicle.overview}
            </div>
          </div>
        </Container>
      </section>

      {/* Model-Specific Vulnerabilities & Challenges */}
      <section className="py-14 bg-[#090909] border-b border-luxury-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-luxury-gold uppercase tracking-wider block mb-2">Technical Analysis</span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">
              Specific Challenges for {vehicle.brand} Vehicles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicle.modelChallenges.map((challenge, idx) => (
              <div
                key={idx}
                className="bg-[#111111] border border-luxury-border hover:border-luxury-gold/40 rounded-2xl p-6 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center mb-4 border border-luxury-gold/20 font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {challenge.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Packages */}
      <section className="py-16 border-b border-luxury-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-luxury-gold uppercase tracking-wider block mb-2">Studio Recommendations</span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">
              Recommended Packages for {vehicle.brand}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {vehicle.recommendedPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-luxury-gold/35 rounded-2xl p-8 flex flex-col justify-between hover:border-luxury-gold transition-all relative overflow-hidden"
              >
                <div>
                  <div className="inline-block text-[11px] font-bold text-luxury-gold bg-luxury-gold/10 px-3 py-1 rounded-full border border-luxury-gold/30 mb-4">
                    Recommended Option 0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white mb-6">
                    {pkg.name}
                  </h3>
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/919111977721?text=Hi%20Detailing%20Masters,%20I%20am%20interested%20in%20the%20'${encodeURIComponent(pkg.name)}'%20for%20my%20${encodeURIComponent(vehicle.brand)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold/90 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> Request Quote & Booking
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-14 border-b border-luxury-border">
        <Container className="max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold font-heading text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-luxury-gold" /> Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {vehicle.faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-luxury-border rounded-xl bg-[#111111] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-xs md:text-sm text-white hover:text-luxury-gold transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cross-Link Matrix: Other Vehicle Segments */}
      <section className="py-14 bg-[#090909]">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Other Popular Vehicles We Specialize In</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherVehicles.map((other) => (
              <Link
                key={other.slug}
                to={`/vehicles/${other.slug}`}
                className="bg-[#111111] border border-luxury-border hover:border-luxury-gold/40 p-4 rounded-xl flex items-center justify-between group transition-all"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-luxury-gold transition-colors">
                    {other.brand}
                  </h4>
                  <p className="text-[10px] text-gray-400 line-clamp-1">{other.tag}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-luxury-gold group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
