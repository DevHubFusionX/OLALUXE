import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import ProductCard from './ui/ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { cache } from '../utils/cache';
import { API_ENDPOINTS, apiRequest } from '../utils/api';

const AllProducts = React.memo(() => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const cachedProducts = cache.get('products');
    if (cachedProducts) {
      setProducts(cachedProducts);
      setLoading(false);
      return;
    }

    try {
      const data = await apiRequest(API_ENDPOINTS.products);
      if (Array.isArray(data)) {
        setProducts(data);
        cache.set('products', data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-50">
      <div className="pt-24 pb-12">
        {/* Hero Banner */}
        <div className="relative h-56 sm:h-64 lg:h-80 bg-cover bg-center mb-10 rounded-none overflow-hidden"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop')` }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-3">
              Welcome to <span className="italic text-gold-500">Olaluxe</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto rounded-full mb-4"></div>
            <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
              Discover exquisite jewelry & timeless essentials
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-peach-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-peach-200 text-2xl" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600">Check back soon for new arrivals!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

AllProducts.displayName = 'AllProducts';
export default AllProducts;