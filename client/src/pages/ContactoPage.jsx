import React, { useState } from 'react';

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

const ContactoPage = () => {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [sent, setSent]   = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;
    setSent(true);
  };

  return (
    <div style={{ background: 'var(--color-dark)', paddingTop: '68px', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '40vh', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="/fans-crowd.png" alt="Contacto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,28,28,0.2) 0%, var(--color-dark) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 20px' }}>
          <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '10px' }}>
            Escribinos
          </p>
          <h1 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(4rem, 15vw, 8rem)', textTransform: 'uppercase', color: 'white', lineHeight: 0.8, margin: 0 }}>
            CONTACTO
          </h1>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="app-container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            {/* Left — info */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <SectionTitle title="Información" subtitle="Datos de Contacto" align="left" />
              
              <div style={{ background: 'var(--color-surface-2)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h3 style={{ fontFamily: 'var(--font-teko)', fontWeight: 700, fontSize: '2rem', color: 'white', textTransform: 'uppercase', marginBottom: '16px' }}>Belgrano CyD</h3>
                <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '32px' }}>
                  Más que un club, una familia. Si tenés consultas, sugerencias o querés sumarte al proyecto, escribinos.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {[
                    { icon: '📍', label: 'Dirección', value: 'San Martín 500, SM de Tucumán' },
                    { icon: '📞', label: 'Teléfono', value: '+54 381 456-7890' },
                    { icon: '✉️', label: 'Email', value: 'info@belgrano.com' },
                    { icon: '🕐', label: 'Horario', value: 'Lun – Vie: 9:00 a 18:00 hs' },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.label}</p>
                        <p style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '1.2rem', color: 'white', lineHeight: 1 }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="md:col-span-3">
              <div style={{ background: 'var(--color-surface)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                {sent ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '16px' }}>
                      ✅
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '3rem', color: 'white', textTransform: 'uppercase', lineHeight: 0.9 }}>¡Mensaje Enviado!</h3>
                    <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Te responderemos a la brevedad.</p>
                    <button className="btn-secondary mt-6" style={{ borderRadius: '12px', padding: '12px 24px' }} onClick={() => { setSent(false); setForm({ nombre: '', email: '', asunto: '', mensaje: '' }); }}>
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="flex flex-col gap-5">
                    <h3 style={{ fontFamily: 'var(--font-teko)', fontWeight: 700, fontSize: '2.5rem', color: 'white', textTransform: 'uppercase', marginBottom: '8px' }}>Formulario de Contacto</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>Nombre *</label>
                        <input name="nombre" type="text" placeholder="Tu nombre" className="input-base" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', width: '100%' }} value={form.nombre} onChange={handle} required />
                      </div>
                      <div>
                        <label style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>Email *</label>
                        <input name="email" type="email" placeholder="tu@email.com" className="input-base" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', width: '100%' }} value={form.email} onChange={handle} required />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>Asunto</label>
                      <input name="asunto" type="text" placeholder="¿En qué te podemos ayudar?" className="input-base" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', width: '100%' }} value={form.asunto} onChange={handle} />
                    </div>

                    <div>
                      <label style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>Mensaje *</label>
                      <textarea name="mensaje" rows={5} placeholder="Escribí tu mensaje acá..." className="input-base" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', width: '100%', resize: 'vertical', minHeight: '120px' }} value={form.mensaje} onChange={handle} required />
                    </div>

                    <button type="submit" className="btn-accent mt-4" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '14px' }}>
                      ENVIAR MENSAJE
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactoPage;
