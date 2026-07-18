import './Gallery.css';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80&auto=format&fit=crop',
    alt: 'Luxury car detail',
    span: 'large',
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop',
    alt: 'Paint correction result',
    span: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80&auto=format&fit=crop',
    alt: 'Interior detailing',
    span: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80&auto=format&fit=crop',
    alt: 'Ceramic coating gloss',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80&auto=format&fit=crop',
    alt: 'Wheel detailing',
    span: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop',
    alt: 'Exterior shine',
    span: 'small',
  },
];

const Gallery = () => {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="gallery-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">RESULTS THAT SPEAK</h2>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <div key={i} className={`gallery-item gallery-${img.span}`}>
              <img src={img.src} alt={img.alt} />
              <div className="gallery-hover">
                <span className="gallery-zoom">⊕</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
