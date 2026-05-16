import { TrendingUp, Bell } from 'lucide-react';
import { IconButton } from '../ui/Button';

export const Topbar = () => (
  <header className="lg:hidden sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border">
    <div className="flex items-center justify-between h-14 px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-dark flex items-center justify-center">
          <TrendingUp size={16} className="text-accent" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <p className="font-bold text-fg text-sm tracking-tight">DevStats</p>
          <p className="text-[10px] text-muted-2 uppercase tracking-wider font-medium">
            Freelance OS
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <IconButton size="sm" variant="ghost" aria-label="Notificaciones">
          <Bell size={16} />
        </IconButton>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dark to-dark-2 flex items-center justify-center text-[10px] font-bold text-white ml-1">
          DV
        </div>
      </div>
    </div>
  </header>
);
