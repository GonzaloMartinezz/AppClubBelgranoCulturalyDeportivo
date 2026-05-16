const TONES = {
  neutral: 'bg-surface-2 text-muted border border-border',
  brand: 'bg-brand text-dark border border-brand-dark/20',
  success: 'bg-brand-soft text-brand-dark border border-brand/40',
  warning: 'bg-warning/15 text-warning border border-warning/30',
  danger: 'bg-danger/10 text-danger border border-danger/30',
  info: 'bg-info/10 text-info border border-info/30',
  dark: 'bg-dark text-brand border border-dark'
};

export const Badge = ({ children, tone = 'neutral', icon: Icon, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${TONES[tone]} ${className}`}
  >
    {Icon && <Icon size={11} strokeWidth={2.5} />}
    {children}
  </span>
);
