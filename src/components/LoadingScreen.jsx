import React from 'react';
import Logo from './ui/Logo';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-pulse mb-4">
          <Logo size="xl" />
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-peach-200 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;