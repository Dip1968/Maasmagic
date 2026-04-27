import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductsPage.css';
import '../components/ProductShowcase.css';

const rawProducts = [
  {
    name: 'Bataka ni Wafer (Raw)',
    desc: 'Paper-thin raw potato wafers. Ready to fry for a fresh, crispy snack.',
    img: '/raw_materials/bataka_wafer_raw.png',
    badge: 'Raw Material',
    price: '₹150',
    unit: 'per 1kg',
    tags: ['Ready to Fry', 'Pure'],
    category: 'Chips',
  },
  {
    name: 'Gau ni Sev (Raw)',
    desc: 'Traditional wheat sev raw material. Fry at home for authentic crunch.',
    img: '/raw_materials/gau_sev_raw.png',
    badge: 'Traditional',
    price: '₹150',
    unit: 'per 1kg',
    tags: ['Wheat', 'Classic'],
    category: 'Papad',
  },
  {
    name: 'Kanchi Papad',
    desc: 'Sun-dried raw papad made with farm-fresh ingredients.',
    img: '/raw_materials/kanchi_papad_raw.png',
    badge: 'Most Popular',
    price: '₹170',
    unit: 'per 1kg',
    tags: ['Sun-dried', 'Pure'],
    category: 'Papad',
  },
  {
    name: 'Sabudana Vadi (Raw)',
    desc: 'Sago vadi raw material. Perfect for fasting days when fried fresh.',
    img: '/raw_materials/sabudana_vadi_raw.png',
    badge: 'Fasting Special',
    price: '₹180',
    unit: 'per 1kg',
    tags: ['Fasting', 'Crispy'],
    category: 'Fasting',
  }
];

const preparedProducts = [
  {
    name: 'Nylon Poha Chevdo',
    desc: 'Crispy, sweet, and tangy roasted poha chevdo mixed with nuts.',
    img: '/fried/chevado.png',
    badge: 'Bestseller',
    price: '₹200',
    unit: 'per 1kg',
    tags: ['Crunchy', 'Prepared'],
    category: 'Namkeen',
  },
  {
    name: 'Farsi Puri',
    desc: 'Crispy and flaky Gujarati savory flatbread snack, fried to perfection.',
    img: '/fried/farsi_puri.png',
    badge: 'Traditional',
    price: '₹250',
    unit: 'per 1kg',
    tags: ['Crispy', 'Prepared'],
    category: 'Namkeen',
  },
  {
    name: 'Masala Khakhra',
    desc: 'Roasted thin flatbread infused with aromatic spices.',
    img: '/fried/khakhara_photo.png',
    badge: 'Healthy Snack',
    price: '₹200',
    unit: 'per 1kg',
    tags: ['Handmade', 'Roasted'],
    category: 'Namkeen',
  },
  {
    name: 'Shakkarpara (Normal)',
    desc: 'Savory fried diamond shapes with a hint of salt and spices.',
    img: '/fried/shakkar_para.png',
    badge: 'Classic',
    price: '₹200',
    unit: 'per 1kg',
    tags: ['Fried', 'Crunchy'],
    category: 'Namkeen',
  },
  {
    name: 'Shakkarpara (Sweet)',
    desc: 'Sweet, crispy, and bite-sized delights with sugar coating.',
    img: '/fried/shakkar_para_sweet.png',
    badge: 'Sweet Treat',
    price: '₹250',
    unit: 'per 1kg',
    tags: ['Sweet', 'Fried'],
    category: 'Sweet',
  }
];

const categories = ['All', 'Namkeen', 'Papad', 'Fasting', 'Chips', 'Sweet'];

const ProductCard = ({ product, i, sectionType }) => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const inCart = cartItems.find(item => item.name === product.name);

  return (
    <div className="product-card" key={product.name} id={`product-${sectionType}-${i}`}>
      <div className="product-card-img">
        <img src={product.img} alt={product.name} />
        <div className="product-badge">{product.badge}</div>
        <div className="veg-badge"></div>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.desc}</p>
        <div className="product-tags">
          {product.tags.map(tag => (
            <span className="product-tag" key={tag}>{tag}</span>
          ))}
        </div>
        <div className="product-card-footer">
          <div className="product-price">
            <span className="product-price-amount">{product.price}</span>
            <span className="product-price-unit">{product.unit}</span>
          </div>
          {inCart ? (
            <button className="wa-order-btn" style={{ background: 'var(--maroon)' }} onClick={() => navigate('/cart')}>
              View Cart
            </button>
          ) : (
            <button className="wa-order-btn" style={{ background: 'var(--saffron)', color: 'var(--white)' }} onClick={() => addToCart(product)}>
              + Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredRaw = activeFilter === 'All'
    ? rawProducts
    : rawProducts.filter(p => p.category === activeFilter);

  const filteredPrepared = activeFilter === 'All'
    ? preparedProducts
    : preparedProducts.filter(p => p.category === activeFilter);

  return (
    <div className="products-page">
      {/* Hero Banner */}
      <div className="products-hero">
        <div className="products-hero-bg">
          <img src="/images/cta_banner.png" alt="Our Products" />
        </div>
        <div className="products-hero-overlay"></div>
        <div className="products-hero-content">
          <h1 className="products-hero-title">
            Our <span>Products</span>
          </h1>
          <p className="products-hero-sub">
            Handcrafted Gujarati snacks made with love, tradition, and farm-fresh ingredients.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="products-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Products</span>
      </div>

      {/* Filter Bar */}
      <div className="products-filter">
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="products-count">
          Showing <strong>{filteredRaw.length + filteredPrepared.length}</strong> products
        </div>
      </div>

      {/* Health Promise Banner */}
      <div className="health-promise-banner" style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto 40px',
        padding: '24px 40px',
        background: 'linear-gradient(135deg, rgba(212,136,15,0.08), rgba(123,28,28,0.05))',
        borderRadius: '16px',
        border: '1px solid rgba(212,136,15,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '32px',
        textAlign: 'center'
      }}>
        <h4 style={{ width: '100%', fontFamily: 'var(--font-display)', color: 'var(--maroon)', fontSize: '24px', margin: '0 0 16px 0' }}>Our Heritage & Health Promise</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>🥜</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: '700', color: 'var(--charcoal)', fontSize: '14px' }}>Pure Singh Tel</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fried only in Sahaj Peanut Oil</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>🤍</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: '700', color: 'var(--charcoal)', fontSize: '14px' }}>Desi Sakar</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No refined sugar used</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>🌾</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: '700', color: 'var(--charcoal)', fontSize: '14px' }}>100% Maida Free</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Because we believe in health</div>
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <div className="products-sections-wrapper" style={{ padding: '40px 5%' }}>
        {filteredRaw.length > 0 && (
          <div className="products-section">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '70px', fontSize: '42px', color: 'var(--maroon)' }}>
              Raw Materials (Non-Fried)
            </h2>
            <div className="products-page-grid">
              {filteredRaw.map((product, i) => (
                <ProductCard key={product.name} product={product} i={i} sectionType="raw" />
              ))}
            </div>
          </div>
        )}

        {filteredPrepared.length > 0 && (
          <div className="products-section" style={{ marginTop: filteredRaw.length > 0 ? '60px' : '0' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '70px', fontSize: '42px', color: 'var(--maroon)' }}>
              Prepared Material (Fried)
            </h2>
            <div className="products-page-grid">
              {filteredPrepared.map((product, i) => (
                <ProductCard key={product.name} product={product} i={i} sectionType="prepared" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
