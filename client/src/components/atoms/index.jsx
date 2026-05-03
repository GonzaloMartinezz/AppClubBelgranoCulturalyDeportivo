
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-oswald font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3';
  
  const variants = {
    primary: 'bg-brand text-white border-2 border-brand hover:bg-white hover:text-brand',
    secondary: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-dark',
    ghost: 'bg-transparent text-white border-none hover:text-brand'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-10 py-5 text-base'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  );
};

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-brand text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-red-500 text-white'
  };
  
  return (
    <span className={`px-2 py-1 text-xs font-oswald font-bold tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl'
  };
  
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-brand text-white font-teko font-bold ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{alt?.[0]?.toUpperCase()}</span>
      )}
    </div>
  );
};

export const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-dark border-2 border-white p-6 ${hover ? 'hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0033A0] transition-all' : ''} ${className}`}>
    {children}
  </div>
);

export const Input = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col gap-2">
    {label && (
      <label className="text-xs font-oswald text-gray-400 uppercase tracking-[0.2em]">{label}</label>
    )}
    <input 
      className={`bg-surface border-2 border-white/20 px-4 py-3 text-white font-oswald placeholder-gray-500 focus:border-brand focus:outline-none transition-colors ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 font-oswald">{error}</span>}
  </div>
);

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizes[size]} border-2 border-brand border-t-transparent rounded-full animate-spin ${className}`} />
  );
};

export const Skeleton = ({ className = '' }) => (
  <div className={`bg-white/10 animate-pulse ${className}`} />
);