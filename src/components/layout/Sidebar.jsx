import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Plus, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/movimientos', label: 'Movimientos', icon: Receipt },
  { to: '/analisis', label: 'Análisis', icon: PieChart }
];

export const Sidebar = ({ onNewMovement }) => (
  <aside className="hidden lg:flex w-60 shrink-0 h-screen sticky top-0 bg-surface border-r border-border flex-col">
    {/* Logo */}
    <div className="h-16 px-5 flex items-center gap-2.5 border-b border-border">
      <div className="w-9 h-9 rounded-xl bg-dark flex items-center justify-center">
        <TrendingUp size={17} className="text-accent" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <p className="font-bold text-fg text-[15px] tracking-tight">DevStats</p>
        <p className="text-[10px] text-muted-2 uppercase tracking-wider font-medium">
          Finanzas freelance
        </p>
      </div>
    </div>

    {/* CTA */}
    <div className="px-3 py-4 border-b border-border">
      <Button variant="primary" size="md" className="w-full" onClick={onNewMovement}>
        <Plus size={15} strokeWidth={2.5} />
        Nuevo movimiento
      </Button>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-2">
        Menú
      </p>
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2 hover:text-fg'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              {label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* User */}
    <div className="px-3 py-4 border-t border-border">
      <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dark to-dark-2 flex items-center justify-center text-[11px] font-bold text-white">
          DV
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-fg truncate leading-tight">Dev Freelance</p>
          <p className="text-[11px] text-muted-2 truncate">Local workspace</p>
        </div>
      </div>
    </div>
  </aside>
);
