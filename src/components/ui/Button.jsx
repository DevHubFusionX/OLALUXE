import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5';

  const variants = {
    primary: 'bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-beige-100 hover:bg-beige-200 text-gray-800 shadow-md hover:shadow-lg',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-100',
    outline: 'border-2 border-peach-200 text-gray-800 hover:bg-peach-50 hover:border-peach-100',
    whatsapp: 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:shadow-xl'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed transform-none' : '';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      )}
      {icon && !loading && icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;