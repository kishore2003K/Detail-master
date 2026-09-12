import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight,
  BookOpen,
  Calendar,
  User,
  Share2
} from 'lucide-react';
import { blogArticles } from '../data/blogData';
import JsonLd from '../components/JsonLd';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);

  // Fallback to first article if not found
  const article = blogArticles[slug] || blogArticles['ceramic-coating-coastal-kanyakumari'];

  // Other related articles
  const otherArticles = Object.values(blogArticles).filter((a) => a.slug !== article.slug);

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
        name: 'Blog',
        item: 'https://detailingmasters.in/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://detailingmasters.in/blog/${article.slug}`
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://detailingmasters.in/blog/${article.slug}`
    },
    headline: article.title,
    description: article.metaDescription,
    image: `https://detailingmasters.in${article.image}`,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Detailing Masters',
      logo: {
        '@type': 'ImageObject',
        url: 'https://detailingmasters.in/brand-logo.png'
      }
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.metaDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-luxury-bg min-h-screen text-luxury-text">
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={`https://detailingmasters.in/blog/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:image" content={`https://detailingmasters.in${article.image}`} />
        <meta property="og:url" content={`https://detailingmasters.in/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* JSON-LD Schemas */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      {/* Breadcrumb Bar */}
      <div className="border-b border-luxury-border bg-black/40 py-3">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-gray-400 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <Link to="/blog" className="hover:text-luxury-gold transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-luxury-gold truncate max-w-xs md:max-w-md">{article.title}</span>
          </nav>
        </Container>
      </div>

      {/* Article Header & Hero */}
      <section className="py-12 md:py-16 relative border-b border-luxury-border bg-radial-gradient">
        <Container className="max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-luxury-gold bg-luxury-gold/10 px-3.5 py-1.5 rounded-full border border-luxury-gold/25 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{article.category} • {article.location}</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-gray-300">
                <User className="w-3.5 h-3.5 text-luxury-gold" /> {article.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-luxury-gold" /> {article.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-luxury-gold" /> {article.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-luxury-gold hover:text-white transition-colors cursor-pointer bg-luxury-gold/10 px-3 py-1.5 rounded-lg border border-luxury-gold/20"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Guide
            </button>
          </div>
        </Container>
      </section>

      {/* Main Content Layout */}
      <section className="py-12">
        <Container className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Article Text */}
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden border border-luxury-border aspect-video bg-luxury-secondary">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Table of Contents Box */}
              <div className="bg-[#111111] border border-luxury-gold/30 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-luxury-gold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Table of Contents
                </h3>
                <ul className="space-y-2 text-xs">
                  {article.tableOfContents.map((toc, index) => (
                    <li key={toc.id}>
                      <a
                        href={`#${toc.id}`}
                        className="text-gray-300 hover:text-luxury-gold transition-colors flex items-center gap-2"
                      >
                        <span className="text-luxury-gold font-bold">{index + 1}.</span>
                        <span>{toc.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content Sections */}
              <div className="space-y-8 text-sm md:text-base text-gray-300 leading-relaxed font-sans">
                {article.sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-28 space-y-3">
                    <h2 className="text-xl md:text-2xl font-bold font-heading text-white">
                      {section.heading}
                    </h2>
                    <div className="text-xs md:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Studio Master Recommendation Callout */}
              <div className="bg-luxury-gold/10 border border-luxury-gold/35 rounded-2xl p-6 flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-luxury-gold shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white text-base mb-1.5">Master Detailer Verdict</h3>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    {article.recommendation}
                  </p>
                  {article.relatedServiceSlug && (
                    <Link
                      to={`/services/${article.relatedServiceSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-gold hover:underline mt-3"
                    >
                      View our full {article.tag} service package details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* FAQ Section */}
              <div id="faq" className="scroll-mt-28 space-y-4 pt-6 border-t border-luxury-border">
                <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-luxury-gold" /> Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {article.faqs.map((faq, index) => (
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
              </div>
            </div>

            {/* Sidebar Sticky Consultation Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* Book Appointment Card */}
                <div className="bg-[#111111] border border-luxury-gold/30 rounded-2xl p-6 text-center">
                  <span className="text-[11px] font-bold text-luxury-gold uppercase tracking-wider block mb-1">Marthandam Studio</span>
                  <h3 className="text-lg font-bold text-white mb-2">Book Your Vehicle Inspection</h3>
                  <p className="text-xs text-gray-400 mb-6">
                    Complimentary paint depth inspection & consultation for all cars and superbikes.
                  </p>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/919111977721?text=Hi%20Detailing%20Masters,%20I%20read%20your%20article%20'${encodeURIComponent(article.title)}'%20and%20want%20to%20consult%20for%20my%20vehicle.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp Consultation
                    </a>
                    <a
                      href="tel:9111977721"
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/15 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-luxury-gold" /> Call Studio (+91 91119 77721)
                    </a>
                  </div>
                </div>

                {/* More Guides Card */}
                <div className="bg-[#111111] border border-luxury-border rounded-2xl p-6">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">More Detailing Guides</h4>
                  <ul className="space-y-4">
                    {otherArticles.slice(0, 3).map((other) => (
                      <li key={other.slug}>
                        <Link
                          to={`/blog/${other.slug}`}
                          className="group block"
                        >
                          <span className="text-[11px] text-luxury-gold block mb-1">{other.category}</span>
                          <h5 className="text-xs font-semibold text-gray-200 group-hover:text-luxury-gold transition-colors leading-snug line-clamp-2">
                            {other.title}
                          </h5>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-1 text-xs font-bold text-luxury-gold hover:underline mt-6 pt-4 border-t border-white/10 w-full justify-center"
                  >
                    View All Guides <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
