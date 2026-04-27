import { Link } from 'react-router-dom';
import './BestSellers.css';

const bestSellers = [
  { name: 'Masala Khakhra', price: '₹120', img: '/fried/khakhara_photo.png' },
  { name: 'Chevdo', price: '₹150', img: '/fried/chevado.png' },
  { name: 'Bataka Wafer', price: '₹130', img: '/raw_materials/bataka_wafer.png' },
  { name: 'Chokha Papad', price: '₹100', img: '/raw_materials/kanchi_papad.png' },
];

export default function BestSellers() {
  return (
    <section className="best-sellers" id="best-sellers">
      <div className="container">
        <h2 className="best-sellers-title">
          Our <span>Best Selling</span> Products
        </h2>
        <p className="best-sellers-sub">
          Loved by thousands of families across India — these are the flavours
          everyone keeps coming back for.
        </p>

        <div className="bestseller-grid">
          {bestSellers.map((item) => (
            <Link to="/products" className="bestseller-item" key={item.name}>
              <div className="bestseller-img-wrap">
                <img src={item.img} alt={item.name} />
                <div className="bestseller-overlay">
                  <span className="bestseller-quick-btn">View Details</span>
                </div>
              </div>
              <div className="bestseller-name">{item.name}</div>
              <div className="bestseller-price">{item.price}</div>
            </Link>
          ))}
        </div>

        <Link to="/products" className="view-all-btn" id="view-all-products-btn">
          View All Products <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
