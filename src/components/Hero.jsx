import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background Image */}
      <div className="hero-bg">
        <img src="/images/hero_bg.png" alt="Authentic Gujarati Village Kitchen" />
      </div>

      {/* Film Grain */}
      <div className="hero-grain"></div>

      {/* Gradient Overlay */}
      <div className="hero-overlay"></div>

      {/* Decorative Glow */}
      <div className="hero-glow"></div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span className="hero-badge-text">Handcrafted with Love</span>
          </div>

          <h1 className="hero-title">
            Straight from the<br />
            Village Kitchen —<br />
            <span className="highlight">Every Bite!</span>
          </h1>

          <p className="hero-subtitle">
            Authentic, handmade Gujarati snacks crafted by village women
            using farm-fresh ingredients. Pure, hygienic, and made with
            generations of love.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-btn-primary" id="hero-explore-btn">
              Explore Products
            </Link>
            <a href="#about" className="hero-btn-secondary" id="hero-story-btn">
              <span className="play-icon"></span>
              Our Story
            </a>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="hero-stats" style={{ display: 'none' }}>
          {/* Stats shown on desktop via absolute positioning */}
        </div>
      </div>

      {/* Desktop Stats */}
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-number">25+</div>
          <div className="hero-stat-label">Years Tradition</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-number">5K+</div>
          <div className="hero-stat-label">Happy Families</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-number">100%</div>
          <div className="hero-stat-label">Farm Fresh</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <div className="scroll-mouse"></div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}
