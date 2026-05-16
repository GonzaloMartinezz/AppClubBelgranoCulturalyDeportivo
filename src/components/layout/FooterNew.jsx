import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const IconInstagram = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <circle cx="17.5" cy="6.5" r="1.5"></circle>
  </svg>
);

const IconMail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const IconMapPin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const IconPhone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const IconLinkedin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const IconShare = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const FooterNew = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const footerLinks = [
    {
      title: 'Navegación',
      links: [
        { label: 'Inicio', to: '/' },
        { label: 'Plantel', to: '/plantel' },
        { label: 'Fixture', to: '/fixture' },
        { label: 'Galería', to: '/galeria' },
        { label: 'Tienda', to: '/tienda' },
      ],
    },
    {
      title: 'Comunidad',
      links: [
        { label: 'Únete', to: '/socios' },
        { label: 'Donaciones', to: '/' },
        { label: 'Voluntarios', to: '/' },
        { label: 'Eventos', to: '/' },
      ],
    },
    {
      title: 'Información',
      links: [
        { label: 'Sobre Nosotros', to: '/' },
        { label: 'Privacidad', to: '/' },
        { label: 'Términos', to: '/' },
        { label: 'Contacto', to: '/' },
      ],
    },
  ];

  const socialLinks = [
    { icon: IconInstagram, href: 'https://instagram.com/clubbelgrano', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: IconShare, href: 'https://facebook.com/clubbelgrano', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: IconMail, href: 'https://youtube.com/clubbelgrano', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: IconLinkedin, href: 'https://linkedin.com/company/clubbelgrano', label: 'LinkedIn', color: 'hover:text-blue-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmail('');
      alert('¡Gracias por suscribirte!');
    }
  };

  return (
    <footer className="bg-dark border-t border-white/10">
      {/* Top CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-brand/20 to-accent/20 border-b border-white/10 py-8 md:py-12"
      >
        <div className="app-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-teko font-black uppercase text-white mb-2">
                ¿Listo para ser parte de la historia?
              </h3>
              <p className="text-white/70">Únete a la familia Belgrano y vive la pasión del básquet</p>
            </div>
            <motion.a
              href="#socios"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-accent to-yellow-500 text-black font-oswald
                uppercase font-bold text-sm tracking-wider rounded-lg shadow-lg hover:shadow-xl
                transition-all whitespace-nowrap"
            >
              Hacerse Socio
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="app-container py-16 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12"
        >
          {/* Club Info */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h3 className="text-2xl font-teko font-black text-white uppercase mb-4 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-accent to-yellow-500" />
              Belgrano
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Club Belgrano Cultural y Deportivo. Desde 1920, llevando la pasión por el básquet a cada rincón de Tucumán. Tradición, excelencia y comunidad.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted hover:text-white transition">
                <div className="text-accent w-4 h-4"><IconMapPin /></div>
                <span className="text-xs uppercase tracking-wider">San Miguel de Tucumán, Argentina</span>
              </div>
              <div className="flex items-center gap-3 text-muted hover:text-white transition">
                <div className="text-accent w-4 h-4"><IconPhone /></div>
                <span className="text-xs uppercase tracking-wider">+54 381 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-muted hover:text-white transition">
                <div className="text-accent w-4 h-4"><IconMail /></div>
                <a href="mailto:info@clubbelgrano.com" className="text-xs uppercase tracking-wider hover:text-accent">
                  info@clubbelgrano.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map(({ title, links }, idx) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="md:col-span-3"
            >
              <p className="text-xs font-oswald font-bold uppercase tracking-widest text-white/80 mb-6 pb-3 border-b border-white/10">
                {title}
              </p>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-xs text-muted hover:text-white uppercase tracking-wider transition-colors
                        inline-flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-accent/0 group-hover:bg-accent rounded-full transition" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <p className="text-xs font-oswald font-bold uppercase tracking-widest text-white/80 mb-6 pb-3 border-b border-white/10">
              Suscribirse
            </p>
            <p className="text-xs text-muted mb-6 leading-relaxed">
              Recibe las últimas noticias, resultados y eventos del club directamente en tu correo.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-xs
                  text-white placeholder:text-white/30
                  focus:outline-none focus:border-accent focus:bg-white/10 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-accent to-yellow-500 text-black text-xs
                  font-oswald uppercase font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Suscribirse
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Social Links & Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-white/10 py-8"
      >
        <div className="app-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-muted uppercase tracking-wider">Síguenos en redes sociales</p>
            <div className="flex items-center gap-6">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-white/60 transition-colors ${color} w-6 h-6`}
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-dark-2/50 border-t border-white/6 py-6"
      >
        <div className="app-container text-center">
          <p className="text-xs text-muted-3 uppercase tracking-wider mb-2">
            © {currentYear} CLUB BELGRANO CULTURAL Y DEPORTIVO · SAN MIGUEL DE TUCUMÁN, ARGENTINA
          </p>
          <p className="text-xs text-muted-3/60 uppercase tracking-wider">
            Diseñado con pasión. Hecho para los nuestros.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterNew;
