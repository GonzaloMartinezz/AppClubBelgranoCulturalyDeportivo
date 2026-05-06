export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Badge } from './Badge';
export { default as PlayerCard } from './PlayerCard';
export { default as MatchCardPro } from './MatchCardPro';

// Avatar component
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

// Spinner component
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizes[size]} border-2 border-brand border-t-transparent rounded-full animate-spin ${className}`} />
  );
};

// Skeleton component
export const Skeleton = ({ className = '' }) => (
  <div className={`bg-white/10 animate-pulse ${className}`} />
);