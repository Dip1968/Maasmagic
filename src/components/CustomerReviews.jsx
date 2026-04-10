import './CustomerReviews.css';

const reviews = [
  {
    text: '"The snacks from Maa\'s Magic remind me of homemade taste. The sev and bhujia are so fresh and crunchy — it feels like they are made with real care. My family loves them with evening tea!"',
    name: 'Sagar R',
    location: 'Ahmedabad',
    rating: 5,
  },
  {
    text: '"We always keep a packet of Maa\'s Magic namkeen at home. Whether it\'s guests, kids, or just a quick snack for ourselves, it\'s our go-to. Truly tasty and trustworthy."',
    name: 'Jeel & Jahanavi',
    location: 'Himmatnagar',
    rating: 5,
  },
  {
    text: '"I ordered the Khakhra and Bataka Wafer combo, and honestly, I couldn\'t stop eating! The crispiness is next-level. Will definitely be ordering again for our family gatherings."',
    name: 'Smit Patel',
    location: 'Surat',
    rating: 5,
  },
  {
    text: '"As a Gujarati living in Bangalore, finding authentic village-style snacks was impossible — until I found Maa\'s Magic. The Chokha Papad takes me back home every time!"',
    name: 'Deep Patel',
    location: 'Bangalore',
    rating: 5,
  },
];

export default function CustomerReviews() {
  return (
    <section className="customer-reviews" id="reviews">
      <div className="container">
        <h2 className="reviews-title">
          What <span>Our Customer</span> Says
        </h2>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <div className="review-card" key={i} id={`review-card-${i}`}>
              <div className="review-stars">
                {Array.from({ length: review.rating }, (_, j) => (
                  <span className="star" key={j}>★</span>
                ))}
              </div>
              <p className="review-text">{review.text}</p>
              <div className="review-author">{review.name}</div>
              <div className="review-location">{review.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
