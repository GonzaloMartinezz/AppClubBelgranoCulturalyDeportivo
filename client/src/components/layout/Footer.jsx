import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Inicio',   path: '/' },
  { label: 'Equipo',   path: '/equipo' },
  { label: 'Fixture',  path: '/fixture' },
  { label: 'Galería',  path: '/galeria' },
  { label: 'Shop',     path: '/tienda' },
  { label: 'Contacto', path: '/contacto' },
];

const Footer = () => (
  <footer
    className="border-t"
    style={{ background: 'var(--color-surface)', borderColor: 'rgba(255,255,255,0.06)' }}
  >
    <div className="app-container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center font-teko font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              CB
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-teko font-bold text-lg text-white uppercase tracking-wider">Belgrano</span>
              <span className="font-oswald text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Cultural & Deportivo · SMT
              </span>
            </div>
          </Link>
          <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Más que un club, una familia. Desde 1920 forjando historia en el básquet tucumano.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-oswald font-bold text-[10px] uppercase tracking-[0.2em] text-white mb-4">Navegación</h4>
          <ul className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-oswald font-bold text-[10px] uppercase tracking-[0.2em] text-white mb-4">Contacto</h4>
          <ul className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <li>info@belgrano.com</li>
            <li>+54 381 456-7890</li>
            <li>San Martín 500, Tucumán</li>
          </ul>
        </div>
      </div>

      <div className="divider mt-8 mb-6" />

      <p className="text-[10px] font-oswald uppercase tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
        © 2026 Club Belgrano Cultural y Deportivo
      </p>
    </div>
  </footer>
);

export default Footer;
