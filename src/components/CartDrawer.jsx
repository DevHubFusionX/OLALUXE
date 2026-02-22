import React, { useEffect } from 'react';
import { FaTimes, FaMinus, FaPlus, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
    const navigate = useNavigate();

    // Lock body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* ——— Mobile: full-screen slide-up sheet ——— */}
            <div className="md:hidden absolute inset-0 flex flex-col bg-white animate-slide-up z-10">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-peach-50 bg-beige-50 flex-shrink-0"
                    style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
                    <div className="flex items-center space-x-2">
                        <FaShoppingCart className="text-gold-600" size={18} />
                        <h2 className="text-lg font-serif font-bold text-gray-900">Your Selection</h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-peach-50 rounded-full transition-colors"
                    >
                        <FaTimes className="text-gray-500" size={18} />
                    </button>
                </div>

                {/* Items – scrollable */}
                <div className="flex-1 overflow-y-auto px-5 py-5 mobile-scroll">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                            <div className="w-20 h-20 bg-beige-50 rounded-full flex items-center justify-center">
                                <FaShoppingCart className="text-peach-200" size={32} />
                            </div>
                            <p className="text-gray-500 font-light text-base">Your selection is currently empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-gold-600 font-semibold text-base hover:underline"
                            >
                                Continue Browsing
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {cartItems.map((item) => (
                                <div key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
                                    className="flex space-x-4 bg-white rounded-2xl p-3 border border-peach-50 shadow-sm">
                                    <div className="w-20 h-20 bg-beige-50 rounded-xl overflow-hidden flex-shrink-0 border border-peach-50">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className="font-serif font-bold text-gray-900 text-sm leading-tight truncate">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item._id, item.selectedColor, item.selectedSize)}
                                                className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                        {(item.selectedColor || item.selectedSize) && (
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {item.selectedColor && `Color: ${item.selectedColor}`}
                                                {item.selectedSize && ` • Size: ${item.selectedSize}`}
                                            </p>
                                        )}
                                        <div className="mt-auto pt-2 flex justify-between items-center">
                                            <div className="flex items-center border border-peach-100 rounded-lg bg-white overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-peach-50 text-gray-500 transition-colors"
                                                >
                                                    <FaMinus size={10} />
                                                </button>
                                                <span className="px-2 text-sm font-medium text-gray-700 min-w-[2rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-peach-50 text-gray-500 transition-colors"
                                                >
                                                    <FaPlus size={10} />
                                                </button>
                                            </div>
                                            <p className="font-serif font-bold text-gray-900 text-sm">{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer – sticky at bottom */}
                {cartItems.length > 0 && (
                    <div className="flex-shrink-0 px-5 py-5 bg-beige-50 border-t border-peach-50 space-y-4"
                        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-light">Subtotal</span>
                            <span className="text-xl font-serif font-bold text-gray-900">
                                ₦{cartTotal.toLocaleString()}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 italic">
                            * Shipping calculated at checkout.
                        </p>
                        <div className="space-y-2.5">
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-full font-bold shadow-xl transition-all active:scale-[0.98]"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="w-full bg-white text-gray-900 py-3 rounded-full font-medium border border-peach-100 hover:bg-peach-50 transition-all active:scale-[0.98]"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ——— Desktop / Tablet: side drawer ——— */}
            <div className="hidden md:flex absolute inset-y-0 right-0 max-w-full">
                <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-2xl animate-slide-in-right">
                        {/* Header */}
                        <div className="px-6 py-6 border-b border-peach-50 flex items-center justify-between bg-beige-50">
                            <div className="flex items-center space-x-3">
                                <FaShoppingCart className="text-gold-600" />
                                <h2 className="text-xl font-serif font-bold text-gray-900">Your Selection</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-peach-50 rounded-full transition-colors"
                            >
                                <FaTimes className="text-gray-400 hover:text-gray-600" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-beige-50 rounded-full flex items-center justify-center">
                                        <FaShoppingCart className="text-peach-200" size={32} />
                                    </div>
                                    <p className="text-gray-500 font-light">Your selection is currently empty.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-gold-600 font-medium hover:underline"
                                    >
                                        Continue Browsing
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={`${item._id}-${item.selectedColor}-${item.selectedSize}`} className="flex space-x-4">
                                            <div className="w-24 h-24 bg-beige-50 rounded-2xl overflow-hidden flex-shrink-0 border border-peach-50">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between">
                                                    <h4 className="font-serif font-bold text-gray-900 text-sm">{item.name}</h4>
                                                    <button
                                                        onClick={() => removeFromCart(item._id, item.selectedColor, item.selectedSize)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.selectedColor && `Color: ${item.selectedColor}`}
                                                    {item.selectedSize && ` • Size: ${item.selectedSize}`}
                                                </p>
                                                <div className="mt-auto flex justify-between items-center">
                                                    <div className="flex items-center border border-peach-100 rounded-lg bg-white overflow-hidden">
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                                                            className="p-1 px-2 hover:bg-peach-50 text-gray-500 transition-colors"
                                                        >
                                                            <FaMinus size={10} />
                                                        </button>
                                                        <span className="px-2 text-sm font-medium text-gray-700 min-w-[2rem] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                                                            className="p-1 px-2 hover:bg-peach-50 text-gray-500 transition-colors"
                                                        >
                                                            <FaPlus size={10} />
                                                        </button>
                                                    </div>
                                                    <p className="font-serif font-bold text-gray-900">{item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="px-6 py-8 bg-beige-50 border-t border-peach-50 space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-light">Subtotal</span>
                                    <span className="text-2xl font-serif font-bold text-gray-900">
                                        ₦{cartTotal.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 italic">
                                    * Shipping and taxes calculated at checkout.
                                </p>
                                <div className="space-y-3">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-full font-bold shadow-xl transition-all transform hover:scale-[1.02]"
                                    >
                                        Proceed to Checkout
                                    </button>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="w-full bg-white text-gray-900 py-3 rounded-full font-medium border border-peach-100 hover:bg-peach-50 transition-all"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
