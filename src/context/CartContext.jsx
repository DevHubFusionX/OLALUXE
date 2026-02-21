import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('olaluxe_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error parsing cart data', e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('olaluxe_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item =>
                item._id === product._id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item === existingItem
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevItems, { ...product, quantity, selectedColor, selectedSize }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId, selectedColor = null, selectedSize = null) => {
        setCartItems(prevItems => prevItems.filter(item =>
            !(item._id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
        ));
    };

    const updateQuantity = (productId, quantity, selectedColor = null, selectedSize = null) => {
        if (quantity < 1) return;
        setCartItems(prevItems => prevItems.map(item =>
            (item._id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        return total + (price * item.quantity);
    }, 0);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            isCartOpen,
            setIsCartOpen,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
