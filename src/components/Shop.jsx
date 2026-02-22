import React, { useState, useEffect } from 'react';
import ProductCard from './ui/ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { cache } from '../utils/cache';
import { API_ENDPOINTS, apiRequest } from '../utils/api';

const Shop = () => {
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
      setProducts(data);
      cache.set('products', data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="shop" className="py-24 bg-beige-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-peach-50 text-gold-600 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border border-peach-100">
            ✨ Featured Products
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">Shop Our Collection</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-peach-200 via-gold-500 to-peach-200 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Quality jewelry and accessories at competitive prices. Fast delivery nationwide.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {products.slice(0, 4).map((product, index) => (
                <div
                  key={product._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-20">
              <div className="bg-white rounded-3xl p-10 max-w-3xl mx-auto shadow-sm border border-peach-50">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">View Complete Catalog</h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">Browse our full inventory of premium jewelry, bags, and accessories.</p>
                <a href="/products" className="inline-flex items-center bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-semibold shadow-xl transition-all group">
                  <span>Shop All Products</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;