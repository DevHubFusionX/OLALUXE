import React from 'react';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useCart } from '../../context/CartContext';

const ComboCard = ({ combo, showActions = false, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    if (!showActions) {
      const comboId = combo._id || combo.id;
      console.log('Navigating to combo:', comboId, combo);
      navigate(`/combo/${comboId}`);
    }
  };
  return (
    <div
      className={`group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 h-[480px] flex flex-col ${!showActions ? 'cursor-pointer' : ''
        }`}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden h-56 flex-shrink-0">
        <img
          src={combo.images?.[0] || combo.image || 'https://via.placeholder.com/400x400?text=No+Image'}
          alt={combo.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {combo.images && combo.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium">
            +{combo.images.length - 1} more
          </div>
        )}

        {combo.popular && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <FaStar size={10} />
            <span>Popular</span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
          <div className="bg-gold-500 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
            Save {combo.savings}
          </div>
          {combo.colors && combo.colors.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-sm border border-peach-100 italic">
              {combo.colors.length} Variations
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">{combo.name}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {combo.description}
        </p>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xl font-serif font-bold text-gray-900">{combo.comboPrice}</span>
            <span className="text-sm text-gray-500 line-through">{combo.originalPrice}</span>
          </div>
          <div className="text-xs text-red-600 font-semibold">
            You save {combo.savings}
          </div>
        </div>

        {combo.products && combo.products.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Includes {combo.products.length} items:</p>
            <div className="text-xs text-gray-600">
              {combo.products.slice(0, 2).map((product, index) => (
                <span key={index}>
                  {typeof product === 'string' ? product : product.name}
                  {index < Math.min(combo.products.length - 1, 1) && ', '}
                </span>
              ))}
              {combo.products.length > 2 && ` +${combo.products.length - 2} more`}
            </div>
          </div>
        )}

        <div className="mt-auto">
          {showActions ? (
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" onClick={() => onEdit(combo)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(combo._id)}>
                Delete
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="primary"
                className="flex-1"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  const images = combo.images || (combo.image ? [combo.image] : []);
                  addToCart({
                    ...combo,
                    price: combo.comboPrice,
                    image: images[0],
                    itemType: 'Combo'
                  });
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="whatsapp"
                className="w-10 h-10 p-0 flex items-center justify-center bg-beige-50 border border-peach-100 text-green-600 hover:bg-white transition-all shadow-sm"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://wa.me/2349120491702?text=Hi, I'm interested in the ${combo.name} combo for ${combo.comboPrice}`, '_blank');
                }}
              >
                <FaWhatsapp size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComboCard;