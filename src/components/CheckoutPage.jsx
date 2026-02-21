import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../utils/api';
import Footer from './Footer';

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        deliveryMethod: 'Standard',
        paymentMethod: 'Bank Transfer'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setIsSubmitting(true);
        try {
            const orderPayload = {
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state
                },
                items: cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: parseFloat(item.price.replace(/[^\d.]/g, '')) || 0,
                    color: item.selectedColor,
                    size: item.selectedSize
                })),
                totalAmount: cartTotal,
                paymentMethod: formData.paymentMethod,
                deliveryMethod: formData.deliveryMethod
            };

            const result = await apiRequest(API_ENDPOINTS.orders, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            setOrderData(result);
            setOrderSuccess(true);
            clearCart();
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Checkout error:', error);
            alert('There was an error processing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-beige-50 pt-32 pb-20">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="bg-white rounded-[3rem] p-12 text-center shadow-xl border border-peach-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-peach-50 rounded-full -mr-16 -mt-16"></div>
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Order Received!</h2>
                        <p className="text-gray-600 mb-2">Thank you for choosing Olaluxe, <span className="font-bold text-gray-900">{formData.name}</span>.</p>
                        <p className="text-gray-500 font-light mb-8">Your order number is <span className="font-serif font-bold text-gold-600 tracking-wider">#{orderData?.orderNumber}</span>. We will contact you shortly via WhatsApp/Email to confirm delivery.</p>

                        <div className="bg-beige-50 rounded-3xl p-8 mb-10 text-left border border-peach-100">
                            <h3 className="font-serif font-bold text-gray-900 mb-4">Next Steps:</h3>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li className="flex items-start space-x-3">
                                    <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gold-600 shadow-sm flex-shrink-0">1</span>
                                    <span>Check your WhatsApp/Email for an order confirmation message.</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gold-600 shadow-sm flex-shrink-0">2</span>
                                    <span>For Bank Transfers, payment details will be provided during confirmation.</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gold-600 shadow-sm flex-shrink-0">3</span>
                                    <span>Once payment is verified, your exquisite pieces will be prepared for shipping.</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => navigate('/products')}
                            className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all"
                        >
                            Back to Catalog
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-beige-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-12 text-center text-decoration-gold">Secure Checkout</h1>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-lg border border-peach-50">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center">
                                <span className="w-8 h-8 bg-peach-100 text-gold-600 rounded-lg flex items-center justify-center text-sm mr-3">1</span>
                                Delivery Information
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Jane Doe"
                                            className="w-full px-5 py-4 bg-beige-50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <input
                                            required
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+234..."
                                            className="w-full px-5 py-4 bg-beige-50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="jane@example.com"
                                        className="w-full px-5 py-4 bg-beige-50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Shipping Address</label>
                                    <textarea
                                        required
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="House Number, Street Name..."
                                        className="w-full px-5 py-4 bg-beige-50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
                                        <input
                                            required
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Lekki"
                                            className="w-full px-5 py-4 bg-beige-50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">State</label>
                                        <input
                                            required
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Lagos"
                                            className="w-full px-5 py-4 bg-beige-50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-peach-100 text-gold-600 rounded-lg flex items-center justify-center text-sm mr-3">2</span>
                                        Payment & Delivery
                                    </h3>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Delivery</p>
                                            {['Standard', 'Express'].map(method => (
                                                <label key={method} className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.deliveryMethod === method ? 'border-peach-200 bg-peach-50' : 'border-beige-50 hover:border-peach-100'}`}>
                                                    <input
                                                        type="radio"
                                                        name="deliveryMethod"
                                                        value={method}
                                                        checked={formData.deliveryMethod === method}
                                                        onChange={handleChange}
                                                        className="hidden"
                                                    />
                                                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.deliveryMethod === method ? 'border-gold-600' : 'border-gray-300'}`}>
                                                        {formData.deliveryMethod === method && <div className="w-2.5 h-2.5 bg-gold-600 rounded-full"></div>}
                                                    </div>
                                                    <span className={`text-sm font-medium ${formData.deliveryMethod === method ? 'text-gray-900' : 'text-gray-500'}`}>{method} Shipping</span>
                                                </label>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Payment</p>
                                            {['Bank Transfer', 'On Delivery'].map(method => (
                                                <label key={method} className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-peach-200 bg-peach-50' : 'border-beige-50 hover:border-peach-100'}`}>
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value={method}
                                                        checked={formData.paymentMethod === method}
                                                        onChange={handleChange}
                                                        className="hidden"
                                                    />
                                                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.paymentMethod === method ? 'border-gold-600' : 'border-gray-300'}`}>
                                                        {formData.paymentMethod === method && <div className="w-2.5 h-2.5 bg-gold-600 rounded-full"></div>}
                                                    </div>
                                                    <span className={`text-sm font-medium ${formData.paymentMethod === method ? 'text-gray-900' : 'text-gray-500'}`}>{method}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-10">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || cartItems.length === 0}
                                        className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-full font-serif font-bold text-xl shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                                Processing...
                                            </div>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                Complete My Order
                                                <svg className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:sticky lg:top-32 h-fit">
                        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-lg border border-peach-50">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Order Summary</h2>

                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar mb-8">
                                {cartItems.map((item) => (
                                    <div key={`${item._id}-${item.selectedColor}`} className="flex items-center space-x-4">
                                        <div className="w-20 h-20 bg-beige-50 rounded-2xl overflow-hidden flex-shrink-0 border border-peach-50">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-serif font-bold text-gray-900 text-sm">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity} {item.selectedColor && `• ${item.selectedColor}`}</p>
                                            <p className="text-gold-600 font-serif font-bold text-sm mt-1">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                                {cartItems.length === 0 && (
                                    <p className="text-center py-8 text-gray-400 italic font-light">Your selection is empty.</p>
                                )}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-peach-50">
                                <div className="flex justify-between text-gray-600 font-light">
                                    <span>Subtotal</span>
                                    <span>₦{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-light text-decoration-gold-under">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">calculated next</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-peach-100">
                                    <span className="text-xl font-serif font-bold text-gray-900">Total</span>
                                    <span className="text-3xl font-serif font-bold text-gray-900">₦{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-10 p-6 bg-beige-50 rounded-3xl border border-peach-100 italic">
                                <p className="text-xs text-gray-500 text-center leading-relaxed font-light">
                                    "Once you place your order, we'll reach out to double check your preferences and finalize the shipping cost before you pay."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
