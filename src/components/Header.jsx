import React, { useState } from 'react';
import { FaWhatsapp, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  return (
    <>
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-peach-100 z-50">
        {/* Decorative top line */}
        <div className="h-1 bg-gradient-to-r from-peach-100 via-gold-500 to-peach-100"></div>

        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section with unique styling */}
            <Link to="/" className="group flex items-center space-x-3 relative">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-peach-100 to-gold-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <img src="/logo1.svg" alt="Olaluxe" className="w-10 h-10 relative z-10" />
              </div>
              <div className="relative">
                <h1 className="text-2xl font-serif font-bold tracking-widest text-gray-900">
                  OLALUXE.NG
                </h1>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-peach-200 to-gold-500 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>

            {/* Navigation with unique pill design */}
            <nav className="hidden md:flex items-center bg-beige-50/50 backdrop-blur-sm rounded-full px-6 py-1.5 border border-peach-100">
              <div className="flex space-x-1">
                <Link to="/" className="relative px-4 py-2 text-gray-700 hover:text-gold-600 font-medium transition-all duration-300 rounded-full hover:bg-white group">
                  <span className="relative z-10 text-sm tracking-wide">Home</span>
                </Link>
                <Link to="/products" className="relative px-4 py-2 text-gray-700 hover:text-gold-600 font-medium transition-all duration-300 rounded-full hover:bg-white group">
                  <span className="relative z-10 text-sm tracking-wide">Shop</span>
                </Link>
              </div>
            </nav>

            {/* Action buttons with creative styling */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2">
                <a href="https://wa.me/2349120491702" className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                  <FaWhatsapp size={18} />
                </a>
                <a href="https://x.com/moderate_ustaz" className="p-2 text-gray-600 hover:text-black transition-colors">
                  <FaXTwitter size={18} />
                </a>
              </div>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-gold-600 transition-all duration-300"
              >
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-peach-200 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border-2 border-white animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Unique mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative p-2 text-gray-700 hover:text-peach-200 transition-all duration-300"
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Unique Mobile Menu with slide animation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-peach-100 shadow-xl">
            <nav className="px-6 py-8 space-y-4 text-center">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-serif tracking-widest text-gray-800 hover:text-gold-600"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-serif tracking-widest text-gray-800 hover:text-gold-600"
              >
                Shop
              </Link>

              <div className="flex justify-center space-x-6 pt-6 mt-6 border-t border-peach-50">
                <a href="https://wa.me/2349120491702" className="text-gray-400 hover:text-green-500">
                  <FaWhatsapp size={24} />
                </a>
                <a href="https://x.com/moderate_ustaz" className="text-gray-400 hover:text-black">
                  <FaXTwitter size={24} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/2349120491702" className="fixed bottom-6 right-6 bg-peach-200 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 hover:bg-peach-100">
        <FaWhatsapp size={24} />
      </a>
    </>
  );
};

export default Header;
