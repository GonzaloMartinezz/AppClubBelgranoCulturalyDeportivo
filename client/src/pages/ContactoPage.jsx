import { useState } from 'react';
import api from '../core/api/client';

const ContactoPage = () => {
  const [form, setForm]       = useState({ nombre: '', apellido: '', email: '', telefono: '', interes: '', mensaje: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try { await api.post('/contact', form); } catch {}
    setSent(true);
    setSending(false);
  };

  const info = [
    { label: 'Dirección', value: 'San Martín 500, Barrio Sur\nSan Miguel de Tucumán', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Teléfono',  value: '+54 381 456-7890',         icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
    { label: 'Email',     value: 'info@belgrano.com',        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Horarios',  value: 'Lun–Vie: 09:00 – 21:00',  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="pt-16" style={{ background: 'var(--color-dark)' }}>

      {/* Header */}
      <section className="relative overflow-hidden py-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container relative z-10">
          <div className="section-hero-title absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none" style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }}>
            CONTATTI
          </div>
          <div className="relative z-10">
            <p className="section-label mb-4">Sumate a la Familia</p>
            <h1 className="font-teko font-bold uppercase leading-[0.88] tracking-tight text-white" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
              Contacto<br /><span style={{ color: 'var(--color-accent)' }}>& Socios</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="app-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Info */}
            <div className="space-y-6">
              <h2 className="font-teko font-bold text-white uppercase leading-[0.9] text-4xl">
                ¿Querés ser parte de algo más grande?
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Club Belgrano es más que básquet. Somos comunidad, historia y pasión. Completá el formulario y te contactamos.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {info.map((item, i) => (
                  <div key={i} className="card-flat p-4 flex gap-3" style={{ borderRadius: '10px' }}>
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,115,22,0.08)', borderRadius: '8px' }}>
                      <svg className="w-4 h-4" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="font-oswald text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{item.label}</p>
                      <p className="text-xs text-white whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            {sent ? (
              <div className="card flex flex-col items-center justify-center text-center py-12 px-6" style={{ borderRadius: '16px' }}>
                <div className="w-14 h-14 flex items-center justify-center mb-5" style={{ background: 'rgba(16,185,129,0.1)', borderRadius: '14px' }}>
                  <svg className="w-7 h-7" style={{ color: '#34D399' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-teko text-2xl font-bold text-white uppercase mb-2">¡Mensaje Enviado!</h3>
                <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Te responderemos a la brevedad.</p>
                <button onClick={() => { setSent(false); setForm({ nombre: '', apellido: '', email: '', telefono: '', interes: '', mensaje: '' }); }} className="btn-secondary">
                  Enviar Otro
                </button>
              </div>
            ) : (
              <div className="card p-6" style={{ borderRadius: '16px' }}>
                <h3 className="font-teko text-xl font-bold text-white uppercase mb-6">Formulario</h3>
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" id="nombre" value={form.nombre} onChange={handle} className="input-base" placeholder="Nombre" required />
                    <input type="text" id="apellido" value={form.apellido} onChange={handle} className="input-base" placeholder="Apellido" required />
                  </div>
                  <input type="email" id="email" value={form.email} onChange={handle} className="input-base" placeholder="Email" required />
                  <input type="tel" id="telefono" value={form.telefono} onChange={handle} className="input-base" placeholder="Teléfono" />
                  <select id="interes" value={form.interes} onChange={handle} className="input-base" style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="" style={{ background: 'var(--color-surface)' }}>Motivo de consulta</option>
                    <option value="socio" style={{ background: 'var(--color-surface)' }}>Quiero ser socio</option>
                    <option value="categoria" style={{ background: 'var(--color-surface)' }}>Inscribir a mi hijo</option>
                    <option value="sponsor" style={{ background: 'var(--color-surface)' }}>Sponsoreo</option>
                    <option value="otro" style={{ background: 'var(--color-surface)' }}>Otro</option>
                  </select>
                  <textarea id="mensaje" value={form.mensaje} onChange={handle} rows={3} className="input-base resize-none" placeholder="Mensaje (opcional)" />
                  <button type="submit" disabled={sending} className="btn-accent w-full" style={{ opacity: sending ? 0.7 : 1 }}>
                    {sending ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactoPage;
