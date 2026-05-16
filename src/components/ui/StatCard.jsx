import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

export const StatCard = ({
  label,
  value,
  delta,
  deltaPositive,
  icon: Icon,
  accent = 'neutral',
  hint,
  size = 'md'
}) => {
  const accentMap = {
    neutral: 'text-fg',
    brand: 'text-brand-dark',
    success: 'text-brand-dark',
    danger: 'text-danger',
    warning: 'text-warning'
  };
  const iconBg = {
    neutral: 'bg-surface-2 text-fg',
    brand: 'bg-brand text-dark',
    success: 'bg-brand-soft text-brand-dark',
    danger: 'bg-danger/10 text-danger',
    warning: 'bg-warning/15 text-warning'
  };

  const sizes = {
    md: {
      pad: 'p-5 md:p-6',
      label: 'text-xs',
      value: 'text-2xl md:text-3xl',
      icon: 'w-9 h-9',
      iconSize: 16
    },
    lg: {
      pad: 'p-6 md:p-8',
      label: 'text-sm',
      value: 'text-3xl md:text-5xl',
      icon: 'w-11 h-11',
      iconSize: 20
    }
  };
  const s = sizes[size];

  return (
    <Card radius="xl" className={`${s.pad} hover:border-border-strong transition-colors group bento-card`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`${s.label} text-muted font-bold uppercase tracking-wider`}>{label}</span>
        {Icon && (
          <div className={`${s.icon} rounded-xl flex items-center justify-center ${iconBg[accent]} group-hover:scale-110 transition-transform`}>
            <Icon size={s.iconSize} strokeWidth={2.4} />
          </div>
        )}
      </div>
      <p className={`${s.value} font-bold tabular tracking-tight ${accentMap[accent]}`}>
        {value}
      </p>
      <div className="flex items-center gap-2 mt-3 text-xs">
        {delta != null && (
          <span
            className={`inline-flex items-center gap-0.5 font-bold tabular px-1.5 py-0.5 rounded-md ${
              deltaPositive
                ? 'bg-brand text-dark'
                : 'bg-danger/10 text-danger'
            }`}
          >
            {deltaPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {delta}
          </span>
        )}
        {hint && <span className="text-muted">{hint}</span>}
      </div>
    </Card>
  );
};
