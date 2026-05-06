import React from 'react';

const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-brand text-white',
    secondary: 'bg-accent text-black',
    accent: 'bg-accent-2 text-black',
    outline: 'bg-transparent border border-brand text-brand',
    muted: 'bg-surface-3 text-muted',
  };

  const baseStyles = `
    inline-flex items-center justify-center
    px-3 py-1 rounded-full
    font-oswald text-xs uppercase tracking-wider
  `;

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
