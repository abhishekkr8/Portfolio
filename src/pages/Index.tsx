import React, { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Navbar />
        <main className="pt-16">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
