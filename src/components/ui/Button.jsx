const VARIANTS = {
  primary: 'bg-dark text-white hover:bg-dark-2 active:scale-[0.98]',
  accent: 'bg-accent text-white hover:bg-accent/90 active:scale-[0.98]',
  secondary: 'bg-surface text-fg border border-border hover:bg-surface-2 hover:border-border-strong active:scale-[0.98]',
  ghost: 'text-fg hover:bg-surface-2 active:bg-surface-3',
  outline: 'bg-transparent text-fg border border-border hover:bg-surface-2',
  danger: 'bg-danger text-white hover:bg-danger/90 active:scale-[0.98]',
  success: 'bg-success text-white hover:bg-success/90 active:scale-[0.98]'
};

const SIZES = {
  xs: 'h-7 px-2.5 text-xs gap-1 rounded-lg',
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-5 text-sm gap-2 rounded-xl',
  xl: 'h-14 px-6 text-base gap-2.5 rounded-2xl'
};

export const Button = ({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center font-semibold transition-all whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 ring-focus ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

const ICON_SIZES = {
  xs: 'w-7 h-7 rounded-lg',
  sm: 'w-8 h-8 rounded-lg',
  md: 'w-10 h-10 rounded-xl',
  lg: 'w-12 h-12 rounded-xl'
};

export const IconButton = ({
  children,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...rest
}) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center transition-all ring-focus active:scale-95 ${VARIANTS[variant]} ${ICON_SIZES[size]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);
