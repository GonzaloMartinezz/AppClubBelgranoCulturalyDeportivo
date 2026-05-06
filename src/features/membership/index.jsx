import { useState } from 'react';

const MEMBERSHIP_TYPES = [
  { type: 'SOCIO_ACTIVO', label: 'Socio Activo', price: '$2.500/mes', benefits: ['Acceso a todos los partidos', 'Descuento en tienda', 'QR de acceso digital', 'Voto en asamblea'] },
  { type: 'SOCIO_ADHERENTE', label: 'Socio Adherente', price: '$1.500/mes', benefits: ['Acceso a partidos de local', 'QR de acceso digital', 'Newsletter oficial'] },
  { type: 'ABONADO', label: 'Abonado Temporada', price: '$18.000/temporada', benefits: ['Todos los partidos de local', 'Butaca numerada', 'QR de acceso digital', 'Camiseta oficial'] },
];

const SociosPage = () => {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', lastName: '', dni: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '48px', maxWidth: '500px' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <span style={{ fontSize: '28px' }}>✓</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: 'white' }}>SOLICITUD ENVIADA</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
          Nos contactaremos a <strong style={{ color: 'white' }}>{form.email}</strong> para completar el proceso de afiliación.
        </p>
        <button onClick={() => { setSubmitted(false); setForm({ name: '', lastName: '', dni: '', email: '', phone: '' }); setSelected(null); }}
          style={{ marginTop: '32px', background: '#003087', color: 'white', padding: '12px 32px', borderRadius: '8px', border: 'none', fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.1em', cursor: 'pointer' }}>
          NUEVA SOLICITUD
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.3em', color: '#FFD700', marginBottom: '12px' }}>CLUB BELGRANO CyD</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'white', lineHeight: 0.85, marginBottom: '16px' }}>
          HACETE SOCIO
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginBottom: '48px' }}>
          Formá parte de la familia del Patriota y viví el básquet tucumano desde adentro.
        </p>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {MEMBERSHIP_TYPES.map(plan => (
            <div
              key={plan.type}
              onClick={() => setSelected(plan.type)}
              style={{
                background: selected === plan.type ? 'rgba(0,48,135,0.3)' : '#111827',
                border: `2px solid ${selected === plan.type ? '#003087' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: 'white' }}>{plan.label}</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#FFD700', marginTop: '8px' }}>{plan.price}</p>
              <ul style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {plan.benefits.map(b => (
                  <li key={b} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)', listStyle: 'none' }}>
                    <span style={{ color: '#10B981', flexShrink: 0 }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              {selected === plan.type && (
                <p style={{ marginTop: '16px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.1em', color: '#003087' }}>SELECCIONADO ✓</p>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '40px' }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em', color: 'white', marginBottom: '28px' }}>TUS DATOS</p>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              {[['name', 'Nombre', 'text'], ['lastName', 'Apellido', 'text'], ['dni', 'DNI', 'text'], ['email', 'Email', 'email'], ['phone', 'Teléfono', 'tel']].map(([field, label, type]) => (
                <div key={field}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{label}</label>
                  <input
                    type={type} value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 16px', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={!selected}
              style={{ marginTop: '8px', width: '100%', background: selected ? '#003087' : '#1F2937', color: selected ? 'white' : '#4B5563', padding: '16px', border: 'none', borderRadius: '10px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.12em', cursor: selected ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
            >
              {selected ? `SOLICITAR ${MEMBERSHIP_TYPES.find(p => p.type === selected)?.label.toUpperCase()}` : 'SELECCIONÁ UN PLAN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SociosPage;
