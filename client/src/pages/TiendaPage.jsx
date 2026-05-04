import { useState } from 'react';

const products = [
  { id: 1, name: 'Camiseta Titular 2026', price: 45000, category: 'CAMISETAS', tag: 'NUEVO', sizes: ['S', 'M', 'L', 'XL', 'XXL'], desc: 'Camiseta oficial del plantel, polyéster premium con DryFit.' },
  { id: 2, name: 'Camiseta Alternativa', price: 45000, category: 'CAMISETAS', tag: 'POPULAR', sizes: ['S', 'M', 'L', 'XL'], desc: 'Versión alternativa en blanco con detalles azules.' },
  { id: 3, name: 'Short Oficial', price: 22000, category: 'INDUMENTARIA', tag: '', sizes: ['S', 'M', 'L', 'XL'], desc: 'Short oficial del equipo, tela transpirable.' },
  { id: 4, name: 'Buzo Entrenamiento', price: 55000, category: 'INDUMENTARIA', tag: 'PROMO', sizes: ['M', 'L', 'XL', 'XXL'], desc: 'Buzo de entrenamiento del plantel.' },
  { id: 5, name: 'Gorra Belgrano', price: 12000, category: 'ACCESORIOS', tag: '', sizes: ['ÚNICA'], desc: 'Gorra bordada con escudo oficial.' },
  { id: 6, name: 'Mochila Deportiva', price: 35000, category: 'ACCESORIOS', tag: 'NUEVO', sizes: ['ÚNICA'], desc: 'Mochila oficial con bolsillos deportivos.' },
  { id: 7, name: 'Kit Completo', price: 85000, category: 'COMBOS', tag: 'OFERTA', sizes: ['S', 'M', 'L', 'XL'], desc: 'Camiseta + Short + Medias. Ahorrá $27.000.' },
  { id: 8, name: 'Pack Hincha', price: 25000, category: 'COMBOS', tag: 'OFERTA', sizes: ['ÚNICA'], desc: 'Gorra + Bufanda + Pin oficial.' },
];

const categories = ['TODOS', 'CAMISETAS', 'INDUMENTARIA', 'ACCESORIOS', 'COMBOS'];

const SectionTitle = ({ title, subtitle, align = 'center' }) => (
  <div style={{ marginBottom: '40px', textAlign: align }}>
    <h2 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4.5rem)', textTransform: 'uppercase', lineHeight: 0.9, color: 'white', letterSpacing: '-0.02em' }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', marginTop: '8px' }}>
        {subtitle}
      </p>
    )}
  </div>
);

