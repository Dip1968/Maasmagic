import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
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

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.name === product.name);
            if (existing) {
                return prev.map(item =>
                    item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (name) => {
        setCartItems(prev => prev.filter(item => item.name !== name));
    };

    const updateQuantity = (name, amount) => {
        setCartItems(prev => prev.map(item => {
            if (item.name === name) {
                const newQty = item.quantity + amount;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
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
