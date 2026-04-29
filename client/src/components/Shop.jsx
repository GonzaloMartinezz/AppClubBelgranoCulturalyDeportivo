import React from 'react';

const Shop = () => {
  const products = [
    { id: 1, name: 'Camiseta Titular 2026', price: '$45.000', tag: 'NUEVO' },
    { id: 2, name: 'Camiseta Alternativa', price: '$45.000', tag: 'POPULAR' },
    { id: 3, name: 'Short Oficial', price: '$22.000', tag: '' },
    { id: 4, name: 'Buzo Entrenamiento', price: '$55.000', tag: 'PROMO' },
  ];

  return (
    <section id="shop" className="bg-dark py-0 relative overflow-hidden border-b-2 border-white/10">

      {/* Marquee Header */}
      <div className="bg-brand text-white py-4 border-y-2 border-white flex overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center font-oswald font-bold text-xl uppercase tracking-[0.2em]">
          <span className="mx-8">• STORE OFICIAL</span>
          <span className="mx-8">NUEVA TEMPORADA LIGA FEDERAL</span>
          <span className="mx-8">• INDUMENTARIA EXCLUSIVA</span>
          <span className="mx-8">ENVIOS A TODO EL PAÍS</span>
          <span className="mx-8">• STORE OFICIAL</span>
          <span className="mx-8">NUEVA TEMPORADA LIGA FEDERAL</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-7xl md:text-9xl font-teko font-bold uppercase leading-[0.8] tracking-normal text-white">
            Belgrano <br /> <span className="text-transparent border-text">Shop</span>
          </h2>
          <button className="hidden md:block border-b-2 border-brand text-brand font-oswald font-bold uppercase text-sm tracking-widest pb-1 hover:text-white hover:border-white transition-colors">
            Ver Catálogo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image Container */}
              <div className="bg-surface border-2 border-white/10 aspect-3/4 relative overflow-hidden mb-6 group-hover:border-white transition-colors duration-300">
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-white text-dark font-oswald font-bold text-[10px] uppercase tracking-widest px-3 py-1 z-10">
                    {product.tag}
                  </div>
                )}

                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-dark/50 z-0"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-teko text-6xl text-white/10 font-bold group-hover:scale-110 transition-transform duration-500">
                    B.
                  </span>
                </div>

                {/* Hover Buy Button */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <button className="w-full bg-brand text-white font-oswald font-bold uppercase text-sm tracking-widest py-3 hover:bg-white hover:text-dark transition-colors">
                    Añadir al Carrito
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-oswald font-bold text-white text-lg uppercase tracking-wider mb-1 group-hover:text-brand transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans text-gray-500 text-xs uppercase tracking-widest">Indumentaria</p>
                </div>
                <div className="font-teko font-bold text-2xl text-white">
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="md:hidden w-full mt-12 border-2 border-brand text-brand font-oswald font-bold uppercase text-sm tracking-widest py-4 hover:bg-brand hover:text-white transition-colors">
          Ver Catálogo Completo
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .border-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
};

export default Shop;
