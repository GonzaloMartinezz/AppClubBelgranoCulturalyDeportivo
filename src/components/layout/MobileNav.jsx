import { NavLink } from 'react-router-dom';
import { Home, Receipt, PieChart, Plus } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/movimientos', label: 'Movimientos', icon: Receipt },
  { to: '/analisis', label: 'Análisis', icon: PieChart }
];

export const MobileNav = ({ onNewMovement }) => (
  <nav
    className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/98 backdrop-blur-xl border-t border-border"
    style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
  >
    <div className="relative flex items-stretch justify-around h-16 max-w-md mx-auto">
      <NavItem {...NAV[0]} />
      <NavItem {...NAV[1]} />

      {/* FAB central */}
      <div className="flex items-center justify-center px-2">
        <button
          onClick={onNewMovement}
          className="w-14 h-14 rounded-2xl bg-dark text-white shadow-lg shadow-dark/30 flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Nuevo movimiento"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>

      <NavItem {...NAV[2]} />
      <PlaceholderItem />
    </div>
  </nav>
);

const NavItem = ({ to, label, icon: Icon, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center gap-1 flex-1 transition-colors active:scale-95 ${
        isActive ? 'text-fg' : 'text-muted'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
          {label}
        </span>
      </>
    )}
  </NavLink>
);

const PlaceholderItem = () => (
  <div className="flex flex-col items-center justify-center gap-1 flex-1 text-muted-3">
    <div className="w-5 h-5 rounded-full bg-surface-3" />
    <span className="text-[10px] font-medium">Pronto</span>
  </div>
);
