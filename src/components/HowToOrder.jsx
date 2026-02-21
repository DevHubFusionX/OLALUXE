import React from 'react';
import { FaSearch, FaWhatsapp, FaShoppingCart, FaTruck } from 'react-icons/fa';

const HowToOrder = () => {
  const steps = [
    {
      icon: <FaSearch className="text-3xl text-green-600" />,
      title: "Browse Products",
      description: "Explore our collection of jewelry and premium accessories"
    },
    {
      icon: <FaWhatsapp className="text-3xl text-green-600" />,
      title: "Click WhatsApp",
      description: "Tap the WhatsApp button on any product you like"
    },
    {
      icon: <FaShoppingCart className="text-3xl text-green-600" />,
      title: "Place Your Order",
      description: "Send us your size, color preference, and quantity"
    },
    {
      icon: <FaTruck className="text-3xl text-green-600" />,
      title: "Get Delivery",
      description: "We'll deliver to your location within 2-3 days"
    }
  ];

  return (
    <section id="order" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">The Olaluxe.ng Experience</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-peach-200 via-gold-500 to-peach-200 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">Four simple steps to acquiring your next timeless piece from Olaluxe.ng</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-beige-50 rounded-[2rem] shadow-sm flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 group-hover:bg-peach-50">
                  {React.cloneElement(step.icon, { className: 'text-3xl text-gold-600' })}
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-serif font-bold border-4 border-white shadow-md">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-beige-50 p-12 rounded-[3rem] shadow-sm max-w-3xl mx-auto border border-peach-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-peach-50/50 rounded-full -mr-16 -mt-16"></div>
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4 relative z-10">Seeking Guidance?</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto relative z-10">Our concierge team is available to assist you with selection, sizing, and styling advice.</p>
            <a href="https://wa.me/2349120491702" className="inline-flex items-center space-x-3 bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-semibold transition-all shadow-xl group relative z-10">
              <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
              <span>Message Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </section>

  );
};

export default HowToOrder;