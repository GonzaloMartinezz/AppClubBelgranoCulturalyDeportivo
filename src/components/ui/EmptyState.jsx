import { Card } from './Card';

export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <Card radius="xl" className="p-10 md:p-16 text-center">
    {Icon && (
      <div className="w-14 h-14 rounded-2xl bg-dark text-brand flex items-center justify-center mx-auto mb-5">
        <Icon size={22} strokeWidth={2.2} />
      </div>
    )}
    <h3 className="text-lg md:text-xl font-bold text-fg mb-2 tracking-tight">{title}</h3>
    {description && (
      <p className="text-sm text-muted max-w-md mx-auto mb-6">{description}</p>
    )}
    {action}
  </Card>
);
