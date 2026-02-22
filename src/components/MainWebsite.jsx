import React from 'react';
import Hero from './Hero';
import Shop from './Shop';
import WhyChooseUs from './WhyChooseUs';
import Contact from './Contact';
import Footer from './Footer';

const MainWebsite = () => {
  return (
    <div className="min-h-screen font-sans">
      <Hero />
      <Shop />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default MainWebsite;