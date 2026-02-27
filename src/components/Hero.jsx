import React from 'react';
import { FaWhatsapp, FaShoppingBag, FaShippingFast, FaStar } from 'react-icons/fa';
const heroImage = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop";

const Hero = () => {
  return (
    <section id="home">
      {/* Mobile: Single column with background image */}
      <div className="lg:hidden relative min-h-screen bg-cover bg-center pt-24 pb-20" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="text-center text-white">


            <h1 className="text-4xl font-serif font-bold mb-6 leading-tight">
              Luxury <br />
              <span className="text-gold-300 italic">Made Accessible</span>
            </h1>

            <p className="text-lg mb-10 leading-relaxed max-w-lg mx-auto opacity-90">
              Premium jewelry, bags, and accessories curated for your elegance. Quality guaranteed, prices that make sense.
            </p>

            <div className="flex flex-col gap-4">
              <a href="https://wa.me/2349120491702" className="bg-white text-gray-900 px-10 py-4 rounded-full font-semibold shadow-xl transition-all flex items-center justify-center space-x-3 group">
                <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
                <span>Order Now</span>
              </a>
              <a href="/products" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold transition-all text-center hover:bg-white hover:text-gray-900">
                Browse Catalog
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Two column layout */}
      <div className="hidden lg:block bg-beige-50 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">


                <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  Luxury <br />
                  <span className="text-gold-600 italic">Made Accessible</span>
                </h1>

                <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
                  Premium jewelry, bags, and accessories curated for your elegance. Quality guaranteed, prices that make sense.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="https://wa.me/2349120491702" className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-semibold shadow-xl transition-all flex items-center justify-center space-x-3 group">
                    <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Order Now</span>
                  </a>
                  <a href="/products" className="bg-white border border-peach-100 hover:border-gold-500 text-gray-800 px-10 py-4 rounded-full font-semibold transition-all text-center">
                    Browse Catalog
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-peach-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold-500 rounded-full blur-3xl opacity-10"></div>

                <div className="relative">
                  <div className="relative bg-white p-3 rounded-2xl shadow-2xl overflow-hidden border border-peach-50">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={heroImage}
                        alt="Olaluxe Premium Collection"
                        className="w-full h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-xs font-bold tracking-widest shadow-lg">
                        BEST SELLERS
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-peach-50">
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div className="group">
                        <FaShippingFast className="mx-auto text-gold-500 mb-2 group-hover:scale-110 transition-transform" size={20} />
                        <div className="text-xl font-bold text-gray-900">Fast</div>
                        <div className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">Delivery</div>
                      </div>
                      <div className="group border-x border-peach-50">
                        <div className="mx-auto text-gold-500 mb-2 group-hover:scale-110 transition-transform font-serif italic text-xl">₦</div>
                        <div className="text-xl font-bold text-gray-900">Best</div>
                        <div className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">Prices</div>
                      </div>
                      <div className="group">
                        <FaStar className="mx-auto text-gold-500 mb-2 group-hover:scale-110 transition-transform" size={20} />
                        <div className="text-xl font-bold text-gray-900">500+</div>
                        <div className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">Orders</div>
                      </div>
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
