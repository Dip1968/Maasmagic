import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // On non-home pages, always show scrolled (opaque) style
  const navClass = `navbar ${scrolled || !isHome ? 'scrolled' : ''}`;

  return (
    <>
      <nav className={navClass} id="main-nav">
        <Link to="/" className="nav-logo">
          <img src="/images/logo.png" alt="Maa's Magic Logo" className="nav-logo-img" />
          <div className="nav-brand">
            <div className="nav-brand-name">MAA'S MAGIC</div>
            <div className="nav-brand-sub">Authentic Gujarati village Nasta</div>
          </div>
        </Link>

        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <a className="nav-link" href={isHome ? '#about' : '/#about'}>About Us</a>
          <Link className="nav-link" to="/products">Products</Link>
          <a className="nav-link" href={isHome ? '#reviews' : '/#reviews'}>Reviews</a>
          <a className="nav-link" href={isHome ? '#contact' : '/#contact'}>Contact</a>
          <Link to="/cart" className="nav-cta" id="nav-order-btn" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>🛒 Cart</span>
            {cartCount > 0 && <span style={{ background: 'var(--white)', color: 'var(--saffron)', borderRadius: '50%', padding: '2px 8px', fontSize: '11px', fontWeight: 800 }}>{cartCount}</span>}
          </Link>
        </div>

        <div className="nav-mobile-right">
          <Link to="/cart" className="mobile-cart-btn" style={{ display: 'none', position: 'relative', marginTop: '3px' }}>
            <svg className="mobile-cart-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
          </Link>
          <div className={`nav-hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} id="hamburger-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <a href={isHome ? '#about' : '/#about'} onClick={toggleMenu}>About Us</a>
        <Link to="/products" onClick={toggleMenu}>Products</Link>
        <a href={isHome ? '#reviews' : '/#reviews'} onClick={toggleMenu}>Reviews</a>
        <a href={isHome ? '#contact' : '/#contact'} onClick={toggleMenu}>Contact Us</a>
      </div>
    </>
  );
}
