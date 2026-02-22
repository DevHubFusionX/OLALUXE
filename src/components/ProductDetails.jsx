import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Button from './ui/Button';
import { API_ENDPOINTS, apiRequest } from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await apiRequest(`${API_ENDPOINTS.products}/${id}`);
      setProduct(data);
      if (data.colors?.length > 0) {
        setSelectedColor(data.colors[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    const images = selectedColor?.images || product?.images || [product?.image];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = selectedColor?.images || product?.images || [product?.image];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0);
  };

  const handleWhatsAppOrder = () => {
    const colorText = selectedColor ? ` in ${selectedColor.name}` : '';
    const message = `Hi, I'm interested in ${product.name}${colorText} for ${product.price}`;
    window.open(`https://wa.me/2349120491702?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-peach-200"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const currentImages = selectedColor?.images ||
    (product.images && product.images.length > 0 ? product.images :
      (product.image ? [product.image] : ['https://via.placeholder.com/400x400?text=No+Image']));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-8 lowercase tracking-widest">
          <button onClick={() => navigate('/')} className="hover:text-gold-600 transition-colors truncate">home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-gold-600 transition-colors truncate">shop</button>
          <span>/</span>
          <span className="text-gray-900 truncate font-semibold">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
              <div className="relative aspect-square bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden">
                <img
                  src={imageError ? 'https://via.placeholder.com/600x600?text=No+Image' : currentImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />

                {currentImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <FaChevronLeft size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <FaChevronRight size={14} className="sm:w-4 sm:h-4" />
                    </button>

                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {currentImageIndex + 1} / {currentImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Grid */}
            {currentImages.length > 1 && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2">
                  {currentImages.slice(0, 12).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${index === currentImageIndex ? 'border-peach-200 ring-1 sm:ring-2 ring-peach-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                  {currentImages.length > 12 && (
                    <div className="aspect-square bg-gray-100 rounded-md sm:rounded-lg flex items-center justify-center text-xs text-gray-500 font-medium">
                      +{currentImages.length - 12}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="bg-peach-50 text-gold-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-peach-100">
                  {product.category}
                </span>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm text-gray-500">In Stock</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <p className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">{product.price}</p>
                <span className="text-sm sm:text-base lg:text-lg text-gray-500">per piece</span>
              </div>
            </div>

            {/* Color Variants */}
            {product.colors && product.colors.length > 0 && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Available Colors</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-center ${selectedColor?.name === color.name
                        ? 'border-peach-200 bg-peach-50 text-gray-900 ring-1 sm:ring-2 ring-peach-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <div className="font-medium text-sm sm:text-base">{color.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
              </div>
            )}

            {/* Product Details */}
            {((product.material || product.fabricType) || (product.style || product.texture) || product.quality || product.care) && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Product Details</h3>
                <div className="space-y-3 sm:space-y-4">
                  {(product.material || product.fabricType) && (
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 gap-1 sm:gap-2">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">Material</span>
                      <span className="text-gray-900 text-sm sm:text-base">{product.material || product.fabricType}</span>
                    </div>
                  )}
                  {(product.style || product.texture) && (
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 gap-1 sm:gap-2">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">Style</span>
                      <span className="text-gray-900 text-sm sm:text-base">{product.style || product.texture}</span>
                    </div>
                  )}
                  {product.quality && (
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 gap-1 sm:gap-2">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">Quality</span>
                      <span className="text-gray-900 text-sm sm:text-base">{product.quality}</span>
                    </div>
                  )}
                  {product.care && (
                    <div className="flex flex-col sm:flex-row sm:justify-between py-2 gap-1 sm:gap-2">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">Care Instructions</span>
                      <span className="text-gray-900 text-sm sm:text-base">{product.care}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-peach-50">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-900 font-semibold">Quantity</span>
                <div className="flex items-center border border-peach-100 rounded-full bg-beige-50 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-400 hover:text-gold-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="px-4 font-bold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-400 hover:text-gold-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-gray-900 hover:bg-black text-white py-4 text-lg font-semibold rounded-full shadow-xl transition-all"
                  onClick={() => addToCart(product, quantity, selectedColor?.name)}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full border-peach-100 text-gray-700 py-4 text-lg font-semibold rounded-full transition-all"
                  icon={<FaWhatsapp size={20} />}
                  onClick={handleWhatsAppOrder}
                >
                  Order via WhatsApp
                </Button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-500 font-light">Fast response • Secure payment • Nationwide delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;