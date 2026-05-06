import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';

const FooterNew = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navegación',
      links: [
        { label: 'Inicio', to: '/' },
        { label: 'Plantel', to: '/plantel' },
        { label: 'Fixture', to: '/fixture' },
        { label: 'Galería', to: '/galeria' },
      ],
    },
    {
      title: 'Comunidad',
      links: [
        { label: 'Únete', to: '/socios' },
        { label: 'Tienda', to: '/tienda' },
        { label: 'Contacto', to: '/' },
        { label: 'Stats', to: '/estadisticas' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', to: '/' },
        { label: 'Términos', to: '/' },
        { label: 'Cookies', to: '/' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/clubbelgrano', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/clubbelgrano', label: 'Facebook' },
    { icon: Mail, href: 'mailto:info@clubbelgrano.com', label: 'Email' },
  ];

  return (
    <footer className="bg-dark-2 border-t border-white/6">
      {/* Contact Section */}
      <div className="bg-accent text-black py-4 md:py-6">
        <div className="app-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-oswald uppercase tracking-wider opacity-80">Contacto</p>
            <p className="text-sm md:text-base font-oswald font-bold">info@clubbelgrano.com</p>
          </div>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="app-container py-12 md:py-16 border-b border-white/6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Club Info */}
          <div className="md:col-span-4">
            <h3 className="text-2xl md:text-3xl font-teko font-bold text-white uppercase mb-4">
              Belgrano
            </h3>
            <p className="text-xs text-muted leading-relaxed mb-4">
              Club Belgrano Cultural y Deportivo. Desde 1920, llevando la pasión por el básquet a cada rincón de Tucumán.
            </p>
            <div className="flex items-center gap-2 text-muted text-xs">
              <MapPin size={14} />
              <span className="uppercase tracking-wider">San Miguel de Tucumán, Argentina</span>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map(({ title, links }) => (
            <div key={title} className="md:col-span-2">
              <p className="text-xs font-oswald font-bold uppercase tracking-wider text-white/70 mb-4">
                {title}
              </p>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-xs text-muted hover:text-white uppercase tracking-wider transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="md:col-span-4">
            <p className="text-xs font-oswald font-bold uppercase tracking-wider text-white/70 mb-4">
              Suscribirse
            </p>
            <p className="text-xs text-muted mb-4">
              Recibe las últimas noticias y actualizaciones del club.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 bg-surface-2 border border-white/8 px-3 py-2 rounded-sm text-xs
                  text-white placeholder:text-white/25
                  focus:outline-none focus:border-brand focus:bg-brand/5 transition-colors"
              />
              <button
                className="px-4 py-2 bg-brand text-white text-xs font-oswald uppercase font-bold
                  rounded-sm hover:bg-brand-light transition-colors"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="app-container py-6 text-center">
        <p className="text-xs text-muted-3 uppercase tracking-wider">
          © {currentYear} CLUB BELGRANO CULTURAL Y DEPORTIVO · SAN MIGUEL DE TUCUMÁN
        </p>
      </div>
    </footer>
  );
};

export default FooterNew;
