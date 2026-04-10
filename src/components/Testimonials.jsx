import './Testimonials.css';

const testimonials = [
  {
    text: "The Khakhra tastes exactly like what my grandmother used to make. I can taste the love and tradition in every bite. Absolutely incredible quality!",
    name: "Priya Patel",
    location: "Mumbai, Maharashtra",
    initials: "PP",
    rating: 5,
  },
  {
    text: "Finally found authentic Gujarati snacks in the city! The Gau ni Sev is out of this world. My whole family is addicted. We order every month now.",
    name: "Rajesh Sharma",
    location: "Ahmedabad, Gujarat",
    initials: "RS",
    rating: 5,
  },
  {
    text: "The Sabudana Vadi during Navratri fasting was a lifesaver. So crispy and flavourful! And I love that everything is handmade with no preservatives.",
    name: "Meena Desai",
    location: "Pune, Maharashtra",
    initials: "MD",
    rating: 5,
  },
  {
    text: "I was skeptical about ordering snacks online, but the freshness and packaging blew me away. The Chokha Papad is now a staple in our household!",
    name: "Amit Joshi",
    location: "Bangalore, Karnataka",
    initials: "AJ",
    rating: 5,
  },
  {
    text: "Ordered for a Diwali party and everyone kept asking where I got these from. The Bataka Wafer disappeared in minutes! Best quality I've ever had.",
    name: "Sneha Mehta",
    location: "Delhi, NCR",
    initials: "SM",
    rating: 5,
  },
  {
    text: "As a Gujarati living abroad, these snacks brought me right back home. The taste is so pure and authentic — tears of joy with every bite. Thank you, Gruh Udhyog!",
    name: "Kiran Dave",
    location: "Dubai, UAE",
    initials: "KD",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <div className="section-eyebrow">What Our Customers Say</div>
          <h2 className="section-title">
            Loved by Families<br />Across India
          </h2>
          <p className="section-subtitle">
            Real stories from real customers who've tasted the authenticity
            of our village-made snacks.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i} id={`testimonial-${i}`}>
              <div className="testimonial-quote-icon">"</div>
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }, (_, j) => (
                  <span className="star" key={j}>★</span>
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <span className="testimonial-author-name">{t.name}</span>
                  <span className="testimonial-author-loc">{t.location}</span>
                  <span className="verified-badge">Verified Purchase</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-overall">
          <span className="overall-rating">4.9</span>
          <div className="overall-info">
            <div className="overall-stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            <span className="overall-text">Based on 500+ happy customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
