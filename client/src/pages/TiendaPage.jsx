import { useState } from 'react';

const products = [
  { id: 1, name: 'Camiseta Titular 2026', price: 45000, category: 'CAMISETAS',    tag: 'NUEVO',   sizes: ['S','M','L','XL','XXL'], desc: 'Camiseta oficial del plantel, polyéster premium con DryFit.' },
  { id: 2, name: 'Camiseta Alternativa',  price: 45000, category: 'CAMISETAS',    tag: 'POPULAR', sizes: ['S','M','L','XL'], desc: 'Versión alternativa en blanco con detalles azules.' },
  { id: 3, name: 'Short Oficial',         price: 22000, category: 'INDUMENTARIA', tag: '',         sizes: ['S','M','L','XL'], desc: 'Short oficial del equipo, tela transpirable.' },
  { id: 4, name: 'Buzo Entrenamiento',    price: 55000, category: 'INDUMENTARIA', tag: 'PROMO',   sizes: ['M','L','XL','XXL'], desc: 'Buzo de entrenamiento del plantel.' },
  { id: 5, name: 'Gorra Belgrano',        price: 12000, category: 'ACCESORIOS',   tag: '',         sizes: ['ÚNICA'], desc: 'Gorra bordada con escudo oficial.' },
  { id: 6, name: 'Mochila Deportiva',     price: 35000, category: 'ACCESORIOS',   tag: 'NUEVO',   sizes: ['ÚNICA'], desc: 'Mochila oficial con bolsillos deportivos.' },
  { id: 7, name: 'Kit Completo',          price: 85000, category: 'COMBOS',       tag: 'OFERTA',  sizes: ['S','M','L','XL'], desc: 'Camiseta + Short + Medias. Ahorrá $27.000.' },
  { id: 8, name: 'Pack Hincha',           price: 25000, category: 'COMBOS',       tag: 'OFERTA',  sizes: ['ÚNICA'], desc: 'Gorra + Bufanda + Pin oficial.' },
];

const categories = ['TODOS', 'CAMISETAS', 'INDUMENTARIA', 'ACCESORIOS', 'COMBOS'];

