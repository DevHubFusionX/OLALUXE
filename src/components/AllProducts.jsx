import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaArrowLeft, FaSearch, FaFilter, FaTh, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ui/ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { cache } from '../utils/cache';
import { API_ENDPOINTS, apiRequest } from '../utils/api';

const AllProducts = React.memo(() => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  const categories = ['All', 'Traditional', 'Premium', 'Fabrics', 'Casual', 'Accessories'];

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

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="pt-20">
        <div className="bg-white shadow-sm border-b mb-6 sm:mb-8">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">Our Collections</h1>
                <p className="text-gray-600 text-sm sm:text-base italic">Discover exquisite jewelry & timeless essentials</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-peach-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <FaTh size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-peach-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <FaList size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 pb-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative sm:col-span-2 lg:col-span-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent text-sm sm:text-base outline-none"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-3 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent text-sm sm:text-base outline-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-3 border border-peach-100 rounded-xl focus:ring-2 focus:ring-peach-200 focus:border-transparent text-sm sm:text-base outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="flex items-center justify-center bg-peach-50/50 border border-peach-100 rounded-xl px-4 py-3 sm:col-span-2 lg:col-span-1">
                <span className="text-gray-700 font-bold text-sm sm:text-base tracking-widest">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}
                </span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
              {[...Array(8)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {viewMode === 'grid' ? (
                    <ProductCard product={product} />
                  ) : (
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 cursor-pointer"
                      onClick={() => navigate(`/product/${product._id}`)}>
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={product.images?.[0] || product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                            <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900">{product.name}</h3>
                            <span className="text-xl sm:text-2xl font-serif font-bold text-gray-900">{product.price}</span>
                          </div>
                          <span className="inline-block bg-peach-50 text-gold-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-peach-100 mb-3">
                            {product.category}
                          </span>
                          {product.description && (
                            <p className="text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-gray-500">
                            {product.fabricType && <span>• {product.fabricType}</span>}
                            {product.quality && <span>• {product.quality}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSortBy('newest');
                  }}
                  className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg"
                >
                  Clear Filters
                </button>
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