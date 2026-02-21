import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Logo = ({ size = 'md', showDetails = false }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-xs', monogram: 'text-lg' },
    md: { container: 'w-12 h-12', text: 'text-sm', monogram: 'text-xl' },
    lg: { container: 'w-16 h-16', text: 'text-base', monogram: 'text-2xl' },
    xl: { container: 'w-24 h-24', text: 'text-lg', monogram: 'text-4xl' }
  };

  const MonogramIcon = () => (
    <div className={`${sizes[size].container} bg-gradient-to-br from-peach-200 to-gold-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
      <span className={`${sizes[size].monogram} font-serif font-bold text-white tracking-widest`}>
        O
      </span>
    </div>
  );

  if (!showDetails) {
    return <MonogramIcon />;
  }

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <MonogramIcon />
      </div>
      <div className="mt-3">
        <h1 className={`${sizes[size].text} font-serif font-bold text-gray-900 tracking-[0.2em]`}>
          OLALUXE.NG
        </h1>
        <div className="flex justify-center space-x-3 mt-2">
          <a href="https://x.com/moderate_ustaz" className="text-gray-400 hover:text-black transition-colors">
            <FaXTwitter size={14} />
          </a>
          <a href="https://instagram.com/olaluxe_brand" className="text-gray-400 hover:text-peach-200 transition-colors">
            <FaInstagram size={14} />
          </a>
          <a href="https://wa.me/2349120491702" className="text-gray-400 hover:text-green-500 transition-colors">
            <FaWhatsapp size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Logo;
