import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen, MapPin } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionTitle } from "./ui/SectionTitle";
import { blogArticles } from "../data/blogData";

const articles = Object.values(blogArticles).slice(0, 4);

export default function Blog() {
  return (
    <section id="blog" className="py-24 relative bg-[#070707] border-t border-luxury-border">
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-14">
          <SectionTitle
            title="Local Car & Bike Care Hub"
            subtitle="Marthandam & Kanyakumari Expert Guides"
            align="left"
            className="mb-0"
          />
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-luxury-gold bg-luxury-gold/10 hover:bg-luxury-gold hover:text-black px-4 py-2 rounded-full border border-luxury-gold/25 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="glass-card group flex flex-col justify-between overflow-hidden rounded-2xl hover:border-luxury-gold/40 transition-all duration-300 bg-[#0d0d0d]"
            >
              <div>
                {/* Article Image */}
                <Link to={`/blog/${article.slug}`} className="block relative h-44 w-full overflow-hidden bg-luxury-secondary">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold text-luxury-gold bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-luxury-gold/30">
                    {article.tag}
                  </span>
                </Link>

                {/* Body Content */}
                <div className="p-5">
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
                    <h3 className="text-base font-bold text-white group-hover:text-luxury-gold transition-colors leading-snug mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 mt-auto">
                <Link
                  to={`/blog/${article.slug}`}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-luxury-gold hover:text-black text-luxury-gold text-xs font-semibold flex items-center justify-center gap-2 border border-luxury-gold/20 hover:border-luxury-gold transition-all"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
