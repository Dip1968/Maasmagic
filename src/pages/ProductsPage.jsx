import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { categories, formatPrice } from '../data/products';
import './ProductsPage.css';
import '../components/ProductShowcase.css';

const ProductCard = ({ product, i, sectionType }) => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const inCart = cartItems.find(item => item.id === product.id);
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="product-card" key={product.name} id={`product-${sectionType}-${i}`}>
      <div className="product-card-img">
        <img src={product.img} alt={product.name} />
        <div className="product-badge">{product.badge}</div>
        <div className="veg-badge"></div>
        {isOutOfStock && <div className="product-stock-pill">Out of Stock</div>}
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
            <span className="product-price-amount">{formatPrice(product.price)}</span>
            <span className="product-price-unit">{product.unit}</span>
          </div>
          {inCart ? (
            <button className="wa-order-btn" style={{ background: 'var(--maroon)' }} onClick={() => navigate('/cart')}>
              View Cart
            </button>
          ) : isOutOfStock ? (
            <button className="wa-order-btn disabled">
              Out of Stock
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
  const { products } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeProducts = products.filter((product) => product.isActive);
  const filteredRaw = activeFilter === 'All'
    ? activeProducts.filter((product) => product.section === 'raw')
    : activeProducts.filter((product) => product.section === 'raw' && product.category === activeFilter);

  const filteredPrepared = activeFilter === 'All'
    ? activeProducts.filter((product) => product.section === 'prepared')
    : activeProducts.filter((product) => product.section === 'prepared' && product.category === activeFilter);

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
