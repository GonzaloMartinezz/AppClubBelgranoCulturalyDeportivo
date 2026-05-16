import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-dark-2 border-t border-white/10 py-12"
    >
      <div className="app-container max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-light rounded-lg flex items-center justify-center">
                <span className="text-white font-teko font-black text-lg">D</span>
              </div>
              <span className="font-teko text-lg font-black text-white">DevAnalytics</span>
            </div>
            <p className="text-muted text-sm">
              Gestiona tu negocio de desarrollo web con inteligencia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-oswald uppercase tracking-wider text-white/70 font-bold mb-4">
              Producto
            </p>
            <ul className="space-y-2 text-sm text-muted hover:text-white transition">
              <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition">Análisis</a></li>
              <li><a href="#" className="hover:text-white transition">Reportes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-oswald uppercase tracking-wider text-white/70 font-bold mb-4">
              Contacto
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="mailto:soporte@devanalytics.com" className="hover:text-white transition">soporte@devanalytics.com</a></li>
              <li className="text-muted">© {currentYear} DevAnalytics</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-muted-3 uppercase tracking-wider">
            Hecho con ❤️ para desarrolladores web
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
