const Shop = () => {
  const products = [
    { id: 1, name: 'Camiseta Titular 2026', price: '$45.000', tag: 'NUEVO' },
    { id: 2, name: 'Camiseta Alternativa', price: '$45.000', tag: 'POPULAR' },
    { id: 3, name: 'Short Oficial', price: '$22.000', tag: '' },
    { id: 4, name: 'Buzo Entrenamiento', price: '$55.000', tag: 'PROMO' },
  ];

  return (
    <section id="shop" className="bg-dark relative overflow-hidden">
      {/* Marquee */}
      <div className="bg-brand py-4 overflow-hidden whitespace-nowrap border-y border-white/10">
        <div className="animate-marquee inline-flex items-center font-oswald font-bold text-sm uppercase tracking-[0.25em]">
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">STORE OFICIAL</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">NUEVA TEMPORADA 2026</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">INDUMENTARIA EXCLUSIVA</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">ENVIOS A TODO EL PAÍS</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">STORE OFICIAL</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">NUEVA TEMPORADA 2026</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">INDUMENTARIA EXCLUSIVA</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">ENVIOS A TODO EL PAÍS</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto py-24 px-6 md:px-12">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-7xl md:text-9xl font-teko font-bold uppercase leading-[0.85] tracking-tight">
            <span className="text-white">Belgrano</span><br />
            <span className="text-stroke">Shop</span>
          </h2>
          <button className="hidden md:block border-b-2 border-brand text-brand font-oswald font-bold uppercase text-xs tracking-[0.2em] pb-1 hover:text-white hover:border-white transition-colors">
            Ver Catálogo
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image */}
              <div className="bg-surface border border-white/10 aspect-[3/4] relative overflow-hidden mb-6 group-hover:border-brand/30 transition-colors duration-300">
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-white text-dark font-oswald font-bold text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 z-10">
                    {product.tag}
                  </div>
                )}

                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-teko text-7xl text-white/[0.05] font-bold group-hover:scale-110 transition-transform duration-500">
                    B.
                  </span>
                </div>

                {/* Hover Buy */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <button className="w-full bg-brand text-white font-oswald font-bold uppercase text-[10px] tracking-[0.2em] py-4 hover:bg-white hover:text-dark transition-colors">
                    Añadir al Carrito
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-oswald font-bold text-white text-base uppercase tracking-wider mb-1 group-hover:text-brand transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans text-gray-600 text-[10px] uppercase tracking-[0.2em]">Indumentaria</p>
                </div>
                <span className="font-teko font-bold text-2xl text-white">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <button className="md:hidden w-full mt-12 border border-brand text-brand font-oswald font-bold uppercase text-xs tracking-[0.2em] py-4 hover:bg-brand hover:text-white transition-colors">
          Ver Catálogo Completo
        </button>
      </div>
    </section>
  );
};

export default Shop;
