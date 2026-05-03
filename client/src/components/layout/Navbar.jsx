
export const Navbar = ({ clubName = 'Belgrano', onMenuToggle }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Familia', id: 'nuestra-familia' },
    { label: 'Galería', id: 'galeria' },
    { label: 'Store', id: 'shop' },
    { label: 'Contacto', id: 'contacto' }
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b-4 border-white bg-dark sticky top-0 z-50">
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
        <div className="w-14 h-14 bg-brand border-2 border-white flex items-center justify-center hover:bg-white hover:text-dark transition-colors duration-300">
          <span className="font-teko font-bold text-2xl tracking-wider">CB</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-3xl font-teko font-bold tracking-widest text-white uppercase">{clubName}</span>
          <span className="text-[10px] font-oswald text-gray-400 uppercase tracking-[0.3em]">Cultural & Deportivo</span>
        </div>
      </div>
      
      <ul className="hidden lg:flex gap-12 text-sm font-oswald font-bold tracking-[0.2em] text-white uppercase">
        {navItems.map(item => (
          <li key={item.id} onClick={() => scrollTo(item.id)} className="hover:text-brand cursor-pointer transition-colors relative group">
            {item.label}
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </li>
        ))}
      </ul>
      
      <button onClick={onMenuToggle} className="lg:hidden w-12 h-12 border-2 border-white flex items-center justify-center flex-col gap-1.5">
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>
    </nav>
  );
};

export const Footer = ({ clubName = 'Belgrano' }) => (
  <footer className="border-t-4 border-brand py-16 px-6 md:px-12 bg-dark">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-brand flex items-center justify-center border-2 border-white">
          <span className="font-teko font-bold text-3xl tracking-wider text-white">CB</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-4xl font-teko font-bold tracking-widest text-white uppercase">{clubName}</span>
          <span className="text-xs font-oswald text-brand uppercase tracking-[0.3em] font-bold">San Miguel de Tucumán</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 text-center md:text-right">
        <a href="mailto:contacto@belgrano.com" className="text-sm font-oswald text-gray-400 hover:text-brand transition-colors">
          contacto@belgrano.com
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-oswald text-gray-400 hover:text-brand transition-colors">
          @clubbelgrano
        </a>
      </div>
      <p className="text-xs text-gray-500 tracking-[0.2em] uppercase font-oswald text-center md:text-right">
        © 2026 Club Belgrano Cultural y Deportivo. <br className="md:hidden" />Todos los derechos reservados.
      </p>
    </div>
  </footer>
);