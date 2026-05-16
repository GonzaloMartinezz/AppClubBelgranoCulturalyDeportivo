import Navbar from './components/layout/Navbar';
import Footer from './components/layout/FooterNew';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-brand selection:text-dark overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
