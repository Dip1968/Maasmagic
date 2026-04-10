import './StorySection.css';

export default function StorySection() {
  return (
    <section className="story-section" id="about">
      <div className="story-grid">
        {/* Image Side */}
        <div className="story-image-wrap">
          <div className="story-frame"></div>
          <div className="story-image">
            <img src="/images/village_story.png" alt="Gujarat Village — Where our story begins" />
          </div>
          <div className="story-image-badge">
            <span className="badge-number">25+</span>
            <span className="badge-text">Years of</span>
            <span className="badge-text">Tradition</span>
          </div>
        </div>

        {/* Text Side */}
        <div className="story-content">
          <div className="section-eyebrow">Our Story</div>
          <h2 className="section-title">
            From Village Hearths<br />
            to Your Home
          </h2>
          <p className="story-text">
            In the heart of Gujarat's villages, <strong>women gather every summer</strong> at
            one home, sharing laughter and recipes passed down through generations.
            With hands skilled by decades of practice, they craft snacks using
            <strong> farm-fresh ingredients</strong> — from hand-ground spices to stone-cold
            pressed oils.
          </p>
          <p className="story-text">
            Every Khakhra is rolled by hand, every Sev is pressed with love,
            and every Papad is sun-dried under the warm Gujarat sky. This is not
            just food — it's a tradition, a livelihood, and a promise of purity.
          </p>

          <div className="story-quote">
            "Ghar no swad — the taste of home, in every single bite."
          </div>

          <div className="trust-badges">
            <div className="trust-badge" id="badge-hygiene">
              <div className="trust-badge-icon">🥜</div>
              <div>
                <div className="trust-badge-text">Pure Singh Tel</div>
                <div className="trust-badge-sub">Only Sahaj Peanut Oil</div>
              </div>
            </div>
            <div className="trust-badge" id="badge-fresh">
              <div className="trust-badge-icon">🌾</div>
              <div>
                <div className="trust-badge-text">100% Maida Free</div>
                <div className="trust-badge-sub">We believe in health</div>
              </div>
            </div>
            <div className="trust-badge" id="badge-sugar">
              <div className="trust-badge-icon">🤍</div>
              <div>
                <div className="trust-badge-text">Only Desi Sakar</div>
                <div className="trust-badge-sub">No refined sugar</div>
              </div>
            </div>
            <div className="trust-badge" id="badge-handmade">
              <div className="trust-badge-icon">🤲</div>
              <div>
                <div className="trust-badge-text">Handmade Purity</div>
                <div className="trust-badge-sub">No preservatives</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
