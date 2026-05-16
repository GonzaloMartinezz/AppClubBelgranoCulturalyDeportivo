import { Card } from '../ui/Card';

const TONES = {
  default: { value: 'text-fg', icon: 'bg-surface-2 text-fg' },
  income: { value: 'text-accent', icon: 'bg-accent/10 text-accent' },
  expense: { value: 'text-warning', icon: 'bg-warning/10 text-warning' },
  neutral: { value: 'text-fg', icon: 'bg-surface-2 text-muted' }
};

export const StatTile = ({ label, value, hint, icon: Icon, tone = 'default' }) => {
  const t = TONES[tone];
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted font-semibold">
          {label}
        </span>
        {Icon && (
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${t.icon}`}>
            <Icon size={14} strokeWidth={2.4} />
          </div>
        )}
      </div>
      <p className={`text-lg sm:text-xl md:text-2xl font-bold tabular tracking-tight ${t.value}`}>
        {value}
      </p>
      {hint && <p className="text-[11px] text-muted mt-1.5">{hint}</p>}
    </Card>
  );
};
