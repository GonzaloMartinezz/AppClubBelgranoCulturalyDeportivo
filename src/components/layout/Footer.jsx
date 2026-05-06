import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#111111' }}>

    {/* ── Contact strip ── */}
    <div style={{ background: 'var(--color-accent)', padding: '16px 0 md:20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="max-w-350 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        <div>
          <p className="font-oswald text-[9px] md:text-xs uppercase tracking-[0.15em] text-white/80 mb-1 md:mb-2">
            Ponerse en contacto
          </p>
          <p className="font-oswald text-xs md:text-sm uppercase tracking-wider text-white font-bold">
            info@clubbelgrano.com
          </p>
        </div>
        <div className="flex gap-4 md:gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="font-oswald text-[9px] md:text-xs uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="font-oswald text-[9px] md:text-xs uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>

    {/* ── Main content ── */}
    <div style={{ padding: '32px 16px md:48px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Club Info */}
        <div className="md:col-span-2">
          <h3 className="font-teko text-2xl md:text-3xl font-bold text-white uppercase mb-3 md:mb-4">
            BELGRANO
          </h3>
          <p className="font-oswald text-[9px] md:text-xs text-gray-400 uppercase tracking-[0.15em] leading-relaxed mb-4 md:mb-6">
            Club Belgrano Cultural y Deportivo. Desde 1920, llevando la pasión por el básquet a cada rincón de Tucumán.
          </p>
          <p className="font-oswald text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em]">
            San Miguel de Tucumán, Argentina
          </p>
        </div>

        {/* Links 1 */}
        <div>
          <p className="font-oswald text-[8px] md:text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-3 md:mb-4">
            Navegación
          </p>
          <ul className="space-y-2">
            <li><Link to="/" className="font-oswald text-[9px] md:text-xs text-gray-500 hover:text-white transition-colors uppercase">Inicio</Link></li>
            <li><Link to="/plantel" className="font-oswald text-[9px] md:text-xs text-gray-500 hover:text-white transition-colors uppercase">Plantel</Link></li>
            <li><Link to="/fixture" className="font-oswald text-[9px] md:text-xs text-gray-500 hover:text-white transition-colors uppercase">Fixture</Link></li>
            <li><Link to="/galeria" className="font-oswald text-[9px] md:text-xs text-gray-500 hover:text-white transition-colors uppercase">Galería</Link></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div>
          <p className="font-oswald text-[8px] md:text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-3 md:mb-4">
            Legal
          </p>
          <ul className="space-y-2">
            <li><Link to="/" className="font-oswald text-[9px] md:text-xs text-gray-500 hover:text-white transition-colors uppercase">Privacidad</Link></li>
            <li><Link to="/" className="font-oswald text-[9px] md:text-xs text-gray-500 hover:text-white transition-colors uppercase">Términos</Link></li>
            <li><Link to="/" className="font-oswald text-[9px] md:text-xs text-gray-500 hover:text-white transition-colors uppercase">Contacto</Link></li>
          </ul>
        </div>
      </div>
    </div>

    {/* ── Bottom strip ── */}
    <div style={{ padding: '16px 16px md:20px 24px', textAlign: 'center' }}>
      <p className="font-oswald text-[8px] md:text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        © 2026 CLUB BELGRANO CULTURAL Y DEPORTIVO · SAN MIGUEL DE TUCUMÁN
      </p>
    </div>
  </footer>
);

export default Footer;
