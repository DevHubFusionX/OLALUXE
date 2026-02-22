import React from 'react';
import { FaHome, FaBoxes, FaShoppingBag } from 'react-icons/fa';

const AdminTabs = ({ activeTab, setActiveTab, productCount, comboCount, orderCount }) => {
    return (
        <div className="mb-8 sm:mb-12 flex justify-center sm:justify-start">
            <div className="bg-white/40 backdrop-blur-md border border-peach-100 rounded-2xl sm:rounded-[2rem] p-1.5 sm:p-2 inline-flex w-full sm:w-auto shadow-sm">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`relative flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 flex-1 sm:flex-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-[1.5rem] text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-500 overflow-hidden group ${activeTab === 'products'
                        ? 'bg-gray-900 text-white shadow-xl scale-[1.02] sm:scale-105'
                        : 'text-gray-400 hover:text-gray-900'
                        }`}
                >
                    <FaHome className={`text-xs sm:text-sm transition-transform duration-500 ${activeTab === 'products' ? 'text-peach-200' : 'group-hover:scale-110'}`} />
                    <span className="hidden xs:inline">Collection</span>
                    <span className="xs:hidden">Items</span>
                    <span className={`ml-1 sm:ml-2 text-[9px] sm:text-[10px] px-1.5 sm:px-2.5 py-0.5 rounded-full transition-colors ${activeTab === 'products' ? 'bg-white/10 text-peach-200' : 'bg-gray-200 text-gray-400'
                        }`}>
                        {productCount}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('combos')}
                    className={`relative flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 flex-1 sm:flex-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-[1.5rem] text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-500 overflow-hidden group ${activeTab === 'combos'
                        ? 'bg-gray-900 text-white shadow-xl scale-[1.02] sm:scale-105'
                        : 'text-gray-400 hover:text-gray-900'
                        }`}
                >
                    <FaBoxes className={`text-xs sm:text-sm transition-transform duration-500 ${activeTab === 'combos' ? 'text-peach-200' : 'group-hover:scale-110'}`} />
                    <span className="hidden xs:inline">Ensembles</span>
                    <span className="xs:hidden">Sets</span>
                    <span className={`ml-1 sm:ml-2 text-[9px] sm:text-[10px] px-1.5 sm:px-2.5 py-0.5 rounded-full transition-colors ${activeTab === 'combos' ? 'bg-white/10 text-peach-200' : 'bg-gray-200 text-gray-400'
                        }`}>
                        {comboCount}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`relative flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 flex-1 sm:flex-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-[1.5rem] text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-500 overflow-hidden group ${activeTab === 'orders'
                        ? 'bg-gray-900 text-white shadow-xl scale-[1.02] sm:scale-105'
                        : 'text-gray-400 hover:text-gray-900'
                        }`}
                >
                    <FaShoppingBag className={`text-xs sm:text-sm transition-transform duration-500 ${activeTab === 'orders' ? 'text-peach-200' : 'group-hover:scale-110'}`} />
                    <span className="hidden xs:inline">Acquisitions</span>
                    <span className="xs:hidden">Orders</span>
                    <span className={`ml-1 sm:ml-2 text-[9px] sm:text-[10px] px-1.5 sm:px-2.5 py-0.5 rounded-full transition-colors ${activeTab === 'orders' ? 'bg-white/10 text-peach-200' : 'bg-gray-200 text-gray-400'
                        }`}>
                        {orderCount}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default AdminTabs;
