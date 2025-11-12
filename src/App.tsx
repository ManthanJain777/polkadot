import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ChatBot } from './components/ChatBot';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { VerifyPage } from './pages/VerifyPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Handle initial hash
    const hash = window.location.hash.slice(1) || 'home';
    setCurrentPage(hash);

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1) || 'home';
      setCurrentPage(newHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: string) => {
    window.location.hash = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handlePageChange} />;
      case 'upload':
        return <UploadPage />;
      case 'verify':
        return <VerifyPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {renderPage()}
      </main>
      
      <footer className="bg-card border-t-2 border-border/50 py-8 mt-20 relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 w-60 h-60 bg-[#8B5CF6]/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-card-foreground font-bold uppercase tracking-wide mb-2">
            IPFS File Hasher &amp; Blockchain Verification System
          </p>
          <p className="text-card-foreground/60">
            Powered by SHA256, IPFS, and Blockchain Technology
          </p>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}
