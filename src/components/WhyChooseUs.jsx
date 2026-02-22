import React from 'react';
import { FaShippingFast, FaHeadphones, FaShieldAlt, FaTags } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: 'Quality Assured',
      description: 'Every product is carefully inspected before shipping to ensure premium quality.'
    },
    {
      icon: FaShippingFast,
      title: 'Fast Delivery',
      description: 'Quick nationwide delivery with tracking. Most orders ship within 24 hours.'
    },
    {
      icon: FaTags,
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and bulk order benefits.'
    },
    {
      icon: FaHeadphones,
      title: 'Customer Support',
      description: 'Responsive WhatsApp support for orders, inquiries, and after-sales service.'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">Why Choose Olaluxe?</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-peach-200 via-gold-500 to-peach-200 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Your trusted partner for premium jewelry and accessories with unmatched service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-beige-50 text-gold-600 rounded-[2.5rem] mb-8 group-hover:bg-peach-50 transition-all duration-500 transform group-hover:-translate-y-2 border border-peach-50">
                <feature.icon size={36} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;