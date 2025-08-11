import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Donations from './components/Donations';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('english');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About language={language} />;
      case 'services':
        return <Services language={language} />;
      case 'donations':
        return <Donations language={language} />;
      case 'events':
        return <Events language={language} />;
      case 'gallery':
        return <Gallery language={language} />;
      case 'contact':
        return <Contact language={language} />;
      default:
        return <Hero language={language} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
      />
      
      <main className="transition-all duration-500 ease-in-out">
        {renderPage()}
      </main>
      
      <Footer language={language} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;