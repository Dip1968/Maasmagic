import './RotatingDishes.css';

const dishes = [
  {
    name: 'Farsi Puri', category: 'Traditional', img: '/fried/farsi_puri.png', size: 'lg', delay: '0s', duration: '18s'
  },
  { name: 'Chevdo', category: 'Bestseller', img: '/fried/chevado_v2.png', size: 'xl', delay: '-6s', duration: '22s' },
  { name: 'Shakkar Para', category: 'Most Popular', img: '/fried/shakkar_para.png', size: 'lg', delay: '-12s', duration: '16s' },
];

export default function RotatingDishes() {
  return (
    <section className="rotating-dishes" id="dishes">
      <div className="container">
        <div className="section-eyebrow">Our Specialities</div>
        <h2 className="section-title">
          Handcrafted Flavours of Gujarat,<br />
          Served with Grace
        </h2>
        <p className="section-subtitle">
          From crispy Khakhra to soulful Gau ni Sev — every bite tells a story
          of tradition, love, and the warmth of a village home.
        </p>

        <div className="dishes-row">
          {dishes.map((dish, i) => (
            <div className={`dish-wrap ${i === 0 ? 'left' : i === 1 ? 'center' : 'right'}`} key={dish.name}>
              <div className={`dish-circle ${dish.size}`}>
                <div
                  className="dish-inner"
                  style={{ animationDelay: dish.delay, animationDuration: dish.duration }}
                >
                  <img src={dish.img} alt={dish.name} />
                </div>
              </div>
              <div className="dish-label">{dish.name}</div>
              <div className="dish-category">{dish.category}</div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
