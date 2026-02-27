import React from 'react';
import { FaEye, FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const statusIcons = {
    'Pending': FaClock,
    'Processing': FaSpinner,
    'Shipped': FaTruck,
    'Delivered': FaCheckCircle,
    'Cancelled': FaTimesCircle
};

const statusColors = {
    'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
    'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
    'Shipped': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Cancelled': 'bg-rose-100 text-rose-700 border-rose-200'
};

const OrderList = ({ orders, onPreview, loading }) => {
    if (loading && orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-md rounded-[3rem] border border-peach-100">
                <div className="w-16 h-16 border-4 border-peach-200 border-t-gold-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-serif italic text-lg">Retrieving boutique orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-md rounded-[3rem] border border-peach-100 text-center px-6">
                <div className="w-20 h-20 bg-beige-100 rounded-full flex items-center justify-center mb-6">
                    <FaShoppingBag className="text-3xl text-peach-300" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No boutique orders yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">All customer purchases and ensemble acquisitions will appear here once they are placed.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-peach-100 overflow-hidden">
            {/* Mobile Card View */}
            <div className="block sm:hidden divide-y divide-peach-50">
                {orders.map((order) => {
                    const StatusIcon = statusIcons[order.status] || FaClock;
                    return (
                        <div key={order._id} className="p-4 bg-white hover:bg-beige-50/30 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="text-sm font-serif font-bold text-gray-900">{order.orderNumber}</span>
                                    <span className="text-[10px] text-gray-400 block mt-0.5">
                                        {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <div className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border ${statusColors[order.status] || 'bg-gray-100'}`}>
                                    <StatusIcon className={`text-[9px] ${order.status === 'Processing' ? 'animate-spin' : ''}`} />
                                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider">{order.status}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs font-sans font-bold text-gray-900">{order.customer.name}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-sm font-serif font-bold text-gold-700">₦{(order.totalAmount || 0).toLocaleString()}</span>
                                    <button
                                        onClick={() => onPreview(order)}
                                        className="px-4 py-1.5 bg-beige-50 border border-peach-100 rounded-lg text-gray-700 text-[10px] font-bold"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-peach-100">
                            <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em]">Ref No.</th>
                            <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em]">Customer</th>
                            <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em]">Items</th>
                            <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em]">Total Amount</th>
                            <th className="px-6 py-5 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-peach-50">
                        {orders.map((order) => {
                            const StatusIcon = statusIcons[order.status] || FaClock;
                            return (
                                <tr key={order._id} className="group hover:bg-beige-50/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-serif font-bold text-gray-900 block">{order.orderNumber}</span>
                                        <span className="text-[10px] font-sans text-gray-400 block mt-1">
                                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-sans font-bold text-gray-900">{order.customer.name}</span>
                                            <span className="text-[11px] font-sans text-gray-500">{order.customer.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-sans font-medium text-gray-600 bg-peach-50/50 px-2 py-1 rounded-lg border border-peach-100">
                                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${statusColors[order.status] || 'bg-gray-100'}`}>
                                            <StatusIcon className={`text-[10px] ${order.status === 'Processing' ? 'animate-spin' : ''}`} />
                                            <span className="text-[10px] font-sans font-bold uppercase tracking-wider">{order.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-serif font-bold text-gold-700">₦{(order.totalAmount || 0).toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => onPreview(order)}
                                            className="inline-flex items-center justify-center px-4 py-2 bg-white border border-peach-100 rounded-xl text-gray-600 hover:text-gray-900 hover:border-peach-300 hover:shadow-md transition-all text-xs font-bold gap-2"
                                        >
                                            <FaEye className="text-sm" />
                                            <span>View</span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
