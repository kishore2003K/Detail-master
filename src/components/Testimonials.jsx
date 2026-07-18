import './Testimonials.css';

const reviews = [
  {
    rating: 5,
    text: "I brought in my BMW M4 for a full detail and ceramic coating. The result was absolutely stunning — the paint looked better than when I first bought it. DETAILMASTER is the real deal.",
    initials: 'JR',
    name: 'James Rodriguez',
    detail: 'BMW M4 Owner',
  },
  {
    rating: 5,
    text: "My Tesla needed serious interior help after a cross-country move. DETAILMASTER made it spotless. Truly meticulous work from a team that genuinely cares about every detail.",
    initials: 'SM',
    name: 'Sarah Mitchell',
    detail: 'Tesla Model S Owner',
  },
  {
    rating: 5,
    text: "As a car enthusiast, I'm extremely picky. DETAILMASTER exceeded every expectation. Paint correction on my Porsche was flawless. These folks are true artists with a buffer.",
    initials: 'DL',
    name: 'David Lee',
    detail: 'Porsche 911 Owner',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials" id="reviews">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-label">Client Reviews</span>
          <h2 className="section-title">WHAT OUR CLIENTS SAY</h2>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">
                {'★'.repeat(review.rating)}
              </div>
              <p className="testimonial-text">"{review.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{review.initials}</div>
                <div>
                  <h4 className="author-name">{review.name}</h4>
                  <p className="author-detail">{review.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
