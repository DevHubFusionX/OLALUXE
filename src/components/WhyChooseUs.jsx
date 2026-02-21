import React from 'react';
import { FaCheckCircle, FaTruck, FaHeadphones, FaAward } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaCheckCircle,
      title: 'Quality Guarantee',
      description: 'Premium fabrics sourced from trusted suppliers with quality assurance on every product.'
    },
    {
      icon: FaTruck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across Nigeria with real-time tracking and secure packaging.'
    },
    {
      icon: FaHeadphones,
      title: '24/7 Support',
      description: 'Dedicated customer support team available round the clock via WhatsApp and phone.'
    },
    {
      icon: FaAward,
      title: 'Best Prices',
      description: "Competitive pricing with regular discounts and exceptional value."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">Why Olaluxe?</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-peach-200 via-gold-500 to-peach-200 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            We are dedicated to the art of fine curation, ensuring every piece meets our standard of timeless elegance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-beige-50 text-gold-600 rounded-[2.5rem] mb-8 group-hover:bg-peach-50 transition-all duration-500 transform group-hover:-translate-y-2 border border-peach-50">
                <feature.icon size={36} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-sm">{feature.description.replace("Moderate's Textile", "Olaluxe")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default WhyChooseUs;