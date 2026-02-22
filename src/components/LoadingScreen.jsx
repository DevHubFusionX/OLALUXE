import React from 'react';
import Logo from './ui/Logo';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center w-full max-w-sm px-6">
        <div className="mb-8 transform hover:scale-105 transition-transform duration-700">
          <Logo size="xl" showDetails={true} />
        </div>
        <div className="relative w-48 h-1 bg-beige-100 rounded-full mx-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-peach-100 via-gold-500 to-peach-100 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
        </div>
        <p className="text-gold-600 font-serif font-bold tracking-[0.3em] uppercase text-[10px] mt-4 ml-1 animate-pulse">
          Crafting Elegance
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;