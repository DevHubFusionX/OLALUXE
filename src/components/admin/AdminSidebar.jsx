import React from 'react';
import { FaPlus, FaKey, FaEnvelope, FaSignOutAlt, FaTimes, FaShoppingBag } from 'react-icons/fa';

const AdminSidebar = ({
  isOpen,
  activeTab,
  onClose,
  onAddNew,
  onChangePassword,
  onChangeEmail,
  onLogout,
  onTabChange
}) => {
  if (!isOpen) return null;

  const handleAction = (action) => {
    action();
    onClose();
  };

  const menuItems = [
    {
      label: `Add ${activeTab === 'products' ? 'Product' : 'Combo'}`,
      icon: FaPlus,
      action: onAddNew,
      className: 'bg-gray-900 text-white hover:bg-black'
    },
    {
      label: 'Security Details',
      icon: FaKey,
      action: onChangePassword,
      className: 'text-gray-700 hover:bg-beige-50'
    },
    {
      label: 'Contact Settings',
      icon: FaEnvelope,
      action: onChangeEmail,
      className: 'text-gray-700 hover:bg-beige-50'
    },
    {
      label: 'View Orders',
      icon: FaShoppingBag,
      action: () => onTabChange('orders'),
      className: 'text-gray-700 hover:bg-beige-50'
    },
    {
      label: 'End Session',
      icon: FaSignOutAlt,
      action: onLogout,
      className: 'text-red-600 hover:bg-red-50'
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-80 bg-beige-50 shadow-2xl animate-slide-in-right">
        <div className="p-6">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-peach-100 to-peach-200 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-gray-900 font-serif font-bold text-sm">O</span>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-gray-900">Admin Menu</h3>
                <p className="text-[10px] font-sans font-bold text-gold-600 uppercase tracking-widest">Management</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-all"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          <div className="space-y-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleAction(item.action)}
                  className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium group ${item.className}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${index === 0 ? 'bg-white/10' : 'bg-white group-hover:bg-peach-50'
                    }`}>
                    <Icon className="text-sm" />
                  </div>
                  <span className="tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-10 left-6 right-6 p-4 bg-white/50 border border-peach-100 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Managing 32 pieces in the <span className="text-gold-600 font-bold">{activeTab}</span> boutique collection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;