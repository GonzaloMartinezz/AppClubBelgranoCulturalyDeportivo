import { useState, useEffect, useMemo, useCallback } from 'react';
import { CATEGORIES } from '../data/categories';
import { calcTotal } from '../lib/format';
import { TransactionsContext } from './transactionsContext';

const STORAGE_KEY = 'devStats_v5';

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      /* quota / private mode */
    }
  }, [transactions]);

  const addTransaction = useCallback((formData) => {
    const total = calcTotal(formData);
    if (!formData.description || total <= 0) return false;
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: formData.type,
        description: formData.description,
        category: formData.category,
        items: formData.items,
        taxRate: Number(formData.taxRate) || 0,
        discount: Number(formData.discount) || 0,
        amount: total,
        date: formData.date,
        status: formData.status
      },
      ...prev
    ]);
    return true;
  }, []);

  const removeTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleStatus = useCallback((id) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );
  }, []);

  const stats = useMemo(() => {
    const completed = transactions.filter((t) => t.status === 'completed');
    const totalIncome = completed
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const totalExpense = completed
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const balance = totalIncome - totalExpense;
    const projects = completed.filter((t) => t.type === 'income').length;
    const pending = transactions.filter((t) => t.status === 'pending');
    const pendingAmount = pending.reduce((s, t) => s + parseFloat(t.amount || 0), 0);

    const categoryStats = {};
    completed.forEach((t) => {
      const key = `${t.type}:${t.category}`;
      if (!categoryStats[key]) {
        categoryStats[key] = { total: 0, count: 0, type: t.type, category: t.category };
      }
      categoryStats[key].total += parseFloat(t.amount || 0);
      categoryStats[key].count += 1;
    });

    const byMonth = {};
    completed.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!byMonth[key]) byMonth[key] = { income: 0, expense: 0 };
      byMonth[key][t.type] += parseFloat(t.amount || 0);
    });

    return {
      totalIncome,
      totalExpense,
      balance,
      projects,
      pendingCount: pending.length,
      pendingAmount,
      categoryStats,
      byMonth,
      avgProject: projects > 0 ? totalIncome / projects : 0,
      margin: totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(0) : 0,
      transactionsCount: transactions.length
    };
  }, [transactions]);

  const value = useMemo(
    () => ({
      transactions,
      stats,
      categories: CATEGORIES,
      addTransaction,
      removeTransaction,
      toggleStatus
    }),
    [transactions, stats, addTransaction, removeTransaction, toggleStatus]
  );

  return (
    <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>
  );
};
