import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone, Linkedin, Share2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

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
    { icon: Instagram, href: 'https://instagram.com/clubbelgrano', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Share2, href: 'https://facebook.com/clubbelgrano', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Heart, href: 'https://youtube.com/clubbelgrano', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: Linkedin, href: 'https://linkedin.com/company/clubbelgrano', label: 'LinkedIn', color: 'hover:text-blue-600' },
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
                <MapPin size={16} className="text-accent" />
                <span className="text-xs uppercase tracking-wider">San Miguel de Tucumán, Argentina</span>
              </div>
              <div className="flex items-center gap-3 text-muted hover:text-white transition">
                <Phone size={16} className="text-accent" />
                <span className="text-xs uppercase tracking-wider">+54 381 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-muted hover:text-white transition">
                <Mail size={16} className="text-accent" />
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
                  className={`text-white/60 transition-colors ${color}`}
                  aria-label={label}
                >
                  <Icon size={22} />
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
