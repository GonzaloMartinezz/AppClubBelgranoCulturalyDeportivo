const PRODUCTS = [
  { name: 'Camiseta Oficial 2025', price: '$8.500', category: 'Indumentaria', badge: 'NUEVO' },
  { name: 'Remera Training El Patriota', price: '$4.200', category: 'Indumentaria' },
  { name: 'Buzo Oficial Belgrano CyD', price: '$12.000', category: 'Indumentaria' },
  { name: 'Short Oficial 2025', price: '$5.500', category: 'Indumentaria' },
  { name: 'Gorra El Patriota', price: '$3.200', category: 'Accesorios' },
  { name: 'Riñonera Belgrano CyD', price: '$2.800', category: 'Accesorios' },
  { name: 'Mochila Oficial', price: '$9.500', category: 'Accesorios', badge: 'AGOTADO' },
  { name: 'Pelota de Básquet Oficial', price: '$18.000', category: 'Equipamiento' },
];

const TiendaPage = () => (
  <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.3em', color: '#FFD700', marginBottom: '12px' }}>INDUMENTARIA OFICIAL</p>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'white', lineHeight: 0.85, marginBottom: '48px' }}>
        TIENDA OFICIAL
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
        {PRODUCTS.map((product, i) => (
          <div key={i} style={{
            background: '#111827', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', overflow: 'hidden',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#003087'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ background: '#003087', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '48px', color: 'rgba(255,255,255,0.12)' }}>🏀</span>
              {product.badge && (
                <span style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: product.badge === 'AGOTADO' ? '#374151' : '#FFD700',
                  color: product.badge === 'AGOTADO' ? '#9CA3AF' : '#000',
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.1em',
                  padding: '3px 10px', borderRadius: '6px',
                }}>
                  {product.badge}
                </span>
              )}
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                {product.category}
              </p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: 'white', lineHeight: 1.1 }}>{product.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#FFD700' }}>{product.price}</p>
                <button
                  disabled={product.badge === 'AGOTADO'}
                  style={{
                    background: product.badge === 'AGOTADO' ? '#1F2937' : '#003087',
                    color: product.badge === 'AGOTADO' ? '#6B7280' : 'white',
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.1em',
                    cursor: product.badge === 'AGOTADO' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {product.badge === 'AGOTADO' ? 'AGOTADO' : 'AGREGAR'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: '48px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
        Para consultas sobre compras escribí a: <strong style={{ color: 'rgba(255,255,255,0.4)' }}>info@belgrano-cyd.com</strong>
      </p>
    </div>
  </div>
);

export default TiendaPage;
