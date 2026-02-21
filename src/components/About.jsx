import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-beige-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">The Olaluxe.ng Story</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-peach-200 via-gold-500 to-peach-200 mx-auto rounded-full shadow-sm"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                Olaluxe.ng is born from a passion for timeless elegance and sophisticated craft.
                We curate exquisite jewelry, premium bags, and girly essentials for the modern woman who values subtlety and grace.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to empower women through confidence-inspiring pieces, offering a
                carefully selected collection that reflects both contemporary style and enduring heritage.
              </p>
              <div className="bg-white p-8 rounded-3xl border border-peach-50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-500"></div>
                <blockquote className="text-2xl font-serif italic text-gray-800 leading-snug">
                  "Elegance is not about being noticed, it's about being remembered."
                </blockquote>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-peach-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-peach-50/50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 relative z-10">Our Core Values</h3>
              <div className="space-y-6 relative z-10">
                {[
                  'Exquisite Craftsmanship',
                  'Timeless Sophistication',
                  'Personalized Luxury Experience',
                  'Empowering Femininity'
                ].map((value, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium tracking-wide uppercase text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default About;