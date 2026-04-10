import './VillageAuthenticity.css';

const authenticPhotos = [
    {
        img: '/public/raw_materials/kanchi_papad.png',
        title: 'Sun-Dried Kanchi Papad',
        desc: 'Each papad is carefully laid out on a traditional woven Khatiya to dry under the golden village sun, absorbing the warmth and purity of nature.',
        reverse: false
    },
    {
        img: '/public/raw_materials/bataka_wafer.png',
        title: 'Handcrafted Potato Wafers',
        desc: 'Paper-thin slices of fresh potatoes spread thoughtfully to retain their natural crispness and flavor, a sight right out of a vibrant Gujarati courtyard.',
        reverse: true
    },
    {
        img: '/public/raw_materials/sabudana_vadi.png',
        title: 'Premium Sabudana Vadi',
        desc: 'Prepared with utmost devotion for fasting days, these perfectly shaped vadis are sun-dried for days to achieve that authentic crunchy texture when fried.',
        reverse: false
    },
    {
        img: '/public/raw_materials/gau_lot_sev.png',
        title: 'Traditional Gau ni Sev',
        desc: 'Strings of pure wheat sev drying gracefully on the Khatiya, carrying the heritage of grandmothers’ recipes straight to your plate.',
        reverse: true
    },
];

export default function VillageAuthenticity() {
    return (
        <section className="village-auth-section" id="authenticity">
            <div className="container">
                <div className="va-header">
                    <div className="section-eyebrow">Our Roots</div>
                    <h2 className="section-title">The Real Authenticity of <br />a Gujarat Village</h2>
                    <p className="section-subtitle">
                        Experience the time-honored tradition of sun-drying on a traditional 'Khatiya'.
                        Every batch is prepared with purity, patience, and love under the golden sky.
                    </p>
                </div>

                <div className="va-story-blocks">
                    {authenticPhotos.map((item, i) => (
                        <div className={`va-block ${item.reverse ? 'reverse' : ''}`} key={i}>
                            <div className="va-block-img">
                                <img src={item.img} alt={item.title} />
                            </div>
                            <div className="va-block-content">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                <div className="va-line"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
