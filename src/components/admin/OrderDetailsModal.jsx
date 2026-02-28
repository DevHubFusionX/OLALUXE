import React, { useState } from 'react';
import { FaTimes, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCreditCard, FaTruck, FaFileInvoice, FaCheck, FaShoppingBag } from 'react-icons/fa';
import AdminSettingsModal from './AdminSettingsModal';

const OrderDetailsModal = ({ order, isOpen, onClose, onUpdateStatus, loading }) => {
    const [status, setStatus] = useState(order?.status || 'Pending');

    if (!order) return null;

    const handleUpdate = () => {
        onUpdateStatus(order._id, status);
    };

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <AdminSettingsModal
            title={`Order: ${order.orderNumber}`}
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-2xl"
        >
            <div className="space-y-5 sm:space-y-8 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                {/* Status & Actions Bar */}
                <div className="flex flex-col gap-3 sm:gap-4 bg-beige-50 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-peach-100">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Acquisition Status</p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{order.status}</span>
                            <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-white border border-peach-200 text-sm rounded-xl px-3 sm:px-4 py-2.5 sm:py-2 outline-none focus:ring-2 focus:ring-peach-200 transition-all font-sans w-full xs:w-auto"
                        >
                            {statusOptions.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="bg-gray-900 hover:bg-black text-white px-4 sm:px-6 py-2.5 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2 w-full xs:w-auto"
                        >
                            {loading ? 'Syncing...' : 'Update status'}
                        </button>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Customer Info */}
                    <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-peach-100 shadow-sm">
                        <h4 className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-3 sm:mb-4">
                            <FaUser className="text-peach-400" /> Client Profile
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-beige-50 rounded-xl flex items-center justify-center text-peach-600 flex-shrink-0"><FaUser size={12} /></div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate">{order.customer.name}</p>
                                    <p className="text-[11px] text-gray-500 truncate">{order.customer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 border-t border-peach-50 pt-3 sm:pt-4">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-beige-50 rounded-xl flex items-center justify-center text-peach-600 flex-shrink-0"><FaPhone size={12} /></div>
                                <p className="text-sm font-bold text-gray-900 truncate">{order.customer.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-peach-100 shadow-sm">
                        <h4 className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-3 sm:mb-4">
                            <FaTruck className="text-peach-400" /> Logistics Details
                        </h4>
                        <div className="space-y-3">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 bg-beige-50 rounded-xl flex items-center justify-center text-peach-600"><FaMapMarkerAlt size={12} /></div>
                                <div className="text-sm min-w-0">
                                    <p className="font-bold text-gray-900 break-words">{order.customer.address}</p>
                                    <p className="text-gray-600 mt-1">{order.customer.city}, {order.customer.state}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 border-t border-peach-50 pt-3 sm:pt-4">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-beige-50 rounded-xl flex items-center justify-center text-peach-600 flex-shrink-0"><FaTruck size={12} /></div>
                                <p className="text-sm font-bold text-gray-900">{order.deliveryMethod}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <FaShoppingBag className="text-peach-400" /> Collection Contents
                    </h4>

                    {/* Mobile: Card layout */}
                    <div className="sm:hidden space-y-3">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-peach-100 p-4 shadow-sm">
                                <div className="flex justify-between items-start gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-sans font-bold text-gray-900 leading-tight">{item.name || 'Item Information Missing'}</p>
                                        {(item.color || item.size) && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {item.color && <span className="text-[10px] px-1.5 py-0.5 bg-peach-50/50 rounded border border-peach-100/50 text-gray-500 uppercase tracking-wide font-medium">{item.color}</span>}
                                                {item.size && <span className="text-[10px] px-1.5 py-0.5 bg-peach-50/50 rounded border border-peach-100/50 text-gray-500 uppercase tracking-wide font-medium">{item.size}</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-peach-50">
                                    <span className="text-xs text-gray-500">Qty: <span className="font-bold text-gray-700">{item.quantity}</span></span>
                                    <span className="text-sm font-serif font-bold text-gold-600">₦{(item.price || 0).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: Table layout */}
                    <div className="hidden sm:block bg-white rounded-2xl border border-peach-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-peach-100">
                                    <th className="px-5 py-4 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest leading-none">Piece Description</th>
                                    <th className="px-5 py-4 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest text-center leading-none">Qty</th>
                                    <th className="px-5 py-4 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest text-right leading-none">Unit Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-peach-50">
                                {order.items.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-beige-50/30 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-sans font-bold text-gray-900 leading-tight">{item.name || 'Item Information Missing'}</p>
                                            {(item.color || item.size) && (
                                                <p className="text-[10px] text-gray-500 mt-1.5 uppercase tracking-wide font-medium flex items-center gap-2">
                                                    {item.color && <span className="px-1.5 py-0.5 bg-peach-50/50 rounded border border-peach-100/50">{item.color}</span>}
                                                    {item.size && <span className="px-1.5 py-0.5 bg-peach-50/50 rounded border border-peach-100/50">{item.size}</span>}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <span className="text-sm font-sans font-bold text-gray-600">{item.quantity}</span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <span className="text-sm font-serif font-bold text-gold-600">₦{(item.price || 0).toLocaleString()}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Proof */}
                {order.receiptImage && (
                    <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-xs font-sans font-bold text-gray-900 uppercase tracking-widest border-b border-peach-100 pb-2 flex items-center gap-2">
                            <FaFileInvoice className="text-peach-400" /> Proof of Transaction
                        </h4>
                        <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-peach-100 bg-white p-2 sm:p-3 hover:shadow-xl transition-all">
                            <img
                                src={order.receiptImage}
                                alt="Payment Receipt"
                                className="w-full h-auto rounded-xl sm:rounded-2xl object-contain cursor-pointer transition-transform group-hover:scale-[1.01]"
                                onClick={() => window.open(order.receiptImage, '_blank')}
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform flex justify-between items-center">
                                <span className="text-white text-xs font-medium">Transaction Receipt</span>
                                <button
                                    onClick={() => window.open(order.receiptImage, '_blank')}
                                    className="bg-white/20 backdrop-blur-md text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/30 transition-colors text-xs font-bold"
                                >
                                    View Full Size
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment Summary */}
                <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 border-b border-white/10 pb-4 sm:pb-6 mb-4 sm:mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"><FaCreditCard className="text-peach-300" size={14} /></div>
                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Payment Settlement</p>
                                <p className="text-sm font-bold">{order.paymentMethod}</p>
                            </div>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Final Amount</p>
                            <p className="text-xl sm:text-2xl font-serif font-bold text-peach-200">₦{(order.totalAmount || 0).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 text-[10px] font-sans text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                        <span>Processed at {new Date(order.createdAt).toLocaleTimeString()}</span>
                        {order.status === 'Delivered' && <span className="flex items-center gap-1.5 text-emerald-400 font-bold"><FaCheck /> Completed Acquisition</span>}
                    </div>
                </div>
            </div>
        </AdminSettingsModal>
    );
};

export default OrderDetailsModal;

