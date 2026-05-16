const VARIANTS = {
  default: 'bg-surface border border-border',
  flat: 'bg-surface-2 border border-border',
  dark: 'bg-dark text-white border border-dark',
  accent: 'bg-accent text-white border border-accent'
};

const RADIUS = {
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl'
};

export const Card = ({
  children,
  variant = 'default',
  radius = 'lg',
  className = '',
  ...rest
}) => (
  <div className={`${VARIANTS[variant]} ${RADIUS[radius]} ${className}`} {...rest}>
    {children}
  </div>
);
