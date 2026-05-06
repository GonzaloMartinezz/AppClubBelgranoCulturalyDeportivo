import { useState } from 'react';

export const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contacto" className="px-6 md:px-12 py-16 bg-surface border-b-2 border-white/10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-teko text-white mb-2 uppercase text-center">Contacto</h2>
        <p className="font-oswald text-gray-400 text-center mb-12 uppercase tracking-widest">
          Escribinos - We&apos;re listening
        </p>

        {sent ? (
          <div className="bg-dark border-2 border-brand p-8 text-center">
            <p className="text-xl font-teko text-brand">¡MENSAJE ENVIADO!</p>
            <p className="font-oswald text-gray-400 mt-2">Gracias por contactarnos. Te responderemos pronto.</p>
            <button onClick={() => setSent(false)} className="mt-4 text-brand underline font-oswald">
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-oswald text-gray-400 uppercase tracking-[0.2em]">Nombre</label>
                <input
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-surface border-2 border-white/20 px-4 py-3 text-white font-oswald placeholder-gray-500 focus:border-brand focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-oswald text-gray-400 uppercase tracking-[0.2em]">Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="bg-surface border-2 border-white/20 px-4 py-3 text-white font-oswald placeholder-gray-500 focus:border-brand focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-oswald text-gray-400 uppercase tracking-[0.2em]">Mensaje</label>
              <textarea
                placeholder="Tu mensaje..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="bg-surface border-2 border-white/20 px-4 py-3 text-white font-oswald placeholder-gray-500 focus:border-brand focus:outline-none transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full font-oswald font-bold tracking-[0.2em] uppercase bg-brand text-white border-2 border-brand px-6 py-3 hover:bg-white hover:text-brand transition-all duration-300 disabled:opacity-50"
            >
              {sending ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
            </button>
          </form>
        )}

        <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-xs font-oswald text-brand uppercase tracking-[0.2em] mb-2">Email</p>
            <a href="mailto:contacto@belgrano.com" className="text-white font-oswald hover:text-brand transition-colors">
              contacto@belgranocba.com
            </a>
          </div>
          <div>
            <p className="text-xs font-oswald text-brand uppercase tracking-[0.2em] mb-2">Teléfono</p>
            <a href="tel:+543814000000" className="text-white font-oswald hover:text-brand transition-colors">
              +54 381 4000 000
            </a>
          </div>
          <div>
            <p className="text-xs font-oswald text-brand uppercase tracking-[0.2em] mb-2">Redes</p>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white font-oswald hover:text-brand transition-colors block">
              @clubbelgrano
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
