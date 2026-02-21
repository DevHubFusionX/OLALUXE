import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonies = () => {
  const testimonies = [
    {
      id: 1,
      name: "Adebayo Olumide",
      location: "Lagos",
      rating: 5,
      text: "Excellent quality fabrics at affordable prices. The traditional wear I ordered exceeded my expectations. Fast delivery too!",
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Fatima Yusuf",
      location: "Abuja",
      rating: 5,
      text: "Moderate's Textile has the best collection of modest wear. The customer service is outstanding and prices are very reasonable.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Musa Abdullahi",
      location: "Kano",
      rating: 5,
      text: "I've been ordering from them for months. Quality is consistent and the WhatsApp ordering process is so convenient.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 4,
      name: "Aisha Mohammed",
      location: "Kaduna",
      rating: 5,
      text: "Beautiful designs and excellent fabric quality. My husband loves his new traditional outfits from Moderate's Textile.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 5,
      name: "Folake Adebayo",
      location: "Lagos",
      rating: 5,
      text: "Outstanding service and premium quality fabrics! The delivery was prompt and the packaging was excellent. Highly recommended!",
      image: "/api/placeholder/60/60"
    }
  ];

  return (
    <section id="testimonies" className="py-24 bg-beige-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">Client Kind Words</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-peach-200 via-gold-500 to-peach-200 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Voices of elegance from our community of sophisticated women
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {testimonies.map((testimony, index) => (
            <div
              key={testimony.id}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-500 border border-peach-50/50 group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  {[...Array(testimony.rating)].map((_, i) => (
                    <FaStar key={i} className="text-gold-500 text-sm mr-1" />
                  ))}
                </div>

                <div className="relative mb-8">
                  <FaQuoteLeft className="text-peach-100 text-4xl absolute -top-4 -left-2 opacity-40 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-700 leading-relaxed italic text-lg relative z-10 font-light pl-6">
                    {testimony.text.replace("Moderate's Textile", "Olaluxe").replace("traditional wear", "exquisite sets").replace("traditional outfits", "jewelry collections")}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-beige-50 flex items-center space-x-4">
                  <div className="w-14 h-14 bg-peach-50 rounded-2xl flex items-center justify-center border border-peach-100 group-hover:bg-peach-100 transition-colors">
                    <span className="text-gold-600 font-serif font-bold text-xl">
                      {testimony.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-gray-900 text-lg tracking-tight">{testimony.name}</h4>
                    <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">{testimony.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-gray-900 text-white p-12 rounded-[3rem] max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-bold mb-4">Become Part of the Olaluxe Legacy</h3>
              <p className="mb-10 text-gray-400 font-light text-lg">Experience the pinnacle of sophisticated luxury and timeless craft.</p>
              <a
                href="/products"
                className="inline-flex items-center bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-peach-50 transition-all shadow-lg group"
              >
                <span>Explore the Collection</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Testimonies;