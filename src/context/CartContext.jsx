import { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';
import { getVariantById } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { products } = useProducts();
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('village_cart');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { return []; }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('village_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setCartItems(prev => prev.map(item => {
            const latest = products.find(product => product.id === item.productId || product.id === item.id || product.name === item.name);
            if (!latest) return item;
            const latestVariant = getVariantById(latest, item.variantId);

            return {
                ...item,
                productId: latest.id,
                name: latest.name,
                img: latest.img,
                badge: latest.badge,
                category: latest.category,
                variantId: latestVariant.id,
                variantLabel: latestVariant.label,
                price: latestVariant.price,
                stock: latestVariant.stock,
                quantity: Math.min(item.quantity, latestVariant.stock),
            };
        }).filter(item => item.quantity > 0));
    }, [products]);

    const addToCart = (product, variant) => {
        setCartItems(prev => {
            if (!variant || variant.stock <= 0) return prev;

            const cartId = `${product.id}-${variant.id}`;
            const existing = prev.find(item => item.id === cartId);
            if (existing) {
                if (existing.quantity >= variant.stock) return prev;
                return prev.map(item =>
                    item.id === cartId ? { ...item, quantity: item.quantity + 1, stock: variant.stock, price: variant.price } : item
                );
            }
            return [...prev, {
                id: cartId,
                productId: product.id,
                name: product.name,
                img: product.img,
                variantId: variant.id,
                variantLabel: variant.label,
                price: variant.price,
                stock: variant.stock,
                quantity: 1
            }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const latest = products.find(product => product.id === item.productId);
                const latestVariant = latest ? getVariantById(latest, item.variantId) : null;
                const maxStock = latestVariant?.stock ?? item.stock ?? Infinity;
                const newQty = item.quantity + amount;
                if (newQty <= 0) return null;
                return { ...item, quantity: Math.min(newQty, maxStock), stock: maxStock, price: latestVariant?.price ?? item.price };
            }
            return item;
        }).filter(Boolean).filter(item => item.quantity > 0));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = Number(item.price) || 0;
            return total + (price * item.quantity);
        }, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
