import React from 'react';
import { FaWhatsapp, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="mb-4">
              <img src="/logo1.svg" alt="Olaluxe" className="w-10 h-10" />
              <h3 className="text-xl font-serif font-bold tracking-widest text-peach-100 mt-3">OLALUXE.NG</h3>
            </div>
            <p className="text-gray-400 leading-relaxed font-light italic">
              "Jewelry, Bags and Girly essentials all sold here🥰🛍️"
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gold-500">Quick Links</h4>
            <div className="space-y-2.5">
              <a href="#home" className="block text-gray-400 hover:text-peach-100 transition-colors text-sm">Home</a>
              <a href="#shop" className="block text-gray-400 hover:text-peach-100 transition-colors text-sm">Our Collections</a>
              <a href="#about" className="block text-gray-400 hover:text-peach-100 transition-colors text-sm">Our Story</a>
              <a href="#order" className="block text-gray-400 hover:text-peach-100 transition-colors text-sm">How to Order</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gold-500">Contact</h4>
            <div className="space-y-2.5">
              <div className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-peach-100" size={14} />
                <span className="text-sm">hello@olaluxe.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FaWhatsapp className="text-peach-100" size={14} />
                <span className="text-sm">+234 912 049 1702</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FaMapMarkerAlt className="text-peach-100" size={14} />
                <span className="text-sm">Amuwo-Odofin, Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gold-500">Follow Us</h4>
            <div className="flex space-x-3 mb-4">
              <a href="https://wa.me/2349120491702" className="bg-beige-50/10 hover:bg-beige-50/20 p-3 rounded-full transition-colors">
                <FaWhatsapp size={18} />
              </a>
              <a href="https://instagram.com/olaluxe_brand" className="bg-beige-50/10 hover:bg-beige-50/20 p-3 rounded-full transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="https://x.com/moderate_ustaz" className="bg-beige-50/10 hover:bg-beige-50/20 p-3 rounded-full transition-colors">
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-[10px] tracking-widest uppercase">
            © 2026 OLALUXE.NG. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
