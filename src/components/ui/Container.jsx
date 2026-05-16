export const Container = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 ${className}`}>
    {children}
  </div>
);
