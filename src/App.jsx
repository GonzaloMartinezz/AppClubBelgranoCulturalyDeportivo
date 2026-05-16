import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/FooterNew';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-brand selection:text-white overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
