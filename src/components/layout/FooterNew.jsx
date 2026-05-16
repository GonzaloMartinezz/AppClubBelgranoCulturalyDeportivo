import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const columns = [
    { title: 'Producto', links: ['Dashboard', 'Análisis', 'Categorías', 'Reportes'] },
    { title: 'Recursos', links: ['Guías', 'Tutoriales', 'FAQ', 'Blog'] },
    { title: 'Cuenta', links: ['Mi Negocio', 'Configuración', 'Exportar', 'Backup'] },
    { title: 'Legal', links: ['Términos', 'Privacidad', 'Cookies', 'Licencias'] }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`¡Suscripto: ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-dark py-20 md:py-32 px-6 md:px-16 lg:px-24 border-t border-white/10">
      {/* Top: Logo gigante */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 md:mb-24"
      >
        <div className="flex items-center gap-4 mb-8">
          <Sparkles className="text-brand" size={64} fill="currentColor" />
          <span className="text-7xl md:text-9xl lg:text-[10rem] font-teko font-black text-white tracking-tight leading-none">
            DevStats
          </span>
        </div>
        <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed">
          Gestiona el lado financiero de tu negocio de desarrollo web. Ingresos, gastos, análisis. Todo en un solo lugar.
        </p>
      </motion.div>

      {/* Newsletter + Columns */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-24">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-4">
            ✦ Newsletter Semanal
          </p>
          <h3 className="text-4xl md:text-6xl font-teko font-black uppercase text-white leading-[0.9] mb-8">
            Tips para<br />
            <span className="text-brand italic">freelancers</span>
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 bg-surface border border-white/10 text-white placeholder:text-muted-2 px-6 py-4 rounded-full text-base md:text-lg focus:outline-none focus:border-brand"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-brand text-dark rounded-full font-bold text-base md:text-lg hover:bg-brand-light hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Suscribir <ArrowUpRight size={20} />
            </button>
          </form>
        </motion.div>

        {/* Columns */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand mb-4 md:mb-6">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white text-sm md:text-base font-semibold hover:text-brand transition-all">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-12 border-t border-white/10">
        <p className="text-sm md:text-base font-semibold text-muted uppercase tracking-wider">
          © {currentYear} DevStats · Hecho para desarrolladores como vos
        </p>
        <div className="flex gap-3">
          {['IG', 'TW', 'LI', 'GH'].map((social) => (
            <a
              key={social}
              href="#"
              className="w-12 h-12 md:w-14 md:h-14 bg-surface border border-white/10 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-brand hover:text-dark hover:scale-110 transition-all"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
