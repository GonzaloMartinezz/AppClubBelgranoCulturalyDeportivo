import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'var(--color-dark)', color: 'white', fontFamily: 'var(--font-sans)' }}
    >
      <Navbar />

      {/* Page content - Single Page Scrolling */}
      <main className="relative">
        <HomePage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
