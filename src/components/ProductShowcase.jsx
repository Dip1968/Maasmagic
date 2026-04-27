import './ProductShowcase.css';

const products = [
  {
    name: 'Masala Khakhra',
    desc: 'Crispy, thin flatbread infused with aromatic spices. Perfect with chai or as a light snack anytime.',
    img: '/fried/khakhara_photo.png',
    badge: 'Bestseller',
    price: '₹120',
    unit: 'per 200g pack',
    tags: ['Handmade', 'Spicy', 'Crispy'],
  },
  {
    name: 'Gau ni Sev',
    desc: 'Traditional thin vermicelli sev made from gram flour — a village classic with an irresistible crunch.',
    img: '/raw_materials/gau_lot_sev.png',
    badge: 'Traditional',
    price: '₹150',
    unit: 'per 250g pack',
    tags: ['Village Recipe', 'Crunchy', 'Classic'],
  },
  {
    name: 'Chokha Papad',
    desc: 'Sun-dried lentil papad made with farm-fresh ingredients. Crispy, pure, and utterly addictive.',
    img: '/raw_materials/kanchi_papad.png',
    badge: 'Most Popular',
    price: '₹100',
    unit: 'per 200g pack',
    tags: ['Sun-dried', 'No Oil', 'Pure'],
  },
  {
    name: 'Sabudana Vadi',
    desc: 'Golden-fried sago fritters with peanuts and spices — the perfect fasting snack with rustic flavour.',
    img: '/raw_materials/sabudana_vadi.png',
    badge: 'Fasting Special',
    price: '₹180',
    unit: 'per 200g pack',
    tags: ['Fasting', 'Protein-rich', 'Crispy'],
  },
  {
    name: 'Bataka ni Wafer',
    desc: 'Paper-thin potato wafers fried to golden perfection. A timeless Gujarati favourite for every occasion.',
    img: '/raw_materials/bataka_wafer.png',
    badge: "Everyone's Choice",
    price: '₹130',
    unit: 'per 250g pack',
    tags: ['Thin & Crispy', 'Classic', 'Family Pack'],
  },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ProductShowcase() {
  return (
    <section className="product-showcase" id="products">
      <div className="container">
        <div className="product-header">
          <div className="section-eyebrow">Our Products</div>
          <h2 className="section-title">
            Taste the Authentic<br />Village Flavours
          </h2>
          <p className="section-subtitle">
            Each product is handcrafted in small batches, ensuring freshness,
            quality, and the authentic taste of Gujarat.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product, i) => (
            <div className="product-card" key={product.name} id={`product-card-${i}`}>
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
                  <button className="wa-order-btn" id={`wa-btn-${i}`} onClick={() => window.open(`https://wa.me/917984300882?text=${encodeURIComponent('Hi, I am interested in ordering ' + product.name)}`, '_blank')}>
                    <WhatsAppIcon />
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="product-cta-wrap">
          <p className="product-cta-text">Looking for bulk orders or custom packs?</p>
          <a className="product-cta-link" href="#contact">
            Contact us for special orders →
          </a>
        </div>
      </div>
    </section>
  );
}
