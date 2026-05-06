import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const baseStyles = `
    bg-surface border border-white/6 rounded-sm p-6
    transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)
    ${hover ? 'hover:border-brand hover:shadow-lg hover:-translate-y-2' : ''}
  `;

  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
