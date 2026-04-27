import { Link } from 'react-router-dom';
import './Footer.css';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  return (
    <>
      <footer className="footer" id="contact">
        <div className="footer-border"></div>
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/logo.png" alt="Maa's Magic" style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--white)', padding: '4px', objectFit: 'contain' }} />
              <span className="footer-brand-name">MAA'S MAGIC</span>
            </div>
            <p className="footer-brand-desc">
              Authentic Gujarati village foods, handmade with love by village
              women using farm-fresh ingredients. Bringing the taste of home
              to your doorstep.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" title="Instagram" style={{ color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" title="Facebook" style={{ color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" title="YouTube" style={{ color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" title="Twitter" style={{ color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <a href="/#about">Our Story</a>
              <Link to="/products">Products</Link>
              <a href="/#reviews">Reviews</a>
              <a href="/#contact">Contact Us</a>
            </div>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h4>Products</h4>
            <div className="footer-links">
              <Link to="/products">Masala Khakhra</Link>
              <Link to="/products">Gau ni Sev</Link>
              <Link to="/products">Chokha Papad</Link>
              <Link to="/products">Sabudana Vadi</Link>
              <Link to="/products">Bataka ni Wafer</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Get in Touch</h4>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <div className="footer-contact-text">
                <strong>Address</strong>
                Salatpur, Talod, Gujarat, India
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📞</div>
              <div className="footer-contact-text">
                <strong>Phone</strong>
                +91 7984300882
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉️</div>
              <div className="footer-contact-text">
                <strong>Email</strong>
                maamagic@gmail.com
              </div>
            </div>
            <button className="footer-wa-btn" id="footer-wa-btn" onClick={() => window.open('https://wa.me/917984300882', '_blank')}>
              <WhatsAppIcon />
              Chat on WhatsApp
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 <span>Maa's Magic</span>. All rights reserved.
          </div>
          <div className="footer-tagline">Made with ❤️ in Gujarat</div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div 
        className="floating-wa" 
        id="floating-whatsapp" 
        title="Chat with us on WhatsApp"
        onClick={() => window.open('https://wa.me/917984300882', '_blank')}
        style={{ cursor: 'pointer' }}
      >
        <WhatsAppIcon />
        <span className="floating-wa-badge">1</span>
      </div>
    </>
  );
}
