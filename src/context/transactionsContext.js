import { createContext, useContext } from 'react';

export const TransactionsContext = createContext(null);

export const emptyForm = () => ({
  type: 'income',
  description: '',
  category: 'web',
  items: [{ id: Date.now(), concept: '', quantity: 1, unitAmount: 0 }],
  taxRate: 0,
  discount: 0,
  date: new Date().toISOString().split('T')[0],
  status: 'completed'
});

export const useTransactions = () => {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error('useTransactions must be used within TransactionsProvider');
  return ctx;
};
