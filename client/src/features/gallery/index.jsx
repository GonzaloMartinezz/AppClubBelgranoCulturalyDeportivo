const GaleriaPage = () => (
  <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.3em', color: '#FFD700', marginBottom: '12px' }}>TEMPORADA 2025</p>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'white', lineHeight: 0.85, marginBottom: '48px' }}>
        GALERÍA
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
        {[...Array(9)].map((_, i) => (
          <div key={i} style={{
            background: '#111827', borderRadius: '12px', aspectRatio: '4/3',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.1)' }}>
              FOTO {i + 1}
            </span>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: '48px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>
        Las fotos se cargan desde Cloudinary vía el panel de administración
      </p>
    </div>
  </div>
);

export default GaleriaPage;
