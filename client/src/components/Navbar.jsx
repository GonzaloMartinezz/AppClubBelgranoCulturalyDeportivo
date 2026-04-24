import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-dark/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center">
        {/* Placeholder for Logo */}
        <div className="text-2xl font-bold text-white tracking-tighter">
          BELGRANO<span className="text-brand"> TUCUMÁN</span>
        </div>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-semibold tracking-widest uppercase">
        <a href="#" className="hover:text-brand transition-colors">Home</a>
        <a href="#" className="hover:text-brand transition-colors">Nuestra Familia</a>
        <a href="#" className="hover:text-brand transition-colors">Galería</a>
        <a href="#" className="hover:text-brand transition-colors">Shop</a>
      </div>
      <div className="md:hidden">
        {/* Mobile menu icon could go here */}
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
