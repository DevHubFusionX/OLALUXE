import React from 'react';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope, FaBuilding, FaStar } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-beige-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-peach-50 text-gold-600 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border border-peach-100">
            ✨ Concierge Service
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">Contact Olaluxe.ng</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-peach-200 via-gold-500 to-peach-200 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the Olaluxe.ng personal touch. Whether you're seeking a custom piece, bulk ensemble pricing, or jewelry and bags inquiries, our dedicated concierge team is at your service.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-peach-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-beige-50 rounded-full -mr-12 -mt-12 transition-transform hover:scale-110"></div>
              <h3 className="text-3xl font-serif font-bold mb-8 text-gray-900 relative z-10">Get in Touch</h3>
              <div className="space-y-8 relative z-10">
                <div className="flex items-start space-x-5 group">
                  <div className="w-12 h-12 bg-peach-50 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-peach-100">
                    <FaWhatsapp className="text-gold-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-1">WhatsApp Concierge</p>
                    <p className="text-gray-600 text-lg">+234 912 049 1702</p>
                    <p className="text-xs text-gray-400 mt-1 italic tracking-wide">Instant assistance & custom orders</p>
                  </div>
                </div>

                <div className="flex items-start space-x-5 group">
                  <div className="w-12 h-12 bg-beige-100/50 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-beige-100">
                    <FaEnvelope className="text-gray-700 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-1">Email Inquiry</p>
                    <p className="text-gray-600 text-lg">concierge@olaluxe.com</p>
                    <p className="text-xs text-gray-400 mt-1 italic tracking-wide">For formal business & collaborations</p>
                  </div>
                </div>

                <div className="flex items-start space-x-5 group">
                  <div className="w-12 h-12 bg-peach-50/50 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-peach-100">
                    <FaMapMarkerAlt className="text-red-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-1">Boutique Address</p>
                    <p className="text-gray-600 text-base leading-snug font-light">
                      Amuwo-Odofin, Lagos, Nigeria.
                    </p>
                    <p className="text-xs text-gray-400 mt-1 italic tracking-wide">Visit us for a personalized fitting</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <a href="https://wa.me/2349120491702" className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-8 rounded-3xl text-center transition-all shadow-lg hover:-translate-y-1">
                <FaWhatsapp className="mx-auto mb-4" size={32} />
                <div className="font-bold uppercase tracking-widest text-xs mb-1">WhatsApp</div>
              </a>
              <a href="tel:+2349120491702" className="bg-gray-900 hover:bg-black text-white p-8 rounded-3xl text-center transition-all shadow-lg hover:-translate-y-1">
                <FaPhone className="mx-auto mb-4" size={32} />
                <div className="font-bold uppercase tracking-widest text-xs mb-1">Call Concierge</div>
              </a>
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-peach-50">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-peach-50 rounded-xl">
                  <FaClock className="text-gold-600 text-xl" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Boutique Hours</h3>
              </div>
              <div className="space-y-5">
                {[
                  ['Weekdays', '08:00 AM - 06:00 PM'],
                  ['Saturdays', '09:00 AM - 04:00 PM'],
                  ['Sundays', '09:00 AM - 04:00 PM']
                ].map(([day, time], i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-beige-50 last:border-0">
                    <span className="font-medium text-gray-700">{day}</span>
                    <span className="text-gray-500 font-light">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>
              <div className="flex items-center space-x-4 mb-6 relative z-10">
                <div className="p-3 bg-white/10 rounded-xl">
                  <FaStar className="text-gold-500 text-xl" />
                </div>
                <h4 className="text-xl font-serif font-bold">Premium Assurance</h4>
              </div>
              <p className="mb-6 text-gray-400 font-light leading-relaxed relative z-10">
                At Olaluxe, we prioritize your satisfaction. Our concierge team guarantees a thoughtful response to all inquiries within 1 hour.
              </p>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 relative z-10">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold-500">Concierge Support Available</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Nigeria based • Global Reach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Contact;