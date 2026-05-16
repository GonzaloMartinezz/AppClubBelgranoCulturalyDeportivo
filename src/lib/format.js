export const formatMoney = (n, { compact = false, withSign = false } = {}) => {
  const num = Number(n) || 0;
  if (compact) {
    const abs = Math.abs(num);
    if (abs >= 1_000_000) return `${withSign && num > 0 ? '+' : ''}$${(num / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `${withSign && num > 0 ? '+' : ''}$${(num / 1_000).toFixed(1)}k`;
  }
  const formatted = num.toLocaleString('es-AR', { maximumFractionDigits: 2 });
  if (withSign && num > 0) return `+$${formatted}`;
  return `$${formatted}`;
};

export const formatDate = (date, opts = { day: '2-digit', month: 'short', year: 'numeric' }) =>
  new Date(date).toLocaleDateString('es-AR', opts);

export const calcTotal = (data) => {
  const subtotal = (data.items || []).reduce(
    (s, it) => s + (Number(it.quantity) || 0) * (Number(it.unitAmount) || 0),
    0
  );
  const afterDisc = subtotal * (1 - (Number(data.discount) || 0) / 100);
  return afterDisc * (1 + (Number(data.taxRate) || 0) / 100);
};
