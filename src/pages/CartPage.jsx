import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './CartPage.css';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        deliveryDate: 'Next Tuesday (Guaranteed)'
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (!formData.name || !formData.phone || !formData.address) {
            alert("Please fill in Name, Phone, and Address details.");
            return;
        }

        // Build WhatsApp message
        let message = `🛒 *New Order from Maa's Magic*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Name: ${formData.name}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n`;
        message += `Delivery Date: *${formData.deliveryDate}*\n\n`;

        message += `*Order Items:*\n`;
        cartItems.forEach((item, index) => {
            const price = Number(item.price) || 0;
            message += `${index + 1}. ${item.name} (${item.variantLabel})\n   ${item.quantity} x ₹${price} = ₹${item.quantity * price}\n`;
        });

        const total = getCartTotal();
        message += `\n*Total Amount:* ₹${total}\n`;
        message += `*Payment Method:* Cash on Delivery (COD)\n\n`;
        message += `Thank you for choosing authentic village flavors!`;

        // Encode and redirect
        const url = `https://wa.me/917984300882?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page-empty">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any authentic Gujarati snacks yet.</p>
                <Link to="/products" className="cart-btn-primary">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="cart-title">Your Cart</h1>

                <div className="cart-layout">
                    {/* Cart Items List */}
                    <div className="cart-items-section">
                        <div className="cart-items-header">
                            <span>Product</span>
                            <span>Quantity</span>
                            <span>Total</span>
                        </div>

                        {cartItems.map((item, i) => {
                            const price = Number(item.price) || 0;
                            const itemTotal = price * item.quantity;

                            return (
                                <div className="cart-item" key={item.id || i}>
                                    <div className="cart-item-product">
                                        <img src={item.img} alt={item.name} />
                                        <div className="cart-item-info">
                                            <h3>{item.name}</h3>
                                            <p>{formatPrice(item.price)} per {item.variantLabel}</p>
                                        </div>
                                    </div>

                                    <div className="cart-item-qty">
                                        <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= item.stock}>+</button>
                                    </div>

                                    <div className="cart-item-total">
                                        ₹{itemTotal}
                                        <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="cart-subtotal">
                            Subtotal: <strong>₹{getCartTotal()}</strong>
                        </div>
                    </div>

                    {/* Checkout / Address Form */}
                    <div className="cart-checkout-section">
                        <h2>Delivery Details</h2>
                        <form className="checkout-form" onSubmit={handleCheckout}>
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Your WhatsApp No." />
                            </div>
                            <div className="form-group">
                                <label>Delivery Address *</label>
                                <textarea name="address" value={formData.address} onChange={handleInputChange} required placeholder="Street, Flat No., Landmark" rows="3"></textarea>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City Name" />
                                </div>
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="ZIP Code" />
                                </div>
                            </div>

                            <div className="delivery-date-banner">
                                <span>🚚 Delivery Date:</span>
                                <strong>{formData.deliveryDate}</strong>
                            </div>

                            <div className="form-group" style={{ background: 'var(--cream-light)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', marginBottom: '24px' }}>
                                <label style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>💳 Payment Method</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <input type="radio" checked readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--saffron)' }} />
                                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--maroon)' }}>Cash on Delivery (COD)</span>
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', marginLeft: '30px' }}>Pay directly at your doorstep when your order arrives.</div>
                            </div>

                            <div className="checkout-total-row">
                                <span>Total Amount to Pay</span>
                                <strong>₹{getCartTotal()}</strong>
                            </div>

                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', textAlign: 'center' }}>
                                Clicking the button below will open WhatsApp with your full order details ready to send. We will reply instantly to confirm!
                            </div>

                            <button type="submit" className="wa-checkout-btn">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Send Order via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