const TiendaPage = () => {
  const [filter, setFilter]         = useState('TODOS');
  const [cart, setCart]             = useState([]);
  const [cartOpen, setCartOpen]     = useState(false);
  const [selected, setSelected]     = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  const filtered = filter === 'TODOS' ? products : products.filter(p => p.category === filter);

  const addToCart = (product, size) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id && i.size === size);
      if (ex) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, size, qty: 1 }];
    });
    setSelected(null);
    setSelectedSize('');
    setCartOpen(true);
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="pt-16" style={{ background: 'var(--color-dark)' }}>

      {/* Header */}
      <section className="relative overflow-hidden py-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container relative z-10">
          <div className="section-hero-title absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none" style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }}>
            SHOP
          </div>
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="section-label mb-4">Store Oficial</p>
              <h1 className="font-teko font-bold uppercase leading-[0.88] tracking-tight text-white" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
                Belgrano<br /><span style={{ color: 'var(--color-accent)' }}>Shop</span>
              </h1>
            </div>
            <button onClick={() => setCartOpen(true)} className="btn-secondary relative">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Carrito</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 font-oswald font-bold text-[10px] text-white flex items-center justify-center" style={{ background: 'var(--color-accent)', borderRadius: '99px' }}>
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 border-b" style={{ background: 'rgba(18,18,18,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="flex-shrink-0 font-oswald font-bold text-[12px] uppercase tracking-[0.1em] px-4 py-2 transition-all"
              style={{
                borderRadius: '10px',
                background: filter === c ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: filter === c ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            >
              {c === 'TODOS' ? 'Todos' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="py-8">
        <div className="app-container">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="card group cursor-pointer" style={{ borderRadius: '12px' }}
                onClick={() => { setSelected(p); setSelectedSize(''); }}>
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  {p.tag && <span className="absolute top-3 left-3 z-10 badge badge-accent">{p.tag}</span>}
                  <img src="/shop-jerseys.png" alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ opacity: 0.8 }} />
                </div>
                <div className="p-4">
                  <h3 className="font-oswald font-bold text-sm text-white uppercase tracking-wide group-hover:text-[var(--color-accent)] transition-colors truncate">{p.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-sans text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>{p.category}</span>
                    <span className="font-teko font-bold text-xl" style={{ color: 'var(--color-accent)' }}>${p.price.toLocaleString('es-AR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(12,12,12,0.95)', backdropFilter: 'blur(16px)' }} onClick={() => setSelected(null)}>
          <div className="card relative max-w-lg w-full p-6" style={{ borderRadius: '16px' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✕</button>
            <div className="flex gap-6">
              <div className="w-1/2 overflow-hidden" style={{ borderRadius: '10px', aspectRatio: '3/4' }}>
                <img src="/shop-jerseys.png" alt={selected.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-1/2 flex flex-col justify-between">
                <div>
                  {selected.tag && <span className="badge badge-accent mb-3">{selected.tag}</span>}
                  <h2 className="font-teko font-bold text-2xl text-white uppercase mb-1">{selected.name}</h2>
                  <p className="font-teko font-bold text-3xl mb-3" style={{ color: 'var(--color-accent)' }}>${selected.price.toLocaleString('es-AR')}</p>
                  <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{selected.desc}</p>
                  <p className="font-oswald text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Talles</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {selected.sizes.map(s => (
                      <button key={s} onClick={() => setSelectedSize(s)}
                        className="font-oswald font-bold text-[11px] uppercase px-3 py-2 transition-all"
                        style={{
                          borderRadius: '8px',
                          background: selectedSize === s ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)',
                          color: selectedSize === s ? '#fff' : 'rgba(255,255,255,0.4)',
                          border: `1px solid ${selectedSize === s ? 'var(--color-accent)' : 'rgba(255,255,255,0.08)'}`,
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => selectedSize && addToCart(selected, selectedSize)}
                  disabled={!selectedSize}
                  className={selectedSize ? 'btn-accent w-full mt-4' : 'btn-secondary w-full mt-4'}
                  style={{ opacity: selectedSize ? 1 : 0.5 }}>
                  {selectedSize ? 'Agregar al Carrito' : 'Elegí un talle'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart sidebar */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm flex flex-col transition-transform duration-400" style={{ background: 'var(--color-surface)', borderLeft: '1px solid rgba(255,255,255,0.06)', transform: cartOpen ? 'translateX(0)' : 'translateX(100%)', boxShadow: '-16px 0 60px rgba(0,0,0,0.5)' }}>
        <div className="flex justify-between items-center p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="font-teko text-xl font-bold text-white uppercase">Carrito</h2>
          <button onClick={() => setCartOpen(false)} style={{ color: 'rgba(255,255,255,0.4)' }}>✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <p className="text-center py-12 font-oswald uppercase tracking-widest text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>Vacío</p>
          ) : cart.map(item => (
            <div key={`${item.id}-${item.size}`} className="card-flat flex gap-3 p-3" style={{ borderRadius: '10px' }}>
              <div className="w-12 h-14 overflow-hidden flex-shrink-0" style={{ borderRadius: '6px' }}>
                <img src="/shop-jerseys.png" alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-oswald font-bold text-xs text-white uppercase truncate">{item.name}</h4>
                <p className="font-oswald text-[9px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>Talle: {item.size} · x{item.qty}</p>
                <span className="font-teko font-bold text-lg" style={{ color: 'var(--color-accent)' }}>${(item.price * item.qty).toLocaleString('es-AR')}</span>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex justify-between mb-4">
              <span className="font-oswald uppercase tracking-wider text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Total</span>
              <span className="font-teko font-bold text-2xl text-white">${total.toLocaleString('es-AR')}</span>
            </div>
            <button className="btn-accent w-full">Finalizar Compra</button>
          </div>
        )}
      </div>
      {cartOpen && <div className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setCartOpen(false)} />}
    </div>
  );
};

export default TiendaPage;
