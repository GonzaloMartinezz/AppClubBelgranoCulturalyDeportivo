import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-oswald uppercase text-white/80 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full bg-white/4 border border-white/8 rounded-[10px]
          px-4 py-3 text-white text-sm
          placeholder:text-white/25
          focus:outline-none focus:border-brand/40 focus:bg-brand/5
          transition-all duration-200
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
