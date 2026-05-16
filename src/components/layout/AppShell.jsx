import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { Container } from '../ui/Container';
import {
  TransactionFormModal,
  DeleteConfirmModal,
  TransactionDetailModal,
  SuccessToast
} from '../modals/Modals';
import { useTransactions, emptyForm } from '../../context/transactionsContext';
import { CATEGORIES, getCategoryInfo } from '../../data/categories';

export const AppShell = () => {
  const { addTransaction, removeTransaction, toggleStatus } = useTransactions();
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const openNewForm = (preset = {}) => {
    const base = emptyForm();
    const type = preset.type || base.type;
    const validCategory = CATEGORIES[type].some((c) => c.value === preset.category)
      ? preset.category
      : CATEGORIES[type][0].value;
    setFormData({ ...base, ...preset, type, category: validCategory });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = addTransaction(formData);
    if (!ok) return;
    setFormData(emptyForm());
    setShowForm(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleDelete = () => {
    if (selectedTx) {
      removeTransaction(selectedTx.id);
      setShowDelete(false);
      setShowDetail(false);
      setSelectedTx(null);
    }
  };

  const handleToggleStatus = () => {
    if (selectedTx) {
      toggleStatus(selectedTx.id);
      setSelectedTx({
        ...selectedTx,
        status: selectedTx.status === 'completed' ? 'pending' : 'completed'
      });
    }
  };

  const openDetail = (tx) => { setSelectedTx(tx); setShowDetail(true); };
  const openDelete = (tx) => { setSelectedTx(tx); setShowDelete(true); };

  const handleTypeChange = (type) =>
    setFormData((d) => ({ ...d, type, category: CATEGORIES[type][0].value }));

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar onNewMovement={() => openNewForm()} />

      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <Topbar />

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 pt-4 sm:pt-6 lg:pt-10 pb-24 lg:pb-12"
        >
          <Container>
            <Outlet context={{ openNewForm, openDetail, openDelete }} />
          </Container>
        </motion.main>
      </div>

      <MobileNav onNewMovement={() => openNewForm()} />

      <TransactionFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        categories={CATEGORIES}
        handleTypeChange={handleTypeChange}
      />
      <DeleteConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        transaction={selectedTx}
      />
      <TransactionDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        transaction={selectedTx}
        categoryInfo={selectedTx ? getCategoryInfo(selectedTx.category, selectedTx.type) : null}
        onDelete={() => setShowDelete(true)}
        onToggleStatus={handleToggleStatus}
      />
      <SuccessToast isOpen={showToast} message="Movimiento guardado" />
    </div>
  );
};
