import React, { useState } from 'react';
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useCart } from '../../context/CartContext';

const ProductCard = React.memo(({ product, showActions = false, onEdit, onDelete, isDeleting = false }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = product.images && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : ['/api/placeholder/400/400'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCardClick = () => {
    if (!showActions) {
      navigate(`/product/${product._id}`);
    }
  };

  return (
    <div
      className={`group bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-peach-100/50 hover:border-peach-200 h-[340px] flex flex-col animate-scale-in ${!showActions ? 'cursor-pointer' : ''
        }`}
      onClick={handleCardClick}
    >
      <div className="relative h-40 flex-shrink-0 group-hover:h-44 transition-all duration-500 overflow-hidden">
        <img
          src={imageError ? '/api/placeholder/400/400' : images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={() => setImageError(true)}
        />

        {images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-md text-gray-900 rounded-full hover:bg-white shadow-lg transition-transform hover:scale-110"
            >
              <FaChevronLeft size={10} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-md text-gray-900 rounded-full hover:bg-white shadow-lg transition-transform hover:scale-110"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-white/80 backdrop-blur-md text-gray-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
            {product.category}
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-gray-900/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-medium tracking-widest">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {isDeleting && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-900/20 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-1 bg-gradient-to-b from-white to-transparent">
        <div className="mb-2">
          <h3 className="text-sm font-serif font-bold text-gray-900 mb-0.5 leading-tight group-hover:text-gold-600 transition-colors uppercase tracking-tight line-clamp-1">{product.name}</h3>
          <span className="text-lg font-serif font-bold text-gray-900">{product.price}</span>
        </div>

        <div className="mt-auto pt-2 border-t border-peach-50/50">
          {showActions ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                disabled={isDeleting}
                className="flex-1 bg-gray-900 hover:bg-black text-white py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                Refine
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(product._id); }}
                disabled={isDeleting}
                className="w-9 h-9 flex items-center justify-center border border-peach-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                className="flex-1 bg-gray-900 hover:bg-black text-white py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
              <button
                className="w-10 h-10 bg-beige-50 hover:bg-white text-green-600 rounded-xl transition-all border border-peach-100 flex items-center justify-center shadow-sm active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://wa.me/2349120491702?text=Hi, I'm interested in ${product.name} for ${product.price}`, '_blank');
                }}
              >
                <FaWhatsapp size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;