const TiendaPage = () => {
  const [filter, setFilter] = useState('TODOS');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);
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
    <div style={{ background: 'var(--color-dark)', paddingTop: '68px', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '40vh', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="/shop-jerseys.png" alt="Shop" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,28,28,0.2) 0%, var(--color-dark) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '10px' }}>
            Store Oficial
          </p>
          <h1 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(4rem, 15vw, 8rem)', textTransform: 'uppercase', color: 'white', lineHeight: 0.8, margin: 0 }}>
            BELGRANO SHOP
          </h1>
        </div>
      </section>

      {/* Filters & Cart Button */}
      <div className="sticky top-[68px] z-30 border-b" style={{ background: 'rgba(28,28,28,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          <div className="flex gap-2 overflow-x-auto max-w-full scrollbar-hide">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className="shrink-0 font-oswald font-bold text-[12px] uppercase tracking-widest px-4 py-2 transition-all duration-200"
                style={{ borderRadius: '10px', background: filter === c ? 'var(--color-accent)' : 'transparent', color: filter === c ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                {c === 'TODOS' ? 'Todos' : c}
              </button>
            ))}
          </div>
          <button onClick={() => setCartOpen(true)} className="btn-secondary relative" style={{ borderRadius: '12px' }}>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-oswald uppercase tracking-wider text-sm font-bold">Carrito</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 font-oswald font-bold text-[11px] text-white flex items-center justify-center" style={{ background: 'var(--color-accent)', borderRadius: '50%', border: '2px solid var(--color-dark)' }}>
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="app-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div key={p.id} className="group cursor-pointer" style={{ background: 'var(--color-surface-2)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.03)', transition: 'transform 0.3s ease' }}
                onClick={() => { setSelected(p); setSelectedSize(''); }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ position: 'relative', height: '240px', background: 'rgba(255,255,255,0.02)' }}>
                  {p.tag && <span className="absolute top-4 left-4 z-10 badge badge-accent">{p.tag}</span>}
                  <img src="/shop-jerseys.png" alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" style={{ opacity: 0.9 }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-teko)', fontWeight: 700, fontSize: '1.6rem', color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '8px' }}>
                    {p.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <span style={{ fontFamily: 'var(--font-oswald)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.category}</span>
                    <span style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--color-accent)', lineHeight: 1 }}>
                      ${p.price.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(12,12,12,0.98)', backdropFilter: 'blur(20px)' }} onClick={() => setSelected(null)}>
          <div className="relative max-w-3xl w-full flex flex-col md:flex-row gap-0 overflow-hidden" style={{ background: 'var(--color-surface)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white z-10 bg-black/50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">✕</button>
            <div className="w-full md:w-1/2 relative" style={{ minHeight: '300px' }}>
              <img src="/shop-jerseys.png" alt={selected.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                {selected.tag && <span className="badge badge-accent mb-4">{selected.tag}</span>}
                <h2 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '3rem', color: 'white', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '8px' }}>{selected.name}</h2>
                <p style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '2.5rem', color: 'var(--color-accent)', marginBottom: '16px' }}>${selected.price.toLocaleString('es-AR')}</p>
                <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '24px' }}>{selected.desc}</p>
                
                <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white', marginBottom: '12px' }}>Seleccionar Talle</p>
                <div className="flex gap-2 flex-wrap mb-8">
                  {selected.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className="font-oswald font-bold text-[12px] uppercase transition-all"
                      style={{
                        width: '48px', height: '48px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '12px',
                        background: selectedSize === s ? 'var(--color-accent)' : 'var(--color-surface-2)',
                        color: selectedSize === s ? '#fff' : 'rgba(255,255,255,0.6)',
                        border: `1px solid ${selectedSize === s ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)'}`,
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => selectedSize && addToCart(selected, selectedSize)}
                disabled={!selectedSize}
                className={selectedSize ? 'btn-accent w-full' : 'btn-secondary w-full'}
                style={{ opacity: selectedSize ? 1 : 0.5, padding: '16px', fontSize: '14px', borderRadius: '12px' }}>
                {selectedSize ? 'Agregar al Carrito' : 'Elegí un talle'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart sidebar */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm flex flex-col transition-transform duration-500" style={{ background: 'var(--color-surface)', borderLeft: '1px solid rgba(255,255,255,0.06)', transform: cartOpen ? 'translateX(0)' : 'translateX(100%)', boxShadow: '-20px 0 80px rgba(0,0,0,0.8)' }}>
        <div className="flex justify-between items-center p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '2rem', color: 'white', textTransform: 'uppercase', lineHeight: 1 }}>CARRITO</h2>
          <button onClick={() => setCartOpen(false)} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem' }}>✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontFamily: 'var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>Tu carrito está vacío</p>
            </div>
          ) : cart.map(item => (
            <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '16px', padding: '16px', background: 'var(--color-surface-2)', borderRadius: '16px', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/shop-jerseys.png" alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontFamily: 'var(--font-teko)', fontWeight: 700, fontSize: '1.4rem', color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Talle: {item.size} · Cantidad: {item.qty}</p>
                <span style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '1.4rem', color: 'var(--color-accent)', display: 'block', marginTop: '4px' }}>${(item.price * item.qty).toLocaleString('es-AR')}</span>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="p-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
            <div className="flex justify-between items-end mb-6">
              <span style={{ fontFamily: 'var(--font-oswald)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Total Final</span>
              <span style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '2.5rem', color: 'white', lineHeight: 1 }}>${total.toLocaleString('es-AR')}</span>
            </div>
            <button className="btn-accent w-full" style={{ padding: '16px', fontSize: '14px', borderRadius: '12px' }}>FINALIZAR COMPRA</button>
          </div>
        )}
      </div>
      {cartOpen && <div className="fixed inset-0 z-40 transition-opacity duration-500" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} onClick={() => setCartOpen(false)} />}
    </div>
  );
};

export default TiendaPage;
