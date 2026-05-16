import { forwardRef } from 'react';

const baseInput =
  'w-full bg-surface border border-border text-fg placeholder:text-muted-2 rounded-full px-4 h-11 text-sm focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/10 transition-all';

export const Input = forwardRef(({ className = '', ...rest }, ref) => (
  <input ref={ref} className={`${baseInput} ${className}`} {...rest} />
));
Input.displayName = 'Input';

export const Label = ({ children, htmlFor, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-xs font-bold text-muted mb-1.5 uppercase tracking-wider ${className}`}
  >
    {children}
  </label>
);

export const InputWithIcon = forwardRef(
  ({ icon: Icon, suffix, className = '', ...rest }, ref) => (
    <div className="relative">
      {Icon && (
        <Icon
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
      )}
      <input
        ref={ref}
        className={`${baseInput} ${Icon ? 'pl-10' : ''} ${suffix ? 'pr-10' : ''} ${className}`}
        {...rest}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted font-medium pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  )
);
InputWithIcon.displayName = 'InputWithIcon';
