import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Search, 
  MessageCircle,
  Phone,
  Filter
} from 'lucide-react';
import { blogArticles } from '../data/blogData';
import { Container } from '../components/ui/Container';
import JsonLd from '../components/JsonLd';

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const articlesList = Object.values(blogArticles);

  const categories = useMemo(() => {
    const cats = ['All'];
    articlesList.forEach((a) => {
      if (!cats.includes(a.category)) {
        cats.push(a.category);
      }
    });
    return cats;
  }, [articlesList]);

  const filteredArticles = useMemo(() => {
    return articlesList.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articlesList, selectedCategory, searchQuery]);

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
        name: 'Blog & Car Care Guides',
        item: 'https://detailingmasters.in/blog'
      }
    ]
  };

  return (
    <div className="pt-24 pb-20 bg-luxury-bg min-h-screen text-luxury-text">
      <Helmet>
        <title>Car & Bike Care Guides, Ceramic Coating & Detailing Tips - Detailing Masters</title>
        <meta 
          name="description" 
          content="Expert automotive detailing guides for Marthandam & Kanyakumari. Learn about 9H ceramic coatings, TPU PPF, swirl-free washing, and coastal rust prevention." 
        />
        <link rel="canonical" href="https://detailingmasters.in/blog" />
      </Helmet>

      <JsonLd data={breadcrumbSchema} />

      {/* Hero Header */}
      <section className="py-14 relative bg-radial-gradient border-b border-luxury-border">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-luxury-gold bg-luxury-gold/10 px-3.5 py-1.5 rounded-full border border-luxury-gold/25 mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Detailing Knowledge Hub</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight mb-4">
              Car & Bike Care <span className="text-gradient">Knowledge Base</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              Expert detailing insights, scientific wash techniques, and vehicle protection advice tailored for tropical and coastal conditions in Marthandam and Kanyakumari district.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides (e.g. ceramic coating, rust, swirl marks, wash)..."
                className="w-full bg-[#111111] border border-luxury-border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Category Pills & Articles Grid */}
      <section className="py-12">
        <Container>
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            <Filter className="w-4 h-4 text-luxury-gold shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-luxury-gold text-black font-semibold shadow-lg shadow-luxury-gold/20'
                    : 'bg-[#111111] text-gray-400 border border-luxury-border hover:border-luxury-gold/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-[#111111] rounded-2xl border border-luxury-border p-8">
              <p className="text-gray-400 text-sm mb-4">No guides found matching your search term.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-luxury-gold text-xs font-semibold hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="glass-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-luxury-border hover:border-luxury-gold/40 transition-all duration-300 bg-[#0d0d0d]"
                >
                  <div>
                    {/* Article Thumbnail */}
                    <Link to={`/blog/${article.slug}`} className="block relative h-48 w-full overflow-hidden bg-luxury-secondary">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />
                      <span className="absolute top-3 left-3 text-[11px] font-bold text-luxury-gold bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-luxury-gold/30">
                        {article.tag}
                      </span>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-luxury-gold" /> {article.readTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-luxury-gold" /> {article.location}
                        </span>
                      </div>

                      <Link to={`/blog/${article.slug}`}>
                        <h2 className="text-lg font-bold text-white group-hover:text-luxury-gold transition-colors leading-snug mb-3 line-clamp-2">
                          {article.title}
                        </h2>
                      </Link>

                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Article Button */}
                  <div className="p-6 pt-0 mt-auto">
                    <Link
                      to={`/blog/${article.slug}`}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-luxury-gold hover:text-black text-luxury-gold text-xs font-semibold flex items-center justify-center gap-2 border border-luxury-gold/20 hover:border-luxury-gold transition-all"
                    >
                      Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Consultation Banner */}
      <section className="py-12">
        <Container>
          <div className="bg-gradient-to-r from-luxury-secondary via-[#141414] to-luxury-secondary rounded-2xl border border-luxury-gold/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-luxury-gold uppercase tracking-wider block mb-2">Have a question about your car?</span>
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-2">
                Get a Free Paint & Surface Inspection
              </h3>
              <p className="text-gray-400 text-xs md:text-sm">
                Bring your vehicle to our Marthandam studio (Opposite KTM Bike Showroom) or message us with your paint condition for custom recommendations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://wa.me/919111977721?text=Hi%20Detailing%20Masters,%20I%20read%20your%20car%20care%20guide%20and%20would%20like%20a%20free%20paint%20inspection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs px-5 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Ask on WhatsApp
              </a>
              <a
                href="tel:9111977721"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-3 rounded-xl border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-luxury-gold" />
                +91 91119 77721
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
