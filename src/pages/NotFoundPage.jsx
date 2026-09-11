import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, Sparkles, Droplets, Bike, Wind, Layers, Home } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

const quickServices = [
  { name: 'Ceramic & Graphene Coating', href: '/services/ceramic-coating', icon: Shield },
  { name: 'Premium Foam Car Wash', href: '/services/car-wash', icon: Droplets },
  { name: 'Paint Protection Film (PPF)', href: '/services/paint-protection-film', icon: Shield },
  { name: 'Paint Correction & Polish', href: '/services/paint-correction', icon: Sparkles },
  { name: 'Interior Detailing & Steam Spa', href: '/services/interior-detailing', icon: Wind },
  { name: 'Underbody Anti-Rust Coating', href: '/services/underbody-coating', icon: Layers },
  { name: 'Bike Wash & Detailing', href: '/services/bike-detailing', icon: Bike },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-text flex items-center justify-center py-24 px-4">
      <Helmet>
        <title>Page Not Found (404) | Detailing Masters Marthandam</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Container className="max-w-2xl text-center space-y-8">
        <div className="space-y-3">
          <span className="text-luxury-gold font-mono text-xs uppercase tracking-widest bg-luxury-gold/10 px-3 py-1 rounded-full border border-luxury-gold/30">
            Error 404
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
            The page you're looking for might have been moved, renamed, or is temporarily unavailable. Explore our detailing services below:
          </p>
        </div>

        {/* Quick Service Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {quickServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.name}
                to={service.href}
                className="flex items-center gap-3 p-3.5 rounded-xl glass-card border border-luxury-border hover:border-luxury-gold/40 text-xs text-gray-300 hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-luxury-gold/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-semibold truncate">{service.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-4">
          <Link to="/">
            <Button variant="primary" className="px-8 py-3 font-bold">
              <Home className="w-4 h-4 mr-2" /> Back to Studio Home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
