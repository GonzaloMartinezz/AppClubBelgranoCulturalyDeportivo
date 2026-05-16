export const PageHeader = ({ eyebrow, title, description, actions }) => (
  <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
    <div className="min-w-0">
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-bold mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl md:text-6xl font-bold text-fg tracking-tight leading-[0.95] headline-display">
        {title}
      </h1>
      {description && (
        <p className="text-sm md:text-base text-muted mt-3 max-w-2xl">{description}</p>
      )}
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </header>
);
