import { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';

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
            const latest = products.find(product => product.id === item.id || product.name === item.name);
            if (!latest) return item;

            return {
                ...item,
                ...latest,
                quantity: Math.min(item.quantity, latest.stock),
            };
        }).filter(item => item.quantity > 0));
    }, [products]);

    const addToCart = (product) => {
        setCartItems(prev => {
            if (product.stock <= 0) return prev;

            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) return prev;
                return prev.map(item =>
                    item.id === product.id ? { ...item, ...product, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const latest = products.find(product => product.id === id);
                const maxStock = latest?.stock ?? item.stock ?? Infinity;
                const newQty = item.quantity + amount;
                if (newQty <= 0) return null;
                return { ...item, quantity: Math.min(newQty, maxStock) };
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
