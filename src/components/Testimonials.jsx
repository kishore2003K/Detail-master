import './Testimonials.css';

const reviews = [
  {
    rating: 5,
    text: "I washed my bike here today and had a great experience. The staff are polite and professional, and the place is well maintained neat, clean, and organised. Their basic foam wash costs ₹250, and the service quality is excellent. They also offer washing and detailing services for cars, making it a convenient spot for all vehicle owners. Highly recommended for anyone looking for quality bike or car wash in Marthandam!",
    initials: 'A',
    name: 'ABHI',
    detail: 'Customer',
  },
  {
    rating: 5,
    text: "I recently visited Detailing Masters for a full car wash and interior cleaning, and I’m extremely impressed with the results. They paid great attention to detail, leaving the interior spotless and the exterior with a perfect shine. The staff is professional, and the service was quick. Definitely the best place in the area for car detailing at a reasonable price. Highly recommended.",
    initials: 'S',
    name: 'subair',
    detail: 'Customer',
  },
  {
    rating: 5,
    text: "I suggest detailing masters for those who in search of a good car wash .Very well behaved stafs , 4 people will work on your vehicle and finishes of in given time more than time the quality of work speaks here , I haven’t seen this kind of quality work in Marthandam compared to city’s and the customer waiting area is neat comfortable and air conditioned .",
    initials: 'VV',
    name: 'vishal vexus',
    detail: 'Customer',
  },
  {
    rating: 5,
    text: "I suggest detailing masters for those who are search for a good detailing studio. Well behaved staff and management. Good atmosphere.",
    initials: 'RM',
    name: 'Ron Markose',
    detail: 'Customer',
  },
  {
    rating: 5,
    text: "I strongly recommend detailing masters.. I am impressed with their services, professional and loyal to their work..",
    initials: 'CC',
    name: 'Chinnu Chinnu',
    detail: 'Customer',
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
