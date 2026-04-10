import { Link } from 'react-router-dom';
import './CTABanner.css';

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner-bg">
        <img src="/images/cta_banner.png" alt="Assorted Gujarati snacks" />
      </div>
      <div className="cta-banner-overlay"></div>
      <div className="cta-banner-content">
        <h2 className="cta-banner-title">
          Ready to add some crunch to your day?
        </h2>
        <p className="cta-banner-desc">
          Explore our range of authentic Gujarati snacks and bring home the
          taste of happiness. Fresh, handmade, and delivered to your door.
        </p>
        <Link to="/products" className="cta-banner-btn" id="cta-explore-btn">
          Explore Products
        </Link>
      </div>
      <div className="cta-decor">🌾</div>
    </section>
  );
}
