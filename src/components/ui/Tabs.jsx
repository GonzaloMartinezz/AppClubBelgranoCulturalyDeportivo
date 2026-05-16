export const Tabs = ({ value, onChange, options, className = '' }) => (
  <div
    role="tablist"
    className={`inline-flex items-center gap-1 p-1 bg-surface-2 border border-border rounded-full ${className}`}
  >
    {options.map((opt) => {
      const active = opt.value === value;
      return (
        <button
          key={opt.value}
          role="tab"
          aria-selected={active}
          onClick={() => onChange(opt.value)}
          className={`relative inline-flex items-center gap-1.5 px-4 h-9 rounded-full text-xs font-bold transition-all ${
            active
              ? 'bg-dark text-brand shadow-sm'
              : 'text-muted hover:text-fg'
          }`}
        >
          {opt.label}
          {opt.count != null && (
            <span
              className={`ml-1 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10px] font-bold tabular ${
                active ? 'bg-brand text-dark' : 'bg-surface-3 text-muted'
              }`}
            >
              {opt.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);
