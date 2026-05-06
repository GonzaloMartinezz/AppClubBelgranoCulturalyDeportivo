import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-brand hover:bg-brand-light text-white font-teko uppercase px-8 py-3',
    secondary: 'bg-transparent border border-white/20 hover:border-white text-white font-teko uppercase px-8 py-3',
    outline: 'border-2 border-brand text-brand hover:bg-brand hover:text-white font-teko uppercase px-8 py-3',
    ghost: 'text-white hover:text-brand transition-colors',
  };

  const baseStyles = 'inline-flex items-center justify-center rounded-sm transition-all duration-300 cursor-pointer';
  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
