import React, { useState } from 'react';
import { FaEdit, FaTimes, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ComboCard = ({
  combo,
  onEdit,
  onDelete,
  onPreview,
  isEditing,
  isDeleting
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = combo.images && combo.images.length > 0
    ? combo.images
    : combo.image
      ? (Array.isArray(combo.image) ? combo.image : [combo.image])
      : ['/api/placeholder/300/200'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-peach-100/50 hover:border-peach-200 h-[340px] flex flex-col animate-scale-in">
      {/* Visual Header */}
      <div className="relative h-40 flex-shrink-0 group-hover:h-44 transition-all duration-500 overflow-hidden">
        <img
          src={imageError ? '/api/placeholder/300/200' : images[currentImageIndex]}
          alt={combo.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={() => setImageError(true)}
        />

        {/* Gallery Navigation */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevImage}
              className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-md text-gray-900 rounded-full hover:bg-white shadow-lg transition-transform hover:scale-110"
            >
              <FaChevronLeft size={10} />
            </button>
            <button
              onClick={nextImage}
              className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-md text-gray-900 rounded-full hover:bg-white shadow-lg transition-transform hover:scale-110"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {combo.popular && (
            <div className="bg-gray-900/80 backdrop-blur-md text-peach-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
              Featured Highlight
            </div>
          )}
          <div className="bg-white/80 backdrop-blur-md text-gray-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
            {combo.products?.length || 0} Piece Collection
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-gray-900/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-medium tracking-widest">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {(isEditing || isDeleting) && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-900/20 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3.5 flex flex-col flex-1 bg-gradient-to-b from-white to-transparent">
        <div className="mb-2">
          <h3 className="text-sm font-serif font-bold text-gray-900 mb-0.5 leading-tight group-hover:text-gold-600 transition-colors uppercase tracking-tight line-clamp-1">
            {combo.name}
          </h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-serif font-bold text-gray-900">{combo.comboPrice}</span>
            <span className="text-[10px] text-gray-400 font-medium line-through decoration-peach-200">{combo.originalPrice}</span>
          </div>
        </div>

        <div className="mt-auto pt-2 border-t border-peach-50/50">

          <div className="flex gap-2">
            <button
              onClick={() => onPreview(combo)}
              className="w-10 h-10 flex items-center justify-center bg-beige-50 hover:bg-white text-gray-600 rounded-xl transition-all border border-peach-100 shadow-sm active:scale-95"
            >
              <FaEye size={14} />
            </button>
            <button
              onClick={() => onEdit(combo)}
              disabled={isEditing || isDeleting}
              className="flex-1 bg-gray-900 hover:bg-black text-white py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              Refine
            </button>
            <button
              onClick={() => onDelete(combo._id)}
              disabled={isEditing || isDeleting}
              className="w-10 h-10 flex items-center justify-center border border-peach-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboCard;