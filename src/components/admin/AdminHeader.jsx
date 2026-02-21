import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaSignOutAlt, FaKey, FaEnvelope, FaBars, FaChartLine, FaCog, FaUser } from 'react-icons/fa';
import Button from '../ui/Button';

const AdminHeader = ({
  activeTab,
  itemCount,
  onAddNew,
  onChangePassword,
  onChangeEmail,
  onLogout,
  onToggleSidebar
}) => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-beige-100 via-beige-50 to-beige-100 shadow-xl border-b border-peach-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-peach-100 to-peach-200 rounded-2xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-500 shadow-md">
                <span className="text-gray-900 font-serif font-bold text-lg">O</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full shadow-sm animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-gray-900 tracking-tight">Olaluxe.ng Admin</h1>
              <p className="text-[10px] font-sans font-bold text-gold-600 uppercase tracking-[0.2em]">Boutique Management</p>
            </div>

            {/* Stats Pill */}
            <div className="hidden sm:block ml-8">
              <div className="bg-white/60 backdrop-blur-md border border-peach-100 rounded-full px-4 py-1.5 flex items-center space-x-2 shadow-sm">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 text-xs font-semibold tracking-wide uppercase">
                  {itemCount} {activeTab}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Primary Add Button */}
            <div className="hidden lg:block">
              <button
                onClick={onAddNew}
                className="group relative overflow-hidden bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-peach-200/50"
              >
                <div className="relative flex items-center space-x-2">
                  <FaPlus className="text-xs" />
                  <span className="tracking-wide">Add {activeTab === 'products' ? 'Product' : 'Combo'}</span>
                </div>
              </button>
            </div>

            {/* Settings Cluster */}
            <div className="hidden lg:flex items-center">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="group w-10 h-10 bg-white/60 hover:bg-white/80 backdrop-blur-md border border-peach-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <FaCog className={`text-gray-600 text-sm transition-transform duration-500 ${showActions ? 'rotate-180' : ''}`} />
                </button>

                {/* Floating Action Menu */}
                <div className={`absolute right-0 top-14 transition-all duration-300 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                  <div className="bg-white/95 backdrop-blur-xl border border-peach-100 rounded-2xl p-2 shadow-2xl min-w-[220px]">
                    <div className="px-4 py-2 border-b border-peach-50 mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Management</p>
                    </div>
                    <button
                      onClick={() => { onChangePassword(); setShowActions(false); }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-700 hover:bg-beige-50 rounded-xl transition-colors group"
                    >
                      <div className="w-8 h-8 bg-peach-50 group-hover:bg-peach-100 rounded-lg flex items-center justify-center transition-colors">
                        <FaKey className="text-gold-600 text-sm" />
                      </div>
                      <span className="text-sm font-medium">Security Details</span>
                    </button>
                    <button
                      onClick={() => { onChangeEmail(); setShowActions(false); }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-700 hover:bg-beige-50 rounded-xl transition-colors group"
                    >
                      <div className="w-8 h-8 bg-peach-50 group-hover:bg-peach-100 rounded-lg flex items-center justify-center transition-colors">
                        <FaEnvelope className="text-gold-600 text-sm" />
                      </div>
                      <span className="text-sm font-medium">Contact Settings</span>
                    </button>
                    <div className="border-t border-peach-50 my-2"></div>
                    <button
                      onClick={() => { onLogout(); setShowActions(false); }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
                    >
                      <div className="w-8 h-8 bg-red-100/50 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
                        <FaSignOutAlt className="text-red-500 text-sm" />
                      </div>
                      <span className="text-sm font-medium">End Session</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden group w-10 h-10 bg-white/60 hover:bg-white/80 backdrop-blur-md border border-peach-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <FaBars className="text-gray-600 text-sm group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-green-500/20 to-teal-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </header>
  );
};

// Add custom CSS for backdrop blur support
const style = document.createElement('style');
style.textContent = `
  @supports (backdrop-filter: blur(10px)) {
    .backdrop-blur-sm {
      backdrop-filter: blur(4px);
    }
    .backdrop-blur-lg {
      backdrop-filter: blur(16px);
    }
  }
`;
document.head.appendChild(style);

export default AdminHeader;