import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Share2, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ShieldLogo = () => (
  <svg width="32" height="36" viewBox="0 0 80 90" fill="none">
    <path d="M40 2L6 16V48C6 67 21 82 40 88C59 82 74 67 74 48V16L40 2Z" fill="#1A4FD4" stroke="white" strokeWidth="2" />
    <path d="M40 12L14 24V48C14 63 25 75 40 80C55 75 66 63 66 48V24L40 12Z" fill="white" />
    <path d="M40 22L22 32V48C22 59 29 68 40 72C51 68 58 59 58 48V32L40 22Z" fill="#1A4FD4" />
  </svg>
);

const FooterPro = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navegación',
      links: [
        { label: 'Inicio', href: '/' },
        { label: 'Plantel', href: '/plantel' },
        { label: 'Fixture', href: '/fixture' },
        { label: 'Posiciones', href: '/posiciones' },
        { label: 'Galería', href: '/galeria' }
      ]
    },
    {
      title: 'Información',
      links: [
        { label: 'Sobre Nosotros', href: '#about' },
        { label: 'Contacto', href: '#contacto' },
        { label: 'Privacidad', href: '#privacidad' },
        { label: 'Términos de Servicio', href: '#terminos' },
        { label: 'Política de Cookies', href: '#cookies' }
      ]
    },
    {
      title: 'Más',
      links: [
        { label: 'Tienda', href: '/tienda' },
        { label: 'Socios', href: '/socios' },
        { label: 'Estadísticas', href: '/estadisticas' },
        { label: 'Patrocinadores', href: '#sponsors' },
        { label: 'Blog', href: '#blog' }
      ]
    }
  ];

  const socialLinks = [
    {
      icon: Share2,
      href: 'https://facebook.com/belgrano',
      label: 'Facebook',
      color: 'hover:text-blue-600'
    },
    {
      icon: Share2,
      href: 'https://instagram.com/belgrano',
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    {
      icon: Share2,
      href: 'https://twitter.com/belgrano',
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    {
      icon: Share2,
      href: 'https://linkedin.com/company/belgrano',
      label: 'LinkedIn',
      color: 'hover:text-blue-700'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-dark to-dark-2 border-t border-white/10">
      {/* Top Section */}
      <div className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-7xl mx-auto"
        >
          {/* Newsletter Section */}
          <motion.div
            variants={itemVariants}
            className="mb-16 md:mb-24 p-6 md:p-12 rounded-sm bg-gradient-to-r from-brand/20 to-accent/20 border border-brand/30 backdrop-blur"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase tracking-wider text-white mb-2">
                  Suscribete a Nuestro Newsletter
                </h3>
                <p className="text-sm md:text-base text-gray-400">
                  Recibe noticias, resultados y novedades del Club Belgrano en tu email.
                </p>
              </div>
              <form className="w-full md:w-auto flex flex-col sm:flex-row gap-2 md:gap-0">
                <input
                  type="email"
                  placeholder="Tu email..."
                  className="input-base rounded-l-sm md:rounded-l-sm md:rounded-r-none flex-1 md:flex-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-black font-oswald font-bold uppercase text-sm tracking-wider rounded-r-sm md:rounded-r-sm md:rounded-l-none hover:bg-accent-2 transition-all duration-200"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </motion.div>

          {/* Main Footer Content */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16"
          >
            {/* Brand Column */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <ShieldLogo />
                <span className="font-display text-lg tracking-widest text-white font-bold">
                  BELGRANO CyD
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Club Belgrano Cultura y Deportivo: Tradición, garra e identidad tucumana desde 1920.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      aria-label={social.label}
                      className={`p-2.5 rounded-sm bg-white/5 border border-white/10 text-white transition-all duration-200 ${social.color}`}
                      whileHover={{ scale: 1.1, borderColor: 'white' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Links Columns */}
            {footerSections.map((section, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <h4 className="text-sm font-oswald font-bold uppercase tracking-widest text-white mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <NavLink
                        to={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hover-underline"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24 py-8 md:py-12 border-t border-white/10"
          >
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs font-oswald uppercase tracking-widest text-muted mb-1">Email</p>
                <a href="mailto:info@belgrano.com.ar" className="text-sm text-white hover:text-accent transition-colors">
                  info@belgrano.com.ar
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs font-oswald uppercase tracking-widest text-muted mb-1">Teléfono</p>
                <a href="tel:+5493813333333" className="text-sm text-white hover:text-accent transition-colors">
                  +54 (381) 333-3333
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-accent-2 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs font-oswald uppercase tracking-widest text-muted mb-1">Ubicación</p>
                <p className="text-sm text-white">
                  San Miguel de Tucumán, Argentina
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-4 md:px-8 lg:px-16 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
            &copy; {currentYear} Club Belgrano Cultura y Deportivo. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <span>Hecho con</span>
            <Heart size={14} className="text-accent animate-pulse" />
            <span>para la familia belgranista</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterPro;
