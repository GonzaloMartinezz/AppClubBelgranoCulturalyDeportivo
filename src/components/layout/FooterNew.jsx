import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'Producto',
      links: ['Dashboard', 'Análisis', 'Categorías', 'Reportes']
    },
    {
      title: 'Recursos',
      links: ['Guías', 'Tutoriales', 'FAQ', 'Blog']
    },
    {
      title: 'Cuenta',
      links: ['Mi Negocio', 'Configuración', 'Exportar', 'Backup']
    },
    {
      title: 'Legal',
      links: ['Términos', 'Privacidad', 'Cookies', 'Licencias']
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`¡Suscripto con éxito: ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-brand rounded-[40px] md:rounded-[60px] overflow-hidden p-8 md:p-16"
      >
        {/* Top: Logo & Newsletter */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-dark" size={32} fill="currentColor" />
              <span className="text-4xl md:text-5xl font-teko font-black text-dark tracking-tight">DevStats</span>
            </div>
            <p className="text-dark/70 text-sm md:text-base max-w-md mb-6">
              Gestiona el lado financiero de tu negocio de desarrollo web. Ingresos, gastos, análisis. Todo en un solo lugar.
            </p>
            <div className="flex items-center gap-3 text-dark text-xs font-bold uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-dark animate-pulse"></div>
              Datos guardados localmente
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:pl-12">
            <p className="text-xs font-bold uppercase tracking-widest text-dark mb-3">
              Newsletter Semanal
            </p>
            <h3 className="text-2xl md:text-3xl font-teko font-black uppercase text-dark leading-tight mb-6">
              Tips para freelancers<br />en tu inbox
            </h3>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 bg-dark text-white placeholder:text-white/40 px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-dark"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 bg-dark text-brand rounded-full font-bold text-sm hover:bg-surface transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Suscribir <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Middle: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-12 border-b border-dark/20">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest text-dark/60 mb-4">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-dark text-sm font-semibold hover:underline transition-all">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8">
          <p className="text-xs font-semibold text-dark/70 uppercase tracking-wider">
            © {currentYear} DevStats · Hecho para desarrolladores como vos
          </p>
          <div className="flex gap-4">
            {['IG', 'TW', 'LI', 'GH'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 bg-dark text-brand rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
