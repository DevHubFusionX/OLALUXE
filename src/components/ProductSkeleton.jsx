import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse h-[340px]">
      <div className="w-full h-40 bg-gray-300"></div>
      <div className="p-3.5">
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="flex gap-2 mt-auto">
          <div className="flex-1 h-9 bg-gray-200 rounded-xl"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;