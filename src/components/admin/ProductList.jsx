import React from 'react';
import { FaPlus } from 'react-icons/fa';
import ProductCard from '../ui/ProductCard';

const ProductList = ({
  products,
  onEdit,
  onDelete,
  deletingId,
  onAddNew
}) => {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-peach-100 overflow-hidden relative">
      <div className="p-5 sm:p-6 border-b border-peach-50 bg-gradient-to-r from-white/40 to-transparent">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Collection Pieces</h2>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">Manage individual items in your catalog</p>
          </div>
          <button
            onClick={onAddNew}
            className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md group"
          >
            <FaPlus className="text-[10px] group-hover:rotate-90 transition-transform duration-300" />
            <span className="tracking-wide">Add New Piece</span>
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showActions={true}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={deletingId === product._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;