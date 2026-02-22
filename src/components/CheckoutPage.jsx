import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../utils/api';
import { FaShoppingBag, FaTruck, FaCreditCard, FaCheck, FaArrowLeft, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Footer from './Footer';

const STEPS = [
    { id: 1, label: 'Review', icon: FaShoppingBag },
    { id: 2, label: 'Delivery', icon: FaTruck },
    { id: 3, label: 'Payment', icon: FaCreditCard },
];

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [receiptFile, setReceiptFile] = useState(null);
    const [receiptPreview, setReceiptPreview] = useState(null);

    const handleReceiptChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setReceiptFile(file);
            setReceiptPreview(URL.createObjectURL(file));
        }
    };
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

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isDeliveryValid = () => {
        return formData.name && formData.phone && formData.email && formData.address && formData.city && formData.state;
    };

    const handleSubmit = async () => {
        if (cartItems.length === 0) return;
        setIsSubmitting(true);
        try {
            const formDataPayload = new FormData();

            const customerData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state
            };

            const itemsData = cartItems.map(item => ({
                product: item._id, // item ID
                itemType: item.itemType || 'Product', // 'Product' or 'Combo'
                name: item.name, // Snapshot of the name
                quantity: item.quantity,
                price: parseFloat(item.price.replace(/[^\d.]/g, '')) || 0,
                color: item.selectedColor,
                size: item.selectedSize
            }));

            formDataPayload.append('customer', JSON.stringify(customerData));
            formDataPayload.append('items', JSON.stringify(itemsData));
            formDataPayload.append('totalAmount', cartTotal);
            formDataPayload.append('paymentMethod', formData.paymentMethod);
            formDataPayload.append('deliveryMethod', formData.deliveryMethod);

            if (receiptFile) {
                formDataPayload.append('receipt', receiptFile);
            }

            const result = await apiRequest(API_ENDPOINTS.orders, {
                method: 'POST',
                // Don't set Content-Type header when sending FormData
                body: formDataPayload
            });

            // Prepare WhatsApp Message
            const orderNum = result.orderNumber;
            const itemsSummary = cartItems.map(item =>
                `• ${item.name} (${item.quantity}x) - ${item.price}`
            ).join('\n');

            const waMessage = `*New Order: #${orderNum}*\n\n` +
                `*Customer:* ${formData.name}\n` +
                `*Phone:* ${formData.phone}\n` +
                `*Delivery:* ${formData.address}, ${formData.city}\n\n` +
                `*Items:*\n${itemsSummary}\n\n` +
                `*Total:* ₦${cartTotal.toLocaleString()}\n` +
                `*Payment:* ${formData.paymentMethod}\n\n` +
                `_I have placed my order and uploaded the receipt. Please confirm._`;

            const encodedMsg = encodeURIComponent(waMessage);
            const waUrl = `https://wa.me/2349120491702?text=${encodedMsg}`;

            setOrderData(result);
            setOrderSuccess(true);
            clearCart();
            window.scrollTo(0, 0);

            // Redirect to WhatsApp after a short delay
            setTimeout(() => {
                window.open(waUrl, '_blank');
            }, 2000);

        } catch (error) {
            console.error('Checkout error:', error);
            alert('There was an error processing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── Success Screen ───
    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-beige-50 pt-28 sm:pt-32 pb-20">
                <div className="max-w-xl mx-auto px-5 sm:px-6">
                    <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-peach-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-peach-50 rounded-full -mr-16 -mt-16"></div>
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaCheck size={32} />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">Order Received!</h2>
                        <p className="text-gray-600 mb-2">Thank you for choosing Olaluxe, <span className="font-bold text-gray-900">{formData.name}</span>.</p>
                        <p className="text-gray-500 font-light mb-8">
                            Your order number is <span className="font-serif font-bold text-gold-600 tracking-wider">#{orderData?.orderNumber}</span>.
                            We will contact you shortly via WhatsApp/Email to confirm delivery.
                        </p>

                        <div className="bg-beige-50 rounded-2xl p-6 mb-8 text-left border border-peach-100">
                            <h3 className="font-serif font-bold text-gray-900 mb-4 text-sm">Next Steps:</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                {[
                                    'Check your WhatsApp/Email for an order confirmation.',
                                    'For Bank Transfers, payment details will be provided.',
                                    'Your items will be prepared once payment is verified.'
                                ].map((text, i) => (
                                    <li key={i} className="flex items-start space-x-3">
                                        <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gold-600 shadow-sm flex-shrink-0">{i + 1}</span>
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => navigate('/products')}
                            className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-full font-bold shadow-xl transition-all"
                        >
                            Back to Catalog
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Main Checkout ───
    return (
        <div className="min-h-screen bg-beige-50">
            <div className="pt-28 sm:pt-32 pb-12">
                <div className="max-w-2xl mx-auto px-5 sm:px-6">

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8 sm:mb-10">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            return (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white' :
                                            isActive ? 'bg-gray-900 text-white shadow-lg' :
                                                'bg-white text-gray-400 border-2 border-gray-200'
                                            }`}>
                                            {isCompleted ? <FaCheck size={14} /> : <Icon size={14} />}
                                        </div>
                                        <span className={`text-[10px] sm:text-xs mt-1.5 font-bold tracking-wide ${isActive ? 'text-gray-900' : isCompleted ? 'text-green-600' : 'text-gray-400'
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 sm:mx-4 rounded-full transition-all duration-300 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                                            }`}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* ═══ Step 1: Review Cart ═══ */}
                    {currentStep === 1 && (
                        <div className="animate-fade-in">
                            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-peach-50">
                                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-6">Review Your Selection</h2>

                                {cartItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-beige-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FaShoppingBag className="text-peach-200" size={24} />
                                        </div>
                                        <p className="text-gray-500 mb-4">Your cart is empty.</p>
                                        <button onClick={() => navigate('/products')} className="text-gold-600 font-semibold hover:underline">
                                            Browse Products
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-4 mb-6">
                                            {cartItems.map((item) => (
                                                <div key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
                                                    className="flex space-x-3 sm:space-x-4 p-3 sm:p-4 bg-beige-50 rounded-2xl border border-peach-50">
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-peach-50">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-start gap-2">
                                                            <h4 className="font-serif font-bold text-gray-900 text-sm leading-tight truncate">{item.name}</h4>
                                                            <button
                                                                onClick={() => removeFromCart(item._id, item.selectedColor, item.selectedSize)}
                                                                className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                            >
                                                                <FaTrash size={11} />
                                                            </button>
                                                        </div>
                                                        {(item.selectedColor || item.selectedSize) && (
                                                            <p className="text-[11px] text-gray-500 mt-0.5">
                                                                {item.selectedColor && `${item.selectedColor}`}
                                                                {item.selectedSize && ` • ${item.selectedSize}`}
                                                            </p>
                                                        )}
                                                        <div className="flex justify-between items-center mt-2">
                                                            <div className="flex items-center border border-peach-100 rounded-lg bg-white overflow-hidden">
                                                                <button
                                                                    onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                                                                    className="w-7 h-7 flex items-center justify-center hover:bg-peach-50 text-gray-500"
                                                                >
                                                                    <FaMinus size={9} />
                                                                </button>
                                                                <span className="px-2 text-sm font-medium text-gray-700 min-w-[1.5rem] text-center">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                                                                    className="w-7 h-7 flex items-center justify-center hover:bg-peach-50 text-gray-500"
                                                                >
                                                                    <FaPlus size={9} />
                                                                </button>
                                                            </div>
                                                            <p className="font-serif font-bold text-gray-900 text-sm">{item.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Summary */}
                                        <div className="border-t border-peach-50 pt-5 space-y-3">
                                            <div className="flex justify-between text-gray-500 text-sm">
                                                <span>Subtotal ({cartItems.reduce((t, i) => t + i.quantity, 0)} items)</span>
                                                <span>₦{cartTotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-500 text-sm">
                                                <span>Shipping</span>
                                                <span className="text-green-600 font-medium">Calculated next</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-3 border-t border-peach-100">
                                                <span className="text-lg font-serif font-bold text-gray-900">Total</span>
                                                <span className="text-2xl font-serif font-bold text-gray-900">₦{cartTotal.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={nextStep}
                                            className="w-full mt-6 bg-gray-900 hover:bg-black text-white py-4 rounded-full font-bold shadow-xl transition-all active:scale-[0.98]"
                                        >
                                            Continue to Delivery
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ═══ Step 2: Delivery Information ═══ */}
                    {currentStep === 2 && (
                        <div className="animate-fade-in">
                            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-peach-50">
                                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-6">Delivery Information</h2>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                required name="name" value={formData.name} onChange={handleChange}
                                                placeholder="Jane Doe"
                                                className="w-full px-4 py-3.5 bg-beige-50 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                            <input
                                                required name="phone" value={formData.phone} onChange={handleChange}
                                                placeholder="+234..."
                                                className="w-full px-4 py-3.5 bg-beige-50 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            required type="email" name="email" value={formData.email} onChange={handleChange}
                                            placeholder="jane@example.com"
                                            className="w-full px-4 py-3.5 bg-beige-50 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all text-sm"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Shipping Address</label>
                                        <textarea
                                            required name="address" value={formData.address} onChange={handleChange}
                                            rows="2" placeholder="House Number, Street Name..."
                                            className="w-full px-4 py-3.5 bg-beige-50 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all resize-none text-sm"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
                                            <input
                                                required name="city" value={formData.city} onChange={handleChange}
                                                placeholder="Lekki"
                                                className="w-full px-4 py-3.5 bg-beige-50 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">State</label>
                                            <input
                                                required name="state" value={formData.state} onChange={handleChange}
                                                placeholder="Lagos"
                                                className="w-full px-4 py-3.5 bg-beige-50 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={prevStep}
                                        className="flex items-center justify-center px-6 py-3.5 bg-white border border-peach-100 text-gray-700 rounded-full font-medium hover:bg-peach-50 transition-all active:scale-[0.98]"
                                    >
                                        <FaArrowLeft size={12} className="mr-2" /> Back
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!isDeliveryValid()}
                                        className="flex-1 bg-gray-900 hover:bg-black text-white py-3.5 rounded-full font-bold shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ═══ Step 3: Payment & Confirm ═══ */}
                    {currentStep === 3 && (
                        <div className="animate-fade-in">
                            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-peach-50">
                                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-6">Payment & Delivery</h2>

                                <div className="space-y-6">
                                    {/* Delivery Method */}
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-3">Delivery Method</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Standard', 'Express'].map(method => (
                                                <label key={method} className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all text-center ${formData.deliveryMethod === method ? 'border-gold-500 bg-peach-50' : 'border-gray-100 hover:border-peach-100'
                                                    }`}>
                                                    <input type="radio" name="deliveryMethod" value={method} checked={formData.deliveryMethod === method} onChange={handleChange} className="hidden" />
                                                    <FaTruck className={`mb-2 ${formData.deliveryMethod === method ? 'text-gold-600' : 'text-gray-400'}`} size={18} />
                                                    <span className={`text-sm font-bold ${formData.deliveryMethod === method ? 'text-gray-900' : 'text-gray-500'}`}>{method}</span>
                                                    <span className="text-[10px] text-gray-400 mt-0.5">{method === 'Standard' ? '3-5 days' : '1-2 days'}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-3">Payment Method</p>
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            {['Bank Transfer', 'On Delivery'].map(method => (
                                                <label key={method} className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all text-center ${formData.paymentMethod === method ? 'border-gold-500 bg-peach-50' : 'border-gray-100 hover:border-peach-100'
                                                    }`}>
                                                    <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleChange} className="hidden" />
                                                    <FaCreditCard className={`mb-2 ${formData.paymentMethod === method ? 'text-gold-600' : 'text-gray-400'}`} size={18} />
                                                    <span className={`text-sm font-bold ${formData.paymentMethod === method ? 'text-gray-900' : 'text-gray-500'}`}>{method}</span>
                                                </label>
                                            ))}
                                        </div>

                                        {/* Bank Transfer Details & Receipt Upload */}
                                        {formData.paymentMethod === 'Bank Transfer' && (
                                            <div className="bg-peach-50/50 rounded-2xl p-5 border border-peach-100 animate-fade-in space-y-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bank Details</p>
                                                    <div className="bg-white rounded-xl p-4 shadow-sm border border-peach-50">
                                                        <p className="text-sm font-bold text-gray-900">1234567890</p>
                                                        <p className="text-xs text-gray-600">Zenith Bank • Olaluxe Boutique</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Transfer Proof</p>
                                                    <div className="relative group">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleReceiptChange}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            required
                                                        />
                                                        <div className="w-full px-4 py-8 border-2 border-dashed border-peach-200 rounded-xl flex flex-col items-center justify-center bg-white group-hover:bg-peach-50 group-hover:border-peach-300 transition-all">
                                                            {receiptPreview ? (
                                                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-peach-100">
                                                                    <img src={receiptPreview} alt="Receipt Preview" className="w-full h-full object-cover" />
                                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Change Image</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="w-10 h-10 bg-beige-50 rounded-full flex items-center justify-center mb-2">
                                                                        <FaCreditCard className="text-gold-600" size={16} />
                                                                    </div>
                                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Click or Drag Receipt Photo</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Review Summary */}
                                    <div className="bg-beige-50 rounded-2xl p-5 border border-peach-100">
                                        <h3 className="text-sm font-serif font-bold text-gray-900 mb-4">Order Summary</h3>
                                        <div className="space-y-2.5 mb-4">
                                            {cartItems.map((item) => (
                                                <div key={`${item._id}-${item.selectedColor}`} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600 truncate mr-4">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                                                    <span className="font-bold text-gray-900 flex-shrink-0">{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t border-peach-100 pt-3 space-y-2">
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>Shipping to {formData.city}, {formData.state}</span>
                                                <span className="text-green-600 font-medium">TBD</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-peach-100">
                                                <span className="font-serif font-bold text-gray-900">Total</span>
                                                <span className="text-xl font-serif font-bold text-gray-900">₦{cartTotal.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-400 italic text-center leading-relaxed">
                                        "We'll reach out to confirm your preferences and finalize shipping cost before you pay."
                                    </p>
                                </div>

                                {/* Navigation */}
                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={prevStep}
                                        className="flex items-center justify-center px-6 py-3.5 bg-white border border-peach-100 text-gray-700 rounded-full font-medium hover:bg-peach-50 transition-all active:scale-[0.98]"
                                    >
                                        <FaArrowLeft size={12} className="mr-2" /> Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || cartItems.length === 0 || (formData.paymentMethod === 'Bank Transfer' && !receiptFile)}
                                        className="flex-1 bg-gray-900 hover:bg-black text-white py-3.5 rounded-full font-bold shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Processing...
                                            </span>
                                        ) : (
                                            'Place Order'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
