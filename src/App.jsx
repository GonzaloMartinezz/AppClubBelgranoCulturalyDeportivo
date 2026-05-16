import { Routes, Route, Navigate } from 'react-router-dom';
import { TransactionsProvider } from './context/TransactionsContext.jsx';
import { AppShell } from './components/layout/AppShell';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';

const App = () => (
  <TransactionsProvider>
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="movimientos" element={<TransactionsPage />} />
        <Route path="analisis" element={<AnalyticsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </TransactionsProvider>
);

export default App;
