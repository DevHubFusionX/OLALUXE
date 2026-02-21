import React from 'react';
import { FaWhatsapp, FaGem, FaShippingFast, FaCrown } from 'react-icons/fa';
import heroImage from '../assets/moderate_textile.jpg';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-beige-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-peach-50 px-4 py-2 rounded-full mb-6 border border-peach-100">
                <FaCrown className="text-gold-500" size={14} />
                <span className="text-xs font-bold tracking-widest text-gray-600 uppercase">Jewelry, Bags & Girly Essentials</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Embrace Your <br />
                <span className="text-gold-600 italic">Timeless Elegance</span>
              </h1>

              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
                Discover Olaluxe.ng's curated collection of exquisite jewelry, premium bags, and girly essentials all sold here 🥰🛍️
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="https://wa.me/2349120491702" className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-semibold shadow-xl transition-all flex items-center justify-center space-x-3 group">
                  <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Order via WhatsApp</span>
                </a>
                <a href="/products" className="bg-white border border-peach-100 hover:border-gold-500 text-gray-800 px-10 py-4 rounded-full font-semibold transition-all text-center">
                  Explore Shop
                </a>
              </div>
            </div>

            <div className="relative">
              {/* Decorative Background Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-peach-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold-500 rounded-full blur-3xl opacity-10"></div>

              {/* Main Image Container */}
              <div className="relative">
                {/* Elegant Frame */}
                <div className="relative bg-white p-3 rounded-2xl shadow-2xl overflow-hidden border border-peach-50">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={heroImage}
                      alt="Olaluxe Collection Preview"
                      className="w-full h-[500px] object-cover"
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-xs font-bold tracking-widest shadow-lg">
                      NEW ARRIVALS
                    </div>
                  </div>
                </div>

                {/* Floating Stats - Repositioned and Styled */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-peach-50">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="group">
                      <FaGem className="mx-auto text-gold-500 mb-2 group-hover:scale-110 transition-transform" size={20} />
                      <div className="text-xl font-bold text-gray-900">100%</div>
                      <div className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">Authentic</div>
                    </div>
                    <div className="group border-x border-peach-50">
                      <FaShippingFast className="mx-auto text-gold-500 mb-2 group-hover:scale-110 transition-transform" size={20} />
                      <div className="text-xl font-bold text-gray-900">Fast</div>
                      <div className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">Shipping</div>
                    </div>
                    <div className="group">
                      <div className="mx-auto text-gold-500 mb-2 group-hover:scale-110 transition-transform font-serif italic text-xl">5★</div>
                      <div className="text-xl font-bold text-gray-900">500+</div>
                      <div className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
